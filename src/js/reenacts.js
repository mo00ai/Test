// 이미지 파일 배열 (사진 폴더 내부 파일명)
const imageArray = [
    "blue.jpg",
    "green.jpg",
    "red.jpg",
    "yellow.jpg"
];

// 랜덤 이미지 선택
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return `guestImages/${imageArray[randomIndex]}`;
}

// 페이지가 로드될 때 랜덤 이미지 설정
document.addEventListener("DOMContentLoaded", function () {
    const imageElement = document.getElementById("randomImage");
    imageElement.src = getRandomImage();
});