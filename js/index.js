function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    var menuIcon = document.querySelector(".menu-icon");
    if (navLinks.style.maxHeight) {
        navLinks.style.maxHeight = null;
        menuIcon.classList.remove("change");
    } else {
        navLinks.style.maxHeight = navLinks.scrollHeight + "px";
        menuIcon.classList.add("change");
    }
}

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    var navLinks = document.getElementById("navLinks");
    var menuIcon = document.querySelector(".menu-icon");
    navLinks.style.maxHeight = null;
    menuIcon.classList.remove("change");
}

document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var sectionId = this.getAttribute('href').substring(1);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        showSection(sectionId);
    });
});

window.onclick = function(event) {
    var navLinks = document.getElementById("navLinks");
    var menuIcon = document.querySelector(".menu-icon");
    if (!event.target.matches('.menu-icon') && navLinks.style.maxHeight) {
        navLinks.style.maxHeight = null;
        menuIcon.classList.remove("change");
    }
}

// Add mouse move effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    overlay.style.background = `radial-gradient(
      circle at ${mouseX * 100}% ${mouseY * 100}%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.16) 30%,
      transparent 70%
  )`;
});