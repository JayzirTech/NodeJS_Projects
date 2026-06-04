import { router, renderRoutes } from "../router/router"
import { closeEditRolModal, editRol } from "../utils/editRolModal"
import { closeEditModal, showEditModal } from "../utils/editTicketModal"
import { deleteApiTicket, loadApiTickets, saveApiTicket, updateApiTicket } from "./apiTickets"
import { deleteApiUser, loadApiUsers, saveApiUser, updateApiUser } from "./apiUsers"
import { comparePassword } from "./comparePassword"
import { hashPassword } from "./hashPassword"
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

        // Eliminar usuario
        const deleteUser = e.target.closest('#deleteUser')

        if (deleteUser) {
            const id = deleteUser.dataset.id

            if (id) {
                if (confirm('Estas seguro de eliminar el usuario?')) {
                    await deleteApiUser(id)
                    await router()
                }
            }
        }

        // Editar rol
        const editRole = e.target.closest('#editRole')

        if (editRole) {
            const id = editRole.dataset.id
            const allUsers = await loadApiUsers()
            const userID = allUsers.find(user => user.id == id)
            editRol(userID.id, userID.role)
        }

        // Cerrar sesión
        const logout = e.target.closest('#logout')
        if (logout) {
            if (confirm('Estas seguro de cerrar sesion?')) {
                localStorage.removeItem('userLogged')
                history.pushState({}, '', '/login')
                await router()
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

        if (e.target.id === 'taskForm') {
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
            if (emptyFields) {
                alert('Todos los campos son obligatorios');
            } else {
                newTicket.assignedTo = document.getElementById('technical').value;
                await saveApiTicket(newTicket);
                history.pushState({}, '', '/tasks');
                await router()
            }
        }

        // Registro de nuevo usuario
        if (e.target.id === 'register-form') {
            const newUser = {
                'name': document.getElementById('register-name').value,
                'lastName': document.getElementById('register-lastname').value,
                'email': document.getElementById('register-email').value,
                'password': await hashPassword(document.getElementById('register-password').value),
                'role': null
            }
            // Verificar si todos los campos estan vacios
            const emptyFields = Object.values(newUser).some(value => value === '');
            if (emptyFields) {
                alert('Todos los campos son obligatorios');
            } else {
                // Cargar los usuarios que estan en la API
                const usersApi = await loadApiUsers()

                // Buscar si el email ya existe en la API
                const userExists = usersApi.find(user => user.email === newUser.email)
                if (userExists) {
                    alert('El email ya esta registrado')
                } else {
                    await saveApiUser(newUser)
                    history.pushState({}, '', '/login')
                    await router()
                }
            }
        }

        // Login de usuario
        if (e.target.id === 'login-form') {
            const userLogin = {
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
            }

            // Verificar si todos los campos estan vacios
            const emptyFields = Object.values(userLogin).some(value => value === '');
            if (emptyFields) {
                alert('Todos los campos son obligatorios'); // Si todos los campos estan vacios, mandar un alert

            } else {
                const userApi = await loadApiUsers() // Cargar los usuarios que estan en la API

                // Busca si el email y la contraseña son correctos
                let userExists = null;
                
                for (const user of userApi) {
                    if (user.email === userLogin.email) {
                        // Solo si el email coincide, hacemos el gasto de comparar la contraseña
                        const passwordMatch = await comparePassword(userLogin.password, user.password);

                        if (passwordMatch) {
                            userExists = user; // Guardamos el usuario que encontramos
                            break; // Rompemos el bucle de inmediato porque ya lo encontramos
                        }
                    }
                }

                // Si el email y la contraseña son correctos, guarda el usuario en el localStorage y redirige a la vista de dashboard
                if (userExists) {
                    const userLogged = {
                        'name': userExists.name,
                        'lastName': userExists.lastName,
                        'role': userExists.role,
                        'email': userExists.email,
                        'id': userExists.id
                    }
                    localStorage.setItem('userLogged', JSON.stringify(userLogged))
                    history.pushState({}, '', '/dashboard')
                    await router()
                } else {
                    alert('Email o contraseña incorrectos') // Si el email y la contraseña no son correctos, mandar un alert
                }

            }
        }

        // Actualiza usuario
        if (e.target.id === 'profile-form') {
            const userID = document.getElementById('profile-form').dataset.id

            const userUpdate = {
                'name': document.getElementById('name-new').value,
                'lastName': document.getElementById('lastName-new').value,
                'email': document.getElementById('profile-email-new').value,
                'password': document.getElementById('password-new').value
            }

            // Verificar si todos los campos estan vacios
            const emptyFields = Object.values(userUpdate).some(value => value === '');
            if (emptyFields) {
                alert('Todos los campos son obligatorios'); // Si todos los campos estan vacios, mandar un alert
            } else {
                await updateApiUser(userID, userUpdate)
                history.pushState({}, '', '/dashboard')
                await router()
            }
        }

        // Editar rol
        if (e.target.id === 'editRolForm') {
            const roleID = document.getElementById('editRolForm').dataset.id

            const roleUpdate = {
                'role': document.getElementById('editRol').value
            }
            await updateApiUser(roleID, roleUpdate)
            closeEditRolModal()
            await router()

        }
    })

    // Agrega un listener para el evento popstate
    window.addEventListener('popstate', () => {
        router()
    })
}
