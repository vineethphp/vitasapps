// Debug information
console.log('Script loaded at:', '2025-05-18 17:38:21');
console.log('User:', 'vineethphp');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

    // Mobile Navigation with debug
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!navToggle || !navLinks) {
        console.error('Navigation elements not found!');
        return;
    }

    // Toggle menu with fade animation and debug
    navToggle.addEventListener('click', function (e) {
        console.log('Menu toggle clicked');
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Debug state
        console.log('Menu state:', navLinks.classList.contains('active') ? 'open' : 'closed');
    });

    // Close menu when clicking links with debug
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Navigation link clicked:', link.getAttribute('href'));
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));

            if (!target) {
                console.error('Target section not found:', link.getAttribute('href'));
                return;
            }

            // First close the menu with animation
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');

            // Then scroll after menu closes
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                console.log('Scrolled to:', link.getAttribute('href'));
            }, 300);
        });
    });

    // Close menu when clicking outside with debug
    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            console.log('Clicked outside menu - closing');
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // JotForm integration with debug
    var ifr = document.getElementById("JotFormIframe");
    if (ifr) {
        console.log('JotForm iframe found');

        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div>
                <h3>Tack för ditt meddelande!</h3>
                <p>Vi återkommer till dig så snart som möjligt.</p>
            </div>
        `;
        ifr.parentElement.appendChild(successMessage);

        // Handle iframe events with debug
        window.addEventListener('message', function (e) {
            console.log('Received message from iframe:', e.data);

            if (typeof e.data === 'object') {
                // Handle height adjustments
                if (e.data.eventName === 'setHeight') {
                    console.log('Setting iframe height to:', e.data.height);
                    ifr.style.height = e.data.height + 'px';
                }

                // Handle form submission
                if (e.data.action === 'submission-successful' ||
                    (e.data.formID === '242456455915362' && e.data.success)) {
                    console.log('Form submitted successfully');
                    e.preventDefault();
                    successMessage.classList.add('active');
                    setTimeout(() => {
                        successMessage.classList.remove('active');
                    }, 5000);
                }
            }
        }, false);

        // Prevent form submission reload
        ifr.onload = function () {
            console.log('iframe loaded');
            try {
                const iframeDocument = ifr.contentDocument || ifr.contentWindow.document;
                const form = iframeDocument.querySelector('form');
                if (form) {
                    console.log('Form found in iframe');
                    form.setAttribute('target', '_self');
                    form.addEventListener('submit', function (e) {
                        console.log('Form submit intercepted');
                        e.preventDefault();
                        return false;
                    });
                }
            } catch (error) {
                console.log('Cannot access iframe content due to same-origin policy');
            }
        };
    } else {
        console.error('JotForm iframe not found!');
    }

    // Debug information
    console.log('Script initialization completed');
});
