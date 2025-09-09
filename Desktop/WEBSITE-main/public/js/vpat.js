// Loading Screen Management
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  const loadingText = document.getElementById("loadingText")

  const loadingMessages = [
    "Initializing security assessment platform...",
    "Loading vulnerability databases...",
    "Preparing penetration testing tools...",
    "Configuring threat detection systems...",
    "TechXServices VAPT platform ready!",
  ]

  let messageIndex = 0

  const messageInterval = setInterval(() => {
    if (messageIndex < loadingMessages.length - 1) {
      messageIndex++
      loadingText.textContent = loadingMessages[messageIndex]
    } else {
      clearInterval(messageInterval)
    }
  }, 600)

  // Hide loading screen after 3 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
      initializeAnimations()
    }, 500)
  }, 3000)
})

// Initialize animations after loading
function initializeAnimations() {
  // Counter animations for .stat-number
  animateCounters();
  // Initialize new hero feature/item animations
  initializeNewHeroAnimations();
  // Start dashboard bars and metrics animations
  startDashboardAnimations();
  // Initialize scroll-in animations on cards/phases etc.
  initializeScrollAnimations();
  // Initialize accordion on methodology phases
  initializePhaseInteractions();
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll("[data-target]");
  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// Dashboard Animations
function startDashboardAnimations() {
  // Animate risk bars
  const riskBars = document.querySelectorAll(".bar-fill");
  riskBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.animation = "barFill 1.5s ease-in-out forwards";
    }, index * 300);
  });
}

// Phase Interactions (Accordion)
function initializePhaseInteractions() {
  const phaseItems = document.querySelectorAll(".phase-item");
  phaseItems.forEach((phase, index) => {
    const header = phase.querySelector(".phase-header");
    const content = phase.querySelector(".phase-content");
    if (index !== 0) content.style.display = "none";
    header.addEventListener("click", () => {
      const isOpen = content.style.display !== "none";
      phaseItems.forEach((otherPhase) => {
        if (otherPhase !== phase) {
          otherPhase.querySelector(".phase-content").style.display = "none";
          otherPhase.classList.remove("active");
        }
      });
      if (isOpen) {
        content.style.display = "none";
        phase.classList.remove("active");
      } else {
        content.style.display = "block";
        phase.classList.add("active");
        content.style.opacity = "0";
        content.style.transform = "translateY(-20px)";
        setTimeout(() => {
          content.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          content.style.opacity = "1";
          content.style.transform = "translateY(0)";
        }, 10);
      }
    });
  });
}

// Pricing Toggle Handlers
const pricingToggle = document.getElementById("pricingToggle");
if (pricingToggle) {
  pricingToggle.addEventListener("change", function () {
    const amounts = document.querySelectorAll(".amount");
    amounts.forEach((amount) => {
      const monthly = amount.getAttribute("data-monthly");
      const annual = amount.getAttribute("data-annual");
      amount.style.transform = "scale(0.8)";
      amount.style.opacity = "0.5";
      setTimeout(() => {
        amount.textContent = this.checked ? annual : monthly;
        amount.style.transform = "scale(1)";
        amount.style.opacity = "1";
      }, 150);
    });
  });
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const service = formData.get("service");
    const message = formData.get("message");
    if (!name || !email || !service || !message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = ' Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      showNotification("Thank you! Our security experts will contact you within 4 hours.", "success");
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");
  if (notification && notificationText) {
    notificationText.textContent = message;
    if (type === "error") {
      notification.style.background = "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)";
      const icon = notification.querySelector("i");
      if (icon) icon.className = "fas fa-exclamation-circle";
    } else {
      notification.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      const icon = notification.querySelector("i");
      if (icon) icon.className = "fas fa-check-circle";
    }
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);
  }
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        if (entry.target.classList.contains("service-card")) {
          const cards = document.querySelectorAll(".service-card");
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(".service-card, .phase-item, .pricing-card, .standard-item");
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Service card hover effects with enhanced animations
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
    const icon = this.querySelector(".service-icon");
    if (icon) {
      icon.style.transform = "scale(1.1) rotate(5deg)";
    }
  });
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    const icon = this.querySelector(".service-icon");
    if (icon) {
      icon.style.transform = "scale(1) rotate(0deg)";
    }
  });
});

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");
    this.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement("style");
style.textContent = `
.btn { position: relative; overflow: hidden; }
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}
@keyframes ripple-animation {
  to { transform: scale(4); opacity: 0; }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}
`;
document.head.appendChild(style);

// Add keyboard accessibility for phase items
document.querySelectorAll(".phase-header").forEach((header) => {
  header.setAttribute("tabindex", "0");
  header.setAttribute("role", "button");
  header.setAttribute("aria-expanded", "false");
  header.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      header.click();
      const isExpanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", !isExpanded);
    }
  });
});

// Add focus indicators for better accessibility
const focusStyle = document.createElement("style");
focusStyle.textContent = `
.phase-header:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}
.service-card:focus-within {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
`;
document.head.appendChild(focusStyle);

// Threat Monitor Animations
function initializeThreatMonitor() {
  // Animate threat points
  const threatPoints = document.querySelectorAll(".threat-point");
  threatPoints.forEach((point, index) => {
    setTimeout(() => {
      point.style.opacity = "1";
      point.style.animation = `fadeInScale 0.5s ease forwards`;
    }, index * 200);
    // Add click pulse effect
    point.addEventListener("click", function () {
      const threatType = this.getAttribute("data-threat");
      showNotification(`Analyzing ${threatType} vulnerability...`, "success");
      this.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  });

  // Animate threat categories
  const categoryBars = document.querySelectorAll(".category-bar .bar-fill");
  categoryBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.animation = "barFill 2s ease-in-out forwards";
    }, index * 300);
  });

  // Update scan progress periodically
  const progressFill = document.querySelector(".progress-fill");
  const progressPercentage = document.querySelector(".progress-percentage");
  if (progressFill && progressPercentage) {
    let currentProgress = 73;
    setInterval(() => {
      currentProgress = Math.min(100, currentProgress + Math.random() * 5);
      progressFill.style.width = currentProgress + "%";
      progressPercentage.textContent = Math.floor(currentProgress) + "%";
      if (currentProgress >= 100) {
        setTimeout(() => {
          currentProgress = Math.random() * 30 + 20; // Reset to random value between 20-50
        }, 2000);
      }
    }, 3000);
  }
}

// Enhanced scroll animations for new hero elements
function initializeNewHeroAnimations() {
  const featureItems = document.querySelectorAll(".feature-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, index * 200);
        }
      });
    },
    { threshold: 0.5 }
  );
  featureItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(item);
  });
  // Initialize threat monitor feature
  initializeThreatMonitor();

  // Add new CSS animations for fade-in (used above)
  const newAnimationStyles = document.createElement("style");
  newAnimationStyles.textContent = `
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 1; transform: scale(1); }
    }
    .threat-point { opacity: 0; }
    .btn-large { position: relative; overflow: hidden; }
    .btn-large::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }
    .btn-large:hover::before { left: 100%; }
  `;
  document.head.appendChild(newAnimationStyles);
}

// Modal Handling
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.transform = "translateY(-50px)";
    modalContent.style.opacity = "0";
    setTimeout(() => {
      modalContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      modalContent.style.transform = "translateY(0)";
      modalContent.style.opacity = "1";
    }, 10);
  }
}
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.transform = "translateY(-50px)";
    modalContent.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }
}
function openServiceModal(service) {
  const modals = {
    webApp: "webAppModal",
    network: "networkModal",
    mobile: "mobileModal",
    cloud: "cloudModal",
    api: "apiModal",
    wireless: "wirelessModal"
  };
  const modalId = modals[service];
  if (modalId) openModal(modalId);
}
// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    const modalId = e.target.id;
    closeModal(modalId);
  }
});

// Utility: Smooth scroll to section (used in button onclick)
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Initialize all animations
window.addEventListener("DOMContentLoaded", initializeAnimations);
