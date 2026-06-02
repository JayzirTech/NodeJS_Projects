/**
 * Character Card Component
 */

export function characterCard(character) {

    return `
        <article id="${character.id}" class="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/95 shadow-[0_24px_80px_rgba(14,19,32,0.7)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-cyan-500/15">
            <img
                class="h-72 w-full object-cover"
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="p-5 space-y-3">
                <h3 class="text-xl font-semibold tracking-tight text-cyan-300">
                    ${character.name}
                </h3>
                <p class="text-sm leading-6 text-slate-300">
                    <span class="font-semibold text-slate-100">Status:</span>
                    ${character.status}
                </p>
                <p class="text-sm leading-6 text-slate-300">
                    <span class="font-semibold text-slate-100">Species:</span>
                    ${character.species}
                </p>
            </div>

            <button id="delete-${character.id}" class="relative bottom-4 left-5 rounded-full bg-red-500/30 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-red-500">Delete</button>
            <button id="edit-${character.id}" class="relative bottom-4 left-5 rounded-full bg-cyan-500/30 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-500">Edit</button>
        </article>
    `;
}
