// Inicialização do AOS
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Criação das partículas
    createParticles();
    createFlyingIcons();

    // Iniciar contadores
    startCounters();

    // Menu mobile
    setupMobileMenu();

    // Botão voltar ao topo
    setupBackToTop();

    // Revelar elementos ao scroll
    setupScrollReveal();

    // Formulário com animação
    setupFormInteractions();
});

// Função para criar partículas
function createParticles() {
    const containers = document.querySelectorAll('.particles-container');

    containers.forEach(container => {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Tamanho aleatório entre 3 e 8px
            const size = Math.random() * 5 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Posição aleatória
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Opacidade aleatória
            particle.style.opacity = Math.random() * 0.5 + 0.1;

            // Animação com duração e delay aleatórios
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;

            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

            container.appendChild(particle);
        }
    });
}

// Criação de ícones flutuantes
function createFlyingIcons() {
    const container = document.querySelector('.flying-icons');
    const icons = container.querySelectorAll('.flying-icon');

    icons.forEach(icon => {
        // Posição horizontal aleatória
        const left = Math.random() * 100;
        icon.style.left = `${left}%`;

        // Tamanho inicial
        const scale = Math.random() * 0.5 + 0.5;
        icon.style.transform = `scale(${scale})`;

        // Duração e delay aleatórios
        const duration = Math.random() * 15 + 20;
        const delay = Math.random() * 5;

        icon.style.animation = `fly ${duration}s linear ${delay}s infinite`;
    });
}

// Contador animado
function startCounters() {
    const counters = [
        { id: 'counter1', start: 0, end: 3.2, prefix: 'R, suffix: M+', decimal: true },
        { id: 'counter2', start: 0, end: 1, suffix: 'K+' },
        { id: 'counter3', start: 0, end: 45, suffix: '+' },
        { id: 'counter4', start: 0, end: 98, suffix: '%' }
    ];

    const options = {
        threshold: 0.8
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const element = document.getElementById(counter.id);
                    if (!element) return;

                    let current = counter.start;
                    const increment = (counter.end - counter.start) / 40;
                    const duration = 2000;
                    const stepTime = duration / 40;

                    const updateCounter = () => {
                        current += increment;
                        if (current < counter.end) {
                            if (counter.decimal) {
                                element.textContent = `${counter.prefix || ''}${current.toFixed(1)}${counter.suffix || ''}`;
                            } else {
                                element.textContent = `${counter.prefix || ''}${Math.floor(current)}${counter.suffix || ''}`;
                            }
                            setTimeout(updateCounter, stepTime);
                        } else {
                            if (counter.decimal) {
                                element.textContent = `${counter.prefix || ''}${counter.end.toFixed(1)}${counter.suffix || ''}`;
                            } else {
                                element.textContent = `${counter.prefix || ''}${counter.end}${counter.suffix || ''}`;
                            }
                        }
                    };

                    updateCounter();
                });

                observer.unobserve(entry.target);
            }
        });
    }, options);

    const statsSection = document.querySelector('.bg-gray-900.text-white');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Setup do menu mobile
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('close-menu');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const menuLinks = menu.querySelectorAll('a');

    if (menuBtn && closeBtn && menu && overlay) {
        menuBtn.addEventListener('click', () => {
            menu.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        function closeMenu() {
            menu.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
}

// Botão voltar ao topo
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0');
                backToTopBtn.classList.remove('invisible');
            } else {
                backToTopBtn.classList.add('opacity-0');
                backToTopBtn.classList.add('invisible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Revelação de elementos ao scroll
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = function () {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add("active");
            } else {
                revealElements[i].classList.remove("active");
            }
        }
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
}

// Interações do formulário
function setupFormInteractions() {
    const form = document.getElementById('signup-form');
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('scale-105');
            this.parentElement.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('scale-105');
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Adicionar efeito de loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.innerHTML = '<div class="loading-spinner inline-block w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></div> Processando...';

        // Simular envio (remover em produção)
        setTimeout(() => {
            submitBtn.textContent = '✓ Cadastro concluído!';
            submitBtn.classList.remove('bg-primary');
            submitBtn.classList.add('bg-green-500');

            // Resetar após 3 segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.add('bg-primary');
                submitBtn.classList.remove('bg-green-500');
                form.reset();
            }, 3000);
        }, 1500);
    });
}

// Atualizar countdowns
function updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    let parts = countdownEl.textContent.split(':');
    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    let seconds = parseInt(parts[2]);

    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--;

        if (minutes < 0) {
            minutes = 59;
            hours--;

            if (hours < 0) {
                hours = 48; // Reset to 48 hours
            }
        }
    }

    countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Animação de wave para SVG
const waveAnimation = document.querySelector('.wave-animation');
if (waveAnimation) {
    waveAnimation.style.animation = 'wave 5s ease-in-out infinite alternate';
}

document.addEventListener('DOMContentLoaded', function () {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-value');
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const decimal = target.toString().includes('.');
                    const duration = 2000; // ms
                    const steps = 50;
                    const increment = target / steps;

                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = decimal ? target.toFixed(1) : target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = decimal ? current.toFixed(1) : Math.floor(current);
                        }
                    }, duration / steps);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observar a seção de números
    const counterSection = document.querySelector('.counter-item').closest('[data-aos="zoom-in"]');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    function startCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        if (!countdownElement) return;

        // Define o tempo inicial (24h)
        let hours = 23;
        let minutes = 59;
        let seconds = 59;

        const updateCountdown = () => {
            countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (seconds > 0) {
                seconds--;
            } else {
                seconds = 59;
                if (minutes > 0) {
                    minutes--;
                } else {
                    minutes = 59;
                    if (hours > 0) {
                        hours--;
                    } else {
                        // Quando chegar a zero, reinicia para manter o senso de urgência
                        hours = 23;
                        minutes = 59;
                        seconds = 59;
                    }
                }
            }
        };

        // Atualiza o contador a cada segundo
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Iniciar o contador
    startCountdown();

    // Comportamento do formulário
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Adicionar efeito de loading ao botão
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = '<div class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processando...</div>';

            // Simular envio (remover em produção e substituir por seu código real de envio de formulário)
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="flex items-center justify-center"><i class="fas fa-check mr-2"></i> Cadastro realizado com sucesso!</span>';
                submitBtn.classList.remove('from-blue-600', 'to-indigo-600');
                submitBtn.classList.add('from-green-500', 'to-green-600');

                // Exibir mensagem de sucesso (opcional)
                setTimeout(() => {
                    // Adicione aqui o redirecionamento ou exibição de mensagem adicional
                }, 1500);
            }, 2000);
        });
    }
})