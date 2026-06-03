import { render } from "../services/render"
import { admin } from "../views/admin"
import { dashboard } from "../views/dashboard"
import { home } from "../views/home"
import { login } from "../views/login"
import { notFound } from "../views/not-found"
import { profile } from "../views/profile"
import { register } from "../views/register"
import { taskForm } from "../views/task-form"
import { tasks } from "../views/tasks"
import { welcome } from "../views/welcome"

const routes = {
    '/': welcome(),
    '/home': home(),
    '/admin': admin(),
    '/dashboard': dashboard(),
    '/login': login(),
    '/profile': profile(),
    '/register': register(),
    '/tasksForm': taskForm(),
    '/tasks': tasks(),
    'not-found': notFound()
}

export function router() {
    const href = window.location.pathname // Toma la URL actual
    const view = routes[href] // Obtiene la vista correspondiente

    // Si la vista no existe, redirige a la vista 404
    if (!view) {
        href = 'not-found'
        view = routes[href]
    }

    render(view) // Renderiza la vista
}

// Agrega un listener para cada enlace
document.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (!link) return

    e.preventDefault()

    const href = link.getAttribute('href')
    const view = routes[href]

    history.pushState({}, '', href)
    render(view)
})

// Agrega un listener para el evento popstate
window.addEventListener('popstate', () => {
    router()
})