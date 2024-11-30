let highestZ = 1;

document.querySelectorAll(".paper").forEach((paper) => {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  const startDrag = (e) => {
    e.preventDefault();

    const touch = e.type === "touchstart" ? e.touches[0] : e;
    startX = touch.clientX - currentX;
    startY = touch.clientY - currentY;
    isDragging = true;

    paper.style.zIndex = highestZ;
    highestZ++;
  };

  const onDrag = (e) => {
    if (!isDragging) return;

    const touch = e.type === "touchmove" ? e.touches[0] : e;
    currentX = touch.clientX - startX;
    currentY = touch.clientY - startY;

    paper.style.transform = `translate(${currentX}px, ${currentY}px)`;
  };

  const stopDrag = () => {
    isDragging = false;
  };

  // Event untuk desktop
  paper.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);

  // Event untuk perangkat sentuh
  paper.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("touchmove", onDrag, { passive: false });
  document.addEventListener("touchend", stopDrag);
});
