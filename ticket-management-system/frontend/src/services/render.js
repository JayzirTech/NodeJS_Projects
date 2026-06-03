export function render(view) {
    const root = document.getElementById('app')
    root.innerHTML = view

    // Agrega la clase de bg y text-color al enlace actual
    const a = document.querySelectorAll('a') // Obtiene todos los enlaces
    // Recorre todos los enlaces
    a.forEach(element => {
        const aHref = element.getAttribute('href')  // Obtiene el atributo href del enlace
        const aPathname = window.location.pathname  // Obtiene el pathname actual

        // Si el href del enlace coincide con el pathname actual agrega la clase
        if (aHref === aPathname) {
            // Agrega clase de bg, text-color y desactiva el cursor
            element.classList.add('bg-sky-600', 'text-white', 'pointer-events-none', 'cursor-not-allowed')
        }
    });
    
}