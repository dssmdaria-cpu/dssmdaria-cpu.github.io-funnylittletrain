// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced header scroll effect with smooth transitions
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 8px 32px rgba(108, 92, 231, 0.15)';
        header.style.borderBottom = '1px solid rgba(108, 92, 231, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 30px rgba(108, 92, 231, 0.1)';
        header.style.borderBottom = '1px solid rgba(108, 92, 231, 0.1)';
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple form validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#FF6B6B';
                field.style.backgroundColor = '#ffebee';
            } else {
                field.style.borderColor = '#eee';
                field.style.backgroundColor = 'white';
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            this.reset();
        } else {
            showNotification('Пожалуйста, заполните все обязательные поля.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            padding: 20px;
            max-width: 400px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #4ECDC4;
        }
        
        .notification-error {
            border-left: 4px solid #FF6B6B;
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
        }
        
        .notification-close:hover {
            color: #333;
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations with enhanced effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Добавляем задержку для каскадного эффекта
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Добавляем специальные классы анимации
                if (entry.target.classList.contains('age-card')) {
                    entry.target.classList.add('bounce-in');
                } else if (entry.target.classList.contains('teacher-card')) {
                    entry.target.classList.add('slide-in-left');
                } else if (entry.target.classList.contains('contact-item')) {
                    entry.target.classList.add('slide-in-right');
                } else {
                    entry.target.classList.add('fade-in-up');
                }
            }, index * 150); // Каскадная задержка
        }
    });
}, observerOptions);

// Enhanced scroll animations with stagger effect
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.age-card, .feature-card, .teacher-card, .contact-item');
    
    animateElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Добавляем анимации для заголовков секций
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header, index) => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2}s`;
        
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        headerObserver.observe(header);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    updateActiveNavLink();
    initTeacherToggles();
    initScheduleFilters();
    initGalleryFilters();
    
    // Добавляем эффект печати для заголовка
    typeWriter();
    
    // Инициализируем счетчики
    initCounters();
    
    // Добавляем эффект параллакса для фоновых элементов
    initParallax();
});

// Функция для раскрывающихся блоков педагогов
function initTeacherToggles() {
    const toggleButtons = document.querySelectorAll('.info-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.classList.contains('open');
            
            // Закрываем все остальные блоки
            document.querySelectorAll('.teacher-info-content').forEach(item => {
                item.classList.remove('open');
                item.previousElementSibling.textContent = 'Подробнее о педагоге';
            });
            
            if (!isOpen) {
                content.classList.add('open');
                this.textContent = 'Скрыть информацию';
            } else {
                content.classList.remove('open');
                this.textContent = 'Подробнее о педагоге';
            }
        });
    });
}

// Фильтрация расписания
function initScheduleFilters() {
    const tabs = document.querySelectorAll('.schedule-tab');
    const scheduleGrid = document.querySelector('.schedule-grid');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс текущему табу
            this.classList.add('active');
            
            const filter = this.dataset.age;
            scheduleGrid.setAttribute('data-filter', filter);
            
            // Показываем/скрываем элементы расписания
            const scheduleItems = document.querySelectorAll('.schedule-item');
            scheduleItems.forEach(item => {
                if (filter === 'all' || item.dataset.age === filter || item.dataset.age === 'all') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Анимация появления
            setTimeout(() => {
                scheduleItems.forEach((item, index) => {
                    if (item.style.display !== 'none') {
                        item.style.animation = `fadeInUp 0.4s ease ${index * 0.1}s forwards`;
                    }
                });
            }, 100);
        });
    });
}

// Фильтрация галереи
function initGalleryFilters() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс текущему табу
            this.classList.add('active');
            
            const filter = this.dataset.category;
            galleryGrid.setAttribute('data-filter', filter);
            
            // Показываем/скрываем элементы галереи
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Анимация появления
            setTimeout(() => {
                galleryItems.forEach((item, index) => {
                    if (item.style.display !== 'none') {
                        item.style.animation = `bounceIn 0.6s ease ${index * 0.1}s forwards`;
                    }
                });
            }, 100);
        });
    });
}

// Эффект печати для заголовка
function typeWriter() {
    const heroTitle = document.querySelector('.hero-text h3');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
        setTimeout(type, 1000);
    }
}

// Простой эффект параллакса
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Анимированные счетчики (если потребуется)
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        }
                    }, 20);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Prevent form submission on Enter in input fields (except textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
        // Move to next input field
        const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
        const currentIndex = inputs.indexOf(e.target);
        if (currentIndex > -1 && currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        }
    }
});

// Enhanced mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        // Создаем оверлей для мобильного меню
        const mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        mobileMenuOverlay.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            z-index: 998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(mobileMenuOverlay);
        
        // Добавляем иконку гамбургера с анимацией
        mobileMenuBtn.innerHTML = '<span class="hamburger"><span></span><span></span><span></span></span>';
        
        // CSS для анимированного гамбургера
        const hamburgerStyles = `
            .hamburger {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 20px;
                height: 16px;
                transition: all 0.3s ease;
            }
            
            .hamburger span {
                display: block;
                height: 2px;
                width: 100%;
                background: white;
                border-radius: 1px;
                transition: all 0.3s ease;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        `;
        
        if (!document.querySelector('#hamburger-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'hamburger-styles';
            styleSheet.textContent = hamburgerStyles;
            document.head.appendChild(styleSheet);
        }
        
        // Переключение меню
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const hamburger = this.querySelector('.hamburger');
            const isOpen = nav.classList.contains('mobile-open');
            
            if (isOpen) {
                // Закрываем меню
                nav.classList.remove('mobile-open');
                hamburger.classList.remove('active');
                mobileMenuOverlay.style.opacity = '0';
                setTimeout(() => {
                    mobileMenuOverlay.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            } else {
                // Открываем меню
                nav.classList.add('mobile-open');
                hamburger.classList.add('active');
                mobileMenuOverlay.style.display = 'block';
                setTimeout(() => {
                    mobileMenuOverlay.style.opacity = '1';
                }, 10);
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Закрытие при клике на оверлей
        mobileMenuOverlay.addEventListener('click', function() {
            const hamburger = mobileMenuBtn.querySelector('.hamburger');
            nav.classList.remove('mobile-open');
            hamburger.classList.remove('active');
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
            }, 300);
            document.body.style.overflow = 'auto';
        });
        
        // Закрытие при клике на ссылку навигации
        nav.querySelectorAll('.nav-link').forEach((link, index) => {
            link.addEventListener('click', function() {
                const hamburger = mobileMenuBtn.querySelector('.hamburger');
                
                // Добавляем анимацию клика
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Закрываем меню с задержкой
                setTimeout(() => {
                    nav.classList.remove('mobile-open');
                    hamburger.classList.remove('active');
                    mobileMenuOverlay.style.opacity = '0';
                    setTimeout(() => {
                        mobileMenuOverlay.style.display = 'none';
                    }, 300);
                    document.body.style.overflow = 'auto';
                }, 200);
            });
        });
        
        // Закрытие при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                const hamburger = mobileMenuBtn.querySelector('.hamburger');
                nav.classList.remove('mobile-open');
                hamburger.classList.remove('active');
                mobileMenuOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Initialize mobile menu
if (window.innerWidth <= 768) {
    setupMobileMenu();
}

// Reinitialize mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    }
});
