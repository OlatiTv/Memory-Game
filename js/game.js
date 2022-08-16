const grid = document.querySelector('.grid')

const player = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [
  'brook',
  'chopper',
  'franky',
  'law',
  'luffy',
  'nami',
  'sanji',
  'usopp',
  'zoro'
]

function createElement(tag, className) {
  const element = document.createElement(tag)
  element.className = className
  return element
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card')
  if (disabledCards.length === 18) {
    clearInterval(this.loop)
    setTimeout(() => {
      alert(
        `Congratuation!!, ${player.innerHTML}!! you time was: ${timer.innerHTML} seconds!!`
      )
    }, 500)
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character')
  const secondCharacter = secondCard.getAttribute('data-character')

  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card')
    secondCard.firstChild.classList.add('disabled-card')

    firstCard = ''
    secondCard = ''

    checkEndGame()
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card')
      secondCard.classList.remove('reveal-card')

      firstCard = ''
      secondCard = ''
    }, 500)
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return
  }

  if (firstCard == '') {
    target.parentNode.classList.add('reveal-card')
    firstCard = target.parentNode
  } else if (secondCard == '') {
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode
  }

  checkCards()
}

const createCard = characters => {
  const card = createElement('div', 'card')
  const front = createElement('div', 'face front')
  const back = createElement('div', 'face back')

  front.style.backgroundImage = `url('../images/${characters}.png')`

  card.appendChild(front)
  card.appendChild(back)

  card.addEventListener('click', revealCard)
  card.setAttribute('data-character', characters)

  return card
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters]
  const shuffLedArray = duplicateCharacters.sort(() => Math.random() - 0.5)

  shuffLedArray.forEach(character => {
    const card = createCard(character)
    grid.appendChild(card)
  })
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTimer = +timer.innerHTML
    timer.innerHTML = currentTimer + 1
  }, 1000)
}

window.onload = () => {
  player.innerHTML = localStorage.getItem('player')
  startTimer()
  loadGame()
}
