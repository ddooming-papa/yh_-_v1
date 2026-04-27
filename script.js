// 전역 데이터 객체
let db = window.portfolioData || {
    profile: {},
    about: {},
    skills: [],
    experience: [
        {
            id: 1,
            title: "프로",
            company: "동화기업",
            date: "2022.03.02 ~ 재직중",
            description: `[담당 업무]
- 온프레미스·클라우드 하이브리드 인프라 운영 및 관리
- IDC 센터 운영 및 가상화/서버 인프라 관리
- 클라우드(AWS, Azure, M365) 운영
- 모니터링, DR, 보안 이슈 대응 및 운영 표준화
- AI 도구 활용을 통한 인프라 운영 효율 개선

[핵심 수행 업무]
- HCI 및 VMware 기반 가상화 환경 운영 및 관리
- 물리 서버·스토리지 IDC 구성 및 운영
- AWS 인프라 운영(EC2, VPC, S3, EBS/EFS, ELB, RDS, CDN, RI 등)
- MS Azure 및 M365 서비스 운영(SharePoint, OneDrive, Teams 등)
- Zabbix 기반 통합 모니터링 시스템 운영 및 Grafana 대시보드 구성
- Python 기반 자체 모니터링 스크립트 및 Teams 자동 알림 연동
- DR 구성 PoC 수행(On-prem → AWS) 및 테스트 시나리오 수립
- AD, DNS, SMTP 서버 신규 구축 및 보안 이슈 대응
- ChatGPT, Copilot, Gemini, Cursor 등 AI 도구 활용 운영 자동화

[주요 성과]
- 하이브리드 인프라 환경에서 온프레미스·클라우드·IDC를 아우르는 안정적인 운영 체계 유지
- 모니터링 및 운영 문서 표준화를 통해 장애 대응 효율 및 인수인계 품질 개선
- DR 구성 PoC 및 테스트 수행을 통해 재해 복구 관점의 인프라 운영 기준 수립
- AI 도구를 인프라 운영에 적용하여 반복 업무 부담을 줄이고 운영 생산성 향상에 기여`
        },
        {
            id: 2,
            title: "대리",
            company: "한국쌀마스타",
            date: "2016.10.13 ~ 2022.02.28",
            description: `[담당 업무]
- 사내 IT 인프라 전반 운영 및 관리
- 서버·네트워크·보안·ERP 시스템 운영
- IT 아웃소싱 운영 및 외부 보안 감사(Audit) 대응

[핵심 수행 업무]
- AD 기반 사용자 계정 및 GPO 권한 관리, Teams 화상회의 시스템 운영
- SMB 기반 네트워크 파일 서버 구성 및 접근 권한 관리
- AD, Exchange 서버 및 Windows(NT), Linux, IBM, Hyper-V 환경 서버 운영
- 대용량 NAS 구성·운영 및 저사양 서버 고도화 작업 수행
- ERP 시스템 구축·운영 계획 수립 및 서버 환경 구성
- 본사 및 국내·해외 사업장 방화벽, VPN 구성 및 원격 접속 환경 운영
- Fasoo DRM, Waterwall, MDM, AppCheck, ESET 등 보안 솔루션 운영
- 삼성, AMAT, Lam Research 등 외부 보안 감사(Audit) 대응

[주요 성과]
- 사내 IT 인프라 전반을 단일 담당자로 운영하며 서버·네트워크·보안·업무 시스템의 안정적인 운영 체계 유지
- ERP 시스템 구축·운영 및 AD·보안 솔루션 통합 관리를 통해 사용자 환경 변경 및 장애 대응에 대한 운영 기준 정립
- 외부 보안 감사(Audit) 및 IT 아웃소싱 관리 경험을 통해 제조업 환경에서 요구되는 보안·내부 통제 관점을 실무적으로 확보`
        },
        {
            id: 3,
            title: "AM",
            company: "아이크래프트",
            date: "2014.12.08 ~ 2016.03.31",
            description: `[담당 업무]
- KT 코넷망 대상 네트워크 장비 운영 및 유지보수 담당
- 백본(L3) 라우터 대개체 작업 수행 및 현장 기술 지원

[핵심 수행 업무]
- Juniper 장비 기반 L3 백본 라우터 구성 및 설정
- KT 주요 국소(혜화, 구로, 행당, 광화문, 수원, 익산, 거제 등) 장비 대개체 작업 수행
- 작업 계획서, 구성(Config) 문서, 선번장 작성 및 협력사 공유를 통한 작업 절차 정리
- 현장 회선 테스트 및 사전 컨피그 업로드 수행
- Cisco 저사양 장비 → Juniper 고사양 장비(T-Series) 업그레이드 작업

[주요 성과]
- 백본 라우터 대개체 프로젝트 참여를 통해 대규모 네트워크 환경 변경 작업 경험 확보
- 사전 계획·점검 기반 작업 수행으로 장애 발생 없이 안정적인 전환 완료
- 네트워크 이론을 현장 환경에 적용하며 실무 중심의 문제 해결 역량 강화`
        }
    ],
    projects: [],
    contact: {}
};

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
            const contentLines = lines.slice(1);
            
            let sectionHtml = `<div class="exp-section">
                <span class="exp-section-title">${title}</span>
                <ul class="exp-bullets">`;
            
            contentLines.forEach(line => {
                if (line.trim().startsWith('-')) {
                    sectionHtml += `<li>${line.trim().substring(1).trim()}</li>`;
                } else if (line.trim()) {
                    sectionHtml += `<li>${line.trim()}</li>`;
                }
            });
            
            sectionHtml += `</ul></div>`;

            if (title === '담당 업무' || title === '핵심 수행 업무') {
                summaryHtml += sectionHtml;
            }
            fullHtml += sectionHtml;
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

    projectsGrid.innerHTML = '';
    db.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => openModal(project);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 100)}...</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" class="btn btn-small" onclick="event.stopPropagation()" target="_blank">데모</a>
                    <a href="${project.code}" class="btn btn-small" onclick="event.stopPropagation()" target="_blank">코드</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
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
document.addEventListener('DOMContentLoaded', initializeData);
