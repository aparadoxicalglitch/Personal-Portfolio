// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const htmlElement = document.documentElement;

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Check for saved theme preference or use light theme as default
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeToggleIcon(savedTheme);

// Function to update theme toggle icon
function updateThemeToggleIcon(theme) {
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';
    themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    themeToggleMobile.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
}

$(document).ready(function() {
    // Sticky header and active section update
    $(window).scroll(function() {
        $(".header-area").toggleClass("sticky", $(this).scrollTop() > 1);
        updateActiveSection();
    });

    // Smooth scrolling for navigation links
    $(".header ul li a").click(function(e) {
        e.preventDefault();
        const target = $(this).attr("href");
        
        if ($(target).hasClass("active-section")) return;

        const scrollTo = target === "#home" ? 0 : $(target).offset().top - 40;
        $("html, body").animate({ scrollTop: scrollTo }, 500);

        $(".header ul li a").removeClass("active");
        $(this).addClass("active");
    });

    // Initial content revealing
    ScrollReveal({
        distance: "100px",
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education, .skills-title", {
        origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship, .skills", {
        origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
        origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
        origin: "bottom"
    });

    // Contact form submission to Google Sheet
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
    const form = document.forms['submitToGoogleSheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "Message sent successfully";
                setTimeout(() => msg.innerHTML = "", 5000);
                form.reset();
            })
            .catch(error => console.error('Error!', error.message));
    });
});

// Function to update active section in the header
function updateActiveSection() {
    const scrollPosition = $(window).scrollTop();

    if (scrollPosition === 0) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#home']").addClass("active");
        return;
    }

    $("section").each(function() {
        const target = $(this).attr("id");
        const offset = $(this).offset().top;
        const height = $(this).outerHeight();

        if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
            $(".header ul li a").removeClass("active");
            $(".header ul li a[href='#" + target + "']").addClass("active");
        }
    });
}