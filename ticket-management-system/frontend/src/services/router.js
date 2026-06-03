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
    let href = window.location.pathname // Toma la URL actual
    let view = routes[href] // Obtiene la vista correspondiente

    // Si la vista no existe, redirige a la vista 404
    if (!view) {
        href = 'not-found'
        view = routes[href]
    }

    render(view) // Renderiza la vista

    // Agrega un listener para cada enlace
    document.addEventListener('click', (e) => {
        if (!e.target.matches('a')) return

        e.preventDefault()

        href =  e.target.href.replace(window.location.origin, '') // Toma la URL del enlace y quita el dominio
        view = routes[href] // Obtiene la vista correspondiente

        window.history.pushState({}, '', href) // Actualiza la URL

        render(view) // Renderiza la vista
    })

    // Agrega un listener para el evento popstate
    window.addEventListener('popstate', () => {
        router()
    })
}

function render(view) {
    const root = document.getElementById('app')
    root.innerHTML = view
}