document.addEventListener('DOMContentLoaded', function(){

    (function(){
        emailjs.init("sSntT15-Cf8xenKxB");
    })();
    
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    function toggleMobileMenu() {
      if (mobileMenu) {
        mobileMenu.classList.toggle('is-open');
        mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('is-open') ? 'false' : 'true');
        document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
      }
    }

    if(menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', toggleMobileMenu);
        closeMenu.addEventListener('click', toggleMobileMenu);

        mobileLinks.forEach(link => {
          link.addEventListener('click', toggleMobileMenu);
        });
    }

    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const icon = toggle.querySelector('i');
  
    if(localStorage.getItem('pm_theme') === 'light') {
      root.classList.add('light');
      icon.className = 'bx bx-sun';
    }
  
    toggle.addEventListener('click', () => {
      root.classList.toggle('light');
      const isLight = root.classList.contains('light');
      localStorage.setItem('pm_theme', isLight ? 'light' : 'dark');
      icon.className = isLight ? 'bx bx-sun' : 'bx bx-moon';
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-show');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.reveal-hidden').forEach((el) => observer.observe(el));

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
    });
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
  
    let width, height;
    let particles = [];
  
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
  
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = 'rgba(122, 75, 255, 0.3)'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    for (let i = 0; i < 35; i++) {
      particles.push(new Particle());
    }
  
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  
    const form = document.getElementById('contact-form');
    if(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = form.querySelector('button[type=submit]');
        const originalText = btn.textContent;
        btn.disabled = true; 
        btn.textContent = 'Enviando...';
        btn.style.opacity = '0.7';
  

        const serviceID = 'service_4vi5snh';
        const templateID = 'template_x4ksm1l';
  
        emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
            btn.textContent = 'Enviado com Sucesso! 🚀';
            btn.style.backgroundColor = '#00eaff'; 
            btn.style.color = '#000';
            btn.style.borderColor = '#00eaff';
            
            alert('Obrigado! Sua mensagem foi enviada e eu responderei em breve.');
            form.reset();
            
            setTimeout(() => {
              btn.disabled = false;
              btn.textContent = originalText;
              btn.style.backgroundColor = ''; 
              btn.style.color = '';
              btn.style.borderColor = '';
              btn.style.opacity = '1';
            }, 4000);
          }, (err) => {
            btn.textContent = 'Erro ao enviar ❌';
            btn.disabled = false;
            btn.style.opacity = '1';
            alert('Ops! Ocorreu um erro ao enviar. Tente me chamar no WhatsApp.');
            console.error('Erro EmailJS:', JSON.stringify(err));
          });
      });
    }
  });