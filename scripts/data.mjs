import { tableRowTemplate } from "./clone.mjs";
import { controlsTemplate } from "./clone.mjs";

export const mockData = [
    {
        name: "Pavel",
        created: "21 Jul 2022",
        category: "Shopping",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam asperiores perspiciatis quas laborum, obcaecati voluptas sed itaque quod eaque repudiandae molestias. Ipsam provident sunt recusandae, nemo odit nisi quae qui!",
        dates: "21 JUL 2022, 23 AUG 2023",
        status: "live",
        id: "1",
    },
     {
        name: "John",
        created: "22 Jul 2022",
        category: "Thought",
        content: "Bravada",
        dates: "21 JUL 2022, 23 AUG 2023",
         id: "2",
        status: "archived",
    },
     {
        name: "Benedict",
        created: "23 Jul 2022",
        category: "Quote",
        content: "Memento Mori",
        dates: "21 JUL 2022, 23 AUG 2023",
         id: "3",
        status: "live",
    },
     
]


export function initialPopulate(tableID, typeOfData) {    
    const target = document.querySelector(tableID)
    mockData.map((item) => {        
            const insert = tableRowTemplate();            
            const controls = controlsTemplate(item.id)
        insert.setAttribute("targetid", item.id)
            item.status === "archived" && insert.classList.add("hidden")
            const children = [...insert.children]
            children[0].innerText = item.name;
            children[1].innerText = item.created;
            children[2].innerText = item.category;
            children[3].innerText = item.content;
            children[4].innerText = item.dates;
            controls.map((control) => {
                children[5].appendChild(control)
            })
            target.appendChild(insert)        
        })

    return mockData;
    

}

function removeNote(e) {
    e.target.parentNode.remove();
}

// export function addToLive(newData, target) {
//     const node = cloneLiveTableRow();
//     const nodeArr = [...node.children]
//     node.setAttribute("key", newData.id)
//     node.removeAttribute("id")
//     const dataArr = Object.values(newData)
//     nodeArr.forEach((item, index) => {
//         if (index !== 5) {
//             item.innerText = dataArr[index]
//         }
//     })
//     target.appendChild(node)

// }
export function addToLive(newData, target) {    
    const pattern = /\d{2}\/\d{2}\/\d{4}|\d\/\d{2}\/\d{4}/g;
    const matches = newData.content.match(pattern);
    target.innerHTML += `
    <tr id="trToClone">
          <td>${newData.name}</td>
          <td>${newData.time}</td>
          <td>${newData.category}</td>
          <td>${newData.content}</td>
          <td>${matches.map((item) => {
              console.log(item)
              item.replace(",", "1")
              return "<br/>" + item
          }).join("")}</td>
          <td class="deleteNote">Controls</td>
        </tr>
    `
    const notes = document.querySelector(".deleteNote")    
          notes.addEventListener("click", (e) => removeNote(e)) 
}