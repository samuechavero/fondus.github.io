# Guía de Integración para Backend PHP / Twig

Este paquete contiene la Landing Page interactiva de Fondus convertida **100% a archivos planos estándar (HTML5, CSS y JavaScript Vanilla)**, completamente desacoplada de React, Vite y Node.js.

---

## 1. Estructura de Archivos

```text
export-twig/
├── index.html          # Estructura HTML5 completa con CDN de Tailwind y clases utilitarias intactas
├── script.js           # Lógica interactiva en Vanilla JS (Wizard, modales, scroll lock, validación)
├── styles.css          # Estilos indispensables (fuente Poppins, animaciones y scrollbar personalizada)
└── public/             # Recursos estáticos (imágenes oficiales, logos, PDFs y video)
    ├── condiciones.pdf
    ├── titulo.pdf
    ├── rescate.pdf
    ├── sorteo.jpg
    ├── participaciondelosresultados.jpg
    ├── igj-logo.png
    ├── escudo-argentina.png
    ├── favicon.svg
    └── media/
        ├── fondus-logo.jpeg
        └── fondus-bg.mp4
```

---

## 2. Instrucciones para el Desarrollador de PHP / Twig

### Sin Entornos de Compilación
No se necesita ejecutar `npm`, `vite` ni ningún build tool en el servidor PHP. 
Tailwind CSS funciona en tiempo de ejecución a través del CDN oficial incluido en el `<head>`:
```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          fondusBlue: "#1d497f",
          fondusGreen: "#93c46d",
          fondusOrange: "#FF5900"
        }
      }
    }
  };
</script>
```

---

## 3. Modularización Recomendada en Twig

Podés partir `index.html` en plantillas modulares dentro de tu carpeta `templates/`:

### `templates/base.html.twig`
Estructura contenedora con el `<head>`, CDN de Tailwind, Lucide Icons, header dinámico, footer y scripts.

### Partials recomendados (`templates/partials/`):
- `hero.html.twig`: Portada inicial con título `con fondus es posible.`
- `plans.html.twig`: Grilla dinámica de planes. Podés iterar sobre tu arreglo de PHP:
  ```twig
  {% for plan in planes %}
    <!-- Tarjeta con {{ plan.capital }}, {{ plan.cuotas1a4 }}, {{ plan.cuotaDesde5 }} -->
  {% endfor %}
  ```
- `sofia.html.twig`: Burbuja conversacional con Sofía.
- `gamification.html.twig`: Caja de sorteo y número adjudicado.
- `user_data.html.twig`: **Paso 2: Completá tus datos** (Campos: NOMBRE, APELLIDO, DNI, FECHA DE NACIMIENTO, ESTADO CIVIL, PROVINCIA, LOCALIDAD, TELEFONO, EMAIL).
- `review_checkout.html.twig`: **Paso 3: Confirmación y Resumen** (Tarjeta "Plan elegido", textos legales, pasarela Naranja X y checkboxes de aceptación).
- `success.html.twig`: Pantalla final con los videos explicativos y de testimonios.
- `modals.html.twig`: Modal de Términos y Condiciones (con scroll obligatorio), visor de documentos con zoom y botón de arrepentimiento.

---

## 4. Lógica JavaScript Vanilla (`script.js`)

- **Navegación por Pasos (Wizard)**: La función `goToStep(stepNumber)` alterna las clases `hidden` y `block` sobre los contenedores (`step-hero`, `step-plans`, `step-sofia`, `step-gamification`, `step-user-data`, `step-review-checkout`, `step-success`).
- **Scroll Obligatorio en Términos**: Detecta cuando el usuario llega al final del contenedor (`scrollTop + clientHeight >= scrollHeight - 15`) para desbloquear el botón `Aceptar Términos`.
- **Validación de Tarjeta Naranja X**: Valida en tiempo real que el número empiece con `5895`.
- **Integración con Endpoints PHP**: Podés interceptar el envío del formulario en `initReviewCheckout` para hacer un `fetch(/api/adhesion, { method: POST, body: JSON.stringify(state) })` o configurar el `action` y `method="POST"` tradicional de PHP.
