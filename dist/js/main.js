import { ToDoList } from "./toDoList.js";
const adicionarInput = document.querySelector('.adicionar__input');
const adicionarButton = document.querySelector('.adicionar__button');
const list = new ToDoList();
adicionarButton.addEventListener('click', () => {
    if (adicionarInput.value != '') {
        list.adicionarItemALista(adicionarInput.value);
        adicionarInput.value = '';
    }
});
