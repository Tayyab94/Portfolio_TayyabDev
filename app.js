// Mobile Navigation Toggle
class CyberNav {
  constructor() {
    this.nav = document.querySelector(".cyber-nav")
    this.toggle = document.getElementById("nav-toggle")
    this.menu = document.getElementById("nav-menu")
    this.links = document.querySelectorAll(".nav-link")

    this.init()
  }

  init() {
    // Mobile toggle
    this.toggle.addEventListener("click", () => {
      this.menu.classList.toggle("active")
      this.toggle.classList.toggle("active")
    })

    // Close menu on link click
    this.links.forEach((link) => {
      link.addEventListener("click", () => {
        this.menu.classList.remove("active")
        this.toggle.classList.remove("active")
      })
    })

    // Navbar background on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.nav.style.background = "rgba(10, 10, 10, 0.95)"
        this.nav.style.boxShadow = "0 5px 20px rgba(0, 255, 255, 0.2)"
      } else {
        this.nav.style.background = "rgba(10, 10, 10, 0.9)"
        this.nav.style.boxShadow = "none"
      }
    })

    // Active section highlighting
    this.highlightActiveSection()
  }

  highlightActiveSection() {
    const sections = document.querySelectorAll("section[id]")

    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 100

      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight
        const id = section.getAttribute("id")

        if (scrollPos >= top && scrollPos < top + height) {
          this.links.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active")
            }
          })
        }
      })
    })
  }
}

// Professional Portfolio JavaScript

class PortfolioApp {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.navToggle = document.getElementById("nav-toggle")
    this.navMenu = document.getElementById("nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")

    this.init()
  }

  init() {
    this.setupNavigation()
    this.setupScrollEffects()
    this.setupAnimations()
    this.setupProjectFilter()
    this.setupContactForm()
    this.setupSkillBars()
    this.setupCounters()
  }

  // Navigation
  setupNavigation() {
    // Mobile menu toggle
    this.navToggle.addEventListener("click", () => {
      this.navMenu.classList.toggle("active")
      this.navToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking on links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.navMenu.classList.remove("active")
        this.navToggle.classList.remove("active")
      })
    })

    // Smooth scrolling for navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Scroll Effects
  setupScrollEffects() {
    window.addEventListener("scroll", () => {
      this.handleNavbarScroll()
      this.handleActiveSection()
    })
  }

  handleNavbarScroll() {
    if (window.scrollY > 100) {
      this.navbar.classList.add("scrolled")
    } else {
      this.navbar.classList.remove("scrolled")
    }
  }

  handleActiveSection() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 150

    sections.forEach((section) => {
      const top = section.offsetTop
      const height = section.offsetHeight
      const id = section.getAttribute("id")

      if (scrollPos >= top && scrollPos < top + height) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  // Animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".skill-category, .job-card, .project-card, .contact-card, .achievement-item",
    )

    animateElements.forEach((el) => {
      observer.observe(el)
    })
  }

  // Project Filter
  setupProjectFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter")

        // Update active button
        filterBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")

        // Filter projects
        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category")

          if (filter === "all" || category === filter) {
            card.style.display = "block"
            card.style.animation = "fadeInUp 0.5s ease-out"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }

  // Contact Form
  setupContactForm() {
    const form = document.getElementById("contact-form")

    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      await this.handleFormSubmit(form)
    })
  }

  async handleFormSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Update button state
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
    submitBtn.disabled = true

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Success state
    submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>'
    submitBtn.style.background = "var(--gradient-secondary)"

    // Reset form after delay
    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.background = ""
      form.reset()

      // Show success message
      this.showNotification("Message sent successfully! I'll get back to you soon.", "success")
    }, 2000)
  }

  // Skill Bars Animation
  setupSkillBars() {
    const skillItems = document.querySelectorAll(".skill-item")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector(".skill-progress")
            const width = progressBar.getAttribute("data-width")

            setTimeout(() => {
              progressBar.style.width = `${width}%`
            }, 200)

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillItems.forEach((item) => observer.observe(item))
  }

  // Counter Animation
  setupCounters() {
    const counters = document.querySelectorAll(".stat-number")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    counters.forEach((counter) => observer.observe(counter))
  }

  animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 16)
  }

  // Utility Functions
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
        <span>${message}</span>
      </div>
    `

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "var(--secondary-color)" : "var(--primary-color)"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      transform: translateX(100%);
      transition: var(--transition-normal);
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 4000)
  }
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Stats Counter Animation
class StatsCounter {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number")
    this.init()
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    this.counters.forEach((counter) => observer.observe(counter))
  }

  animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 16)
  }
}

// Skill Bars Animation
class SkillBars {
  constructor() {
    this.skillItems = document.querySelectorAll(".skill-item")
    this.init()
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector(".skill-progress")
            const level = entry.target.getAttribute("data-level")

            setTimeout(() => {
              progressBar.style.width = `${level}%`
            }, 200)

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    this.skillItems.forEach((item) => observer.observe(item))
  }
}

// Audio Effects
class AudioEffects {
  constructor() {
    this.hoverSound = document.getElementById("hover-sound")
    this.init()
  }

  init() {
    // Add hover sound to interactive elements
    document.querySelectorAll("button, .nav-link, .project-card").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.playHoverSound()
      })
    })
  }

  playHoverSound() {
    if (this.hoverSound) {
      this.hoverSound.currentTime = 0
      this.hoverSound.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(".skill-category, .job-card, .project-card, .contact-card")
    this.init()
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    this.elements.forEach((el) => observer.observe(el))
  }
}

// Particle System
class ParticleSystem {
  constructor() {
    this.particles = []
    this.init()
  }

  init() {
    // Add particles to buttons on hover
    document.querySelectorAll(".cyber-btn").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        this.createParticles(btn)
      })
    })
  }

  createParticles(element) {
    const rect = element.getBoundingClientRect()

    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = "2px"
      particle.style.height = "2px"
      particle.style.background = "#00ffff"
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"
      particle.style.left = `${rect.left + Math.random() * rect.width}px`
      particle.style.top = `${rect.top + Math.random() * rect.height}px`
      particle.style.zIndex = "9999"

      document.body.appendChild(particle)

      // Animate particle
      particle.animate(
        [
          { transform: "translate(0, 0)", opacity: 1 },
          { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0 },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        },
      ).onfinish = () => {
        particle.remove()
      }
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  new CyberNav()
  new PortfolioApp()

  // Add loading animation
  document.body.style.opacity = "0"
  document.body.style.transform = "translateY(20px)"

  setTimeout(() => {
    document.body.style.transition = "all 0.6s ease"
    document.body.style.opacity = "1"
    document.body.style.transform = "translateY(0)"
  }, 100)
})

// Matrix Rain Effect
class MatrixRain {
  constructor() {
    this.canvas = document.getElementById("matrix-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()"
    this.fontSize = 14
    this.columns = 0
    this.drops = []

    this.init()
    this.animate()
  }

  init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.columns = Math.floor(this.canvas.width / this.fontSize)

    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * this.canvas.height
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = "#00ffff"
    this.ctx.font = `${this.fontSize}px 'Fira Code', monospace`

    for (let i = 0; i < this.drops.length; i++) {
      const char = this.chars[Math.floor(Math.random() * this.chars.length)]
      this.ctx.fillText(char, i * this.fontSize, this.drops[i])

      if (this.drops[i] > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0
      }
      this.drops[i] += this.fontSize
    }

    requestAnimationFrame(() => this.animate())
  }

  resize() {
    this.init()
  }
}

// Custom Cursor
class CyberCursor {
  constructor() {
    this.cursor = document.querySelector(".cyber-cursor")
    this.core = document.querySelector(".cursor-core")
    this.ring = document.querySelector(".cursor-ring")
    this.trail = document.querySelector(".cursor-trail")

    this.mouseX = 0
    this.mouseY = 0
    this.trailX = 0
    this.trailY = 0

    this.init()
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY

      this.core.style.left = `${this.mouseX}px`
      this.core.style.top = `${this.mouseY}px`

      this.ring.style.left = `${this.mouseX}px`
      this.ring.style.top = `${this.mouseY}px`
    })

    // Smooth trail animation
    this.animateTrail()

    // Hover effects
    document.querySelectorAll("a, button, .project-card, .skill-item").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.ring.style.transform = "translate(-50%, -50%) scale(1.5)"
        this.ring.style.borderColor = "#ff0080"
      })

      el.addEventListener("mouseleave", () => {
        this.ring.style.transform = "translate(-50%, -50%) scale(1)"
        this.ring.style.borderColor = "#00ffff"
      })
    })
  }

  animateTrail() {
    this.trailX += (this.mouseX - this.trailX) * 0.1
    this.trailY += (this.mouseY - this.trailY) * 0.1

    this.trail.style.left = `${this.trailX}px`
    this.trail.style.top = `${this.trailY}px`

    requestAnimationFrame(() => this.animateTrail())
  }
}

// Terminal Typing Effect
class TerminalTyper {
  constructor() {
    this.commands = ["whoami", "cat skills.txt", "ls projects/", "git status", "npm run build", "./deploy.sh"]
    this.currentCommand = 0
    this.currentChar = 0
    this.isDeleting = false
    this.typeSpeed = 100
    this.deleteSpeed = 50
    this.pauseTime = 2000

    this.element = document.getElementById("typing-command")
    this.outputElement = document.getElementById("terminal-output")

    this.init()
  }

  init() {
    this.type()
    this.generateOutput()
  }

  type() {
    const current = this.commands[this.currentCommand]

    if (this.isDeleting) {
      this.element.textContent = current.substring(0, this.currentChar - 1)
      this.currentChar--
    } else {
      this.element.textContent = current.substring(0, this.currentChar + 1)
      this.currentChar++
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed

    if (!this.isDeleting && this.currentChar === current.length) {
      typeSpeed = this.pauseTime
      this.isDeleting = true
    } else if (this.isDeleting && this.currentChar === 0) {
      this.isDeleting = false
      this.currentCommand = (this.currentCommand + 1) % this.commands.length
    }

    setTimeout(() => this.type(), typeSpeed)
  }

  generateOutput() {
    const outputs = [
      "Muhammad Tayyab - Senior Full-Stack Developer",
      "Skills: .NET Core, React, Angular, Azure, SQL Server",
      "Aventra Digital Platform, Coto Creator Community, Ahealo Medical",
      "On branch main - Your branch is up to date",
      "Build successful! Ready for deployment",
      "Deployment complete! Application is live",
    ]

    setInterval(() => {
      const randomOutput = outputs[Math.floor(Math.random() * outputs.length)]
      const outputLine = document.createElement("div")
      outputLine.className = "output-line"
      outputLine.textContent = `> ${randomOutput}`

      this.outputElement.appendChild(outputLine)

      // Keep only last 5 lines
      while (this.outputElement.children.length > 5) {
        this.outputElement.removeChild(this.outputElement.firstChild)
      }
    }, 5000)
  }
}

// Download resume function
function downloadResume() {
  // Create a temporary link element
  const link = document.createElement("a")
  link.href = "#" // Replace with actual resume URL
  link.download = "Muhammad_Tayyab_Resume.pdf"

  // Show notification instead of actual download
  const app = new PortfolioApp()
  app.showNotification("Resume download would be implemented here. Please contact via email for the resume.", "info")
}

// Smooth Scroll Polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = () => {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80
          const startPosition = window.pageYOffset
          const distance = offsetTop - startPosition
          const duration = 1000
          let start = null

          const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = timestamp - start
            const progressPercentage = Math.min(progress / duration, 1)

            // Easing function
            const ease =
              progressPercentage < 0.5
                ? 2 * progressPercentage * progressPercentage
                : 1 - Math.pow(-2 * progressPercentage + 2, 3) / 2

            window.scrollTo(0, startPosition + distance * ease)

            if (progress < duration) {
              requestAnimationFrame(step)
            }
          }

          requestAnimationFrame(step)
        }
      })
    })
  }

  smoothScrollPolyfill()
}

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  const navMenu = document.getElementById("nav-menu")
  const navToggle = document.getElementById("nav-toggle")

  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu")
    const navToggle = document.getElementById("nav-toggle")

    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }
})

// Performance optimization
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Debounced scroll handler for better performance
const handleScroll = debounce(() => {
  // Additional scroll-based functionality can be added here
}, 16)

window.addEventListener("scroll", handleScroll)

// Add CSS for notification styles
const notificationStyles = `
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .notification-content i {
    font-size: 1.2rem;
  }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = notificationStyles
document.head.appendChild(styleSheet)

// Add gradient definition for SVG
const svgGradient = `
  <svg width="0" height="0" style="position: absolute;">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>
`

document.body.insertAdjacentHTML("afterbegin", svgGradient)
