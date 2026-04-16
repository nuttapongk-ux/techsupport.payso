// =============================================
// Help Center - Article Content Data
// =============================================

const ARTICLES = {
    "getting-started-payso": {
        id: "getting-started-payso",
        category: "เริ่มต้นใช้งาน",
        categoryIcon: "fa-rocket",
        title: "เริ่มต้นใช้งาน Payso",
        breadcrumb: "เริ่มต้นใช้งาน",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">คู่มือฉบับนี้อธิบายวิธีการสมัครใช้งานระบบรับชำระเงิน Payso ตั้งแต่การสมัครบัญชีร้านค้า การกรอกข้อมูล การยื่นเอกสาร ไปจนถึงการเปิดใช้งานระบบ เพียง <strong>3 ขั้นตอนหลัก</strong></p>
            
            <p><strong>คู่มือนี้เหมาะสำหรับ:</strong> Merchant และ Admin ที่ต้องการเปิดบัญชีร้านค้ากับ Payso</p>
            
            <p class="highlight-text"><strong>ผลลัพธ์ที่คาดหวัง:</strong> ร้านค้าสามารถเริ่มรับชำระเงินผ่าน Payso ได้อย่างสมบูรณ์</p>

            <h2>ข้อกำหนดเบื้องต้น (Prerequisites)</h2>
            <p>ก่อนเริ่มต้นสมัคร กรุณาเตรียมข้อมูลและเอกสารต่อไปนี้ให้พร้อม:</p>
            <ul>
                <li><strong>อีเมลที่ใช้งานได้จริง</strong> สำหรับใช้เป็นชื่อผู้ใช้ในการลงทะเบียน</li>
                <li><strong>เบอร์โทรศัพท์</strong>ที่สามารถติดต่อได้</li>
                <li><strong>ชื่อร้านค้า</strong> และรายละเอียดธุรกิจ (ประเภทสินค้าหรือบริการที่ขาย)</li>
                <li><strong>ช่องทางการขาย</strong> (เช่น เว็บไซต์, Facebook, Instagram, LINE OA, หน้าร้าน)</li>
                <li><strong>เอกสารประกอบธุรกิจ</strong></li>
                <li><strong>ข้อมูลบัญชีธนาคาร</strong>สำหรับรับเงินจาก Payso</li>
            </ul>

            <h2>ขั้นตอนที่ 1: ลงทะเบียนบัญชีร้านค้า</h2>
            <ol>
                <li>เข้าไปที่เว็บไซต์ <a href="#">Payso Merchant Portal</a></li>
                <li>คลิกปุ่ม <strong>"สมัครใช้งาน"</strong></li>
                <li>กรอกข้อมูลเบื้องต้น:
                    <ul>
                        <li>อีเมล</li>
                        <li>รหัสผ่าน</li>
                        <li>ชื่อร้านค้า</li>
                        <li>เบอร์โทรศัพท์</li>
                    </ul>
                </li>
                <li>ยืนยันอีเมลโดยคลิกลิงก์ที่ส่งไปยังอีเมลของท่าน</li>
            </ol>

            <h2>ขั้นตอนที่ 2: กรอกข้อมูลและยื่นเอกสาร</h2>
            <p>หลังจากยืนยันอีเมลสำเร็จ ให้เข้าสู่ระบบและกรอกข้อมูลเพิ่มเติม:</p>
            <ul>
                <li>ข้อมูลธุรกิจ (ประเภทธุรกิจ, รายละเอียดสินค้า/บริการ)</li>
                <li>ข้อมูลผู้ติดต่อ</li>
                <li>ข้อมูลบัญชีธนาคาร</li>
                <li>อัปโหลดเอกสารประกอบธุรกิจ</li>
            </ul>

            <h2>ขั้นตอนที่ 3: รอการอนุมัติและเปิดใช้งาน</h2>
            <p>ทีมงาน Payso จะตรวจสอบข้อมูลและเอกสารของท่าน โดยปกติใช้เวลาประมาณ <strong>1-3 วันทำการ</strong></p>
            <ul>
                <li>หากข้อมูลครบถ้วน — ระบบจะเปิดใช้งานให้อัตโนมัติ</li>
                <li>หากต้องการข้อมูลเพิ่มเติม — ทีมงานจะติดต่อผ่านอีเมลที่ลงทะเบียน</li>
            </ul>

            <div class="article-tip">
                <div class="tip-icon"><i class="fas fa-lightbulb"></i></div>
                <div class="tip-content">
                    <strong>เคล็ดลับ:</strong> เตรียมเอกสารให้ครบถ้วนก่อนเริ่มสมัคร จะช่วยให้กระบวนการอนุมัติเร็วขึ้น
                </div>
            </div>
        `
    },

    "documents-activation": {
        id: "documents-activation",
        category: "เริ่มต้นใช้งาน",
        categoryIcon: "fa-rocket",
        title: "เอกสารประกอบการเปิดใช้งาน",
        breadcrumb: "เริ่มต้นใช้งาน",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">รายการเอกสารที่จำเป็นสำหรับการเปิดใช้งานระบบ Payso แบ่งตามประเภทธุรกิจ</p>

            <h2>เอกสารสำหรับบุคคลธรรมดา</h2>
            <ul>
                <li>สำเนาบัตรประชาชน (ด้านหน้าและด้านหลัง)</li>
                <li>สำเนาหน้าบัญชีธนาคาร (Book Bank)</li>
                <li>ภาพถ่ายหน้าร้านหรือสินค้า</li>
                <li>ลิงก์เว็บไซต์หรือ Social Media ที่ใช้ขาย</li>
            </ul>

            <h2>เอกสารสำหรับนิติบุคคล</h2>
            <ul>
                <li>หนังสือรับรองบริษัท (ไม่เกิน 3 เดือน)</li>
                <li>สำเนาบัตรประชาชนกรรมการผู้มีอำนาจ</li>
                <li>สำเนาหน้าบัญชีธนาคาร (ชื่อบริษัท)</li>
                <li>ใบจดทะเบียนภาษีมูลค่าเพิ่ม (ภ.พ. 20) ถ้ามี</li>
                <li>ลิงก์เว็บไซต์หรือ Social Media ที่ใช้ขาย</li>
            </ul>

            <h2>ข้อควรทราบ</h2>
            <div class="article-tip">
                <div class="tip-icon"><i class="fas fa-info-circle"></i></div>
                <div class="tip-content">
                    <strong>หมายเหตุ:</strong> เอกสารทุกฉบับต้องลงลายมือชื่อรับรองสำเนาถูกต้อง และเหลืออายุไม่ต่ำกว่า 3 เดือน
                </div>
            </div>
        `
    },

    "merchant-control-permission": {
        id: "merchant-control-permission",
        category: "เริ่มต้นใช้งาน",
        categoryIcon: "fa-rocket",
        title: "กำหนดสิทธิ์การใช้งาน Merchant Control",
        breadcrumb: "เริ่มต้นใช้งาน",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">วิธีการตั้งค่าสิทธิ์การเข้าถึงเมนูต่างๆ ใน Merchant Control สำหรับผู้ใช้งานแต่ละราย</p>

            <h2>ภาพรวมระบบสิทธิ์</h2>
            <p>ระบบ Merchant Control รองรับการกำหนดสิทธิ์แบบ Role-Based Access Control (RBAC) ซึ่งสามารถ:</p>
            <ul>
                <li>สร้าง Role (บทบาท) ตามหน้าที่ที่ต้องการ</li>
                <li>กำหนดเมนูที่แต่ละ Role สามารถเข้าถึงได้</li>
                <li>มอบหมาย Role ให้กับผู้ใช้งานแต่ละคน</li>
            </ul>

            <h2>ขั้นตอนการกำหนดสิทธิ์</h2>
            <ol>
                <li>เข้าสู่ระบบ Merchant Control ด้วยบัญชี Admin</li>
                <li>ไปที่เมนู <strong>"จัดการผู้ใช้งาน"</strong></li>
                <li>เลือก <strong>"สร้าง Role ใหม่"</strong> หรือแก้ไข Role ที่มีอยู่</li>
                <li>เลือกเมนูที่ต้องการให้ Role นี้เข้าถึงได้</li>
                <li>บันทึกการตั้งค่า</li>
            </ol>

            <h2>Role เริ่มต้นของระบบ</h2>
            <table class="article-table">
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>คำอธิบาย</th>
                        <th>สิทธิ์</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Admin</strong></td>
                        <td>ผู้ดูแลระบบสูงสุด</td>
                        <td>เข้าถึงทุกเมนู</td>
                    </tr>
                    <tr>
                        <td><strong>Finance</strong></td>
                        <td>ฝ่ายการเงิน</td>
                        <td>ดูรายงาน, ยอดรวม, ประวัติโอนเงิน</td>
                    </tr>
                    <tr>
                        <td><strong>Support</strong></td>
                        <td>ฝ่ายสนับสนุน</td>
                        <td>ดูรายการสั่งซื้อ, จัดการลิงก์ชำระเงิน</td>
                    </tr>
                </tbody>
            </table>
        `
    },

    "connect-website-payso": {
        id: "connect-website-payso",
        category: "การเชื่อมต่อ",
        categoryIcon: "fa-plug",
        title: "เชื่อมต่อเว็บไซต์กับ Payso",
        breadcrumb: "การเชื่อมต่อ",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">คู่มือการเชื่อมต่อเว็บไซต์ของท่านเข้ากับระบบชำระเงิน Payso ผ่าน API</p>

            <h2>วิธีการเชื่อมต่อ</h2>
            <p>Payso รองรับการเชื่อมต่อหลายรูปแบบ:</p>
            <ul>
                <li><strong>Payment Link</strong> — สร้างลิงก์ชำระเงินแล้วส่งให้ลูกค้า</li>
                <li><strong>Payment API</strong> — เชื่อมต่อผ่าน REST API สำหรับระบบที่ต้องการ Customize</li>
                <li><strong>Payment Button</strong> — วางปุ่มชำระเงินบนเว็บไซต์</li>
                <li><strong>Plugin</strong> — ใช้ Plugin สำเร็จรูปสำหรับ WordPress, WooCommerce</li>
            </ul>

            <h2>ขั้นตอนการเชื่อมต่อผ่าน API</h2>
            <ol>
                <li>เข้าสู่ Merchant Portal → เมนู <strong>"API Settings"</strong></li>
                <li>สร้าง API Key และ Secret Key</li>
                <li>ตั้งค่า Webhook URL สำหรับรับ Notification</li>
                <li>ทดสอบด้วย Sandbox Environment</li>
                <li>เปลี่ยนเป็น Production เมื่อพร้อมใช้งาน</li>
            </ol>

            <div class="article-warning">
                <div class="tip-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="tip-content">
                    <strong>สำคัญ:</strong> ห้ามเปิดเผย Secret Key ใน Client-side code หรือ Public Repository
                </div>
            </div>
        `
    },

    "connect-shopify-portone": {
        id: "connect-shopify-portone",
        category: "การเชื่อมต่อ",
        categoryIcon: "fa-plug",
        title: "เชื่อมต่อ Shopify กับ PortOne",
        breadcrumb: "การเชื่อมต่อ",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">ขั้นตอนการเชื่อมต่อร้านค้า Shopify เข้ากับระบบชำระเงิน PortOne</p>

            <h2>สิ่งที่ต้องเตรียม</h2>
            <ul>
                <li>บัญชี Shopify ที่ใช้งานอยู่</li>
                <li>บัญชี PortOne ที่ผ่านการอนุมัติแล้ว</li>
                <li>API Credentials จาก PortOne</li>
            </ul>

            <h2>ขั้นตอนการตั้งค่า</h2>
            <ol>
                <li>เข้าสู่ Shopify Admin Panel</li>
                <li>ไปที่ <strong>Settings → Payments</strong></li>
                <li>เลือก <strong>"Manual payment methods"</strong> หรือติดตั้ง PortOne App</li>
                <li>กรอก API Key และ Secret Key จาก PortOne</li>
                <li>ตั้งค่า Webhook สำหรับรับ Notification</li>
                <li>ทดสอบสั่งซื้อในโหมด Test</li>
            </ol>

            <h2>วิธีการทดสอบ</h2>
            <p>ก่อนเปิดใช้งานจริง ควรทดสอบด้วย:</p>
            <ul>
                <li>สร้าง Test Order บน Shopify</li>
                <li>ตรวจสอบว่า Payment ถูกส่งไปที่ PortOne สำเร็จ</li>
                <li>ตรวจสอบ Webhook Notification</li>
            </ul>
        `
    },

    "connect-peak": {
        id: "connect-peak",
        category: "การเชื่อมต่อ",
        categoryIcon: "fa-plug",
        title: "เชื่อมต่อ PEAK",
        breadcrumb: "การเชื่อมต่อ",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">วิธีการเชื่อมต่อระบบ Payso กับโปรแกรมบัญชี PEAK เพื่อบันทึกรายการอัตโนมัติ</p>

            <h2>ประโยชน์ของการเชื่อมต่อ</h2>
            <ul>
                <li>บันทึกรายการขายอัตโนมัติเข้า PEAK</li>
                <li>ลดการกรอกข้อมูลซ้ำซ้อน</li>
                <li>ข้อมูลการเงินตรงกันทั้ง 2 ระบบ</li>
            </ul>

            <h2>ขั้นตอนการเชื่อมต่อ</h2>
            <ol>
                <li>เข้าสู่ Merchant Portal → <strong>"การตั้งค่า"</strong></li>
                <li>เลือก <strong>"เชื่อมต่อบัญชี"</strong> → PEAK</li>
                <li>Login เข้าบัญชี PEAK ของท่าน</li>
                <li>อนุญาตให้ Payso เข้าถึงข้อมูล</li>
                <li>เลือกบัญชี/สมุดรายวันที่ต้องการบันทึก</li>
                <li>ยืนยันการเชื่อมต่อ</li>
            </ol>
        `
    },

    "dashboard": {
        id: "dashboard",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "แดชบอร์ด (Dashboard)",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">ภาพรวมการใช้งานหน้า Dashboard ใน Merchant Portal</p>

            <h2>ส่วนประกอบของ Dashboard</h2>
            <p>หน้า Dashboard แสดงข้อมูลสรุปสำคัญ ได้แก่:</p>
            <ul>
                <li><strong>ยอดขายวันนี้</strong> — แสดงยอดขายรวมของวันนี้</li>
                <li><strong>จำนวนรายการ</strong> — จำนวน Transaction ทั้งหมดของวันนี้</li>
                <li><strong>ยอดรอโอน</strong> — จำนวนเงินที่รอการโอนเข้าบัญชี</li>
                <li><strong>กราฟยอดขาย</strong> — แสดงแนวโน้มยอดขาย 7 วันย้อนหลัง</li>
            </ul>

            <h2>การกรองข้อมูล</h2>
            <p>สามารถกรองข้อมูลตาม:</p>
            <ul>
                <li>ช่วงเวลา (วันนี้, สัปดาห์นี้, เดือนนี้, กำหนดเอง)</li>
                <li>ช่องทางชำระเงิน</li>
                <li>สถานะการชำระเงิน</li>
            </ul>
        `
    },

    "total-revenue": {
        id: "total-revenue",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "ยอดรวมรายได้",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">วิธีดูรายงานยอดรวมรายได้ใน Merchant Portal</p>

            <h2>การเข้าถึง</h2>
            <p>ไปที่เมนู <strong>"ยอดรวมรายได้"</strong> ใน Sidebar</p>

            <h2>ข้อมูลที่แสดง</h2>
            <ul>
                <li><strong>ยอดรวมทั้งหมด</strong> — ยอดขายสะสมทั้งหมด</li>
                <li><strong>ยอดที่โอนแล้ว</strong> — จำนวนเงินที่โอนเข้าบัญชีแล้ว</li>
                <li><strong>ยอดรอโอน</strong> — จำนวนเงินที่รอดำเนินการ</li>
                <li><strong>ค่าธรรมเนียม</strong> — ค่าธรรมเนียมรวมที่ถูกหัก</li>
            </ul>

            <h2>การ Export รายงาน</h2>
            <p>สามารถ Export ข้อมูลได้ในรูปแบบ:</p>
            <ul>
                <li>CSV</li>
                <li>Excel (.xlsx)</li>
                <li>PDF</li>
            </ul>
        `
    },

    "transfer-history": {
        id: "transfer-history",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "ประวัติการโอนเงิน",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">ดูประวัติการโอนเงินจาก Payso เข้าบัญชีธนาคารของร้านค้า</p>

            <h2>รายละเอียดการโอนเงิน</h2>
            <p>แต่ละรายการโอนจะแสดง:</p>
            <ul>
                <li>วัน-เวลาที่โอน</li>
                <li>จำนวนเงินที่โอน</li>
                <li>ค่าธรรมเนียมที่หัก</li>
                <li>ยอดสุทธิที่ได้รับ</li>
                <li>บัญชีปลายทาง</li>
                <li>สถานะ (สำเร็จ/รอดำเนินการ/ล้มเหลว)</li>
            </ul>

            <h2>รอบการโอนเงิน</h2>
            <table class="article-table">
                <thead>
                    <tr>
                        <th>ประเภท</th>
                        <th>รอบการโอน</th>
                        <th>ระยะเวลา</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>T+1</td>
                        <td>วันถัดไป</td>
                        <td>ภายใน 24 ชม.</td>
                    </tr>
                    <tr>
                        <td>T+2</td>
                        <td>2 วันทำการ</td>
                        <td>ภายใน 48 ชม.</td>
                    </tr>
                    <tr>
                        <td>T+3</td>
                        <td>3 วันทำการ</td>
                        <td>ภายใน 72 ชม.</td>
                    </tr>
                </tbody>
            </table>
        `
    },

    "orders": {
        id: "orders",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "รายการสั่งซื้อ",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">การจัดการและดูรายการสั่งซื้อทั้งหมดใน Merchant Portal</p>

            <h2>การค้นหารายการ</h2>
            <p>สามารถค้นหารายการสั่งซื้อได้จาก:</p>
            <ul>
                <li>หมายเลขคำสั่งซื้อ (Order ID)</li>
                <li>ชื่อลูกค้า</li>
                <li>อีเมลลูกค้า</li>
                <li>เบอร์โทรศัพท์</li>
                <li>ช่วงวันที่</li>
            </ul>

            <h2>สถานะรายการ</h2>
            <table class="article-table">
                <thead>
                    <tr>
                        <th>สถานะ</th>
                        <th>คำอธิบาย</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="status-badge success">สำเร็จ</span></td>
                        <td>ชำระเงินเรียบร้อย</td>
                    </tr>
                    <tr>
                        <td><span class="status-badge pending">รอชำระ</span></td>
                        <td>รอลูกค้าชำระเงิน</td>
                    </tr>
                    <tr>
                        <td><span class="status-badge failed">ล้มเหลว</span></td>
                        <td>การชำระเงินไม่สำเร็จ</td>
                    </tr>
                    <tr>
                        <td><span class="status-badge refund">คืนเงิน</span></td>
                        <td>ทำรายการคืนเงินแล้ว</td>
                    </tr>
                </tbody>
            </table>
        `
    },

    "payment-link": {
        id: "payment-link",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "ลิงก์ชำระเงิน",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">วิธีสร้างและจัดการลิงก์ชำระเงินสำหรับส่งให้ลูกค้า</p>

            <h2>การสร้างลิงก์ชำระเงิน</h2>
            <ol>
                <li>เข้าเมนู <strong>"ลิงก์ชำระเงิน"</strong></li>
                <li>คลิก <strong>"สร้างลิงก์ใหม่"</strong></li>
                <li>กรอกรายละเอียด:
                    <ul>
                        <li>จำนวนเงิน</li>
                        <li>คำอธิบายรายการ</li>
                        <li>วันหมดอายุ (ถ้าต้องการ)</li>
                    </ul>
                </li>
                <li>คลิก <strong>"สร้างลิงก์"</strong></li>
                <li>คัดลอกลิงก์เพื่อส่งให้ลูกค้า</li>
            </ol>

            <h2>การจัดการลิงก์</h2>
            <ul>
                <li><strong>ดูสถานะ</strong> — ตรวจสอบว่าลูกค้าชำระเงินแล้วหรือยัง</li>
                <li><strong>ยกเลิกลิงก์</strong> — ยกเลิกลิงก์ที่ยังไม่ถูกใช้</li>
                <li><strong>ส่งซ้ำ</strong> — ส่งลิงก์ให้ลูกค้าอีกครั้ง</li>
            </ul>
        `
    },

    "edit-store-info": {
        id: "edit-store-info",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "แก้ไขชื่อร้านค้าและโลโก้",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">วิธีแก้ไขชื่อร้านค้าและอัปโหลดโลโก้ใหม่ใน Merchant Portal</p>

            <h2>ขั้นตอนการแก้ไข</h2>
            <ol>
                <li>เข้าสู่ Merchant Portal</li>
                <li>ไปที่เมนู <strong>"ตั้งค่าร้านค้า"</strong></li>
                <li>แก้ไขข้อมูลที่ต้องการ:
                    <ul>
                        <li>ชื่อร้านค้า</li>
                        <li>โลโก้ (รองรับ JPG, PNG ขนาดไม่เกิน 2MB)</li>
                        <li>คำอธิบายร้านค้า</li>
                    </ul>
                </li>
                <li>คลิก <strong>"บันทึก"</strong></li>
            </ol>

            <div class="article-tip">
                <div class="tip-icon"><i class="fas fa-lightbulb"></i></div>
                <div class="tip-content">
                    <strong>แนะนำ:</strong> ใช้โลโก้ขนาด 200x200 พิกเซล รูปแบบ PNG พื้นหลังโปร่งใส เพื่อการแสดงผลที่ดีที่สุด
                </div>
            </div>
        `
    },

    "change-bank": {
        id: "change-bank",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "เปลี่ยนบัญชีธนาคาร",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">ขั้นตอนการเปลี่ยนบัญชีธนาคารสำหรับรับเงินจาก Payso</p>

            <h2>ข้อควรทราบก่อนเปลี่ยน</h2>
            <ul>
                <li>บัญชีใหม่ต้องเป็นชื่อเดียวกับที่ลงทะเบียน</li>
                <li>ต้องรอการอนุมัติจากทีมงาน (1-2 วันทำการ)</li>
                <li>ระหว่างรอ การโอนเงินจะหยุดชั่วคราว</li>
            </ul>

            <h2>ขั้นตอน</h2>
            <ol>
                <li>เข้าเมนู <strong>"ตั้งค่าร้านค้า" → "บัญชีธนาคาร"</strong></li>
                <li>คลิก <strong>"เปลี่ยนบัญชี"</strong></li>
                <li>กรอกข้อมูลบัญชีใหม่</li>
                <li>อัปโหลดสำเนาหน้า Book Bank</li>
                <li>รอการอนุมัติจากทีมงาน</li>
            </ol>

            <div class="article-warning">
                <div class="tip-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="tip-content">
                    <strong>คำเตือน:</strong> หากชื่อบัญชีไม่ตรงกับข้อมูลที่ลงทะเบียน อาจถูกปฏิเสธและต้องแนบเอกสารเพิ่มเติม
                </div>
            </div>
        `
    },

    "reset-password": {
        id: "reset-password",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "รีเซ็ต/เปลี่ยนรหัสผ่าน",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">วิธีการรีเซ็ตหรือเปลี่ยนรหัสผ่านเข้าใช้งาน Merchant Portal</p>

            <h2>เปลี่ยนรหัสผ่าน (กรณีจำรหัสเดิมได้)</h2>
            <ol>
                <li>เข้าสู่ระบบ → ไปที่ <strong>"ตั้งค่าบัญชี"</strong></li>
                <li>คลิก <strong>"เปลี่ยนรหัสผ่าน"</strong></li>
                <li>กรอกรหัสผ่านเดิมและรหัสผ่านใหม่</li>
                <li>คลิก <strong>"ยืนยัน"</strong></li>
            </ol>

            <h2>รีเซ็ตรหัสผ่าน (กรณีลืมรหัส)</h2>
            <ol>
                <li>ไปที่หน้า Login</li>
                <li>คลิก <strong>"ลืมรหัสผ่าน?"</strong></li>
                <li>กรอกอีเมลที่ลงทะเบียนไว้</li>
                <li>ตรวจสอบอีเมลเพื่อรับลิงก์รีเซ็ตรหัสผ่าน</li>
                <li>ตั้งรหัสผ่านใหม่</li>
            </ol>

            <h2>ข้อกำหนดรหัสผ่าน</h2>
            <ul>
                <li>ความยาวอย่างน้อย 8 ตัวอักษร</li>
                <li>ต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
                <li>ต้องมีตัวเลขอย่างน้อย 1 ตัว</li>
                <li>ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว</li>
            </ul>
        `
    },

    "session-auto-logout": {
        id: "session-auto-logout",
        category: "Merchant Portal",
        categoryIcon: "fa-store",
        title: "Session หมดอายุ / Auto Logout",
        breadcrumb: "Merchant Portal",
        lastUpdated: "9 เม.ย. 2026",
        content: `
            <p class="article-intro">อธิบายการทำงานของระบบ Session และ Auto Logout ใน Merchant Portal</p>

            <h2>เมื่อไหร่ที่ Session หมดอายุ?</h2>
            <p>Session จะหมดอายุเมื่อ:</p>
            <ul>
                <li>ไม่มีการใช้งานเกิน <strong>30 นาที</strong></li>
                <li>ปิดเบราว์เซอร์</li>
                <li>เข้าสู่ระบบจากอุปกรณ์อื่น</li>
            </ul>

            <h2>สิ่งที่เกิดขึ้นเมื่อ Session หมดอายุ</h2>
            <ul>
                <li>ระบบจะแสดงข้อความแจ้งเตือน</li>
                <li>กลับไปหน้า Login อัตโนมัติ</li>
                <li>ข้อมูลที่ยังไม่ได้บันทึกอาจสูญหาย</li>
            </ul>

            <div class="article-tip">
                <div class="tip-icon"><i class="fas fa-lightbulb"></i></div>
                <div class="tip-content">
                    <strong>เคล็ดลับ:</strong> บันทึกข้อมูลเป็นระยะเพื่อป้องกันข้อมูลสูญหายจากการ Auto Logout
                </div>
            </div>
        `
    }
};

// Sidebar structure
const SIDEBAR_STRUCTURE = [
    {
        category: "เริ่มต้นใช้งาน",
        icon: "fa-rocket",
        articles: [
            { id: "getting-started-payso", title: "สมัครใช้งาน Payso" },
            { id: "documents-activation", title: "เอกสารประกอบการเปิดใช้งาน" },
            { id: "merchant-control-permission", title: "กำหนดสิทธิ์การใช้งาน Merchant Control" }
        ]
    },
    {
        category: "การเชื่อมต่อ",
        icon: "fa-plug",
        articles: [
            { id: "connect-website-payso", title: "เชื่อมต่อเว็บไซต์กับ Payso" },
            { id: "connect-shopify-portone", title: "เชื่อมต่อ Shopify กับ PortOne" },
            { id: "connect-peak", title: "เชื่อมต่อ PEAK" }
        ]
    },
    {
        category: "Merchant Portal",
        icon: "fa-store",
        articles: [
            { id: "dashboard", title: "แดชบอร์ด (Dashboard)" },
            { id: "total-revenue", title: "ยอดรวมรายได้" },
            { id: "transfer-history", title: "ประวัติการโอนเงิน" },
            { id: "orders", title: "รายการสั่งซื้อ" },
            { id: "payment-link", title: "ลิงก์ชำระเงิน" },
            { id: "edit-store-info", title: "แก้ไขชื่อร้านค้าและโลโก้" },
            { id: "change-bank", title: "เปลี่ยนบัญชีธนาคาร" },
            { id: "reset-password", title: "รีเซ็ต/เปลี่ยนรหัสผ่าน" },
            { id: "session-auto-logout", title: "Session หมดอายุ / Auto Logout" }
        ]
    }
];

// FAQ data
const FAQ_DATA = [
    {
        question: "สมัครใช้งาน Payso ต้องเสียค่าใช้จ่ายหรือไม่?",
        answer: "ไม่เสียค่าใช้จ่ายในการสมัคร แต่จะมีค่าธรรมเนียมเมื่อมีการรับชำระเงินจริง"
    },
    {
        question: "ใช้เวลานานแค่ไหนในการอนุมัติบัญชี?",
        answer: "โดยปกติใช้เวลา 1-3 วันทำการ หากเอกสารครบถ้วน"
    },
    {
        question: "รองรับช่องทางชำระเงินอะไรบ้าง?",
        answer: "รองรับ QR PromptPay, บัตรเครดิต/เดบิต (Visa, Mastercard, JCB), Internet Banking, และ e-Wallet"
    },
    {
        question: "เงินจะโอนเข้าบัญชีเมื่อไหร่?",
        answer: "ขึ้นอยู่กับรอบการโอนที่ตั้งไว้ ปกติจะเป็น T+1 ถึง T+3 วันทำการ"
    },
    {
        question: "สามารถเปลี่ยนบัญชีธนาคารได้หรือไม่?",
        answer: "ได้ โดยเข้าไปที่ตั้งค่าร้านค้า > บัญชีธนาคาร แล้วทำการเปลี่ยน ใช้เวลาอนุมัติ 1-2 วันทำการ"
    },
    {
        question: "ลืมรหัสผ่านต้องทำอย่างไร?",
        answer: "ไปที่หน้า Login แล้วคลิก 'ลืมรหัสผ่าน?' จากนั้นกรอกอีเมลที่ลงทะเบียนเพื่อรับลิงก์รีเซ็ต"
    },
    {
        question: "ต้องการสอบถามเพิ่มเติมติดต่อได้ที่ไหน?",
        answer: "สามารถติดต่อทีม Technical Support ผ่านอีเมล support@payso.co หรือโทร 02-xxx-xxxx ในวันและเวลาทำการ"
    }
];
