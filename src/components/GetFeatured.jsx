"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../css/get-featured.css";
import bannerImg from "../assets/contact-page/banner.jpg";
import { getApiBaseUrl } from "../lib/api";

export default function GetFeatured() {
  const [activeBox, setActiveBox] = useState("home"); // 'home', 'driven_by_purpose', 'stage_behind_the_story', 'founders_unfiltered'
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // OTP State for Driven by Purpose
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  // Common Contact Information State
  const [contactInfo, setContactInfo] = useState({
    full_name: "",
    role: "",
    email: "",
    phone: "",
    company_name: "",
    company_website: "",
    company_linkedin: "",
    company_email: "",
  });

  // Driven by Purpose State
  const [drivenDetails, setDrivenDetails] = useState({
    feature_title: "",
    company_tagline: "",
    company_description: "",
    additional_notes: "",
  });
  const [drivenFiles, setDrivenFiles] = useState({
    company_logo: null,
    founder_images: null,
    screenshots: null,
    brand_images: null,
    additional_visuals: null,
  });

  // Stage Behind the Story State
  const [stageDetails, setStageDetails] = useState({
    one_sentence_pitch: "",
    belief_or_experience: "",
    rarely_asked_story: "",
    why_belongs: "",
  });

  // Founders Unfiltered State
  const [foundersDetails, setFoundersDetails] = useState({
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

  const handleContactChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const countWords = (text) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  // Check contact form validation
  const validateContactStep = () => {
    const nameVal = contactInfo.full_name.trim();
    if (!nameVal) return "Full Name is required.";
    if (nameVal.length < 2) {
      return "Full Name must be at least 2 characters long.";
    }
    const nameRegex = /^[a-zA-Z\s\.\-\']+$/;
    if (!nameRegex.test(nameVal)) {
      return "Full Name can only contain letters, spaces, dots, hyphens, and apostrophes.";
    }

    const roleVal = contactInfo.role.trim();
    if (!roleVal) return "Role / Designation is required.";
    if (roleVal.length < 2) {
      return "Role / Designation must be at least 2 characters long.";
    }

    const emailVal = contactInfo.email.trim();
    if (!emailVal) return "Business Email Address is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      return "Please enter a valid Business Email Address.";
    }

    const phoneVal = contactInfo.phone.trim();
    if (!phoneVal) return "Phone Number is required.";
    
    // Check digits count (must be at least 10 numbers/digits and at most 15 digits)
    const digitsOnly = phoneVal.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return "Phone Number must contain at least 10 digits.";
    }
    if (digitsOnly.length > 15) {
      return "Phone Number cannot exceed 15 digits.";
    }
    // Accept standard international symbols: optional leading +, spaces, dashes, parentheses
    const phoneRegex = /^\+?[0-9\s\-()]+$/;
    if (!phoneRegex.test(phoneVal)) {
      return "Phone Number contains invalid characters. Only digits, spaces, dashes, parentheses, and a leading '+' are allowed.";
    }

    const companyVal = contactInfo.company_name.trim();
    if (!companyVal) return "Company Name is required.";
    if (companyVal.length < 2) {
      return "Company Name must be at least 2 characters long.";
    }

    // Validate required website
    const websiteVal = contactInfo.company_website.trim();
    if (!websiteVal) {
      return "Company Website is required.";
    } else {
      const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
      if (!urlRegex.test(websiteVal)) {
        return "Company Website must be a valid URL (e.g., https://example.com).";
      }
    }

    // Validate required LinkedIn (stricter validation)
    const linkedinVal = contactInfo.company_linkedin.trim();
    if (!linkedinVal) {
      return "Company LinkedIn is required.";
    } else {
      const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
      const linkedinStr = linkedinVal.toLowerCase();
      // Ensure it contains linkedin.com/in/, /company/, /school/, /showcase/, or /pub/ and something after it
      const hasValidPath = /(linkedin\.com\/(in|company|school|showcase|pub)\/[a-zA-Z0-9_\-\.\%]+)/.test(linkedinStr);
      if (!urlRegex.test(linkedinStr) || !hasValidPath) {
        return "Company LinkedIn must be a valid profile or company URL (e.g., https://linkedin.com/company/example).";
      }
    }

    if (activeBox !== "driven_by_purpose" && contactInfo.company_email.trim()) {
      if (!emailRegex.test(contactInfo.company_email.trim())) {
        return "Company Email must be a valid email address.";
      }
    }

    if (activeBox === "driven_by_purpose" && !isEmailVerified) {
      return "Please verify your Business Email Address with the OTP sent to proceed.";
    }

    return "";
  };

  const sendOTP = async () => {
    setOtpError("");
    setOtpSuccess("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email.trim() || !emailRegex.test(contactInfo.email.trim())) {
      setOtpError("Please enter a valid Business Email Address first.");
      return;
    }
    setOtpSending(true);
    try {
      const formData = new FormData();
      formData.append("action", "send");
      formData.append("email", contactInfo.email.trim());
      const apiBaseURL = getApiBaseUrl();
      const res = await fetch(`${apiBaseURL}/api/otp.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        setOtpSent(true);
        setOtpSuccess(data.message);
      } else {
        setOtpError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setOtpError("Network error. Could not send OTP.");
    } finally {
      setOtpSending(false);
    }
  };

  const verifyOTP = async () => {
    setOtpError("");
    setOtpSuccess("");
    if (!otp.trim()) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }
    setOtpVerifying(true);
    try {
      const formData = new FormData();
      formData.append("action", "verify");
      formData.append("email", contactInfo.email.trim());
      formData.append("otp", otp.trim());
      const apiBaseURL = getApiBaseUrl();
      const res = await fetch(`${apiBaseURL}/api/otp.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        setIsEmailVerified(true);
        setOtpSuccess("Business Email Verified successfully!");
        setOtpError("");
      } else {
        setOtpError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setOtpError("Network error. Could not verify OTP.");
    } finally {
      setOtpVerifying(false);
    }
  };

  // Check Step 2 validation
  const validateStepTwo = () => {
    if (activeBox === "driven_by_purpose") {
      if (!drivenDetails.feature_title.trim()) return "Feature Title is required.";
      if (!drivenDetails.company_tagline.trim()) return "Company Tagline is required.";
      if (!drivenDetails.company_description.trim()) return "Company Description is required.";
      
      const words = countWords(drivenDetails.company_description);
      if (words < 100) {
        return `Please provide a more detailed company description (minimum 100 words, currently ${words} words).`;
      }
    } else if (activeBox === "stage_behind_the_story") {
      if (!stageDetails.one_sentence_pitch.trim()) return "One-sentence startup pitch is required.";
      if (!stageDetails.belief_or_experience.trim()) return "Belief or experience is required.";
      if (!stageDetails.rarely_asked_story.trim()) return "Unasked story part is required.";
      if (!stageDetails.why_belongs.trim()) return "Why your story belongs here is required.";
    } else if (activeBox === "founders_unfiltered") {
      for (let i = 1; i <= 11; i++) {
        if (!foundersDetails[`q${i}`].trim()) {
          return `Founder Question ${i} is required.`;
        }
      }
    }
    return "";
  };

  const handleNextStep = () => {
    setErrorMsg("");
    
    if (currentStep === 1) {
      const err = validateContactStep();
      if (err) {
        setErrorMsg(err);
        const formEl = document.querySelector(".form-progress-indicator");
        if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    } else if (currentStep === 2) {
      const err = validateStepTwo();
      if (err) {
        setErrorMsg(err);
        const formEl = document.querySelector(".form-progress-indicator");
        if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (e.target.multiple) {
      setDrivenFiles({ ...drivenFiles, [name]: Array.from(files) });
    } else {
      setDrivenFiles({ ...drivenFiles, [name]: files[0] });
    }
  };

  const resetForm = () => {
    setActiveBox("home");
    setCurrentStep(1);
    setIsSuccess(false);
    setErrorMsg("");
    setOtp("");
    setOtpSent(false);
    setIsEmailVerified(false);
    setOtpError("");
    setOtpSuccess("");
    setContactInfo({
      full_name: "",
      role: "",
      email: "",
      phone: "",
      company_name: "",
      company_website: "",
      company_linkedin: "",
      company_email: "",
    });
    setDrivenDetails({
      feature_title: "",
      company_tagline: "",
      company_description: "",
      additional_notes: "",
    });
    setDrivenFiles({
      company_logo: null,
      founder_images: null,
      screenshots: null,
      brand_images: null,
      additional_visuals: null,
    });
    setStageDetails({
      one_sentence_pitch: "",
      belief_or_experience: "",
      rarely_asked_story: "",
      why_belongs: "",
    });
    setFoundersDetails({
      q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: "", q11: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate ALL steps before allowing submission!
    const contactErr = validateContactStep();
    if (contactErr) {
      setErrorMsg(contactErr);
      setCurrentStep(1);
      const formEl = document.querySelector(".form-progress-indicator");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const stepTwoErr = validateStepTwo();
    if (stepTwoErr) {
      setErrorMsg(stepTwoErr);
      setCurrentStep(2);
      const formEl = document.querySelector(".form-progress-indicator");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("type", activeBox);
      
      // Contact details
      Object.keys(contactInfo).forEach((key) => {
        formData.append(key, contactInfo[key]);
      });

      // Feature specific details
      if (activeBox === "driven_by_purpose") {
        Object.keys(drivenDetails).forEach((key) => {
          formData.append(key, drivenDetails[key]);
        });
        
        // Append files
        if (drivenFiles.company_logo) {
          formData.append("company_logo", drivenFiles.company_logo);
        }
        
        const multipleFileKeys = ["founder_images", "screenshots", "brand_images", "additional_visuals"];
        multipleFileKeys.forEach((key) => {
          if (drivenFiles[key] && Array.isArray(drivenFiles[key])) {
            drivenFiles[key].forEach((file, index) => {
              formData.append(`${key}[]`, file);
            });
          }
        });

      } else if (activeBox === "stage_behind_the_story") {
        Object.keys(stageDetails).forEach((key) => {
          formData.append(key, stageDetails[key]);
        });
      } else if (activeBox === "founders_unfiltered") {
        Object.keys(foundersDetails).forEach((key) => {
          formData.append(key, foundersDetails[key]);
        });
      }

      const apiBaseURL = getApiBaseUrl();
      const res = await fetch(`${apiBaseURL}/api/featured.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.status === "success") {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.message || "Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileLabel = (files) => {
    if (!files) return "No file chosen";
    if (Array.isArray(files)) {
      return `${files.length} file(s) selected`;
    }
    return files.name;
  };

  return (
    <div className="get-featured-page">
      <div className="get-featured-container">
        {activeBox === "home" ? (
          <>
            {/* HERO HERO SECTION */}
            <div className="featured-hero-section">
              <div className="featured-hero-content">
                <span className="featured-badge">Get Featured</span>
                <h1>Be a part of SuccessWikis!</h1>
                <p>
                  Every startup has a story. Some are built from purpose, some
                  from chaos, and some from the moments nobody sees. Choose how
                  you'd like to be featured on SuccessWikis.
                </p>
              </div>
              <div className="featured-hero-image-wrapper" style={{ position: 'relative', width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src={bannerImg}
                  alt="SuccessWikis Founders"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  style={{ objectFit: 'cover' }}
                  priority
                  unoptimized={typeof bannerImg !== 'object'}
                />
              </div>
            </div>

            {/* THREE OPTION BOXES */}
            <div className="featured-options-grid">
              {/* Driven by Purpose */}
              <div
                className="featured-option-card"
                onClick={() => {
                  setActiveBox("driven_by_purpose");
                  setCurrentStep(1);
                }}
              >
                <div>
                  <div className="card-icon-box">🚀</div>
                  <h3>Driven by Purpose</h3>
                  <p>
                    Tell your company's story in your way. Submit a complete feature detailing your mission, milestones, and what makes your startup worth knowing.
                  </p>
                </div>
                <div className="card-meta-info">
                  Submit Story & Visuals <span>→</span>
                </div>
              </div>

              {/* Stage Behind the Story */}
              <div
                className="featured-option-card"
                onClick={() => {
                  setActiveBox("stage_behind_the_story");
                  setCurrentStep(1);
                }}
              >
                <div>
                  <div className="card-icon-box">🎭</div>
                  <h3>Stage Behind the Story</h3>
                  <p>
                    Dive into the human side of entrepreneurship: the decisions, struggles, turning points, and moments that shaped your journey.
                  </p>
                </div>
                <div className="card-meta-info">
                  Apply for Interview <span>→</span>
                </div>
              </div>

              {/* Founders Unfiltered */}
              <div
                className="featured-option-card"
                onClick={() => {
                  setActiveBox("founders_unfiltered");
                  setCurrentStep(1);
                }}
              >
                <div>
                  <div className="card-icon-box">🎙️</div>
                  <h3>Founders Unfiltered</h3>
                  <p>
                    A rapid-fire, raw Q&A series where founders answer direct questions in their own voice with minimal edits.
                  </p>
                </div>
                <div className="card-meta-info">
                  Start Rapid Q&A <span>→</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* INNER DETAILED PAGES FOR SELECTED BOX */
          <div className="inner-page-layout">
            <div className="inner-left-details">
              <button onClick={resetForm} className="back-link-btn">
                ← Back to Featured Options
              </button>

              {activeBox === "driven_by_purpose" && (
                <>
                  <h2>Driven by Purpose</h2>
                  <p className="description">
                    Driven by Purpose is where founders and teams can directly
                    submit a complete company feature. Share your journey,
                    mission, milestones, and what makes your startup worth
                    knowing. Once reviewed and approved by our team, it will be
                    published on SuccessWikis.
                    <br />
                    <br />
                    <strong>Best for:</strong> Startups that already have their
                    story, visuals, and messaging ready.
                  </p>
                  <div className="feature-highlights">
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Full control over your company story & messaging</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Embed high-resolution logos, screenshots & founder assets</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Directly publish to the Driven by Purpose section after review</p>
                    </div>
                  </div>
                </>
              )}

              {activeBox === "stage_behind_the_story" && (
                <>
                  <h2>Stage Behind the Story</h2>
                  <p className="description">
                    Behind every founder story is a version nobody sees.
                    <br />
                    <br />
                    Stage Behind the Story dives into the human side of
                    entrepreneurship: the decisions, struggles, turning points,
                    and moments that shaped the journey. This is an
                    application-based feature where we shortlist stories and
                    conduct deeper founder conversations.
                    <br />
                    <br />
                    <strong>Best for:</strong> Founders with stories worth
                    unpacking beyond headlines and metrics.
                  </p>
                  <div className="feature-highlights">
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Focuses on struggles, turning points & decisions</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Application-based deep-dive founder conversations</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Get a fully tailored highlight write-up by our editing team</p>
                    </div>
                  </div>
                </>
              )}

              {activeBox === "founders_unfiltered" && (
                <>
                  <h2>Founders Unfiltered</h2>
                  <p className="description">
                    Raw answers. Real founders. Minimal edits.
                    <br />
                    <br />
                    Founders Unfiltered is a rapid-fire Q&A series where
                    founders answer direct questions in their own voice.
                    Responses are published with little to no editing to
                    preserve authenticity.
                    <br />
                    <br />
                    <strong>Best for:</strong> Founders who want honest
                    conversations over polished narratives.
                  </p>
                  <div className="feature-highlights">
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>11 raw, thought-provoking questions</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Zero content alteration - completely unfiltered</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <p>Preserve authentic insights and founder style</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* STEP BY STEP FORM WIZARD */}
            <div className="step-form-wizard-card">
              {isSuccess ? (
                <div className="success-overlay">
                  <div className="success-icon-badge">✓</div>
                  <h3>Submission Successful!</h3>
                  <p>
                    Thank you for applying to be featured on SuccessWikis.
                    We have received your form and a confirmation reminder has been emailed. Our editorial board will review your submission shortly.
                  </p>
                  <button onClick={resetForm} className="premium-btn btn-primary">
                    Go Back to Home
                  </button>
                </div>
              ) : isSubmitting ? (
                <div className="loader-overlay">
                  <div className="spinner"></div>
                  <h3>Sending Submission...</h3>
                  <p>Please wait while we secure your data and notify our admins.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="step-form-wrapper">
                  {/* PROGRESS BAR */}
                  <div className="form-progress-indicator">
                    <div
                      className="progress-line-fill"
                      style={{
                        width:
                          activeBox === "driven_by_purpose"
                            ? currentStep === 1
                              ? "0%"
                              : currentStep === 2
                              ? "50%"
                              : "100%"
                            : currentStep === 1
                            ? "0%"
                            : "100%",
                      }}
                    ></div>
                    <div
                      className={`progress-step-node ${
                        currentStep >= 1 ? "active" : ""
                      } ${currentStep > 1 ? "completed" : ""}`}
                    >
                      1
                      <span className="step-label">Contact Info</span>
                    </div>
                    <div
                      className={`progress-step-node ${
                        currentStep >= 2 ? "active" : ""
                      } ${
                        (activeBox === "driven_by_purpose" && currentStep > 2) ||
                        (activeBox !== "driven_by_purpose" && currentStep > 1)
                          ? "completed"
                          : ""
                      }`}
                    >
                      2
                      <span className="step-label">
                        {activeBox === "driven_by_purpose"
                          ? "Submission Details"
                          : activeBox === "stage_behind_the_story"
                          ? "Interest Form"
                          : "Founder Questions"}
                      </span>
                    </div>
                    {activeBox === "driven_by_purpose" && (
                      <div
                        className={`progress-step-node ${
                          currentStep === 3 ? "active" : ""
                        }`}
                      >
                        3
                        <span className="step-label">Upload Assets</span>
                      </div>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="form-validation-error">
                      <span>⚠️</span> {errorMsg}
                    </div>
                  )}

                  {/* STEP 1: CONTACT INFORMATION */}
                  {currentStep === 1 && (
                    <div className="step-form-body">
                      <div>
                        <h3 className="form-step-title">Contact Information</h3>
                        <p className="form-step-subtitle">
                          Please provide correct details so our editorial team can follow up with you.
                        </p>
                      </div>

                      <div className="form-row-grid">
                        <div className="form-input-group">
                          <label>
                            Full Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            name="full_name"
                            value={contactInfo.full_name}
                            onChange={handleContactChange}
                            className="premium-input"
                            required
                          />
                        </div>

                        <div className="form-input-group">
                          <label>
                            Role / Designation <span>*</span>
                          </label>
                          <input
                            type="text"
                            name="role"
                            value={contactInfo.role}
                            onChange={handleContactChange}
                            className="premium-input"
                            placeholder="e.g. Founder, CEO"
                            required
                          />
                        </div>

                        <div className="form-input-group">
                          <label>
                            Business Email Address <span>*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={contactInfo.email}
                            onChange={(e) => {
                              handleContactChange(e);
                              setIsEmailVerified(false);
                              setOtpSent(false);
                              setOtp("");
                              setOtpSuccess("");
                            }}
                            className="premium-input"
                            required
                            disabled={isEmailVerified}
                          />
                        </div>

                        <div className="form-input-group">
                          <label>
                            Phone Number <span>*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={contactInfo.phone}
                            onChange={handleContactChange}
                            className="premium-input"
                            required
                          />
                        </div>

                        <div className="form-input-group">
                          <label>
                            Company Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            name="company_name"
                            value={contactInfo.company_name}
                            onChange={handleContactChange}
                            className="premium-input"
                            required
                          />
                        </div>

                        <div className="form-input-group">
                          <label>
                            Company Website <span>*</span>
                          </label>
                          <input
                            type="url"
                            name="company_website"
                            value={contactInfo.company_website}
                            onChange={handleContactChange}
                            className="premium-input"
                            placeholder="https://example.com"
                            required
                          />
                        </div>

                        <div className="form-input-group">
                          <label>
                            Company LinkedIn <span>*</span>
                          </label>
                          <input
                            type="url"
                            name="company_linkedin"
                            value={contactInfo.company_linkedin}
                            onChange={handleContactChange}
                            className="premium-input"
                            placeholder="https://linkedin.com/company/..."
                            required
                          />
                        </div>

                        {activeBox !== "driven_by_purpose" && (
                          <div className="form-input-group">
                            <label>Company Email</label>
                            <input
                              type="email"
                              name="company_email"
                              value={contactInfo.company_email}
                              onChange={handleContactChange}
                              className="premium-input"
                            />
                          </div>
                        )}
                      </div>

                      {/* OTP Verification Section for Driven by Purpose */}
                      {activeBox === "driven_by_purpose" && (
                        <div className="otp-verification-section">
                          <h4 className="otp-title">Business Email Verification</h4>
                          {otpError && <div className="otp-error-msg"><span>⚠️</span> {otpError}</div>}
                          {otpSuccess && <div className="otp-success-msg"><span>✓</span> {otpSuccess}</div>}
                          
                          {isEmailVerified ? (
                            <div className="otp-success-badge">
                              ✓ Business Email Verified
                            </div>
                          ) : !otpSent ? (
                            <div className="otp-init-box">
                              <p>We need to verify your business email before proceeding.</p>
                              <button type="button" onClick={sendOTP} className="otp-btn otp-btn-send" disabled={otpSending}>
                                {otpSending ? "Sending..." : "Send Verification Code"}
                              </button>
                            </div>
                          ) : (
                            <div className="otp-verify-box">
                              <p>Enter the 6-digit code sent to your email.</p>
                              <div className="otp-input-row">
                                <input
                                  type="text"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                  placeholder="000000"
                                  className="premium-input otp-input"
                                />
                                <button type="button" onClick={verifyOTP} className="otp-btn otp-btn-verify" disabled={otpVerifying}>
                                  {otpVerifying ? "Verifying..." : "Verify Code"}
                                </button>
                              </div>
                              <button type="button" onClick={sendOTP} className="otp-resend-link" disabled={otpSending}>
                                Didn't receive the code? Resend
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="form-navigation-actions">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="premium-btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="premium-btn btn-primary"
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DYNAMIC DETAILS */}
                  {currentStep === 2 && (
                    <div className="step-form-body">
                      {/* DRIVEN BY PURPOSE DETAILS */}
                      {activeBox === "driven_by_purpose" && (
                        <>
                          <div>
                            <h3 className="form-step-title">Submission Details</h3>
                            <p className="form-step-subtitle">
                              Tell your company's story in your own words.
                            </p>
                          </div>

                          <div className="form-input-group full-width">
                            <label>Feature Title</label>
                            <input
                              type="text"
                              value={drivenDetails.feature_title}
                              onChange={(e) =>
                                setDrivenDetails({
                                  ...drivenDetails,
                                  feature_title: e.target.value,
                                })
                              }
                              className="premium-input"
                              placeholder="What should we call this story?"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width">
                            <label>Company Tagline</label>
                            <input
                              type="text"
                              value={drivenDetails.company_tagline}
                              onChange={(e) =>
                                setDrivenDetails({
                                  ...drivenDetails,
                                  company_tagline: e.target.value,
                                })
                              }
                              className="premium-input"
                              placeholder="One line that captures what you do."
                              required
                            />
                          </div>

                          <div className="form-input-group full-width">
                            <label>Describe your company in 800-1000 words</label>
                            <textarea
                              value={drivenDetails.company_description}
                              onChange={(e) =>
                                setDrivenDetails({
                                  ...drivenDetails,
                                  company_description: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              placeholder="Share your journey, mission, milestones, obstacles, and future plans..."
                              required
                            />
                            <div
                              className={`text-area-counter ${
                                countWords(drivenDetails.company_description) >=
                                800
                                  ? "limit-met"
                                  : ""
                              }`}
                            >
                              Words:{" "}
                              {countWords(drivenDetails.company_description)} /
                              800 (Min recommended)
                            </div>
                          </div>
                        </>
                      )}

                      {/* STAGE BEHIND THE STORY DETAILS */}
                      {activeBox === "stage_behind_the_story" && (
                        <>
                          <div>
                            <h3 className="form-step-title">Interest Form</h3>
                            <p className="form-step-subtitle">
                              Help us understand the unseen struggles behind your brand.
                            </p>
                          </div>

                          <div className="form-input-group full-width">
                            <label>Tell us about your startup in one sentence</label>
                            <textarea
                              value={stageDetails.one_sentence_pitch}
                              onChange={(e) =>
                                setStageDetails({
                                  ...stageDetails,
                                  one_sentence_pitch: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width">
                            <label>
                              What belief or experience pushed you into solving this problem?
                            </label>
                            <textarea
                              value={stageDetails.belief_or_experience}
                              onChange={(e) =>
                                setStageDetails({
                                  ...stageDetails,
                                  belief_or_experience: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width">
                            <label>What part of your story do people rarely ask about?</label>
                            <textarea
                              value={stageDetails.rarely_asked_story}
                              onChange={(e) =>
                                setStageDetails({
                                  ...stageDetails,
                                  rarely_asked_story: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width">
                            <label>
                              Why do you think your story belongs on Stage Behind the Story?
                            </label>
                            <textarea
                              value={stageDetails.why_belongs}
                              onChange={(e) =>
                                setStageDetails({
                                  ...stageDetails,
                                  why_belongs: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>
                        </>
                      )}

                      {/* FOUNDERS UNFILTERED DETAILS */}
                      {activeBox === "founders_unfiltered" && (
                        <div>
                          <div>
                            <h3 className="form-step-title">Founder Questions</h3>
                            <p className="form-step-subtitle">
                              Fast-fire, direct questions in your own voice. Keep answers authentic.
                            </p>
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>1. Introduce yourself in one line</label>
                            <input
                              type="text"
                              value={foundersDetails.q1}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q1: e.target.value,
                                })
                              }
                              className="premium-input"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>2. What are you building?</label>
                            <textarea
                              value={foundersDetails.q2}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q2: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>3. Why this problem? Why now?</label>
                            <textarea
                              value={foundersDetails.q3}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q3: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>4. What does a normal day in your life actually look like?</label>
                            <textarea
                              value={foundersDetails.q4}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q4: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>5. What's one thing startup culture gets completely wrong?</label>
                            <textarea
                              value={foundersDetails.q5}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q5: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>6. What has building taught you about yourself?</label>
                            <textarea
                              value={foundersDetails.q6}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q6: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>7. What's your current biggest challenge?</label>
                            <textarea
                              value={foundersDetails.q7}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q7: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>
                              8. What's one opinion you have that most founders may disagree
                              with?
                            </label>
                            <textarea
                              value={foundersDetails.q8}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q8: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>9. What advice would you give someone starting today?</label>
                            <textarea
                              value={foundersDetails.q9}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q9: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>
                              10. Complete this sentence: "People think entrepreneurship is
                              ________, but actually it's ________."
                            </label>
                            <input
                              type="text"
                              value={foundersDetails.q10}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q10: e.target.value,
                                })
                              }
                              className="premium-input"
                              placeholder="People think entrepreneurship is..., but actually it's..."
                              required
                            />
                          </div>

                          <div className="form-input-group full-width" style={{marginBottom: "20px"}}>
                            <label>11. Anything unfiltered you'd like to leave readers with?</label>
                            <textarea
                              value={foundersDetails.q11}
                              onChange={(e) =>
                                setFoundersDetails({
                                  ...foundersDetails,
                                  q11: e.target.value,
                                })
                              }
                              className="premium-textarea"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div className="form-navigation-actions">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="premium-btn btn-secondary"
                        >
                          ← Back
                        </button>
                        {activeBox === "driven_by_purpose" ? (
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="premium-btn btn-primary"
                          >
                            Next Step →
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="premium-btn btn-primary"
                          >
                            Submit Application ✓
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: UPLOAD ASSETS (DRIVEN BY PURPOSE ONLY) */}
                  {currentStep === 3 && activeBox === "driven_by_purpose" && (
                    <div className="step-form-body">
                      <div>
                        <h3 className="form-step-title">Upload Assets</h3>
                        <p className="form-step-subtitle">
                          Provide visual brand assets to premiumize your featured story.
                        </p>
                      </div>

                      <div className="form-row-grid">
                        <div className="form-input-group">
                          <label>Company Logo</label>
                          <div className="premium-upload-box">
                            <div className="upload-icon">📁</div>
                            <p className="upload-text">
                              {renderFileLabel(drivenFiles.company_logo)}
                            </p>
                            <p className="upload-hint">JPG, PNG or WEBP up to 5MB</p>
                            <input
                              type="file"
                              name="company_logo"
                              accept="image/*"
                              onChange={handleFileChange}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-input-group">
                          <label>Founder / Team Images</label>
                          <div className="premium-upload-box">
                            <div className="upload-icon">👥</div>
                            <p className="upload-text">
                              {renderFileLabel(drivenFiles.founder_images)}
                            </p>
                            <p className="upload-hint">Upload multiple images</p>
                            <input
                              type="file"
                              name="founder_images"
                              accept="image/*"
                              multiple
                              onChange={handleFileChange}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-input-group">
                          <label>Product Screenshots</label>
                          <div className="premium-upload-box">
                            <div className="upload-icon">💻</div>
                            <p className="upload-text">
                              {renderFileLabel(drivenFiles.screenshots)}
                            </p>
                            <p className="upload-hint">Upload multiple screenshots</p>
                            <input
                              type="file"
                              name="screenshots"
                              accept="image/*"
                              multiple
                              onChange={handleFileChange}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-input-group">
                          <label>Brand / Marketing Images</label>
                          <div className="premium-upload-box">
                            <div className="upload-icon">🎨</div>
                            <p className="upload-text">
                              {renderFileLabel(drivenFiles.brand_images)}
                            </p>
                            <p className="upload-hint">Upload multiple graphics</p>
                            <input
                              type="file"
                              name="brand_images"
                              accept="image/*"
                              multiple
                              onChange={handleFileChange}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-input-group full-width">
                          <label>Additional Visuals or Media PDF</label>
                          <div className="premium-upload-box">
                            <div className="upload-icon">📄</div>
                            <p className="upload-text">
                              {renderFileLabel(drivenFiles.additional_visuals)}
                            </p>
                            <p className="upload-hint">
                              Any other graphics or PDF press kits
                            </p>
                            <input
                              type="file"
                              name="additional_visuals"
                              accept="image/*,application/pdf"
                              multiple
                              onChange={handleFileChange}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-input-group full-width">
                          <label>Additional Notes or Links</label>
                          <textarea
                            value={drivenDetails.additional_notes}
                            onChange={(e) =>
                              setDrivenDetails({
                                ...drivenDetails,
                                additional_notes: e.target.value,
                              })
                            }
                            className="premium-textarea"
                            placeholder="Add links to videos, press coverage, social profiles or specific instructions..."
                          />
                        </div>
                      </div>

                      <div className="form-navigation-actions">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="premium-btn btn-secondary"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          className="premium-btn btn-primary"
                        >
                          Submit Story & Assets ✓
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
