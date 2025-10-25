/* ============ Canvas circular animation ============ */
(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const circles = [];
  const COUNT = Math.max(6, Math.floor((w*h)/120000)); // adapte selon ecran

  function rand(min, max){ return Math.random()*(max-min)+min; }

  class Circle {
    constructor(){
      this.r = rand(60, 220);
      this.angle = rand(0, Math.PI*2);
      this.speed = rand(0.0005, 0.0018) * (Math.random()>0.5?1:-1);
      this.cx = w/2 + rand(-w*0.08, w*0.08);
      this.cy = h/2 + rand(-h*0.08, h*0.08);
      this.stroke = rand(0.4, 1.2);
      this.color = `rgba(47,180,255, ${rand(0.03,0.12)})`;
      this.offset = rand(0,Math.PI*2);
    }
    update(t){
      this.angle += this.speed * (1 + Math.sin(t*0.0005 + this.offset)*0.6);
    }
    draw(t){
      ctx.beginPath();
      const x = this.cx + Math.cos(this.angle)*this.r;
      const y = this.cy + Math.sin(this.angle)*this.r;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.stroke;
      ctx.shadowBlur = 24;
      ctx.shadowColor = this.color;
      ctx.arc(x, y, this.r*0.18, 0, Math.PI*2);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function setup(){ circles.length=0; w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    for(let i=0;i<COUNT;i++) circles.push(new Circle());
  }

  let last = 0;
  function loop(t){
    ctx.clearRect(0,0,w,h);
    for(const c of circles){ c.update(t); c.draw(t); }
    requestAnimationFrame(loop);
  }
  addEventListener('resize', () => { setup(); });
  setup();
  requestAnimationFrame(loop);
})();

/* ============ Theme toggle ============ */
(function(){
  function toggleTheme(){
    const root = document.documentElement;
    const cur = document.body.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
  }
  const toggles = document.querySelectorAll('[id^="theme-toggle"]');
  toggles.forEach(btn => btn.addEventListener('click', toggleTheme));
})();

/* ============ Scroll appear ============ */
(function(){
  const els = () => Array.from(document.querySelectorAll('.scroll-appear'));
  function inView(el, offset=120){
    const top = el.getBoundingClientRect().top;
    return top <= (window.innerHeight - offset);
  }
  function check(){
    els().forEach(e => { if(inView(e)) e.classList.add('visible'); });
  }
  addEventListener('scroll', check);
  addEventListener('resize', check);
  document.addEventListener('DOMContentLoaded', check);
  setTimeout(check, 400);
})();