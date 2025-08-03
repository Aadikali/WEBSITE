class ManagedSecurityServices {
  constructor() {
    this.isScrolling = false
    this.threatLevel = 2
    this.isAnnual = false
    this.init()
  }

  init() {
    this.bindEvents()
    this.initAnimations()
    this.initSecurityDashboard()
    this.initContactForm()
    this.initSmoothScrolling()
    this.initThreatMap()
    this.initPricingToggle()
    this.hideLoadingSpinner()
  }

  hideLoadingSpinner() {
    const spinner = document.getElementById("loading-spinner")
    if (spinner) {
      setTimeout(() => {
        spinner.classList.add("hidden")
        setTimeout(() => {
          spinner.remove()
        }, 500)
      }, 1000)
    }
  }

  bindEvents() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const navMenu = document.getElementById("navMenu")

    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        const isActive = navMenu.classList.contains("active")
        navMenu.classList.toggle("active")
        mobileMenuBtn.setAttribute("aria-expanded", !isActive)

        const icon = mobileMenuBtn.querySelector("i")
        if (navMenu.classList.contains("active")) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        } else {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      })
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          mobileMenuBtn.setAttribute("aria-expanded", "false")
          const icon = mobileMenuBtn.querySelector("i")
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      })
    })

    // Header scroll effect
    this.initHeaderScroll()

    // Service card interactions
    this.initServiceCards()

    // CTA button interactions
    this.initCTAButtons()

    // Feature item interactions
    this.initFeatureItems()

    // Keyboard navigation
    this.initKeyboardNavigation()
  }

  initHeaderScroll() {
    let lastScrollTop = 0
    const header = document.querySelector(".header")

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = "translateY(-100%)"
      } else {
        // Scrolling up
        header.style.transform = "translateY(0)"
      }

      // Add scrolled class for styling
      if (scrollTop > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }

      lastScrollTop = scrollTop
    }

    window.addEventListener("scroll", this.throttle(handleScroll, 10))
  }

  initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animateElements = document.querySelectorAll(".service-card, .feature-item, .pricing-card, .threat-stat")
    animateElements.forEach((el) => {
      el.classList.add("fade-in")
      observer.observe(el)
    })

    // Counter animation for hero stats
    this.initCounterAnimation()
  }

  initCounterAnimation() {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll(".stat-number[data-target]")
            statNumbers.forEach((stat) => {
              this.animateCounter(stat)
            })
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    const heroStats = document.querySelector(".hero-stats")
    const threatStats = document.querySelector(".threat-stats")

    if (heroStats) {
      statsObserver.observe(heroStats)
    }
    if (threatStats) {
      statsObserver.observe(threatStats)
    }
  }

  animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const suffix = element.textContent.replace(/\d/g, "")
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target + suffix
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current) + suffix
      }
    }, 40)
  }

  initSecurityDashboard() {
    // Simulate real-time security metrics updates
    setInterval(() => {
      this.updateSecurityMetrics()
    }, 5000)

    // Initialize threat meter
    this.updateThreatMeter()

    // Update threat meter periodically
    setInterval(() => {
      this.updateThreatMeter()
    }, 10000)
  }

  updateSecurityMetrics() {
    const metricValues = document.querySelectorAll(".metric-value")
    if (metricValues.length >= 3) {
      // Update events monitored
      const eventsCount = Math.floor(Math.random() * 100) + 1200
      metricValues[0].textContent = eventsCount.toLocaleString()

      // Update threats blocked
      const threatsBlocked = Math.floor(Math.random() * 10) + 20
      metricValues[1].textContent = threatsBlocked

      // Update system status
      const statuses = ["100%", "99.9%", "100%"]
      metricValues[2].textContent = statuses[Math.floor(Math.random() * statuses.length)]
    }
  }

  updateThreatMeter() {
    const meterCircle = document.querySelector(".meter-circle")
    const threatLevel = document.querySelector(".threat-level")
    const threatScore = document.querySelector(".threat-score")

    if (meterCircle && threatLevel && threatScore) {
      const levels = [
        { level: "LOW", score: "2/10", color: "#10b981", degrees: 72 },
        { level: "MEDIUM", score: "5/10", color: "#f59e0b", degrees: 180 },
        { level: "HIGH", score: "8/10", color: "#ef4444", degrees: 288 },
      ]

      const currentLevel = levels[Math.floor(Math.random() * levels.length)]

      meterCircle.style.background = `conic-gradient(from 0deg, ${currentLevel.color} 0deg, ${currentLevel.color} ${currentLevel.degrees}deg, #374151 ${currentLevel.degrees}deg, #374151 360deg)`
      threatLevel.textContent = currentLevel.level
      threatLevel.style.color = currentLevel.color
      threatScore.textContent = currentLevel.score
    }
  }

  initThreatMap() {
    // Animate threat points
    const threatPoints = document.querySelectorAll(".threat-point")
    threatPoints.forEach((point, index) => {
      setInterval(
        () => {
          const randomDelay = Math.random() * 2000
          setTimeout(() => {
            point.style.animation = "none"
            point.offsetHeight // Trigger reflow
            point.style.animation = "threatPulse 3s infinite"
          }, randomDelay)
        },
        5000 + index * 1000,
      )
    })
  }

  initPricingToggle() {
    const toggle = document.getElementById("pricingToggle")
    const amounts = document.querySelectorAll(".amount")

    if (toggle) {
      toggle.addEventListener("change", () => {
        this.isAnnual = toggle.checked
        amounts.forEach((amount) => {
          const monthly = amount.getAttribute("data-monthly")
          const annual = amount.getAttribute("data-annual")

          if (monthly && annual) {
            amount.textContent = this.isAnnual ? annual : monthly
          }
        })
      })
    }
  }

  initServiceCards() {
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card) => {
      const serviceBtn = card.querySelector(".service-btn")
      const serviceTitle = card.querySelector(".service-title").textContent

      serviceBtn.addEventListener("click", () => {
        this.showServiceModal(serviceTitle, card)
      })

      // Add hover effects
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-10px)"
      })
    })
  }

  showServiceModal(serviceName, cardElement) {
    const modal = document.createElement("div")
    modal.className = "service-modal"
    modal.setAttribute("role", "dialog")
    modal.setAttribute("aria-labelledby", "modal-title")
    modal.setAttribute("aria-modal", "true")

    const serviceData = this.getServiceData(serviceName)

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-title">${serviceName}</h3>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="service-details">
            <h4>Service Overview:</h4>
            <p>${serviceData.overview}</p>
            <h4>Key Benefits:</h4>
            <ul>
              ${serviceData.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
            </ul>
            <h4>Technologies & Tools:</h4>
            <div class="tech-tags">
              ${serviceData.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
            </div>
            <h4>Response Time:</h4>
            <p class="response-time">${serviceData.responseTime}</p>
            <h4>Starting Price:</h4>
            <p class="price">${serviceData.price}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn primary">Get Started</button>
          <button class="modal-btn secondary">Schedule Demo</button>
        </div>
      </div>
    `

    this.addServiceModalStyles()
    document.body.appendChild(modal)

    // Focus management
    const closeBtn = modal.querySelector(".modal-close")
    closeBtn.focus()

    setTimeout(() => modal.classList.add("show"), 10)

    // Close modal events
    const primaryBtn = modal.querySelector(".modal-btn.primary")
    const secondaryBtn = modal.querySelector(".modal-btn.secondary")

    const closeModal = () => {
      modal.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(modal)
        cardElement.querySelector(".service-btn").focus()
      }, 300)
    }

    closeBtn.addEventListener("click", closeModal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal()
    })

    // Escape key to close
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal()
    })

    primaryBtn.addEventListener("click", () => {
      closeModal()
      this.scrollToContact()
      this.showNotification(`${serviceName} setup initiated! Our security team will contact you within 1 hour.`)
    })

    secondaryBtn.addEventListener("click", () => {
      closeModal()
      this.showNotification("Scheduling security demonstration...")
    })
  }

  getServiceData(serviceName) {
    const serviceData = {
      "24/7 SOC Monitoring": {
        overview:
          "Our Security Operations Center provides round-the-clock monitoring of your IT infrastructure with advanced threat detection and immediate incident response capabilities.",
        benefits: [
          "Continuous 24/7/365 monitoring",
          "Real-time threat detection and alerts",
          "Expert security analyst response",
          "Comprehensive incident reporting",
          "Proactive threat hunting",
          "Compliance support and documentation",
        ],
        technologies: ["SIEM", "SOAR", "EDR", "Threat Intelligence", "Machine Learning"],
        responseTime: "< 15 minutes for critical threats",
        price: "Starting at $299/month",
      },
      "Vulnerability Management": {
        overview:
          "Comprehensive vulnerability assessment and management program that identifies, prioritizes, and helps remediate security vulnerabilities across your infrastructure.",
        benefits: [
          "Automated vulnerability scanning",
          "Risk-based prioritization",
          "Detailed remediation guidance",
          "Compliance reporting",
          "Patch management support",
          "Continuous monitoring",
        ],
        technologies: ["Nessus", "Qualys", "Rapid7", "OpenVAS", "Custom Scripts"],
        responseTime: "< 4 hours for critical vulnerabilities",
        price: "Starting at $199/month",
      },
      "Endpoint Protection": {
        overview:
          "Advanced endpoint detection and response solution that protects all devices in your network with real-time monitoring and automated threat response.",
        benefits: [
          "Real-time malware protection",
          "Behavioral analysis and detection",
          "Automated threat response",
          "Device compliance monitoring",
          "Remote incident remediation",
          "Forensic investigation capabilities",
        ],
        technologies: ["CrowdStrike", "SentinelOne", "Microsoft Defender", "Carbon Black"],
        responseTime: "< 5 minutes for endpoint threats",
        price: "Starting at $149/month",
      },
      "Network Security": {
        overview:
          "Comprehensive network security management including firewall administration, intrusion detection, and traffic analysis to protect your network infrastructure.",
        benefits: [
          "Next-generation firewall management",
          "Intrusion detection and prevention",
          "Network traffic analysis",
          "VPN security management",
          "Network segmentation",
          "DDoS protection",
        ],
        technologies: ["Palo Alto", "Fortinet", "Cisco", "pfSense", "Suricata"],
        responseTime: "< 10 minutes for network incidents",
        price: "Starting at $399/month",
      },
      "Identity & Access Management": {
        overview:
          "Secure identity and access management solution with multi-factor authentication, single sign-on, and privileged access management capabilities.",
        benefits: [
          "Multi-factor authentication",
          "Single sign-on integration",
          "Privileged access management",
          "Identity governance",
          "Access certification",
          "Risk-based authentication",
        ],
        technologies: ["Okta", "Azure AD", "Ping Identity", "CyberArk", "BeyondTrust"],
        responseTime: "< 30 minutes for access issues",
        price: "Starting at $249/month",
      },
      "Compliance & Governance": {
        overview:
          "Comprehensive compliance management program that helps maintain regulatory compliance with automated reporting and continuous monitoring.",
        benefits: [
          "Regulatory compliance monitoring",
          "Automated compliance reporting",
          "Policy management and enforcement",
          "Audit preparation and support",
          "Risk assessment and management",
          "Compliance training and awareness",
        ],
        technologies: ["GRC Platforms", "Compliance Automation", "Risk Management Tools"],
        responseTime: "< 24 hours for compliance issues",
        price: "Starting at $349/month",
      },
    }

    return serviceData[serviceName] || serviceData["24/7 SOC Monitoring"]
  }

  addServiceModalStyles() {
    if (document.querySelector("#service-modal-styles")) return

    const styles = `
      .service-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .service-modal.show {
        opacity: 1;
      }
      
      .modal-content {
        background: rgba(220, 38, 38, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(220, 38, 38, 0.2);
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.7);
        transition: transform 0.3s ease;
      }
      
      .service-modal.show .modal-content {
        transform: scale(1);
      }
      
      .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(220, 38, 38, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .modal-header h3 {
        color: #ffffff;
        margin: 0;
        font-size: 1.5rem;
      }
      
      .modal-close {
        background: none;
        border: none;
        color: #ffffff;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s ease;
      }
      
      .modal-close:hover,
      .modal-close:focus {
        background-color: rgba(220, 38, 38, 0.2);
        outline: none;
      }
      
      .modal-body {
        padding: 1.5rem;
      }
      
      .service-details h4 {
        color: #dc2626;
        margin: 1.5rem 0 0.5rem 0;
        font-size: 1.1rem;
      }
      
      .service-details h4:first-child {
        margin-top: 0;
      }
      
      .service-details p {
        color: #d0d0d0;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
      
      .service-details ul {
        list-style: none;
        margin-bottom: 1rem;
      }
      
      .service-details li {
        color: #d0d0d0;
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;
      }
      
      .service-details li::before {
        content: '✓';
        color: #dc2626;
        position: absolute;
        left: 0;
        font-weight: bold;
      }
      
      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .tech-tag {
        background: rgba(220, 38, 38, 0.2);
        color: #dc2626;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
      }
      
      .response-time {
        color: #10b981;
        font-weight: 600;
        margin: 0;
      }
      
      .price {
        color: #dc2626;
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0;
      }
      
      .modal-footer {
        padding: 1.5rem;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        border-top: 1px solid rgba(220, 38, 38, 0.2);
      }
      
      .modal-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .modal-btn.primary {
        background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
        color: #ffffff;
      }
      
      .modal-btn.primary:hover,
      .modal-btn.primary:focus {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
        outline: none;
      }
      
      .modal-btn.secondary {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(220, 38, 38, 0.3);
      }
      
      .modal-btn.secondary:hover,
      .modal-btn.secondary:focus {
        background: rgba(220, 38, 38, 0.1);
        outline: none;
      }
      
      @media (max-width: 768px) {
        .modal-footer {
          flex-direction: column;
        }
        
        .modal-btn {
          width: 100%;
        }
      }
    `

    const styleSheet = document.createElement("style")
    styleSheet.id = "service-modal-styles"
    styleSheet.textContent = styles
    document.head.appendChild(styleSheet)
  }

  initCTAButtons() {
    const ctaButtons = document.querySelectorAll(".btn-primary")
    const outlineButtons = document.querySelectorAll(".btn-outline")

    ctaButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (
          btn.textContent.includes("Assessment") ||
          btn.textContent.includes("Protected") ||
          btn.textContent.includes("Get Started")
        ) {
          this.scrollToContact()
        } else if (btn.textContent.includes("Download")) {
          this.showNotification("Downloading threat intelligence report...")
        } else {
          this.showNotification("Processing your request...")
        }
      })
    })

    outlineButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent.includes("Demo") || btn.textContent.includes("Watch")) {
          this.showNotification("Loading security platform demo...")
        } else if (btn.textContent.includes("Expert") || btn.textContent.includes("Talk")) {
          this.scrollToContact()
        } else if (btn.textContent.includes("Dashboard")) {
          this.showNotification("Opening live security dashboard...")
        } else {
          this.showNotification("Loading content...")
        }
      })
    })

    // Plan buttons
    const planButtons = document.querySelectorAll(".plan-btn")
    planButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent.includes("Contact")) {
          this.scrollToContact()
        } else {
          const planName = btn.closest(".pricing-card").querySelector(".plan-name").textContent
          this.showNotification(`${planName} plan selected! Redirecting to secure checkout...`)
        }
      })
    })
  }

  initFeatureItems() {
    const featureItems = document.querySelectorAll(".feature-item")
    featureItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-10px) scale(1.02)"
      })

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(-5px) scale(1)"
      })
    })
  }

  initContactForm() {
    const contactForm = document.getElementById("securityForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleFormSubmission(contactForm)
      })

      // Real-time validation
      const inputs = contactForm.querySelectorAll("input, select, textarea")
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          this.validateField(input)
        })

        input.addEventListener("input", () => {
          this.clearFieldError(input)
        })
      })
    }
  }

  validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    const errorElement = document.getElementById(`${fieldName}-error`)

    let isValid = true
    let errorMessage = ""

    switch (fieldName) {
      case "name":
        if (!value) {
          errorMessage = "Name is required"
          isValid = false
        } else if (value.length < 2) {
          errorMessage = "Name must be at least 2 characters"
          isValid = false
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          errorMessage = "Email is required"
          isValid = false
        } else if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address"
          isValid = false
        }
        break

      case "company":
        if (!value) {
          errorMessage = "Company name is required"
          isValid = false
        }
        break

      case "employees":
        if (!value) {
          errorMessage = "Please select company size"
          isValid = false
        }
        break

      case "service":
        if (!value) {
          errorMessage = "Please select a service"
          isValid = false
        }
        break

      case "message":
        if (!value) {
          errorMessage = "Message is required"
          isValid = false
        } else if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters"
          isValid = false
        }
        break
    }

    if (errorElement) {
      errorElement.textContent = errorMessage
    }

    field.classList.toggle("error", !isValid)
    return isValid
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`)
    if (errorElement) {
      errorElement.textContent = ""
    }
    field.classList.remove("error")
  }

  handleFormSubmission(form) {
    const inputs = form.querySelectorAll("input, select, textarea")
    let isFormValid = true

    // Validate all fields
    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isFormValid = false
      }
    })

    if (!isFormValid) {
      this.showNotification("Please fix the errors in the form", "error")
      return
    }

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const submitBtn = form.querySelector(".form-submit")
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

    // Simulate form submission
    setTimeout(() => {
      this.showNotification(
        "Security consultation request submitted! Our cybersecurity experts will contact you within 2 hours.",
        "success",
      )
      form.reset()

      // Reset button
      submitBtn.disabled = false
      submitBtn.innerHTML = originalText
    }, 2000)
  }

  initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        this.scrollToSection(targetId.substring(1))
      })
    })
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = section.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  scrollToContact() {
    this.scrollToSection("contact")
  }

  initKeyboardNavigation() {
    // Handle keyboard navigation for modals and interactive elements
    document.addEventListener("keydown", (e) => {
      // Handle Escape key for closing modals
      if (e.key === "Escape") {
        const modal = document.querySelector(".service-modal")
        if (modal) {
          const closeBtn = modal.querySelector(".modal-close")
          if (closeBtn) closeBtn.click()
        }
      }

      // Handle Enter key for buttons and links
      if (e.key === "Enter" && e.target.matches("button, a")) {
        e.target.click()
      }
    })
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
    notification.setAttribute("role", "alert")
    notification.setAttribute("aria-live", "polite")

    const colors = {
      success: "rgba(16, 185, 129, 0.9)",
      error: "rgba(239, 68, 68, 0.9)",
      info: "rgba(220, 38, 38, 0.9)",
    }

    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: colors[type] || colors.info,
      backdropFilter: "blur(10px)",
      color: "white",
      padding: "1rem 1.5rem",
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      zIndex: "10000",
      transform: "translateX(400px)",
      transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
      maxWidth: "350px",
      fontSize: "0.9rem",
      fontWeight: "500",
      border: `1px solid ${colors[type] || colors.info}`,
      wordWrap: "break-word",
    })

    document.body.appendChild(notification)

    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)"
    })

    setTimeout(() => {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 5000)
  }

  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }
}

// Performance optimization
class SecurityPerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    this.optimizeImages()
    this.preloadCriticalResources()
    this.initIntersectionObserver()
  }

  optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]')

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute("data-src")
            }
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }
  }

  preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement("link")
    fontLink.rel = "preload"
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
    fontLink.as = "style"
    fontLink.crossOrigin = "anonymous"
    document.head.appendChild(fontLink)
  }

  initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "50px",
    }

    const performanceObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-viewport")
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      performanceObserver.observe(section)
    })
  }
}

// Accessibility enhancements
class SecurityAccessibilityEnhancer {
  constructor() {
    this.init()
  }

  init() {
    this.enhanceKeyboardNavigation()
    this.addSkipLinks()
    this.improveScreenReaderSupport()
    this.handleReducedMotion()
  }

  enhanceKeyboardNavigation() {
    // Add visible focus indicators
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    focusableElements.forEach((element) => {
      element.addEventListener("focus", () => {
        element.classList.add("keyboard-focus")
      })

      element.addEventListener("blur", () => {
        element.classList.remove("keyboard-focus")
      })

      element.addEventListener("mousedown", () => {
        element.classList.remove("keyboard-focus")
      })
    })
  }

  addSkipLinks() {
    const skipLink = document.createElement("a")
    skipLink.href = "#home"
    skipLink.textContent = "Skip to main content"
    skipLink.className = "skip-link"

    Object.assign(skipLink.style, {
      position: "absolute",
      top: "-40px",
      left: "6px",
      background: "#dc2626",
      color: "white",
      padding: "8px",
      textDecoration: "none",
      borderRadius: "4px",
      zIndex: "10001",
      transition: "top 0.3s",
    })

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "6px"
    })

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px"
    })

    document.body.insertBefore(skipLink, document.body.firstChild)
  }

  improveScreenReaderSupport() {
    // Add live region for dynamic content
    const liveRegion = document.createElement("div")
    liveRegion.setAttribute("aria-live", "polite")
    liveRegion.setAttribute("aria-atomic", "true")
    liveRegion.className = "sr-only"
    liveRegion.id = "live-region"
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `
    document.body.appendChild(liveRegion)

    // Announce page changes
    const announcePageChange = (message) => {
      liveRegion.textContent = message
      setTimeout(() => {
        liveRegion.textContent = ""
      }, 1000)
    }

    // Export function for use in other parts of the application
    window.announcePageChange = announcePageChange
  }

  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleReducedMotionChange = (e) => {
      if (e.matches) {
        document.body.classList.add("reduce-motion")
        // Disable animations
        const style = document.createElement("style")
        style.textContent = `
          .reduce-motion *,
          .reduce-motion *::before,
          .reduce-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        `
        document.head.appendChild(style)
      } else {
        document.body.classList.remove("reduce-motion")
      }
    }

    prefersReducedMotion.addEventListener("change", handleReducedMotionChange)
    handleReducedMotionChange(prefersReducedMotion)
  }
}

// Error handling and logging
class SecurityErrorHandler {
  constructor() {
    this.init()
  }

  init() {
    this.setupGlobalErrorHandling()
    this.setupUnhandledPromiseRejection()
  }

  setupGlobalErrorHandling() {
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error)
      this.logError("JavaScript Error", event.error.message, event.error.stack)
    })
  }

  setupUnhandledPromiseRejection() {
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason)
      this.logError("Promise Rejection", event.reason)
    })
  }

  logError(type, message, stack = "") {
    // In a real application, you would send this to your logging service
    const errorData = {
      type,
      message,
      stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    console.error("Security Error logged:", errorData)

    // You could send this to your analytics or error tracking service
    // Example: analytics.track('security_error', errorData)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize main application
  const securityServices = new ManagedSecurityServices()

  // Initialize performance optimizations
  const performanceOptimizer = new SecurityPerformanceOptimizer()

  // Initialize accessibility enhancements
  const accessibilityEnhancer = new SecurityAccessibilityEnhancer()

  // Initialize error handling
  const errorHandler = new SecurityErrorHandler()

  // Make globally accessible for debugging
  window.securityServices = securityServices
  window.performanceOptimizer = performanceOptimizer
  window.accessibilityEnhancer = accessibilityEnhancer
  window.errorHandler = errorHandler

  // Add page loaded class for CSS animations
  setTimeout(() => {
    document.body.classList.add("page-loaded")
  }, 100)

  console.log("🛡️ Managed Security Services initialized successfully!")
})

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Export for module usage
export { ManagedSecurityServices, SecurityPerformanceOptimizer, SecurityAccessibilityEnhancer, SecurityErrorHandler }
