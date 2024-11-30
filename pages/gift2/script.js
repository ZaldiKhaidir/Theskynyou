let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    // Event untuk desktop (mouse)
    this.paper.addEventListener('mousedown', this.startMove.bind(this));
    document.addEventListener('mousemove', this.move.bind(this));
    window.addEventListener('mouseup', this.endMove.bind(this));

    // Event untuk layar sentuh (touch)
    this.paper.addEventListener('touchstart', this.startMove.bind(this), { passive: false });
    document.addEventListener('touchmove', this.move.bind(this), { passive: false });
    window.addEventListener('touchend', this.endMove.bind(this));
  }

  startMove(e) {
    e.preventDefault();

    // Tangkap koordinat awal
    const touch = e.touches ? e.touches[0] : e;
    this.startX = touch.clientX - this.currentX;
    this.startY = touch.clientY - this.currentY;

    this.holdingPaper = true;

    // Atur z-index agar elemen berada di atas
    this.paper.style.zIndex = highestZ;
    highestZ++;
  }

  move(e) {
    if (!this.holdingPaper) return;

    e.preventDefault();

    // Tangkap koordinat gerakan
    const touch = e.touches ? e.touches[0] : e;
    this.currentX = touch.clientX - this.startX;
    this.currentY = touch.clientY - this.startY;

    // Terapkan transformasi pada elemen
    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  endMove() {
    this.holdingPaper = false;
  }
}

// Inisialisasi untuk semua elemen dengan kelas .paper
document.querySelectorAll('.paper').forEach((paper) => {
  new Paper(paper);
});
