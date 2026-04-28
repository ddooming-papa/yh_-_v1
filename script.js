// 전역 데이터 객체 (DOMContentLoaded 시점에 data.js 로드 후 초기화)
let db = {};

// DOM 요소들
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 데이터 초기화 및 렌더링
function initializeData() {
    console.log("Data loaded from data.js:", db);
    renderAllContent();
    initializeAdminPanel();
}

// 모든 콘텐츠 렌더링
function renderAllContent() {
    renderProfileContent();
    renderAboutContent();
    renderSkills();
    renderExperienceData();
    renderProjects();
    renderContactInfo();
    initializeTypingEffect();
}

// 모바일 메뉴 토글
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 모바일 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.toggle('active');
    });
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.boxShadow = 'none';
    }
});

// 스크롤 애니메이션 설정
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들 관찰 시작
function setupAnimations() {
    const animateElements = document.querySelectorAll('.about-content, .timeline-item, .project-card, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// --- 프로필 섹션 ---
function renderProfileContent() {
    const heroTitle = document.getElementById('heroTitle');
    const heroDescription = document.getElementById('heroDescription');
    const profileIcon = document.getElementById('profileIcon');
    const profileImageDisplay = document.getElementById('profileImageDisplay');

    if (db.profile) {
        if (heroTitle) heroTitle.textContent = db.profile.title;
        if (heroDescription) heroDescription.innerHTML = db.profile.description;
        
        if (db.profile.imageUrl && profileImageDisplay && profileIcon) {
            profileImageDisplay.src = db.profile.imageUrl;
            profileImageDisplay.style.display = 'block';
            profileIcon.style.display = 'none';
        } else if (profileIcon && profileImageDisplay) {
            profileIcon.className = db.profile.icon || 'fas fa-user';
            profileIcon.style.display = 'block';
            profileImageDisplay.style.display = 'none';
        }
    }
}

// --- 소개 섹션 ---
function renderAboutContent() {
    // Typing effect handles this
}

function initializeTypingEffect() {
    const targetElement = document.getElementById('typed-intro');
    if (targetElement && typeof Typed !== 'undefined' && db.about) {
        targetElement.innerHTML = ''; // Clear previous
        const paragraph1Html = db.about.paragraph1.replace(/\n/g, '<br>');
        const fullText = `${paragraph1Html}<br><br>${db.about.paragraph2}`;
        
        new Typed('#typed-intro', {
            strings: [fullText],
            typeSpeed: 40,
            loop: false,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// --- 기술 스택 섹션 ---
function renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid || !db.skills) return;

    skillsGrid.innerHTML = '';
    db.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-icon-container">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-content">
                <h3>${skill.title}</h3>
                <p>${skill.description}</p>
                <div class="skill-tags">
                    ${skill.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        skillsGrid.appendChild(skillItem);
    });
}

// --- 경력 섹션 ---
function formatExperienceDescription(description) {
    if (!description) return { summaryHtml: '', fullHtml: '' };

    const sections = description.split('\n\n');
    let summaryHtml = '';
    let fullHtml = '';

    sections.forEach(section => {
        const lines = section.split('\n');
        const titleMatch = lines[0].match(/\[(.*?)\]/);
        
        if (titleMatch) {
            const title = titleMatch[1];
            const contentLines = lines.slice(1).filter(l => l.trim());
            
            // fullHtml: 전체 항목 모두 표시
            let fullSectionHtml = `<div class="exp-section">
                <span class="exp-section-title">${title}</span>
                <ul class="exp-bullets">`;
            contentLines.forEach(line => {
                const text = line.trim().startsWith('-') ? line.trim().substring(1).trim() : line.trim();
                if (text) fullSectionHtml += `<li>${text}</li>`;
            });
            fullSectionHtml += `</ul></div>`;
            fullHtml += fullSectionHtml;

            // summaryHtml: 담당 업무만 최대 3줄
            if (title === '담당 업무') {
                const previewLines = contentLines.slice(0, 3);
                const remaining = contentLines.length - 3;
                let summarySectionHtml = `<div class="exp-section">
                <span class="exp-section-title">${title}</span>
                <ul class="exp-bullets">`;
                previewLines.forEach(line => {
                    const text = line.trim().startsWith('-') ? line.trim().substring(1).trim() : line.trim();
                    if (text) summarySectionHtml += `<li>${text}</li>`;
                });
                if (remaining > 0) {
                    summarySectionHtml += `<li class="exp-more">외 ${remaining}개 항목 →</li>`;
                }
                summarySectionHtml += `</ul></div>`;
                summaryHtml += summarySectionHtml;
            }
        } else {
            const plainHtml = `<p class="exp-desc">${section.replace(/\n/g, '<br>')}</p>`;
            summaryHtml += plainHtml;
            fullHtml += plainHtml;
        }
    });

    return { summaryHtml, fullHtml };
}

function renderExperienceData() {
    const timeline = document.querySelector('#experience .timeline');
    if (!timeline || !db.experience) return;

    timeline.innerHTML = '';
    const sortedExp = [...db.experience].sort((a, b) => {
        const dateA = a.date.split(' ')[0];
        const dateB = b.date.split(' ')[0];
        return new Date(dateB.replace(/\./g, '-')) - new Date(dateA.replace(/\./g, '-'));
    });

    sortedExp.forEach((exp, index) => {
        const { summaryHtml, fullHtml } = formatExperienceDescription(exp.description);
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <span class="date">${exp.date}</span>
                <div class="exp-summary">${summaryHtml}</div>
                <button class="exp-modal-trigger" data-id="${exp.id}">
                    <i class="fas fa-search-plus"></i> 자세히 보기
                </button>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
    
    setupAnimations();
}

// --- 프로젝트 섹션 ---
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid || !db.projects) return;

    // 필터 탭 + 카드 그리드 렌더링
    const companies = ['전체', ...new Set(db.projects.map(p => p.company))];
    const companyCount = {};
    db.projects.forEach(p => { companyCount[p.company] = (companyCount[p.company] || 0) + 1; });

    projectsGrid.innerHTML = `
        <div class="project-filter-tabs" id="projectFilterTabs">
            ${companies.map((c, i) => `
                <button class="pf-tab ${i === 0 ? 'active' : ''}" data-company="${c}" onclick="filterProjects('${c}', this)">
                    ${c === '전체' ? '전체 ' + db.projects.length : c + ' ' + (companyCount[c] || 0)}
                </button>
            `).join('')}
        </div>
        <div class="project-cards-grid" id="projectCardsGrid">
            ${db.projects.map(p => `
                <div class="pj-card" data-company="${p.company}" onclick="openProjectModal(${p.id})">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                        <div class="pj-icon">${p.emoji || '📁'}</div>
                        <span class="pj-company">${p.company}</span>
                    </div>
                    <div class="pj-title">${p.title}</div>
                    <div class="pj-period">${p.period}</div>
                    <div class="pj-summary">${p.summary}</div>
                    <div class="pj-tags">
                        ${p.tags.map(t => `<span class="pj-tag ${t.color || ''}">${t.label}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function filterProjects(company, btn) {
    document.querySelectorAll('.pf-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.pj-card').forEach(card => {
        const show = company === '전체' || card.dataset.company === company;
        card.style.display = show ? '' : 'none';
    });
}

function openProjectModal(id) {
    const project = db.projects.find(p => p.id === id);
    if (!project) return;
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    document.getElementById('projectModalTitle').textContent = project.title;
    document.getElementById('projectModalCompany').textContent = project.company + ' · ' + project.period;
    document.getElementById('projectModalWhat').innerHTML = project.what.map(w => `<li>${w}</li>`).join('');
    document.getElementById('projectModalResult').innerHTML = project.result.map(r => `<li>${r}</li>`).join('');
    modal.style.cssText = 'display:flex !important; opacity:1 !important; align-items:center; justify-content:center; animation:none !important; position:fixed !important; z-index:999999 !important; top:0 !important; left:0 !important; width:100% !important; height:100% !important; background-color:rgba(0,0,0,0.8) !important;';
    modal.querySelector('.modal-content').style.cssText = 'animation:none !important; opacity:1 !important; background:#fff !important; border:1px solid #e0e7ef !important; padding:2rem; border-radius:12px; max-width:520px; width:90%; max-height:85vh; overflow-y:auto;';
}

// --- 연락처 섹션 ---
function renderContactInfo() {
    const emailDisp = document.getElementById('contactEmailDisplay');
    const phoneDisp = document.getElementById('contactPhoneDisplay');
    const locDisp = document.getElementById('contactLocationDisplay');
    const githubLink = document.getElementById('contactGithubLink');
    const linkedinLink = document.getElementById('contactLinkedinLink');
    const twitterLink = document.getElementById('contactTwitterLink');

    if (db.contact) {
        if (emailDisp) emailDisp.textContent = db.contact.email;
        if (phoneDisp) phoneDisp.textContent = db.contact.phone;
        if (locDisp) locDisp.textContent = db.contact.location;
        if (githubLink) githubLink.href = db.contact.github;
        if (linkedinLink) linkedinLink.href = db.contact.linkedin;
        if (twitterLink) twitterLink.href = db.contact.twitter;
    }
}

// --- 모달 관리 ---
function openModal(project) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImage').innerHTML = `<i class="${project.icon}"></i>`;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalTech').innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');
    document.getElementById('modalLinks').innerHTML = `
        <a href="${project.demo}" class="btn btn-primary" target="_blank">데모 보기</a>
        <a href="${project.code}" class="btn btn-secondary" target="_blank">코드 보기</a>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// 경력 상세 모달
function openExperienceModal(expId) {
    const exp = db.experience.find(e => e.id == expId);
    if (!exp) return;

    const modal = document.getElementById('experienceModal');
    const title = document.getElementById('expModalTitle');
    const date = document.getElementById('expModalDate');
    const body = document.getElementById('expModalBody');

    if (modal && title && date && body) {
        title.textContent = `${exp.company} - ${exp.title}`;
        date.textContent = exp.date;
        const { fullHtml } = formatExperienceDescription(exp.description);
        body.innerHTML = fullHtml;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// --- 관리자 패널 ---
function initializeAdminPanel() {
    const adminNavLink = document.getElementById('adminNavLink');
    const adminPasswordPrompt = document.getElementById('adminPasswordPrompt');
    const adminPasswordSubmit = document.getElementById('adminPasswordSubmit');
    const adminPasswordCancel = document.getElementById('adminPasswordCancel');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    
    let isAuthenticated = false;
    const SECRET = 'wjsdur1206!!@@';

    adminNavLink?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            adminPasswordPrompt.style.display = 'flex';
            adminPasswordInput.focus();
        } else {
            toggleAdminPanel();
        }
    });

    adminPasswordSubmit?.addEventListener('click', () => {
        if (adminPasswordInput.value === SECRET) {
            isAuthenticated = true;
            adminPasswordPrompt.style.display = 'none';
            adminPasswordInput.value = '';
            toggleAdminPanel();
        } else {
            alert('비밀번호가 틀렸습니다.');
            adminPasswordInput.value = '';
        }
    });

    adminPasswordCancel?.addEventListener('click', () => {
        adminPasswordPrompt.style.display = 'none';
        adminPasswordInput.value = '';
    });

    // ESC로 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('adminFormContainer').style.display = 'none';
            document.getElementById('adminPasswordPrompt').style.display = 'none';
            closeModal();
            document.getElementById('experienceModal')?.classList.remove('show');
        }
    });
    
    // 모달 닫기 버튼들
    document.getElementById('closeModal')?.addEventListener('click', closeModal);
    document.getElementById('closeExpModal')?.addEventListener('click', () => {
        document.getElementById('experienceModal').classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // 경력 모달 트리거 이벤트 위임
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.exp-modal-trigger');
        if (trigger) {
            openExperienceModal(trigger.dataset.id);
        }
    });

    populateAdminFields();
}

function toggleAdminPanel() {
    const container = document.getElementById('adminFormContainer');
    if (container.style.display === 'none' || !container.style.display) {
        container.style.display = 'flex';
        openAdminTab(null, 'profileAdmin');
    } else {
        container.style.display = 'none';
    }
}

function openAdminTab(evt, tabName) {
    const contents = document.getElementsByClassName('admin-tab-content');
    for (let content of contents) content.style.display = 'none';

    const buttons = document.getElementsByClassName('admin-tab-button');
    for (let btn of buttons) btn.classList.remove('active');

    document.getElementById(tabName).style.display = 'block';
    if (evt) evt.currentTarget.classList.add('active');
    else document.querySelector(`[onclick*="${tabName}"]`)?.classList.add('active');
}

function populateAdminFields() {
    // Profile
    document.getElementById('adminHeroTitle').value = db.profile.title || '';
    document.getElementById('adminHeroDescription').value = db.profile.description || '';
    document.getElementById('adminProfileIcon').value = db.profile.icon || '';
    document.getElementById('adminProfileImageUrl').value = db.profile.imageUrl || '';
    
    // About
    document.getElementById('aboutText1').value = db.about.paragraph1 || '';
    document.getElementById('aboutText2').value = db.about.paragraph2 || '';
    
    // Contact
    document.getElementById('adminContactEmail').value = db.contact.email || '';
    document.getElementById('adminContactPhone').value = db.contact.phone || '';
    document.getElementById('adminContactLocation').value = db.contact.location || '';
    document.getElementById('adminContactPortfolio').value = db.contact.github || '';
    document.getElementById('adminContactResume').value = db.contact.linkedin || '';
    document.getElementById('adminContactWorkHistory').value = db.contact.twitter || '';

    renderAdminProjectList();
    renderAdminSkillsList();
    renderAdminExperienceList();
}

// --- 데이터 저장 및 다운로드 ---
function downloadDataJs() {
    const dataStr = `window.portfolioData = ${JSON.stringify(db, null, 2)};`;
    const blob = new Blob([dataStr], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('data.js 파일이 생성되었습니다. 기존 파일을 덮어쓰고 페이지를 새로고침하세요.');
}

function saveProfileContent() {
    db.profile.title = document.getElementById('adminHeroTitle').value;
    db.profile.description = document.getElementById('adminHeroDescription').value;
    db.profile.icon = document.getElementById('adminProfileIcon').value;
    db.profile.imageUrl = document.getElementById('adminProfileImageUrl').value;
    renderProfileContent();
    downloadDataJs();
}

function saveAboutContent() {
    db.about.paragraph1 = document.getElementById('aboutText1').value;
    db.about.paragraph2 = document.getElementById('aboutText2').value;
    renderAboutContent();
    downloadDataJs();
}

function saveContactInfo() {
    db.contact.email = document.getElementById('adminContactEmail').value;
    db.contact.phone = document.getElementById('adminContactPhone').value;
    db.contact.location = document.getElementById('adminContactLocation').value;
    db.contact.github = document.getElementById('adminContactPortfolio').value;
    db.contact.linkedin = document.getElementById('adminContactResume').value;
    db.contact.twitter = document.getElementById('adminContactWorkHistory').value;
    renderContactInfo();
    downloadDataJs();
}

// --- 리스트 관리 (Admin) ---
function renderAdminProjectList() {
    const list = document.getElementById('adminProjectList');
    if (!list) return;
    list.innerHTML = db.projects.map(p => `
        <div class="admin-list-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
            <span>${p.title}</span>
            <button onclick="deleteProject(${p.id})" class="btn btn-small secondary">삭제</button>
        </div>
    `).join('');
}

function addProject() {
    const title = document.getElementById('projectTitle').value;
    const desc = document.getElementById('projectDescription').value;
    const tech = document.getElementById('projectTech').value;
    if (!title || !desc) return alert('제목과 설명은 필수입니다.');

    db.projects.push({
        id: Date.now(),
        title,
        description: desc,
        tech: tech.split(',').map(t => t.trim()),
        demo: document.getElementById('projectDemo').value || '#',
        code: document.getElementById('projectCode').value || '#',
        icon: document.getElementById('projectIcon').value || 'fas fa-project-diagram'
    });
    renderProjects();
    renderAdminProjectList();
    downloadDataJs();
}

function deleteProject(id) {
    if (confirm('삭제하시겠습니까?')) {
        db.projects = db.projects.filter(p => p.id !== id);
        renderProjects();
        renderAdminProjectList();
        downloadDataJs();
    }
}

function renderAdminSkillsList() {
    const list = document.getElementById('adminSkillsList');
    if (!list) return;
    list.innerHTML = db.skills.map(s => `
        <div class="admin-list-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
            <span>${s.title}</span>
            <button onclick="deleteSkill(${s.id})" class="btn btn-small secondary">삭제</button>
        </div>
    `).join('');
}

function addSkill() {
    const title = document.getElementById('newSkillName').value;
    const desc = document.getElementById('newSkillDescription').value;
    const tags = document.getElementById('newSkillTags').value;
    const icon = document.getElementById('newSkillIcon').value;
    if (!title || !desc) return alert('제목과 설명은 필수입니다.');

    db.skills.push({
        id: Date.now(),
        title,
        description: desc,
        tags: tags.split(',').map(t => t.trim()),
        icon: icon || 'fas fa-code'
    });
    renderSkills();
    renderAdminSkillsList();
    downloadDataJs();
}

function deleteSkill(id) {
    if (confirm('삭제하시겠습니까?')) {
        db.skills = db.skills.filter(s => s.id !== id);
        renderSkills();
        renderAdminSkillsList();
        downloadDataJs();
    }
}

function renderAdminExperienceList() {
    const list = document.getElementById('adminExperienceList');
    if (!list) return;
    list.innerHTML = db.experience.map(e => `
        <div class="admin-list-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
            <span>${e.company} - ${e.title}</span>
            <button onclick="editExperience(${e.id})" class="btn btn-small" style="margin-right: 5px;">수정</button>
            <button onclick="deleteExperience(${e.id})" class="btn btn-small secondary">삭제</button>
        </div>
    `).join('');
}

function addExperience() {
    const title = document.getElementById('expTitle').value;
    const company = document.getElementById('expCompany').value;
    const date = document.getElementById('expDate').value;
    const desc = document.getElementById('expDescription').value;
    if (!title || !company || !date) return alert('직책, 회사, 기간은 필수입니다.');

    db.experience.unshift({
        id: Date.now(),
        title,
        company,
        date,
        description: desc
    });

    // 폼 초기화
    document.getElementById('expTitle').value = '';
    document.getElementById('expCompany').value = '';
    document.getElementById('expDate').value = '';
    document.getElementById('expDescription').value = '';

    renderExperienceData();
    renderAdminExperienceList();
    downloadDataJs();
}

function editExperience(id) {
    const exp = db.experience.find(e => e.id === id);
    if (!exp) return;

    document.getElementById('expTitle').value = exp.title;
    document.getElementById('expCompany').value = exp.company;
    document.getElementById('expDate').value = exp.date;
    document.getElementById('expDescription').value = exp.description;

    const addBtn = document.getElementById('expAddBtn');
    addBtn.textContent = '경력 업데이트';
    addBtn.onclick = () => updateExperience(id);
}

function updateExperience(id) {
    const expIndex = db.experience.findIndex(e => e.id === id);
    if (expIndex === -1) return;

    db.experience[expIndex] = {
        ...db.experience[expIndex],
        title: document.getElementById('expTitle').value,
        company: document.getElementById('expCompany').value,
        date: document.getElementById('expDate').value,
        description: document.getElementById('expDescription').value
    };

    // 폼 초기화 및 버튼 원상복구
    document.getElementById('expTitle').value = '';
    document.getElementById('expCompany').value = '';
    document.getElementById('expDate').value = '';
    document.getElementById('expDescription').value = '';
    
    const addBtn = document.getElementById('expAddBtn');
    addBtn.textContent = '경력 추가';
    addBtn.onclick = addExperience;

    renderExperienceData();
    renderAdminExperienceList();
    downloadDataJs();
}

function deleteExperience(id) {
    if (confirm('삭제하시겠습니까?')) {
        db.experience = db.experience.filter(e => e.id !== id);
        renderExperienceData();
        renderAdminExperienceList();
        downloadDataJs();
    }
}

// 초기 로드
document.addEventListener('DOMContentLoaded', () => {
    db = window.portfolioData || {
        profile: {},
        about: {},
        skills: [],
        experience: [],
        projects: [],
        contact: {}
    };
    initializeData();
    // 전역 함수 노출 (onclick 이벤트에서 호출 가능하도록)
    window.filterProjects = filterProjects;
    window.openProjectModal = openProjectModal;
});
