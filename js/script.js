// Overlay de la cuerda
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.dark-overlay');
    const rope = document.querySelector('.rope');
    const pullRing = document.querySelector('.pull-ring');
    
    if (!overlay || !rope) return;
    
    // Deshabilitar scroll inicialmente
    document.body.style.overflow = 'hidden';
    
    let isPulled = false;
    
    function igniteLight() {
        if (isPulled) return;
        isPulled = true;
        
        // Animar la cuerda
        rope.classList.add('pulled');
        
        // Esperar a que termine la animación de la cuerda
        setTimeout(() => {
            overlay.classList.add('fade-out');
            
            // Habilitar scroll y ocultar overlay después de la transición
            setTimeout(() => {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 2000); // Tiempo de la transición del overlay
        }, 800); // Tiempo de la animación de la cuerda
    }
    
    rope.addEventListener('click', igniteLight);
    if (pullRing) {
        pullRing.addEventListener('click', igniteLight);
    }
    
    // También activar con tecla
    document.addEventListener('keydown', function(e) {
        if ((e.code === 'Space' || e.code === 'Enter') && !isPulled) {
            igniteLight();
        }
    });
});
    
    // ============================================
    // 2. NAVEGACIÓN MÓVIL (tu código existente)
    // ============================================
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // ============================================
    // 3. SCROLL SUAVE (tu código existente)
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Solo si no es un enlace externo o especial
            if (this.getAttribute('href').startsWith('#') && 
                !this.classList.contains('no-smooth-scroll')) {
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
            }
        });
    });
    
    // ============================================
    // 4. BOTÓN PARA VOLVER ARRIBA (tu código existente)
    // ============================================
    
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // 5. EFECTOS DE SOMBRA DINÁMICA (tu código existente)
    // ============================================
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const shadowX = (x - centerX) / 25;
            const shadowY = (y - centerY) / 25;
            
            this.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.15)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // ============================================
    // 6. ANIMACIÓN DE LUCES ALEATORIAS (modificado)
    // ============================================
    
    function createRandomLight() {
        // Solo crear luces si el overlay ya no está activo
        if (document.querySelector('.dark-overlay.active')) {
            return;
        }
        
        const light = document.createElement('div');
        light.classList.add('random-light');
        
        // Posición aleatoria
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Tamaño aleatorio
        const size = Math.random() * 100 + 50;
        
        // Estilos
        light.style.position = 'fixed';
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;
        light.style.background = 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)';
        light.style.borderRadius = '50%';
        light.style.left = `${posX}px`;
        light.style.top = `${posY}px`;
        light.style.pointerEvents = 'none';
        light.style.zIndex = '-1';
        
        // Animación
        light.style.animation = `pulse ${Math.random() * 5 + 3}s infinite alternate`;
        
        document.body.appendChild(light);
        
        // Eliminar después de un tiempo
        setTimeout(() => {
            if (light.parentNode) {
                light.remove();
            }
        }, 5000);
    }
    
    // Crear luces aleatorias periódicamente (solo si no hay overlay)
    setInterval(() => {
        if (!document.querySelector('.dark-overlay.active')) {
            createRandomLight();
        }
    }, 2000);
    
    // Añadir algunas luces al cargar (con delay para que no interfiera con el overlay)
    setTimeout(() => {
        if (!document.querySelector('.dark-overlay.active')) {
            for (let i = 0; i < 5; i++) {
                setTimeout(createRandomLight, i * 500);
            }
        }
    }, 5000);
    
    // ============================================
    // 7. VALIDACIÓN DEL FORMULARIO (tu código existente)
    // ============================================
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '#ccc';
                }
            });
            
            if (isValid) {
                // Envío real usando Formsubmit
                this.submit();
                
                // Mensaje de confirmación
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '✓ Enviado';
                submitBtn.style.backgroundColor = '#4CAF50';
                submitBtn.disabled = true;
                
                // Restaurar después de 3 segundos
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
    
    // ============================================
    // 8. GALERÍA CON CARRUSEL AUTOMÁTICO (tu código existente)
    // ============================================
    
    function initGalleryCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const currentSlideElement = document.getElementById('current-slide');
        const totalSlidesElement = document.getElementById('total-slides');
        
        // Si no hay elementos de carrusel, salir de la función
        if (slides.length === 0) {
            return;
        }
        
        let currentSlideIndex = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;
        
        // Inicializar contador
        if (totalSlidesElement) {
            totalSlidesElement.textContent = totalSlides;
        }
        updateCounter();
        
        // Asegurarse de que al menos un slide esté activo al inicio
        if (!document.querySelector('.carousel-slide.active') && slides.length > 0) {
            slides[0].classList.add('active');
            if (indicators.length > 0) indicators[0].classList.add('active');
            if (thumbnails.length > 0) thumbnails[0].classList.add('active');
        }
        
        // Función para mostrar slide específico
        function showSlide(index) {
            // Asegurarse de que el índice esté dentro del rango
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            // Ocultar slide actual
            slides[currentSlideIndex].classList.remove('active');
            if (indicators[currentSlideIndex]) {
                indicators[currentSlideIndex].classList.remove('active');
            }
            if (thumbnails[currentSlideIndex]) {
                thumbnails[currentSlideIndex].classList.remove('active');
            }
            
            // Mostrar nuevo slide
            slides[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            if (thumbnails[index]) {
                thumbnails[index].classList.add('active');
            }
            
            // Actualizar índice actual
            currentSlideIndex = index;
            updateCounter();
        }
        
        // Función para actualizar contador
        function updateCounter() {
            if (currentSlideElement) {
                currentSlideElement.textContent = currentSlideIndex + 1;
            }
        }
        
        // Función para siguiente slide
        function nextSlide() {
            showSlide(currentSlideIndex + 1);
            resetAutoSlide();
        }
        
        // Función para slide anterior
        function prevSlide() {
            showSlide(currentSlideIndex - 1);
            resetAutoSlide();
        }
        
        // Función para iniciar auto-desplazamiento
        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        // Función para reiniciar auto-desplazamiento
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Event listeners para botones
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Event listeners para indicadores
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
                resetAutoSlide();
            });
        });
        
        // Event listeners para miniaturas
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
                resetAutoSlide();
            });
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });
        
        // Iniciar auto-desplazamiento
        startAutoSlide();
        
        // Pausar auto-desplazamiento al pasar el mouse
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', function() {
                clearInterval(autoSlideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', function() {
                startAutoSlide();
            });
        }
    }
    
    // Inicializar el carrusel de la galería
    initGalleryCarousel();


// ============================================
// 9. AÑADIR KEYFRAMES FALTANTES (si no están en CSS)
// ============================================

// Añadimos los keyframes necesarios para las animaciones
const style = document.createElement('style');
style.innerHTML = `
    @keyframes gentle-light-expand {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.1);
        }
        20% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.5);
        }
        40% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(2);
        }
        60% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(3);
        }
        80% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(5);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(8);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes bulb-transition {
        0% {
            transform: scale(1);
            filter: brightness(0.1);
        }
        50% {
            transform: scale(1.1);
            filter: brightness(1);
        }
        100% {
            transform: scale(1);
            filter: brightness(1);
        }
    }
    
    @keyframes ray-emerge {
        0% {
            height: 0;
            opacity: 0;
        }
        50% {
            height: 500px;
            opacity: 0.8;
        }
        100% {
            height: 1000px;
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);