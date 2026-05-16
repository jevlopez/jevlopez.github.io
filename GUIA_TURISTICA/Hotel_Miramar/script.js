document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Menú Hamburguesa (Manipulación del DOM)
    const hamburgerButton = document.getElementById('hamburgerButton');
    const navbarMenu = document.getElementById('navbarMenu');

    const toggleMenu = () => {
        navbarMenu.classList.toggle('active');
        // Opcional: Cambiar el ícono de hamburguesa a una 'X'
        const icon = hamburgerButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    hamburgerButton.addEventListener('click', toggleMenu);

    // Ocultar el menú al hacer clic en un enlace (solo en móvil)
    navbarMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Validación de Formulario Robusta
    const form = document.getElementById('reservationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('form-success');

    // Función auxiliar para mostrar errores
    const showError = (input, message) => {
        const errorElement = document.getElementById(`error-${input.id}`);
        input.classList.add('input-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    };

    // Función auxiliar para limpiar errores
    const clearError = (input) => {
        const errorElement = document.getElementById(`error-${input.id}`);
        input.classList.remove('input-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    };

    // Expresión regular para validar email (robusta)
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validación de Nombre
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'El nombre es obligatorio.');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validación de Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'El correo electrónico es obligatorio.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Introduce un correo electrónico válido.');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validación de Mensaje
        if (messageInput.value.trim() === '' || messageInput.value.trim().length < 10) {
            showError(messageInput, 'El mensaje debe tener al menos 10 caracteres.');
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        if (isValid) {
            // Simular envío (En un proyecto real, aquí se usaría fetch o XMLHttpRequest)
            formSuccess.textContent = '¡Gracias por tu reserva! Te contactaremos pronto.';
            formSuccess.style.color = 'var(--color-secondary)';
            form.reset();
            
            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                formSuccess.textContent = '';
            }, 5000);
        }
    };

    form.addEventListener('submit', validateForm);
    
    // 3. Interacción Dinámica del DOM: Visor de Imágenes (Modal Lightbox)
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const serviceCards = document.querySelectorAll('.service-card');
    const closeBtn = document.querySelector('.close-button');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const imgCaption = card.getAttribute('data-caption');
            
            modal.style.display = "block";
            modalImg.src = imgSrc;
            captionText.innerHTML = imgCaption;
        });
    });

    // Cerrar el modal al hacer clic en la 'X'
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera de la imagen
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // 4. Establecer Año Actual en el Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});