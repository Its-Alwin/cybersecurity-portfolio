// main.js — mobile menu + scroll reveal + year fill
document.addEventListener('DOMContentLoaded', function(){
  // fill year
  const y = new Date().getFullYear();
  const el = document.getElementById('yr');
  if(el) el.textContent = y;

  // avatar image loading fix with animation
  const avatar = document.querySelector('.avatar');
  if(avatar) {
    avatar.addEventListener('load', function() {
      console.log('Avatar loaded successfully');
      this.style.opacity = '1';
    });
    
    avatar.addEventListener('error', function() {
      console.warn('Avatar failed to load, using placeholder');
      this.src = 'https://via.placeholder.com/64?text=Profile';
    });
    
    avatar.style.opacity = avatar.complete ? '1' : '0.5';
  }

  // scroll reveal with stagger effect
  const items = document.querySelectorAll('.animate-up');
  const io = new IntersectionObserver(entries=>{
    entries.forEach((e, index)=>{
      if(e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add('in-view');
        }, index * 50);
      }
    });
  }, {threshold: 0.12});

  items.forEach(i=> io.observe(i));

  // Smooth scroll navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Add hover animation to nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add hover animation to cards
  const cards = document.querySelectorAll('.card, .edu-card, .skill-card, .module-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Counter animation for numbers (if present)
  const counterElements = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 1000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if(current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  };

  counterElements.forEach(el => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !el.hasAttribute('data-animated')) {
          animateCounter(el);
          el.setAttribute('data-animated', 'true');
        }
      });
    });
    observer.observe(el);
  });

  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn');
  if(btn){
    btn.addEventListener('click', ()=> {
      document.body.classList.toggle('menu-open');
      btn.style.transform = document.body.classList.contains('menu-open') ? 'rotate(90deg)' : 'rotate(0)';
    });
  }

  // Page transition animation - FIXED to not interfere with nav
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if(link && link.href && !link.href.includes('#') && !link.hasAttribute('download') && link.hostname === window.location.hostname) {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    }
  });
});
