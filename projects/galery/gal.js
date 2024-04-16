const images = [
    "/projects/galery/images/image_1.jpg",
    "/projects/galery/images/image_2.jpg",
    "/projects/galery/images/image_3.jpg",
    "/projects/galery/images/image_5.png"
]

let currentIndex = 0;

const currentImage = document.getElementById('current-image')
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
// обработка нажатия на кнопку вперёд

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length
    currentImage.src = images[currentIndex]
})

prevButton = addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length
    currentImage.src = images[currentIndex]
})