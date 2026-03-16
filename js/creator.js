// ─── Creator Card Toggle ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.creator-card');

    // ตรวจว่าเป็น touch device จริงหรือไม่
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    function toggleCard(card, e) {
        e.stopPropagation();

        const isAlreadyActive = card.classList.contains('active');

        // ปิดทุก card ก่อน
        cards.forEach(function (c) {
            c.classList.remove('active');
        });

        // ถ้ายังไม่ active → เปิด / ถ้า active อยู่แล้ว → ปิด
        if (!isAlreadyActive) {
            card.classList.add('active');
        }
    }

    cards.forEach(function (card) {

        // Touch devices — ใช้ touchend + preventDefault เพื่อป้องกัน :hover ค้าง
        card.addEventListener('touchend', function (e) {
            e.preventDefault();
            toggleCard(this, e);
        });

        // Mouse devices — ปิด click ไม่ให้ toggle (ใช้แค่ hover)
        card.addEventListener('click', function (e) {
            if (isTouchDevice()) return; // touch device ใช้ touchend แทน
            e.stopPropagation(); // กัน bubble แต่ไม่ toggle
        });
    });

    // แตะนอก card → ปิดทุก card (touch เท่านั้น)
    document.addEventListener('touchend', function () {
        cards.forEach(function (c) { c.classList.remove('active'); });
    });
});