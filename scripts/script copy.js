const body = document.querySelector("body")
const addNoteButton = document.querySelector("#addNoteButton")
const tbodyLive = document.querySelector("#tbodyLive")
const addNoteForm = document.querySelector("#addNoteForm")
import { addToLive } from "./data.mjs";
import { initialPopulate } from "./data.mjs";

let data;
let id = 4;

window.onload = () => {
  data = initialPopulate(tbodyLive)
}

class Note {
    constructor(name, category, content, status, id) {
        this.name = name;
        this.category = category;
        this.content = content;
        this.status = status;
        this.id = id;
        this.time = new Date().toLocaleDateString()
    }
}

addNoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formDataObj = Object.fromEntries(data.entries())
    console.log(formDataObj);
    const note = new Note(...Object.values(formDataObj), "live", id)
    id++;
    console.log(note)
    addToLive(note, tbodyLive)
})




// addNoteButton.addEventListener("click", (e) => {
//     e.preventDefault();    
//     initialPopulate(tbodyLive)
// })

