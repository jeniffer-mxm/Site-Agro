// AGRO TECH SITE - JAVASCRIPT

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // NAVBAR E MENU MOBILE
    // ==========================================
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle do menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Fecha o menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Adiciona/remove classe baseada no scroll
        if (currentScrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,28,30,0.95) 100%)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #000000 0%, #1a1c1e 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ==========================================
    // SMOOTH SCROLLING PARA LINKS INTERNOS
    // ==========================================
    
    // Função para rolar suavemente para uma seção
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Compensa altura da navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    // Adiciona smooth scroll para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // ==========================================
    // ANIMAÇÕES DE SCROLL
    // ==========================================
    
    // Observer para animações quando elementos entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem ter animação
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .service-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // HOVER EFFECTS PARA CARDS
    // ==========================================
    
    // Efeito parallax sutil nos cards
    document.querySelectorAll('.product-card, .feature-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ==========================================
    // LOADING DA LOGO
    // ==========================================
    
    // Verifica se existe uma logo real para carregar
    const logoImg = document.getElementById('logo-img');
    const logoPlaceholders = document.querySelectorAll('.logo-text');
    
    function checkLogo() {
        if (logoImg && logoImg.src && logoImg.src !== window.location.href) {
            logoImg.onload = function() {
                logoImg.style.display = 'block';
                logoPlaceholders.forEach(placeholder => {
                    placeholder.style.display = 'none';
                });
            };
            
            logoImg.onerror = function() {
                console.log('Logo não encontrada, usando placeholder');
            };
        }
    }
    
    checkLogo();
    
    // ==========================================
    // PLACEHOLDER PARA IMAGENS DE PRODUTOS
    // ==========================================
    
    // Adiciona fallback para imagens de produtos que não carregarem
    const productImages = document.querySelectorAll('.product-img');
    
    productImages.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            // Cria um placeholder colorido
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #228B22, #32CD32);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 48px;
                font-weight: bold;
            `;
            placeholder.textContent = '📷';
            this.parentElement.appendChild(placeholder);
        };
    });
    
    // ==========================================
    // INTERAÇÕES DOS BOTÕES
    // ==========================================
    
    // Adiciona feedback visual aos botões
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            // Cria efeito ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ==========================================
    // LAZY LOADING PARA IMAGENS
    // ==========================================
    
    // Observer para lazy loading de imagens
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observa todas as imagens com classe lazy
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ==========================================
    // CONTADOR ANIMADO PARA ESTATÍSTICAS
    // ==========================================
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        const suffix = element.textContent.replace(/[\d]/g, '');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    }
    
    // Observer para animar contadores quando visíveis
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observa todos os números das estatísticas
    document.querySelectorAll('.stat-number').forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // ==========================================
    // FUNCIONALIDADES DOS LINKS SOCIAIS
    // ==========================================
    
    // Adiciona funcionalidade aos links sociais (simulação)
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulação de abertura de rede social
            const platform = this.getAttribute('aria-label') || 'Rede Social';
            
            // Cria notificação temporária
            showNotification(`Abrindo ${platform}... (Demo)`);
        });
    });
    
    // ==========================================
    // SISTEMA DE NOTIFICAÇÕES
    // ==========================================
    
    function showNotification(message, type = 'info') {
        // Remove notificação anterior se existir
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 16px 24px;
            border-radius: 12px;
            border: 1px solid var(--accent-primary);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Anima a entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ==========================================
    // CONSOLE LOG COM INFORMAÇÕES DO SITE
    // ==========================================
    
    console.log(`
    🌱 AGRO TECH SITE
    ==========================================
    ✅ Site carregado com sucesso!
    🎨 Design: Dark theme com verde agro
    📱 Responsivo: Mobile, tablet e desktop
    ⚡ Animações ativas
    🔗 Navegação suave ativa
    
    Desenvolvido por: Jeniffer Maximo | Dev
    ==========================================
    `);
    
});

// ==========================================
// CSS PARA ANIMAÇÃO RIPPLE
// ==========================================

// Adiciona CSS para animação ripple dinamicamente
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);