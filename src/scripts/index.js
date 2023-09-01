import {outsideClick} from "../utils/outsideClick.js";
import {generateDropdownList} from "../utils/generateDropdownList.js";
import {handleBtnClick} from "../utils/handleBtnClick.js";
import { dropdownMenu } from "../utils/dropdownMenu.js";
import show_notification from "../utils/notification.js";
import { generateNotificationList } from "../utils/generateNotifList.js";

const button = document.getElementById('sort_btn');
const list = document.getElementById('drop_list');
const files = document.querySelector('.files');
const burgerBtn = document.getElementById('burger_btn');
const notification_btn = document.getElementById('notification_btn');
const notifications_received = document.getElementById('notifications_received');
const createNotification = document.getElementById('create_button');

const array = [
  {
    name: 'File 2',
    type: 'pdf',
    date: new Date()
  },
  {
    name: 'File 3',
    type: 'word',
    date: new Date()
  },
  {
    name: 'File 4',
    type: 'pdf',
    date: new Date()
  },
  {
    name: 'File 5',
    type: 'txt',
    date: new Date()
  },
  {
    name: 'File 6',
    type: 'word',
    date: new Date()
  },
  {
    name: 'File 7',
    type: 'txt',
    date: new Date('Thu Aug 15 2023 09:22:44 GMT+0300 (Москва, стандартное время)')
  },
]

const dropList = [
  {
    id: 'none',
    name: 'No',
    click: (name) => {
      alert(name);
    }
  },
  {
    id: 'name',
    name: 'Name',
    click: (name) => {
      alert(name);
    }
  },
  {
    id: 'type',
    name: 'Type',
    click: (name) => {
      alert(name);
    }
  },
  {
    id: 'date',
    name: 'Date',
    click: (name) => {
      alert(name);
    }
  },
]

const notification_array = [
  {
    id: '02394',
    name: 'Ivan',
    message: 'Where are you, bro?',
    time: '13:32'
  },
  {
    id: '06536',
    name: 'Sarah',
    message: 'Good job.',
    time: '14:51'
  },
  {
    id: '35546',
    name: 'Ebay',
    message: "Buy this phone with 30% discount",
    time: '14:59'
  },
  {
    id: '53654',
    name: 'Gale',
    message: "Let's go for a walk!",
    time: '17:03'
  }
]

createNotification.addEventListener("click", () => {
  const newItem = {
    id: '53654',
    name: 'Gale',
    message: "Let's go for a walk!",
    time: '17:03'
  }
  notification_array.push(newItem);
  generateNotificationList(notifications_received, notification_array);



  const showNotifiBody = document.getElementById('notification_show--body');
  const newLi = document.createElement('li');

  newLi.innerText = newItem.name;
  newLi.classList.add('notification_item');
  showNotifiBody.appendChild(newLi);

  let closeImg = document.createElement('img');
  closeImg.setAttribute('src', '../../src/images/krestik.png');
  newLi.appendChild(closeImg);

  const timeId = setTimeout(() => { showNotifiBody.removeChild(newLi) }, 5000);

  newLi.addEventListener('click', (e) => {

    console.log(e.target !== closeImg)
    
    if(e.target !== closeImg){
      show_notification(document.getElementById('notification_content'))
    }

    setTimeout(() => {
      showNotifiBody.removeChild(newLi);
      clearTimeout(timeId);
    }, 250)
  })

  // closeImg.addEventListener('click', () => {
  //   showNotifiBody.removeChild(newLi);
  //   clearTimeout(timeId);
  // })

})


// Дописать логику открытия панели уведомлений и переход к нажатому уведомлению
// Добавить к li кнопку удаления уведомления (крестик), при клике на крест только удаляем элемент без открытия уведомлений

window.addEventListener('click', (e) => {

  if (!e.target.closest('.notification_container') && !Array.from(document.querySelectorAll('.notification_item')).includes(e.target)) {
    console.log('remove class')
    document.getElementById('notification_content').classList.remove('active');
  }
})

generateDropdownList(list, button, array, dropList);
generateNotificationList(notifications_received, notification_array);


button.addEventListener("click", (event) => {
  handleBtnClick(event, list);
});

window.addEventListener('click', (e) => {
  outsideClick(e, list, button)
})

// burgerBtn.addEventListener('click', (event) => {
//   dropdownMenu(event.target, document.getElementById('aside'));
// })

notification_btn.addEventListener('click', () => {
  show_notification(document.getElementById('notification_content'))
})



let currentSortField = null;
let currentSortDirection = -1;

function sortByPropertyAscending(arr, propName) {
  return arr.sort((a, b) => {
    if (a[propName] < b[propName]) return -1;
    if (a[propName] > b[propName]) return 1;
    return 0;
  });
}


function handleDeleteFile(e){
  const file = e.target.closest('.files_item')
  file.remove(); 
}


function updateFilesList(array, filter = 'no') {

  files.innerHTML = ''

  if(filter !== 'no'){
    console.log(filter)
    array = sortByPropertyAscending(array, filter);
    console.log(array)
  } 
  


  setTimeout(() => {
    for (let file of array) {

      let newLi = document.createElement('li');
      newLi.classList.add('files_item');
      newLi.innerHTML = `
        <img src='${`./src/images/${file.type}.svg`}'/>
        <p>${file.name}</p>
        <p>${moment(file.date).zone(-120).format('hh:mm, DD.MM.YYYY')}</p>
      `;
  
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = ''
      deleteBtn.classList.add('button')
      deleteBtn.addEventListener('click', handleDeleteFile)
  
      newLi.appendChild(deleteBtn)
  
      files.appendChild(newLi);
    }
  }, 1000)

}

document.addEventListener('DOMContentLoaded', () => {
  updateFilesList(array);
});

