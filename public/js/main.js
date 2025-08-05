const menuItems = document.querySelectorAll(".menu-list li");

const descriptions = {
  about: " Conóceme como desarrollador: fortalezas, enfoque y valores.",
  projects: " Explora soluciones en consola, backend y datos.",
  skills: " Stack tecnológico, herramientas y buenas prácticas.",
  experience: " Experiencia académica, profesional y de proyectos.",
  cv: " Descarga y visualiza mi hoja de vida.",
  contact: " Formas para conectarte y trabajar juntos.",
};

function typeWriterFull(target, baseText, description, speed = 25) {
  let index = 0;
  target.innerText = baseText;

  const fullText = baseText + description;

  const interval = setInterval(() => {
    target.textContent += description.charAt(index);
    index++;
    if (index === description.length) clearInterval(interval);
  }, speed);

  // Guardar el intervalo para poder cancelarlo si se sale antes
  target.dataset.intervalId = interval;
}

menuItems.forEach(item => {
  const section = item.getAttribute("data-section");
  const baseText = item.textContent;

  item.addEventListener("mouseenter", () => {
    if (!descriptions[section]) return;
    clearInterval(item.dataset.intervalId); // evitar glitches
    typeWriterFull(item, baseText, descriptions[section]);
  });

  item.addEventListener("mouseleave", () => {
    clearInterval(item.dataset.intervalId);
    item.textContent = baseText;
  });
});
