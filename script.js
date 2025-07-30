// Theme Toggle Functionality
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const body = document.body;

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
}

// Event listener for theme toggle
themeToggleBtn.addEventListener("click", toggleTheme);

// Download Resume Functionality - Now links directly to Google Drive
const downloadResumeBtn = document.getElementById("download-resume-btn");

// Optional: Add a small notification when resume is accessed
downloadResumeBtn.addEventListener("click", () => {
  // Create a success notification
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

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".about-content, .skills-grid, .projects-grid, .contact-content"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  // Check if EmailJS is loaded
  if (typeof emailjs === "undefined") {
    console.error("EmailJS is not loaded!");
    showNotification(
      "Email service not available. Please refresh the page.",
      "error"
    );
    return;
  }

  // Initialize EmailJS
  try {
    emailjs.init("iyunlSOiv56Xlhycv"); // Your actual EmailJS public key
    console.log("EmailJS initialized successfully");
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    showNotification("Failed to initialize email service.", "error");
    return;
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Prepare email template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      to_email: "muizmunshi@gmail.com", // Your email address
      reply_to: email, // Add reply_to for better email handling
    };

    // Send email using EmailJS
    console.log("Attempting to send email with params:", templateParams);
    console.log("Service ID: service_z4igei9");
    console.log("Template ID: template_1yq29pw");

    emailjs
      .send("service_z4igei9", "template_1yq29pw", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          showNotification(
            "Message sent successfully! I'll get back to you soon.",
            "success"
          );
          contactForm.reset();
        },
        function (error) {
          console.log("FAILED...", error);
          console.log("Error details:", error.text);
          console.log("Error status:", error.status);

          // More specific error messages
          let errorMessage =
            "Failed to send message. Please try again or contact me directly.";

          if (error.text && error.text.includes("Service not found")) {
            errorMessage =
              "Email service not configured. Please check your EmailJS setup.";
          } else if (error.text && error.text.includes("Template not found")) {
            errorMessage =
              "Email template not found. Please check your EmailJS template.";
          } else if (
            error.text &&
            error.text.includes("Authentication failed")
          ) {
            errorMessage =
              "Authentication failed. Please check your EmailJS keys.";
          }

          showNotification(errorMessage, "error");
        }
      )
      .finally(function () {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
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

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }
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
    // Don't trigger if clicking on links
    if (e.target.tagName === "A" || e.target.closest("a")) {
      return;
    }

    // Add click animation
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "translateY(-10px)";
    }, 150);
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add CSS for loading state
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
`;
document.head.appendChild(style);
