document.addEventListener('DOMContentLoaded', function() {
    console.log("Navigation script loaded"); // Para depuración
    
    // Elementos del DOM
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    console.log("Menu toggle:", menuToggle); // Para depuración
    console.log("Main menu:", mainMenu); // Para depuración
    
    // Variables para controlar el scroll
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Umbral de scroll para ocultar/mostrar la navegación
    
    // Añadir clase fixed al header
    if (header) {
        header.classList.add('header-fixed');
    }
    
    // Función para manejar el scroll
    function handleScroll() {
        if (!header) return;
        
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si hemos scrolleado más que el umbral
        if (currentScroll > scrollThreshold) {
            // Scrolleando hacia abajo - ocultar header
            if (currentScroll > lastScrollTop) {
                header.classList.add('header-hidden');
            } 
            // Scrolleando hacia arriba - mostrar header
            else {
                header.classList.remove('header-hidden');
            }
        } else {
            // Si estamos cerca del top, siempre mostrar el header
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para móviles
    }
    
    // Manejar el menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            console.log("Menu toggle clicked"); // Para depuración
            e.preventDefault();
            e.stopPropagation();
            
            if (mainMenu) {
                mainMenu.classList.toggle('active');
                console.log("Menu active:", mainMenu.classList.contains('active')); // Para depuración
                
                // Cambiar el ícono del botón
                const icon = this.querySelector('i');
                if (icon) {
                    if (mainMenu.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.main-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992 && mainMenu) {
                mainMenu.classList.remove('active');
                // Restaurar el ícono del botón
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (mainMenu && mainMenu.classList.contains('active')) {
            const isClickInsideMenu = mainMenu.contains(event.target);
            const isClickOnToggle = menuToggle && menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                mainMenu.classList.remove('active');
                // Restaurar el ícono del botón
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }
    });
    
    // Escuchar eventos de scroll
    window.addEventListener('scroll', handleScroll);
});
