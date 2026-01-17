document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Print functionality
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Scroll Spying
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Spying using getBoundingClientRect for absolute viewport accuracy
    const highlightNavigation = () => {
        // Trigger line is at 30% of the viewport height
        const triggerLine = window.innerHeight * 0.3;

        let currentId = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // If the section's top is above the trigger line, AND its bottom is below the trigger line
            // it means the trigger line is currently INSIDE this section.
            if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentId && link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run on load

    // Smooth Scrolling for Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetHeader = document.querySelector(targetId);
            if (targetHeader) {
                targetHeader.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Resume interaction initialized.');
});
