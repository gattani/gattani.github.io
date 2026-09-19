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

    // ── Timeline accordion & a11y ─────────────────────────────────
    const toggleAllBtn = document.getElementById('toggle-all-exp');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const updateToggleAllButtonState = () => {
        if (!toggleAllBtn || timelineItems.length === 0) return;
        const allExpanded = Array.from(timelineItems).every(item => item.classList.contains('is-expanded'));
        const toggleText = toggleAllBtn.querySelector('.toggle-text');
        const icon = toggleAllBtn.querySelector('i');

        toggleAllBtn.setAttribute('aria-expanded', allExpanded ? 'true' : 'false');
        if (toggleText) {
            toggleText.textContent = allExpanded ? 'Collapse All' : 'Expand All';
        }
        if (icon) {
            icon.className = allExpanded ? 'fas fa-compress-alt' : 'fas fa-layer-group';
        }
    };

    const toggleCard = (card) => {
        const item = card.closest('.timeline-item');
        if (!item) return;
        const isExpanded = item.classList.toggle('is-expanded');
        card.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        updateToggleAllButtonState();
    };

    document.querySelectorAll('.timeline-content').forEach(card => {
        card.addEventListener('click', () => toggleCard(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(card);
            }
        });
    });

    // Open current role by default and sync accessibility attribute
    const firstItem = document.querySelector('.timeline-item--current');
    if (firstItem) {
        firstItem.classList.add('is-expanded');
        const firstCard = firstItem.querySelector('.timeline-content');
        if (firstCard) firstCard.setAttribute('aria-expanded', 'true');
    }
    updateToggleAllButtonState();

    if (toggleAllBtn) {
        toggleAllBtn.addEventListener('click', () => {
            const allExpanded = Array.from(timelineItems).every(item => item.classList.contains('is-expanded'));
            const targetState = !allExpanded;
            timelineItems.forEach(item => {
                item.classList.toggle('is-expanded', targetState);
                const card = item.querySelector('.timeline-content');
                if (card) card.setAttribute('aria-expanded', targetState ? 'true' : 'false');
            });
            updateToggleAllButtonState();
        });
    }

    // ── Nav scroll-spy ────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Suppress scroll-spy briefly after a nav click so the
    // immediately-set active class isn't overridden mid-scroll.
    let suppressSpy = false;
    let suppressTimer = null;

    const setActive = (id) => {
        navLinks.forEach(link => {
            const rawHref = link.getAttribute('href') || '';
            link.classList.toggle('active', rawHref.includes(`#${id}`));
        });
    };

    const highlightNav = () => {
        if (suppressSpy || sections.length === 0) return;

        const trigger = window.innerHeight * 0.3;
        let activeId = '';

        sections.forEach(section => {
            const { top, bottom } = section.getBoundingClientRect();
            if (top <= trigger && bottom >= trigger) activeId = section.id;
        });

        // If we've scrolled to the very bottom, mark the last section active
        const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4;
        if (!activeId && atBottom && sections.length > 0) {
            activeId = sections[sections.length - 1].id;
        }

        if (activeId) setActive(activeId);
    };

    if (sections.length > 0) {
        window.addEventListener('scroll', highlightNav, { passive: true });
        highlightNav();
    }

    // ── Smooth scroll — only intercept local hash targets on current page ──
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const rawHref = link.getAttribute('href') || '';
            const hashIndex = rawHref.indexOf('#');
            if (hashIndex === -1) {
                // Standard page link (e.g., /blog/) — allow normal navigation
                return;
            }

            const targetId = rawHref.slice(hashIndex + 1);
            const target = document.getElementById(targetId);
            if (!target) {
                // Target is on another page (e.g., from /blog/ navigating back to /#experience)
                // Let browser handle navigation naturally
                return;
            }

            // Local section target exists on this page: smooth scroll
            e.preventDefault();
            setActive(targetId);

            suppressSpy = true;
            clearTimeout(suppressTimer);
            suppressTimer = setTimeout(() => { suppressSpy = false; }, 800);

            target.scrollIntoView({ behavior: 'smooth' });
            if (history.pushState) {
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

});
