import { handleForm, seed } from "./handle.mjs"
import { addNoteNode } from "./domManipulate.mjs"
import { getData } from "./data.mjs"
import { setData } from "./data.mjs"
import { resetFields } from "./domManipulate.mjs"
import { repopulateDOM } from "./domManipulate.mjs"


window.onload = () => {
    // MODAL OBSERVER
    const addNoteModal = document.querySelector("#addNoteModal")
    const addNoteForm = document.querySelector("#addNoteForm")
    const modalCloseButton = document.querySelector("#modalCloseButton")
    const observer = new MutationObserver((mutationsList, observer) => {      
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const updatedStyle = addNoteModal.getAttribute('style');
          if (updatedStyle === "display: none;") {              
                addNoteForm.setAttribute("purpose", "add")
                addNoteForm.removeAttribute("dbtaget") 
                resetFields()
            }            
                
        }
      }
    });
    const config = { attributes: true, attributeFilter: ['style'] };
    observer.observe(addNoteModal, config);
    // END OF MODAL OBSERVER
  
  // INITIAL SEED
    const seeded = seed()    
    setData(seeded)
    const data = getData()    
    repopulateDOM(data);
    
  //FORM HANDLER
    addNoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries())
        const newNote = handleForm(formDataObj, addNoteForm)
        repopulateDOM(newNote)
        modalCloseButton.click()
    })

}
