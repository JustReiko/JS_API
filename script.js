const accessKey = 'SX69xqfZyPH7xHAfciNsfmd6mdIWqNOCaN1N2rSjE24';
const apiUrl = 'https://api.unsplash.com/photos/random?client_id=' + accessKey;

const imageElement = document.getElementById('image');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('likeButton');
const likeCountElement = document.getElementById('likeCount');

let likeCount = localStorage.getItem('likeCount') || 0;
likeCountElement.textContent = 'Likes: ' + likeCount;

let history = JSON.parse(localStorage.getItem('history')) || [];

async function getRandomImage() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        imageElement.src = data.urls.regular;
        photographerElement.textContent = 'Photographer: ' + data.user.name;

        // Добавляем текущее изображение в историю просмотров
        history.push(data.urls.regular);
        localStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

likeButton.addEventListener('click', () => {
    likeCount++;
    likeCountElement.textContent = 'Likes: ' + likeCount;
    localStorage.setItem('likeCount', likeCount);
});

getRandomImage();