document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const adminNavLink = document.getElementById('adminNavLink');
    const adminFormContainer = document.getElementById('admin-form-container');
    const adminPasswordPrompt = document.getElementById('adminPasswordPrompt');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminPasswordSubmit = document.getElementById('adminPasswordSubmit');
    const adminPasswordCancel = document.getElementById('adminPasswordCancel');
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminContents = document.querySelectorAll('.admin-content');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editAboutBtn = document.getElementById('editAboutBtn');
    const profileImageAdmin = document.getElementById('profileImageAdmin');
    const profileTitleAdmin = document.getElementById('profileTitleAdmin');
    const profileSubtitleAdmin = document.getElementById('profileSubtitleAdmin');
    const aboutContentAdmin1 = document.getElementById('aboutContentAdmin1');
    const aboutContentAdmin2 = document.getElementById('aboutContentAdmin2');
    const profileImage = document.getElementById('profileImage');
    const profileTitle = document.getElementById('profileTitle');
    const profileSubtitle = document.getElementById('profileSubtitle');
    const aboutText = document.querySelector('.about-text');

    const SECRET_ADMIN_PASSWORD = 'wjsdur1206!!@@';
    let isAuthenticated = false;

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]:not(#adminNavLink)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Admin Panel Logic
    adminNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            adminPasswordPrompt.style.display = 'flex';
            adminPasswordPrompt.style.justifyContent = 'center';
            adminPasswordPrompt.style.alignItems = 'center';
            adminPasswordInput.focus();
        } else {
            adminFormContainer.style.display = 'block';
        }
    });

    adminPasswordSubmit.addEventListener('click', () => {
        if (adminPasswordInput.value === SECRET_ADMIN_PASSWORD) {
            isAuthenticated = true;
            adminPasswordPrompt.style.display = 'none';
            adminFormContainer.style.display = 'block';
            adminPasswordInput.value = '';
        } else {
            alert('비밀번호가 틀렸습니다.');
            adminPasswordInput.value = '';
        }
    });
    
    adminPasswordCancel.addEventListener('click', () => {
        adminPasswordPrompt.style.display = 'none';
        adminPasswordInput.value = '';
    });

    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            openAdminTab(tab.dataset.tab);
        });
    });

    function openAdminTab(tabName) {
        adminContents.forEach(content => {
            content.style.display = 'none';
        });
        adminTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(tabName).style.display = 'block';
        document.querySelector(`.admin-tab[data-tab='${tabName}']`).classList.add('active');
    }

    // Load and render content from localStorage
    let profileContent = JSON.parse(localStorage.getItem('profileContent')) || {
        imageUrl: "https://ifh.cc/g/xrpMQ3.jpg",
        title: "안녕하세요, <br>성장하는 개발자 유희상입니다.",
        subtitle: "끊임없이 배우고 도전하는 것을 즐깁니다."
    };

    let aboutContent = JSON.parse(localStorage.getItem('aboutContent')) || {
        paragraph1: "저는 Full-Stack 개발자를 목표로 Java, Spring, React 등을 학습하며 역량을 키워왔습니다.\n새로운 기술을 배우는 것에 대한 두려움이 없으며, 오히려 새로운 배움을 통해 성장하는 과정에서 큰 기쁨을 느낍니다.\n팀원들과의 원활한 소통과 협업을 중요하게 생각하며, 함께 성장하는 환경을 만드는 데 기여하고 싶습니다.",
        paragraph2: "주도적으로 문제를 해결하고, 더 나은 코드를 위해 항상 고민합니다.\n맡은 바에 책임감을 가지고 완수하며, 동료들에게 신뢰를 주는 개발자가 되는 것이 저의 목표입니다."
    };

    function renderProfileContent() {
        profileImage.src = profileContent.imageUrl;
        profileTitle.innerHTML = profileContent.title;
        profileSubtitle.textContent = profileContent.subtitle;

        // Admin panel values
        profileImageAdmin.value = profileContent.imageUrl;
        profileTitleAdmin.value = profileContent.title.replace(/<br>/g, "\n");
        profileSubtitleAdmin.value = profileContent.subtitle;
    }

    function renderAboutContent() {
        aboutText.querySelector('p:nth-of-type(1)').textContent = aboutContent.paragraph1;
        aboutText.querySelector('p:nth-of-type(2)').textContent = aboutContent.paragraph2;

        // Admin panel values
        aboutContentAdmin1.value = aboutContent.paragraph1;
        aboutContentAdmin2.value = aboutContent.paragraph2;
    }

    editProfileBtn.addEventListener('click', () => {
        profileContent.imageUrl = profileImageAdmin.value;
        profileContent.title = profileTitleAdmin.value.replace(/\n/g, "<br>");
        profileContent.subtitle = profileSubtitleAdmin.value;
        localStorage.setItem('profileContent', JSON.stringify(profileContent));
        renderProfileContent();
        alert('프로필이 저장되었습니다.');
    });

    editAboutBtn.addEventListener('click', () => {
        aboutContent.paragraph1 = aboutContentAdmin1.value;
        aboutContent.paragraph2 = aboutContentAdmin2.value;
        localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
        renderAboutContent();
        alert('소개 내용이 저장되었습니다.');
    });


    // Initial render
    renderProfileContent();
    renderAboutContent();
    openAdminTab('profileAdmin'); // Default tab
});
