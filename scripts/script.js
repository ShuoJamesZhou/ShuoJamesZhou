document.addEventListener("DOMContentLoaded", () => {
    // Sidebar, Mode Toggle, and Navigation Code
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const mainContent = document.getElementById("main-content");
    const modeToggleButton = document.getElementById("modeToggle");

    // Update toggle button text and position
    const updateButtonState = () => {
        const isHidden = sidebar.classList.contains("hidden");
        sidebarToggle.innerHTML = isHidden ? "&#9654;" : "&#9664;";
        sidebarToggle.style.left = isHidden ? "20px" : "270px";
    };

    updateButtonState();

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        mainContent.classList.toggle("expanded");
        setTimeout(updateButtonState, 0);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: "smooth",
            });
        });
    });

    // Dark/Light Mode Toggle
    const updateButtonText = () => {
        modeToggleButton.textContent = document.body.classList.contains("light-mode")
            ? "Toggle Dark Mode"
            : "Toggle Light Mode";
    };

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.add("dark-mode");
    }
    updateCompanyLogos();
    updateButtonText();

    modeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
        updateButtonText();
        updateCompanyLogos();
        localStorage.setItem(
            "theme",
            document.body.classList.contains("light-mode") ? "light" : "dark"
        );
    });

    // Update company logos for theme switching
    function updateCompanyLogos() {
        const companyLogos = document.querySelectorAll(".company-logo");
        const certificationLogos = document.querySelectorAll(".certification-logo");
        const isLightMode = document.body.classList.contains("light-mode");

        document.body.style.backgroundColor = isLightMode ? "#e8dddd" : "#121212";
        companyLogos.forEach((companyLogo) => {
            const newSrc = isLightMode
                ? companyLogo.getAttribute("data-light")
                : companyLogo.getAttribute("data-dark");
            companyLogo.setAttribute("src", newSrc);
        });

        certificationLogos.forEach((certificationLogo) => {
            const newSrc = isLightMode
                ? certificationLogo.getAttribute("data-light")
                : certificationLogo.getAttribute("data-dark");
            certificationLogo.setAttribute("src", newSrc);
        });
    }

    // Fade-in effect on scroll
    const sections = document.querySelectorAll("section");
    const fadeInOnScroll = () => {
        const windowHeight = window.innerHeight;
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top < windowHeight - 100) {
                section.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", fadeInOnScroll);
    window.addEventListener("load", fadeInOnScroll);

    // Sidebar navigation hover styling
    document.querySelectorAll(".sidebar ul li").forEach((item) => {
        item.addEventListener("mouseover", () => {
            item.classList.add("hover");
        });
        item.addEventListener("mouseout", () => {
            item.classList.remove("hover");
        });
    });

    // ------------------------------------------------------------------
    // Unified Screenshot Modal Functionality
    // ------------------------------------------------------------------
    const screenshotModal = document.getElementById("screenshotModal");
    const screenshotModalImg = document.getElementById("screenshotModalImg");
    const screenshotModalClose = document.querySelector(".screenshot-modal-close");

    // Open modal when a screenshot button is clicked
    document.querySelectorAll(".screenshot-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const screenshotSrc = btn.getAttribute("data-screenshot");
            screenshotModalImg.src = screenshotSrc;
            screenshotModal.style.display = "flex";
        });
    });

    // Close modal when clicking the close button or outside the modal content
    screenshotModal.addEventListener("click", (e) => {
        if (e.target === screenshotModal || e.target === screenshotModalClose) {
            screenshotModal.style.display = "none";
        }
    });

    // Close modal on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            screenshotModal.style.display = "none";
        }
    });
});
