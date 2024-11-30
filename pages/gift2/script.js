let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Event untuk perangkat desktop
    paper.addEventListener('mousedown', (e) => this.handleStart(e, paper));
    document.addEventListener('mousemove', (e) => this.handleMove(e, paper));
    window.addEventListener('mouseup', () => this.handleEnd());

    // Event untuk perangkat sentuh
    paper.addEventListener('touchstart', (e) => this.handleStart(e, paper));
    document.addEventListener('touchmove', (e) => this.handleMove(e, paper), { passive: false });
    window.addEventListener('touchend', () => this.handleEnd());
  }

  handleStart(e, paper) {
    e.preventDefault();

    // Tangkap posisi awal
    const touch = e.touches ? e.touches[0] : e; // Tangkap input dari mouse atau layar sentuh
    this.mouseTouchX = touch.clientX;
    this.mouseTouchY = touch.clientY;
    this.prevMouseX = touch.clientX;
    this.prevMouseY = touch.clientY;

    this.holdingPaper = true;

    // Atur z-index agar elemen teratas
    paper.style.zIndex = highestZ;
    highestZ += 1;

    // Deteksi rotasi jika klik kanan (desktop)
    if (e.button === 2) {
      this.rotating = true;
    }
  }

  handleMove(e, paper) {
    if (!this.holdingPaper) return;

    e.preventDefault();

    // Tangkap posisi saat ini
    const touch = e.touches ? e.touches[0] : e; // Tangkap input dari mouse atau layar sentuh
    this.mouseX = touch.clientX;
    this.mouseY = touch.clientY;

    if (!this.rotating) {
      // Hitung perpindahan posisi
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      // Simpan posisi sebelumnya
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    }

    // Terapkan posisi dan rotasi pada elemen
    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }

  handleEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
