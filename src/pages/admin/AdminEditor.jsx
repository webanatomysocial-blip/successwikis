import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function AdminEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    post_type: "blog",
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    youtube_link: "",
    image_url: "",
    published_date: new Date().toISOString().split("T")[0],
    is_published: 0, // Default to Draft
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
          const res = await fetch(`${apiBaseURL}/api/posts.php`, {
            credentials: "include",
          });
          const data = await res.json();
          if (data.status === "success") {
            const post = data.data.find((p) => p.id === parseInt(id));
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
                is_published: post.is_published,
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
        // If it's a new post, we might want to refresh to get the ID or stay on page
        if (!id && data.id) {
          navigate(`/admin/editor/${data.id}`);
        } else {
          // Just refresh data
          const loadPost = async () => {
            const apiBaseURL =
              import.meta.env.VITE_API_URL ||
              (import.meta.env.PROD ? "" : "http://localhost:8000");
            const res = await fetch(
              `${apiBaseURL}/api/posts.php?slug=${formData.slug}`,
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
    <div style={{ padding: "100px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{id ? "Edit Post" : "Create New Post"}</h1>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
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
              style={{ color: "#28a745", fontWeight: "bold" }}
            >
              View Preview Link
            </a>
          )}
          <Link
            to="/admin/dashboard"
            style={{ textDecoration: "none", color: "blue" }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Post Type</label>
            <select
              value={formData.post_type}
              onChange={(e) =>
                setFormData({ ...formData, post_type: e.target.value })
              }
              style={{ width: "100%", padding: "10px" }}
            >
              <option value="blog">Blog</option>
              <option value="event">Event</option>
              <option value="pod">Pod</option>
              <option value="success_lens">Success Lens</option>
              <option value="driven_by_purpose">Driven By Purpose</option>
              <option value="founders_unfiltered">Founders-Unfiltered</option>
              <option value="stage_behind_story">
                The Stage Behind the Story
              </option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Category (Optional)</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              style={{ width: "100%", padding: "10px" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Publication Status</label>
            <select
              value={formData.is_published}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  is_published: parseInt(e.target.value),
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                background: formData.is_published === 1 ? "#e6fffa" : "#fff5f5",
                color: formData.is_published === 1 ? "#2c7a7b" : "#c53030",
                fontWeight: "bold",
              }}
            >
              <option value={0}>DRAFT (Hidden from site)</option>
              <option value={1}>LIVE (Public on site)</option>
            </select>
          </div>
        </div>

        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          style={{ padding: "10px" }}
        />

        <label>Slug (URL) - auto-generated if empty</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          style={{ padding: "10px" }}
        />

        <label>Excerpt / Short Description</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          style={{ padding: "10px", height: "60px" }}
        />

        <label>SEO Meta Description</label>
        <textarea
          value={formData.meta_description}
          onChange={(e) =>
            setFormData({ ...formData, meta_description: e.target.value })
          }
          style={{ padding: "10px", height: "60px" }}
          placeholder="Brief description for search engines..."
        />

        <label>Featured Image Upload</label>
        {formData.image_url && (
          <div style={{ marginBottom: "10px" }}>
            <p>Current Image:</p>
            <img
              src={formData.image_url}
              alt="Preview"
              style={{ maxHeight: "150px", objectFit: "contain" }}
            />
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <span>Uploading...</span>}

        <label>YouTube Link (Optional)</label>
        <input
          type="url"
          value={formData.youtube_link}
          onChange={(e) =>
            setFormData({ ...formData, youtube_link: e.target.value })
          }
          placeholder="https://www.youtube.com/watch?v=..."
          style={{ padding: "10px" }}
        />

        <label>Content</label>
        <div style={{ background: "#fff", color: "#000" }}>
          <ReactQuill
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val || "" })}
            theme="snow"
            style={{ height: "350px", marginBottom: "50px" }}
          />
        </div>

        <label style={{ marginTop: "10px" }}>Insert Image Into Content</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "#666" }}>
            Upload an image here and it will seamlessly insert into your
            markdown content above.
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
                  },
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
                e.target.value = null; // reset input
              }
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "15px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {id ? "Update Post" : "Submit Post"}
        </button>
      </form>
    </div>
  );
}
