# Audio Folder

## วิธีเพิ่มเพลงพื้นหลัง

1. วางไฟล์เพลงของคุณในโฟลเดอร์นี้
   - รองรับไฟล์: `.mp3`, `.ogg`, `.wav`
   - แนะนำขนาดไฟล์: ไม่เกิน 5-10 MB

2. แก้ไขไฟล์ `index.html` ในบรรทัด 72-74:

```html
<audio id="bgMusic" loop>
    <source src="audio/your-music-name.mp3" type="audio/mpeg">
    <source src="audio/your-music-name.ogg" type="audio/ogg">
</audio>
```

3. แทนที่ `your-music-name` ด้วยชื่อไฟล์เพลงของคุณ

## ตัวอย่าง

หากคุณมีไฟล์ชื่อ `muay-thai-theme.mp3`:

```html
<audio id="bgMusic" loop>
    <source src="audio/muay-thai-theme.mp3" type="audio/mpeg">
</audio>
```

## แหล่งเพลงแนะนำ

- [FreeSound](https://freesound.org/)
- [Incompetech](https://incompetech.com/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Bensound](https://www.bensound.com/)

**หมายเหตุ**: โปรดตรวจสอบลิขสิทธิ์เพลงก่อนนำมาใช้งาน
