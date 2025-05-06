// Navigation scroll behavior
let lastScroll = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    nav.classList.remove("hidden");
    return;
  }

  if (currentScroll > lastScroll && !nav.classList.contains("hidden")) {
    // Scrolling down
    nav.classList.add("hidden");
  } else if (currentScroll < lastScroll && nav.classList.contains("hidden")) {
    // Scrolling up
    nav.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});

// Mobile menu functionality
const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with the 'fade-in' class
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});

// Gallery image click handler
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery__item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector(".gallery__image");
      const caption = item.querySelector(".gallery__caption");

      // Create modal
      const modal = document.createElement("div");
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

      // Create modal content
      const modalContent = document.createElement("div");
      modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90vh;
            `;

      // Clone the image
      const modalImg = img.cloneNode();
      modalImg.style.cssText = `
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
            `;

      // Add caption if exists
      if (caption) {
        const modalCaption = caption.cloneNode(true);
        modalCaption.style.cssText = `
                    position: absolute;
                    bottom: -40px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    color: white;
                `;
        modalContent.appendChild(modalCaption);
      }

      // Close button
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "×";
      closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0.5rem;
            `;

      // Assemble modal
      modalContent.appendChild(modalImg);
      modalContent.appendChild(closeBtn);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Show modal
      requestAnimationFrame(() => {
        modal.style.opacity = "1";
      });

      // Close modal
      const closeModal = () => {
        modal.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      };

      closeBtn.addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    });
  });
});
