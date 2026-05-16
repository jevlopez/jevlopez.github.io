document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Requisito 2: Manipulación del DOM (Menú Hamburguesa y Scroll)
    // ----------------------------------------------------

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-links a');

    // 1. Manejo del menú hamburguesa
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('open');
    });

    // Cierra el menú al hacer clic en un enlace (para móviles)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            }
        });
    });

    // 2. Cambio de estilo de la Navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Actualizar año en el Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();


    // ----------------------------------------------------
    // Requisito 3: Validación de Formularios con JavaScript
    // ----------------------------------------------------

    const form = document.getElementById('reservation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');
    const successMessage = document.getElementById('form-success-message');

    // Función principal de validación
    const validateForm = (event) => {
        let isValid = true;
        
        // Limpiar mensajes de error previos
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));

        // Validar Nombre (No vacío y mínimo 3 caracteres)
        if (!validateRequired(nameInput, 'El nombre es obligatorio.') || nameInput.value.trim().length < 3) {
            displayError(nameInput, 'Introduce un nombre válido (mínimo 3 caracteres).');
            isValid = false;
        }

        // Validar Email (No vacío y formato de email)
        if (!validateRequired(emailInput, 'El correo electrónico es obligatorio.') || !validateEmail(emailInput)) {
            displayError(emailInput, 'Introduce un formato de correo electrónico válido.');
            isValid = false;
        }

        // Validar Teléfono (No vacío y formato básico de 7 a 15 dígitos)
        if (!validateRequired(phoneInput, 'El teléfono es obligatorio.') || !validatePhone(phoneInput)) {
            displayError(phoneInput, 'Introduce un número de teléfono válido (7-15 dígitos).');
            isValid = false;
        }

        // Validar Fecha y Hora (No vacío y debe ser una fecha futura)
        if (!validateRequired(dateInput, 'La fecha y hora de reserva son obligatorias.') || !validateFutureDate(dateInput)) {
            displayError(dateInput, 'La reserva debe ser para una fecha y hora futura.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Detener el envío si hay errores
            successMessage.style.display = 'none';
        } else {
            // Si es válido, simular el envío
            event.preventDefault(); 
            form.reset();
            successMessage.textContent = '¡Tu reserva ha sido confirmada con éxito! Nos pondremos en contacto pronto.';
            successMessage.style.display = 'block';
            
            // Opcional: Ocultar mensaje después de unos segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    };

    // Función para mostrar errores
    const displayError = (inputElement, message) => {
        const formGroup = inputElement.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorElement.textContent = message;
    };

    // Validadores específicos
    const validateRequired = (input, errorMessage) => {
        if (input.value.trim() === '') {
            displayError(input, errorMessage);
            return false;
        }
        return true;
    };

    const validateEmail = (input) => {
        // Regex simple para email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input.value.trim());
    };

    const validatePhone = (input) => {
        // Regex para 7 a 15 dígitos, opcionalmente con espacios o guiones
        const phoneRegex = /^\+?[\d\s-]{7,15}$/; 
        return phoneRegex.test(input.value.trim());
    };

    const validateFutureDate = (input) => {
        const inputDate = new Date(input.value);
        const now = new Date();
        return inputDate > now;
    };

    // Event listener para el submit del formulario
    form.addEventListener('submit', validateForm);

    // Event listeners para validación en tiempo real (al perder el foco)
    [nameInput, emailInput, phoneInput, dateInput].forEach(input => {
        input.addEventListener('blur', (e) => {
            // Volver a validar solo el campo actual para feedback
            validateForm({ preventDefault: () => {} });
        });
    });
});