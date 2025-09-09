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
            alert('��й�ȣ�� Ʋ�Ƚ��ϴ�.');
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
        title: "�ȳ��ϼ���, <br>�����ϴ� ������ ������Դϴ�.",
        subtitle: "���Ӿ��� ���� �����ϴ� ���� ���ϴ�."
    };

    let aboutContent = JSON.parse(localStorage.getItem('aboutContent')) || {
        paragraph1: "���� Full-Stack �����ڸ� ��ǥ�� Java, Spring, React ���� �н��ϸ� ������ Ű���Խ��ϴ�.\n���ο� ����� ���� �Ϳ� ���� �η����� ������, ������ ���ο� ����� ���� �����ϴ� �������� ū ����� �����ϴ�.\n��������� ��Ȱ�� ����� ������ �߿��ϰ� �����ϸ�, �Բ� �����ϴ� ȯ���� ����� �� �⿩�ϰ� �ͽ��ϴ�.",
        paragraph2: "�ֵ������� ������ �ذ��ϰ�, �� ���� �ڵ带 ���� �׻� ����մϴ�.\n���� �ٿ� å�Ӱ��� ������ �ϼ��ϸ�, ����鿡�� �ŷڸ� �ִ� �����ڰ� �Ǵ� ���� ���� ��ǥ�Դϴ�."
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
        alert('�������� ����Ǿ����ϴ�.');
    });

    editAboutBtn.addEventListener('click', () => {
        aboutContent.paragraph1 = aboutContentAdmin1.value;
        aboutContent.paragraph2 = aboutContentAdmin2.value;
        localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
        renderAboutContent();
        alert('�Ұ� ������ ����Ǿ����ϴ�.');
    });


    // Initial render
    renderProfileContent();
    renderAboutContent();
    openAdminTab('profileAdmin'); // Default tab
});
