import { Item } from "./Item.js";
export class ToDoList {
    itens;
    container;
    constructor() {
        this.itens = [];
        this.container = document.querySelector('.list');
    }
    adicionarItemALista(text) {
        const newItem = new Item(text);
        this.itens.push(newItem);
        this.popularContainer();
    }
    popularContainer() {
        this.container.innerHTML = '';
        this.itens.forEach(item => {
            this.container.innerHTML += `<div class="item ${item.feito ? 'item__ativo' : ''}">
      <div class="item__infos">
        <input type="checkbox" class="item__check" ${item.feito ? 'checked' : ''}>
        <p class="item__text">${item.text}</p>
      </div>
      <button class="item__delete"><img src="images/delete-icon.svg" alt="Botão excluir"></button>
    </div>`;
        });
        this.ativaCheck();
        this.ativaExcluir();
    }
    buscaItem(element) {
        const textElement = element.parentElement.querySelector('.item__text');
        return this.itens.find(item => item.text == textElement.innerHTML);
    }
    ativaCheck() {
        const checkInputs = document.querySelectorAll('.item__check');
        checkInputs.forEach(input => {
            input.addEventListener('click', () => {
                const item = this.buscaItem(input);
                item.feito = input.checked;
                const divElement = input.parentElement.parentElement;
                if (input.checked) {
                    divElement.classList.add('item__ativo');
                }
                else {
                    divElement.classList.remove('item__ativo');
                }
            });
        });
    }
    ativaExcluir() {
        const deleteButtons = document.querySelectorAll('.item__delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const item = this.buscaItem(button);
                this.itens = this.itens.filter(element => element != item);
                this.popularContainer();
            });
        });
    }
}
