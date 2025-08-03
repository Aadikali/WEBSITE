class CybersecurityTraining {
  constructor() {
    this.isScrolling = false
    this.progressPercentage = 78
    this.isCorporate = false
    this.init()
  }

  init() {
    this.hideLoadingSpinner()
    this.bindEvents()
    this.initAnimations()
    this.initTrainingDashboard()
    this.initContactForm()
    this.initSmoothScrolling()
    this.initPricingToggle()
    this.initTrainingSimulator()
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

    // Program card interactions
    this.initProgramCards()

    // Certification card interactions
    this.initCertificationCards()

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

    const animateElements = document.querySelectorAll(".program-card, .cert-card, .pricing-card, .feature-item")
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

  initTrainingDashboard() {
    setInterval(() => {
      this.updateTrainingMetrics()
    }, 10000)

    this.updateProgressCircle()

    setInterval(() => {
      this.updateProgressCircle()
    }, 15000)
  }

  updateTrainingMetrics() {
    const metricValues = document.querySelectorAll(".metric-value")

    if (metricValues.length >= 3) {
      // Update modules completed
      const moduleValues = ["10/15", "12/15", "14/15", "8/15"]
      metricValues[0].textContent = moduleValues[Math.floor(Math.random() * moduleValues.length)]

      // Update certifications earned
      const certValues = [6, 7, 8, 9, 10]
      metricValues[1].textContent = certValues[Math.floor(Math.random() * certValues.length)]

      // Update training hours
      const hourValues = ["42h", "45h", "48h", "51h"]
      metricValues[2].textContent = hourValues[Math.floor(Math.random() * hourValues.length)]
    }
  }

  updateProgressCircle() {
    const circleProgress = document.querySelector(".circle-progress")
    const progressPercentage = document.querySelector(".progress-percentage")

    if (circleProgress && progressPercentage) {
      const progressValues = [72, 78, 85, 91, 68]
      const currentProgress = progressValues[Math.floor(Math.random() * progressValues.length)]

      const degrees = (currentProgress / 100) * 360

      circleProgress.style.background = `conic-gradient(from 0deg, #dc2626 0deg, #dc2626 ${degrees}deg, #374151 ${degrees}deg, #374151 360deg)`
      progressPercentage.textContent = `${currentProgress}%`
    }
  }

  initTrainingSimulator() {
    const scenarios = [
      "Phishing Attack Simulation",
      "Malware Detection Exercise",
      "Social Engineering Test",
      "Password Security Challenge",
      "Data Breach Response",
      "Network Security Assessment",
    ]

    setInterval(() => {
      const scenarioElement = document.querySelector(".simulation-scenario p")
      const progressFill = document.querySelector(".progress-fill")
      const progressText = document.querySelector(".scenario-progress span")

      if (scenarioElement && progressFill && progressText) {
        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]
        const randomProgress = Math.floor(Math.random() * 40) + 50 // 50-90%

        scenarioElement.textContent = randomScenario
        progressFill.style.width = `${randomProgress}%`
        progressText.textContent = `${randomProgress}% Complete`
      }

      // Update participant stats
      const statValues = document.querySelectorAll(".stat-value")
      if (statValues.length >= 4) {
        statValues[0].textContent = Math.floor(Math.random() * 50) + 200 // 200-250 participants
        statValues[1].textContent = Math.floor(Math.random() * 200) + 1800 // 1800-2000 scenarios
        statValues[2].textContent = Math.floor(Math.random() * 10) + 85 + "%" // 85-95% success rate
        statValues[3].textContent = Math.floor(Math.random() * 8) + 88 + "/100" // 88-96/100 score
      }
    }, 12000)
  }

  initPricingToggle() {
    const toggle = document.getElementById("pricingToggle")
    const amounts = document.querySelectorAll(".amount")
    const periods = document.querySelectorAll(".period")

    if (toggle) {
      toggle.addEventListener("change", () => {
        this.isCorporate = toggle.checked
        amounts.forEach((amount) => {
          const individual = amount.getAttribute("data-individual")
          const corporate = amount.getAttribute("data-corporate")

          if (individual && corporate) {
            amount.textContent = this.isCorporate ? corporate : individual
          }
        })

        periods.forEach((period) => {
          const individual = period.getAttribute("data-individual")
          const corporate = period.getAttribute("data-corporate")

          if (individual && corporate) {
            period.textContent = this.isCorporate ? corporate : individual
          }
        })
      })
    }
  }

  initProgramCards() {
    const programCards = document.querySelectorAll(".program-card")
    programCards.forEach((card) => {
      const programBtn = card.querySelector(".program-btn")
      const programTitle = card.querySelector(".program-title").textContent

      programBtn.addEventListener("click", () => {
        this.showProgramModal(programTitle, card)
      })

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-10px)"
      })
    })
  }

  showProgramModal(programName, cardElement) {
    const modal = document.createElement("div")
    modal.className = "program-modal"
    modal.setAttribute("role", "dialog")
    modal.setAttribute("aria-labelledby", "modal-title")
    modal.setAttribute("aria-modal", "true")

    const programData = this.getProgramData(programName)

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-title">${programName}</h3>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="program-details">
            <h4>Program Overview:</h4>
            <p>${programData.overview}</p>
            <h4>Learning Objectives:</h4>
            <ul>
              ${programData.objectives.map((obj) => `<li>${obj}</li>`).join("")}
            </ul>
            <h4>Target Audience:</h4>
            <div class="audience-tags">
              ${programData.audience.map((aud) => `<span class="audience-tag">${aud}</span>`).join("")}
            </div>
            <h4>Duration & Format:</h4>
            <p class="duration">${programData.duration}</p>
            <h4>Prerequisites:</h4>
            <p class="prerequisites">${programData.prerequisites}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn primary">Enroll Now</button>
          <button class="modal-btn secondary">Download Syllabus</button>
        </div>
      </div>
    `

    this.addProgramModalStyles()
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
        cardElement.querySelector(".program-btn").focus()
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
      this.showNotification(`${programName} enrollment initiated! Our training team will contact you within 24 hours.`)
    })

    secondaryBtn.addEventListener("click", () => {
      closeModal()
      this.showNotification(`Downloading ${programName} syllabus...`)
    })
  }

  getProgramData(programName) {
    const programData = {
      "Security Awareness Training": {
        overview:
          "Comprehensive security awareness program designed to educate all employees about cybersecurity threats and best practices. This interactive training transforms your workforce into a human firewall against cyber attacks.",
        objectives: [
          "Recognize and report phishing attempts and social engineering attacks",
          "Implement strong password policies and multi-factor authentication",
          "Understand data classification and handling procedures",
          "Follow secure remote work and BYOD practices",
          "Respond appropriately to security incidents",
          "Maintain compliance with organizational security policies",
        ],
        audience: ["All Employees", "Remote Workers", "Contractors", "New Hires"],
        duration: "4-6 hours self-paced learning with quarterly refreshers",
        prerequisites: "No technical background required",
      },
      "Technical Security Training": {
        overview:
          "Advanced technical training program for IT professionals covering network security, system hardening, security architecture, and hands-on implementation of cybersecurity controls and technologies.",
        objectives: [
          "Design and implement secure network architectures",
          "Configure and manage security tools and technologies",
          "Perform vulnerability assessments and penetration testing",
          "Develop incident response and recovery procedures",
          "Implement security monitoring and threat detection systems",
          "Apply security frameworks and compliance requirements",
        ],
        audience: ["IT Professionals", "System Administrators", "Network Engineers", "Security Analysts"],
        duration: "40-60 hours instructor-led with hands-on labs",
        prerequisites: "Basic networking and system administration knowledge",
      },
      "Ethical Hacking & Penetration Testing": {
        overview:
          "Intensive hands-on training in ethical hacking methodologies, penetration testing techniques, and vulnerability assessment. Learn to think like an attacker to better defend your organization.",
        objectives: [
          "Master penetration testing methodologies and frameworks",
          "Conduct comprehensive security assessments",
          "Exploit common vulnerabilities in web applications and networks",
          "Perform wireless security assessments",
          "Develop professional penetration testing reports",
          "Understand legal and ethical considerations in security testing",
        ],
        audience: ["Security Professionals", "Penetration Testers", "Security Consultants", "Advanced IT Staff"],
        duration: "80-120 hours with extensive hands-on lab exercises",
        prerequisites: "Strong technical background in networking and systems",
      },
      "Compliance & Risk Management": {
        overview:
          "Strategic cybersecurity training focused on governance, risk management, and compliance frameworks. Designed for executives and managers who need to understand cybersecurity from a business perspective.",
        objectives: [
          "Understand regulatory compliance requirements (GDPR, HIPAA, SOX)",
          "Implement risk assessment and management frameworks",
          "Develop cybersecurity governance and oversight programs",
          "Create business continuity and disaster recovery plans",
          "Make informed cybersecurity investment decisions",
          "Communicate security risks to stakeholders and board members",
        ],
        audience: ["Executives", "Managers", "Compliance Officers", "Risk Managers"],
        duration: "20-30 hours in executive-friendly format",
        prerequisites: "Business or management experience preferred",
      },
      "Cloud Security Training": {
        overview:
          "Specialized training covering cloud security architecture, configuration, and best practices across major cloud platforms including AWS, Azure, and Google Cloud Platform.",
        objectives: [
          "Secure cloud infrastructure and services configuration",
          "Implement cloud-native security controls and monitoring",
          "Design secure multi-cloud and hybrid architectures",
          "Apply DevSecOps practices in cloud environments",
          "Manage cloud compliance and governance requirements",
          "Respond to cloud security incidents and breaches",
        ],
        audience: ["Cloud Engineers", "DevOps Engineers", "Cloud Architects", "Security Engineers"],
        duration: "50-70 hours with platform-specific modules",
        prerequisites: "Experience with cloud platforms and basic security concepts",
      },
      "Incident Response & Forensics": {
        overview:
          "Comprehensive training on cybersecurity incident response, digital forensics, and crisis management. Learn to effectively respond to, investigate, and recover from security incidents.",
        objectives: [
          "Develop and implement incident response plans and procedures",
          "Conduct digital forensics investigations",
          "Perform malware analysis and reverse engineering",
          "Coordinate crisis communication and stakeholder management",
          "Execute post-incident analysis and lessons learned",
          "Maintain chain of custody and legal evidence requirements",
        ],
        audience: ["Security Teams", "Incident Responders", "Digital Forensics Analysts", "IT Managers"],
        duration: "60-80 hours with realistic simulation exercises",
        prerequisites: "Technical security background and basic forensics knowledge",
      },
    }

    return programData[programName] || programData["Security Awareness Training"]
  }

  addProgramModalStyles() {
    if (document.querySelector("#program-modal-styles")) return

    const styles = `
      .program-modal {
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
      
      .program-modal.show {
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
      
      .program-modal.show .modal-content {
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
      
      .program-details h4 {
        color: #dc2626;
        margin: 1.5rem 0 0.5rem 0;
        font-size: 1.1rem;
      }
      
      .program-details h4:first-child {
        margin-top: 0;
      }
      
      .program-details p {
        color: #d0d0d0;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
      
      .program-details ul {
        list-style: none;
        margin-bottom: 1rem;
      }
      
      .program-details li {
        color: #d0d0d0;
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;
      }
      
      .program-details li::before {
        content: '✓';
        color: #dc2626;
        position: absolute;
        left: 0;
        font-weight: bold;
      }
      
      .audience-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .audience-tag {
        background: rgba(220, 38, 38, 0.2);
        color: #dc2626;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
      }
      
      .duration {
        color: #f59e0b;
        font-weight: 600;
        margin: 0;
      }
      
      .prerequisites {
        color: #10b981;
        font-weight: 500;
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
    styleSheet.id = "program-modal-styles"
    styleSheet.textContent = styles
    document.head.appendChild(styleSheet)
  }

  initCertificationCards() {
    const certCards = document.querySelectorAll(".cert-card")
    certCards.forEach((card) => {
      const certBtn = card.querySelector(".cert-btn")
      const certTitle = card.querySelector("h3").textContent

      certBtn.addEventListener("click", () => {
        this.scrollToContact()
        this.showNotification(
          `${certTitle} certification prep enrollment initiated! Our training advisors will contact you within 24 hours.`,
        )
      })

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px) scale(1.02)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-10px) scale(1)"
      })
    })
  }

  initCTAButtons() {
    const ctaButtons = document.querySelectorAll(".btn-primary")
    const outlineButtons = document.querySelectorAll(".btn-outline")

    ctaButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (
          btn.textContent.includes("Learning") ||
          btn.textContent.includes("Training") ||
          btn.textContent.includes("Get Started") ||
          btn.textContent.includes("Trial")
        ) {
          this.scrollToContact()
        } else if (btn.textContent.includes("Consultation") || btn.textContent.includes("Request")) {
          this.scrollToContact()
        } else {
          this.showNotification("Processing your request...")
        }
      })
    })

    outlineButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent.includes("Demo") || btn.textContent.includes("Schedule")) {
          this.scrollToContact()
        } else if (btn.textContent.includes("Brochure") || btn.textContent.includes("Download")) {
          this.showNotification("Downloading training brochure...")
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
          this.showNotification(`${planName} training package selected! Our team will contact you within 24 hours.`)
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
    const contactForm = document.getElementById("trainingForm")
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

      case "role":
        if (!value) {
          errorMessage = "Please select your role"
          isValid = false
        }
        break

      case "program":
        if (!value) {
          errorMessage = "Please select a training program"
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
        "Training consultation request submitted! Our cybersecurity training experts will contact you within 24 hours with a customized learning plan.",
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
        const modal = document.querySelector(".program-modal")
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

  const trainingServices = new CybersecurityTraining()

  window.trainingServices = trainingServices

  document.body.classList.add("page-loaded")

  console.log("🎓 Cybersecurity Training Services initialized successfully!")
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

export { CybersecurityTraining }
