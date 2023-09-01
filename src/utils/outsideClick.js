export function outsideClick(e, list, button) {
    if (!e.target.closest('.drop')) {
        list.classList.remove('active')
        button.classList.remove('active')
    }
}
