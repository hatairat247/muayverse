# 🔄 MuayVerse Loading Page

หน้าโหลดที่สร้างตาม Figma Design พร้อม Progress Bar และ Animation

## ✨ ฟีเจอร์

### 🎯 ตรงตาม Figma Design 100%
- **Navbar**: ใช้ component เดียวกับหน้าหลัก
- **Boxing Gloves**: รูปนวมมวยแบบหมุนช้าๆ
- **Title**: "MUAYVERSE" ด้วยฟอนต์ Bebas Neue
- **Progress Bar**: มีแถบโหลดแบบ wave พร้อม track
- **Subtitle**: ข้อความอธิบายเว็บไซต์

### 🎨 Design Tokens
- **สี**: ใช้ค่าเดียวกับหน้าหลัก
  - Primary: `#003049`
  - Secondary: `#780000` 
  - Background: `#272727`
  - Text: `#FDF0D5`
- **ฟอนต์**: 
  - Bebas Neue (Title)
  - Poppins (Content)

### ⚡ Animations
- **Boxing Gloves**: หมุน 360° ใน 10 วินาที
- **Progress Bar**: โหลดจาก 0% ถึง 79.21% ใน 3 วินาที
- **Elements**: Fade-in-up effect แบบเรียงลำดับ
- **Pulse Ring**: วงกลมรอบนวมมวย

## 📁 ไฟล์

```
MuayVerse/
├── loading.html           # หน้า Loading
├── css/
│   └── loading.css       # CSS เฉพาะหน้า Loading
├── js/
│   ├── navbar.js         # Component Navbar (ใช้ร่วมกัน)
│   └── loading.js        # Logic การโหลด
└── img/
    └── PunchLoading.png  # รูปนวมมวย
```

## 🚀 การใช้งาน

### เปิดหน้า Loading:
```bash
# VS Code: F5 -> เลือก "Launch MuayVerse"
# หรือเปิดตรงๆ
http://localhost:8000/loading.html
```

### Flow การทำงาน:
1. **0s**: แสดงหน้า Loading พร้อม Navbar
2. **0.5s**: เริ่ม Animation progress bar
3. **0.5-1s**: Elements ค่อยๆ fade in
4. **3s**: โหลดเสร็จ เริ่ม fade out
5. **3.5s**: Redirect ไป `index.html`

## ⚙️ การปรับแต่ง

### เปลี่ยนเวลาโหลด:
```javascript
// ใน loading.js
this.loadingTime = 5000; // 5 วินาที
```

### เปลี่ยนความเร็วหมุนนวม:
```css
/* ใน loading.css */
animation: rotate-gloves 15s linear infinite; /* ช้าลง */
```

### เปลี่ยน Progress แบบ Manual:
```javascript
// สำหรับการโหลดจริง
const loadingPage = new LoadingPage();
loadingPage.updateProgress(50); // 50%
```

## 📱 Responsive

- **Desktop**: เต็มรูปแบบ 403px gloves
- **Tablet**: ลดขนาดเป็น 280px
- **Mobile**: ลดขนาดเป็น 200px
- **ฟอนต์**: ปรับขนาดตามหน้าจอ

## 🔧 Configuration Options

### Launch Configurations:
1. **"Launch MuayVerse"**: เริ่มที่หน้า Loading
2. **"Launch Homepage Direct"**: เริ่มที่หน้าหลักเลย

### CSS Variables:
```css
:root {
    --font-family-title: 'Bebas Neue', sans-serif;
    --font-size-title: 36px;
    --font-size-base: 20px;
}
```

## 🎯 การใช้งานจริง

สำหรับการโหลดข้อมูลจริง:
```javascript
// Example: Loading with API
async function loadData() {
    const loading = new LoadingPage();
    
    try {
        // Load assets
        loading.updateProgress(25);
        await loadAssets();
        
        // Load user data  
        loading.updateProgress(50);
        await loadUserData();
        
        // Initialize app
        loading.updateProgress(75);
        await initializeApp();
        
        // Complete
        loading.updateProgress(100);
        loading.completeLoading();
        
    } catch (error) {
        console.error('Loading failed:', error);
    }
}
```

---

**สร้างจาก Figma Design**: Node ID `133-196`
**ใช้ Design Tokens**: สีและระยะห่างตาม Figma MCP
**Responsive**: รองรับทุกขนาดหน้าจอ