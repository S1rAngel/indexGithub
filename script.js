/ Función para mostrar la página seleccionada con manejo de ARIA
        function showPage(pageId) {
            // Ocultar todas las páginas
            document.querySelectorAll('.page').forEach(page => {
                page.setAttribute('aria-hidden', 'true');
            });
            
            // Mostrar la página seleccionada
            const selectedPage = document.getElementById(pageId);
            selectedPage.setAttribute('aria-hidden', 'false');
            
            // Actualizar atributo aria-current en navegación
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === `#${pageId}`) {
                    link.setAttribute('aria-current', 'page');
                }
            });
            
            // Scroll suave hacia arriba
            document.getElementById('main-content').focus();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Manejar clics en los enlaces de navegación
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('href').substring(1); // Eliminar el #
                showPage(pageId);
            });
        });

        // Manejar envío del formulario
        document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Mensaje enviado! Gracias por contactarme.');
            e.target.reset();
        });

        // Navegación con teclado (flechas)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                
                const pages = ['inicio', 'portfolio', 'blog', 'sobre-mi', 'contacto'];
                const currentPage = document.querySelector('.page[aria-hidden="false"]').id;
                let currentIndex = pages.indexOf(currentPage);
                
                if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % pages.length;
                } else {
                    currentIndex = (currentIndex - 1 + pages.length) % pages.length;
                }
                
                showPage(pages[currentIndex]);
            }
        });
