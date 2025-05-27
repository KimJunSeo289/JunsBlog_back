import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";

export const createPost = async (req, res) => {
  try {
    const { title, summary, content } = req.body;

    const postData = {
      title,
      summary,
      content,
      cover: req.file ? req.file.path : null,
      author: req.user.username,
    };

    await Post.create(postData);

    res.json({ message: "포스트 글쓰기 성공" });
  } catch (err) {
    console.log("에러", err);
    return res.status(500).json({ error: "서버 에러" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 3;
    const skip = page * limit;

    const sort = req.query.sort || "createdAt";
    let sortStage = { createdAt: -1 };

    if (sort === "likes") {
      sortStage = { likesCount: -1 };
    } else if (sort === "commentCount") {
      sortStage = { commentCount: -1 };
    }

    const posts = await Post.aggregate([
      // 좋아요 수 필드 추가
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
        },
      },
      // 댓글 조인 및 수 세기
      {
        $lookup: {
          from: "comments", // Comment 모델의 실제 컬렉션 이름 (소문자 + 복수형 주의!)
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" },
        },
      },
      // 정렬
      { $sort: sortStage },
      // 페이징
      { $skip: skip },
      { $limit: limit },
      // 댓글 목록 제거 (필요 시 제거)
      {
        $project: {
          comments: 0,
        },
      },
    ]);

    const total = await Post.countDocuments();
    const hasMore = total > skip + posts.length;

    res.json({
      posts,
      hasMore,
      total,
    });
  } catch (err) {
    console.error("게시물 조회 오류:", err);
    res.status(500).json({ error: "게시물 조회에 실패했습니다." });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    // 댓글 수 조회
    const commentCount = await Comment.countDocuments({ postId });

    // 응답 객체 생성
    const postWithCommentCount = post.toObject();
    postWithCommentCount.commentCount = commentCount;

    res.json(postWithCommentCount);
  } catch (err) {
    console.error("게시물 상세 조회 오류:", err);
    res.status(500).json({ error: "게시물 상세 조회에 실패했습니다." });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }
    await Comment.deleteMany({ postId });
    res.json({ message: "게시물이 삭제되었습니다." });
  } catch (err) {
    console.error("게시물 삭제 오류:", err);
    res.status(500).json({ error: "게시물 삭제에 실패했습니다." });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, summary, content } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    if (post.author !== req.user.username) {
      return res.status(403).json({ error: "자신의 글만 수정할 수 있습니다." });
    }

    const updateData = {
      title,
      summary,
      content,
    };

    if (req.file) {
      updateData.cover = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    res.json({
      message: "게시물이 수정되었습니다.",
      post: updatedPost,
    });
  } catch (err) {
    console.error("게시물 수정 오류:", err);
    res.status(500).json({ error: "게시물 수정에 실패했습니다." });
  }
};

export const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }

    const likeIndex = post.likes.findIndex((id) => id.toString() === userId);

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("좋아요 토글 기능 오류:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};
