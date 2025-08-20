document.addEventListener("DOMContentLoaded", () => {
  // Navigation toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
    navLinks.forEach(link => link.addEventListener("click", () => navMenu.classList.remove("active")));
    document.addEventListener("click", e => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target))
        navMenu.classList.remove("active");
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const target = document.getElementById(this.getAttribute("href").slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Form validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function showNotification(msg, type = "info") {
    const n = document.createElement("div");
    n.className = `notification notification-${type}`;
    n.innerHTML = msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3500);
  }
  document.querySelectorAll(".contact-form").forEach(form => {
    form.addEventListener("submit", e => {
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const msg = form.querySelector('textarea[name="message"]');
      let isValid = true;
      [name, email, msg].forEach(f => { if (f) f.style.borderColor = "#333"; });
      if (name && name.value.trim().length < 2) { name.style.borderColor = "#ff0000"; isValid = false; }
      if (email && !isValidEmail(email.value)) { email.style.borderColor = "#ff0000"; isValid = false; }
      if (msg && msg.value.trim().length < 10) { msg.style.borderColor = "#ff0000"; isValid = false; }
      if (!isValid) { e.preventDefault(); showNotification("Please fill in all required fields correctly.", "error"); }
    });
  });
});


class CoursesSlider {
  constructor() {
    this.current = 0;
    this.isAnimating = false;
    this.isDragging = false;
    this.slidesPerView = this.getSlidesPerView();
    this.autoTimer = null;
    this.init();
  }

  init() {
    this.slider = document.getElementById('coursesSlider');
    this.track = document.getElementById('coursesTrack');
    this.cards = this.track.querySelectorAll('.course-card');
    this.total = Math.ceil(this.cards.length / this.slidesPerView);
    this.prev = document.getElementById('prevBtn');
    this.next = document.getElementById('nextBtn');
    [ [this.prev, -1], [this.next, 1] ].forEach(([btn, dir]) => btn && btn.addEventListener('click', () => this.slide(dir)));
    if (this.slider) {
      this.slider.addEventListener('mouseenter', () => this.stop());
      this.slider.addEventListener('mouseleave', () => this.start());
      this.slider.addEventListener('touchstart', e => this.dragStart(e), {passive:true});
      this.slider.addEventListener('touchend', e => this.dragEnd(e), {passive:true});
      this.slider.addEventListener('mousedown', e => this.dragStart(e));
      this.slider.addEventListener('mousemove', e => this.onDragMove(e));
      this.slider.addEventListener('mouseup', e => this.dragEnd(e));
      this.slider.addEventListener('mouseleave', () => this.mouseDown = false);
    }
    window.addEventListener('resize', this.debounce(() => this.resize(), 200));
    document.addEventListener('keydown', e => e.key==='ArrowLeft'?this.slide(-1):e.key==='ArrowRight'?this.slide(1):null);
    this.start();
    this.initCardAnim();
  }

  getSlidesPerView() {
    const w = window.innerWidth;
    return w >= 1200 ? 3 : w >= 768 ? 2 : 1;
  }

  slide(dir) {
    if (this.isAnimating) return;
    this.current = (this.current + dir + this.total) % this.total;
    this.move();
  }

move() {
  this.isAnimating = true;
  const cardWidth = this.cards[0].offsetWidth; // dynamic width
  this.track.style.transform = `translateX(${-this.current * cardWidth * this.slidesPerView}px)`;
  setTimeout(() => this.isAnimating = false, 400);
}


  dragStart(e) {
    this.isDragging = false;
    this.stop();
    this.mouseDown = true;
    this.startX = (e.touches ? e.touches[0].clientX : e.clientX);
    if (!e.touches) this.slider.style.cursor = 'grabbing';
  }
  dragEnd(e) {
    if (!this.mouseDown && !e.changedTouches) return;
    const endX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
    const dx = endX - this.startX;
    if (Math.abs(dx) > 50) this.slide(dx > 0 ? -1 : 1);
    if (!e.changedTouches) this.slider.style.cursor = 'grab';
    this.mouseDown = false;
    setTimeout(() => this.isDragging = false, 50);
    this.start();
  }
  onDragMove(e) {
    if (this.mouseDown && Math.abs(e.clientX - this.startX) > 10) this.isDragging = true;
  }

  resize() {
    let n = this.getSlidesPerView();
    if (n !== this.slidesPerView) {
      this.slidesPerView = n;
      this.total = Math.ceil(this.cards.length / n);
      this.current = 0;
      this.move();
    }
  }

  start() {
    this.stop();
    this.autoTimer = setInterval(() => this.slide(1), 5000);
  }
  stop() {
    this.autoTimer && clearInterval(this.autoTimer);
  }

  debounce(fn, wait) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); } }

  initCardAnim() {
    this.cards.forEach((c, i) => {
      c.classList.add('loading');
      setTimeout(() => { c.classList.remove('loading'); c.classList.add('loaded'); }, i*80);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new CoursesSlider());
