# Brayan Ramírez — Portafolio de Product Designer

> 🚧 **Estado: en desarrollo.** La mayoría de las páginas están terminadas; faltan algunas secciones (ver [Estado del proyecto](#estado-del-proyecto)).

Sitio web de portafolio para **Brayan Ramírez**, Product & Content Designer. Es un **proyecto freelance remunerado**: Brayan hizo el diseño en Figma y yo, **Jonathan M. Ramírez**, me encargué de todo el desarrollo frontend, desde la maquetación hasta el responsive, las animaciones y la accesibilidad.

<!-- Agrega aquí una captura o GIF del sitio, por ejemplo:
![Vista previa del portafolio](docs/preview.png)
-->

🔗 **Demo:** [jonnschenk.github.io/Brayan](https://jonnschenk.github.io/Brayan/)

---

## Mi rol

| | |
|---|---|
| **Cliente** | Brayan Ramírez (Product Designer) |
| **Tipo** | Freelance, remunerado |
| **Diseño UI/UX** | Brayan Ramírez (Figma) |
| **Desarrollo frontend** | Jonathan M. Ramírez |

Mi trabajo consistió en convertir el diseño de Figma en un sitio fiel al original, funcional y responsive, **sin frameworks ni dependencias en runtime**.

## Tecnologías

- **HTML5** semántico
- **SCSS** con arquitectura modular (variables, mixins y parciales por página), metodología **BEM**
- **JavaScript vanilla**, con módulos encapsulados en IIFE
- Fuentes self-hosted en **WOFF2** con `preload`
- Imágenes optimizadas en **WebP**

## Características destacadas

- **Escalado fiel al diseño:** en desktop y tablet horizontal, el layout se escala de forma proporcional a partir del ancho de diseño de Figma (1382 px). Así se conserva la composición exacta del diseño en cualquier pantalla.
- **Responsive con varios breakpoints:** layouts propios para mobile, tablet y desktop. En tablet vertical, el home cambia a la versión mobile.
- **Carrusel 3D personalizado** en el home: rotación por niveles, autoplay, navegación con flechas y transiciones de etiqueta, hecho sin librerías.
- **Transiciones entre páginas** con fade-out, que respetan los clics modificados (Cmd/Ctrl + clic para abrir en otra pestaña).
- **Accesibilidad:**
  - atributos ARIA (`aria-expanded`, `aria-controls`, `aria-label`)
  - textos alternativos descriptivos
  - menú móvil accesible
  - soporte para `prefers-reduced-motion`
- **Design system en código:** tokens de color, tipografía y espaciado centralizados en `_variables.scss`.
- **Caso de estudio interactivo** del design system de Moffin.
- **CV descargable** en PDF desde el header.

## Estructura del proyecto

```
.
├── index.html              # Home con carrusel de secciones
├── pages/                  # Páginas secundarias
│   ├── about.html
│   ├── contact.html
│   ├── design.html
│   ├── moffin.html
│   ├── projects.html
│   ├── ecosystem.html
│   ├── research.html
│   └── impact.html
├── scss/
│   ├── main.scss           # Punto de entrada
│   ├── _variables.scss     # Design tokens (colores, fuentes, spacing, breakpoints)
│   ├── _mixins.scss        # Media queries y helpers
│   ├── _reset.scss
│   ├── _base.scss
│   ├── _components.scss
│   ├── _layout.scss
│   ├── _animations.scss
│   └── pages/              # Estilos por página
├── styles/                 # CSS compilado
├── scripts/
│   ├── main.js             # Escalado al viewport, transiciones y menú
│   ├── carousel.js         # Carrusel del home
│   └── about.js            # Interacciones de la página About
└── assets/                 # Fuentes, íconos, ilustraciones, imágenes y CV
```

## Cómo correrlo localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jonnschenk/Brayan.git
   cd Brayan
   ```
2. Abre `index.html` con un servidor local, por ejemplo la extensión **Live Server** de VS Code o:
   ```bash
   npx serve .
   ```
3. Para editar los estilos, compila el SCSS con [Dart Sass](https://sass-lang.com/dart-sass):
   ```bash
   sass --watch scss/main.scss styles/main.css
   ```

## Estado del proyecto

- [x] Home (header, hero animado, carrusel)
- [x] About me
- [x] Contact me
- [x] Design systems
- [x] Caso de estudio: Moffin
- [x] Responsive: desktop, tablet y mobile
- [x] Contenido en inglés y accesibilidad
- [ ] Web projects
- [ ] iOS & Android
- [ ] UX & Research
- [ ] Social Impact
- [x] Deploy en GitHub Pages

## Créditos

- **Diseño:** [Brayan Ramírez](https://www.linkedin.com/in/brayan-ram%C3%ADrez/)
- **Desarrollo:** Jonathan M. Ramírez

---

© 2026 Brayan Ramírez. El diseño y el contenido pertenecen al cliente. Este repositorio se comparte con su autorización como muestra de mi trabajo.
