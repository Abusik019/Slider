export default function handleLiClick(e, button, item) {
    button.textContent = item.id === 'none' ? 'Sort by' : item.name;
    const listElements = document.querySelectorAll('.drop_list-item');
  
    for (let el of listElements) {
      if (el === e.target) {
        el.classList.add('active');
        continue;
      }
      el.classList.remove('active');
    }
}