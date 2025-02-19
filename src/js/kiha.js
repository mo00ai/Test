
    // Firebase SDK 라이브러리 가져오기
    // Firebase SDK 라이브러리 가져오기
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
    import { collection, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
    import { getDocs, getDoc, orderBy, query } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";




    // Firebase 구성 정보 설정
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCJGXMZPnbtTNGSuRrXF5PU36mrE-4iJ-E",
        authDomain: "diporpour-41a58.firebaseapp.com",
        projectId: "diporpour-41a58",
        storageBucket: "diporpour-41a58.firebasestorage.app",
        messagingSenderId: "406083699748",
        appId: "1:406083699748:web:474a53c7f539a18297c4b1"
    };


    // Firebase 인스턴스 초기화
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    const guestbook = collection(getFirestore(app), "guestbook")
    let docs = await getDocs(query(guestbook, orderBy("date", "asc")));
    $('#box').empty();
    docs.forEach((doc) => {
        let row = doc.data();
        //firebase id 불러옴
        let id = doc.id;
        let name = row['name'];
        let text = row['text'];
        let count = row['count'];
        let datenum = row['date'];
        let date = datenum.toDate();

        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);

        var dateString = year + '-' + month + '-' + day;

        // 랜덤 이미지 가져오기
        const imageArray = [
            "blue.jpg",
            "green.jpg",
            "red.jpg",
            "yellow.jpg"
        ];
        const randomImage = `guestImages/${imageArray[Math.floor(Math.random() * imageArray.length)]}`;

        // HTML 템플릿
        let temp_html = `
        <div class="upper">
            <img class="upperImg" src="${randomImage}">
            <input type="text" class="upperName" id="${id}name" value="${name}">
            <input type="text" class="upperText" id="${id}text" value="${text}">
            <span class="upperHeart" id="heartBtn" data-stuff="${id}">🧡</span>
            <span class="upperCount">${count}</span>
        </div>
        <div class="under">
            <span class="underDate">날짜 (${dateString})</span>
            <button class="inputBtn" id="editBtn" data-stuff="${id}">수정</button>
            <button class="inputBtn" id="delBtn" data-stuff="${id}">삭제</button>
        </div>
    `;

        // 박스에 추가
        $('#box').append(temp_html);
        console.log(row);
    });
    // 임의값에 저장한 id를 불러옴

    // 삭제버튼 
    $(document).on('click', '#delBtn', async function (event) {
        let id = event.target.dataset.stuff;

        await deleteDoc(doc(db, 'guestbook', id));
        await window.location.reload();
    })

    // 수정버튼
    $(document).on('click', '#editBtn', async function (event) {
        let id = event.target.dataset.stuff;
        //수정버튼은 컬렉션id를 가지고있으며 이름, text가 입력된 인풋박스는 id에 컬렉션id를 포함하고 있음
        //어떤 인풋박스를 수정할지 인식하기 위해 컬렉션id를 이용함
        let nameString = '#' + id + 'name';
        let textString = '#' + id + 'text';
        let name = $(nameString).val();
        let text = $(textString).val();

        await updateDoc(doc(db, 'guestbook', id), { name: name, text: text });
        await window.location.reload();
    })

    // 좋아요버튼 
    $(document).on('click', '#heartBtn', async function (event) {
        let id = event.target.dataset.stuff;
        let gotdoc = await getDoc(doc(db, "guestbook", id));
        let count = gotdoc.data().count;
        ++count;
        await updateDoc(doc(db, 'guestbook', id), { count: count });
        await window.location.reload();
    })

    //작성버튼튼
    $("#inputBtn").click(async function () {
        let name = $('#name').val();
        let text = $('#text').val();
        let date = new Date();

        let doc = { 'name': name, 'text': text, 'count': 0, 'date': date };

        await addDoc(collection(db, "guestbook"), doc);
        window.location.reload();
    })