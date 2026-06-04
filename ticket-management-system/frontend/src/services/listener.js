import { router, renderRoutes } from "../router/router"
import { closeEditModal, showEditModal } from "../utils/editModal"
import { deleteApiTicket, loadApiTickets, saveApiTicket, updateApiTicket } from "./apiTickets"
import { render } from "./render"

export async function listener() {
    const routes = renderRoutes()

    // Agrega un listener para cada enlace y botón de acción
    document.addEventListener('click', async (e) => {
        // Si el click fue en un enlace rendera la vista
        const link = e.target.closest('a')

        if (link) {

            // Evita el comportamiento por defecto del enlace
            e.preventDefault()

            // Obtiene el href del enlace
            const href = link.getAttribute('href')
            if (!href) { alert('No hay href'); return }   // Si no hay href, sale

            // Obtiene la vista correspondiente. Si no existe, muestra la vista 404
            let view = routes[href] || routes['not-found']
            if (typeof view === 'function') {
                view = await view()
            }

            // Cambia la URL sin recargar la pagina
            history.pushState({}, '', href)

            render(view)
        }

        // Eliminar ticket
        const deleteButton = e.target.closest('.delete-task') // Obtiene el botón con la clase .delete-task
        if (deleteButton) {
            const id = deleteButton.dataset.id // Obtiene el id del botón

            if (id) {
                if (confirm('Estas seguro de eliminar el ticket?')) {
                    await deleteApiTicket(id)
                    await router()
                }
            }
        }

        // Editar ticket
        const editButton = e.target.closest('.edit-task') // Obtiene el botón con la clase .edit-task
        if (editButton) {
            const id = editButton.dataset.id

            if (id) {
                const allTasks = await loadApiTickets()
                const task = allTasks.find(ticket => ticket.id == id)
                if (task) {
                    showEditModal(task)
                }
            }
        }
    })

    // Listener para enviar el formulario de edición
    document.addEventListener('submit', async (e) => {
        e.preventDefault()

        if (e.target.id === 'editForm') {
            if (confirm('Estas seguro de guardar los cambios?')) {
                const updatedTicket = {
                    title: document.getElementById('editTitle').value,
                    description: document.getElementById('editDescription').value,
                    status: document.getElementById('editStatus').value,
                    priority: document.getElementById('editPriority').value,
                    assignedTo: document.getElementById('editAssignedTo').value,
                };

                const id = e.target.dataset.id
                await updateApiTicket(id, updatedTicket);
                closeEditModal()
                await router()
            }
        }

        if(e.target.id === 'taskForm') {
            const newTicket = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                createdBy: document.getElementById('creator').value,
                clientName: document.getElementById('client').value,
                status: document.getElementById('status').value,
                priority: document.getElementById('priority').value
            };
            // Verificar si todos los campos estan vacios menos el "assignedTo"
            const emptyFields = Object.values(newTicket).some(value => value === '');
            if(emptyFields) {
                alert('Todos los campos son obligatorios');
            } else {
                newTicket.assignedTo = document.getElementById('technical').value;
                await saveApiTicket(newTicket);
                history.pushState({}, '', '/tasks');
                await router()
            }
        }
    })

    // Agrega un listener para el evento popstate
    window.addEventListener('popstate', () => {
        router()
    })
}
