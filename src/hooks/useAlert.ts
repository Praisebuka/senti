import Swal from "sweetalert2";
import { colors } from "@/constants/colors";

interface AlertOptions {
  title?: string;
  message?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  confirmText?: string;
  cancelText?: string;
}

export const useAlert = () => {
  const showSuccess = async (options: AlertOptions) => {
    Swal.close();
    return await Swal.fire({
      title: options.title || "Success!",
      html: options.message || "Operation completed successfully",
      icon: "success",
      confirmButtonText: options.confirmText || "Continue",
      confirmButtonColor: colors.primary,
      background: colors.surface,
      color: colors.text,
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-html-container",
        confirmButton: "swal-confirm-button",
      },
      allowOutsideClick: false,
      didOpen: () => {
        const backdrop = document.querySelector(".swal2-container");
        if (backdrop) {
          backdrop.setAttribute("data-modal", "success");
        }
      },
    });
  };

  const showError = async (options: AlertOptions) => {
    Swal.close();
    return await Swal.fire({
      title: options.title || "Error!",
      html: options.message || "Something went wrong",
      icon: "error",
      confirmButtonText: options.confirmText || "Try Again",
      confirmButtonColor: colors.error,
      background: colors.surface,
      color: colors.text,
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-html-container",
        confirmButton: "swal-confirm-button",
      },
      allowOutsideClick: false,
    });
  };

  const showWarning = async (options: AlertOptions) => {
    return await Swal.fire({
      title: options.title || "Warning!",
      html: options.message || "Please be careful",
      icon: "warning",
      confirmButtonText: options.confirmText || "Got it",
      confirmButtonColor: colors.warning,
      background: colors.surface,
      color: colors.text,
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-html-container",
        confirmButton: "swal-confirm-button",
      },
    });
  };

  const showInfo = async (options: AlertOptions) => {
    return await Swal.fire({
      title: options.title || "Information",
      html: options.message || "Here's some information for you",
      icon: "info",
      confirmButtonText: options.confirmText || "Okay",
      confirmButtonColor: colors.info,
      background: colors.surface,
      color: colors.text,
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-html-container",
        confirmButton: "swal-confirm-button",
      },
    });
  };

  const showConfirm = async (options: AlertOptions) => {
    return await Swal.fire({
      title: options.title || "Confirm Action",
      html: options.message || "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: options.confirmText || "Yes",
      cancelButtonText: options.cancelText || "No",
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.muted,
      background: colors.surface,
      color: colors.text,
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-html-container",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    });
  };

  const showLoading = async (title: string = "Loading...") => {
    Swal.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: async () => {
        await Swal.showLoading();
      },
      background: colors.surface,
      color: colors.text,
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
      },
    });
  };

  const closeAlert = () => {
    Swal.close();
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showLoading,
    closeAlert,
  };
};

// Add custom SweetAlert styles
export const initSweetAlertStyles = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = `
      .swal-container {
        z-index: 9999;
      }
      
      .swal-popup {
        border-radius: 12px;
        border: 1px solid ${colors.border} !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
        animation: slideInUp 0.3s ease-out;
      }
      
      .swal-title {
        font-size: 20px !important;
        font-weight: 700 !important;
        color: ${colors.text} !important;
        margin-bottom: 12px !important;
      }
      
      .swal-html-container {
        font-size: 14px !important;
        color: ${colors.textSecondary} !important;
        line-height: 1.6 !important;
      }
      
      .swal-confirm-button,
      .swal-cancel-button {
        padding: 10px 24px !important;
        font-weight: 600 !important;
        font-size: 14px !important;
        border-radius: 8px !important;
        border: none !important;
        transition: all 0.2s ease !important;
      }
      
      .swal-confirm-button {
        color: white !important;
        background: ${colors.primary} !important;
      }
      
      .swal-confirm-button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px rgba(224, 24, 91, 0.3) !important;
      }
      
      .swal-cancel-button {
        color: ${colors.text} !important;
        background: ${colors.surface} !important;
        border: 1px solid ${colors.border} !important;
      }
      
      .swal-cancel-button:hover {
        background: ${colors.border} !important;
      }
      
      @keyframes slideInUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
};
