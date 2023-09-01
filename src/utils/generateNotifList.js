export function generateNotificationList(list, notificationList) {

    list.innerHTML = '';

    if (notificationList.length === 0) {
        let newLi = document.createElement('li');
        newLi.innerText = "It's empty here"
        newLi.classList.add('no_notification')
        list.appendChild(newLi)
        const notification_btn = document.querySelector('.notification_btn img');
        notification_btn.setAttribute('src', '../../src/images/no-notification.png');
            
    } else {
        const notification_btn = document.querySelector('.notification_btn img');
        notification_btn.removeAttribute('src');
        notification_btn.setAttribute('src', '../../src/images/notification.png');
        for (let item of notificationList.reverse()) {

            let newLi = document.createElement('li');
            newLi.innerText = String(notificationList.indexOf(item) + 1) + "\n Name: " + item.name + "\n Message: " + item.message + "\n Time: " + item.time;
            newLi.classList.add('notification_list-item')
            newLi.id = item.id;

            list.appendChild(newLi)
        }
    }
}
