"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { colors } from "@/constants/colors";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader,
} from "lucide-react";
import { useAlert, initSweetAlertStyles } from "@/hooks/useAlert";

export default function ContactPage() {
  const router = useRouter();
  const alert = useAlert();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@core-connect.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Monday - Friday, 9 AM - 5 PM EST",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Lagos, Nigeria",
      description: "Serving clients across Africa and beyond",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "24 Hours",
      description: "Average response time for inquiries",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      await alert.showError({
        title: "Missing Fields",
        message: "Please fill in all required fields",
      });
      return;
    }

    setIsSubmitting(true);
    alert.showLoading("Sending your message...");

    // Simulate API call
    await new Promise((resolve) => {
      setTimeout(async () => {
        Swal.close();
        await new Promise((innerResolve) => setTimeout(innerResolve, 100));

        // Show success alert
        await alert.showSuccess({
          title: "Message Sent!",
          message: "Thanks for reaching out. We'll get back to you soon!",
        });

        // Reset form
        setFormData({ name: "", email: "", company: "", message: "" });
        setIsSubmitting(false);
        resolve(null);
      }, 1200);
    });
  };

  React.useEffect(() => {
    initSweetAlertStyles();
  }, []);

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `radial-gradient(circle at 20% 50%, ${colors.primary}15, transparent 50%),
                         radial-gradient(circle at 80% 80%, ${colors.purple}15, transparent 50%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0px, 0px); }
            50% { transform: translate(30px, -30px); }
          }
        `}</style>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${colors.surface}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: `1px solid ${colors.surface}`,
              color: colors.text,
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.surface;
              e.currentTarget.style.borderColor = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = colors.surface;
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, flex: 1 }}>
            Get in Touch
          </h1>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
          {/* Contact Methods Grid */}
          <div style={{ marginBottom: 80 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Contact Information
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 24,
              }}
            >
              {contactMethods.map((method, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 24,
                    background: colors.surface,
                    borderRadius: 12,
                    border: `1px solid ${colors.surface}`,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = colors.surface;
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${colors.primary}15`,
                      }}
                    >
                      <method.icon size={24} color={colors.primary} />
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                      margin: "0 0 8px 0",
                    }}
                  >
                    {method.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: colors.primary,
                      marginBottom: 4,
                      margin: "0 0 4px 0",
                    }}
                  >
                    {method.value}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: colors.textSecondary,
                      margin: 0,
                    }}
                  >
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                    color: colors.text,
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${colors.surface}`,
                    borderRadius: 8,
                    background: colors.surface,
                    color: colors.text,
                    fontSize: 14,
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.surface;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                    color: colors.text,
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${colors.surface}`,
                    borderRadius: 8,
                    background: colors.surface,
                    color: colors.text,
                    fontSize: 14,
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.surface;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                    color: colors.text,
                  }}
                >
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${colors.surface}`,
                    borderRadius: 8,
                    background: colors.surface,
                    color: colors.text,
                    fontSize: 14,
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.surface;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                    color: colors.text,
                  }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry..."
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${colors.surface}`,
                    borderRadius: 8,
                    background: colors.surface,
                    color: colors.text,
                    fontSize: 14,
                    outline: "none",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.surface;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  background: isSubmitting
                    ? `${colors.primary}80`
                    : colors.gradient,
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s ease",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 4px 12px ${colors.primary}40`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
