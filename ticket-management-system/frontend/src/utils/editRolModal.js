export async function editRol(id, role) {
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
        <h2 class="text-2xl font-bold text-slate-900">Editar Ticket</h2>
        <button id="closeModal" class="text-slate-500 hover:text-slate-700 text-2xl leading-none cursor-pointer">&times;</button>
    </div>

    <form id="editRolForm" data-id="${id}" class="space-y-4">
        <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Rol</label>
            <select id="editRol" class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="admin" ${role === 'admin' ? 'selected' : ''}>Administrador</option>
                <option value="technical" ${role === 'technical' ? 'selected' : ''} >Técnico</option>
                <option value="client" ${role === 'client' ? 'selected' : ''}>Cliente</option>
            </select>
        </div>

        <div class="flex gap-3 pt-6">
            <button type="submit"
            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
            Guardar
            </button>
            <button type="button" id="cancelModal"
            class="flex-1 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition cursor-pointer">
            Cancelar
            </button>
        </div>
    </form>
`;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Listeners para cerrar el modal
    document.getElementById('closeModal').addEventListener('click', closeEditRolModal);
    document.getElementById('cancelModal').addEventListener('click', closeEditRolModal);
    overlay.addEventListener('click', closeEditRolModal);

    // Prevenir que el clic dentro del modal cierre la ventana
    modal.addEventListener('click', (e) => e.stopPropagation());
}

export function closeEditRolModal() {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('editModal');

    if (overlay) overlay.remove();
    if (modal) modal.remove();
}