/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="flex flex-wrap items-center justify-left gap-3 bg-slate-900/95 border-b border-slate-800 px-4 py-4 shadow-xl shadow-slate-950/20">
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-cyan-500/15 hover:text-cyan-300 transition"
                href="/" data-link>Home</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-cyan-500/15 hover:text-cyan-300 transition"
                href="/characters" data-link>Charaters</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-cyan-500/15 hover:text-cyan-300 transition"
                href="/episodes" data-link>Episodes</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-cyan-500/15 hover:text-cyan-300 transition"
                href="/locations" data-link>Locations</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-cyan-500/15 hover:text-cyan-300 transition"
                href="/contacts" data-link>Contact</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-cyan-500/15 hover:text-cyan-300 transition"
                href="/about" data-link>About Us</a>
        </nav>
    `;
}