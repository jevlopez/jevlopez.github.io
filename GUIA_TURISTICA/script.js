// Script para la página principal de Guía Turística
// Mejoras interactivas y funcionalidades

document.addEventListener('DOMContentLoaded', function() {
    // Animación suave de carga
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        card.style.opacity = '0';
    });
});

// Animación de fade in para las tarjetas
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Efecto de hover adicional
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});
