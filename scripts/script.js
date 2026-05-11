document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("theme-initializing");

    // Sidebar, Mode Toggle, and Navigation Code
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const mainContent = document.getElementById("main-content");
    const contentWrapper = document.querySelector(".content-wrapper");
    const modeToggleButton = document.getElementById("modeToggle");
    const themeTransitionDuration = 380;
    let themeTransitionTimer;
    let logoFadeTimer;

    // Function to Update Dynamic Width
    function updateDynamicWidth() {
        let windowWidth = window.innerWidth;
        if (windowWidth < 1300) {
            windowWidth = 1300;
        }
        let sidebarWidth = sidebar.classList.contains("hidden") ? 0 : 250; // Sidebar width when visible

        // Calculate section width dynamically
        let sectionWidth = Math.min(windowWidth - sidebarWidth - 100); // Max width cap

        // Update CSS variables for dynamic width
        document.documentElement.style.setProperty('--dynamic-sectionWidth', `${sectionWidth}px`);

        // Apply width to content-wrapper
        contentWrapper.style.width = `${sectionWidth}px`;
    }

    // Function to Toggle Sidebar
    function toggleSidebar() {
        sidebar.classList.toggle("hidden");
        mainContent.classList.toggle("expanded");

        // Delay width update slightly to match sidebar transition
        setTimeout(updateDynamicWidth, 10);
    }

    // Update Sidebar Button State
    function updateButtonState() {
        const isHidden = sidebar.classList.contains("hidden");
        sidebarToggle.innerHTML = isHidden ? "&#9654;" : "&#9664;"; // Change arrow direction
        sidebarToggle.style.left = isHidden ? "20px" : "270px"; // Adjust button position
    }

    // Event Listeners
    sidebarToggle.addEventListener("click", () => {
        toggleSidebar();
        updateButtonState();
    });

    window.addEventListener("resize", updateDynamicWidth);

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
    requestAnimationFrame(() => {
        document.body.classList.remove("theme-initializing");
    });

    modeToggleButton.addEventListener("click", () => {
        clearTimeout(themeTransitionTimer);
        clearTimeout(logoFadeTimer);

        document.body.classList.add("theme-transitioning", "theme-logo-fading");
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
        updateButtonText();

        logoFadeTimer = setTimeout(() => {
            updateCompanyLogos();
            document.body.classList.remove("theme-logo-fading");
        }, themeTransitionDuration / 2);

        themeTransitionTimer = setTimeout(() => {
            document.body.classList.remove("theme-transitioning");
        }, themeTransitionDuration + 80);

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light-mode") ? "light" : "dark"
        );
    });

    // Function to Update Company Logos Based on Theme
    function updateCompanyLogos() {
        const companyLogos = document.querySelectorAll(".company-logo");
        const certificationLogos = document.querySelectorAll(".certification-logo");
        const isLightMode = document.body.classList.contains("light-mode");

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

    // Screenshot Modal Functionality
    const screenshotModal = document.getElementById("screenshotModal");
    const screenshotModalImg = document.getElementById("screenshotModalImg");
    const screenshotModalClose = document.querySelector(".screenshot-modal-close");
    let screenshotModalCloseTimer;

    function openScreenshotModal(src) {
        clearTimeout(screenshotModalCloseTimer);
        screenshotModalImg.src = src;
        screenshotModal.classList.add("is-open");
    }

    function closeScreenshotModal() {
        screenshotModal.classList.remove("is-open");
        screenshotModalCloseTimer = setTimeout(() => {
            if (!screenshotModal.classList.contains("is-open")) {
                screenshotModalImg.src = "";
            }
        }, 240);
    }

    document.querySelectorAll(".screenshot-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const screenshotSrc = btn.getAttribute("data-screenshot");
            openScreenshotModal(screenshotSrc);
        });
    });

    screenshotModalImg.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    screenshotModalImg.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    screenshotModal.addEventListener("click", (e) => {
        if (e.target === screenshotModal || e.target === screenshotModalClose) {
            closeScreenshotModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && screenshotModal.classList.contains("is-open")) {
            closeScreenshotModal();
        }
    });

    // Contact form submission
    const contactForm = document.getElementById("contactForm");
    const contactFormStatus = document.getElementById("contactFormStatus");
    const contactSubmitButton = document.getElementById("contactSubmitButton");
    const contactAttachment = document.getElementById("contactAttachment");
    const contactAttachmentLabel = document.getElementById("contactAttachmentLabel");

    if (contactForm && contactFormStatus && contactSubmitButton) {
        const contactFields = {
            name: {
                input: document.getElementById("contactName"),
                error: document.getElementById("contactNameError"),
                message: "Please enter your name.",
                validate: (value) => value.trim().length > 0,
            },
            email: {
                input: document.getElementById("contactEmail"),
                error: document.getElementById("contactEmailError"),
                message: "Please enter a valid email address.",
                validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
            },
            message: {
                input: document.getElementById("contactMessage"),
                error: document.getElementById("contactMessageError"),
                message: "Please enter a message.",
                validate: (value) => value.trim().length > 0,
            },
        };

        function setFieldError(field, message) {
            const group = field.input.closest(".input-group");
            group.classList.toggle("has-error", Boolean(message));
            field.input.setAttribute("aria-invalid", Boolean(message).toString());
            field.error.textContent = message;
        }

        function validateContactForm() {
            let firstInvalidField = null;

            Object.values(contactFields).forEach((field) => {
                const isValid = field.validate(field.input.value);
                setFieldError(field, isValid ? "" : field.message);

                if (!isValid && !firstInvalidField) {
                    firstInvalidField = field.input;
                }
            });

            if (firstInvalidField) {
                firstInvalidField.focus();
                contactFormStatus.textContent = "Please fix the highlighted fields.";
                contactFormStatus.className = "form-status error";
                return false;
            }

            contactFormStatus.textContent = "";
            contactFormStatus.className = "form-status";
            return true;
        }

        Object.values(contactFields).forEach((field) => {
            field.input.addEventListener("input", () => {
                if (field.input.getAttribute("aria-invalid") === "true") {
                    const isValid = field.validate(field.input.value);
                    setFieldError(field, isValid ? "" : field.message);
                }
            });
        });

        if (contactAttachment && contactAttachmentLabel) {
            contactAttachment.addEventListener("change", () => {
                const selectedFile = contactAttachment.files[0];
                contactAttachmentLabel.textContent = selectedFile ? selectedFile.name : "Choose a file";
            });
        }

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!validateContactForm()) {
                return;
            }

            contactFormStatus.textContent = "Sending...";
            contactFormStatus.className = "form-status";
            contactSubmitButton.disabled = true;
            contactSubmitButton.textContent = "Sending...";

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Form submission failed");
                }

                contactForm.reset();
                Object.values(contactFields).forEach((field) => setFieldError(field, ""));
                if (contactAttachmentLabel) {
                    contactAttachmentLabel.textContent = "Choose a file";
                }
                contactFormStatus.textContent = "Thanks, your enquiry has been sent.";
                contactFormStatus.classList.add("success");
            } catch (error) {
                contactFormStatus.textContent = "Sorry, something went wrong. Please email me directly instead.";
                contactFormStatus.classList.add("error");
            } finally {
                contactSubmitButton.disabled = false;
                contactSubmitButton.textContent = "Send Message";
            }
        });
    }

    // Initial setup on page load
    updateButtonState();
    updateDynamicWidth();
});
