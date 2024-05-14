// ! Секция получения html элементов
//Кнопка начать игру
let $start = document.querySelector('#start')
//Игровое поле
let $game = document.querySelector('#game')
//Таймер игры
let $timerHeader = document.querySelector('#time-header')
let $time = document.querySelector('#time')
//Элемент инпут
let $gameTimeInput = document.querySelector('#game-time')
// Результат
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')

// ! Секция состояний игры
let score = 0
let isGameStarted = false

// ! Секция полезные утилиты
// Скрыть элемент
function hideElement($el) {
    $el.classList.add('hide')
}
// Показать элемент
function showElement($el) {
    $el.classList.remove('hide')
}

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min
}

// ! Секция обработчиков и входной точки в игру
$start.addEventListener('click', startGame)
$gameTimeInput.addEventListener('input', setGameTime)
$game.addEventListener('click', handleBoxClick)


// ! Секция обработки логики игры
function startGame() {
    isGameStarted = true
    score = 0

    setGameTime()
    $gameTimeInput.setAttribute('disabled', true)
    // Скрыть кнопку
    hideElement($start)
    $game.style.backgroundColor = '#fff'

    //таймер игры
    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0.0) {
         clearInterval(interval)
         endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
        // обновляем все состояния игры для начала новой
    }, 100)
    // генерация игровых объектов
    renderBox()
}

function setGameTime() {
    $time.textContent = +$gameTimeInput.value
    hideElement($resultHeader)
    showElement($timerHeader)
}

function handleBoxClick() {
   if(!isGameStarted) {return}
   if (event.target.dataset.box) {
    score++
    renderBox()
   }
}

function renderBox() {
    // Очищаем игровое поле
    $game.innerHTML = ''
    // Создаем объекты
    let box = document.createElement('div')
    let boxSize = getRandomInt(20,100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
    box.style.left = getRandomInt(0, maxLeft) + 'px'
    box.style.top = getRandomInt(0, maxTop) + 'px'
    box.setAttribute('data-box','true')

    $game.insertAdjacentElement("afterbegin", box)
}

function endGame() {
    isGameStarted = false
    $result.textContent = score.toString()
    hideElement($timerHeader)
    showElement($resultHeader)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    $gameTimeInput.removeAttribute('disabled')
    showElement($start)
}

