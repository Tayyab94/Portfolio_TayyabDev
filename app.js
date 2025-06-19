// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.05)"
    navbar.style.backdropFilter = "blur(30px)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.1)"
    navbar.style.backdropFilter = "blur(20px)"
  }
})

// Animate stats on scroll
const animateStats = () => {
  const stats = document.querySelectorAll(".stat-number")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const finalValue = target.textContent
          const numericValue = Number.parseInt(finalValue.replace(/\D/g, ""))
          const suffix = finalValue.replace(/\d/g, "")

          let current = 0
          const increment = numericValue / 50
          const timer = setInterval(() => {
            current += increment
            if (current >= numericValue) {
              current = numericValue
              clearInterval(timer)
            }
            target.textContent = Math.floor(current) + suffix
          }, 30)

          observer.unobserve(target)
        }
      })
    },
    { threshold: 0.5 },
  )

  stats.forEach((stat) => observer.observe(stat))
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateStats()

  // Add scroll animations to cards
  const cards = document.querySelectorAll(".skill-card, .experience-card, .project-card")
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    cardObserver.observe(card)
  })
})

// Download resume function
function downloadResume() {
  // You can replace this with actual resume download logic
  alert("Resume download functionality would be implemented here. Please contact via email for the resume.")
}

// Contact form handling (if you add a contact form later)
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
    submitBtn.style.background = "linear-gradient(135deg, #00ff88, #00d4ff)"

    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.background = ""
      this.reset()
    }, 2000)
  }, 1500)
})

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect
window.addEventListener("load", () => {
  const subtitle = document.querySelector(".hero-subtitle")
  if (subtitle) {
    const originalText = subtitle.textContent
    typeWriter(subtitle, originalText, 80)
  }
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".gradient-orb")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Add click handlers for external links
document.querySelectorAll(".fa-external-link-alt").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault()
    // You can add actual project URLs here
    alert("Project demo would open here. Contact me for live demos!")
  })
})

// Custom Cursor
const cursorDot = document.querySelector("[data-cursor-dot]")
const cursorOutline = document.querySelector("[data-cursor-outline]")

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX
  const posY = e.clientY

  cursorDot.style.left = `${posX}px`
  cursorDot.style.top = `${posY}px`

  cursorOutline.style.left = `${posX}px`
  cursorOutline.style.top = `${posY}px`
})

// Magnetic Effect
document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("mouseenter", (e) => {
    element.style.transform = "scale(1.1)"
  })

  element.addEventListener("mouseleave", (e) => {
    element.style.transform = "scale(1)"
  })

  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.1)`
  })
})

// Animated Counter
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")

      // Animate counters
      if (entry.target.hasAttribute("data-count")) {
        const target = Number.parseInt(entry.target.getAttribute("data-count"))
        animateCounter(entry.target, target)
      }

      // Animate skill bars
      if (entry.target.classList.contains("skill-item")) {
        const progressBar = entry.target.querySelector(".skill-progress")
        if (progressBar) {
          progressBar.style.animation = "fillBar 2s ease-out"
        }
      }

      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(".stat-number, .skill-item, .timeline-content, .project-card, .achievement-card")
  .forEach((el) => {
    observer.observe(el)
  })

// Typing Effect for Code Window
function typeCode() {
  const codeLines = document.querySelectorAll(".code-line .code-text")

  codeLines.forEach((line, index) => {
    const text = line.textContent
    line.textContent = ""

    setTimeout(() => {
      let i = 0
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          line.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
    }, index * 500)
  })
}

// Initialize animations on load
window.addEventListener("load", () => {
  // Start typing effect after a delay
  setTimeout(typeCode, 1000)

  // Add loading class removal
  document.body.classList.remove("loading")
})

// Add glitch effect to title on hover
const heroTitle = document.querySelector(".title-name")
if (heroTitle) {
  heroTitle.addEventListener("mouseenter", function () {
    this.style.animation = "glitch 0.5s ease-in-out"
  })

  heroTitle.addEventListener("animationend", function () {
    this.style.animation = "glow 3s ease-in-out infinite alternate"
  })
}

// Add CSS for glitch effect
const glitchCSS = `
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}
`

const style = document.createElement("style")
style.textContent = glitchCSS
document.head.appendChild(style)

// Preloader
window.addEventListener("load", () => {
  const preloader = document.createElement("div")
  preloader.className = "preloader"
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="preloader-logo">MT</div>
      <div class="preloader-text">Loading Excellence...</div>
    </div>
  `

  const preloaderCSS = `
    .preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--dark-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      transition: opacity 0.5s ease;
    }
    
    .preloader-content {
      text-align: center;
    }
    
    .preloader-logo {
      font-size: 4rem;
      font-weight: 900;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      animation: pulse 2s infinite;
    }
    
    .preloader-text {
      color: var(--text-secondary);
      font-size: 1.2rem;
    }
  `

  const preloaderStyle = document.createElement("style")
  preloaderStyle.textContent = preloaderCSS
  document.head.appendChild(preloaderStyle)

  document.body.appendChild(preloader)

  setTimeout(() => {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.remove()
    }, 500)
  }, 2000)
})
