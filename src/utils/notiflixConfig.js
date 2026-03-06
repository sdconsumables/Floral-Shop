import Notiflix from "notiflix";

export default function setupNotiflix() {

  /* Toast Notifications */
  Notiflix.Notify.init({
    position: "right-top",
    distance: "18px",
    width: "250px",
    borderRadius: "10px",
    timeout: 3000,
    fontSize: "13px",
    cssAnimationStyle: "from-right",

    success: {
      background: "#16a34a",
      textColor: "#ffffff"
    },

    failure: {
      background: "#dc2626",
      textColor: "#ffffff"
    },

    warning: {
      background: "#d97706",
      textColor: "#ffffff"
    },

    info: {
      background: "#2563eb",
      textColor: "#ffffff"
    }
  });


  /* Confirm Dialog */
  Notiflix.Confirm.init({
    width: "300px",
    borderRadius: "14px",
    backgroundColor: "#020617",

    titleColor: "#ffffff",
    messageColor: "#cbd5f5",

    okButtonBackground: "#ef4444",
    okButtonColor: "#ffffff",

    cancelButtonBackground: "#334155",
    cancelButtonColor: "#ffffff",

    cssAnimationStyle: "zoom"
  });


  /* Report Dialog */
  Notiflix.Report.init({
    width: "320px",
    borderRadius: "14px",
    backgroundColor: "#020617",

    titleColor: "#ffffff",
    messageColor: "#cbd5f5",

    buttonBackground: "#16a34a",
    buttonColor: "#ffffff",

    cssAnimationStyle: "zoom"
  });


  /* Loading Spinner */
  Notiflix.Loading.init({
    backgroundColor: "rgba(2,6,23,0.85)",
    svgColor: "#22c55e",
    messageColor: "#ffffff",
    clickToClose: false
  });

}