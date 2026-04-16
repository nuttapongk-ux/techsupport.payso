// =============================================
// Help Center - Admin Panel Logic
// =============================================

let adminAuthenticated = false;
let editingArticleId = null;
let editingCategoryIndex = null;
let editingFaqIndex = null;

// =============================================
// Authentication
// =============================================
function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    const settings = Storage.getSettings();

    if (password === settings.adminPassword) {
        adminAuthenticated = true;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminApp').style.display = 'flex';
        loadAdminSidebar();
        showDashboard();
    } else {
        const errEl = document.getElementById('loginError');
        errEl.textContent = 'รหัสผ่านไม่ถูกต้อง';
        errEl.style.display = 'block';
        document.getElementById('adminPassword').classList.add('shake');
        setTimeout(() => document.getElementById('adminPassword').classList.remove('shake'), 500);
    }
}

// Allow Enter key for login
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('adminPassword')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') adminLogin();
    });
});

function adminLogout() {
    adminAuthenticated = false;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminApp').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// =============================================
// Admin Sidebar
// =============================================
function loadAdminSidebar() {
    const sidebar = Storage.getSidebar();
    const container = document.getElementById('adminSidebarCategories');
    container.innerHTML = '';

    sidebar.forEach((section, catIndex) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'admin-sidebar-category';
        catDiv.innerHTML = `
            <div class="admin-cat-header" onclick="toggleAdminCategory(${catIndex})">
                <span><i class="fas ${section.icon}"></i> ${section.category}</span>
                <div class="admin-cat-actions">
                    <button class="admin-cat-btn" onclick="event.stopPropagation(); editCategory(${catIndex})" title="แก้ไข">
                        <i class="fas fa-pen"></i>
                    </button>
                    <i class="fas fa-chevron-down admin-cat-chevron" id="catChevron${catIndex}"></i>
                </div>
            </div>
            <div class="admin-cat-articles" id="catArticles${catIndex}">
                ${section.articles.map((article, artIndex) => `
                    <div class="admin-article-item" onclick="editArticle('${article.id}')" data-id="${article.id}">
                        <span class="admin-article-title"><i class="fas fa-file-lines"></i> ${article.title}</span>
                        <div class="admin-article-actions">
                            <button class="admin-art-btn danger" onclick="event.stopPropagation(); deleteArticle('${article.id}', ${catIndex}, ${artIndex})" title="ลบ">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
                <button class="admin-add-article-btn" onclick="addNewArticle(${catIndex})">
                    <i class="fas fa-plus"></i> เพิ่มบทความใหม่
                </button>
            </div>
        `;
        container.appendChild(catDiv);
    });

    // Auto-expand all
    sidebar.forEach((_, i) => {
        const el = document.getElementById(`catArticles${i}`);
        if (el) el.classList.add('open');
        const chevron = document.getElementById(`catChevron${i}`);
        if (chevron) chevron.classList.add('open');
    });
}

function toggleAdminCategory(index) {
    const el = document.getElementById(`catArticles${index}`);
    const chevron = document.getElementById(`catChevron${index}`);
    el.classList.toggle('open');
    chevron.classList.toggle('open');
}

// =============================================
// Dashboard
// =============================================
function showDashboard() {
    editingArticleId = null;
    const sidebar = Storage.getSidebar();
    const articles = Storage.getArticles();
    const faq = Storage.getFAQ();

    const totalArticles = Object.keys(articles).length;
    const totalCategories = sidebar.length;
    const totalFaq = faq.length;

    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-dashboard">
            <h2><i class="fas fa-chart-line"></i> แดชบอร์ดจัดการ</h2>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                        <i class="fas fa-folder"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number">${totalCategories}</div>
                        <div class="stat-label">หมวดหมู่</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #059669);">
                        <i class="fas fa-file-lines"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number">${totalArticles}</div>
                        <div class="stat-label">บทความ</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                        <i class="fas fa-circle-question"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number">${totalFaq}</div>
                        <div class="stat-label">คำถามที่พบบ่อย</div>
                    </div>
                </div>
            </div>

            <div class="dashboard-actions">
                <h3>จัดการเนื้อหา</h3>
                <div class="action-grid">
                    <button class="action-card" onclick="showAddCategoryForm()">
                        <i class="fas fa-folder-plus"></i>
                        <span>เพิ่มหมวดหมู่ใหม่</span>
                    </button>
                    <button class="action-card" onclick="showManageFAQ()">
                        <i class="fas fa-circle-question"></i>
                        <span>จัดการคำถามที่พบบ่อย</span>
                    </button>
                    <button class="action-card" onclick="exportData()">
                        <i class="fas fa-download"></i>
                        <span>Export ข้อมูล</span>
                    </button>
                    <button class="action-card" onclick="showImportForm()">
                        <i class="fas fa-upload"></i>
                        <span>Import ข้อมูล</span>
                    </button>
                    <button class="action-card" onclick="showChangePassword()">
                        <i class="fas fa-key"></i>
                        <span>เปลี่ยนรหัสผ่าน</span>
                    </button>
                    <button class="action-card danger" onclick="confirmResetData()">
                        <i class="fas fa-rotate-left"></i>
                        <span>รีเซ็ตข้อมูลเป็นค่าเริ่มต้น</span>
                    </button>
                </div>
            </div>

            <div class="dashboard-articles">
                <h3>บทความทั้งหมด</h3>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ชื่อบทความ</th>
                            <th>หมวดหมู่</th>
                            <th>อัปเดตล่าสุด</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.values(articles).map(a => `
                            <tr>
                                <td><a href="#" onclick="event.preventDefault(); editArticle('${a.id}')">${a.title}</a></td>
                                <td><span class="category-badge">${a.category}</span></td>
                                <td>${a.lastUpdated || '-'}</td>
                                <td>
                                    <button class="table-btn" onclick="editArticle('${a.id}')"><i class="fas fa-pen"></i></button>
                                    <button class="table-btn danger" onclick="deleteArticleFromDashboard('${a.id}')"><i class="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Deselect sidebar items
    document.querySelectorAll('.admin-article-item').forEach(el => el.classList.remove('active'));
}

// =============================================
// Category Management
// =============================================
function showAddCategoryForm() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-form-container">
            <div class="admin-form-header">
                <h2><i class="fas fa-folder-plus"></i> เพิ่มหมวดหมู่ใหม่</h2>
            </div>
            <div class="admin-form-body">
                <div class="form-group">
                    <label>ชื่อหมวดหมู่</label>
                    <input type="text" id="catName" placeholder="เช่น การตั้งค่า" class="admin-input">
                </div>
                <div class="form-group">
                    <label>ไอคอน (Font Awesome class)</label>
                    <div class="icon-picker">
                        <input type="text" id="catIcon" value="fa-folder" class="admin-input" style="flex:1">
                        <div class="icon-preview" id="iconPreview"><i class="fas fa-folder"></i></div>
                    </div>
                    <div class="icon-suggestions">
                        ${['fa-rocket', 'fa-plug', 'fa-store', 'fa-gear', 'fa-shield', 'fa-book', 'fa-code', 'fa-credit-card', 'fa-chart-bar', 'fa-headset', 'fa-tools', 'fa-bell'].map(icon => `
                            <button class="icon-btn" onclick="selectIcon('${icon}')"><i class="fas ${icon}"></i></button>
                        `).join('')}
                    </div>
                </div>
                <div class="form-actions">
                    <button class="admin-btn secondary" onclick="showDashboard()">ยกเลิก</button>
                    <button class="admin-btn primary" onclick="saveNewCategory()"><i class="fas fa-save"></i> บันทึก</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('catIcon').addEventListener('input', (e) => {
        document.getElementById('iconPreview').innerHTML = `<i class="fas ${e.target.value}"></i>`;
    });
}

function selectIcon(icon) {
    document.getElementById('catIcon').value = icon;
    document.getElementById('iconPreview').innerHTML = `<i class="fas ${icon}"></i>`;
}

function saveNewCategory() {
    const name = document.getElementById('catName').value.trim();
    const icon = document.getElementById('catIcon').value.trim();

    if (!name) {
        showToast('กรุณากรอกชื่อหมวดหมู่', 'error');
        return;
    }

    const sidebar = Storage.getSidebar();
    sidebar.push({
        category: name,
        icon: icon || 'fa-folder',
        articles: []
    });
    Storage.saveSidebar(sidebar);
    loadAdminSidebar();
    showDashboard();
    showToast('เพิ่มหมวดหมู่สำเร็จ!', 'success');
}

function editCategory(catIndex) {
    const sidebar = Storage.getSidebar();
    const cat = sidebar[catIndex];

    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-form-container">
            <div class="admin-form-header">
                <h2><i class="fas fa-pen"></i> แก้ไขหมวดหมู่: ${cat.category}</h2>
            </div>
            <div class="admin-form-body">
                <div class="form-group">
                    <label>ชื่อหมวดหมู่</label>
                    <input type="text" id="catName" value="${cat.category}" class="admin-input">
                </div>
                <div class="form-group">
                    <label>ไอคอน</label>
                    <div class="icon-picker">
                        <input type="text" id="catIcon" value="${cat.icon}" class="admin-input" style="flex:1">
                        <div class="icon-preview" id="iconPreview"><i class="fas ${cat.icon}"></i></div>
                    </div>
                    <div class="icon-suggestions">
                        ${['fa-rocket', 'fa-plug', 'fa-store', 'fa-gear', 'fa-shield', 'fa-book', 'fa-code', 'fa-credit-card', 'fa-chart-bar', 'fa-headset', 'fa-tools', 'fa-bell'].map(icon => `
                            <button class="icon-btn" onclick="selectIcon('${icon}')"><i class="fas ${icon}"></i></button>
                        `).join('')}
                    </div>
                </div>
                <div class="form-actions">
                    <button class="admin-btn danger" onclick="confirmDeleteCategory(${catIndex})" style="margin-right:auto;">
                        <i class="fas fa-trash-alt"></i> ลบหมวดหมู่
                    </button>
                    <button class="admin-btn secondary" onclick="showDashboard()">ยกเลิก</button>
                    <button class="admin-btn primary" onclick="saveEditCategory(${catIndex})"><i class="fas fa-save"></i> บันทึก</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('catIcon').addEventListener('input', (e) => {
        document.getElementById('iconPreview').innerHTML = `<i class="fas ${e.target.value}"></i>`;
    });
}

function saveEditCategory(catIndex) {
    const name = document.getElementById('catName').value.trim();
    const icon = document.getElementById('catIcon').value.trim();

    if (!name) {
        showToast('กรุณากรอกชื่อหมวดหมู่', 'error');
        return;
    }

    const sidebar = Storage.getSidebar();
    const oldCatName = sidebar[catIndex].category;
    sidebar[catIndex].category = name;
    sidebar[catIndex].icon = icon || 'fa-folder';
    Storage.saveSidebar(sidebar);

    // Update articles that reference this category
    const articles = Storage.getArticles();
    Object.values(articles).forEach(a => {
        if (a.category === oldCatName) {
            a.category = name;
            a.breadcrumb = name;
        }
    });
    Storage.saveArticles(articles);

    loadAdminSidebar();
    showDashboard();
    showToast('แก้ไขหมวดหมู่สำเร็จ!', 'success');
}

function confirmDeleteCategory(catIndex) {
    const sidebar = Storage.getSidebar();
    const cat = sidebar[catIndex];

    if (cat.articles.length > 0) {
        showModal(
            'ลบหมวดหมู่',
            `หมวดหมู่ "${cat.category}" มี ${cat.articles.length} บทความ ต้องการลบหมวดหมู่และบทความทั้งหมดหรือไม่?`,
            () => {
                // Delete all articles in category
                const articles = Storage.getArticles();
                cat.articles.forEach(a => delete articles[a.id]);
                Storage.saveArticles(articles);

                sidebar.splice(catIndex, 1);
                Storage.saveSidebar(sidebar);
                loadAdminSidebar();
                showDashboard();
                showToast('ลบหมวดหมู่สำเร็จ!', 'success');
            }
        );
    } else {
        sidebar.splice(catIndex, 1);
        Storage.saveSidebar(sidebar);
        loadAdminSidebar();
        showDashboard();
        showToast('ลบหมวดหมู่สำเร็จ!', 'success');
    }
}

// =============================================
// Article Management
// =============================================
function addNewArticle(catIndex) {
    const sidebar = Storage.getSidebar();
    const cat = sidebar[catIndex];

    const id = 'article-' + Date.now();
    const thaiDate = getThaiDate();

    editingArticleId = null; // new article mode

    const content = document.getElementById('adminContent');
    content.innerHTML = buildArticleEditor({
        id: id,
        title: '',
        category: cat.category,
        categoryIcon: cat.icon,
        breadcrumb: cat.category,
        lastUpdated: thaiDate,
        content: ''
    }, catIndex, true);

    initEditor();
}

function editArticle(articleId) {
    const articles = Storage.getArticles();
    const article = articles[articleId];
    if (!article) {
        showToast('ไม่พบบทความ', 'error');
        return;
    }

    editingArticleId = articleId;

    // Find category index
    const sidebar = Storage.getSidebar();
    let catIndex = sidebar.findIndex(s => s.category === article.category);
    if (catIndex === -1) catIndex = 0;

    const content = document.getElementById('adminContent');
    content.innerHTML = buildArticleEditor(article, catIndex, false);
    initEditor();

    // Set active in sidebar
    document.querySelectorAll('.admin-article-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === articleId);
    });
}

function buildArticleEditor(article, catIndex, isNew) {
    const sidebar = Storage.getSidebar();

    return `
        <div class="admin-editor-container">
            <input type="file" id="imageUpload" accept="image/*" style="display:none;" onchange="handleImageUpload(event)">
            <div class="admin-editor-header">
                <h2><i class="fas ${isNew ? 'fa-plus' : 'fa-pen'}"></i> ${isNew ? 'สร้างบทความใหม่' : 'แก้ไขบทความ'}</h2>
                <div class="editor-header-actions">
                    <button class="admin-btn secondary" onclick="showDashboard()">
                        <i class="fas fa-arrow-left"></i> กลับ
                    </button>
                    <button class="admin-btn primary" onclick="saveArticle(${isNew}, ${catIndex})">
                        <i class="fas fa-save"></i> บันทึก
                    </button>
                </div>
            </div>

            <div class="admin-editor-body">
                <div class="editor-meta">
                    <div class="form-row">
                        <div class="form-group" style="flex:2">
                            <label>ชื่อบทความ</label>
                            <input type="text" id="articleTitle" value="${escapeAttr(article.title)}" class="admin-input large" placeholder="กรอกชื่อบทความ">
                        </div>
                        <div class="form-group" style="flex:1">
                            <label>หมวดหมู่</label>
                            <select id="articleCategory" class="admin-input">
                                ${sidebar.map((s, i) => `
                                    <option value="${i}" ${i === catIndex ? 'selected' : ''}>${s.category}</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                    <input type="hidden" id="articleId" value="${article.id}">
                </div>

                <div class="editor-content-area">
                    <label>เนื้อหาบทความ</label>
                    <div class="editor-toolbar" id="editorToolbar">
                        <div class="toolbar-group">
                            <button type="button" onclick="execCmd('bold')" title="ตัวหนา (Ctrl+B)"><i class="fas fa-bold"></i></button>
                            <button type="button" onclick="execCmd('italic')" title="ตัวเอียง (Ctrl+I)"><i class="fas fa-italic"></i></button>
                            <button type="button" onclick="execCmd('underline')" title="ขีดเส้นใต้ (Ctrl+U)"><i class="fas fa-underline"></i></button>
                            <button type="button" onclick="execCmd('strikethrough')" title="ขีดฆ่า"><i class="fas fa-strikethrough"></i></button>
                        </div>
                        <div class="toolbar-divider"></div>
                        <div class="toolbar-group">
                            <select onchange="execCmdArg('formatBlock', this.value); this.value='';" title="หัวข้อ">
                                <option value="">หัวข้อ</option>
                                <option value="h2">หัวข้อใหญ่ (H2)</option>
                                <option value="h3">หัวข้อรอง (H3)</option>
                                <option value="p">ย่อหน้า</option>
                            </select>
                        </div>
                        <div class="toolbar-divider"></div>
                        <div class="toolbar-group">
                            <button type="button" onclick="execCmd('insertUnorderedList')" title="รายการ Bullet"><i class="fas fa-list-ul"></i></button>
                            <button type="button" onclick="execCmd('insertOrderedList')" title="รายการลำดับ"><i class="fas fa-list-ol"></i></button>
                        </div>
                        <div class="toolbar-divider"></div>
                        <div class="toolbar-group">
                            <button type="button" onclick="insertLink()" title="แทรกลิงก์"><i class="fas fa-link"></i></button>
                            <button type="button" onclick="document.getElementById('imageUpload').click()" title="แทรกรูปภาพ"><i class="fas fa-image"></i></button>
                            <button type="button" onclick="insertTable()" title="แทรกตาราง"><i class="fas fa-table"></i></button>
                            <button type="button" onclick="insertTipBox()" title="แทรกกล่องเคล็ดลับ"><i class="fas fa-lightbulb"></i></button>
                            <button type="button" onclick="insertWarningBox()" title="แทรกกล่องคำเตือน"><i class="fas fa-exclamation-triangle"></i></button>
                        </div>
                        <div class="toolbar-divider"></div>
                        <div class="toolbar-group">
                            <button type="button" onclick="toggleSource()" title="แก้ไข HTML" id="sourceToggle"><i class="fas fa-code"></i></button>
                        </div>
                    </div>
                    <div class="editor-wrapper">
                        <div id="richEditor" class="rich-editor" contenteditable="true">${article.content || '<p>เริ่มพิมพ์เนื้อหาที่นี่...</p>'}</div>
                        <textarea id="sourceEditor" class="source-editor" style="display:none;">${article.content || ''}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initEditor() {
    const editor = document.getElementById('richEditor');
    if (!editor) return;

    // Keyboard shortcuts
    editor.addEventListener('keydown', (e) => {
        if (e.ctrlKey) {
            switch (e.key.toLowerCase()) {
                case 'b': e.preventDefault(); execCmd('bold'); break;
                case 'i': e.preventDefault(); execCmd('italic'); break;
                case 'u': e.preventDefault(); execCmd('underline'); break;
            }
        }
    });

    editor.focus();
}

function execCmd(command) {
    document.execCommand(command, false, null);
    document.getElementById('richEditor')?.focus();
}

function execCmdArg(command, value) {
    if (!value) return;
    document.execCommand(command, false, value);
    document.getElementById('richEditor')?.focus();
}

function insertLink() {
    const url = prompt('กรอก URL:', 'https://');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function insertTable() {
    const html = `
        <table class="info-table">
            <thead>
                <tr><th>หัวข้อ 1</th><th>หัวข้อ 2</th><th>หัวข้อ 3</th></tr>
            </thead>
            <tbody>
                <tr><td>ข้อมูล</td><td>ข้อมูล</td><td>ข้อมูล</td></tr>
                <tr><td>ข้อมูล</td><td>ข้อมูล</td><td>ข้อมูล</td></tr>
            </tbody>
        </table><p></p>
    `;
    document.execCommand('insertHTML', false, html);
}

function insertTipBox() {
    const html = `
        <div class="callout callout-tip">
            <i class="fas fa-lightbulb callout-icon"></i>
            <div><strong>เคล็ดลับ:</strong> พิมพ์เนื้อหาที่นี่</div>
        </div><p></p>
    `;
    document.execCommand('insertHTML', false, html);
}

function insertWarningBox() {
    const html = `
        <div class="callout callout-warning">
            <i class="fas fa-exclamation-triangle callout-icon"></i>
            <div><strong>คำเตือน:</strong> พิมพ์เนื้อหาที่นี่</div>
        </div><p></p>
    `;
    document.execCommand('insertHTML', false, html);
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Optional: show a loading Toast
    showToast('กำลังอัปโหลดรูปภาพ...', 'info');

    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `img_${Date.now()}.${fileExt}`;
        const storageRef = window.storage.ref('helpcenter-images/' + fileName);
        
        await storageRef.put(file);
        const downloadURL = await storageRef.getDownloadURL();
        
        // Insert image with max-width styling class (we'll add this to CSS if not present)
        const html = `<img src="${downloadURL}" alt="Uploaded image" class="article-image" style="max-width:100%; height:auto; border-radius:8px; margin: 15px 0;">`;
        
        document.getElementById('richEditor')?.focus();
        document.execCommand('insertHTML', false, html);
        
        showToast('อัปโหลดรูปภาพสำเร็จ', 'success');
    } catch (e) {
        console.error("Image upload failed", e);
        showToast('อัปโหลดรูปภาพล้มเหลว', 'error');
    }

    // Reset input so the same file could be picked again if needed
    event.target.value = '';
}

function toggleSource() {
    const richEditor = document.getElementById('richEditor');
    const sourceEditor = document.getElementById('sourceEditor');
    const toggleBtn = document.getElementById('sourceToggle');

    if (sourceEditor.style.display === 'none') {
        sourceEditor.value = richEditor.innerHTML;
        richEditor.style.display = 'none';
        sourceEditor.style.display = 'block';
        toggleBtn.classList.add('active');
    } else {
        richEditor.innerHTML = sourceEditor.value;
        sourceEditor.style.display = 'none';
        richEditor.style.display = 'block';
        toggleBtn.classList.remove('active');
    }
}

function saveArticle(isNew, originalCatIndex) {
    const id = document.getElementById('articleId').value;
    const title = document.getElementById('articleTitle').value.trim();
    const catSelectIndex = parseInt(document.getElementById('articleCategory').value);

    if (!title) {
        showToast('กรุณากรอกชื่อบทความ', 'error');
        return;
    }

    const sidebar = Storage.getSidebar();
    const cat = sidebar[catSelectIndex];

    // Get content from whichever editor is visible
    const richEditor = document.getElementById('richEditor');
    const sourceEditor = document.getElementById('sourceEditor');
    let articleContent = '';
    if (sourceEditor.style.display !== 'none') {
        articleContent = sourceEditor.value;
    } else {
        articleContent = richEditor.innerHTML;
    }

    const thaiDate = getThaiDate();

    const article = {
        id: id,
        category: cat.category,
        categoryIcon: cat.icon,
        title: title,
        breadcrumb: cat.category,
        lastUpdated: thaiDate,
        content: articleContent
    };

    // Save article
    Storage.saveArticle(article);

    // Update sidebar structure
    if (isNew) {
        sidebar[catSelectIndex].articles.push({ id: id, title: title });
    } else {
        // If category changed, move article
        if (catSelectIndex !== originalCatIndex) {
            // Remove from old category
            sidebar.forEach(s => {
                s.articles = s.articles.filter(a => a.id !== id);
            });
            // Add to new category
            sidebar[catSelectIndex].articles.push({ id: id, title: title });
        } else {
            // Update title in sidebar
            const artInSidebar = sidebar[catSelectIndex].articles.find(a => a.id === id);
            if (artInSidebar) artInSidebar.title = title;
        }
    }

    Storage.saveSidebar(sidebar);
    loadAdminSidebar();
    showToast(isNew ? 'สร้างบทความสำเร็จ!' : 'บันทึกบทความสำเร็จ!', 'success');

    // Stay on editor
    editArticle(id);
}

function deleteArticle(articleId, catIndex, artIndex) {
    showModal(
        'ลบบทความ',
        'ต้องการลบบทความนี้หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
        () => {
            Storage.deleteArticle(articleId);

            const sidebar = Storage.getSidebar();
            sidebar[catIndex].articles.splice(artIndex, 1);
            Storage.saveSidebar(sidebar);

            loadAdminSidebar();
            showDashboard();
            showToast('ลบบทความสำเร็จ!', 'success');
        }
    );
}

function deleteArticleFromDashboard(articleId) {
    const sidebar = Storage.getSidebar();
    showModal(
        'ลบบทความ',
        'ต้องการลบบทความนี้หรือไม่?',
        () => {
            Storage.deleteArticle(articleId);

            // Remove from sidebar
            sidebar.forEach(s => {
                s.articles = s.articles.filter(a => a.id !== articleId);
            });
            Storage.saveSidebar(sidebar);

            loadAdminSidebar();
            showDashboard();
            showToast('ลบบทความสำเร็จ!', 'success');
        }
    );
}

// =============================================
// FAQ Management
// =============================================
function showManageFAQ() {
    const faq = Storage.getFAQ();

    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-form-container">
            <div class="admin-form-header">
                <h2><i class="fas fa-circle-question"></i> จัดการคำถามที่พบบ่อย</h2>
                <button class="admin-btn primary" onclick="addNewFAQ()">
                    <i class="fas fa-plus"></i> เพิ่มคำถาม
                </button>
            </div>
            <div class="admin-form-body">
                <div class="faq-list-admin" id="faqListAdmin">
                    ${faq.map((item, index) => `
                        <div class="faq-admin-item">
                            <div class="faq-admin-content">
                                <div class="faq-admin-q"><strong>Q:</strong> ${item.question}</div>
                                <div class="faq-admin-a"><strong>A:</strong> ${item.answer}</div>
                            </div>
                            <div class="faq-admin-actions">
                                <button class="admin-btn small" onclick="editFAQ(${index})"><i class="fas fa-pen"></i></button>
                                <button class="admin-btn small danger" onclick="deleteFAQ(${index})"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    `).join('')}
                    ${faq.length === 0 ? '<p class="no-data">ยังไม่มีคำถามที่พบบ่อย</p>' : ''}
                </div>
            </div>
        </div>
    `;
}

function addNewFAQ() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-form-container">
            <div class="admin-form-header">
                <h2><i class="fas fa-plus"></i> เพิ่มคำถามใหม่</h2>
            </div>
            <div class="admin-form-body">
                <div class="form-group">
                    <label>คำถาม</label>
                    <input type="text" id="faqQuestion" class="admin-input" placeholder="กรอกคำถาม">
                </div>
                <div class="form-group">
                    <label>คำตอบ</label>
                    <textarea id="faqAnswer" class="admin-input" rows="4" placeholder="กรอกคำตอบ"></textarea>
                </div>
                <div class="form-actions">
                    <button class="admin-btn secondary" onclick="showManageFAQ()">ยกเลิก</button>
                    <button class="admin-btn primary" onclick="saveNewFAQ()"><i class="fas fa-save"></i> บันทึก</button>
                </div>
            </div>
        </div>
    `;
}

function saveNewFAQ() {
    const question = document.getElementById('faqQuestion').value.trim();
    const answer = document.getElementById('faqAnswer').value.trim();

    if (!question || !answer) {
        showToast('กรุณากรอกคำถามและคำตอบ', 'error');
        return;
    }

    const faq = Storage.getFAQ();
    faq.push({ question, answer });
    Storage.saveFAQ(faq);
    showManageFAQ();
    showToast('เพิ่มคำถามสำเร็จ!', 'success');
}

function editFAQ(index) {
    const faq = Storage.getFAQ();
    const item = faq[index];

    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-form-container">
            <div class="admin-form-header">
                <h2><i class="fas fa-pen"></i> แก้ไขคำถาม</h2>
            </div>
            <div class="admin-form-body">
                <div class="form-group">
                    <label>คำถาม</label>
                    <input type="text" id="faqQuestion" class="admin-input" value="${escapeAttr(item.question)}">
                </div>
                <div class="form-group">
                    <label>คำตอบ</label>
                    <textarea id="faqAnswer" class="admin-input" rows="4">${item.answer}</textarea>
                </div>
                <div class="form-actions">
                    <button class="admin-btn secondary" onclick="showManageFAQ()">ยกเลิก</button>
                    <button class="admin-btn primary" onclick="saveEditFAQ(${index})"><i class="fas fa-save"></i> บันทึก</button>
                </div>
            </div>
        </div>
    `;
}

function saveEditFAQ(index) {
    const question = document.getElementById('faqQuestion').value.trim();
    const answer = document.getElementById('faqAnswer').value.trim();

    if (!question || !answer) {
        showToast('กรุณากรอกคำถามและคำตอบ', 'error');
        return;
    }

    const faq = Storage.getFAQ();
    faq[index] = { question, answer };
    Storage.saveFAQ(faq);
    showManageFAQ();
    showToast('แก้ไขคำถามสำเร็จ!', 'success');
}

function deleteFAQ(index) {
    showModal('ลบคำถาม', 'ต้องการลบคำถามนี้หรือไม่?', () => {
        const faq = Storage.getFAQ();
        faq.splice(index, 1);
        Storage.saveFAQ(faq);
        showManageFAQ();
        showToast('ลบคำถามสำเร็จ!', 'success');
    });
}

// =============================================
// Settings / Utilities
// =============================================
function showChangePassword() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-form-container">
            <div class="admin-form-header">
                <h2><i class="fas fa-key"></i> เปลี่ยนรหัสผ่าน Admin</h2>
            </div>
            <div class="admin-form-body">
                <div class="form-group">
                    <label>รหัสผ่านใหม่</label>
                    <input type="password" id="newPassword" class="admin-input" placeholder="กรอกรหัสผ่านใหม่">
                </div>
                <div class="form-group">
                    <label>ยืนยันรหัสผ่านใหม่</label>
                    <input type="password" id="confirmPassword" class="admin-input" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง">
                </div>
                <div class="form-actions">
                    <button class="admin-btn secondary" onclick="showDashboard()">ยกเลิก</button>
                    <button class="admin-btn primary" onclick="saveNewPassword()"><i class="fas fa-save"></i> บันทึก</button>
                </div>
            </div>
        </div>
    `;
}

function saveNewPassword() {
    const pwd = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!pwd || pwd.length < 4) {
        showToast('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร', 'error');
        return;
    }
    if (pwd !== confirm) {
        showToast('รหัสผ่านไม่ตรงกัน', 'error');
        return;
    }

    const settings = Storage.getSettings();
    settings.adminPassword = pwd;
    Storage.saveSettings(settings);
    showToast('เปลี่ยนรหัสผ่านสำเร็จ!', 'success');
    showDashboard();
}

function exportData() {
    const data = Storage.exportAll();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `helpcenter-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Export ข้อมูลสำเร็จ!', 'success');
}

function showImportForm() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="admin-form-container">
            <div class="admin-form-header">
                <h2><i class="fas fa-upload"></i> Import ข้อมูล</h2>
            </div>
            <div class="admin-form-body">
                <div class="form-group">
                    <label>เลือกไฟล์ JSON</label>
                    <input type="file" id="importFile" accept=".json" class="admin-input">
                </div>
                <div class="form-actions">
                    <button class="admin-btn secondary" onclick="showDashboard()">ยกเลิก</button>
                    <button class="admin-btn primary" onclick="importData()"><i class="fas fa-upload"></i> Import</button>
                </div>
            </div>
        </div>
    `;
}

function importData() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    if (!file) {
        showToast('กรุณาเลือกไฟล์', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            Storage.importAll(e.target.result);
            loadAdminSidebar();
            showDashboard();
            showToast('Import ข้อมูลสำเร็จ!', 'success');
        } catch (err) {
            showToast('ไฟล์ไม่ถูกต้อง: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
}

function confirmResetData() {
    showModal(
        'รีเซ็ตข้อมูล',
        'ต้องการรีเซ็ตข้อมูลทั้งหมดเป็นค่าเริ่มต้นหรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
        () => {
            Storage.resetAll();
            loadAdminSidebar();
            showDashboard();
            showToast('รีเซ็ตข้อมูลสำเร็จ!', 'success');
        }
    );
}

// =============================================
// Modal / Toast
// =============================================
function showModal(title, message, onConfirm) {
    const overlay = document.getElementById('modalOverlay');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;

    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('visible'), 10);

    // Store callback
    window._modalConfirmCallback = () => {
        closeModal();
        onConfirm();
    };
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('visible');
    setTimeout(() => overlay.style.display = 'none', 300);
}

function confirmModal() {
    if (window._modalConfirmCallback) {
        window._modalConfirmCallback();
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// Helpers
// =============================================
function getThaiDate() {
    const now = new Date();
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const thaiYear = now.getFullYear() + 543;
    return `${now.getDate()} ${thaiMonths[now.getMonth()]} ${thaiYear}`;
}

function escapeAttr(str) {
    return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
