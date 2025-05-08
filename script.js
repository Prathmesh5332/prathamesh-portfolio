// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    } else {
        console.warn("AOS is not defined. Make sure AOS library is included.");
    }

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00d9ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.warn("particlesJS is not defined. Make sure particles.js library is included.");
    }

    // Initialize Vanilla Tilt for 3D hover effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    } else {
        console.warn("VanillaTilt is not defined. Make sure VanillaTilt library is included.");
    }

    // Preloader
    window.addEventListener("load", function() {
        const preloader = document.querySelector(".preloader");
        preloader.style.opacity = "0";
        setTimeout(function() {
            preloader.style.display = "none";
        }, 500);
    });

    // Custom cursor
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
    
    document.addEventListener("mousemove", function(e) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        // Remove the setTimeout to make the follower move immediately with the cursor
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
    });
    
    document.addEventListener("mousedown", function() {
        cursor.style.width = "8px";
        cursor.style.height = "8px";
        cursorFollower.style.width = "25px";
        cursorFollower.style.height = "25px";
    });
    
    document.addEventListener("mouseup", function() {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
        cursorFollower.style.width = "30px";
        cursorFollower.style.height = "30px";
    });

    // Add hover effect to links and buttons
    const links = document.querySelectorAll("a, button, .project-card, .skill-card, .edu-card");
    links.forEach(link => {
        link.addEventListener("mouseenter", function() {
            cursor.style.width = "0";
            cursor.style.height = "0";
            cursorFollower.style.width = "50px";
            cursorFollower.style.height = "50px";
            cursorFollower.style.borderColor = "#00d9ff";
        });
        
        link.addEventListener("mouseleave", function() {
            cursor.style.width = "10px";
            cursor.style.height = "10px";
            cursorFollower.style.width = "30px";
            cursorFollower.style.height = "30px";
            cursorFollower.style.borderColor = "#00d9ff";
        });
    });

    // Sticky header
    window.addEventListener("scroll", function() {
        const header = document.querySelector("header");
        const backToTop = document.querySelector(".back-to-top");
        
        if (window.scrollY > 50) {
            header.classList.add("sticky");
            backToTop.classList.add("active");
        } else {
            header.classList.remove("sticky");
            backToTop.classList.remove("active");
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    navToggle.addEventListener("click", function() {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");
        
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    // Typing effect for the home section
    const typingElement = document.querySelector(".typing");
    const typingTexts = ["AI/ML Enthusiast", "Python Developer", "Web Developer", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;
    
    function typeText() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingDelay = 500;
        }
        
        setTimeout(typeText, typingDelay);
    }
    
    // Start the typing effect
    setTimeout(typeText, 1000);

    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            this.classList.add("active");
            
            // Get filter value
            const filterValue = this.getAttribute("data-filter");
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 100);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // Project modal
    const projectLinks = document.querySelectorAll(".project-link");
    const projectModal = document.getElementById("projectModal");
    const closeModal = document.querySelector(".close-modal");
    const modalContents = document.querySelectorAll(".modal-project-content");
    
    projectLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get project ID
            const projectId = this.getAttribute("data-project");
            
            // Hide all modal contents
            modalContents.forEach(content => {
                content.classList.remove("active");
            });
            
            // Show selected project content
            document.getElementById(projectId + "-content").classList.add("active");
            
            // Show modal
            projectModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });
    
    // Close modal
    closeModal.addEventListener("click", function() {
        projectModal.classList.remove("active");
        document.body.style.overflow = "auto";
    });
    
    // Close modal when clicking outside
    window.addEventListener("click", function(e) {
        if (e.target === projectModal) {
            projectModal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // Contact form submission
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            
            // Simulate form submission (in a real project, you would send this to a server)
            formStatus.textContent = "Sending message...";
            formStatus.className = "form-status";
            formStatus.style.display = "block";
            
            setTimeout(function() {
                formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
                formStatus.className = "form-status success";
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    formStatus.style.display = "none";
                }, 5000);
            }, 1500);
        });
    }
});