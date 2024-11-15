// Script sederhana untuk animasi scroll smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Fungsi untuk mengaktifkan animasi saat section masuk viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

// Menargetkan setiap section yang akan dianimasikan
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    observer.observe(section);
});
