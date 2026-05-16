document.addEventListener('DOMContentLoaded', () => {
    // ------------------- INTERACCIÓN 1: MENÚ HAMBURGUESA -------------------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinksList = navLinks.querySelectorAll('a');

    // Toggle para mostrar/ocultar el menú
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar el menú después de hacer clic en un enlace (en móvil)
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // ------------------- INTERACCIÓN 2: VALIDACIÓN DE FORMULARIO -------------------
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío por defecto
        
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];

        // Limpiar mensajes de error previos
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        successMessage.textContent = '';

        // Iterar sobre campos requeridos
        requiredFields.forEach(fieldName => {
            const input = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}Error`);

            if (input.value.trim() === '') {
                errorElement.textContent = `El campo ${fieldName === 'name' ? 'Nombre' : fieldName === 'email' ? 'Correo Electrónico' : 'Mensaje'} es obligatorio.`;
                isValid = false;
            }
        });

        // Validación de formato de correo electrónico
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple

        if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Por favor, ingrese un formato de correo electrónico válido.';
            isValid = false;
        }

        // Si es válido, simular el envío
        if (isValid) {
            successMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
            form.reset(); // Limpia el formulario
            
            // Opcional: Desactivar el mensaje de éxito después de unos segundos
            setTimeout(() => {
                successMessage.textContent = '';
            }, 5000);
        }
    });

    // ------------------- INTERACCIÓN 3: CONTADOR ANIMADO (Sección Nosotros) -------------------
    const counterElements = document.querySelectorAll('.stat-card h3 span');
    
    const animateCount = (element, target) => {
        let current = 0;
        const duration = 2000; // 2 segundos
        const stepTime = Math.abs(Math.floor(duration / target));

        const timer = setInterval(() => {
            current += 1;
            element.textContent = current;
            if (current >= target) {
                clearInterval(timer);
                element.textContent = target; // Asegura el valor final exacto
                
                // Si es el contador grande, añadir el formato
                if (target === 100000) {
                     element.textContent = '100,000';
                }
            }
        }, stepTime);
    };
    
    // Función para activar la animación cuando la sección es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.dataset.animated !== 'true') {
                counterElements.forEach(el => {
                    const target = parseInt(el.dataset.target);
                    animateCount(el, target);
                });
                // Marcar como animado para que no se repita
                entry.target.dataset.animated = 'true';
            }
        });
    }, {
        threshold: 0.5 // Se activa cuando el 50% de la sección es visible
    });

    const nosotrosSection = document.getElementById('nosotros');
    observer.observe(nosotrosSection);
});