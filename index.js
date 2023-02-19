class ShoppingCart extends HTMLElement {
  constructor() {
    super()
    this.items = 0
    this._boundAddItem = this.handleAdd.bind(this)
    this._boundRemoveItem = this.handleRemove.bind(this)
    document.addEventListener('addItem', this._boundAddItem)
    document.addEventListener('removeItem', this._boundRemoveItem)
  }

  handleAdd(event) {
    console.log(event)
    const span = this.shadowRoot.querySelector('#cartItemsNo')
    this.items = this.items + 1
    span.innerText = this.items
  }

  handleRemove(event) {
    console.log(event)
    if (this.items === 0) return
    const span = this.shadowRoot.querySelector('#cartItemsNo')
    this.items = this.items - 1
    span.innerText = this.items
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'})
    const templateContent = document.getElementById(
      'shopping-cart-template'
    ).content
    const clonedContent = templateContent.cloneNode(true)
    shadowRoot.appendChild(clonedContent)
  }

  disconnectedCallback() {
    document.removeEventListener('addItem', this._boundAddItem)
    document.removeEventListener('removeItem', this._boundRemoveItem)
  }
}

customElements.define('shopping-cart', ShoppingCart)
