const cloneTarget = document.querySelector("#trToClone")


const tableHead = ["Name", "Created", "Category", "Content", "Dates", "Controls"]

export function createSection(sectionName, tableId ) {
    const section = document.createElement("section");
    const table = document.createElement("table");
    table.classList.add("table");       
    const header = document.createElement("div")
    header.innerText = sectionName;
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody")
    tbody.setAttribute("id", tableId)
    const tr = document.createElement("tr");
    tr.classList.add("table-primary")
    tableHead.map((item, index) => {
        const td = document.createElement("td")
        if (index === 3) {
            td.classList.add("col-6")
        }
        if (index === 4) {
            td.classList.add("col-2")
        }
        td.innerText = item;
        tr.appendChild(td)
    })
    thead.appendChild(tr);    
    table.appendChild(thead)
    table.appendChild(tbody)
    section.appendChild(header);
    section.appendChild(table);
    return section;
}


export function tableRowTemplate() {
    const template = document.createElement("tr")
    for (let i = 0; i < 6; i++) {
        const td = document.createElement("td");
        template.appendChild(td)
    }
    return template;
}

export function controlsTemplate(itemID) {
    const archive = document.createElement("span")
    archive.innerText = "_A_"
    archive.addEventListener("click", (e) => toggleRow(itemID))
    const edit = document.createElement("span")
    edit.innerText = "_E_"
    const remove = document.createElement("span")
    remove.innerText = "_R_"
     return [archive, edit, remove]
}

function toggleRow(itemID) {
    const parents = document.querySelectorAll(`[targetid="${itemID}"]`)
    parents.forEach(element => {       
      element.classList.toggle("hidden")
  });
}
