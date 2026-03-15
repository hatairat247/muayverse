// ─── Creator Card Toggle ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.creator-card');

    function toggleCard(card, e) {
        e.stopPropagation();

        const isAlreadyActive = card.classList.contains('active');

        // ปิดทุก card ก่อน
        cards.forEach(function (c) {
            c.classList.remove('active');
        });

        // ถ้ายังไม่ active → เปิด / ถ้า active อยู่แล้ว → ปิด ✅
        if (!isAlreadyActive) {
            card.classList.add('active');
        }
    }

    cards.forEach(function (card) {

        // Touch devices — ใช้ touchend + preventDefault เพื่อป้องกัน :hover ค้าง
        card.addEventListener('touchend', function (e) {
            e.preventDefault(); // ป้องกัน sticky hover และ synthetic click
            toggleCard(this, e);
        });

        // Mouse devices — ใช้ click ปกติ
        card.addEventListener('click', function (e) {
            if (!('ontouchstart' in window)) {
                toggleCard(this, e);
            }
        });
    });

    // แตะนอก card → ปิดทุก card
    document.addEventListener('touchend', function () {
        cards.forEach(function (c) { c.classList.remove('active'); });
    });

    // คลิกนอก card → ปิดทุก card
    document.addEventListener('click', function () {
        if (!('ontouchstart' in window)) {
            cards.forEach(function (c) { c.classList.remove('active'); });
        }
    });
});