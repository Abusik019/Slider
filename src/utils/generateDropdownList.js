import handleLiClick from "./handleLiClick.js";

export function generateDropdownList(list, button, array, dropList) {
    for (let item of dropList) {
        let newLi = document.createElement('li');
        newLi.innerText = item.name;
        newLi.classList.add('drop_list-item')
        newLi.id = item.id;


        newLi.addEventListener('click', (e) => {
            handleLiClick(e, button, item, array)
        })

        list.appendChild(newLi)
    }
}