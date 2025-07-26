// script.js
// Lógica de interacción para la landing page de Visas & Ciudadanías.

// Función para desplazarse suavemente a una sección específica.
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Configurar EmailJS con tu clave pública (reemplaza con tu propia clave)
  // Visita https://dashboard.emailjs.com para generar tu Public Key.
  const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';
  const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID_AQUI';
  const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';

  // Inicializa EmailJS solo si la clave está definida. Esto evita errores en local.
  if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY_AQUI') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Envío de correo usando EmailJS. Este ejemplo usa sendForm para tomar
    // automáticamente los valores del formulario.
    if (
      EMAILJS_PUBLIC_KEY === 'TU_PUBLIC_KEY_AQUI' ||
      EMAILJS_SERVICE_ID === 'TU_SERVICE_ID_AQUI' ||
      EMAILJS_TEMPLATE_ID === 'TU_TEMPLATE_ID_AQUI'
    ) {
      alert(
        'EmailJS no está configurado. Reemplazá las claves en script.js para activar el envío de correos.'
      );
      return;
    }
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        alert('¡Mensaje enviado! Nos pondremos en contacto a la brevedad.');
        contactForm.reset();
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
        alert('Ocurrió un problema al enviar el mensaje.');
      });
  });

  // Manejo del menú móvil
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Manejo de pagos
  const payButton = document.getElementById('payButton');
  const exclusiveContent = document.getElementById('exclusiveContent');
  const exclusiveLink = document.getElementById('exclusiveLink');

  // Define tu clave pública de Stripe y la URL de pago (Payment Link) aquí.
  // La forma más sencilla en un sitio estático es crear un Payment Link desde tu
  // panel de Stripe y redireccionar al usuario a esa URL. Stripe indica que los
  // links de pago no requieren código y se pueden compartir directamente【56384244608191†L314-L323】.
  const STRIPE_PUBLIC_KEY = 'pk_test_TU_PUBLIC_KEY';
  const STRIPE_PAYMENT_URL = 'https://buy.stripe.com/test_YOUR_PAYMENT_LINK';

  // Manejador del botón de pago
  payButton.addEventListener('click', () => {
    if (STRIPE_PAYMENT_URL.includes('YOUR_PAYMENT_LINK')) {
      alert(
        'Debe configurar STRIPE_PAYMENT_URL en script.js con su propio Payment Link de Stripe para activar los pagos.'
      );
      return;
    }
    // Al usar Payment Links de Stripe, se realiza una redirección a la página de pago
    // que Stripe genera automáticamente. Una vez completado el pago, configure la
    // redirección de éxito en el dashboard de Stripe hacia una URL en su dominio
    // (por ejemplo, /success.html) donde puede mostrar el contenido exclusivo y
    // activar el envío de correos. Stripe Payment Links no requiere código en el
    // cliente y soporta más de 20 métodos de pago【56384244608191†L386-L401】.
    window.location.href = STRIPE_PAYMENT_URL;
  });

  // Mostrar contenido exclusivo si se detecta un indicador en localStorage.
  // Esto sirve como simulación de un “login visual” sin autenticación real.
  const hasPaid = localStorage.getItem('hasPaid');
  if (hasPaid === 'true') {
    showExclusiveContent();
  }

  // También detecta si la URL contiene un parámetro ?paid=success. Esto permite que,
  // después de volver desde el checkout de Stripe (configurando la URL de éxito),
  // se marque que el usuario ha pagado y se muestre el contenido exclusivo.
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('paid') === 'success') {
    localStorage.setItem('hasPaid', 'true');
    showExclusiveContent();
  }

  function showExclusiveContent() {
    exclusiveContent.classList.remove('hidden');
    // Enlace a tu recurso exclusivo (por ejemplo, Google Drive o PDF). Debes
    // reemplazar esto con la URL real que deseas enviar al cliente. Alternativamente,
    // se puede enviar por correo tras el pago mediante EmailJS.
    exclusiveLink.href = 'https://ejemplo.com/tu-guia.pdf';
  }
});