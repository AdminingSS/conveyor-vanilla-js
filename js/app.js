window.addEventListener('load', function () {
  const modal = document.getElementById('modal')
  const modalBodyElem = modal.querySelector('.modal__body')
  const modalCloseTrigger = modal.querySelector('.modal__close')

  const closeModal = event => {
    if (event.currentTarget === modal && event.target !== event.currentTarget) return

    modalBodyElem.innerHTML = ''
    modal.classList.remove('open')
  }

  modalCloseTrigger.addEventListener('click', closeModal)
  modal.addEventListener('click', closeModal)

  const dropdowns = document.querySelectorAll('.js-dropdown')

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.js-dropdown__trigger')

    const dropdownClose = event => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('open')
      }
    }

    const dropdownToggle = () => {
      dropdown.classList.toggle('open')
    }

    document.addEventListener('click', dropdownClose)

    trigger.addEventListener('click', dropdownToggle)
  })

  const controlledInputs = document.querySelectorAll('.js-controlled-input')

  controlledInputs.forEach(input => {
    const decrementButton = input.querySelector('.controlled-input__decrement')
    const incrementButton = input.querySelector('.controlled-input__increment')
    const inputField = input.querySelector('.controlled-input__input')

    const checkButtons = () => {
      if (inputField.value >= 100) {
        incrementButton.disabled = true
      } else if (incrementButton.disabled) {
        incrementButton.disabled = false
      }

      if(inputField.value === '0') {
        decrementButton.disabled = true
      } else if (decrementButton.disabled) {
        decrementButton.disabled = false
      }
    }

    const forceInputEvent = () => {
      const event = new Event('input', { bubbles: true });
      inputField.dispatchEvent(event);
    }

    const handleKeyDown = event => {
      if (event.key.match(/[0-9BS]+/g) || ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return event;
      } else {
        event.preventDefault()
      }
    }

    const handleKeyUp = event => {
      if(event.target.value > 100) {
        event.target.value = '100'
        forceInputEvent()
      }
      if(event.target.value === '') {
        event.target.value = '0'
        forceInputEvent()
      }

      checkButtons()
    }

    const handleDecrement = event => {
      event.preventDefault()
      console.log('entered')
      if(inputField.value === '0') return

      inputField.value--

      forceInputEvent()

      checkButtons()
    }

    const handleIncrement = event => {
      event.preventDefault()

      if(inputField.value >= 100) return

      inputField.value++

      forceInputEvent()

      checkButtons()
    }

    checkButtons()

    inputField.addEventListener('keydown', handleKeyDown)
    inputField.addEventListener('keyup', handleKeyUp)

    decrementButton.addEventListener('click', handleDecrement)
    incrementButton.addEventListener('click', handleIncrement)
  })

  const arrowInputs = document.querySelectorAll('.js-arrow-input')

  arrowInputs.forEach(input => {
    const decrementButton = input.querySelector('.arrow-input__arrow_left')
    const incrementButton = input.querySelector('.arrow-input__arrow_right')
    const inputField = input.querySelector('.arrow-input__input span')

    if(inputField.innerHTML === '1') {
      decrementButton.disabled = true
    }

    const checkButtons = () => {
      if(inputField.innerHTML < 100 && incrementButton.disabled) {
        incrementButton.disabled = false
      }

      if(inputField.innerHTML > 1 && decrementButton.disabled) {
        decrementButton.disabled = false
      }
    }

    const handleDecrement = event => {
      event.preventDefault()

      if(inputField.innerHTML === '1') return

      inputField.innerHTML--

      if(inputField.innerHTML === '1') {
        decrementButton.disabled = true
      }

      checkButtons()
    }

    const handleIncrement = event => {
      event.preventDefault()

      if(inputField.innerHTML >= 100) return

      inputField.innerHTML++

      if(inputField.innerHTML >= 100) {
        incrementButton.disabled = true
      }

      checkButtons()
    }

    decrementButton.addEventListener('click', handleDecrement)
    incrementButton.addEventListener('click', handleIncrement)
  })

  const tooltips = document.querySelectorAll('.tooltip')

  function createTooltip(element, text) {
    const tooltip = document.createElement("div")

    let timer

    const tooltipClose = event => {
      if (!element.contains(event.target)) {
        clearTimeout(timer)
        tooltip.style.display = "none"
      }
    }

    tooltip.classList.add("tooltip__text")
    tooltip.textContent = text

    element.appendChild(tooltip)

    document.addEventListener('click', tooltipClose)

    element.addEventListener("mouseover", () => {
      tooltip.style.display = "block"
    });

    element.addEventListener("mouseout", () => {
      tooltip.style.display = "none"
    });

    element.addEventListener("click", () => {
      tooltip.style.display = "block"

      timer = setTimeout(() => {
        tooltip.style.display = "none"
      }, 5000)
    })
  }

  tooltips.forEach(tooltipElem => {
    const text = tooltipElem.dataset.tooltip || ''

    createTooltip(tooltipElem, text)


  })

  const orderForm = document.getElementById('orderForm')
  const submitButton = orderForm.querySelector('.form-submit')
  const amountElem = document.getElementById("amount")

  const checkSubmitButton = () => {
    submitButton.disabled = amountElem.value === '0';
  }

  checkSubmitButton()

  amountElem.addEventListener("input", checkSubmitButton)

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const mobileAdditionalOptionsElem = document.getElementById("additionalOptionsMobile")
    const desktopAdditionalOptionsElem = document.getElementById("additionalOptionsDesktop")
    const isDesktop = window.getComputedStyle(desktopAdditionalOptionsElem).getPropertyValue('display') !== 'none'
    const data = {}
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData)
    if (formObject.beltWidth === 'custom') {
      data.beltWidth = document.getElementById('beltWidthCustom').innerHTML
    } else {
      data.beltWidth = formObject.beltWidth
    }

    data.bedSectionLength = document.getElementById('bedSectionLength').innerHTML

    if (isDesktop) {
      const checkboxes = desktopAdditionalOptionsElem.querySelectorAll('input[name="additionalOptionsDesktop[]"]:checked')
      data.additionalOptions = Array.from(checkboxes).map(checkbox => checkbox.value)
    } else {
      const checkboxes = mobileAdditionalOptionsElem.querySelectorAll('input[name="additionalOptionsMobile[]"]:checked')
      data.additionalOptions = Array.from(checkboxes).map(checkbox => checkbox.value)
    }

    data.amount = amountElem.value

    alert(JSON.stringify(data))
  });
})
