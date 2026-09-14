// ===== 로딩 화면 =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// ===== 네비게이션 =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 스크롤 시 네비게이션 숨김/표시
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===== 부드러운 스크롤 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 코드 복사 기능 =====
function copyCode() {
    const code = document.getElementById('arduino-code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = '복사됨!';
        btn.style.background = '#00d4aa';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// ===== 방명록 기능 =====
const guestbookForm = document.getElementById('guestbookForm');
const guestbookList = document.getElementById('guestbookList');

// 로컬 스토리지에서 방명록 불러오기
function loadGuestbook() {
    const entries = JSON.parse(localStorage.getItem('guestbook') || '[]');
    entries.forEach(entry => {
        addEntryToDOM(entry.name, entry.message, entry.date);
    });
}

// 방명록 항목을 DOM에 추가
function addEntryToDOM(name, message, date) {
    const entry = document.createElement('div');
    entry.className = 'guestbook-entry';
    entry.innerHTML = `
        <div class="entry-header">
            <span class="entry-name">${name || '익명'}</span>
            <span class="entry-date">${date}</span>
        </div>
        <p class="entry-message">${message}</p>
    `;
    guestbookList.insertBefore(entry, guestbookList.firstChild);
}

// 폼 제출 처리
if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!message) {
            alert('메시지를 입력해주세요!');
            return;
        }
        
        const now = new Date();
        const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
        
        // 로컬 스토리지에 저장
        const entries = JSON.parse(localStorage.getItem('guestbook') || '[]');
        entries.unshift({ name, message, date });
        localStorage.setItem('guestbook', JSON.stringify(entries));
        
        // DOM에 추가
        addEntryToDOM(name, message, date);
        
        // 폼 초기화
        guestbookForm.reset();
        
        // 성공 메시지
        alert('소중한 메시지 감사합니다! 😊');
    });
}

// 페이지 로드 시 방명록 불러오기
loadGuestbook();

// ===== 이스터에그 토글 =====
function toggleSecret() {
    const secret = document.getElementById('secret-content');
    const trigger = document.querySelector('.egg-trigger');
    
    if (secret.style.display === 'none') {
        secret.style.display = 'block';
        trigger.innerHTML = `
            <div class="egg-icon">🔓</div>
            <p>비밀이 공개되었습니다!</p>
            <span class="egg-hint">다시 숨기기</span>
        `;
        
        // 스크롤 이동
        secret.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        secret.style.display = 'none';
        trigger.innerHTML = `
            <div class="egg-icon">🔒</div>
            <p>이 타임머신에는 아직 공개되지 않은 4번째 장면이 있습니다...</p>
            <span class="egg-hint">클릭하여 확인하기</span>
        `;
    }
}

// ===== 스크롤 애니메이션 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
document.querySelectorAll('.scene-card, .tech-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});

// ===== 타임라인 진행 표시 =====
window.addEventListener('scroll', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    timelineItems.forEach(item => {
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        
        if (scrollPosition >= itemTop && scrollPosition <= itemBottom) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// ===== 콘솔 이스터에그 =====
console.log('%c🧬 YONSEI BIO TIME MACHINE', 'font-size: 20px; font-weight: bold; color: #00d4aa;');
console.log('%c미래에서 왔조의 타임머신에 오신 것을 환영합니다!', 'font-size: 14px; color: #8892b0;');
console.log('%c이 콘솔을 발견하신 당신, 혹시 개발자신가요? 👀', 'font-size: 12px; color: #667eea;');
