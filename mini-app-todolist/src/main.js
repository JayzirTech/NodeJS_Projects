import "/src/styles/globals.css";
import Swal from 'sweetalert2'

const noteInput = document.getElementById('inputNote');
const notesForm = document.getElementById('notesForm');
const notesList = document.getElementById('notesList');

console.log(noteInput, notesForm, notesList);

let notesArray = JSON.parse(localStorage.getItem('myNotes')) || [];

console.log(notesArray);


notesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (noteInput.value.trim() === '') {
        errorBlankNoteAlert();
        notesForm.reset();
        return;
    }

    const textNoteInput = capitalizeText(noteInput.value.trim());

    if (notesArray.includes(textNoteInput)) {
        errorDuplicateNoteAlert();
        notesForm.reset();
        noteInput.focus();
        return;
    }

    notesArray.push(textNoteInput);

    localStorage.setItem('myNotes', JSON.stringify(notesArray));

    renderNotes();

    noteAddedAlert();

    console.log(`Note Added! (${textNoteInput})`);

    notesForm.reset();
    noteInput.focus();
});

function errorBlankNoteAlert() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Oops! You can't save a blank note.",
    });
}

function noteAddedAlert() {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Note Added",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#1e293b',
        color: '#f1f5f9',
    });
}

function noteDeletedAlert() {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "Note Deleted",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#1e293b',
        color: '#f1f5f9',
    });
}

function errorDuplicateNoteAlert() {
    Swal.fire({
        icon: "warning",
        title: "This note already exists",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#1e293b',
        color: '#f1f5f9',
    });
}

function capitalizeText(text) {
    if (!text) return "";

    // 1. We convert everything to lowercase first to clean up the text.
    // 2. We split the text into an array using the period "." as a separator.
    return text.toLowerCase().split('.').map(oracion => {
        // We remove unnecessary whitespace at the beginning or end of the sentence
        const oracionLimpia = oracion.trim();

        if (oracionLimpia.length === 0) return "";

        // We take the first letter, capitalize it, and paste the rest of the phrase onto it.
        return oracionLimpia.charAt(0).toUpperCase() + oracionLimpia.slice(1);
    }).join('. '); // We rejoin the entire arrangement with a period and a space
}

function renderNotes() {
    notesList.innerHTML = '';

    for (const note of notesArray) {
        const newLi = document.createElement('li');
        newLi.className = "flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl gap-4";

        const oneNote = capitalizeText(note.trim());
        const textNote = document.createElement('span');
        textNote.textContent = oneNote;
        textNote.className = "text-sm text-slate-200 break-all";

        const deleteButton = document.createElement('button');
        deleteButton.className = "text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all";
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            notesList.removeChild(newLi);

            notesArray = notesArray.filter(n => n !== oneNote);

            localStorage.setItem('myNotes', JSON.stringify(notesArray));

            noteDeletedAlert();
            console.log(`Note Deleted! (${oneNote})`);
        });

        newLi.appendChild(textNote);
        newLi.appendChild(deleteButton);

        notesList.appendChild(newLi);
    }
}

renderNotes();