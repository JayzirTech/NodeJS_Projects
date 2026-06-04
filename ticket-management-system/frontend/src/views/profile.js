import { navBar } from "../components/navBar";

export function profile(){

  const user= JSON.parse(localStorage.getItem('userLogged'))  
  
  return `
  ${navBar()}
  <div class="min-h-screen bg-sky-50 text-slate-800">
    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
          <p class="mt-4 text-blue-50">El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.</p>
        </aside>

        <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
          <form id="profile-form" data-id="${user.id}" class="grid gap-5">
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="name">Nombre</label>
                <input id="name-new" type="text" value="${user.name}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="apellido">Apellido</label>
                <input id="lastName-new" type="text" value="${user.lastName}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
              <input id="profile-email-new" type="email" value="${user.email}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="password-new">Nueva contrasena</label>
              <input id="password-new" type="password" placeholder="Actualiza tu contrasena" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
            <div class="flex flex-col gap-3 pt-2 sm:flex-row">
              <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500" href="/profile">Guardar cambios</button>
            </div>
          </form>
        </section>
      </section>
    </main>
  </div>
  `
}
  
