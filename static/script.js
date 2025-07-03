document.addEventListener("DOMContentLoaded", () => {
    // Select the result title and table rows
    const resultTitle = document.querySelector(".result-title");
    const tableRows = document.querySelectorAll(".result-table tbody tr");

    // Use requestAnimationFrame to synchronize animations
    requestAnimationFrame(() => {
        if (resultTitle) {
            resultTitle.classList.add("animate-title");
        }

        tableRows.forEach((row) => {
            row.classList.add("animate-row");
        });
    });

    // Debug: log rows for visibility
    console.debug("Result title and table rows animations synchronized.", { resultTitle, tableRows });
});

// Optional: Add an event listener to highlight hovered rows with a slight animation
const table = document.querySelector(".result-table tbody");
if (table) {
    table.addEventListener("mouseover", (event) => {
        const target = event.target.closest("tr");
        if (target) {
            target.style.transition = "transform 0.2s ease";
            target.style.transform = "scale(1.02)";
        }
    });

    table.addEventListener("mouseout", (event) => {
        const target = event.target.closest("tr");
        if (target) {
            target.style.transform = "scale(1)";
        }
    });
}

// 카드 추가 & 백버튼 처리
document.addEventListener("DOMContentLoaded", () => {
    const cardRow = document.querySelector(".card-row");

    // 5) + 카드 클릭하면 새 사용자 카드 생성
    cardRow.addEventListener("click", (e) => {
    const addCard = e.target.closest(".add-card");
    if (!addCard) return;

    const existing = cardRow.querySelectorAll(".card:not(.add-card)");
    const nextIdx = existing.length + 1;
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `
        <h3>사용자 ${nextIdx}</h3>
        <input type="number" step="0.01" name="grade${nextIdx}" placeholder="학점 (ex: 4.0)">
        <input type="number" name="ibt${nextIdx}" placeholder="IBT 점수 (선택)">
        <input type="number" name="itp${nextIdx}" placeholder="ITP 점수 (선택)">
        <input type="number" step="0.1" name="ielts${nextIdx}" placeholder="IELTS 점수 (선택)">
        <input type="number" step="0.01" name="bonus${nextIdx}" placeholder="가산점 (선택)">
    `;
    cardRow.insertBefore(newCard, addCard);
    });

    // 6) 다시 계산하기 → 이전 페이지(폼)으로 돌아가 입력값 보존
    const backBtn = document.querySelector(".back-button");
    if (backBtn) {
    backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.back();
    });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const warningMessage = document.createElement("p");
    warningMessage.style.color = "red";
    warningMessage.style.display = "none";
    form.insertBefore(warningMessage, form.querySelector("button"));

    form.addEventListener("submit", event => {
    // 매번 현재의 모든 숫자 입력 필드를 가져옴 (동적 추가 반영)
    const inputs = form.querySelectorAll("input[type='number']");

    let hasAnyValue = false;
    let inRange = true;
    warningMessage.textContent = "";

    // 1) 카드 테두리 원복
    form.querySelectorAll(".card").forEach(card => {
        card.style.border = "";
    });

    // 2) 최소 하나 값 입력 여부, 동시에 개별 범위 검사
    inputs.forEach(input => {
        const val = input.value.trim();
        if (val !== "") {
        hasAnyValue = true;
        const num = parseFloat(val);
        const card = input.closest(".card");
        if (!isNaN(num)) {
            const name = input.name;
            if (
            (name.startsWith("grade") && num > 4.3) ||
            (name.startsWith("ibt")   && num > 120) ||
            (name.startsWith("itp")   && num > 677) ||
            (name.startsWith("ielts") && num > 9)
            ) {
            inRange = false;
            card.style.border = "4px solid red";
            }
        }
        }
    });

    if (!hasAnyValue) {
        event.preventDefault();
        warningMessage.textContent = "최소 하나의 사용자에게 값을 입력해야 합니다.";
        warningMessage.style.display = "block";
    }
    else if (!inRange) {
        event.preventDefault();
        warningMessage.textContent = "잘못 입력된 값이 있습니다.";
        warningMessage.style.display = "block";
    }
    else {
        warningMessage.style.display = "none";
    }
    });
});