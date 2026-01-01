// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav ul');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Also close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !event.target.closest('nav') && 
            !event.target.closest('.mobile-toggle')) {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission - check for success query parameter
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Check for form_submitted query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form_submitted') === 'true') {
        if (contactForm) {
            contactForm.style.display = 'none';
        }
        if (successMessage) {
            successMessage.style.display = 'block';
        }
        
        // Clean up URL by removing query parameter (preserve hash if present)
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
        
        // Scroll to success message
        if (successMessage) {
            setTimeout(() => {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
    
    // Animations for elements on scroll
    const animateElements = document.querySelectorAll('.expertise-item, .service-card, .llc-service-item, .contact-item');
    
    const checkIfInView = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.85) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Testimonials Configuration
    const testimonials = [
        {
            name: "Rob B.",
            text: "I'm pleased with the exceptional service provided by Deepaji. She is incredibly quick, thorough, and provides expert tax advice with an honesty that's truly refreshing. Whether it's tackling complex financial matters or ensuring every detail is accounted for, her professionalism and expertise shine through. I highly recommend her to anyone in need of trustworthy and efficient tax guidance!",
            rating: 5
        },
        {
            name: "Laxmi B.",
            text: "I had an outstanding experience working with Deepa as my CPA this year. She managed every aspect of my tax filing with precision and professionalism. Her proactive communication and attention to detail made the process seamless. Deepa was always patient and clear in explaining complex financial matters. Thanks to her, everything was submitted accurately and ahead of schedule. I highly recommend Deepa to anyone looking for expert and dependable CPA services.",
            rating: 5
        },
        {
            name: "Keyur P.",
            text: "Deepa Atal was a true professional from start to finish. She made the entire tax filing process smooth, stress-free, and incredibly efficient. Deepa took the time to understand my situation, answered all my questions with patience, and provided clear guidance throughout. Her attention to detail and thoroughness gave me complete confidence in her work. I truly appreciated how responsive and organized she was—it made all the difference. I highly recommend Deepa to anyone looking for reliable, knowledgeable, and friendly tax assistance!",
            rating: 5
        },
        {
            name: "Josh N.",
            text: "Deepa is very tax professional who is very keen in her subject and provides genuine answers to the tax complexities. She helped me solve the complex tax situation I was into with the best of her skills and knowledge of the subject matter. I would 100 percent recommend her for the job involving Rentals, Stock options and capital gains",
            rating: 5
        },
        {
            name: "Prakash D.",
            text: "I have never been more impressed with any CPA than I am with Deepa Atal! She took the time to understand my unique tax situation, identified areas of savings that I wasn't aware of, and delivered results far beyond what I expected. Her communication skills are top-notch, and she made the entire process of tax preparation seamless and stress-free. If you are in need of a trustworthy and knowledgeable CPA, look no further than Deepa Atal.",
            rating: 5
        },
        {
            name: "James D.",
            text: "I have had the chance to collaborate with Deepa Atal (CPA) as my tax consultant, and it was a great experience. Her tax expertise and knowledge are excellent. Deepa, who is highly certified and patient, makes it difficult to elucidate unclear, complicated terms by interpreting them in the clearest, simplest way possible. She was able to help me with my W2, ESPP, and RSU tax issues along with my short rental (short and long-term properties). I've been telling everybody about it. She's one of the most competent and professional people in her field! I highly recommend Deepa for any tax and LLC structure setup-related issues.",
            rating: 5
        },
        {
            name: "Soham Daga",
            text: "Deepa Atal CPA did an amazing and thorough job while at the same time being quick. As a student with little idea about tax filing, I found her work to be really helpful and it made the whole process super easy. I would definitely recommend!",
            rating: 5
        },
        {
            name: "Mukul Kant",
            text: "I used services from Deepa for filing multiple states taxs and I must say that she is very thorough and diligently in her work.",
            rating: 5
        },
        {
            name: "Sanjiv Kaushik",
            title: "Local Guide",
            text: "A very diligent and sincere CPA service",
            rating: 5
        }
    ];

    // Render Testimonials
    const track = document.querySelector('.carousel-track');
    const trackContainer = document.querySelector('.carousel-track-container');
    const dotsNav = document.querySelector('.carousel-nav');

    if (track && dotsNav && testimonials.length > 0) {
        // Clear existing content just in case
        track.innerHTML = '';
        dotsNav.innerHTML = '';

        testimonials.forEach((testimonial, index) => {
            // Create Slide
            const slide = document.createElement('li');
            slide.classList.add('testimonial-slide');
            if (index === 0) slide.classList.add('current-slide');

            // Generate Stars HTML
            let starsHtml = '';
            for (let i = 0; i < testimonial.rating; i++) {
                starsHtml += '<i class="fas fa-star"></i>';
            }
            // Add empty stars if rating < 5
            for (let i = testimonial.rating; i < 5; i++) {
                starsHtml += '<i class="far fa-star"></i>';
            }

            const titleHtml = testimonial.title ? `<span>${testimonial.title}</span>` : '';

            slide.innerHTML = `
                <div class="testimonial-card">
                    <div class="stars">
                        ${starsHtml}
                    </div>
                    <p class="review-text">"${testimonial.text}"</p>
                    <div class="client-info">
                        <h4>${testimonial.name}</h4>
                        ${titleHtml}
                    </div>
                </div>
            `;
            track.appendChild(slide);

            // Create Dot
            const dot = document.createElement('button');
            dot.classList.add('carousel-indicator');
            if (index === 0) dot.classList.add('current-slide');
            dotsNav.appendChild(dot);
        });

        // Initialize Carousel Logic
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const dots = Array.from(dotsNav.children);
        
        let currentSlideIndex = 0;
        
        // Update height of container
        const updateHeight = (index) => {
            const currentSlide = slides[index];
            const slideHeight = currentSlide.getBoundingClientRect().height;
            trackContainer.style.height = slideHeight + 'px';
        }

        // Initialize height
        // Wait for a brief moment for rendering to complete or use setTimeout
        setTimeout(() => {
            updateHeight(0);
        }, 100);

        // Update height on window resize
        window.addEventListener('resize', () => {
            updateHeight(currentSlideIndex);
        });
        
        // Function to move to slide
        const moveToSlide = (index) => {
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            
            // Update active classes
            const currentSlide = track.querySelector('.current-slide');
            const targetSlide = slides[index];
            
            if (currentSlide) {
                currentSlide.classList.remove('current-slide');
            }
            targetSlide.classList.add('current-slide');
            
            // Update dots
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetDot = dots[index];
            
            if (currentDot) {
                currentDot.classList.remove('current-slide');
            }
            targetDot.classList.add('current-slide');
            
            currentSlideIndex = index;
            
            // Update height for the new slide
            updateHeight(index);
        };
        
        // Next Button
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const nextIndex = (currentSlideIndex + 1) % slides.length;
                moveToSlide(nextIndex);
            });
        }
        
        // Prev Button
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
                moveToSlide(prevIndex);
            });
        }
        
        // Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
        });
    }
}); 

// Back to Top Button
const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
