// =============================================
// Help Center - Storage Layer (Firebase)
// Handles database persistence for articles & sidebar
// =============================================

let _localData = {
    articles: {},
    sidebar: [],
    faq: [],
    settings: { adminPassword: 'admin1234' }
};

let _isInitialized = false;

const Storage = {
    // Initialize connection and sync data
    initialize(callback) {
        if (_isInitialized) {
            if (callback) callback();
            return;
        }

        const docRef = window.db.collection('helpcenter').doc('data');
        
        docRef.onSnapshot((doc) => {
            const data = doc.data() || {};
            
            // Map data or apply defaults if empty
            _localData.articles = data.articles || (typeof ARTICLES !== 'undefined' ? {...ARTICLES} : {});
            _localData.sidebar = data.sidebar || (typeof SIDEBAR_STRUCTURE !== 'undefined' ? [...SIDEBAR_STRUCTURE] : []);
            _localData.faq = data.faq || (typeof FAQ_DATA !== 'undefined' ? [...FAQ_DATA] : []);
            _localData.settings = data.settings || { adminPassword: 'admin1234' };
            
            if (!_isInitialized) {
                _isInitialized = true;
                if (callback) callback();
            } else {
                // Trigger event when data updates while app is active
                document.dispatchEvent(new CustomEvent('storageUpdated'));
            }
        }, (error) => {
            console.error("Firestore Read Error:", error);
            // Fallback to defaults to prevent freezing
            _localData.articles = typeof ARTICLES !== 'undefined' ? {...ARTICLES} : {};
            _localData.sidebar = typeof SIDEBAR_STRUCTURE !== 'undefined' ? [...SIDEBAR_STRUCTURE] : [];
            _localData.faq = typeof FAQ_DATA !== 'undefined' ? [...FAQ_DATA] : [];
            if (!_isInitialized) {
                _isInitialized = true;
                if (callback) callback();
            }
        });
    },

    // ---- Articles ----
    getArticles() { return _localData.articles; },
    saveArticles(articles) {
        _localData.articles = articles;
        window.db.collection('helpcenter').doc('data').set({ articles }, { merge: true }).catch(e => console.error(e));
    },
    getArticle(id) { return this.getArticles()[id] || null; },
    saveArticle(article) {
        const articles = this.getArticles();
        articles[article.id] = article;
        this.saveArticles(articles);
    },
    deleteArticle(id) {
        const articles = this.getArticles();
        delete articles[id];
        this.saveArticles(articles);
    },

    // ---- Sidebar Structure ----
    getSidebar() { return _localData.sidebar; },
    saveSidebar(sidebar) {
        _localData.sidebar = sidebar;
        window.db.collection('helpcenter').doc('data').set({ sidebar }, { merge: true }).catch(e => console.error(e));
    },

    // ---- FAQ ----
    getFAQ() { return _localData.faq; },
    saveFAQ(faq) {
        _localData.faq = faq;
        window.db.collection('helpcenter').doc('data').set({ faq }, { merge: true }).catch(e => console.error(e));
    },

    // ---- Settings ----
    getSettings() { return _localData.settings; },
    saveSettings(settings) {
        _localData.settings = settings;
        window.db.collection('helpcenter').doc('data').set({ settings }, { merge: true }).catch(e => console.error(e));
    },

    // ---- Maintenance ----
    resetAll() {
        window.db.collection('helpcenter').doc('data').delete().catch(e => console.error(e));
    },

    exportAll() {
        return JSON.stringify({
            articles: this.getArticles(),
            sidebar: this.getSidebar(),
            faq: this.getFAQ(),
            settings: this.getSettings(),
            exportedAt: new Date().toISOString()
        }, null, 2);
    },

    importAll(jsonStr) {
        const data = JSON.parse(jsonStr);
        if (data.articles) this.saveArticles(data.articles);
        if (data.sidebar) this.saveSidebar(data.sidebar);
        if (data.faq) this.saveFAQ(data.faq);
        if (data.settings) this.saveSettings(data.settings);
        return true;
    }
};
