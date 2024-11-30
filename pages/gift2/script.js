let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holding = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    // Event untuk desktop
    this.paper.addEventListener('mousedown', this.start.bind(this));
    document.addEventListener('mousemove', this.move.bind(this));
    document.addEventListener('mouseup', this.end.bind(this));

    // Event untuk layar sentuh
    this.paper.addEventListener('touchstart', this.start.bind(this), { passive: false });
    document.addEventListener('touchmove', this.move.bind(this), { passive: false });
    document.addEventListener('touchend', this.end.bind(this));
  }

  start(e) {
    e.preventDefault();

    const isTouch = e.type === 'touchstart';
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    this.startX = clientX - this.offsetX;
    this.startY = clientY - this.offsetY;
    this.holding = true;

    // Tingkatkan z-index elemen yang dipegang
    this.paper.style.zIndex = highestZ;
    highestZ++;
  }

  move(e) {
    if (!this.holding) return;

    e.preventDefault();

    const isTouch = e.type === 'touchmove';
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    this.offsetX = clientX - this.startX;
    this.offsetY = clientY - this.startY;

    // Terapkan transformasi posisi dan rotasi
    this.paper.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${this.rotation}deg)`;
  }

  end() {
    this.holding = false;
  }
}

// Inisialisasi untuk semua elemen dengan kelas .paper
document.querySelectorAll('.paper').forEach((paper) => {
  new Paper(paper);
});
