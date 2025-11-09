// app.js
const scroll = new LocomotiveScroll({
  el: document.querySelector('#js-scroll'),
  smooth: true,
  smartphone: {
    smooth: true
  },
  tablet: {
    smooth: true
  }
});

// Traducciones completas
const translations = {
  en: {
    name: "Gonzalo López Luque",
    name_repeat: "Gonzalo López Luque",
    title: "Web Application Developer",
    title_repeat: "Web Application Developer",
    about_title: "About Me",
    about_p1: "Web Application Developer with experience in Java and markup languages such as HTML, CSS and JavaScript.",
    about_p2: "Also experienced with MariaDB and MySQL databases.",
    about_p3: "Team player and creative, available to work and eager to continue learning.",
    education_title: "Education",
    education_1: "- English, Cambridge B2",
    education_2: "- Degree in 3D Animation, Games and Interactive Environments",
    education_3: "- Degree in Web Application Development",
    skills_title: "Skills",
    skill_1: "- HTML",
    skill_2: "- CSS",
    skill_3: "- JavaScript",
    skill_4: "- Java",
    skill_5: "- MariaDB",
    experience_title: "Experience",
    exp_1: "Developer for 3 months on the game \"Chapatriste\" published on Steam",
    exp_2: "Development of the Regacom website",
    exp_3: "Independent game development for itch.io including \"The Right Amount\", \"One Coin Chaos\" and \"Tricky Tracky Road\"",
    phone: "Phone: 699 617 905"
  },
  es: {
    name: "Gonzalo López Luque",
    name_repeat: "Gonzalo López Luque",
    title: "Desarrollador de aplicaciones web",
    title_repeat: "Desarrollador de aplicaciones web",
    about_title: "Acerca de mi",
    about_p1: "Desarrollador de Aplicaciones Web con experiencia programando con Java y en lenguaje de marcas con HTML, CSS y JavaScript.",
    about_p2: "También manejo bases de datos con MariaDB y MySQL.",
    about_p3: "Trabajo en equipo y creativo, con disponibilidad para trabajar y seguir ampliando mi formación.",
    education_title: "Educación",
    education_1: "- Inglés con nivel de B2 por Cambridge",
    education_2: "- Grado de Animaciones 3D, Juegos y Entornos Interactivos",
    education_3: "- Grado de Desarrollo de Aplicaciones Web",
    skills_title: "Habilidades",
    skill_1: "- HTML",
    skill_2: "- CSS",
    skill_3: "- JavaScript",
    skill_4: "- Java",
    skill_5: "- MariaDB",
    experience_title: "Experiencia",
    exp_1: "Desarrollador por 3 meses en el videojuego “Chapatriste” publicado en la plataforma Steam",
    exp_2: "Desarrollo de la página web de Regacom",
    exp_3: "Desarrollo independiente de juegos para la plataforma itch.io entre los que se encuentran “The Right Amount”, “One Coin Chaos” y “Tricky Tracky Road”",
    phone: "Telefono: 699 617 905"
  }
};

// Aplica traducciones a todos los elementos con data-i18n
function applyTranslations(lang) {
  const elems = document.querySelectorAll('[data-i18n]');
  elems.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = (translations[lang] && translations[lang][key]) || null;
    if (value === null) {
      // No hay traducción: dejar texto original o vaciar si quieres
      return;
    }

    // Si el elemento es un contenedor con etiqueta UL/OL y la traducción es array,
    // podríamos crear LI; aquí tratamos strings simples
    // Usamos innerHTML para permitir saltos si el texto contiene <br> (usar con cuidado)
    el.innerHTML = value;
  });

  // Si LocomotiveScroll está inicializado, actualizar su layout
  try {
    if (scroll && typeof scroll.update === 'function') {
      // small delay to allow DOM repaint then update locomotive
      requestAnimationFrame(() => scroll.update());
    }
  } catch (e) {
    console.warn('Error al actualizar Locomotive Scroll:', e);
  }
}

// Controlador del selector + persistencia
const langSelect = document.getElementById('languageSwitcher');

function setLanguage(lang, save = true) {
  if (!translations[lang]) lang = 'es';
  applyTranslations(lang);
  if (save) localStorage.setItem('preferredLang', lang);
  if (langSelect) langSelect.value = lang;
}

// On load: lee preferencia y aplica
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('preferredLang') || 'es';
  if (langSelect) {
    langSelect.value = saved;
    langSelect.addEventListener('change', (e) => {
      const newLang = e.target.value;
      setLanguage(newLang);
    });
  }
  // Aplica idioma inicial
  setLanguage(saved, false);
});


