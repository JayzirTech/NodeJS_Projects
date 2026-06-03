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
import { deleteApiTicket } from "../services/apiTickets"

const routes = {
    '/': welcome,
    '/home': home,
    '/admin': admin,
    '/dashboard': dashboard,
    '/login': login,
    '/profile': profile,
    '/register': register,
    '/tasksForm': taskForm,
    '/tasks': tasks,
    'not-found': notFound
}

export async function router() {
    const href = window.location.pathname // Toma la URL actual
    let view = routes[href] // Obtiene la vista correspondiente

    // Si la vista no existe, muestra la vista 404
    if (!view) {
        view = routes['not-found']
    }

    if (typeof view === 'function') {
        view = await view()
    }

    render(view) // Renderiza la vista
}

export function renderRoutes(){
    return routes
}