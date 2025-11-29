// PDF 버튼 클릭 이벤트
const pdfButtons = document.querySelectorAll(".pdf-button");
const pdfViewer = document.getElementById("pdf-viewer");
const pdfPlaceholder = document.getElementById("pdf-placeholder");
const currentPdfTitle = document.getElementById("current-pdf-title");
const downloadBtn = document.getElementById("download-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");

let currentPdfUrl = "";

pdfButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const pdfUrl = this.getAttribute("data-pdf");
    const pdfName = this.textContent.trim();

    // 활성 버튼 스타일 변경
    pdfButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    // PDF 로드
    loadPdf(pdfUrl, pdfName);
  });
});

function loadPdf(url, name) {
  currentPdfUrl = url;
  pdfViewer.src = url;
  currentPdfTitle.textContent = name;
  pdfPlaceholder.style.display = "none";
  pdfViewer.style.display = "block";
}

// 다운로드 버튼
downloadBtn.addEventListener("click", function () {
  if (currentPdfUrl) {
    const link = document.createElement("a");
    link.href = currentPdfUrl;
    link.download = currentPdfUrl.split("/").pop();
    link.click();
  } else {
    alert("다운로드할 PDF를 먼저 선택해주세요.");
  }
});

// 전체화면 버튼
fullscreenBtn.addEventListener("click", function () {
  const container = document.querySelector(".pdf-viewer-content");
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  }
});

// 페이지 로드 시 첫 번째 PDF 자동 로드
window.addEventListener("load", function () {
  const firstButton = document.querySelector(".pdf-button.active");
  if (firstButton) {
    const pdfUrl = firstButton.getAttribute("data-pdf");
    const pdfName = firstButton.textContent.trim();
    loadPdf(pdfUrl, pdfName);
  }
});
