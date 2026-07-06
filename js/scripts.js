import{
    db,
    collection,
    addDoc,
    serverTimestamp
}from"./firebase.js";

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});




const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
        navbar.style.background = "#0F172A";
    }
    else {
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
        navbar.style.background = "#0F172A";
    }

});




const revealElements = document.querySelectorAll(
    ".project-card, .skill-card, .info-card, .timeline-content, .contact-card"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all 0.7s ease";

    revealObserver.observe(element);

});



const form = document.querySelector(".contact-form");
const formMessage = document.getElementById("form-message");
const submitButton = form.querySelector("button");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            formMessage.className = "error";
            formMessage.textContent = "⚠ Please enter a valid email address.";

        return;
        }
        
        const message = form.querySelector("textarea").value.trim();

        if (!name || !email || !message) {
            formMessage.className = "error";
            formMessage.textContent =
             "Please fill in all the fields.";
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
            await addDoc(collection(db, "messages"), {

                name,
                email,
                message,
                createdAt: serverTimestamp()

            });

            formMessage.className = "success";
            formMessage.textContent =
               "Thank you! Your message has been sent successfully.";

            setTimeout(() => {
                formMessage.style.display = "none";
            }, 4000);

            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        } catch (error) {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
            console.error(error);
            formMessage.className = "error";
            formMessage.textContent =
              "Failed to send message. Please try again.";
        }

    });

}



const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

    if (mobileNav.classList.contains("active")) {
        menuToggle.innerHTML = "✕";
    } else {
        menuToggle.innerHTML = "☰";
    }

});

const mobileLinks = document.querySelectorAll("#nav-links a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");
        menuToggle.innerHTML = "☰";

    });

});