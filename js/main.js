// Theme Toggle
const themeToggle = () => {
  const themeBtn = document.querySelector(".change__mode_container");
  const themeIcon = themeBtn.querySelector("i");
  const body = document.body;
  const navbar = document.querySelector(".lef-navbar");
  const themeScale = document.querySelector(".theme_scale_container");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("theme");
    navbar.classList.add("theme");
    themeScale.classList.add("theme");
    themeIcon.classList.add("theme");
  }

  themeBtn.addEventListener("click", () => {
    body.classList.toggle("theme");
    navbar.classList.toggle("theme");
    themeScale.classList.toggle("theme");
    themeIcon.classList.toggle("theme");

    // Save theme preference
    localStorage.setItem(
      "theme",
      body.classList.contains("theme") ? "dark" : "light"
    );
  });
};

// Mobile Navigation
const mobileNav = () => {
  const openBtn = document.querySelector(".navbar_button_open button");
  const closeBtn = document.querySelector(".navbar_button_close button");
  const navbar = document.querySelector(".lef-navbar");

  openBtn.addEventListener("click", () => {
    navbar.style.display = "block";
    setTimeout(() => {
      navbar.style.transform = "translateX(0)";
      navbar.style.opacity = "1";
    }, 10);
  });

  closeBtn.addEventListener("click", () => {
    navbar.style.transform = "translateX(-100%)";
    navbar.style.opacity = "0";
    setTimeout(() => {
      navbar.style.display = "none";
    }, 300);
  });
};

// Smooth Scrolling
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        const navbar = document.querySelector(".lef-navbar");
        if (window.innerWidth < 900) {
          navbar.style.transform = "translateX(-100%)";
          navbar.style.opacity = "0";
          setTimeout(() => {
            navbar.style.display = "none";
          }, 300);
        }
      }
    });
  });
};

// Active Navigation Link
const activeNavLink = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__page__links a");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));
};

// Typing Animation
const typingAnimation = () => {
  const headerText = document.querySelector(".header__text__animation");
  if (!headerText) return;

  const text = headerText.textContent;
  headerText.textContent = "";
  let i = 0;

  const typeWriter = () => {
    if (i < text.length) {
      headerText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start animation when element is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(headerText);
};

// Project Card Hover Effects
const projectCardEffects = () => {
  const projectCards = document.querySelectorAll(".single__project__info");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "var(--shadow-lg)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "var(--shadow)";
    });
  });
};

// Skills Progress Animation
const skillsProgressAnimation = () => {
  const skillsContainers = document.querySelectorAll(".skills_container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.5 }
  );

  skillsContainers.forEach((container) => {
    container.style.opacity = "0";
    container.style.transform = "translateY(20px)";
    container.style.transition = "all 0.5s ease-out";
    observer.observe(container);
  });
};

// Form Input Animation
const formInputAnimation = () => {
  const inputs = document.querySelectorAll(
    ".send_emeil_form input, .send_emeil_form textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.transform = "translateY(-2px)";
      input.style.boxShadow = "var(--shadow)";
    });

    input.addEventListener("blur", () => {
      input.style.transform = "translateY(0)";
      input.style.boxShadow = "var(--shadow-sm)";
    });
  });
};

// Initialize AOS
const initAOS = () => {
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: "ease-in-out",
  });
};

// Scroll to Top Button
const scrollToTop = () => {
  const button = document.querySelector(".go_up_btn button");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.display = "block";
      button.style.animation = "fadeIn 0.3s ease-in-out";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  themeToggle();
  mobileNav();
  smoothScroll();
  activeNavLink();
  typingAnimation();
  projectCardEffects();
  skillsProgressAnimation();
  formInputAnimation();
  initAOS();
  scrollToTop();
});
