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
  // Counter animations
  animateCounters()

  // Initialize new hero animations
  initializeNewHeroAnimations()

  // Start dashboard animations
  startDashboardAnimations()

  // Initialize scroll animations
  initializeScrollAnimations()

  // Initialize phase interactions
  initializePhaseInteractions()
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll("[data-target]")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      counter.textContent = Math.floor(current)
    }, 16)
  })
}

// Dashboard Animations
function startDashboardAnimations() {
  // Animate security metrics
  const metricValues = document.querySelectorAll(".metric-value")
  metricValues.forEach((metric, index) => {
    setTimeout(() => {
      const randomValue = Math.floor(Math.random() * 50) + 10
      metric.textContent = randomValue
      metric.parentElement.parentElement.style.animation = "slideInRight 0.5s ease forwards"
    }, index * 200)
  })

  // Animate risk bars
  const riskBars = document.querySelectorAll(".bar-fill")
  riskBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.animation = "barFill 1.5s ease-in-out forwards"
    }, index * 300)
  })

  // Update metrics periodically
  setInterval(() => {
    updateDashboardMetrics()
  }, 5000)
}

// Update Dashboard Metrics
function updateDashboardMetrics() {
  const metricValues = document.querySelectorAll(".metric-value")
  metricValues.forEach((metric) => {
    const currentValue = Number.parseInt(metric.textContent)
    const change = Math.floor(Math.random() * 10) - 5 // Random change between -5 and +5
    const newValue = Math.max(0, currentValue + change)

    // Animate the change
    metric.style.transform = "scale(1.1)"
    metric.style.color = change > 0 ? "#dc2626" : "#10b981"

    setTimeout(() => {
      metric.textContent = newValue
      metric.style.transform = "scale(1)"
      metric.style.color = "#ffffff"
    }, 200)
  })
}

// Phase Interactions
function initializePhaseInteractions() {
  const phaseItems = document.querySelectorAll(".phase-item")

  phaseItems.forEach((phase, index) => {
    const header = phase.querySelector(".phase-header")
    const content = phase.querySelector(".phase-content")

    // Initially hide all content except first phase
    if (index !== 0) {
      content.style.display = "none"
    }

    header.addEventListener("click", () => {
      const isOpen = content.style.display !== "none"

      // Close all other phases
      phaseItems.forEach((otherPhase) => {
        if (otherPhase !== phase) {
          otherPhase.querySelector(".phase-content").style.display = "none"
          otherPhase.classList.remove("active")
        }
      })

      // Toggle current phase
      if (isOpen) {
        content.style.display = "none"
        phase.classList.remove("active")
      } else {
        content.style.display = "block"
        phase.classList.add("active")

        // Animate content appearance
        content.style.opacity = "0"
        content.style.transform = "translateY(-20px)"

        setTimeout(() => {
          content.style.transition = "opacity 0.3s ease, transform 0.3s ease"
          content.style.opacity = "1"
          content.style.transform = "translateY(0)"
        }, 10)
      }
    })
  })
}

// Navigation Toggle
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll("span")
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
}

// Smooth Scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    // Close mobile menu if open
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      const spans = navToggle.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  }
}

// Modal Management
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Add entrance animation
    const modalContent = modal.querySelector(".modal-content")
    modalContent.style.transform = "translateY(-50px)"
    modalContent.style.opacity = "0"

    setTimeout(() => {
      modalContent.style.transition = "transform 0.3s ease, opacity 0.3s ease"
      modalContent.style.transform = "translateY(0)"
      modalContent.style.opacity = "1"
    }, 10)
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    const modalContent = modal.querySelector(".modal-content")
    modalContent.style.transform = "translateY(-50px)"
    modalContent.style.opacity = "0"

    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }, 300)
  }
}

function openServiceModal(service) {
  const modals = {
    webApp: "webAppModal",
    network: "networkModal",
    mobile: "mobileModal",
    cloud: "cloudModal",
    api: "apiModal",
    wireless: "wirelessModal",
  }

  const modalId = modals[service]
  if (modalId) {
    openModal(modalId)
  }
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    const modalId = e.target.id
    closeModal(modalId)
  }
})

// Pricing Toggle
const pricingToggle = document.getElementById("pricingToggle")
if (pricingToggle) {
  pricingToggle.addEventListener("change", function () {
    const amounts = document.querySelectorAll(".amount")
    amounts.forEach((amount) => {
      const monthly = amount.getAttribute("data-monthly")
      const annual = amount.getAttribute("data-annual")

      // Animate the price change
      amount.style.transform = "scale(0.8)"
      amount.style.opacity = "0.5"

      setTimeout(() => {
        if (this.checked) {
          amount.textContent = annual
        } else {
          amount.textContent = monthly
        }

        amount.style.transform = "scale(1)"
        amount.style.opacity = "1"
      }, 150)
    })
  })
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Form validation
    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const service = formData.get("service")
    const message = formData.get("message")

    if (!name || !email || !service || !message) {
      showNotification("Please fill in all required fields.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    setTimeout(() => {
      showNotification("Thank you! Our security experts will contact you within 4 hours.", "success")
      this.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification System
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification")
  const notificationText = document.getElementById("notificationText")

  if (notification && notificationText) {
    notificationText.textContent = message

    // Update notification style based on type
    if (type === "error") {
      notification.style.background = "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
      notification.querySelector("i").className = "fas fa-exclamation-circle"
    } else {
      notification.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      notification.querySelector("i").className = "fas fa-check-circle"
    }

    notification.classList.add("show")

    setTimeout(() => {
      notification.classList.remove("show")
    }, 5000)
  }
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Add stagger effect for service cards
        if (entry.target.classList.contains("service-card")) {
          const cards = document.querySelectorAll(".service-card")
          const index = Array.from(cards).indexOf(entry.target)
          entry.target.style.transitionDelay = `${index * 0.1}s`
        }
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(".service-card, .phase-item, .pricing-card, .standard-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)"
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
      navbar.style.boxShadow = "none"
    }
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (modal.style.display === "block") {
        closeModal(modal.id)
      }
    })
  }
})

// Service card hover effects with enhanced animations
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"

    // Animate service icon
    const icon = this.querySelector(".service-icon")
    if (icon) {
      icon.style.transform = "scale(1.1) rotate(5deg)"
    }
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"

    // Reset service icon
    const icon = this.querySelector(".service-icon")
    if (icon) {
      icon.style.transform = "scale(1) rotate(0deg)"
    }
  })
})

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`
document.head.appendChild(style)

// Performance optimization - Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
lazyLoadImages()

// Add smooth transitions to all interactive elements
document.addEventListener("DOMContentLoaded", () => {
  const interactiveElements = document.querySelectorAll("button, a, .service-card, .pricing-card, .phase-header")
  interactiveElements.forEach((element) => {
    element.style.transition = "all 0.3s ease"
  })
})

// Add keyboard accessibility for phase items
document.querySelectorAll(".phase-header").forEach((header) => {
  header.setAttribute("tabindex", "0")
  header.setAttribute("role", "button")
  header.setAttribute("aria-expanded", "false")

  header.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      header.click()

      // Update aria-expanded
      const isExpanded = header.getAttribute("aria-expanded") === "true"
      header.setAttribute("aria-expanded", !isExpanded)
    }
  })
})

// Add focus indicators for better accessibility
const focusStyle = document.createElement("style")
focusStyle.textContent = `
  .phase-header:focus {
    outline: 2px solid #dc2626;
    outline-offset: 2px;
  }
  
  .service-card:focus-within {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`
document.head.appendChild(focusStyle)

// Threat Monitor Animations
function initializeThreatMonitor() {
  // Animate threat points
  const threatPoints = document.querySelectorAll(".threat-point")
  threatPoints.forEach((point, index) => {
    setTimeout(() => {
      point.style.opacity = "1"
      point.style.animation = `fadeInScale 0.5s ease forwards`
    }, index * 200)
  })

  // Update scan progress periodically
  const progressFill = document.querySelector(".progress-fill")
  const progressPercentage = document.querySelector(".progress-percentage")

  if (progressFill && progressPercentage) {
    let currentProgress = 73

    setInterval(() => {
      currentProgress = Math.min(100, currentProgress + Math.random() * 5)
      progressFill.style.width = currentProgress + "%"
      progressPercentage.textContent = Math.floor(currentProgress) + "%"

      if (currentProgress >= 100) {
        setTimeout(() => {
          currentProgress = Math.random() * 30 + 20 // Reset to random value between 20-50
        }, 2000)
      }
    }, 3000)
  }

  // Animate threat categories
  const categoryBars = document.querySelectorAll(".category-bar .bar-fill")
  categoryBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.animation = "barFill 2s ease-in-out forwards"
    }, index * 300)
  })
}

// Newsletter Form Handling
const newsletterForm = document.getElementById("newsletterForm")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const email = this.querySelector('input[type="email"]').value
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalHTML = submitBtn.innerHTML

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Animate button
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
    submitBtn.disabled = true

    setTimeout(() => {
      showNotification("Successfully subscribed to security alerts!", "success")
      this.reset()
      submitBtn.innerHTML = originalHTML
      submitBtn.disabled = false
    }, 1500)
  })
}

// Enhanced scroll animations for new hero elements
function initializeNewHeroAnimations() {
  // Animate feature items on scroll
  const featureItems = document.querySelectorAll(".feature-item")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateX(0)"
          }, index * 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  featureItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })

  // Initialize threat monitor
  initializeThreatMonitor()
}

// Add new CSS animations via JavaScript
const newAnimationStyles = document.createElement("style")
newAnimationStyles.textContent = `
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .threat-point {
    opacity: 0;
  }
  
  /* Enhanced button hover effects */
  .btn-large {
    position: relative;
    overflow: hidden;
  }
  
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
  
  .btn-large:hover::before {
    left: 100%;
  }
  
  /* Footer link animations */
  .footer-column a::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: #dc2626;
    transition: width 0.3s ease;
  }
  
  .footer-column a:hover::before {
    width: 100%;
  }
`
document.head.appendChild(newAnimationStyles)

// Social media link tracking (placeholder)
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const platform = this.querySelector("i").className.split("-")[1]
    console.log(`Social media click: ${platform}`)
    showNotification(`Redirecting to ${platform}...`, "success")

    // In a real implementation, you would redirect to the actual social media page
    // window.open('https://linkedin.com/company/techxservices', '_blank');
  })
})

// Enhanced threat point interactions
document.querySelectorAll(".threat-point").forEach((point) => {
  point.addEventListener("click", function () {
    const threatType = this.getAttribute("data-threat")
    showNotification(`Analyzing ${threatType} vulnerability...`, "success")

    // Add visual feedback
    this.style.transform = "scale(1.2)"
    setTimeout(() => {
      this.style.transform = "scale(1)"
    }, 200)
  })
})
