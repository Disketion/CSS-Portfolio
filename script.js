const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const mobileWarning = document.getElementById('mobileWarning');
const mobileWarningContinue = mobileWarning?.querySelector('.mobile-warning__continue');

if (mobileWarning && mobileWarningContinue) {
    mobileWarning.classList.remove('is-hidden');
    mobileWarning.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-warning-open');

    mobileWarningContinue.addEventListener('click', () => {
        mobileWarning.classList.add('is-hidden');
        mobileWarning.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-warning-open');
    });
}

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const opened = nav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(opened));
        menuToggle.textContent = opened ? "×" : "+";
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "+";
        });
    });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});

const modal = document.getElementById("nearbyModal");
const nearbyButtons = document.querySelectorAll(".nearby-open");
const closeButton = modal?.querySelector(".modal__close");
const backdrop = modal?.querySelector(".modal__backdrop");

function openNearbyModal() {
    if (!modal) {
        return;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeNearbyModal() {
    if (!modal) {
        return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

nearbyButtons.forEach((button) => {
    button.addEventListener("click", openNearbyModal);
});

closeButton?.addEventListener("click", closeNearbyModal);
backdrop?.addEventListener("click", closeNearbyModal);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) {
        closeNearbyModal();
    }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
