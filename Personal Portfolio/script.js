// DOM 요소들
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 모바일 메뉴 토글
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 모바일 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 스크롤 애니메이션
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

// 애니메이션 대상 요소들 관찰
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .timeline-item, .project-card, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // 네비게이션 바 높이만큼 조정
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 스킬 아이템 호버 효과
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 프로젝트 카드 호버 효과
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// 연락처 폼 처리
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // 간단한 유효성 검사
        if (!name || !email || !subject || !message) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }
        
        // 성공 메시지 (실제로는 서버로 전송)
        alert('메시지가 성공적으로 전송되었습니다!');
        this.reset();
    });
}

// 스크롤 진행률 표시
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #f39c12);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 페이지 로드 시 스크롤 진행률 바 생성
document.addEventListener('DOMContentLoaded', createScrollProgress);

// 스크롤 시 요소들 순차적으로 나타나는 효과
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .project-card');
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// 페이지 로드 시 애니메이션 설정
document.addEventListener('DOMContentLoaded', animateOnScroll);

// 키보드 네비게이션 지원
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// 성능 최적화를 위한 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트 최적화
const optimizedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// 프로젝트 데이터 관리 (기존 코드)
let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [
    {
        id: 1,
        title: "이커머스 플랫폼",
        description: "React와 Node.js를 사용한 온라인 쇼핑몰 플랫폼입니다. 사용자 인증, 상품 관리, 결제 시스템, 주문 추적 등의 기능을 포함하고 있습니다. 반응형 디자인으로 모바일과 데스크톱에서 모두 최적화된 사용자 경험을 제공합니다.",
        tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
        demo: "https://demo.example.com",
        code: "https://github.com/example/ecommerce",
        icon: "fas fa-shopping-cart"
    },
    {
        id: 2,
        title: "프로젝트 관리 도구",
        description: "팀 협업을 위한 프로젝트 관리 및 일정 추적 시스템입니다. 칸반 보드, 간트 차트, 실시간 채팅, 파일 공유 등의 기능을 제공합니다. 드래그 앤 드롭 인터페이스로 직관적인 작업 관리가 가능합니다.",
        tech: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "Chart.js"],
        demo: "https://demo.example.com",
        code: "https://github.com/example/project-manager",
        icon: "fas fa-tasks"
    },
    {
        id: 3,
        title: "데이터 시각화 대시보드",
        description: "실시간 데이터 분석 및 시각화를 위한 대시보드입니다. 다양한 차트와 그래프를 통해 데이터를 직관적으로 표현하며, 필터링과 드릴다운 기능을 제공합니다. API 연동을 통한 실시간 데이터 업데이트가 가능합니다.",
        tech: ["D3.js", "Python", "Flask", "SQLite", "Chart.js"],
        demo: "https://demo.example.com",
        code: "https://github.com/example/dashboard",
        icon: "fas fa-chart-line"
    }
];

// 로컬 스토리지에서 프로젝트 데이터 로드 (수정: 초기화 시 로드하도록 변경)
function loadProjects() {
    // projects 변수가 이미 초기화 시 로드되므로 추가 로직 불필요
    renderProjects();
}

// 프로젝트 데이터를 로컬 스토리지에 저장
function saveProjects() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

// 프로젝트 카드 렌더링
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return; // 요소가 없으면 함수 종료

    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
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

    // 관리자 패널의 프로젝트 목록도 업데이트
    renderAdminProjectList();
}

// 모달 열기
function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalLinks = document.getElementById('modalLinks');
    
    modalTitle.textContent = project.title;
    modalImage.innerHTML = `<i class="${project.icon}"></i>`;
    modalDescription.textContent = project.description;
    
    modalTech.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');
    
    modalLinks.innerHTML = `
        <a href="${project.demo}" class="btn btn-primary" target="_blank">데모 보기</a>
        <a href="${project.code}" class="btn btn-secondary" target="_blank">코드 보기</a>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// 모달 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');
    
    closeBtn.onclick = closeModal;
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});

// 관리자 폼 표시/숨김 함수
function toggleAdminFormVisibility() {
    const adminFormContainer = document.getElementById('adminFormContainer');
    if (adminFormContainer.style.display === 'none' || adminFormContainer.style.display === '') {
        adminFormContainer.style.display = 'flex'; // flex로 변경하여 중앙 정렬이 되도록 함
        // 관리자 패널 열릴 때 첫 번째 탭 (프로젝트) 활성화
        openAdminTab(null, 'projectAdmin'); 
    } else {
        adminFormContainer.style.display = 'none';
    }
}

// 새 프로젝트 추가
function addProject() {
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const tech = document.getElementById('projectTech').value;
    const demo = document.getElementById('projectDemo').value;
    const code = document.getElementById('projectCode').value;
    const icon = document.getElementById('projectIcon').value;
    
    if (!title || !description || !tech) {
        alert('제목, 설명, 기술 스택은 필수 입력 항목입니다.');
        return;
    }
    
    const newProject = {
        id: Date.now(),
        title: title,
        description: description,
        tech: tech.split(',').map(t => t.trim()),
        demo: demo || '#',
        code: code || '#',
        icon: icon || 'fas fa-project-diagram'
    };
    
    projects.push(newProject);
    saveProjects();
    renderProjects();
    
    // 폼 초기화
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectTech').value = '';
    document.getElementById('projectDemo').value = '';
    document.getElementById('projectCode').value = '';
    document.getElementById('projectIcon').value = '';
    
    toggleAdminFormVisibility(); // 폼 닫기
    
    alert('프로젝트가 성공적으로 추가되었습니다!');
}

// 관리자 토글 이벤트
document.addEventListener('DOMContentLoaded', () => {
    const adminNavLink = document.getElementById('adminNavLink'); // 새로운 관리자 네비게이션 링크를 가져옵니다.
    const adminFormContainer = document.getElementById('adminFormContainer'); // adminFormContainer 요소를 가져옵니다.
    let isAuthenticatedAdmin = false; // 관리자 인증 상태
    const SECRET_ADMIN_PASSWORD = 'admin123'; // 여기에 실제 비밀번호를 설정하세요

    adminNavLink.addEventListener('click', (e) => {
        e.preventDefault(); // 기본 링크 이동 동작 방지
        if (!isAuthenticatedAdmin) {
            const password = prompt('관리자 패널에 접근하려면 비밀번호를 입력하세요:');
            if (password === SECRET_ADMIN_PASSWORD) {
                isAuthenticatedAdmin = true;
                toggleAdminFormVisibility(); // 비밀번호가 맞으면 관리자 폼을 토글
            } else {
                alert('잘못된 비밀번호입니다.');
            }
        } else {
            toggleAdminFormVisibility(); // 이미 인증된 경우 바로 토글
        }
    });
    
    // 초기 프로젝트 데이터 로드 및 렌더링
    loadProjects();
    loadAboutContent(); // 소개 내용 로드
    loadExperienceData(); // 경력 데이터 로드
    loadContactInfo(); // 연락처 정보 로드
});

// ======== 새로운 관리자 기능 JavaScript 시작 ========

// 관리자 탭 전환 함수
function openAdminTab(evt, tabName) {
    let i, tabcontent, tabbuttons;

    tabcontent = document.getElementsByClassName('admin-tab-content');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tabbuttons = document.getElementsByClassName('admin-tab-button');
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    if (evt) { // 클릭 이벤트로 호출된 경우에만 active 클래스 추가
        evt.currentTarget.className += ' active';
    } else { // 초기 로드 시 호출된 경우 (예: toggleAdminFormVisibility에서)
        // 해당 탭 버튼을 찾아 active 클래스 추가
        const defaultTabButton = document.querySelector(`.admin-tab-button[onclick*='${tabName}']`);
        if (defaultTabButton) {
            defaultTabButton.className += ' active';
        }
    }
}

// 소개 섹션 데이터
let aboutContent = JSON.parse(localStorage.getItem('portfolioAbout')) || {
    paragraph1: "저는 웹 개발에 열정을 가진 개발자입니다. 사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는 것을 목표로 합니다.",
    paragraph2: "최신 기술 트렌드를 따라가며 지속적으로 학습하고, 팀워크를 중시하는 개발자입니다."
};

function saveAboutContent() {
    aboutContent.paragraph1 = document.getElementById('aboutText1').value;
    aboutContent.paragraph2 = document.getElementById('aboutText2').value;
    localStorage.setItem('portfolioAbout', JSON.stringify(aboutContent));
    renderAboutContent();
    alert('소개 내용이 저장되었습니다!');
}

function loadAboutContent() {
    const savedAbout = localStorage.getItem('portfolioAbout');
    if (savedAbout) {
        aboutContent = JSON.parse(savedAbout);
    }
    renderAboutContent();
}

function renderAboutContent() {
    const aboutText1Element = document.querySelector('#about .about-text p:first-of-type');
    const aboutText2Element = document.querySelector('#about .about-text p:last-of-type');
    const adminAboutText1 = document.getElementById('aboutText1');
    const adminAboutText2 = document.getElementById('aboutText2');

    if (aboutText1Element) aboutText1Element.textContent = aboutContent.paragraph1;
    if (aboutText2Element) aboutText2Element.textContent = aboutContent.paragraph2;
    if (adminAboutText1) adminAboutText1.value = aboutContent.paragraph1;
    if (adminAboutText2) adminAboutText2.value = aboutContent.paragraph2;
}

// 경력 섹션 데이터
let experienceData = JSON.parse(localStorage.getItem('portfolioExperience')) || [
    {
        id: 1,
        title: "시니어 개발자",
        company: "ABC 회사",
        date: "2022 - 현재",
        description: "웹 애플리케이션 개발 및 유지보수, 팀 리딩 및 멘토링"
    },
    {
        id: 2,
        title: "프론트엔드 개발자",
        company: "XYZ 스타트업",
        date: "2020 - 2022",
        description: "React 기반 웹 애플리케이션 개발, UI/UX 개선"
    },
    {
        id: 3,
        title: "주니어 개발자",
        company: "DEF 기업",
        date: "2019 - 2020",
        description: "웹사이트 개발 및 유지보수, 클라이언트 지원"
    }
];

function saveExperienceData() {
    localStorage.setItem('portfolioExperience', JSON.stringify(experienceData));
    renderExperienceData();
}

function loadExperienceData() {
    const savedExperience = localStorage.getItem('portfolioExperience');
    if (savedExperience) {
        experienceData = JSON.parse(savedExperience);
    }
    renderExperienceData();
}

function addExperience() {
    const title = document.getElementById('expTitle').value;
    const company = document.getElementById('expCompany').value;
    const date = document.getElementById('expDate').value;
    const description = document.getElementById('expDescription').value;

    if (!title || !company || !date || !description) {
        alert('모든 경력 필드를 입력해주세요.');
        return;
    }

    const newExp = {
        id: Date.now(),
        title,
        company,
        date,
        description
    };
    experienceData.push(newExp);
    saveExperienceData();
    
    // 폼 초기화
    document.getElementById('expTitle').value = '';
    document.getElementById('expCompany').value = '';
    document.getElementById('expDate').value = '';
    document.getElementById('expDescription').value = '';

    alert('경력이 추가되었습니다!');
}

function renderExperienceData() {
    const timeline = document.querySelector('#experience .timeline');
    if (!timeline) return;
    timeline.innerHTML = ''; // 기존 내용 지우기

    experienceData.sort((a, b) => new Date(b.date.split(' ')[0]) - new Date(a.date.split(' ')[0])); // 최신순 정렬

    experienceData.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`; // 좌우 교차 배치
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <span class="date">${exp.date}</span>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });

    // 관리자 패널의 경력 목록도 업데이트
    renderAdminExperienceList();
}

// 관리자 패널 경력 목록 렌더링 (수정, 삭제 기능 포함)
function renderAdminExperienceList() {
    const experienceListDiv = document.getElementById('experienceList');
    if (!experienceListDiv) return;
    experienceListDiv.innerHTML = '<h5 style="color: var(--text-primary); margin-top: 1rem;">기존 경력 관리</h5>';

    if (experienceData.length === 0) {
        experienceListDiv.innerHTML += '<p style="color: var(--text-secondary);">아직 추가된 경력이 없습니다.</p>';
        return;
    }

    experienceData.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed var(--glass-border);';
        expItem.innerHTML = `
            <span style="color: var(--text-primary);">${exp.title} (${exp.company})</span>
            <div>
                <button onclick="editExperience(${exp.id})" class="btn btn-small" style="margin-right: 5px;">수정</button>
                <button onclick="deleteExperience(${exp.id})" class="btn btn-small secondary">삭제</button>
            </div>
        `;
        experienceListDiv.appendChild(expItem);
    });
}

// 경력 수정 기능 (관리자 패널)
function editExperience(id) {
    const expToEdit = experienceData.find(exp => exp.id === id);
    if (!expToEdit) return;

    document.getElementById('expTitle').value = expToEdit.title;
    document.getElementById('expCompany').value = expToEdit.company;
    document.getElementById('expDate').value = expToEdit.date;
    document.getElementById('expDescription').value = expToEdit.description;

    const addBtn = document.querySelector('#experienceAdmin button[onclick="addExperience()"]');
    if (addBtn) {
        addBtn.textContent = '경력 업데이트';
        addBtn.onclick = () => updateExperience(id);
    }
}

// 경력 업데이트 기능 (관리자 패널)
function updateExperience(id) {
    const expIndex = experienceData.findIndex(exp => exp.id === id);
    if (expIndex === -1) return;

    experienceData[expIndex].title = document.getElementById('expTitle').value;
    experienceData[expIndex].company = document.getElementById('expCompany').value;
    experienceData[expIndex].date = document.getElementById('expDate').value;
    experienceData[expIndex].description = document.getElementById('expDescription').value;

    saveExperienceData();
    renderExperienceData(); // 메인 페이지와 관리자 패널 경력 목록 업데이트

    document.getElementById('expTitle').value = '';
    document.getElementById('expCompany').value = '';
    document.getElementById('expDate').value = '';
    document.getElementById('expDescription').value = '';

    const addBtn = document.querySelector('#experienceAdmin button[onclick^="updateExperience("]');
    if (addBtn) {
        addBtn.textContent = '경력 추가';
        addBtn.onclick = addExperience;
    }
    alert('경력이 업데이트되었습니다!');
}

// 경력 삭제 기능 (관리자 패널)
function deleteExperience(id) {
    if (confirm('정말로 이 경력을 삭제하시겠습니까?')) {
        experienceData = experienceData.filter(exp => exp.id !== id);
        saveExperienceData();
        renderExperienceData(); // 메인 페이지와 관리자 패널 경력 목록 업데이트
        alert('경력이 삭제되었습니다.');
    }
}

// 연락처 섹션 데이터
let contactInfo = JSON.parse(localStorage.getItem('portfolioContact')) || {
    email: "your.email@example.com",
    phone: "+82 10-1234-5678",
    location: "서울, 대한민국",
    github: "https://github.com/ddooming-papa",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourprofile"
};

function saveContactContent() {
    contactInfo.email = document.getElementById('contactEmail').value;
    contactInfo.phone = document.getElementById('contactPhone').value;
    contactInfo.location = document.getElementById('contactLocation').value;
    contactInfo.github = document.getElementById('contactGithub').value;
    contactInfo.linkedin = document.getElementById('contactLinkedin').value;
    contactInfo.twitter = document.getElementById('contactTwitter').value;
    localStorage.setItem('portfolioContact', JSON.stringify(contactInfo));
    renderContactInfo();
    alert('연락처 정보가 저장되었습니다!');
}

function loadContactInfo() {
    const savedContact = localStorage.getItem('portfolioContact');
    if (savedContact) {
        contactInfo = JSON.parse(savedContact);
    }
    renderContactInfo();
}

function renderContactInfo() {
    const contactEmailElement = document.querySelector('#contact .contact-info p:nth-of-type(1)');
    const contactPhoneElement = document.querySelector('#contact .contact-info p:nth-of-type(2)');
    const contactLocationElement = document.querySelector('#contact .contact-info p:nth-of-type(3)');
    const contactGithubLink = document.querySelector('#contact .social-links a[href*="github.com"]');
    const contactLinkedinLink = document.querySelector('#contact .social-links a[href*="linkedin.com"]');
    const contactTwitterLink = document.querySelector('#contact .social-links a[href*="twitter.com"]');

    const adminContactEmail = document.getElementById('contactEmail');
    const adminContactPhone = document.getElementById('contactPhone');
    const adminContactLocation = document.getElementById('contactLocation');
    const adminContactGithub = document.getElementById('contactGithub');
    const adminContactLinkedin = document.getElementById('contactLinkedin');
    const adminContactTwitter = document.getElementById('contactTwitter');

    if (contactEmailElement) contactEmailElement.textContent = contactInfo.email;
    if (contactPhoneElement) contactPhoneElement.textContent = contactInfo.phone;
    if (contactLocationElement) contactLocationElement.textContent = contactInfo.location;
    if (contactGithubLink) contactGithubLink.href = contactInfo.github;
    if (contactLinkedinLink) contactLinkedinLink.href = contactInfo.linkedin;
    if (contactTwitterLink) contactTwitterLink.href = contactInfo.twitter;

    if (adminContactEmail) adminContactEmail.value = contactInfo.email;
    if (adminContactPhone) adminContactPhone.value = contactInfo.phone;
    if (adminContactLocation) adminContactLocation.value = contactInfo.location;
    if (adminContactGithub) adminContactGithub.value = contactInfo.github;
    if (adminContactLinkedin) adminContactLinkedin.value = contactInfo.linkedin;
    if (adminContactTwitter) adminContactTwitter.value = contactInfo.twitter;
}

// 프로젝트 관리 기능 (관리자 패널)
// renderAdminProjectList 함수 (이전에 renderProjects에서 호출했으나, 정의가 없었음)
function renderAdminProjectList() {
    const projectListDiv = document.getElementById('projectList');
    if (!projectListDiv) return;
    projectListDiv.innerHTML = '<h4 style="color: var(--text-primary); margin-top: 1rem;">기존 프로젝트 관리</h4>';

    if (projects.length === 0) {
        projectListDiv.innerHTML += '<p style="color: var(--text-secondary);">아직 추가된 프로젝트가 없습니다.</p>';
        return;
    }

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed var(--glass-border);';
        projectItem.innerHTML = `
            <span style="color: var(--text-primary);">${project.title}</span>
            <div>
                <button onclick="editProject(${project.id})" class="btn btn-small" style="margin-right: 5px;">수정</button>
                <button onclick="deleteProject(${project.id})" class="btn btn-small secondary">삭제</button>
            </div>
        `;
        projectListDiv.appendChild(projectItem);
    });
}

// 프로젝트 수정 기능 (관리자 패널)
function editProject(id) {
    const projectToEdit = projects.find(project => project.id === id);
    if (!projectToEdit) return;

    document.getElementById('projectTitle').value = projectToEdit.title;
    document.getElementById('projectDescription').value = projectToEdit.description;
    document.getElementById('projectTech').value = projectToEdit.tech.join(', ');
    document.getElementById('projectDemo').value = projectToEdit.demo === '#' ? '' : projectToEdit.demo;
    document.getElementById('projectCode').value = projectToEdit.code === '#' ? '' : projectToEdit.code;
    document.getElementById('projectIcon').value = projectToEdit.icon === 'fas fa-project-diagram' ? '' : projectToEdit.icon;

    const addBtn = document.querySelector('#projectAdmin button[onclick="addProject()"]');
    if (addBtn) {
        addBtn.textContent = '프로젝트 업데이트';
        addBtn.onclick = () => updateProject(id);
    }
}

// 프로젝트 업데이트 기능 (관리자 패널)
function updateProject(id) {
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex === -1) return;

    projects[projectIndex].title = document.getElementById('projectTitle').value;
    projects[projectIndex].description = document.getElementById('projectDescription').value;
    projects[projectIndex].tech = document.getElementById('projectTech').value.split(',').map(t => t.trim());
    projects[projectIndex].demo = document.getElementById('projectDemo').value || '#';
    projects[projectIndex].code = document.getElementById('projectCode').value || '#';
    projects[projectIndex].icon = document.getElementById('projectIcon').value || 'fas fa-project-diagram';

    saveProjects();
    renderProjects(); // 메인 페이지와 관리자 패널 프로젝트 목록 업데이트

    // 폼 초기화
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectTech').value = '';
    document.getElementById('projectDemo').value = '';
    document.getElementById('projectCode').value = '';
    document.getElementById('projectIcon').value = '';

    const addBtn = document.querySelector('#projectAdmin button[onclick^="updateProject("]');
    if (addBtn) {
        addBtn.textContent = '프로젝트 추가';
        addBtn.onclick = addProject;
    }
    alert('프로젝트가 업데이트되었습니다!');
}

// 프로젝트 삭제 기능 (관리자 패널)
function deleteProject(id) {
    if (confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
        projects = projects.filter(project => project.id !== id);
        saveProjects();
        renderProjects(); // 메인 페이지와 관리자 패널 프로젝트 목록 업데이트
        alert('프로젝트가 삭제되었습니다.');
    }
}
