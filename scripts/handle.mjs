
import { getData} from "./data.mjs"
import { setData } from "./data.mjs"
import { resetFields } from "./domManipulate.mjs";
import { getId } from "./data.mjs";
import { increaseId } from "./data.mjs";

export const mockData = [
  {
    name: "Do push-ups",
    created: "21 Jun 2022",
    category: "Task",
    content: "And I really mean it!",
    status: "live",
    id: "1",
  },
  {
    name: "Came to mind",
    created: "22 Jun 2022",
    category: "Random Thought",
    content: "Do androids dream about electric ship?",
    status: "live",
    id: "2",
  },
  {
    name: "Dentist appointment",
    created: "23 Jun 2022",
    category: "Idea",
    content: "Should sign up for an appointment with dentist. 01/11/2023 through 07/11/2023 will be the best",
    status: "live",
    id: "3",
  },
  // Additional items
  {
    name: "Buy groceries",
    created: "01 Jul 2023",
    category: "Task",
    content: "Milk, eggs, bread, and fruits",
    status: "live",
    id: "4",
  },
  {
    name: "Read a book",
    created: "02 Jul 2023",
    category: "Task",
    content: "Finish reading 'The Great Gatsby'. 01/09/2023",
    status: "live",
    id: "5",
  },
  {
    name: "Plan vacation",
    created: "03 Jul 2023",
    category: "Idea",
    content: "Consider a trip to Europe in the summer. 10/08/2023 - 20/08/2023",
    status: "live",
    id: "6",
  },
  {
    name: "Exercise routine",
    created: "04 Jul 2023",
    category: "Task",
    content: "Go for a run every morning. 05/08/2023 - 31/08/2023",
    status: "live",
    id: "7",
  },
  {
    name: "Pay bills",
    created: "05 Jul 2023",
    category: "Task",
    content: "Electricity bill due 15/08/2023. Internet bill due 20/08/2023",
    status: "live",
    id: "8",
  },
  {
    name: "Complete project",
    created: "01 Jul 2023",
    category: "Task",
    content: "Finish the project by 31/08/2023",
    status: "live",
    id: "9",
  },
];

//CLASS FOR NOTE
class Note {
    constructor(name, category, content, status, created, id = false) {
        this.name = name;
        this.category = category;
        this.content = content;
        this.status = status;
        this.id = id || this.getUniqueID()
        this.dates = this.getDates(content)
        this.created = created || new Date().toLocaleDateString("en-GB", {month: "short", day: "numeric", year: "numeric"})
    }
    getDates(string) {
        const pattern = /\d{2}\/\d{2}\/\d{4}|\d\/\d{2}\/\d{4}/g;
        const matches = string.match(pattern);
        console.log(matches)
        return matches || [];
    }
    setDates(string) {
        this.dates = this.getDates(string)
    }
    getUniqueID() {
        const id = getId()
        increaseId()
        return id;
    }    
}

//CLASS FOR SUMMARY
class Summary {
    constructor() {
        this.idea = 0;
        this.ideaLive = 0;
        this.thought = 0;
        this.thoughtLive = 0;
        this.task = 0;
        this.taskLive = 0;        
    }
    setIdea() {
        this.idea++;
    }
    setIdeaLive() {
        this.idea++;
        this.ideaLive++
    }
    setThought() {
        this.thought++;
    }
    setThoughtLive() {
        this.thought++;
        this.thoughtLive++;
    }
    setTask() {
        this.task++;
    }
    setTaskLive() {
        this.task++;
        this.taskLive++;
    }
}


//INITIAL SEED FUNCTION
export function seed() {    
    const seedData = mockData.map((note) => {
        const newNote = new Note(note.name, note.category, note.content, note.status, note.created)
        return newNote;
    })    
    return seedData;
}

// HANDLE FORM FUNCTION
export function handleForm(formData, form) {
    try {
    const purpose = form.getAttribute("purpose");
        if (purpose === "add") {
            const note = new Note(formData.name, formData.category, formData.content, "live")        
            const fetchData = getData()
            const newData = setData([...fetchData, note])        
            resetFields()
            return newData
        }
        if (purpose === "edit") {
            const result = handleFormEdit(formData, form)
            resetFields()
            return result;
        } else {
            throw new Error("Form error")
        }
    } catch (error) {
        alert(error)
        return getData();
    }   
}

//EDIT NOTE FUNCTION
export function handleFormEdit(formData, form) {
    try {
        const target = form.getAttribute("dbtarget");
        const DB = getData();        
        const index = DB.findIndex((element) => element.id === +target)             
        if (index >= 0 && index < DB.length) {
            console.log("index is", DB[index])
            DB[index].name = formData.name
            DB[index].content = formData.content
            DB[index].category = formData.category
            DB[index].setDates(formData.content)
            console.log("changed is", DB[index])
            const result = setData(DB)
            return result
        }
    } catch (error) {
       alert(error)
        return getData();
    }
}

//GET TARGET NOTE CONTENT FOR POPULATING EDIT FIELDS
export function getNoteFromDB(noteID) {    
    try {
        const DB = getData();
    const filtered = DB.filter((e) => e.id === noteID)
    return filtered[0];
    } catch (error) {
       alert(error)
        return getData();
    }
}

//REMOVE NOTE FUNCTION
export function handleDelete(noteID) {
    try {
    const DB = getData();
    const filtered = DB.filter((e) => e.id !== noteID)
    const updated = setData(filtered)
        return updated;
    } catch (error) {
    alert(error)
    return getData();
    }
}

//ARCHIVATE FUNCTION
export function handleArchivate(noteID) {
    try {
     const DB = getData();
    const targetIndex = DB.findIndex((e) => e.id === noteID)
    DB[targetIndex].status = DB[targetIndex].status === "live" ? "archived" : "live"
    const updated = setData(DB)
    return updated;    
    } catch (error) {
       alert(error)
        return getData();
    }
}

//GET SUMMARY OF NOTES 
export function getSummary() {
    try {
    const DB = getData();
    const summary = new Summary;
    DB.map((item) => {
        if (item.category === "Idea") {
            if (item.status === "live") {
                summary.setIdeaLive()
            } else {
                summary.setIdea();
            }
        }
        else if (item.category === "Random Thought") {
            if (item.status === "live") {
                summary.setThoughtLive()
            } else {
                summary.setThought();
            }
        }
        else if (item.category === "Task") {
            if (item.status === "live") {
                summary.setTaskLive()
            } else {
                summary.setTask();
            }
        }
    })
        return summary;
        } catch (error) {
       alert(error)
        return getData();
    }
}
