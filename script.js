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
    document.getElementById('projectModalTitle').textContent = project.emoji + ' ' + project.title;
    document.getElementById('projectModalCompany').textContent = project.company + ' · ' + project.period;

    // 역할 배지
    const roleHtml = project.role ? `<div style="display:inline-block;background:#eef4ff;color:#1e5fa8;border:1px solid #c5d9f7;border-radius:999px;padding:3px 12px;font-size:0.8rem;margin-bottom:1rem;">${project.role}</div>` : '';

    // 상세 섹션별 렌더링
    let detailHtml = '';
    if (project.details && project.details.length > 0) {
        detailHtml = project.details.map(d => `
            <div style="margin-bottom:1.2rem;">
                <div style="font-size:0.78rem;font-weight:700;color:#1e88e5;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;padding-bottom:4px;border-bottom:1.5px solid #e3f0fd;">
                    ${d.section}
                </div>
                <ul class="pj-modal-list">
                    ${d.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    } else {
        detailHtml = `
            <div style="margin-bottom:1rem;">
                <div style="font-size:0.78rem;font-weight:700;color:#1e88e5;margin-bottom:0.5rem;">주요 내용</div>
                <ul class="pj-modal-list">${project.what.map(w => `<li>${w}</li>`).join('')}</ul>
            </div>
            <div>
                <div style="font-size:0.78rem;font-weight:700;color:#1e88e5;margin-bottom:0.5rem;">핵심 성과</div>
                <ul class="pj-modal-list">${project.result.map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
        `;
    }

    // 이미지 (있는 경우 하단에 표시) - 클릭 시 확대
    const imageHtml = project.image ? `
        <div style="margin-top:1.5rem;border-top:1px solid #e8f0fb;padding-top:1.2rem;">
            <div style="font-size:0.78rem;font-weight:700;color:#1e88e5;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.8rem;">요약 다이어그램 <span style="font-weight:400;color:#aaa;font-size:0.72rem;">(클릭하면 확대)</span></div>
            <img src="${project.image}" alt="${project.title}"
                style="width:100%;border-radius:8px;border:1px solid #e8f0fb;cursor:zoom-in;transition:opacity 0.15s;"
                onmouseover="this.style.opacity='0.85'"
                onmouseout="this.style.opacity='1'"
                onclick="openImageLightbox(this.src, '${project.title}')" />
        </div>` : '';

    // 라이트박스가 없으면 생성
    if (!document.getElementById('imageLightbox')) {
        const lb = document.createElement('div');
        lb.id = 'imageLightbox';
        lb.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999999;background:rgba(0,0,0,0.92);align-items:center;justify-content:center;padding:2rem;cursor:zoom-out;';
        lb.innerHTML = '<img id="lightboxImg" style="max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,0.5);object-fit:contain;" />' +
            '<div id="lightboxCaption" style="position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);color:#fff;font-size:0.9rem;opacity:0.8;"></div>' +
            '<button onclick="document.getElementById('imageLightbox').style.display='none'" style="position:fixed;top:1.5rem;right:1.5rem;background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:1.5rem;width:40px;height:40px;border-radius:50%;cursor:pointer;line-height:1;">✕</button>';
        lb.onclick = function(e) { if(e.target === lb) lb.style.display = 'none'; };
        document.body.appendChild(lb);
        // ESC 키로 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') document.getElementById('imageLightbox').style.display = 'none';
        });
    }

    document.getElementById('projectModalWhat').innerHTML = roleHtml + detailHtml + imageHtml;
    document.getElementById('projectModalResult').innerHTML = '';

    modal.style.cssText = 'display:flex !important; opacity:1 !important; align-items:flex-start; justify-content:center; animation:none !important; position:fixed !important; z-index:999999 !important; top:0 !important; left:0 !important; width:100% !important; height:100% !important; background-color:rgba(0,0,0,0.7) !important; padding-top:5vh; overflow-y:auto;';
    const mc = modal.querySelector('.modal-content');
    mc.style.cssText = 'animation:none !important; opacity:1 !important; background:#fff !important; border:1px solid #e0e7ef !important; padding:1.8rem; border-radius:14px; max-width:580px; width:92%; margin-bottom:5vh;';
    mc.scrollTop = 0;
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

// 이미지 라이트박스 열기
function openImageLightbox(src, title) {
    const lb = document.getElementById('imageLightbox');
    if (!lb) return;
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxCaption').textContent = title;
    lb.style.display = 'flex';
}

// 초기 로드
document.addEventListener('DOMContentLoaded', () => {
    // data.js가 로드되지 않았을 경우 재시도
    function tryInit(retries) {
        if (window.portfolioData) {
            db = window.portfolioData;
            // 경력 데이터 강제 최신화
            db.experience = [
                {
                    id: 1, title: "프로", company: "동화기업",
                    date: "2022.03.02 ~ 재직중",
                    description: "[담당 업무]\n- 온프레미스·클라우드 하이브리드 인프라 운영 및 관리\n- IDC 센터 운영 및 가상화/서버 인프라 관리\n- 클라우드(AWS, Azure, M365) 운영\n- 모니터링, DR, 보안 이슈 대응 및 운영 표준화\n- AI 도구 활용을 통한 인프라 운영 효율 개선\n\n[핵심 수행 업무]\n- HCI 및 VMware 기반 가상화 환경 운영 및 관리\n- 물리 서버·스토리지 IDC 구성 및 운영\n- AWS 인프라 운영(EC2, VPC, S3, EBS/EFS, ELB, RDS, CDN, RI 등)\n- MS Azure 및 M365 서비스 운영(SharePoint, OneDrive, Teams 등)\n- Zabbix 기반 통합 모니터링 시스템 운영 및 Grafana 대시보드 구성\n- Python 기반 자체 모니터링 스크립트 및 Teams 자동 알림 연동\n- DR 구성 PoC 수행(On-prem → AWS) 및 테스트 시나리오 수립\n- AD, DNS, SMTP 서버 신규 구축 및 보안 이슈 대응\n- ChatGPT, Copilot, Gemini, Cursor 등 AI 도구 활용 운영 자동화\n\n[주요 성과]\n- 하이브리드 인프라 환경에서 온프레미스·클라우드·IDC를 아우르는 안정적인 운영 체계 유지\n- 모니터링 및 운영 문서 표준화를 통해 장애 대응 효율 및 인수인계 품질 개선\n- DR 구성 PoC 및 테스트 수행을 통해 재해 복구 관점의 인프라 운영 기준 수립\n- AI 도구를 인프라 운영에 적용하여 반복 업무 부담을 줄이고 운영 생산성 향상에 기여"
                },
                {
                    id: 2, title: "대리", company: "한국씰마스타",
                    date: "2016.10.13 ~ 2022.02.28",
                    description: "[담당 업무]\n- 사내 IT 인프라 전반 운영 및 관리\n- 서버·네트워크·보안·ERP 시스템 운영\n- IT 아웃소싱 운영 및 외부 보안 감사(Audit) 대응\n\n[핵심 수행 업무]\n- AD 기반 사용자 계정 및 GPO 권한 관리, Teams 화상회의 시스템 운영\n- SMB 기반 네트워크 파일 서버 구성 및 접근 권한 관리\n- AD, Exchange 서버 및 Windows(NT), Linux, IBM, Hyper-V 환경 서버 운영\n- 대용량 NAS 구성·운영 및 저사양 서버 고도화 작업 수행\n- ERP 시스템 구축·운영 계획 수립 및 서버 환경 구성\n- 본사 및 국내·해외 사업장 방화벽, VPN 구성 및 원격 접속 환경 운영\n- Fasoo DRM, Waterwall, MDM, AppCheck, ESET 등 보안 솔루션 운영\n- 삼성, AMAT, Lam Research 등 외부 보안 감사(Audit) 대응\n\n[주요 성과]\n- 사내 IT 인프라 전반을 단일 담당자로 운영하며 서버·네트워크·보안·업무 시스템의 안정적인 운영 체계 유지\n- ERP 시스템 구축·운영 및 AD·보안 솔루션 통합 관리를 통해 사용자 환경 변경 및 장애 대응에 대한 운영 기준 정립\n- 외부 보안 감사(Audit) 및 IT 아웃소싱 관리 경험을 통해 제조업 환경에서 요구되는 보안·내부 통제 관점을 실무적으로 확보"
                },
                {
                    id: 3, title: "AM", company: "아이크래프트",
                    date: "2014.12.08 ~ 2016.03.31",
                    description: "[담당 업무]\n- KT 코넷망 대상 네트워크 장비 운영 및 유지보수 담당\n- 백본(L3) 라우터 대개체 작업 수행 및 현장 기술 지원\n\n[핵심 수행 업무]\n- Juniper 장비 기반 L3 백본 라우터 구성 및 설정\n- KT 주요 국사(혜화, 구로, 행당, 광화문, 수원, 익산, 거제 등) 장비 대개체 작업 수행\n- 작업 계획서, 구성(Config) 문서, 선번장 작성 및 협력사 공유를 통한 작업 절차 정리\n- 현장 회선 테스트 및 사전 컨피그 업로드 수행\n- Cisco 저사양 장비 → Juniper 고사양 장비(T-Series) 업그레이드 작업\n\n[주요 성과]\n- 백본 라우터 대개체 프로젝트 참여를 통해 대규모 네트워크 환경 변경 작업 경험 확보\n- 사전 계획·점검 기반 작업 수행으로 장애 발생 없이 안정적인 전환 완료\n- 네트워크 이론을 현장 환경에 적용하며 실무 중심의 문제 해결 역량 강화"
                }
            ];
            initializeData();
            window.filterProjects = filterProjects;
            window.openProjectModal = openProjectModal;
        } else if (retries > 0) {
            setTimeout(() => tryInit(retries - 1), 200);
        } else {
            db = { profile: {}, about: {}, skills: [], experience: [], projects: [], contact: {} };
            initializeData();
            window.filterProjects = filterProjects;
            window.openProjectModal = openProjectModal;
        }
    }
    tryInit(10);
});
