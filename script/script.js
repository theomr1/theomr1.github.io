// ─── Scroll parallax ───
const blobs = document.querySelectorAll(".blob[data-speed]");

function updateBlobs(scrollY, mouseX, mouseY) {
    blobs.forEach((b, i) => {
        const sp = parseFloat(b.dataset.speed);
        const mx =
            mouseX !== null
                ? (mouseX / window.innerWidth - 0.5) * ((i % 3) + 1) * 10
                : 0;
        const my =
            mouseY !== null
                ? (mouseY / window.innerHeight - 0.5) * ((i % 3) + 1) * 10
                : 0;
        b.style.transform = `translateY(${
            scrollY * sp + my
        }px) translateX(${mx}px)`;
    });
}

let lastMX = null,
    lastMY = null;

window.addEventListener(
    "scroll",
    () => {
        updateBlobs(window.scrollY, lastMX, lastMY);
    },
    { passive: true }
);

document.addEventListener("mousemove", (e) => {
    lastMX = e.clientX;
    lastMY = e.clientY;
    updateBlobs(window.scrollY, lastMX, lastMY);
});

// ─── Reveal ───
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                io.unobserve(e.target);
            }
        });
    },
    { threshold: 0.1 }
);
reveals.forEach((el) => io.observe(el));
