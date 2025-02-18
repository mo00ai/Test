/**
 * 기능
 * 팀원: 추가, 수정, 삭제, 조회
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc, collection,addDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase App Config
const firebaseConfig = {
    apiKey: "AIzaSyCJGXMZPnbtTNGSuRrXF5PU36mrE-4iJ-E",
    authDomain: "diporpour-41a58.firebaseapp.com",
    projectId: "diporpour-41a58",
    storageBucket: "diporpour-41a58.firebasestorage.app",
    messagingSenderId: "406083699748",
    appId: "1:406083699748:web:474a53c7f539a18297c4b1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collection_name = "teamMember";

/** 메모
 * 멤버 무슨 순서로 불러올건지?
 * 사진 불러오기 구현 (로컬 src)
 * 업데이트 - 입력하지 않는경우?
 */

// Read Members
document.addEventListener("DOMContentLoaded", async function () {
    let docs = await getDocs(collection(db, collection_name));
    docs.forEach((doc) => {
        let row = doc.data();
        // 읽어온 데이터 추가
        const memberCard = document.querySelector('#memberCardDiv').insertAdjacentHTML(
            'beforeend',
            `<div class="member" id=${doc.id}>
                <label id="memberBlog">${row.memberBlog}</label><br>
                <label id="memberMBTI">${row.memberMBTI}</label><br>
                <label id="memberName">${row.memberName}</label><br>
                <label id="memberPhoto">${row.memberPhoto}</label><br>
                <label id="passion">${row.passion}</label><br>
                <label>BLOG <input type="text" class="updateMemberBlog"></label><br>
                <label>MBTI <input type="text" class="updateMemberMBTI"></label><br>
                <label>NAME <input type="text" class="updateMemberName"></label><br>
                <label>PHOTO <input type="file" class="updateMemberPhoto" accept=".gif, .jpg, .jpeg,"></label><br>
                <label>PASSION <input type="text" class="updatePassion"></label><br>
                
                <form class="btn-wrapper-form" id="btn-form">
                    <button class="update-btn" type="button">수정</button>
                    <button class="delete-btn" type="button">삭제</button>
                </form>
            </div>
            <p></p>
            `
        )
    });
});


// Create Members
document.querySelector("#create_btn")
    .addEventListener('click', async (e) => {
        let memberInfo = {
            memberBlog: document.querySelector("#inputMemberBlog").value,
            memberMBTI: document.querySelector("#inputMemberMBTI").value,
            memberName: document.querySelector("#inputMemberName").value,
            memberPhoto: document.querySelector("#inputMemberPhoto").value,
            passion: document.querySelector("#inputPassion").value
        };

        await addDoc(collection(db, collection_name), memberInfo);
        console.log('추가 성공');

        window.location.reload();
    });


// Delete Members
document.addEventListener('click', async (e) => {
    if (!e.target.classList.contains("delete-btn")) {
        return;
    }

    let userId = e.target.closest('.member').id;              // 가장 가까운 member 클래스의 userId
    console.log('Delete Target: '+userId);

    await deleteDoc(doc(db, collection_name, userId));      // userId와 일치하는 컬렉션 제거
    console.log('삭제 성공');
    window.location.reload();
});


// Update Members
document.addEventListener('click', async (e) => {
    if (!e.target.classList.contains("update-btn")) {
        return;
    }

    let member = e.target.closest('.member');       // 클릭된 수정 버튼을 포함하는 Member 찾기
    console.log('Update Target: '+member.id);

    let memberUpdateInfo = {
        memberBlog: member.querySelector('.updateMemberBlog').value,
        memberMBTI: member.querySelector('.updateMemberMBTI').value,
        memberName: member.querySelector('.updateMemberName').value,
        memberPhoto: member.querySelector('.updateMemberPhoto').value,
        passion: member.querySelector('.updatePassion').value
    };

    await updateDoc(doc(db, collection_name, member.id), memberUpdateInfo);
    console.log('업데이트 성공: '+memberName);
    window.location.reload();
});