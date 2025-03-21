const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // เปลี่ยนจาก 5000 เป็น 3000

// Middleware สำหรับ parsing JSON
app.use(express.json());

// API routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// หากคุณต้องการให้ Express เสิร์ฟไฟล์ static จาก frontend build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// หากคุณต้องการให้ทุก route ที่ไม่ใช่ API ส่งไปที่ React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});