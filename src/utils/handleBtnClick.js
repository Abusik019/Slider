export function handleBtnClick(e, list){ 
    e.target.classList.toggle('active');
    list.classList.toggle('active');
}