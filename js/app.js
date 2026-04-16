// =============================================
// Help Center - Main Application Logic
// =============================================

let currentArticleId = null;
let isFAQView = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    Storage.initialize(() => {
        // Hide loading, show content
        const loading = document.getElementById('loadingOverlay');
        const content = document.getElementById('contentArea');
        if (loading) loading.style.display = 'none';
        if (content) content.style.display = 'block';

        buildSidebar();
        setupSearch();
        setupMobileMenu();
        setLastUpdatedDate();

        // Load article from URL hash or default
        const articles = Storage.getArticles();
        const hash = window.location.hash.substring(1);
        
        if (hash === 'faq') {
            showFAQ();
        } else if (hash && articles[hash]) {
            navigateTo(hash);
        } else {
            navigateTo('getting-started-payso');
        }
    });

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.substring(1);
        const articles = Storage.getArticles();
        if (newHash === 'faq') {
            showFAQ();
        } else if (newHash && articles[newHash]) {
            navigateTo(newHash, false);
        }
    });

    // Handle live reload
    document.addEventListener('storageUpdated', () => {
        buildSidebar();
        const hash = window.location.hash.substring(1);
        if (hash === 'faq') {
            showFAQ();
        } else if (hash && Storage.getArticles()[hash]) {
            navigateTo(hash, false);
        }
    });
});

// =============================================
// Sidebar
// =============================================
function buildSidebar() {
    const sidebar = document.getElementById('sidebarNav');
    sidebar.innerHTML = '';
    const sidebarStruct = Storage.getSidebar();

    sidebarStruct.forEach(section => {
        // Category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'sidebar-category';
        categoryHeader.innerHTML = `
            <div class="sidebar-category-label"><i class="fas ${section.icon}"></i> ${section.category}</div>
        `;
        sidebar.appendChild(categoryHeader);

        // Article links
        section.articles.forEach(article => {
            const link = document.createElement('a');
            link.className = 'sidebar-link';
            link.href = `#${article.id}`;
            link.dataset.id = article.id;
            link.textContent = article.title;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(article.id);
                closeMobileMenu();
            });
            sidebar.appendChild(link);
        });
    });
}

// =============================================
// Navigation
// =============================================
function navigateTo(articleId, updateHash = true) {
    const articles = Storage.getArticles();
    const article = articles[articleId];
    if (!article) return;

    currentArticleId = articleId;
    isFAQView = false;

    // Update URL
    if (updateHash) {
        window.location.hash = articleId;
    }

    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.toggle('active', link.dataset.id === articleId);
    });

    // Render article
    renderArticle(article);

    // Scroll main content to top
    document.querySelector('.main-content').scrollTop = 0;
    
    // Close FAQ highlight
    document.getElementById('faqBtn')?.classList.remove('active');
}

function renderArticle(article) {
    const sidebarStruct = Storage.getSidebar();
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <section class="guide-section">
            <div class="article-header">
                <div class="article-section-title">หน้าแรก / ${article.breadcrumb}</div>
                <h1 class="article-title">${article.title}</h1>
            </div>
            <div class="article-body">
                ${article.content}
            </div>
        </section>
        <div class="article-footer">
            <div class="article-feedback">
                <p>บทความนี้เป็นประโยชน์หรือไม่?</p>
                <div class="feedback-buttons">
                    <button class="feedback-btn" onclick="sendFeedback('yes', this)" id="feedback-yes">
                        <i class="fas fa-thumbs-up"></i> ใช่
                    </button>
                    <button class="feedback-btn" onclick="sendFeedback('no', this)" id="feedback-no">
                        <i class="fas fa-thumbs-down"></i> ไม่
                    </button>
                </div>
            </div>
            <div class="article-nav">
                ${getPrevNextNav(article.id)}
            </div>
        </div>
    `;

    // Animate in
    contentArea.classList.remove('fade-in');
    void contentArea.offsetWidth;
    contentArea.classList.add('fade-in');
}

function getPrevNextNav(articleId) {
    const allArticles = [];
    const sidebarStruct = Storage.getSidebar();
    sidebarStruct.forEach(section => {
        section.articles.forEach(a => allArticles.push(a));
    });

    const currentIndex = allArticles.findIndex(a => a.id === articleId);
    const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
    const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

    let html = '';
    if (prev) {
        html += `<a href="#${prev.id}" class="nav-prev" onclick="event.preventDefault(); navigateTo('${prev.id}')">
            <i class="fas fa-arrow-left"></i>
            <span>
                <small>บทความก่อนหน้า</small>
                ${prev.title}
            </span>
        </a>`;
    } else {
        html += '<div></div>';
    }

    if (next) {
        html += `<a href="#${next.id}" class="nav-next" onclick="event.preventDefault(); navigateTo('${next.id}')">
            <span>
                <small>บทความถัดไป</small>
                ${next.title}
            </span>
            <i class="fas fa-arrow-right"></i>
        </a>`;
    } else {
        html += '<div></div>';
    }

    return html;
}

// =============================================
// FAQ
// =============================================
function showFAQ() {
    isFAQView = true;
    window.location.hash = 'faq';

    // Remove sidebar active
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    // Highlight FAQ button
    document.getElementById('faqBtn')?.classList.add('active');

    const faqData = Storage.getFAQ();
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <section class="guide-section">
            <div class="article-header">
                <div class="article-section-title">หน้าแรก / คำถามที่พบบ่อย</div>
                <h1 class="article-title">คำถามที่พบบ่อย (FAQ)</h1>
            </div>
            <div class="faq-container">
            ${faqData.map((faq, index) => `
                <details class="faq-item">
                    <summary>${faq.question}</summary>
                    <div class="faq-body">
                        <p>${faq.answer}</p>
                    </div>
                </details>
            `).join('')}
            </div>
        </section>
    `;

    contentArea.classList.remove('fade-in');
    void contentArea.offsetWidth;
    contentArea.classList.add('fade-in');

    closeMobileMenu();
}

function toggleFAQ(index) {
    // The new CSS uses <details> elements which handle open/close natively via HTML.
}

// =============================================
// Search
// =============================================
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
            searchResults.classList.remove('visible');
            searchResults.innerHTML = '';
            return;
        }

        const results = [];
        const articles = Storage.getArticles();
        const faqData = Storage.getFAQ();

        // Search articles
        Object.values(articles).forEach(article => {
            const titleMatch = article.title.toLowerCase().includes(query);
            // Simple content text search (strip HTML)
            const textContent = article.content.replace(/<[^>]*>/g, '').toLowerCase();
            const contentMatch = textContent.includes(query);

            if (titleMatch || contentMatch) {
                let snippet = '';
                if (contentMatch && !titleMatch) {
                    const idx = textContent.indexOf(query);
                    const start = Math.max(0, idx - 40);
                    const end = Math.min(textContent.length, idx + query.length + 40);
                    snippet = '...' + textContent.substring(start, end) + '...';
                }
                results.push({
                    id: article.id,
                    title: article.title,
                    category: article.category,
                    snippet: snippet,
                    isTitle: titleMatch
                });
            }
        });

        // Search FAQ
        faqData.forEach((faq, index) => {
            if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
                results.push({
                    id: 'faq',
                    title: faq.question,
                    category: 'คำถามที่พบบ่อย',
                    snippet: '',
                    isFaq: true,
                    faqIndex: index
                });
            }
        });

        if (results.length > 0) {
            searchResults.innerHTML = results.slice(0, 8).map(r => `
                <div class="search-result-item" onclick="handleSearchClick('${r.id}', ${r.isFaq ? r.faqIndex : -1})">
                    <div class="search-result-category">${r.category}</div>
                    <div class="search-result-title">${highlightText(r.title, query)}</div>
                    ${r.snippet ? `<div class="search-result-snippet">${highlightText(r.snippet, query)}</div>` : ''}
                </div>
            `).join('');
            searchResults.classList.add('visible');
        } else {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>ไม่พบผลลัพธ์สำหรับ "${e.target.value}"</p>
                </div>
            `;
            searchResults.classList.add('visible');
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('visible');
        }
    });

    // Close on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.classList.remove('visible');
            searchInput.blur();
        }
    });
}

function handleSearchClick(id, faqIndex) {
    document.getElementById('searchResults').classList.remove('visible');
    document.getElementById('searchInput').value = '';

    if (id === 'faq') {
        showFAQ();
        setTimeout(() => {
            if (faqIndex >= 0) toggleFAQ(faqIndex);
        }, 300);
    } else {
        navigateTo(id);
    }
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// =============================================
// Mobile Menu
// =============================================
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    menuBtn?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    });

    overlay?.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    document.querySelector('.sidebar')?.classList.remove('open');
    document.getElementById('sidebarOverlay')?.classList.remove('open');
}

// =============================================
// Utilities
// =============================================
function setLastUpdatedDate() {
    const now = new Date();
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const thaiYear = now.getFullYear() + 543;
    const dateStr = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${thaiYear}`;
    const el = document.getElementById('lastUpdated');
    if (el) el.textContent = `อัปเดตล่าสุด: ${dateStr}`;
}

function sendFeedback(type, btn) {
    const buttons = document.querySelectorAll('.feedback-btn');
    buttons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    const feedbackText = document.querySelector('.article-feedback p');
    feedbackText.textContent = 'ขอบคุณสำหรับความคิดเห็น!';
    feedbackText.style.color = 'var(--color-primary)';
}
