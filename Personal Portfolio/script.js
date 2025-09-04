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
