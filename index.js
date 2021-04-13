class Filter {
  constructor(filter) {
    this.filter = filter
    this.cards = null
    this.currentElement = null
    this.currentCategory = null
    this.buttons = this.filter.querySelectorAll('[data-checkbox-button="button"]')
    this.init()
  }

  init() {
    this.clickHandlerFilterButton = this.clickHandlerFilterButton.bind(this)
    this.generateId(this.buttons)
    this.cards = document.querySelectorAll('[data-checkboxid]')
    this.filter.addEventListener('click', this.clickHandlerFilterButton)

    this.buttons[0].classList.add('active')
  }

  clickHandlerFilterButton(event) {
    let target = event.target    
    const select = this.findParentBySelector(
      target,
      '[data-checkbox-button="button"]'
    )
    const {checkboxid,id} = select.dataset
    if (checkboxid === 'all') {
      // remove all other checkboxes
      this.filter.querySelectorAll('[data-checkbox-button="button"]').forEach(el => {
        if (el.dataset.checkboxid !== "all") el.classList.remove('active')
      });
      this.currentElement = this.filter.querySelector('[data-checkboxid="all"]')
      if (this.isOpen(this.currentElement)) {
        this.currentElement.classList.remove('active')
        this.cards.forEach(card => {
          card.classList.add('hide')
        })
      } else {
        this.currentElement.classList.add('active')
        this.cards.forEach(card => {
          card.classList.remove('hide')
        })
      }
    } else {
      // remove show all checkbox if exists
      if (this.isOpen(this.buttons[0])) {
        this.buttons[0].classList.remove('active')
        this.cards.forEach(card => {
          card.classList.add('hide')
        })
      }
      this.currentElement = this.filter.querySelector(`[data-id="${id}"]`)
      this.currentCategory = checkboxid
      this.toggle(this.currentElement)
    }
  }

  isOpen(el) {
    return el.classList.contains('active')
  }

  toggle(el) {
    this.isOpen(el) ? this.close(el) : this.open(el)
  }

  open(el) {
    el.classList.add('active')
    this.cards.forEach(card => {
      const {checkboxid} = card.dataset
      if (checkboxid === this.currentCategory) {
        card.classList.remove('hide')
      }
    })
  }

  close(el) {
    el.classList.remove('active')
    this.cards.forEach(card => {
      const {checkboxid} = card.dataset
      if (checkboxid === this.currentCategory) {
        card.classList.add('hide')
      }
    })
  }


  select(id) {
    const currentElement = this.filter.querySelector(`[data-id="${id}"]`)
    this.currentElement = currentElement
  }

  generateId(elements) {
    elements.forEach((el) => {
      let id = Math.random().toString(36).substring(7) // generate uniq id for questions
      el.dataset.id = id
    })
  }

  collectionHas(a, b) {
    //helper function (see below)
    for (let i = 0, len = a.length; i < len; i++) {
      if (a[i] == b) return true
    }
    return false
  }

  findParentBySelector(elm, selector) {
    const all = document.querySelectorAll(selector)
    let cur = elm
    while (cur && !this.collectionHas(all, cur)) {
      //keep going up until you find a match
      cur = cur.parentNode //go up
    }
    return cur //will return null if not found
  }

}



function callFilterCase() {
  const filterAll = document.querySelectorAll('[data-checkbox="main"]')
  if (filterAll) filterAll.forEach(filter => new Filter(filter))
}

callFilterCase()

