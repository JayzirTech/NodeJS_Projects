import { updateApiTicket } from "../services/apiTickets"

export function showEditModal(task) {
  // Crear overlay borroso
  const overlay = document.createElement('div');
  overlay.id = 'modalOverlay';
  overlay.className = 'fixed inset-0 bg-black-500/50 backdrop-blur-sm z-40';

  // Crear modal
  const modal = document.createElement('div');
  modal.id = 'editModal';
  modal.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-50 w-96 p-8 max-h-[90vh] overflow-y-auto';

  modal.innerHTML = `
<div class="flex items-center justify-between mb-6">
  <h2 class="text-2xl font-bold text-slate-900">Editar Tarea</h2>
  <button id="closeModal" class="text-slate-500 hover:text-slate-700 text-2xl leading-none">&times;</button>
</div>

<form id="editForm" class="space-y-4">
  <div>
    <label class="block text-sm font-semibold text-slate-700 mb-2">Título</label>
    <input type="text" id="editTitle" value="${task.title}"
      class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Título de la tarea" />
  </div>

  <div>
    <label class="block text-sm font-semibold text-slate-700 mb-2">Descripción</label>
    <textarea id="editDescription"
      class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      rows="4" placeholder="Descripción de la tarea">${task.description}</textarea>
  </div>

  <div>
    <label class="block text-sm font-semibold text-slate-700 mb-2">Estado</label>
    <select id="editStatus"
      class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pendiente</option>
      <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>En Progreso</option>
      <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completada</option>
    </select>
  </div>

  <div>
    <label class="block text-sm font-semibold text-slate-700 mb-2">Prioridad</label>
    <select id="editPriority"
      class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Baja</option>
      <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Media</option>
      <option value="high" ${task.priority === 'high' ? 'selected' : ''}>Alta</option>
    </select>
  </div>

  <div>
    <label class="block text-sm font-semibold text-slate-700 mb-2">Técnico Asignado</label>
    <input type="text" id="editAssignedTo" value="${task.assignedTo}"
      class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Nombre del técnico" />
  </div>

  <div class="flex gap-3 pt-6">
    <button type="submit"
      class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
      Guardar
    </button>
    <button type="button" id="cancelModal"
      class="flex-1 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition">
      Cancelar
    </button>
  </div>
</form>
`;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Listeners para cerrar el modal
  document.getElementById('closeModal').addEventListener('click', closeEditModal);
  document.getElementById('cancelModal').addEventListener('click', closeEditModal);
  overlay.addEventListener('click', closeEditModal);

  // Prevenir que el clic dentro del modal cierre la ventana
  modal.addEventListener('click', (e) => e.stopPropagation());

  // Listener para enviar el formulario
  document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if(!confirm('Estas seguro de guardar los cambios?')) return

    const updatedTask = {
      title: document.getElementById('editTitle').value,
      description: document.getElementById('editDescription').value,
      status: document.getElementById('editStatus').value,
      priority: document.getElementById('editPriority').value,
      assignedTo: document.getElementById('editAssignedTo').value,
    };

    await updateApiTicket(task.id, updatedTask);
    closeEditModal();

    // Refresca la página para ver los cambios
    window.location.reload();
  });
}

export function closeEditModal() {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('editModal');

  if (overlay) overlay.remove();
  if (modal) modal.remove();
}