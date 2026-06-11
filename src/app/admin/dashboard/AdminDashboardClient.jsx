"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../../css/admin.css";
import { getApiBaseUrl } from "../../../lib/api";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  // Navigation and Featured Submissions State
  const [currentNav, setCurrentNav] = useState("posts"); // 'posts' or 'featured'
  const [submissions, setSubmissions] = useState([]);
  const [subLoading, setSubLoading] = useState(false);
  const [subFilter, setSubFilter] = useState("all"); // 'all', 'pending', 'approved', 'rejected'
  const [subTypeFilter, setSubTypeFilter] = useState("all"); // 'all', 'driven_by_purpose', 'founders_unfiltered', 'stage_behind_the_story'
  const [approvedDraftPostId, setApprovedDraftPostId] = useState(null);

  const [readSubmissions, setReadSubmissions] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("read_submissions");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Modals state
  const [selectedSub, setSelectedSub] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    full_name: "",
    role: "",
    email: "",
    phone: "",
    company_name: "",
    company_website: "",
    company_linkedin: "",
    company_email: "",
    feature_title: "",
    company_tagline: "",
    company_description: "",
    additional_notes: "",
    outer_heading: "",
    inner_heading: "",
    // For Stage Behind
    one_sentence_pitch: "",
    belief_or_experience: "",
    rarely_asked_story: "",
    why_belongs: "",
    // For Founders Unfiltered
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
  });

  const apiBaseURL = getApiBaseUrl();

  const isDrivenByPurpose = (type) => {
    if (!type) return false;
    const normalized = type.toLowerCase().trim().replace(/[\s-]/g, "_");
    return normalized === "driven_by_purpose";
  };

  const isFeaturedType = (type) => {
    if (!type) return false;
    const normalized = type.toLowerCase().trim().replace(/[\s-]/g, "_");
    return [
      "driven_by_purpose",
      "stage_behind_story",
      "stage_behind_the_story",
      "founders_unfiltered",
    ].includes(normalized);
  };

  const tabs = [
    { id: "all", label: "All Posts" },
    { id: "blog", label: "Blogs" },
    { id: "event", label: "Events" },
    { id: "success_lens", label: "Success Lens" },
    { id: "driven_by_purpose", label: "Driven By Purpose" },
    { id: "founders_unfiltered", label: "Founders Unfiltered" },
    { id: "stage_behind_story", label: "Stage Behind Story" },
    { id: "trash", label: "Trash 🗑️" },
  ];

  useEffect(() => {
    if (!token) {
      router.push("/admin");
    } else {
      fetchSubmissions();
    }
  }, [token, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url =
        activeTab === "trash"
          ? `${apiBaseURL}/api/posts.php?include_trash=true&include_drafts=true`
          : `${apiBaseURL}/api/posts.php?include_drafts=true`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "success") {
        setPosts(data.data);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Submissions API Operations
  const fetchSubmissions = async () => {
    setSubLoading(true);
    try {
      const res = await fetch(`${apiBaseURL}/api/featured.php`);
      const data = await res.json();
      if (data.status === "success") {
        setSubmissions(data.data);
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setSubLoading(false);
    }
  };

  useEffect(() => {
    if (currentNav === "posts") {
      fetchPosts();
    } else if (currentNav === "featured" || currentNav === "details") {
      fetchSubmissions();
    }
  }, [activeTab, currentNav]);

  const handleDelete = async (id, permanent = false) => {
    const msg = permanent
      ? "Are you sure you want to PERMANENTLY delete this post? This cannot be undone."
      : "Are you sure you want to move this post to trash?";
    if (!window.confirm(msg)) return;
    try {
      const res = await fetch(
        `${apiBaseURL}/api/posts.php?id=${id}${permanent ? "&permanent=true" : ""}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (data.status === "success") {
        fetchPosts();
        fetchSubmissions();
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`${apiBaseURL}/api/posts.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, restore: true }),
      });
      const data = await res.json();
      if (data.status === "success") {
        fetchPosts();
      } else {
        alert(data.message || "Failed to restore");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubTypeChange = (type) => {
    setSubTypeFilter(type);
    if (type !== "all" && type !== "driven_by_purpose") {
      setSubFilter("all");
    }
  };

  // Submission Operations
  const handleSubmissionAction = async (id, action) => {
    const confirmMsg =
      action === "approve"
        ? "Are you sure you want to APPROVE this submission? For Driven by Purpose, a draft post will be created."
        : `Are you sure you want to mark this submission as ${action}?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`${apiBaseURL}/api/featured.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (data.status === "success") {
        if (action === "approve" && data.post_id) {
          setApprovedDraftPostId(data.post_id);
        } else {
          alert(data.message || "Status updated successfully!");
        }
        setSelectedSub(null);
        fetchSubmissions();
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this submission? This will permanently remove it from the dashboard database.",
      )
    )
      return;

    try {
      const res = await fetch(`${apiBaseURL}/api/featured.php?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        alert("Submission deleted successfully");
        setSelectedSub(null);
        fetchSubmissions();
      } else {
        alert(data.message || "Failed to delete submission");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewSub = (sub) => {
    setSelectedSub(sub);
    if (sub && sub.id && !readSubmissions.includes(sub.id)) {
      const updated = [...readSubmissions, sub.id];
      setReadSubmissions(updated);
      localStorage.setItem("read_submissions", JSON.stringify(updated));
    }
  };

  const handleOpenEdit = (sub) => {
    setSelectedSub(sub);
    setIsEditMode(true);
    const details = sub.form_data || {};

    setEditFormData({
      full_name: sub.full_name || "",
      role: sub.role || "",
      email: sub.email || "",
      phone: sub.phone || "",
      company_name: sub.company_name || "",
      company_website: sub.company_website || "",
      company_linkedin: sub.company_linkedin || "",
      company_email: sub.company_email || "",
      // Driven By Purpose Details
      feature_title: details.feature_title || "",
      company_tagline: details.company_tagline || "",
      company_description: details.company_description || "",
      additional_notes: details.additional_notes || "",
      slug: details.slug || "",
      meta_description: details.meta_description || "",
      thumbnail: details.thumbnail || "",
      outer_heading: details.outer_heading || "",
      inner_heading: details.inner_heading || "",
      // Stage Behind
      one_sentence_pitch: details.one_sentence_pitch || "",
      belief_or_experience: details.belief_or_experience || "",
      rarely_asked_story: details.rarely_asked_story || "",
      why_belongs: details.why_belongs || "",
      // Founders Unfiltered
      q1: details.q1 || "",
      q2: details.q2 || "",
      q3: details.q3 || "",
      q4: details.q4 || "",
      q5: details.q5 || "",
      q6: details.q6 || "",
      q7: details.q7 || "",
      q8: details.q8 || "",
      q9: details.q9 || "",
      q10: details.q10 || "",
      q11: details.q11 || "",
    });
  };

  const saveSubmissionEdits = async () => {
    try {
      const {
        full_name,
        role,
        email,
        phone,
        company_name,
        company_website,
        company_linkedin,
        company_email,
        ...formDetails
      } = editFormData;

      const res = await fetch(`${apiBaseURL}/api/featured.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedSub.id,
          action: "edit",
          full_name,
          role,
          email,
          phone,
          company_name,
          company_website,
          company_linkedin,
          company_email,
          form_data: formDetails,
        }),
      });

      const data = await res.json();
      return data.status === "success";
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const success = await saveSubmissionEdits();
    if (success) {
      alert("Submission details updated successfully!");
      setIsEditMode(false);
      setSelectedSub(null);
      fetchSubmissions();
    } else {
      alert("Failed to update details");
    }
  };

  const filteredPosts =
    activeTab === "all" || activeTab === "trash"
      ? posts
      : posts.filter((post) => post.post_type === activeTab);

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesStatus = subFilter === "all" || sub.status === subFilter;
    const matchesType = subTypeFilter === "all" || sub.type === subTypeFilter;
    return matchesStatus && matchesType;
  });

  // Helpers to render file assets inside submission viewer
  const renderAsset = (key, value) => {
    if (!value) return null;
    const list = Array.isArray(value) ? value : [value];

    return (
      <div className="submission-detail-row" key={key}>
        <div
          className="submission-detail-label"
          style={{ textTransform: "capitalize" }}
        >
          {key.replace(/_/g, " ")}
        </div>
        <div className="submission-detail-val">
          <div className="admin-asset-preview-list">
            {list.map((url, i) => {
              const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
              return isImage ? (
                <a
                  href={`${apiBaseURL}${url}`}
                  target="_blank"
                  rel="noreferrer"
                  key={i}
                >
                  <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                    <Image
                      src={`${apiBaseURL}${url}`}
                      alt="Asset Thumbnail"
                      fill
                      sizes="80px"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                </a>
              ) : (
                <a
                  href={`${apiBaseURL}${url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-asset-link"
                  key={i}
                >
                  View File {i + 1}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const pendingCount = submissions.filter(
    (sub) => sub.status === "pending" && !readSubmissions.includes(sub.id),
  ).length;

  return (
    <div className="admin-layout-container">
      {/* Sidebar Navigation */}
      <div className="admin-sidebar" data-lenis-prevent>
        <div className="admin-sidebar-brand">SuccessWikis Admin</div>
        <div className="admin-sidebar-nav">
          <button
            onClick={() => setCurrentNav("posts")}
            className={`admin-nav-item ${currentNav === "posts" ? "admin-nav-item-active" : ""}`}
          >
            Posts
          </button>
          <button
            onClick={() => setCurrentNav("featured")}
            className={`admin-nav-item ${currentNav === "featured" ? "admin-nav-item-active" : ""}`}
          >
            <span>Featured Contact Forms</span>
            {pendingCount > 0 && (
              <span className="admin-nav-badge">{pendingCount}</span>
            )}
          </button>
          <button
            onClick={() => setCurrentNav("details")}
            className={`admin-nav-item ${currentNav === "details" ? "admin-nav-item-active" : ""}`}
          >
            Approved Details
          </button>
        </div>
        <div style={{ marginTop: "auto" }}>
          <button
            onClick={handleLogout}
            className="admin-btn admin-btn-danger"
            style={{ width: "100%" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-main-content" data-lenis-prevent>
        {currentNav === "posts" ? (
          /* POSTS DASHBOARD PAGE */
          <div className="admin-page" style={{ padding: 0 }}>
            <div className="admin-header">
              <h1>Posts Directory</h1>
              <div className="admin-header-actions">
                <Link
                  href="/admin/editor"
                  className="admin-btn admin-btn-primary"
                >
                  + Create New Post
                </Link>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="admin-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin-tab ${activeTab === tab.id ? "admin-tab-active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {loading ? (
              <p>Loading posts...</p>
            ) : (
              <div className="admin-card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Image</th>
                      <th style={{ width: "20%" }}>Title</th>
                      {activeTab === "all" && <th>Type</th>}
                      <th style={{ textAlign: "center" }}>Likes</th>
                      <th>Status</th>
                      <th style={{ width: "5%" }}>Date</th>
                      <th style={{ textAlign: "right", width: "20%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id}>
                        <td className="image-td">
                          {post.image_url ? (
                            <div style={{ position: 'relative', width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #eee' }}>
                              <Image
                                src={post.image_url}
                                alt="Preview"
                                fill
                                sizes="60px"
                                style={{ objectFit: 'cover' }}
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="admin-img-placeholder">No Img</div>
                          )}
                        </td>
                        <td className="title-td" style={{ fontWeight: "500" }}>
                          {post.title}
                        </td>
                        {activeTab === "all" && (
                          <td>
                            <span
                              style={{
                                fontSize: "12px",
                                background: "#f0f0f0",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                textTransform: "capitalize",
                              }}
                            >
                              {post.post_type.replace(/_/g, " ")}
                            </span>
                          </td>
                        )}
                        <td
                          className="admin-likes-count"
                          style={{ textAlign: "center", lineHeight: "1.4" }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#38a169",
                              fontWeight: "600",
                            }}
                          >
                            Genuine:{" "}
                            {Math.max(
                              0,
                              (post.likes_count || 0) -
                                (post.initial_likes || 0),
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#dd6b20",
                              fontWeight: "600",
                            }}
                          >
                            Default: {post.initial_likes || 0}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              color: "#e53e3e",
                              marginTop: "2px",
                            }}
                          >
                            Total: {post.likes_count || 0}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`admin-status-badge ${parseInt(post.is_published) === 1 ? "admin-status-live" : "admin-status-draft"}`}
                          >
                            {parseInt(post.is_published) === 1
                              ? "• LIVE"
                              : "• DRAFT"}
                          </span>
                        </td>
                        <td
                          className="admin-date-cell"
                          style={{ color: "#666", fontSize: "13px" }}
                        >
                          {new Date(post.published_date).toLocaleDateString()}
                        </td>
                        <td
                          className="admin-actions-cell"
                          style={{ textAlign: "right" }}
                        >
                          {activeTab === "trash" ? (
                            <>
                              <button
                                onClick={() => handleRestore(post.id)}
                                className="admin-btn-link"
                                style={{ color: "#2c7a7b" }}
                              >
                                Restore
                              </button>
                            </>
                          ) : (
                            <>
                              <Link
                                href={`/admin/editor?id=${post.id}`}
                                className="admin-btn-link"
                                style={{ marginRight: "15px" }}
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="admin-btn-link admin-btn-link-danger"
                              >
                                Trash
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredPosts.length === 0 && (
                      <tr>
                        <td
                          colSpan={activeTab === "all" ? "7" : "6"}
                          style={{
                            padding: "40px",
                            textAlign: "center",
                            color: "#999",
                          }}
                        >
                          No posts found in this category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : currentNav === "details" ? (
          /* APPROVED DETAILS DIRECTORY PAGE */
          <div className="admin-page" style={{ padding: 0 }}>
            <div className="admin-header">
              <h1>Approved Submitter Details</h1>
              <p
                style={{ color: "#718096", fontSize: "14px", marginTop: "5px" }}
              >
                A directory of submitters whose Driven By Purpose stories have
                been approved.
              </p>
            </div>

            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name / Role</th>
                    <th>Company</th>
                    <th>Contact Details</th>
                    <th>LinkedIn</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions
                    .filter(
                      (sub) =>
                        isFeaturedType(sub.type) && sub.status === "approved",
                    )
                    .map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <div style={{ fontWeight: "600", color: "#2d3748" }}>
                            {sub.full_name}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#718096",
                              marginTop: "2px",
                            }}
                          >
                            {sub.role || "—"}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: "500", color: "#2d3748" }}>
                            {sub.company_name || "—"}
                          </div>
                          {sub.company_website ? (
                            <a
                              href={sub.company_website}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                fontSize: "12px",
                                color: "#3182ce",
                                textDecoration: "none",
                                display: "inline-block",
                                marginTop: "2px",
                              }}
                            >
                              Visit Website ↗
                            </a>
                          ) : (
                            <span
                              style={{ fontSize: "12px", color: "#a0aec0" }}
                            >
                              No Website
                            </span>
                          )}
                        </td>
                        <td>
                          <div style={{ fontSize: "13px", color: "#2d3748" }}>
                            <strong>Email:</strong> {sub.email}
                          </div>
                          {sub.phone && (
                            <div
                              style={{
                                fontSize: "13px",
                                color: "#4a5568",
                                marginTop: "2px",
                              }}
                            >
                              <strong>Phone:</strong> {sub.phone}
                            </div>
                          )}
                        </td>
                        <td>
                          {sub.company_linkedin ? (
                            <a
                              href={sub.company_linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="admin-asset-link"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span>LinkedIn</span> ↗
                            </a>
                          ) : (
                            <span
                              style={{ color: "#a0aec0", fontSize: "13px" }}
                            >
                              —
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            onClick={() => handleViewSub(sub)}
                            className="admin-btn-link"
                            style={{ marginRight: "15px" }}
                          >
                            View Details
                          </button>
                          {sub.post_id && (
                            <Link
                              href={`/admin/editor?id=${sub.post_id}`}
                              className="admin-btn-link"
                              style={{ color: "#3182ce" }}
                            >
                              View Draft Post
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  {submissions.filter(
                    (sub) =>
                      isFeaturedType(sub.type) && sub.status === "approved",
                  ).length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          color: "#a0aec0",
                        }}
                      >
                        No approved Driven By Purpose submissions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* FEATURED CONTACT FORMS MANAGEMENT */
          <div className="admin-page" style={{ padding: 0 }}>
            <div className="admin-header">
              <h1>Featured Form Submissions</h1>
              <p
                style={{ color: "#718096", fontSize: "14px", marginTop: "5px" }}
              >
                Review and approve form responses submitted by founders via GET
                FEATURED.
              </p>
            </div>

            {/* Category Type Filter Tabs */}
            <div
              className="admin-tabs"
              style={{
                marginBottom: "15px",
                background: "#f7fafc",
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid #edf2f7",
              }}
            >
              <button
                onClick={() => handleSubTypeChange("all")}
                className={`admin-tab ${subTypeFilter === "all" ? "admin-tab-active" : ""}`}
                style={{ padding: "6px 16px", fontSize: "13px" }}
              >
                All Types
              </button>
              <button
                onClick={() => handleSubTypeChange("driven_by_purpose")}
                className={`admin-tab ${subTypeFilter === "driven_by_purpose" ? "admin-tab-active" : ""}`}
                style={{ padding: "6px 16px", fontSize: "13px" }}
              >
                Driven By Purpose
              </button>
              <button
                onClick={() => handleSubTypeChange("founders_unfiltered")}
                className={`admin-tab ${subTypeFilter === "founders_unfiltered" ? "admin-tab-active" : ""}`}
                style={{ padding: "6px 16px", fontSize: "13px" }}
              >
                Founders Unfiltered
              </button>
              <button
                onClick={() => handleSubTypeChange("stage_behind_the_story")}
                className={`admin-tab ${subTypeFilter === "stage_behind_the_story" ? "admin-tab-active" : ""}`}
                style={{ padding: "6px 16px", fontSize: "13px" }}
              >
                Stage Behind the Story
              </button>
            </div>

            {/* Submission Filter Badges */}
            <div className="admin-tabs">
              <button
                onClick={() => setSubFilter("all")}
                className={`admin-tab ${subFilter === "all" ? "admin-tab-active" : ""}`}
              >
                All Statuses
              </button>
              <button
                onClick={() => setSubFilter("pending")}
                className={`admin-tab ${subFilter === "pending" ? "admin-tab-active" : ""}`}
              >
                Pending ⏳
              </button>
              <button
                onClick={() => setSubFilter("approved")}
                className={`admin-tab ${subFilter === "approved" ? "admin-tab-active" : ""}`}
              >
                Approved ✓
              </button>
              <button
                onClick={() => setSubFilter("rejected")}
                className={`admin-tab ${subFilter === "rejected" ? "admin-tab-active" : ""}`}
              >
                Rejected ✗
              </button>
            </div>

            {subLoading ? (
              <p>Loading submissions...</p>
            ) : (
              <div className="admin-card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Submitter</th>
                      <th>Company Name</th>
                      <th>Type</th>
                      <th>Email Address</th>
                      <th>Status</th>
                      <th>Submitted Date</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((sub) => (
                      <tr key={sub.id}>
                        <td style={{ fontWeight: "600" }}>{sub.full_name}</td>
                        <td>{sub.company_name || "N/A"}</td>
                        <td>
                          <span
                            style={{
                              fontSize: "11px",
                              background: "#edf2f7",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              textTransform: "capitalize",
                            }}
                          >
                            {sub.type.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td>{sub.email}</td>
                        <td>
                          {isFeaturedType(sub.type) ? (
                            <span
                              className={`admin-status-badge admin-badge-${sub.status}`}
                            >
                              {sub.status.toUpperCase()}
                            </span>
                          ) : (
                            <span
                              style={{ color: "#a0aec0", fontSize: "13px" }}
                            >
                              —
                            </span>
                          )}
                        </td>
                        <td style={{ color: "#718096", fontSize: "13px" }}>
                          {new Date(sub.created_at).toLocaleDateString()}{" "}
                          {new Date(sub.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            onClick={() => handleViewSub(sub)}
                            className="admin-btn-link"
                            style={{ marginRight: "15px" }}
                          >
                            View
                          </button>
                          {isFeaturedType(sub.type) && (
                            <button
                              onClick={() => handleOpenEdit(sub)}
                              className="admin-btn-link"
                              style={{ marginRight: "15px", color: "#2b6cb0" }}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="admin-btn-link admin-btn-link-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredSubmissions.length === 0 && (
                      <tr>
                        <td
                          colSpan="7"
                          style={{
                            padding: "40px",
                            textAlign: "center",
                            color: "#a0aec0",
                          }}
                        >
                          No submissions found under this status.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* DETAIL REVIEW MODAL */}
      {selectedSub && !isEditMode && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedSub(null)}
          data-lenis-prevent
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <button
              className="admin-modal-close"
              onClick={() => setSelectedSub(null)}
            >
              ×
            </button>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#1a202c",
                }}
              >
                Submissions Review
              </h2>

              {isFeaturedType(selectedSub.type) && (
                <span
                  className={`admin-status-badge admin-badge-${selectedSub.status}`}
                  style={{ fontSize: "14px", padding: "6px 16px" }}
                >
                  {selectedSub.status.toUpperCase()}
                </span>
              )}
            </div>

            {selectedSub.post_id && selectedSub.post_deleted_at && (
              <div
                style={{
                  backgroundColor: "#fffaf0",
                  border: "1px dashed #dd6b20",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "20px" }}>🗑️</span>
                  <span
                    style={{
                      color: "#dd6b20",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    The draft post generated from this submission is currently
                    in the Trash.
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to restore the associated draft post?",
                        )
                      ) {
                        await handleRestore(selectedSub.post_id);
                        fetchSubmissions();
                        alert("Draft post restored successfully!");
                        setSelectedSub(null);
                      }
                    }}
                    className="admin-btn admin-btn-primary"
                    style={{
                      backgroundColor: "#3182ce",
                      borderColor: "#3182ce",
                      fontSize: "13px",
                      padding: "6px 12px",
                    }}
                  >
                    Restore Post
                  </button>
                </div>
              </div>
            )}

            {/* Submitter Info */}
            <div className="submission-section-title">Contact Information</div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Full Name</div>
              <div className="submission-detail-val">
                {selectedSub.full_name}
              </div>
            </div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Role</div>
              <div className="submission-detail-val">
                {selectedSub.role || "N/A"}
              </div>
            </div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Personal Email</div>
              <div className="submission-detail-val">{selectedSub.email}</div>
            </div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Phone Number</div>
              <div className="submission-detail-val">
                {selectedSub.phone || "N/A"}
              </div>
            </div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Company Name</div>
              <div className="submission-detail-val">
                {selectedSub.company_name || "N/A"}
              </div>
            </div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Company Website</div>
              <div className="submission-detail-val">
                {selectedSub.company_website ? (
                  <a
                    href={selectedSub.company_website}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#3182ce" }}
                  >
                    {selectedSub.company_website}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Company LinkedIn</div>
              <div className="submission-detail-val">
                {selectedSub.company_linkedin ? (
                  <a
                    href={selectedSub.company_linkedin}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#3182ce" }}
                  >
                    {selectedSub.company_linkedin}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <div className="submission-detail-row">
              <div className="submission-detail-label">Company Email</div>
              <div className="submission-detail-val">
                {selectedSub.company_email || "N/A"}
              </div>
            </div>

            {/* Submission Specific Form Content */}
            <div
              className="submission-section-title"
              style={{ textTransform: "capitalize" }}
            >
              {selectedSub.type.replace(/_/g, " ")} Details
            </div>

            {Object.keys(selectedSub.form_data || {}).map((key) => {
              const val = selectedSub.form_data[key];

              // Handle visual/file assets separately
              if (
                [
                  "company_logo",
                  "founder_images",
                  "screenshots",
                  "brand_images",
                  "additional_visuals",
                ].includes(key)
              ) {
                return renderAsset(key, val);
              }

              const labelMap = {
                q1: "1. Introduce yourself in one line",
                q2: "2. What are you building?",
                q3: "3. Why this problem? Why now?",
                q4: "4. What does a normal day in your life actually look like?",
                q5: "5. What's one thing startup culture gets completely wrong?",
                q6: "6. What has building taught you about yourself?",
                q7: "7. What's your current biggest challenge?",
                q8: "8. What's one opinion you have that most founders may disagree with?",
                q9: "9. What advice would you give someone starting today?",
                q10: '10. Complete this sentence: "People think entrepreneurship is ________, but actually it\'s ________."',
                q11: "11. Anything unfiltered you'd like to leave readers with?",
                outer_heading: "Outer Page Post Title",
                inner_heading: "Inner Article Page Title",
                feature_title: "Featured Article Title",
                company_tagline: "Company Tagline",
                company_description: "Company Description",
              };

              const displayLabel = labelMap[key] || key.replace(/_/g, " ");

              return (
                <div className="submission-detail-row" key={key}>
                  <div
                    className="submission-detail-label"
                    style={{
                      textTransform: labelMap[key] ? "none" : "capitalize",
                    }}
                  >
                    {displayLabel}
                  </div>
                  <div
                    className="submission-detail-val"
                    style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
                  >
                    {val || "N/A"}
                  </div>
                </div>
              );
            })}

            {/* Modal Action Footer */}
            <div
              className="admin-form-actions"
              style={{
                borderTop: "1px solid #edf2f7",
                paddingTop: "20px",
                marginTop: "30px",
              }}
            >
              {isFeaturedType(selectedSub.type) && (
                <>
                  {selectedSub.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleSubmissionAction(selectedSub.id, "reject")
                        }
                        className="admin-btn admin-btn-danger"
                      >
                        Reject Submission
                      </button>
                      <button
                        onClick={() =>
                          handleSubmissionAction(selectedSub.id, "approve")
                        }
                        className="admin-btn admin-btn-primary"
                      >
                        Approve & Post Draft
                      </button>
                    </>
                  )}
                  {selectedSub.status === "approved" && selectedSub.post_id && (
                    <Link
                      href={`/admin/editor?id=${selectedSub.post_id}`}
                      onClick={() => setSelectedSub(null)}
                      className="admin-btn admin-btn-primary"
                      style={{ textDecoration: "none" }}
                    >
                      View Draft Post
                    </Link>
                  )}
                </>
              )}
              <button
                onClick={() => setSelectedSub(null)}
                className="admin-btn admin-btn-secondary"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODE MODAL FOR DRIVEN BY PURPOSE */}
      {selectedSub && isEditMode && (
        <div className="admin-modal-overlay" data-lenis-prevent>
          <div className="admin-modal-content" data-lenis-prevent>
            <button
              className="admin-modal-close"
              onClick={() => {
                setIsEditMode(false);
                setSelectedSub(null);
              }}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1a202c",
                marginBottom: "25px",
              }}
            >
              Edit Submission Details
            </h2>

            {selectedSub.post_id && selectedSub.post_deleted_at && (
              <div
                style={{
                  backgroundColor: "#fffaf0",
                  border: "1px dashed #dd6b20",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "20px" }}>🗑️</span>
                  <span
                    style={{
                      color: "#dd6b20",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    The draft post generated from this submission is currently
                    in the Trash.
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to restore the associated draft post?",
                        )
                      ) {
                        await handleRestore(selectedSub.post_id);
                        fetchSubmissions();
                        alert("Draft post restored successfully!");
                        setIsEditMode(false);
                        setSelectedSub(null);
                      }
                    }}
                    className="admin-btn admin-btn-primary"
                    style={{
                      backgroundColor: "#3182ce",
                      borderColor: "#3182ce",
                      fontSize: "13px",
                      padding: "6px 12px",
                    }}
                  >
                    Restore Post
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="admin-edit-form">
              {/* Contact Details */}
              <div className="submission-section-title">Contact details</div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "15px",
                }}
              >
                <div>
                  <label className="admin-label">Full Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editFormData.full_name}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        full_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="admin-label">Role / Designation</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editFormData.role}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, role: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">Business Email</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={editFormData.email}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="admin-label">Phone Number</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editFormData.phone}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">Company Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editFormData.company_name}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        company_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="admin-label">Company Website</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editFormData.company_website}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        company_website: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Dynamic Details - Driven by Purpose */}
              {isDrivenByPurpose(selectedSub.type) && (
                <>
                  <div className="submission-section-title">
                    Driven by Purpose Form details
                  </div>

                  <div>
                    <label className="admin-label">Feature Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.feature_title}
                      onChange={(e) => {
                        const titleVal = e.target.value;
                        const generatedSlug = slugify(titleVal);
                        setEditFormData((prev) => ({
                          ...prev,
                          feature_title: titleVal,
                          slug:
                            !prev.slug ||
                            prev.slug === slugify(prev.feature_title)
                              ? generatedSlug
                              : prev.slug,
                        }));
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Outer Post Title (Outer Heading)
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.outer_heading || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          outer_heading: e.target.value,
                        })
                      }
                      placeholder="Enter outer post title..."
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Inner Title (Inner Heading)
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.inner_heading || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          inner_heading: e.target.value,
                        })
                      }
                      placeholder="Enter inner title..."
                    />
                  </div>

                  <div>
                    <label className="admin-label">Company Tagline</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.company_tagline}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          company_tagline: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Company Description (800-1000 words)
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "220px" }}
                      value={editFormData.company_description}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          company_description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">Slug (URL Path)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.slug || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const formattedSlug = val
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^a-z0-9\-]/g, "");
                        setEditFormData((prev) => ({
                          ...prev,
                          slug: formattedSlug,
                        }));
                      }}
                      placeholder="e.g. my-startup-story (leave empty by default)"
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Meta Description (Title Description)
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "80px" }}
                      value={editFormData.meta_description || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          meta_description: e.target.value,
                        })
                      }
                      placeholder="Brief snippet for SEO results..."
                    />
                  </div>

                  <div>
                    <label className="admin-label">Thumbnail Image URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.thumbnail || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          thumbnail: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Additional Notes or Links
                    </label>
                    <textarea
                      className="admin-textarea"
                      value={editFormData.additional_notes}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          additional_notes: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              {(selectedSub.type === "stage_behind_story" ||
                selectedSub.type === "stage_behind_the_story") && (
                <>
                  <div className="submission-section-title">
                    Stage Behind the Story details
                  </div>

                  <div>
                    <label className="admin-label">
                      Outer Post Title (Outer Heading)
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.outer_heading || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          outer_heading: e.target.value,
                        })
                      }
                      placeholder="Enter outer post title..."
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Inner Title (Inner Heading)
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.inner_heading || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          inner_heading: e.target.value,
                        })
                      }
                      placeholder="Enter inner title..."
                    />
                  </div>

                  <div>
                    <label className="admin-label">One-Sentence Pitch</label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "80px" }}
                      value={editFormData.one_sentence_pitch}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          one_sentence_pitch: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      What is one belief or experience that defines your
                      approach?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "150px" }}
                      value={editFormData.belief_or_experience}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          belief_or_experience: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      A rarely asked story about how you started:
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "150px" }}
                      value={editFormData.rarely_asked_story}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          rarely_asked_story: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Why do you belong in this space?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "150px" }}
                      value={editFormData.why_belongs}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          why_belongs: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}

              {selectedSub.type === "founders_unfiltered" && (
                <>
                  <div className="submission-section-title">
                    Founders Unfiltered questions
                  </div>

                  <div>
                    <label className="admin-label">
                      Outer Post Title (Outer Heading)
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.outer_heading || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          outer_heading: e.target.value,
                        })
                      }
                      placeholder="Enter outer post title..."
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      Inner Title (Inner Heading)
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.inner_heading || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          inner_heading: e.target.value,
                        })
                      }
                      placeholder="Enter inner title..."
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      1. Introduce yourself in one line
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.q1}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q1: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      2. What are you building?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q2}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q2: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      3. Why this problem? Why now?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q3}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q3: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      4. What does a normal day in your life actually look like?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q4}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q4: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      5. What's one thing startup culture gets completely wrong?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q5}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q5: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      6. What has building taught you about yourself?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q6}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q6: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      7. What's your current biggest challenge?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q7}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q7: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      8. What's one opinion you have that most founders may
                      disagree with?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q8}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q8: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      9. What advice would you give someone starting today?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "100px" }}
                      value={editFormData.q9}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, q9: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      10. Complete this sentence: "People think entrepreneurship
                      is ________, but actually it's ________."
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editFormData.q10}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          q10: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">
                      11. Anything unfiltered you'd like to leave readers with?
                    </label>
                    <textarea
                      className="admin-textarea"
                      style={{ height: "120px" }}
                      value={editFormData.q11}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          q11: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}

              <div
                className="admin-form-actions"
                style={{
                  borderBottom: "1px solid #edf2f7",
                  paddingBottom: "20px",
                  marginBottom: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsEditMode(false);
                    setSelectedSub(null);
                  }}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Submission Changes
                </button>
              </div>

              {isFeaturedType(selectedSub.type) && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "#718096", fontSize: "13px" }}>
                    Submission Status:{" "}
                    <strong
                      style={{
                        textTransform: "uppercase",
                        color:
                          selectedSub.status === "pending"
                            ? "#dd6b20"
                            : "#2b6cb0",
                      }}
                    >
                      {selectedSub.status}
                    </strong>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {selectedSub.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditMode(false);
                            handleSubmissionAction(selectedSub.id, "reject");
                          }}
                          className="admin-btn admin-btn-danger"
                        >
                          Reject Submission
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const success = await saveSubmissionEdits();
                            if (success) {
                              setIsEditMode(false);
                              handleSubmissionAction(selectedSub.id, "approve");
                            } else {
                              alert("Failed to save changes before approval.");
                            }
                          }}
                          className="admin-btn admin-btn-primary"
                        >
                          Approve & Post Draft
                        </button>
                      </>
                    )}
                    {selectedSub.status === "approved" &&
                      selectedSub.post_id && (
                        <Link
                          href={`/admin/editor?id=${selectedSub.post_id}`}
                          onClick={() => {
                            setIsEditMode(false);
                            setSelectedSub(null);
                          }}
                          className="admin-btn admin-btn-primary"
                          style={{ textDecoration: "none" }}
                        >
                          View Draft Post
                        </Link>
                      )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
