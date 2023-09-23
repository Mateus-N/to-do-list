import { Item } from "./Item.js";

export class ToDoList {
  private itens: Item[];
  private container: HTMLElement;

  constructor() {
    this.itens = []
    this.container = document.querySelector('.list')
  }

  public adicionarItemALista(text: string): void {
    const newItem = new Item(text);
    this.itens.push(newItem);
    this.popularContainer()
  }

  private popularContainer(): void {
    this.container.innerHTML = ''
    this.itens.forEach(item => {
      this.container.innerHTML += `<div class="item ${item.feito ? 'item__ativo' : ''}">
      <div class="item__infos">
        <input type="checkbox" class="item__check" ${item.feito ? 'checked' : ''}>
        <p class="item__text">${item.text}</p>
      </div>
      <button class="item__delete"><img src="images/delete-icon.svg" alt="Botão excluir"></button>
    </div>`
    })
    this.ativaCheck()
    this.ativaExcluir()
  }

  private buscaItem(element: HTMLElement): Item {
    const textElement: HTMLElement = element.parentElement.querySelector('.item__text')
    return this.itens.find(item => item.text == textElement.innerHTML)
  }

  private ativaCheck(): void {
    const checkInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.item__check')
    checkInputs.forEach(input => {
      input.addEventListener('click', () => {
        const item: Item = this.buscaItem(input)
        item.feito = input.checked
        this.trocaOpacidadeDoItem(input);
      })
    })
  }

  private trocaOpacidadeDoItem(input: HTMLInputElement) {
    const divElement = input.parentElement.parentElement;
    if (input.checked) {
      divElement.classList.add('item__ativo');
    } else {
      divElement.classList.remove('item__ativo');
    }
  }

  private ativaExcluir(): void {
    const deleteButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('.item__delete')
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const item: Item = this.buscaItem(button)
        this.itens = this.itens.filter(element => element != item)
        this.popularContainer()
      })
    })
  }
}
