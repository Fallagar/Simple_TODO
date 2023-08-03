const notesTableRow = document.querySelector("#notesTableRow")
const addNoteButton = document.querySelector("#addNoteButton")
const removeNoteButton = document.querySelector("#removeNoteButton")
const archiveNoteButton = document.querySelector("#archiveNoteButton")

export function cloneNotesTableRow() {
    const clone = notesTableRow.cloneNode("full")
    clone.removeAttribute("style")
    clone.removeAttribute("id")
    return clone;
}

export function cloneAddNoteButton() {
    const clone = addNoteButton.cloneNode("full")
    clone.removeAttribute("style")
    clone.removeAttribute("id")    
    return clone;
}
export function cloneRemoveNoteButton() {
    const clone = removeNoteButton.cloneNode("full")
    clone.removeAttribute("style")
    clone.removeAttribute("id")    
    return clone;
}
export function cloneArchiveNoteButton() {
    const clone = archiveNoteButton.cloneNode("full")
    clone.removeAttribute("style")
    clone.removeAttribute("id")    
    return clone;
}



