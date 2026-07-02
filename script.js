// Interactivity & 3D Visual Effects for Gowravam Charantej Portfolio

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // MOBILE NAVIGATION HAMBURGER MENU
  // ==========================================
  const hamburger = document.getElementById('hamburgerMenu');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking on a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ==========================================
  // THEME TOGGLE (LIGHT & DARK MODES)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check user preference in localStorage
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fas fa-sun';
      themeIcon.style.color = '#eab308'; // Sunny gold color
    } else {
      themeIcon.className = 'fas fa-moon';
      themeIcon.style.color = ''; // Reset to default CSS variables
    }
  }

  // ==========================================
  // HEADER SCROLL EVENT
  // ==========================================
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // TYPEWRITER EFFECT IN HERO SECTION
  // ==========================================
  const typewriterElement = document.getElementById('typewriter');
  const words = [
    'Computer Science Student.',
    'Machine Learning Enthusiast.',
    'Problem Solver.',
    'Passionate Developer.'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Deleting letters
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      // Typing letters
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typewriterElement) {
    typeEffect();
  }

  // ==========================================
  // SCROLL ANIMATIONS USING INTERSECTION OBSERVER
  // ==========================================
  const animatableElements = document.querySelectorAll('.scroll-animate');
  
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Unobserve once animated to make performance better
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatableElements.forEach(el => animationObserver.observe(el));

  // ==========================================
  // ACTIVE NAVIGATION LINK OBSERVER
  // ==========================================
  const sections = document.querySelectorAll('section');
  
  const navObserverOptions = {
    threshold: 0.3,
    rootMargin: '-50px 0px -50px 0px'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navItems.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

  // ==========================================
  // SKILLS FILTER TABS
  // ==========================================
  const tabBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Switch active class
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
          // Trigger a micro fade-in animation
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // INTERACTIVE 3D TILT EFFECT ON CARDS & PROFILE
  // ==========================================
  const tiltElements = document.querySelectorAll('.glass-card, .hero-profile-container');
  const maxTiltAngle = 10; // Max tilt rotation in degrees

  // Only apply tilt effect if screen width is greater than 768px (performance)
  if (window.innerWidth > 768) {
    tiltElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        
        // Calculate coordinates relative to the element's center
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt angles based on mouse offset percentage
        const tiltX = -((mouseY - centerY) / centerY) * maxTiltAngle;
        const tiltY = ((mouseX - centerX) / centerX) * maxTiltAngle;
        
        // Apply 3D rotation transform dynamically
        element.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        element.style.transition = 'transform 0.05s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
      });

      element.addEventListener('mouseleave', () => {
        // Smoothly restore the element's original transform position
        element.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        element.style.transition = 'transform 0.4s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
      });
    });
  }

  // Parallax is handled natively by card-tilt on hover.

  // ==========================================
  // CONTACT FORM SUBMISSION HANDLER
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show temporary sending status
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Sending message...';
      formStatus.style.display = 'block';

      // Simulating network request
      setTimeout(() => {
        // Collect field values
        const name = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const subject = document.getElementById('formSubject').value;
        const message = document.getElementById('formMessage').value;

        if (name && email && subject && message) {
          formStatus.className = 'form-status success';
          formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
          contactForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Something went wrong. Please check all fields and try again.';
        }

        // Fade out success notification after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);

      }, 1200);
    });
  }

});

// --- PROJECT DETAILS MODAL ---
window.openProjectModal = function() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
};

window.closeProjectModal = function(event) {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
};

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeProjectModal();
  }
});
