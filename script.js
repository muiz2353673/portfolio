// Test if JavaScript is working
console.log("JavaScript is loaded and working!");

// Wait for DOM to be loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - Initializing all functionality!");

  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;

  if (themeToggleBtn) {
    console.log("Theme toggle button found!");

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem("theme") || "dark";
    body.setAttribute("data-theme", currentTheme);

    // Theme toggle function
    function toggleTheme() {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Add transition effect
      body.style.transition = "all 0.3s ease";
      console.log("Theme toggled to:", newTheme);
    }

    // Event listener for theme toggle
    themeToggleBtn.addEventListener("click", toggleTheme);
    console.log("Theme toggle event listener added!");
  } else {
    console.error("Theme toggle button not found!");
  }

  // Download Resume Functionality
  const downloadResumeBtn = document.getElementById("download-resume-btn");

  if (downloadResumeBtn) {
    console.log("Download resume button found!");

    downloadResumeBtn.addEventListener("click", () => {
      const notification = document.createElement("div");
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
      `;
      notification.textContent = "Opening resume in new tab...";

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.transform = "translateX(0)";
      }, 100);

      setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    });
  }

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    console.log("Mobile navigation elements found!");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const currentTheme = document.body.getAttribute("data-theme") || "dark";

    if (window.scrollY > 100) {
      if (currentTheme === "light") {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.background = "rgba(10, 15, 26, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
      }
    } else {
      if (currentTheme === "light") {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "none";
      } else {
        navbar.style.background = "rgba(10, 15, 26, 0.95)";
        navbar.style.boxShadow = "none";
      }
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".about-content, .skills-grid, .projects-grid, .contact-content"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Skill items hover effect
  document.querySelectorAll(".skill-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-2px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
    });
  });

  // Project cards click effect
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(-10px)";
      }, 150);
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    console.log("Contact form found!");
    console.log("Using Formspree for email handling");

    contactForm.addEventListener("submit", function (e) {
      console.log("Contact form submitted!");

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      console.log("Form data:", { name, email, subject, message });

      // Simple validation
      if (!name || !email || !subject || !message) {
        e.preventDefault();
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(email)) {
        e.preventDefault();
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Let Formspree handle the submission
      console.log("Formspree will handle the email submission");

      // Show success message after a short delay (Formspree will redirect)
      setTimeout(() => {
        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Initialize typing animation
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    console.log("Hero title found!");
    console.log("Hero title content:", heroTitle.textContent);
    console.log("Hero title HTML:", heroTitle.innerHTML);
    console.log("Starting typing animation...");

    const originalText = heroTitle.textContent;
    if (originalText && originalText.trim() !== "") {
      setTimeout(() => {
        console.log("Executing typeWriter function...");
        typeWriter(heroTitle, originalText, 50);
      }, 1000);
    } else {
      console.log("No text content found in hero title");
    }
  } else {
    console.log("Hero title element not found");
  }

  console.log("All functionality initialized successfully!");
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  console.log("typeWriter function called");
  console.log("Element:", element);
  console.log("Text:", text);
  console.log("Speed:", speed);

  let i = 0;
  const originalHTML = element.innerHTML;
  console.log("Original HTML:", originalHTML);

  const simpleText = "Hi, I'm Abdul Muiz Munshi";
  console.log("Simple text to type:", simpleText);

  element.innerHTML = "";
  console.log("Cleared element, starting typing...");

  function type() {
    if (i < simpleText.length) {
      element.innerHTML += simpleText.charAt(i);
      console.log("Typed character:", simpleText.charAt(i));
      i++;
      setTimeout(type, speed);
    } else {
      console.log("Typing complete, adding cursor...");
      element.innerHTML += '<span class="typing-cursor">|</span>';

      setTimeout(() => {
        console.log("Restoring original HTML...");
        element.innerHTML = originalHTML;
      }, 2000);
    }
  }

  type();
}

// Add CSS for loading state and typing cursor
const style = document.createElement("style");
style.textContent = `
  body:not(.loaded) {
    overflow: hidden;
  }
  
  body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  body:not(.loaded)::after {
    content: 'Loading...';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 10000;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
  
  .notification-close:hover {
    opacity: 0.8;
  }
  
  .typing-cursor {
    animation: blink 1s infinite;
    color: #4299e1;
    font-weight: bold;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);
