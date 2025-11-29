// 불교 명언 배열
const buddhistQuotes = [
  {
    text: "마음이 모든 것을 이끈다. 마음이 주인이고 마음이 만든다.",
    author: "- 붓다",
  },
  {
    text: "과거에 집착하지 말고, 미래를 꿈꾸지 말라. 마음을 현재에 집중하라.",
    author: "- 붓다",
  },
  {
    text: "분노를 품는 것은 다른 사람에게 던지려고 뜨거운 석탄을 쥐고 있는 것과 같다.",
    author: "- 붓다",
  },
  {
    text: "천 마디의 공허한 말보다, 평화를 가져다 주는 한 마디가 낫다.",
    author: "- 붓다",
  },
  {
    text: "건강이 가장 큰 선물이고, 만족이 가장 큰 부이며, 신뢰가 가장 큰 친구이다.",
    author: "- 붓다",
  },
  {
    text: "당신의 일을 열정적으로 하라. 그러면 당신은 당신을 발견하게 될 것이다.",
    author: "- 붓다",
  },
  {
    text: "우리가 생각하는 것이 우리 자신이다. 우리가 생각하는 모든 것이 우리의 세계를 만든다.",
    author: "- 붓다",
  },
  {
    text: "모든 것은 변한다. 영원한 것은 없다. 이것을 이해하라.",
    author: "- 붓다",
  },
  { text: "고통의 근원은 집착이다.", author: "- 붓다" },
  {
    text: "의심은 가장 큰 적이다. 의심은 사람을 진리로부터 멀어지게 한다.",
    author: "- 붓다",
  },
];
// 페이지 로드 시 실행
window.onload = function () {
  displayRandomQuote();
  displayCurrentDate();
  loadAttendanceData();
  checkTodayAttendance();
};
// 랜덤 명언 표시
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * buddhistQuotes.length);
  const quote = buddhistQuotes[randomIndex];
  document.getElementById("quoteText").textContent = quote.text;
  document.getElementById("quoteAuthor").textContent = quote.author;
}
// 현재 날짜 표시
function displayCurrentDate() {
  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const dateString = today.toLocaleDateString("ko-KR", options);
  document.getElementById("currentDate").textContent = dateString;
}
// 출석 체크 함수
function checkAttendance() {
  const btn = document.getElementById("attendanceBtn");
  const message = document.getElementById("attendanceMessage");

  // 이미 출석했는지 확인
  const todayAttended = localStorage.getItem("attendedToday");
  if (todayAttended === new Date().toDateString()) {
    message.textContent = "오늘은 이미 출석체크를 완료했습니다!";
    message.classList.remove("success");
    return;
  }
  // 출석 처리
  btn.disabled = true;
  message.textContent = "출석체크 완료! 좋은 하루 되세요 😊";
  message.classList.add("success");
  // 로컬 스토리지에 저장
  localStorage.setItem("attendedToday", new Date().toDateString());

  // TODO: 서버에 출석 데이터 전송
  // Example:
  // fetch('/api/attendance', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userId: 'current_user_id', date: new Date() })
  // });
  // 출석 리스트에 현재 사용자 추가
  addAttendanceToList("JuhoCheng", new Date());
  updateUserStats();
}
// 오늘 출석 여부 확인
function checkTodayAttendance() {
  const todayAttended = localStorage.getItem("attendedToday");
  if (todayAttended === new Date().toDateString()) {
    const btn = document.getElementById("attendanceBtn");
    const message = document.getElementById("attendanceMessage");
    btn.disabled = true;
    message.textContent = "오늘은 이미 출석체크를 완료했습니다!";
  }
}
// 출석 데이터 로드 (예시)
function loadAttendanceData() {
  // TODO: 서버에서 오늘의 출석 데이터 가져오기
  // Example:
  // fetch('/api/attendance/today')
  //     .then(response => response.json())
  //     .then(data => {
  //         data.forEach(item => addAttendanceToList(item.nickname, item.time));
  //     });

  // 예시 데이터
  const exampleData = [
    { nickname: "이재현", time: new Date("2025-11-18T06:30:00") },
    { nickname: "김영웅", time: new Date("2025-11-18T07:15:00") },
    { nickname: "이재희", time: new Date("2025-11-18T08:00:00") },
    { nickname: "배찬승", time: new Date("2025-11-18T08:30:00") },
    { nickname: "이호성", time: new Date("2025-11-18T09:00:00") },
  ];
  exampleData.forEach((item) => addAttendanceToList(item.nickname, item.time));
}
// 출석 리스트에 항목 추가
function addAttendanceToList(nickname, time) {
  const list = document.getElementById("attendanceList");
  const currentCount = list.children.length;

  const item = document.createElement("div");
  item.className = "attendance-item";

  const rank = currentCount + 1;
  let rankClass = "";
  if (rank === 1) rankClass = "first";
  else if (rank === 2) rankClass = "second";
  else if (rank === 3) rankClass = "third";

  const timeString = new Date(time).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  item.innerHTML = `
                <div class="attendance-rank ${rankClass}">${rank}</div>
                <div class="attendance-user-info">
                    <div class="attendance-nickname">${nickname}</div>
                    <div class="attendance-time">${timeString}</div>
                </div>
            `;
  list.appendChild(item);
  document.getElementById("attendanceTotal").textContent = rank;
}
// 사용자 통계 업데이트
function updateUserStats() {
  // TODO: 서버에서 사용자 통계 가져오기
  // Example:
  // fetch('/api/user/stats')
  //     .then(response => response.json())
  //     .then(data => {
  //         document.getElementById('totalAttendance').textContent = data.total + '일';
  //         document.getElementById('consecutiveAttendance').textContent = data.consecutive + '일';
  //         document.getElementById('lastAttendance').textContent = data.lastDate;
  //     });

  // 임시로 로컬에서 업데이트
  const currentTotal = parseInt(
    document.getElementById("totalAttendance").textContent
  );
  const currentConsecutive = parseInt(
    document.getElementById("consecutiveAttendance").textContent
  );

  document.getElementById("totalAttendance").textContent =
    currentTotal + 1 + "일";
  document.getElementById("consecutiveAttendance").textContent =
    currentConsecutive + 1 + "일";
  document.getElementById("lastAttendance").textContent =
    new Date().toLocaleDateString("ko-KR");
}
// 프로필 이미지 변경
function changeProfileImage() {
  document.getElementById("profileImageInput").click();
}
document
  .getElementById("profileImageInput")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        document.getElementById("profileImage").src = event.target.result;
        // TODO: 서버에 이미지 업로드
        // Example:
        // const formData = new FormData();
        // formData.append('profileImage', file);
        // fetch('/api/user/profile-image', {
        //     method: 'POST',
        //     body: formData
        // });
      };
      reader.readAsDataURL(file);
    }
  });
// 프로필 이미지 제거 (기본 이미지로)
function resetProfileImage() {
  document.getElementById("profileImage").src = "img/defaultProfile.png";
  // TODO: 서버에 기본 이미지로 변경 요청
  // Example:
  // fetch('/api/user/profile-image/reset', { method: 'DELETE' });
}
