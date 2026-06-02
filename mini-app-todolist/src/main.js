// Inport the global styles and the SweetAlert2 library for displaying alerts in the application.
import "/src/styles/globals.css";
import Swal from 'sweetalert2'

// Select some elements from the DOM
const noteInput = document.getElementById('inputNote');
const notesForm = document.getElementById('notesForm');
const notesList = document.getElementById('notesList');

// Log the selected elements to the console for debugging purposes
console.log(noteInput, notesForm, notesList);

// Create an array with the notes stored in localStorage
let notesArray = JSON.parse(localStorage.getItem('myNotes')) || [];

console.log(notesArray);

// Add an event listener to the form to handle the submission of new notes
notesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Check if the input is empty or contains only whitespace. If it does, show an error alert, reset the form, and focus the input field again.
    if (noteInput.value.trim() === '') {
        errorBlankNoteAlert();
        notesForm.reset();
        noteInput.focus();
        return;
    }

    // Create a const variable that contains the text of the note, capitalized and without whitespace
    const textNoteInput = capitalizeText(noteInput.value.trim());

    // Check if the note already exists in the array. If it does, show a warning alert, reset the form, and focus the input field again.
    if (notesArray.includes(textNoteInput)) {
        errorDuplicateNoteAlert();
        notesForm.reset();
        noteInput.focus();
        return;
    }

    // Add the new note to the array
    notesArray.push(textNoteInput);

    // Update the localStorage with the new array of notes
    localStorage.setItem('myNotes', JSON.stringify(notesArray));

    // Re-render the list of notes to reflect the new addition
    renderNotes();

    // Show a success alert to indicate that the note has been added
    noteAddedAlert();

    // Log the added note to the console for debugging purposes
    console.log(`Note Added! (${textNoteInput})`);

    notesForm.reset();
    noteInput.focus();
});

// Function to show an error alert when trying to save a blank note
function errorBlankNoteAlert() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Oops! You can't save a blank note.",
    });
}

// Function to show a success alert when a note is added successfully
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

// Function to show an info alert when a note is deleted successfully
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

// Function to show a warning alert when trying to save a duplicate note
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

// Function to capitalize the first letter of each sentence in a given text
function capitalizeText(text) {

    // 1. We convert everything to lowercase first to clean up the text.
    // 2. We split the text into an array using the period "." as a separator.
    return text.toLowerCase().split('.').map(oracion => {
        // We remove unnecessary whitespace at the beginning or end of the sentence
        const clearText = oracion.trim();

        // We take the first letter, capitalize it, and paste the rest of the phrase onto it.
        return clearText.charAt(0).toUpperCase() + clearText.slice(1);
    }).join('. '); // We rejoin the entire arrangement with a period and a space
}

// Function to render the list of notes on the page
function renderNotes() {
    // Clear the current list of notes before rendering the updated list
    notesList.innerHTML = '';

    // Iterate through the array of notes and create a list item for each note
    for (const note of notesArray) {

        // Create a new list item element and set its class for styling
        const newLi = document.createElement('li');
        newLi.className = "flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl gap-4";

        // Create a span element to hold the text of the note, set its content and class for styling
        const oneNote = capitalizeText(note.trim());
        const textNote = document.createElement('span');
        textNote.textContent = oneNote;
        textNote.className = "text-sm text-slate-200 break-all";

        // Create a delete button for each note, set its class for styling and its text content
        const deleteButton = document.createElement('button');
        deleteButton.className = "text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all";
        deleteButton.textContent = 'Delete';

        // Add an event listener to the delete button to handle the deletion of the note when clicked
        deleteButton.addEventListener('click', () => {

            // Remove the note from the DOM
            notesList.removeChild(newLi);

            // Remove the note from the array
            notesArray = notesArray.filter(n => n !== oneNote);

            // Update the localStorage
            localStorage.setItem('myNotes', JSON.stringify(notesArray));

            // Show an alert to indicate that the note has been deleted and log the deleted note
            noteDeletedAlert();
            console.log(`Note Deleted! (${oneNote})`);
        });

        // Append the text of the note and the delete button to the list item
        newLi.appendChild(textNote);
        newLi.appendChild(deleteButton);

        // Append the list item to the notes list in the DOM
        notesList.appendChild(newLi);
    }
}

// Initial rendering of the notes when the page loads
renderNotes();