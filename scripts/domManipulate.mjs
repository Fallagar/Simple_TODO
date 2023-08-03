import { cloneArchiveNoteButton, cloneNotesTableRow } from "./clone.mjs";
import { cloneAddNoteButton } from "./clone.mjs";
import { cloneRemoveNoteButton } from "./clone.mjs";
import { getNoteFromDB, getSummary, handleArchivate, handleDelete } from "./handle.mjs";


const liveTableBody = document.querySelector("#liveTableBody")
const archiveTableBody = document.querySelector("#archiveTableBody")
const addNoteForm = document.querySelector("#addNoteForm")
const summaryTask = document.querySelector("#summary-task")
const summaryIdea = document.querySelector("#summary-idea")
const summaryThought = document.querySelector("#summary-thought")


// ADD ROW WITH NEW NOTE
export function addNoteNode(data, targetTable = liveTableBody) {
    const node = cloneNotesTableRow()
    const editButton = cloneAddNoteButton()
    editButton.innerText = "Edit"
    editButton.addEventListener("click", (e) => {
        addNoteForm.setAttribute("purpose", "edit"),
        addNoteForm.setAttribute("dbtarget", data.id)    
        const result = getNoteFromDB(data.id)
        populateEditForm(result)
    })
    const removeButton = cloneRemoveNoteButton();
    removeButton.addEventListener("click", (e) => {
        console.log("click")
        const result = handleDelete(data.id);        
        repopulateDOM(result)
    })
    const arhiveButton = cloneArchiveNoteButton()
    arhiveButton.addEventListener("click", (e) => {
        console.log("click")
        const result = handleArchivate(data.id);        
        repopulateDOM(result)
    })
    try {
        const children = [...node.children];        
        children[0].innerText = data.name;
        children[1].innerText = data.created;
        children[2].innerText = data.category;
        children[3].innerText = data.content;
        children[4].innerText = data.dates.join(", ");
        children[5].innerHTML = ""
        children[5].appendChild(arhiveButton)
        children[5].appendChild(editButton)
        children[5].appendChild(removeButton)
        node.setAttribute("noteid", data.id)
        targetTable.appendChild(node)
    } catch (error) {
        alert(error)
        return error
    }
}

// SETTING DEFAULT FIELDS IF EDITING
function populateEditForm(data) {
    console.log(data)
    const name = document.querySelector("#name")
    const category = document.querySelector("#category")
    const content = document.querySelector("#content")
    name.setAttribute("value", data.name)
    console.log(data.category);
    switch (data.category) {        
        case "Task":
            category.selectedIndex = 0;            
            break;
        case "Idea":
            category.selectedIndex = 1;           
            break;
        case ("Random Thought"):            
            category.selectedIndex = 2;
            break;
        default:
            category.selectedIndex = 0;
   }
    content.innerText = data.content;
}

//RESSETTING FIELDS (WHEN MODAL CLOSED OR FORM SENDED)
export function resetFields() {
    const name = document.querySelector("#name")
    const category = document.querySelector("#category")
    const content = document.querySelector("#content")
    
    name.removeAttribute("value")    
   category.removeAttribute("value")
    content.innerText = "";
    console.log("all removed")
}

//REPOPULATE DOM BASED ON DATA
export function repopulateDOM(data) {
    liveTableBody.innerHTML = "";
    archiveTableBody.innerHTML = "";
    data.map((item) => {
        item.status === "live" ? addNoteNode(item) : addNoteNode(item, archiveTableBody)        
    })
    console.log(data)
    const result = getSummary();
    console.log(result)
    populateSummary(result)
}

// SETTING SUMMARY BLOCK
function populateSummary(data) {
    const children = [...summaryTask.children, ...summaryIdea.children, ...summaryThought.children]
    children.map((item, index) => {
        switch (index) {
            case 0:
                break;
            case 1:
                item.innerText = data.taskLive;
                break;
            case 2:
                item.innerText = data.task - data.taskLive;
                break;
            case 3:
                break;
            case 4:
                item.innerText = data.ideaLive;
                break;
            case 5:
                item.innerText = data.idea - data.ideaLive;
                break;
            case 6:
                break;
            case 7:
                item.innerText = data.thoughtLive;
                break;
            case 8:
                item.innerText = data.thought - data.thoughtLive;
                break;
            
        }
        }
    )
}