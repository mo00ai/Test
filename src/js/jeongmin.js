// import { db } from "./firebaseConfig.js";  // Firebase 설정 가져오기 

const modal = document.getElementById("profileModal");
const modalImage = document.getElementById("modal-image");
const nameInput = document.getElementById("nameInput");
const mbtiInput = document.getElementById("mbtiInput");
const blogInput = document.getElementById("blogInput");
const visionInput = document.getElementById("visionInput");



document.addEventListener("DOMContentLoaded", function () {
    // 메인페이지 팀원 상세정보 모달
    const modal1 = document.getElementById("profileModal");
    const closeModalBtn1 = document.getElementById("closeModalBtn");
    // 메인페이지 팀원 추가 모달
    const modal2 = document.getElementById("profileCreateModal");
    const openModalBtn = document.getElementById("team-add");
    const closeModalBtn2 = document.getElementById("modal_cancelBtn");


    // 모달 내부 요소 가져오기
    const modalImage = document.getElementById("modal-image");
    const nameInput = modal1.querySelector("input[placeholder='이름 입력']");
    const mbtiInput = modal1.querySelector("input[placeholder='MBTI 입력']");


    // 카드 클릭시 이벤트 추가
    document.querySelectorAll(".team-card").forEach((card) => {
        card.addEventListener("click", function (event) {
            // 클릭한 카드에서 정보 가져오기
            console.log("카드 클릭됨",this);

            const imgElement = card.querySelector(".member-image").src;
            const nameElement = card.querySelector(".member-name").innerText;
            const mbtiElement = card.querySelector(".member-mbti").innerText;

            // 모달에 데이터 적용
            modalImage.src = imgElement;
            nameInput.value = nameElement;
            mbtiInput.value = mbtiElement;

            // 모달 열기
            modal1.style.display = "flex";
        });
    });

    // 팀원 추가버튼 클릭시 프로필 모달 열기
    if (openModalBtn && modal2) {
        openModalBtn.addEventListener("click", function () {
            modal2.style.dispaly = "flex";
        });
    }

    // 모달1 닫기 (x클릭시)
    closeModalBtn1.addEventListener("click", closeModal1);

    // 모달2 닫기 (취소 클릭시)
    closeModalBtn2.addEventListener("click", closeModal2);

    // 모달1,2 열려있을 때 ESC키 입력시 닫기
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal1 && modal1.style.display === "flex") {
            closeModal1();
        }
        if (event.key === "Escape" && modal2 && modal2.style.display === "flex") {
            closeModal2();
        }
    });

    // 모달1 닫기 함수
    function closeModal1() {
        if (modal1) modal1.style.display = "none";
    }
    // 모달2 닫기 함수
    function closeModal2() {
        if (modal2) modal2.style.display = "none";
    }
})





