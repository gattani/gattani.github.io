document.addEventListener('DOMContentLoaded', () => {

    // ── Footer year ───────────────────────────────────────────────
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();



    // ── Print button ──────────────────────────────────────────────
    const printBtn = document.getElementById('print-btn');
    if (printBtn) printBtn.addEventListener('click', () => window.print());

    // ── Timeline: extract start year → data-year attr ─────────────
    document.querySelectorAll('.timeline-item[data-date]').forEach(item => {
        const match = (item.getAttribute('data-date') || '').match(/\d{4}/);
        if (match) item.setAttribute('data-year', match[0]);
    });

    // ── Timeline accordion ────────────────────────────────────────
    document.querySelectorAll('.timeline-content').forEach(card => {
        card.addEventListener('click', () => {
            card.closest('.timeline-item').classList.toggle('is-expanded');
        });
    });

    // Open the current role by default
    const firstItem = document.querySelector('.timeline-item--current');
    if (firstItem) firstItem.classList.add('is-expanded');

    // ── Nav scroll-spy ────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Suppress scroll-spy briefly after a nav click so the
    // immediately-set active class isn't overridden mid-scroll.
    let suppressSpy = false;
    let suppressTimer = null;

    const setActive = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };

    const highlightNav = () => {
        if (suppressSpy) return;

        const trigger = window.innerHeight * 0.3;
        let activeId = '';

        sections.forEach(section => {
            const { top, bottom } = section.getBoundingClientRect();
            if (top <= trigger && bottom >= trigger) activeId = section.id;
        });

        // If we've scrolled to the very bottom, mark the last section active
        const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4;
        if (!activeId && atBottom) {
            activeId = sections[sections.length - 1].id;
        }

        if (activeId) setActive(activeId);
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // ── Smooth scroll — force active immediately on click ─────────
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const target   = document.getElementById(targetId);
            if (!target) return;

            // Immediately highlight the clicked link
            setActive(targetId);

            // Suppress scroll-spy during the smooth scroll (~700 ms)
            suppressSpy = true;
            clearTimeout(suppressTimer);
            suppressTimer = setTimeout(() => { suppressSpy = false; }, 800);

            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

});
