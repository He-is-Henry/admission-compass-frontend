export function showSignup() {
  closeAllModals();
  document.getElementById("signupModal")?.classList.remove("hidden");
  document.getElementById("signupModal")?.classList.add("flex");
  document.getElementById("signupName")?.focus();
}

export function showLogin() {
  closeAllModals();
  document.getElementById("loginModal")?.classList.remove("hidden");
  document.getElementById("loginModal")?.classList.add("flex");
  document.getElementById("loginEmail")?.focus();
}

export function showPredictionFlow() {
  closeAllModals();
  document.getElementById("predictionModal")?.classList.remove("hidden");
  document.getElementById("predictionModal")?.classList.add("flex");
  document.getElementById("utmeScore")?.focus();
}

export function showPreviewResult() {
  closeModal("predictionModal");
  document.getElementById("previewModal")?.classList.remove("hidden");
  document.getElementById("previewModal")?.classList.add("flex");
}

export function closeModal(modalId: string) {
  document.getElementById(modalId)?.classList.add("hidden");
  document.getElementById(modalId)?.classList.remove("flex");
}

export function closeAllModals() {
  const modals = [
    "signupModal",
    "loginModal",
    "predictionModal",
    "previewModal",
  ];
  modals.forEach((modalId) => {
    document.getElementById(modalId)?.classList.add("hidden");
    document.getElementById(modalId)?.classList.remove("flex");
  });
}
