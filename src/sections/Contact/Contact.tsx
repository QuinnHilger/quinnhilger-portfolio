import { useState, useEffect, useRef, type FormEvent } from "react";
import "./Contact.css";
import resumePdf from "../../assets/docs/8-24-Resume.pdf";
import yosemiteImg from "../../assets/yosemite.jpg";
import bostonMapImg from "../../assets/Boston-Map-Cropped.png";

// Icons
const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const LoadingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);

  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = [
      photoRef.current,
      textRef.current,
      formCardRef.current,
      infoCardRef.current,
    ];
    elements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Show toast notification
    setShowToast(true);

    // Build mailto link with form data
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );

    // Small delay to show toast before redirect
    setTimeout(() => {
      window.location.href = `mailto:quinnhilger@gmail.com?subject=${subject}&body=${body}`;
      // Hide toast after redirect attempt
      setTimeout(() => setShowToast(false), 2000);
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <header className="contact__header">
          <div className="contact__photo-wrapper" ref={photoRef}>
            <img
              src={yosemiteImg}
              alt="Quinn at Yosemite"
              className="contact__photo"
            />
          </div>
          <div className="contact__header-text" ref={textRef}>
            <h2 className="contact__title">Let's Get in Touch</h2>
            <p className="contact__subtitle">
              Have a question or want to work together? I'd love to hear from
              you.
            </p>
          </div>
        </header>

        <div className="contact__content">
          {/* Form Side */}
          <div className="contact__form-card" ref={formCardRef}>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__input-group">
                <label className="contact__label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact__input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__input-group">
                <label className="contact__label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact__input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__input-group">
                <label className="contact__label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact__textarea"
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact__submit">
                Send Message
                <span className="contact__submit-icon">
                  <SendIcon />
                </span>
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="contact__info-side">
            {/* Contact Info Card */}
            <div className="contact__info-card" ref={infoCardRef}>
              <div className="contact__info-bg">
                <img src={bostonMapImg} alt="" aria-hidden="true" />
              </div>
              <h3 className="contact__info-title">Contact Info</h3>
              <div className="contact__info-list">
                <a
                  href="mailto:quinnhilger@gmail.com"
                  className="contact__info-item"
                >
                  <span className="contact__info-icon">
                    <EmailIcon />
                  </span>
                  <span className="contact__info-text">
                    <span className="contact__info-label">Email</span>
                    <span className="contact__info-value">
                      quinnhilger@gmail.com
                    </span>
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/quinnhilger/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-item"
                >
                  <span className="contact__info-icon">
                    <LinkedInIcon />
                  </span>
                  <span className="contact__info-text">
                    <span className="contact__info-label">LinkedIn</span>
                    <span className="contact__info-value">quinnhilger</span>
                  </span>
                </a>

                <a
                  href="https://github.com/QuinnHilger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-item"
                >
                  <span className="contact__info-icon">
                    <GitHubIcon />
                  </span>
                  <span className="contact__info-text">
                    <span className="contact__info-label">GitHub</span>
                    <span className="contact__info-value">QuinnHilger</span>
                  </span>
                </a>
              </div>

              <a
                href={resumePdf}
                download="Quinn_Hilger_Resume.pdf"
                className="contact__resume-btn"
              >
                <DownloadIcon />
                Download Resume
              </a>
            </div>

            {/* Location Badge */}
            <div className="contact__location">
              <LocationIcon />
              <span>Boston, MA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Toast Notification */}
      <div className={`contact__toast ${showToast ? "show" : ""}`}>
        <LoadingIcon />
        Opening your email client...
      </div>
    </section>
  );
}
