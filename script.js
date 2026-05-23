// ============================================
// SMOOTH SCROLL UNTUK NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// HIGHLIGHT ACTIVE NAVIGATION LINK
// ============================================

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function createScrollToTopButton() {
  const button = document.createElement('button');
  button.id = 'scrollToTop';
  button.innerHTML = '↑';
  button.title = 'Kembali ke atas';
  button.setAttribute('aria-label', 'Scroll to top');
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  });
  
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ============================================
// LAZY LOADING ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.menu-card').forEach((el, index) => {
  el.classList.add('fade-in-element');
  el.style.transitionDelay = `${index * 0.15}s`;
  observer.observe(el);
});

document.querySelectorAll('.beverage-card').forEach((el, index) => {
  el.classList.add('fade-in-element');
  el.style.transitionDelay = `${index * 0.2}s`;
  observer.observe(el);
});

document.querySelectorAll('.service-card, .service-panel, .testimonial-panel, .menu-grid, .beverage-grid, header, section').forEach((el, index) => {
  el.classList.add('fade-in-element');
  el.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function setupMobileMenu() {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  
  if (!nav) return;
  
  // Create hamburger menu
  const hamburger = document.createElement('button');
  hamburger.id = 'hamburger';
  hamburger.innerHTML = '☰';
  hamburger.title = 'Menu';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  
  hamburger.style.display = 'none';
  
  const headerInner = document.querySelector('.header-inner');
  
  // Check if on mobile and add hamburger
  function updateMenu() {
    if (window.innerWidth <= 768) {
      if (!document.getElementById('hamburger')) {
        headerInner.appendChild(hamburger);
      }
      hamburger.style.display = 'block';
    } else {
      hamburger.style.display = 'none';
      nav.style.display = '';
    }
  }
  
  window.addEventListener('resize', updateMenu);
  updateMenu();
  
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Close menu when link is clicked
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        nav.style.display = 'none';
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        !e.target.closest('.main-nav') && 
        !e.target.closest('#hamburger')) {
      nav.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', setupMobileMenu);

// ============================================
// TESTIMONIAL & SERVICE CARD HOVER
// ============================================

document.querySelectorAll('.testimonial-panel, .service-panel').forEach(panel => {
  panel.addEventListener('mouseenter', function() {
    const currentShadow = window.getComputedStyle(this).boxShadow;
    this.style.boxShadow = '0 28px 65px rgba(71, 39, 15, 0.12)';
  });
  
  panel.addEventListener('mouseleave', function() {
    this.style.boxShadow = '';
  });
});

// ============================================
// WHATSAPP INTEGRATION
// ============================================

function setupWhatsAppLinks() {
  const phoneNumber = '6285215199262';
  const whatsappLinks = document.querySelectorAll('a[href="tel:+6285215199262"]');
  
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Keep default phone behavior
      console.log('Hubungi via WhatsApp atau telepon: ' + phoneNumber);
    });
  });
}

document.addEventListener('DOMContentLoaded', setupWhatsAppLinks);

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// ============================================
// STICKY HEADER ON SCROLL
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
  // Escape to close mobile menu
  if (e.key === 'Escape') {
    const nav = document.querySelector('.main-nav');
    if (window.innerWidth <= 768 && nav) {
      nav.style.display = 'none';
    }
  }
  
  // Tab through elements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', function() {
  document.body.classList.remove('keyboard-nav');
});

// ============================================
// IMAGE LAZY LOADING
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// UTILITY: CHECK MOBILE DEVICE
// ============================================

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

console.log('Mobile Device:', isMobileDevice());

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cLojonggo Fried Chicken', 'font-size: 20px; color: #FF6B35; font-weight: bold;');
console.log('Website dibuat dengan ❤️ untuk melayani Anda dengan lebih baik.');
console.log('Hubungi kami: 0852-1519-9262');

// ============================================
// FORM SUBMISSION HANDLER (JIKA ADA FORM)
// ============================================

const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const formData = new FormData(this);
    console.log('Form data:', Object.fromEntries(formData));
    
    // Reset form
    this.reset();
    alert('Terima kasih telah menghubungi kami! Kami akan segera merespons.');
  });
}

// ============================================
// SMOOTH PAGE TRANSITION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ============================================
// COUNTER ANIMATION (UNTUK STATS)
// ============================================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ============================================
// CLICK TRACKING (OPTIONAL ANALYTICS)
// ============================================

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    const href = this.getAttribute('href');
    if (href && href.includes('#')) {
      console.log('Navigating to:', href);
    }
  });
});

// ============================================
// RESPONSIVE VIDEO EMBED
// ============================================

document.querySelectorAll('iframe').forEach(iframe => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('iframe-wrapper');
  wrapper.style.position = 'relative';
  wrapper.style.paddingBottom = '56.25%';
  wrapper.style.height = '0';
  wrapper.style.overflow = 'hidden';
  
  iframe.parentNode.insertBefore(wrapper, iframe);
  wrapper.appendChild(iframe);
  
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
});
