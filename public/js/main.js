
document.addEventListener("DOMContentLoaded", () => {
  const originalMenuHTML = `<li data-section="about" data-description="Quién soy, enfoque y objetivos">> Sobre mí ➜</li><li data-section="projects" data-description="Listado de proyectos con submenú">> Proyectos ➜</li><li data-section="skills" data-description="Habilidades técnicas que domino">> Habilidades ➜</li><li data-section="experience" data-description="Mi recorrido y proyectos">> Experiencia ➜</li><li data-section="cv" data-description="Visualiza y descarga mi CV">> CV ➜</li><li data-section="contact" data-description="Formas de contacto">> Contacto ➜</li>`;
  const menuList = document.querySelector(".menu-list");
  const contentDisplay = document.getElementById("content-display");

  const contentMap = {
    about: `
      <h2>> Sobre mí</h2>
      <p>Desarrollador Full Stack formado en el bootcamp de Campuslands, con dominio de tecnologías como JavaScript, Node.js, Express, MongoDB, HTML y CSS. Combino habilidades de frontend y backend para construir aplicaciones completas, escalables y funcionales. Me destaco por mi capacidad de análisis, liderazgo, pensamiento lógico y adaptabilidad. Tengo especial interés en desarrollar soluciones que involucren la gestión eficiente de datos y una experiencia de usuario sólida. Aplico metodologías ágiles como SCRUM y buenas prácticas de control de versiones con Git y GitHub.</p>
    `,
    skills: `
      <h2>> Habilidades</h2>
      <ul>
        <li>JavaScript / Node.js</li>
        <li>Express / MongoDB</li>
        <li>Git / GitHub / SCRUM</li>
        <li>HTML / CSS / EJS</li>
      </ul>
    `,
    experience: `
      <h2>> Experiencia</h2>
      <p>Participación en proyectos académicos y personales. Desarrollo de APIs RESTful. Colaboración bajo metodologías ágiles.</p>
    `,
    cv: `
      <h2>> CV</h2>
      <p>Puedes ver y descargar mi CV <a href="./docs/Brian-CV.pdf" target="_blank">aquí</a>.</p>
    `,
    contact: `
      <h2>> Contacto</h2>
      <p>Email: brian.dev@mail.com</p>
      <p>LinkedIn: <a href="https://linkedin.com/in/tu-usuario" target="_blank">Mi perfil</a></p>
      <p>GitHub: <a href="https://github.com/tu-usuario" target="_blank">Mi repositorio</a></p>
    `
  };

  const proyectos = {
    portafix: {
      title: "PORTAFIX",
      description: "Aplicación CLI para freelancers desarrollada en Node.js. Permite gestionar clientes, propuestas, contratos, entregables y finanzas.",
      image: "./public/img/portafix.png"
    },
    pizza: {
      title: "Pizza y Punto",
      description: "Sistema de pedidos para pizzería en consola. Automatiza registro de pedidos, inventario y análisis de ventas con MongoDB.",
      image: "./public/img/pizza.png"
    },
    torre: {
      title: "La Torre de los Tres Caminos",
      description: "Juego de consola tipo RPG por turnos con selección de clases, estrategia y efectos visuales tipo terminal.",
      image: "./public/img/torre.png"
    },
    parqueaderos: {
      title: "Parqueaderos Multisede",
      description: "Sistema distribuido para gestionar parqueaderos, usuarios, zonas y suscripciones con MongoDB y trazabilidad total.",
      image: "./public/img/parqueaderos.png"
    }
  };

  function typeEffect(element, html, speed = 5) {
    element.innerHTML = "";
    let i = 0;
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const nodes = Array.from(temp.childNodes);

    function typeNode(nodeIndex = 0) {
      if (nodeIndex >= nodes.length) return;

      const node = nodes[nodeIndex];
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        let j = 0;
        const span = document.createElement("span");
        element.appendChild(span);
        const interval = setInterval(() => {
          if (j < text.length) {
            span.textContent += text[j++];
          } else {
            clearInterval(interval);
            typeNode(nodeIndex + 1);
          }
        }, speed);
      } else {
        const clone = node.cloneNode(false);
        element.appendChild(clone);
        if (node.childNodes.length > 0) {
          typeEffect(clone, node.innerHTML, speed);
          setTimeout(() => typeNode(nodeIndex + 1), node.textContent.length * speed + 10);
        } else {
          typeNode(nodeIndex + 1);
        }
      }
    }

    typeNode();
  }

  function showProjectsMenu() {
    menuList.innerHTML = `
      <li data-project="portafix">> PORTAFIX ➜</li>
      <li data-project="pizza">> Pizza y Punto ➜</li>
      <li data-project="torre">> La Torre de los Tres Caminos ➜</li>
      <li data-project="parqueaderos">> Parqueaderos Multisede ➜</li>
      <li data-section="main-menu">> Menu Inicial de Desarrollador <</li>
    `;

    menuList.querySelectorAll("li").forEach(item => {
      const project = item.dataset.project;
      const back = item.dataset.section;

      if (project) {
        item.addEventListener("click", () => {
          const proj = proyectos[project];
          const html = `
            <h2>> ${proj.title}</h2>
            <img src="${proj.image}" alt="${proj.title}" class="project-img" />
            <p>${proj.description}</p>
          `;
          typeEffect(contentDisplay, html);
        });
      }

      if (back === "main-menu") {
        item.addEventListener("click", () => {
          menuList.innerHTML = originalMenuHTML;
          attachMainMenuListeners();
          typeEffect(contentDisplay, contentMap["about"]);
        });
      }
    });

    // Mostrar primer proyecto por defecto
    const firstProj = proyectos["portafix"];
    typeEffect(contentDisplay, `
      <h2>> ${firstProj.title}</h2>
      <img src="${firstProj.image}" alt="${firstProj.title}" class="project-img" />
      <p>${firstProj.description}</p>
    `);
  }

  function attachMainMenuListeners() {
    menuList.querySelectorAll("li").forEach(item => {
      const section = item.dataset.section;
      if (section === "projects") {
        item.addEventListener("click", () => showProjectsMenu());
      } else {
        item.addEventListener("click", () => {
          typeEffect(contentDisplay, contentMap[section] || "<p>Contenido no disponible.</p>");
        });
      }
    });
  }
  const descriptionBox = document.querySelector(".menu-description");
  menuList.querySelectorAll("li").forEach(item => {
    item.addEventListener("mouseover", () => {
      const text = item.getAttribute("data-description") || "";
      descriptionBox.textContent = text;
    });
    item.addEventListener("mouseleave", () => {
      descriptionBox.textContent = "";
    });
  });

  // Restaurar vista inicial desde el logo
const logo = document.getElementById("logo-home");
if (logo) {
  logo.addEventListener("click", () => {
    menuList.innerHTML = originalMenuHTML;
    attachMainMenuListeners();
    typeEffect(contentDisplay, `
      <h2>> Perfil Como Desarrollador</h2>
      <img src="./public/img/foto-perfil.jpg" alt="Foto Brian" class="profile-pic" />
      <p>
        Desarrollador Backend Junior con formación en Node.js, Express y MongoDB.
        Me especializo en construir soluciones robustas enfocadas en el análisis,
        control y tratamiento de datos. Me destaco por mi pensamiento lógico,
        estructurado y enfocado en la integridad, seguridad y trazabilidad de la información.
        Disfruto optimizar procesos para facilitar la toma de decisiones a través de resultados,
        proyecciones y cálculos precisos para el usuario. Actualmente en formación como
        Desarrollador Full Stack con interés principal en el backend.
      </p>
    `);
  });
}

  attachMainMenuListeners();
});


// Restaurar vista inicial desde el logo
const logo = document.getElementById("logo-home");
if (logo) {
  logo.addEventListener("click", () => {
    menuList.innerHTML = originalMenuHTML;
    attachMainMenuListeners();
    typeEffect(contentDisplay, `
      <h2>> Perfil Como Desarrollador</h2>
      <img src="./public/img/foto-perfil.jpg" alt="Foto Brian" class="profile-pic" />
      <p>
        Desarrollador Backend Junior con formación en Node.js, Express y MongoDB.
        Me especializo en construir soluciones robustas enfocadas en el análisis,
        control y tratamiento de datos. Me destaco por mi pensamiento lógico,
        estructurado y enfocado en la integridad, seguridad y trazabilidad de la información.
        Disfruto optimizar procesos para facilitar la toma de decisiones a través de resultados,
        proyecciones y cálculos precisos para el usuario. Actualmente en formación como
        Desarrollador Full Stack con interés principal en el backend.
      </p>
    `);
  });
}
