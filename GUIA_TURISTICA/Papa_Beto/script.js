document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. INTERACCIÓN CON EL DOM: MENÚ HAMBURGUESA
    // ----------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Función para alternar el menú
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        const icon = hamburgerBtn.querySelector('i');
        // Cambiar el ícono de hamburguesa (bars) a cierre (times)
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Cerrar el menú al hacer clic en un enlace (útil en móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerrar si el menú está activo (modo móvil)
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ----------------------------------------------------
    // 2. VALIDACIÓN DE FORMULARIO ROBUSTA CON JAVASCRIPT
    // ----------------------------------------------------
    const form = document.getElementById('contacto-form');
    
    // Función para mostrar un mensaje de error específico
    const displayError = (input, message) => {
        const errorElement = document.getElementById(`error-${input.id}`);
        input.classList.add('invalid');
        errorElement.textContent = message;
    };

    // Función para limpiar errores
    const clearError = (input) => {
        const errorElement = document.getElementById(`error-${input.id}`);
        input.classList.remove('invalid');
        errorElement.textContent = '';
    };

    // Función de validación de email
    const isValidEmail = (email) => {
        // Regex simple para validar formato básico de email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(String(email).toLowerCase());
    };

    // Función principal de validación
    const validateForm = () => {
        let isValid = true;
        const successMessage = document.getElementById('form-success');
        successMessage.style.display = 'none';

        const fields = ['nombre', 'email', 'telefono', 'mensaje'];

        fields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            const value = input.value.trim();
            clearError(input);

            if (value === '') {
                displayError(input, `El campo ${fieldId.toUpperCase()} es obligatorio.`);
                isValid = false;
            } else if (fieldId === 'email' && !isValidEmail(value)) {
                displayError(input, 'Por favor, ingrese un formato de email válido.');
                isValid = false;
            }
        });

        return isValid;
    };

    // Event listener para el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el envío por defecto

        if (validateForm()) {
            // Simular el envío exitoso (aquí iría la lógica de envío a un servidor)
            const successMessage = document.getElementById('form-success');
            form.reset(); // Limpiar formulario
            
            successMessage.textContent = '¡Gracias! Su solicitud ha sido enviada con éxito. Pronto nos pondremos en contacto.';
            successMessage.style.display = 'block';

            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

        } else {
            console.log("Formulario tiene errores de validación.");
        }
    });
    
    // ----------------------------------------------------
    // 3. DINÁMICO: ACTUALIZAR AÑO EN EL FOOTER
    // ----------------------------------------------------
    const currentYear = new Date().getFullYear();
    const copyrightText = document.getElementById('copyright-text');
    copyrightText.textContent = `© Las Cabañas de Papa Beto | ${currentYear}.`;

});
