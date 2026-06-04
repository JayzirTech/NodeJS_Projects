export function navBar(){
    return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div class="text-xl font-black text-blue-900">TMS-SPA</div>
            <nav class="hidden gap-3 md:flex">
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    href="/dashboard">Dashboard</a>
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    href="/tasks">Tareas</a>
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    href="/profile">Perfil</a>
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    href="/admin">Admin</a>
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 cursor-pointer"
                    id="logout"
                    >Logout</a>
            </nav>
        </div>
    </header>
    `
}
