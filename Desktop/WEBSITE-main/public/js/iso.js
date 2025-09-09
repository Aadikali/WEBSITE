class ISOCertificationServices {
  constructor() {
    this.isScrolling = false
    this.complianceLevel = 95
    this.isMultiStandard = false
    this.init()
  }

  init() {
    this.hideLoadingSpinner()
    this.bindEvents()
    this.initAnimations()
    this.initISODashboard()
    this.initContactForm()
    this.initSmoothScrolling()
    this.initPricingToggle()
    this.initROICalculator()
  }

  hideLoadingSpinner() {
    const spinner = document.getElementById("loading-spinner")
    if (spinner) {
      const hideSpinner = () => {
        spinner.classList.add("hidden")
        setTimeout(() => {
          if (spinner.parentNode) {
            spinner.remove()
          }
        }, 300)
      }

      if (document.readyState === "complete") {
        hideSpinner()
      } else {
        const loadTimeout = setTimeout(() => {
          hideSpinner()
        }, 2000)

        window.addEventListener(
          "load",
          () => {
            clearTimeout(loadTimeout)
            hideSpinner()
          },
          { once: true },
        )
      }
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

    // Standard card interactions
    this.initStandardCards()

    // CTA button interactions
    this.initCTAButtons()

    // Benefit item interactions
    this.initBenefitItems()

    // Keyboard navigation
    this.initKeyboardNavigation()
  }

  initHeaderScroll() {
    let lastScrollTop = 0
    const header = document.querySelector(".header")

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = "translateY(-100%)"
      } else {
        header.style.transform = "translateY(0)"
      }

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

    const animateElements = document.querySelectorAll(".standard-card, .benefit-item, .pricing-card, .process-step")
    animateElements.forEach((el) => {
      el.classList.add("fade-in")
      observer.observe(el)
    })

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
    if (heroStats) {
      statsObserver.observe(heroStats)
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

  initISODashboard() {
    setInterval(() => {
      this.updateComplianceMetrics()
    }, 8000)

    this.updateComplianceMeter()

    setInterval(() => {
      this.updateComplianceMeter()
    }, 12000)
  }

  updateComplianceMetrics() {
    const metricValues = document.querySelectorAll(".metric-value")
    const standards = ["ISO 27001", "ISO 9001", "ISO 14001", "ISO 45001", "ISO 20000", "ISO 22301"]

    if (metricValues.length >= 3) {
      metricValues.forEach((metric, index) => {
        if (index < 3) {
          const randomStandard = standards[Math.floor(Math.random() * standards.length)]
          metric.textContent = randomStandard
        }
      })
    }
  }

  updateComplianceMeter() {
    const meterCircle = document.querySelector(".meter-circle")
    const complianceLevel = document.querySelector(".compliance-level")
    const complianceScore = document.querySelector(".compliance-score")

    if (meterCircle && complianceLevel && complianceScore) {
      const levels = [
        { level: "COMPLIANT", score: "95%", color: "#10b981", degrees: 342 },
        { level: "PARTIAL", score: "78%", color: "#f59e0b", degrees: 280 },
        { level: "COMPLIANT", score: "92%", color: "#10b981", degrees: 331 },
      ]

      const currentLevel = levels[Math.floor(Math.random() * levels.length)]

      meterCircle.style.background = `conic-gradient(from 0deg, ${currentLevel.color} 0deg, ${currentLevel.color} ${currentLevel.degrees}deg, #374151 ${currentLevel.degrees}deg, #374151 360deg)`
      complianceLevel.textContent = currentLevel.level
      complianceLevel.style.color = currentLevel.color
      complianceScore.textContent = currentLevel.score
    }
  }

  initPricingToggle() {
    const toggle = document.getElementById("pricingToggle")
    const amounts = document.querySelectorAll(".amount")

    if (toggle) {
      toggle.addEventListener("change", () => {
        this.isMultiStandard = toggle.checked
        amounts.forEach((amount) => {
          const single = amount.getAttribute("data-single")
          const multi = amount.getAttribute("data-multi")

          if (single && multi) {
            amount.textContent = this.isMultiStandard ? multi : single
          }
        })
      })
    }
  }

  initROICalculator() {
    const roiMetrics = document.querySelectorAll(".roi-metric .metric-value")

    setInterval(() => {
      if (roiMetrics.length >= 3) {
        // Update ROI percentage
        const roiValues = ["320%", "340%", "365%", "298%"]
        roiMetrics[0].textContent = roiValues[Math.floor(Math.random() * roiValues.length)]

        // Update payback period
        const paybackValues = ["16 months", "18 months", "20 months", "14 months"]
        roiMetrics[1].textContent = paybackValues[Math.floor(Math.random() * paybackValues.length)]

        // Update cost savings
        const savingsValues = ["25-40%", "30-45%", "20-35%", "28-42%"]
        roiMetrics[2].textContent = savingsValues[Math.floor(Math.random() * savingsValues.length)]
      }
    }, 15000)
  }

  initStandardCards() {
    const standardCards = document.querySelectorAll(".standard-card")
    standardCards.forEach((card) => {
      const standardBtn = card.querySelector(".standard-btn")
      const standardTitle = card.querySelector(".standard-title").textContent

      standardBtn.addEventListener("click", () => {
        this.showStandardModal(standardTitle, card)
      })

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-10px)"
      })
    })
  }

  showStandardModal(standardName, cardElement) {
    const modal = document.createElement("div")
    modal.className = "standard-modal"
    modal.setAttribute("role", "dialog")
    modal.setAttribute("aria-labelledby", "modal-title")
    modal.setAttribute("aria-modal", "true")

    const standardData = this.getStandardData(standardName)

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-title">${standardName} Certification</h3>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="standard-details">
            <h4>Standard Overview:</h4>
            <p>${standardData.overview}</p>
            <h4>Key Requirements:</h4>
            <ul>
              ${standardData.requirements.map((req) => `<li>${req}</li>`).join("")}
            </ul>
            <h4>Implementation Benefits:</h4>
            <div class="benefit-tags">
              ${standardData.benefits.map((benefit) => `<span class="benefit-tag">${benefit}</span>`).join("")}
            </div>
            <h4>Certification Timeline:</h4>
            <p class="timeline">${standardData.timeline}</p>
            <h4>Investment Range:</h4>
            <p class="investment">${standardData.investment}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn primary">Start Certification</button>
          <button class="modal-btn secondary">Download Guide</button>
        </div>
      </div>
    `

    this.addStandardModalStyles()
    document.body.appendChild(modal)

    const closeBtn = modal.querySelector(".modal-close")
    closeBtn.focus()

    setTimeout(() => modal.classList.add("show"), 10)

    const primaryBtn = modal.querySelector(".modal-btn.primary")
    const secondaryBtn = modal.querySelector(".modal-btn.secondary")

    const closeModal = () => {
      modal.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(modal)
        cardElement.querySelector(".standard-btn").focus()
      }, 300)
    }

    closeBtn.addEventListener("click", closeModal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal()
    })

    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal()
    })

    primaryBtn.addEventListener("click", () => {
      closeModal()
      this.scrollToContact()
      this.showNotification(
        `${standardName} certification process initiated! Our ISO experts will contact you within 24 hours.`,
      )
    })

    secondaryBtn.addEventListener("click", () => {
      closeModal()
      this.showNotification(`Downloading ${standardName} implementation guide...`)
    })
  }

  getStandardData(standardName) {
    const standardData = {
      "ISO 27001": {
        overview:
          "ISO 27001 is the international standard for Information Security Management Systems (ISMS). It provides a systematic approach to managing sensitive company information and ensuring data security through risk management processes.",
        requirements: [
          "Information security policy development",
          "Risk assessment and treatment procedures",
          "Security controls implementation (Annex A)",
          "Incident management processes",
          "Business continuity planning",
          "Regular internal audits and management reviews",
        ],
        benefits: ["Data Protection", "Risk Reduction", "Compliance", "Customer Trust", "Competitive Advantage"],
        timeline: "6-12 months depending on organization size and complexity",
        investment: "$15,000 - $75,000 including consultation and certification",
      },
      "ISO 9001": {
        overview:
          "ISO 9001 is the world's most recognized Quality Management System standard. It helps organizations demonstrate their ability to consistently provide products and services that meet customer and regulatory requirements.",
        requirements: [
          "Quality management system documentation",
          "Customer focus and satisfaction measurement",
          "Process approach implementation",
          "Continuous improvement culture",
          "Leadership engagement and commitment",
          "Risk-based thinking integration",
        ],
        benefits: [
          "Quality Improvement",
          "Customer Satisfaction",
          "Process Efficiency",
          "Market Access",
          "Cost Reduction",
        ],
        timeline: "4-8 months for most organizations",
        investment: "$12,000 - $60,000 including implementation support",
      },
      "ISO 14001": {
        overview:
          "ISO 14001 provides a framework for Environmental Management Systems (EMS) that helps organizations improve their environmental performance through more efficient use of resources and reduction of waste.",
        requirements: [
          "Environmental policy establishment",
          "Environmental aspects identification",
          "Legal and regulatory compliance",
          "Environmental objectives and targets",
          "Operational controls implementation",
          "Monitoring and measurement programs",
        ],
        benefits: [
          "Environmental Impact",
          "Cost Savings",
          "Regulatory Compliance",
          "Brand Reputation",
          "Sustainability",
        ],
        timeline: "6-10 months including environmental impact assessment",
        investment: "$18,000 - $70,000 including environmental consulting",
      },
      "ISO 45001": {
        overview:
          "ISO 45001 is the international standard for Occupational Health and Safety Management Systems. It provides a framework to increase safety, reduce workplace risks, and enhance health and well-being at work.",
        requirements: [
          "OH&S policy and commitment",
          "Hazard identification and risk assessment",
          "Legal compliance management",
          "OH&S objectives and planning",
          "Worker participation and consultation",
          "Incident investigation and corrective actions",
        ],
        benefits: ["Worker Safety", "Risk Reduction", "Legal Compliance", "Insurance Benefits", "Productivity"],
        timeline: "5-9 months including safety assessments",
        investment: "$16,000 - $65,000 including safety consulting",
      },
      "ISO 20000": {
        overview:
          "ISO 20000 is the international standard for IT Service Management (ITSM). It demonstrates that an organization delivers managed services, measures service levels, and strives to improve service quality.",
        requirements: [
          "Service management system establishment",
          "Service level management processes",
          "Incident and problem management",
          "Change and release management",
          "Service continuity planning",
          "Supplier relationship management",
        ],
        benefits: [
          "Service Quality",
          "Customer Satisfaction",
          "Operational Efficiency",
          "Cost Control",
          "ITIL Alignment",
        ],
        timeline: "8-12 months including ITSM process optimization",
        investment: "$25,000 - $80,000 including ITSM consulting",
      },
      "ISO 22301": {
        overview:
          "ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). It helps organizations prepare for, respond to, and recover from disruptive incidents when they arise.",
        requirements: [
          "Business continuity policy development",
          "Business impact analysis (BIA)",
          "Risk assessment and treatment",
          "Business continuity strategies",
          "Emergency response procedures",
          "Testing and exercise programs",
        ],
        benefits: [
          "Business Resilience",
          "Risk Management",
          "Stakeholder Confidence",
          "Regulatory Compliance",
          "Recovery Speed",
        ],
        timeline: "6-10 months including BIA and testing",
        investment: "$20,000 - $75,000 including continuity planning",
      },
    }

    return standardData[standardName] || standardData["ISO 27001"]
  }

  addStandardModalStyles() {
    if (document.querySelector("#standard-modal-styles")) return

    const styles = `
      .standard-modal {
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
      
      .standard-modal.show {
        opacity: 1;
      }
      
      .modal-content {
        background: rgba(220, 38, 38, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(220, 38, 38, 0.2);
        border-radius: 20px;
        max-width: 700px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.7);
        transition: transform 0.3s ease;
      }
      
      .standard-modal.show .modal-content {
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
      
      .standard-details h4 {
        color: #dc2626;
        margin: 1.5rem 0 0.5rem 0;
        font-size: 1.1rem;
      }
      
      .standard-details h4:first-child {
        margin-top: 0;
      }
      
      .standard-details p {
        color: #d0d0d0;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
      
      .standard-details ul {
        list-style: none;
        margin-bottom: 1rem;
      }
      
      .standard-details li {
        color: #d0d0d0;
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;
      }
      
      .standard-details li::before {
        content: '✓';
        color: #dc2626;
        position: absolute;
        left: 0;
        font-weight: bold;
      }
      
      .benefit-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .benefit-tag {
        background: rgba(220, 38, 38, 0.2);
        color: #dc2626;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
      }
      
      .timeline {
        color: #f59e0b;
        font-weight: 600;
        margin: 0;
      }
      
      .investment {
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
    styleSheet.id = "standard-modal-styles"
    styleSheet.textContent = styles
    document.head.appendChild(styleSheet)
  }

  initCTAButtons() {
    const ctaButtons = document.querySelectorAll(".btn-primary")
    const outlineButtons = document.querySelectorAll(".btn-outline")

    ctaButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (
          btn.textContent.includes("Certification") ||
          btn.textContent.includes("Certified") ||
          btn.textContent.includes("Get Started")
        ) {
          this.scrollToContact()
        } else if (btn.textContent.includes("Calculate") || btn.textContent.includes("ROI")) {
          this.showNotification("Opening ROI calculator...")
        } else if (btn.textContent.includes("Schedule") || btn.textContent.includes("Consultation")) {
          this.scrollToContact()
        } else {
          this.showNotification("Processing your request...")
        }
      })
    })

    outlineButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent.includes("Guide") || btn.textContent.includes("Download")) {
          this.showNotification("Downloading ISO certification guide...")
        } else {
          this.showNotification("Loading content...")
        }
      })
    })

    const planButtons = document.querySelectorAll(".plan-btn")
    planButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent.includes("Contact")) {
          this.scrollToContact()
        } else {
          const planName = btn.closest(".pricing-card").querySelector(".plan-name").textContent
          this.showNotification(`${planName} package selected! Our ISO consultants will contact you within 24 hours.`)
        }
      })
    })
  }

  initBenefitItems() {
    const benefitItems = document.querySelectorAll(".benefit-item")
    benefitItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-10px) scale(1.02)"
      })

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(-5px) scale(1)"
      })
    })
  }

  initContactForm() {
    const contactForm = document.getElementById("isoForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleFormSubmission(contactForm)
      })

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

      case "industry":
        if (!value) {
          errorMessage = "Please select your industry"
          isValid = false
        }
        break

      case "standard":
        if (!value) {
          errorMessage = "Please select an ISO standard"
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

    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

    setTimeout(() => {
      this.showNotification(
        "ISO consultation request submitted! Our certification experts will contact you within 24 hours with a customized implementation plan.",
        "success",
      )
      form.reset()

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
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modal = document.querySelector(".standard-modal")
        if (modal) {
          const closeBtn = modal.querySelector(".modal-close")
          if (closeBtn) closeBtn.click()
        }
      }

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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const spinner = document.getElementById("loading-spinner")
  if (spinner) {
    spinner.classList.add("hidden")
    setTimeout(() => {
      if (spinner.parentNode) {
        spinner.remove()
      }
    }, 300)
  }

  const isoServices = new ISOCertificationServices()

  window.isoServices = isoServices

  document.body.classList.add("page-loaded")

  console.log("🏆 ISO Certification Services initialized successfully!")
})

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

export { ISOCertificationServices }
