import { navBar } from "../components/navBar";
import { loadApiTickets } from "../services/apiTickets";

export async function tasks() {
  const tasks = await loadApiTickets() || [];

  function priorityClasses(priority) {
    switch ((priority || '').toLowerCase()) {
      case 'high':
        return 'border-red-400 bg-red-50'
      case 'medium':
        return 'border-yellow-400 bg-yellow-50'
      case 'low':
        return 'border-green-400 bg-green-50'
      default:
        return 'border-blue-100 bg-white'
    }
  }

  function noAssignment(assignment) {
    if (assignment === null || assignment === '') {
      return 'No Assignment'
    }
    return assignment
  }

  const taskCards = tasks.map(task => `
    <article id="${task.id}" class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50 ${priorityClasses(task.priority)}">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-2">
        <div>
          <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title} (${task.clientName})</h2>
          <p class="mt-3 max-w-2xl text-slate-600">${task.description}</p>
        </div>
        <div class="flex gap-3">
          <button data-id="${task.id}" class="edit-task rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 cursor-pointer">
            Editar
          </button>
          <button data-id="${task.id}" class="delete-task rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 cursor-pointer">
            Eliminar
          </button>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-xs font-bold capitalize tracking-[0.25em] text-blue-600">Created by: </p>
        <p class="text-xs font-bold capitalize tracking-[0.25em]">${task.createdBy}</p>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-xs font-bold capitalize tracking-[0.25em] text-blue-600">Status: </p>
        <p class="text-xs font-bold capitalize tracking-[0.25em]">${task.status}</p>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-xs font-bold capitalize tracking-[0.25em] text-blue-600">Priority: </p>
        <p class="text-xs font-bold capitalize tracking-[0.25em]">${task.priority}</p>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-xs font-bold capitalize tracking-[0.25em] text-blue-600">Assigned Technician: </p>
        <p class="text-xs font-bold capitalize tracking-[0.25em]">${noAssignment(task.assignedTo)}</p>
      </div>
    </article>
  `).join('');

  return `
  ${navBar()}
  <div class="min-h-screen bg-sky-50 text-slate-800">
    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de Tickets</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Tickets</h1>
          <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar los tickets.</p>
        </div>
        <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/tasksForm">
          Crear Ticket
        </a>
      </section>

      <section class="mt-8 grid gap-4">
        ${taskCards}
      </section>
    </main>
  </div>
  `;
}