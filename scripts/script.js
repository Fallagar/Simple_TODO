const body = document.querySelector("#root")
const addNoteButton = document.querySelector("#addNoteButton")
const tbodyLive = document.querySelector("#tbodyLive")
const addNoteForm = document.querySelector("#addNoteForm")
import { createSection } from "./clone.mjs"
import { initialPopulate } from "./data.mjs"

let mockData = [];

window.onload = () => {
    const section = [createSection("Live", "liveTableBody"), createSection("Archive", "archiveTableBody")]
     const button = document.createElement("button")
    button.addEventListener("click", (e) => {
        console.log("bip")
    })
    button.innerText = "Add Note"    
    body.appendChild(section[0])
    body.appendChild(button)
    body.appendChild(section[1])   
    mockData = initialPopulate("#liveTableBody", "live")   
    mockData = initialPopulate("#archiveTableBody","archived")
    console.log(mockData)
}


