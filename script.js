/* ============================================================
   DEO GYM — Premium JavaScript
   ============================================================ */

'use strict';

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  document.querySelectorAll('a, button, .gallery-item, .service-card, .pricing-card, .blog-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursorFollower.style.width = '50px';
      cursorFollower.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursorFollower.style.width = '32px';
      cursorFollower.style.height = '32px';
    });
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
});

/* ============================================================
   LOADER — INTRO SEQUENCE
   ============================================================ */
const loader = document.getElementById('loader');
const loaderImg = document.getElementById('loaderImg');
const loaderImgWrap = loaderImg ? loaderImg.parentElement : null;

function typeText(el, text, speed, callback) {
  if (!el) { if (callback) callback(); return; }
  el.style.borderRight = '2px solid #FFD700';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      el.style.borderRight = 'none';
      if (callback) setTimeout(callback, 300);
    }
  }, speed);
}

function createLoaderParticles() {
  const container = document.getElementById('loaderParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const span = document.createElement('span');
    span.style.left = Math.random() * 100 + 'vw';
    span.style.top = Math.random() * 100 + 'vh';
    span.style.animationDuration = (3 + Math.random() * 5) + 's';
    span.style.animationDelay = Math.random() * 4 + 's';
    span.style.width = (Math.random() * 3 + 1) + 'px';
    span.style.height = span.style.width;
    container.appendChild(span);
  }
}

document.body.classList.add('loading');
createLoaderParticles();

window.addEventListener('load', () => {
  setTimeout(() => {
    if (loaderImgWrap) loaderImgWrap.classList.add('visible');

    setTimeout(() => {
      const texts = [
        { el: 'tw1', text: 'Welcome To DEO GYM', speed: 60 },
        { el: 'tw2', text: 'Jahan Fitness Sirf Goal Nahi Lifestyle Hai', speed: 40 },
        { el: 'tw3', text: 'Founder & Head Coach', speed: 55 },
        { el: 'tw4', text: 'Mr. Mukesh Singh', speed: 70 },
        { el: 'tw5', text: 'Transform Your Body. Transform Your Life.', speed: 45 },
      ];

      let index = 0;
      function typeNext() {
        if (index >= texts.length) {
          setTimeout(hideLoader, 1000);
          return;
        }
        const { el, text, speed } = texts[index];
        typeText(document.getElementById(el), text, speed, () => {
          index++;
          typeNext();
        });
      }
      typeNext();
    }, 1000);
  }, 800);
});

function hideLoader() {
  if (!loader) return;
  loader.classList.add('hidden');
  document.body.classList.remove('loading');
  // Trigger hero animation
  setTimeout(() => {
    const heroContent = document.getElementById('heroContent');
    if (heroContent) {
      heroContent.classList.add('visible');
      setTimeout(() => heroContent.classList.add('animate'), 100);
    }
    initIntersectionObserver();
    initCounters();
  }, 400);
}

/* ============================================================
   NAVBAR
   ============================================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   INTERSECTION OBSERVER — REVEAL ANIMATIONS
   ============================================================ */
function initIntersectionObserver() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => el.classList.add('revealed'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
          }
        };
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   HERO PARTICLES
   ============================================================ */
function createHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const colors = ['#FFD700', '#00E5FF', '#FF6B00'];
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('span');
    particle.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      opacity: 0;
    `;
    container.appendChild(particle);
  }
}
createHeroParticles();

/* ============================================================
   GALLERY — MASONRY + LIGHTBOX
   ============================================================ */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentLightboxIdx = 0;

const galleryImages = Array.from(galleryItems).map(item => {
  const img = item.querySelector('img');
  return { src: img ? img.src : '', alt: img ? img.alt : '' };
});

galleryItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    currentLightboxIdx = idx;
    openLightbox(idx);
  });
});

function openLightbox(idx) {
  if (!lightbox || !lightboxImg) return;
  const { src, alt } = galleryImages[idx];
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    currentLightboxIdx = (currentLightboxIdx - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentLightboxIdx);
  });
}
if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    currentLightboxIdx = (currentLightboxIdx + 1) % galleryImages.length;
    openLightbox(currentLightboxIdx);
  });
}
document.addEventListener('keydown', e => {
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
  if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
});

/* ============================================================
   TEAM CAROUSEL
   ============================================================ */
const teamCarousel = document.getElementById('teamCarousel');
const teamPrev = document.getElementById('teamPrev');
const teamNext = document.getElementById('teamNext');
const teamDotsContainer = document.getElementById('teamDots');
let teamIndex = 0;
const TEAM_VISIBLE = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;

function getTeamVisible() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
}

function initTeamCarousel() {
  if (!teamCarousel) return;
  const cards = teamCarousel.querySelectorAll('.team-card');
  const visibleCount = getTeamVisible();
  const totalSlides = cards.length - visibleCount;
  if (totalSlides <= 0) return;

  // Create dots
  if (teamDotsContainer) {
    teamDotsContainer.innerHTML = '';
    for (let i = 0; i <= totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { teamIndex = i; updateTeamCarousel(); });
      teamDotsContainer.appendChild(dot);
    }
  }

  function updateTeamCarousel() {
    const cardWidth = cards[0].offsetWidth + 24;
    teamCarousel.style.transform = `translateX(-${teamIndex * cardWidth}px)`;
    if (teamDotsContainer) {
      teamDotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === teamIndex);
      });
    }
  }

  if (teamPrev) teamPrev.addEventListener('click', () => {
    const total = cards.length - getTeamVisible();
    teamIndex = teamIndex <= 0 ? total : teamIndex - 1;
    updateTeamCarousel();
  });
  if (teamNext) teamNext.addEventListener('click', () => {
    const total = cards.length - getTeamVisible();
    teamIndex = teamIndex >= total ? 0 : teamIndex + 1;
    updateTeamCarousel();
  });

  // Auto slide
  let teamAutoSlide = setInterval(() => {
    const total = cards.length - getTeamVisible();
    teamIndex = teamIndex >= total ? 0 : teamIndex + 1;
    updateTeamCarousel();
  }, 4000);

  teamCarousel.addEventListener('mouseenter', () => clearInterval(teamAutoSlide));
  teamCarousel.addEventListener('mouseleave', () => {
    teamAutoSlide = setInterval(() => {
      const total = cards.length - getTeamVisible();
      teamIndex = teamIndex >= total ? 0 : teamIndex + 1;
      updateTeamCarousel();
    }, 4000);
  });
}

// Init after load
window.addEventListener('load', initTeamCarousel);

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */
const testimonialTrack = document.getElementById('testimonialTrack');
const testPrev = document.getElementById('testPrev');
const testNext = document.getElementById('testNext');
const testimonialDotsContainer = document.getElementById('testimonialDots');
let testIndex = 0;

function initTestimonials() {
  if (!testimonialTrack) return;
  const cards = testimonialTrack.querySelectorAll('.testimonial-card');
  const total = cards.length;

  if (testimonialDotsContainer) {
    testimonialDotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { testIndex = i; updateTestimonials(); });
      testimonialDotsContainer.appendChild(dot);
    }
  }

  function updateTestimonials() {
    testimonialTrack.style.transform = `translateX(-${testIndex * 100}%)`;
    if (testimonialDotsContainer) {
      testimonialDotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === testIndex);
      });
    }
  }

  if (testPrev) testPrev.addEventListener('click', () => {
    testIndex = testIndex <= 0 ? total - 1 : testIndex - 1;
    updateTestimonials();
  });
  if (testNext) testNext.addEventListener('click', () => {
    testIndex = testIndex >= total - 1 ? 0 : testIndex + 1;
    updateTestimonials();
  });

  let autoSlide = setInterval(() => {
    testIndex = testIndex >= total - 1 ? 0 : testIndex + 1;
    updateTestimonials();
  }, 5000);

  testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
  testimonialTrack.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      testIndex = testIndex >= total - 1 ? 0 : testIndex + 1;
      updateTestimonials();
    }, 5000);
  });

  // Touch support
  let touchStartX = 0;
  testimonialTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  testimonialTrack.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) testNext && testNext.click();
      else testPrev && testPrev.click();
    }
  });
}

window.addEventListener('load', initTestimonials);

/* ============================================================
   PRICING — CHOOSE PLAN → FORM
   ============================================================ */
document.querySelectorAll('.choose-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.dataset.plan;
    const planSelect = document.getElementById('memberPlan');
    if (planSelect && plan) {
      // Match the value
      const opts = planSelect.options;
      for (let i = 0; i < opts.length; i++) {
        if (opts[i].value.includes(plan.split('–')[0].trim())) {
          planSelect.value = opts[i].value;
          break;
        }
      }
    }
    const joinSection = document.getElementById('join');
    if (joinSection) joinSection.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ============================================================
   MEMBERSHIP FORM → WHATSAPP
   ============================================================ */
const submitForm = document.getElementById('submitForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (submitForm) {
  submitForm.addEventListener('click', () => {
    const name = document.getElementById('memberName');
    const gender = document.getElementById('memberGender');
    const age = document.getElementById('memberAge');
    const mobile = document.getElementById('memberMobile');
    const plan = document.getElementById('memberPlan');
    const service = document.getElementById('memberService');
    const date = document.getElementById('memberDate');
    const msg = document.getElementById('memberMsg');

    // Basic validation
    const required = [name, gender, age, mobile, plan, date];
    let valid = true;
    required.forEach(field => {
      if (!field || !field.value.trim()) {
        valid = false;
        if (field) {
          field.style.borderColor = '#FF6B00';
          field.addEventListener('input', () => field.style.borderColor = '', { once: true });
        }
      }
    });

    if (!valid) {
      alert('Please fill in all required fields.');
      return;
    }

    const selectedPlan = plan ? plan.value : 'Monthly – ₹499';
    const waNumber = '917376704008';
    const message = encodeURIComponent(
      `🏋️ *DEO GYM — New Membership Request* 🏋️\n\n` +
      `👤 Name: ${name.value}\n` +
      `⚤ Gender: ${gender.value}\n` +
      `🎂 Age: ${age.value}\n` +
      `📞 Mobile: ${mobile.value}\n` +
      `💳 Plan: ${selectedPlan}\n` +
      `🏃 Service: ${service && service.value ? service.value : 'Not specified'}\n` +
      `📅 Joining Date: ${date.value}\n` +
      `💬 Message: ${msg && msg.value ? msg.value : 'None'}\n\n` +
      `✅ Please confirm my membership. Thank you!`
    );

    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');

    // Show success modal
    const successText = document.getElementById('successText');
    if (successText) {
      successText.textContent = `You are now a DEO GYM ${selectedPlan} Member. Our team will contact you shortly.`;
    }
    if (successModal) successModal.classList.add('open');

    // Reset form
    [name, gender, age, mobile, plan, service, date, msg].forEach(el => {
      if (el) el.value = '';
    });
  });
}

if (closeModal && successModal) {
  closeModal.addEventListener('click', () => successModal.classList.remove('open'));
}
if (successModal) {
  successModal.addEventListener('click', e => {
    if (e.target === successModal) successModal.classList.remove('open');
  });
}

/* ============================================================
   BMI CALCULATOR
   ============================================================ */
const calcBMI = document.getElementById('calcBMI');

if (calcBMI) {
  calcBMI.addEventListener('click', () => {
    const height = parseFloat(document.getElementById('bmiHeight').value);
    const weight = parseFloat(document.getElementById('bmiWeight').value);

    if (!height || !weight || height < 100 || weight < 30) {
      alert('Please enter valid height (cm) and weight (kg).');
      return;
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiLabel = document.getElementById('bmiLabel');
    const bmiSuggestion = document.getElementById('bmiSuggestion');
    const bmiRing = document.getElementById('bmiRing');

    let label, suggestion, ringColor;
    if (bmi < 18.5) {
      label = 'Underweight';
      suggestion = 'Your BMI suggests you may need to build more body mass and strength. Join DEO GYM to build muscle, improve strength, and achieve a healthy body composition under expert guidance.';
      ringColor = '#64B5F6';
    } else if (bmi < 25) {
      label = 'Normal';
      suggestion = 'Great work — your BMI is in the healthy range! Join DEO GYM to achieve peak fitness, build lean muscle, and maintain your results long-term with our certified trainers.';
      ringColor = '#81C784';
    } else if (bmi < 30) {
      label = 'Overweight';
      suggestion = 'Your BMI suggests you are in the overweight range. Join DEO GYM to transform your physique with personalized training programs, structured cardio sessions, and expert dietary guidance.';
      ringColor = '#FFD54F';
    } else {
      label = 'Obese';
      suggestion = 'Your BMI indicates obesity. The good news — consistent training creates incredible transformations. Join DEO GYM today and let our expert coaches guide you safely and effectively toward your ideal body.';
      ringColor = '#E57373';
    }

    if (bmiValue) bmiValue.textContent = bmi;
    if (bmiLabel) bmiLabel.textContent = label;
    if (bmiSuggestion) bmiSuggestion.textContent = suggestion;
    if (bmiRing) bmiRing.style.borderColor = ringColor;
    if (bmiResult) bmiResult.style.display = 'block';

    bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   SMOOTH SCROLL — ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   PARALLAX EFFECT — HERO IMAGE
   ============================================================ */
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroImg.style.transform = `scale(1.08) translateY(${scrolled * 0.25}px)`;
  }
}, { passive: true });

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + section.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { passive: true });

/* ============================================================
   LAZY LOADING — IMAGES
   ============================================================ */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading already handled via HTML
} else {
  // Fallback IntersectionObserver
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        lazyObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => lazyObserver.observe(img));
}

/* ============================================================
   GLOW BORDER HOVER EFFECT — DYNAMIC
   ============================================================ */
document.querySelectorAll('.glass-card, .feature-card, .service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

/* ============================================================
   SET MIN DATE FOR JOIN FORM
   ============================================================ */
const memberDate = document.getElementById('memberDate');
if (memberDate) {
  const today = new Date().toISOString().split('T')[0];
  memberDate.min = today;
  memberDate.value = today;
}

console.log('%cDEO GYM — Premium Website Loaded ✅', 'color: #FFD700; font-size: 14px; font-weight: bold;');
