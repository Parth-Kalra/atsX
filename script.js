
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .hero-content elements and .feature-card
    const animatedElements = document.querySelectorAll('.hero-content > *, .stat-item, .feature-card, .section-header, .demo-browser');

    animatedElements.forEach((el, index) => {
        // Add stagger delays based on index or position
        observer.observe(el);
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(5, 5, 16, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(5, 5, 16, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Simulated Typing Effect for Demo
    const demoCode = document.querySelector('.loading-ui');
    if (demoCode) {
        const text = "Analying Market Data...\nFetching Real-time Quotes...\nRunning AI Prediction Models...\n> Confidence: 98.5%\n> Trend: Bullish Reversal detected.";
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    demoCode.innerHTML += '<br>';
                } else {
                    demoCode.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing interaction when demo section is visible
        const demoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    demoObserver.disconnect();
                }
            });
        });

        const demoSection = document.querySelector('.demo-section');
        if (demoSection) {
            demoObserver.observe(demoSection);
        }
    }

    // Hero Terminal Animation
    const heroTerminal = document.querySelector('.terminal-text');
    if (heroTerminal) {
        const phrases = [
            "> INITIALIZING_MARKET_SCAN...",
            "> PATTERN_DETECTED: BULLISH_ENGULFING",
            "> RSI_DIVERGENCE: OVERSOLD (32.5)",
            "> VOLUME_SPIKE: +450% VS AVG",
            "> DETECTING_CANDLE: MORNING_DOJI_STAR",
            "> FIBONACCI_RETRACEMENT: 61.8% LEVEL",
            "> GOLDEN_CROSS: 50MA > 200MA ALERT",
            "> SIGNAL_CONFIDENCE: 98.7% [STRONG_BUY]"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeHero() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                heroTerminal.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTerminal.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 50;

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new phrase
            }

            setTimeout(typeHero, typeSpeed);
        }

        typeHero();
    }

    // Hero Chart Animation
    const chartContainer = document.getElementById('hero-chart');
    if (chartContainer) {
        // Chart Config
        let price = 100;
        const volatility = 12; // Increased from 2.5 for much taller candles

        // Scaling
        const minVal = 50;  // Widened range
        const maxVal = 150; // Widened range
        const chartHeight = 200; // Must match CSS height

        function getY(val) {
            // Map value to percentage of height (0 to 100)
            let pct = ((val - minVal) / (maxVal - minVal)) * 100;
            return Math.max(0, Math.min(100, pct)); // Clamp
        }

        function addCandle() {
            // 1. Generate OHLC Data
            const open = price;
            const change = (Math.random() - 0.5) * volatility;
            let close = open + change;

            // Random wicks
            let high = Math.max(open, close) + Math.random() * (volatility * 0.5);
            let low = Math.min(open, close) - Math.random() * (volatility * 0.5);

            price = close; // Set for next iteration

            // Keep price in bounds (mean reversion)
            if (price > 130) price -= 2;
            if (price < 70) price += 2;

            // 2. Create Elements
            const wrapper = document.createElement('div');
            wrapper.className = `candle-wrapper ${close >= open ? 'up-candle' : 'down-candle'}`;

            const body = document.createElement('div');
            body.className = 'candle-body';

            const wick = document.createElement('div');
            wick.className = 'candle-wick';

            // 3. Calculate Visual Geometry
            const topBody = Math.max(open, close);
            const bottomBody = Math.min(open, close);

            const bodyBottomPct = getY(bottomBody);
            const bodyHeightPct = getY(topBody) - bodyBottomPct;

            const wickBottomPct = getY(low);
            const wickHeightPct = getY(high) - wickBottomPct;

            // 4. Apply Styles
            body.style.bottom = `${bodyBottomPct}%`;
            body.style.height = `${Math.max(bodyHeightPct, 0.5)}%`; // Min height visible

            wick.style.bottom = `${wickBottomPct}%`;
            wick.style.height = `${wickHeightPct}%`;

            // Random Signal Generation (15% chance)
            if (Math.random() < 0.15) {
                const signal = document.createElement('div');
                const isBuy = Math.random() > 0.5;
                signal.className = `signal-badge ${isBuy ? 'buy' : 'sell'}`;
                signal.textContent = isBuy ? 'BUY' : 'SELL';
                wrapper.appendChild(signal);

                // Add AI Spark
                const spark = document.createElement('div');
                spark.className = 'ai-spark';
                // Inline SVG with Gradient
                spark.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#00f2ff" />
                                <stop offset="100%" style="stop-color:#00aaff" />
                            </linearGradient>
                        </defs>
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#sparkGradient)"/>
                    </svg>
                `;

                // Position above the candle body (using High or Close)
                // Use a slight offset above the highest point of the candle (wick top or body top)
                const visualTop = Math.max(getY(high), getY(topBody));
                spark.style.bottom = `${visualTop + 2}%`; // 2% clearance

                wrapper.appendChild(spark);
            }

            // 5. Append
            wrapper.appendChild(wick); // Wick behind body
            wrapper.appendChild(body);

            // Animate Entry
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'scale(0.8)';
            chartContainer.appendChild(wrapper);

            // Trigger reflow
            void wrapper.offsetWidth;

            wrapper.style.opacity = '1';
            wrapper.style.transform = 'scale(1)';

            // 6. Cleanup (Smooth Removal)
            if (chartContainer.children.length > 20) { // Keep count low for cleanliness
                const first = chartContainer.firstChild;
                if (first && !first.classList.contains('exiting')) {
                    first.classList.add('exiting');
                    // Actual remove after transition
                    // Actual remove after transition
                    setTimeout(() => {
                        if (first.parentNode === chartContainer) {
                            chartContainer.removeChild(first);
                        }
                    }, 2000); // Match CSS transition time exactly
                }
            }

            setTimeout(addCandle, 2000); // Sync new candle with scroll speed
        }

        // Initial population
        for (let i = 0; i < 15; i++) addCandle(); // Fewer initial candles
    }

    // Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');

            // Prevent scrolling on body when menu is open
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
