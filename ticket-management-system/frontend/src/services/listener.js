import { router, renderRoutes } from "../router/router"
import { showEditModal } from "../utils/editModal"
import { deleteApiTicket, loadApiTickets, saveApiTicket } from "./apiTickets"
import { render } from "./render"

export async function listener() {
    const routes = renderRoutes()

    // Agrega un listener para cada enlace y botón de acción
    document.addEventListener('click', async (e) => {
        // Eliminar ticket
        const deleteButton = e.target.closest('.delete-task') // Obtiene el botón con la clase .delete-task
        if (deleteButton) {
            e.preventDefault()
            const id = deleteButton.dataset.id // Obtiene el id del botón

            if (id) {
                if (!confirm('Estas seguro de eliminar el ticket?')) return
                await deleteApiTicket(id)
                await router()
            }
            return
        }

        // Editar ticket
        const editButton = e.target.closest('.edit-task')
        if (editButton) {
            e.preventDefault()
            const id = editButton.dataset.id

            if (id) {
                const allTasks = await loadApiTickets()
                const task = allTasks.find(ticket => ticket.id == id)
                if (task) {
                    showEditModal(task)
                }
            }
            return
        }

        const form = document.getElementById('taskForm')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            // Recopilamos los datos usando los IDs
            const taskData = {
                title: document.getElementById('title').value.trim(),
                description: document.getElementById('description').value.trim(),
                assignedTo: document.getElementById('technical').value.trim() || null,
                createdBy: document.getElementById('creator').value.trim(),
                client: document.getElementById('client').value.trim(),
                status: document.getElementById('status').value,
                priority: document.getElementById('priority').value,
            };

            // Validamos que no hayan campos vacíos
            // const empty = taskData.title === '' || taskData.description === '' || taskData.createdBy === '' || taskData.client === ''
            // if (empty) {
            //     alert('Por favor, complete todos los campos.')
            //     return
            // }

            saveApiTicket(taskData)
            
            // render(routes['/tasks'])
        })

        const link = e.target.closest('a')
        if (!link) return

        e.preventDefault()

        // Obtiene el href del enlace
        const href = link.getAttribute('href')
        if (!href) return   // Si no hay href, sale

        // Obtiene la vista correspondiente. Si no existe, muestra la vista 404
        let view = routes[href] || routes['not-found']
        if (typeof view === 'function') {
            view = await view()
        }

        // Cambia la URL sin recargar la pagina
        history.pushState({}, '', href)

        render(view)
    })

    // Agrega un listener para el evento popstate
    window.addEventListener('popstate', () => {
        router()
    })
}
