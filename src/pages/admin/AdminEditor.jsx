import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../css/admin.css";

export default function AdminEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    post_type: "blog",
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    meta_description: "",
    content: "",
    youtube_link: "",
    image_url: "",
    published_date: new Date().toISOString().split("T")[0],
    is_published: 0,
    initial_likes: 0,
  });

  const [uploading, setUploading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
      return;
    }
    setAuthorized(true);

    if (id) {
      const loadPost = async () => {
        try {
          const apiBaseURL =
            import.meta.env.VITE_API_URL ||
            (import.meta.env.PROD ? "" : "http://localhost:8000");
          const res = await fetch(
            `${apiBaseURL}/api/posts.php?post_id=${id}&include_drafts=true`,
            { credentials: "include" }
          );
          const data = await res.json();
          if (data.status === "success") {
            const post = data.data;
            if (post) {
              setFormData({
                post_type: post.post_type,
                title: post.title,
                slug: post.slug,
                category: post.category || "",
                excerpt: post.excerpt || "",
                meta_description: post.meta_description || "",
                content: post.content || "",
                youtube_link: post.youtube_link || "",
                image_url: post.image_url || "",
                published_date: post.published_date
                  ? post.published_date.split(" ")[0]
                  : "",
                is_published: parseInt(post.is_published),
                initial_likes: post.initial_likes || 0,
              });
            }
          }
        } catch (err) {
          console.error("Failed to load post", err);
        }
      };
      loadPost();
    }
  }, [id, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const imgData = new FormData();
    imgData.append("image", file);
    imgData.append("type", "featured");

    try {
      const apiBaseURL =
        import.meta.env.VITE_API_URL ||
        (import.meta.env.PROD ? "" : "http://localhost:8000");
      const res = await fetch(`${apiBaseURL}/api/upload_blog_image.php`, {
        method: "POST",
        credentials: "include",
        body: imgData,
      });
      const data = await res.json();
      if (data.status === "success") {
        setFormData((prev) => ({ ...prev, image_url: data.path }));
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image_url: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBaseURL =
        import.meta.env.VITE_API_URL ||
        (import.meta.env.PROD ? "" : "http://localhost:8000");
      const payload = { ...formData };
      if (id) payload.id = id;

      const res = await fetch(`${apiBaseURL}/api/posts.php`, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === "success") {
        alert("Post saved successfully!");
        if (!id && data.id) {
          navigate(`/admin/editor/${data.id}`);
        } else {
          const loadPost = async () => {
            const apiBaseURL =
              import.meta.env.VITE_API_URL ||
              (import.meta.env.PROD ? "" : "http://localhost:8000");
            const res = await fetch(
              `${apiBaseURL}/api/posts.php?post_id=${id}&include_drafts=true`,
              { credentials: "include" }
            );
            const data = await res.json();
            if (data.status === "success") {
              const post = data.data;
              setFormData({
                ...post,
                is_published: parseInt(post.is_published),
              });
            }
          };
          loadPost();
        }
      } else {
        alert(data.message || "Failed to save");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  if (!authorized) return null;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>{id ? "Edit Post" : "Create New Post"}</h1>
        <div className="admin-header-actions">
          {id && (
            <a
              href={(() => {
                const base = window.location.origin;
                if (formData.post_type === "blog")
                  return `${base}/blogs/${formData.slug}`;
                if (formData.post_type === "event")
                  return `${base}/events/${formData.slug}`;
                if (formData.post_type === "success_lens")
                  return `${base}/success-wire/${formData.slug}`;

                let cat = "pod";
                if (formData.post_type === "driven_by_purpose")
                  cat = "driven-by-purpose";
                else if (formData.post_type === "founders_unfiltered")
                  cat = "founders-unfiltered";
                else if (formData.post_type === "stage_behind_story")
                  cat = "stage-behind-the-story";

                return `${base}/${cat}/${formData.slug}`;
              })()}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-preview-link"
            >
              View Preview Link
            </a>
          )}
          <Link to="/admin/dashboard" className="admin-btn-link">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-input-group">
          <div>
            <label className="admin-label">Post Type</label>
            <select
              value={formData.post_type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, post_type: e.target.value }))
              }
              className="admin-select"
            >
              <option value="blog">Blog</option>
              <option value="event">Event</option>
              <option value="success_lens">Success Lens</option>
              <option value="driven_by_purpose">Driven By Purpose</option>
              <option value="founders_unfiltered">Founders-Unfiltered</option>
              <option value="stage_behind_story">
                The Stage Behind the Story
              </option>
            </select>
          </div>
          <div>
            <label className="admin-label">Category (Optional)</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Publication Status</label>
            <select
              value={formData.is_published}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_published: parseInt(e.target.value),
                }))
              }
              className="admin-select"
              style={{
                background: formData.is_published === 1 ? "#e6fffa" : "#fff5f5",
                color: formData.is_published === 1 ? "#2c7a7b" : "#c53030",
                fontWeight: "bold",
              }}
            >
              <option value={0}>DRAFT (Hidden from site)</option>
              <option value={1}>LIVE (Public on site)</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Initial Likes Count</label>
            <input
              type="number"
              value={formData.initial_likes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  initial_likes: parseInt(e.target.value) || 0,
                }))
              }
              className="admin-input"
              min="0"
            />
          </div>
        </div>

        <label className="admin-label">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          className="admin-input"
        />

        <label className="admin-label">Slug (URL) - auto-generated if empty</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
          className="admin-input"
        />

        <label className="admin-label">Excerpt / Short Description</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
          }
          className="admin-textarea"
        />

        <label className="admin-label">SEO Meta Description</label>
        <textarea
          value={formData.meta_description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, meta_description: e.target.value }))
          }
          className="admin-textarea"
          placeholder="Brief description for search engines..."
        />

        <label className="admin-label">Featured Image Upload</label>
        {formData.image_url && (
          <div className="admin-image-preview">
            <p>Current Image:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <img
                src={formData.image_url}
                alt="Preview"
                className="admin-image-preview-img"
              />
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={handleRemoveImage}
                style={{ padding: "6px 12px", fontSize: "13px" }}
              >
                Remove Featured Image
              </button>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
        {uploading && <span>Uploading...</span>}

        <label className="admin-label">YouTube Link (Optional)</label>
        <input
          type="url"
          value={formData.youtube_link}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, youtube_link: e.target.value }))
          }
          placeholder="https://www.youtube.com/watch?v=..."
          className="admin-input"
        />

        <label className="admin-label">Content</label>
        <div className="admin-quill-wrapper">
          <ReactQuill
            value={formData.content}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, content: val || "" }))
            }
            theme="snow"
            className="admin-quill-editor"
          />
        </div>

        <label className="admin-label">
          Insert Image Into Content
        </label>
        <div className="admin-content-image-upload">
          <span className="admin-help-text">
            Upload an image here and it will seamlessly insert into your content
            above.
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const imgData = new FormData();
              imgData.append("image", file);
              imgData.append("type", "content");

              try {
                const apiBaseURL =
                  import.meta.env.VITE_API_URL ||
                  (import.meta.env.PROD ? "" : "http://localhost:8000");
                const res = await fetch(
                  `${apiBaseURL}/api/upload_blog_image.php`,
                  {
                    method: "POST",
                    credentials: "include",
                    body: imgData,
                  }
                );
                const data = await res.json();
                if (data.status === "success") {
                  const htmlImage = `<br/><img src="${data.path}" alt="Content Image" style="max-width:100%; height:auto;" /><br/>`;
                  setFormData((prev) => ({
                    ...prev,
                    content: prev.content + htmlImage,
                  }));
                } else {
                  alert(data.message || "Upload failed");
                }
              } catch (err) {
                console.error(err);
                alert("Upload error");
              } finally {
                e.target.value = null;
              }
            }}
          />
        </div>

        <button type="submit" className="admin-btn admin-btn-primary">
          {id ? "Update Post" : "Submit Post"}
        </button>
      </form>
    </div>
  );
}
