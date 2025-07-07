// --- Constants ---
const DEFAULT_PORTS = ['U888', 'J88', '88CLB', 'ABC8'];
const CORRECT_USERNAME = 'funkaka';
const CORRECT_PASSWORD = 'Aa123456';

// --- DOM Elements ---
const loginOverlay = document.getElementById('login-overlay');
const loginUser = document.getElementById('login-user');
const loginPass = document.getElementById('login-pass');
const togglePass = document.getElementById('togglePass');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const terminalWindow = document.querySelector('.terminal-window');

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const phoneInput1 = document.getElementById('phone');
const gamePortInput1 = document.getElementById('game-port');
const gameAccountInput1 = document.getElementById('game-account');
const startBtn1 = document.getElementById('start-btn1');
const outputSection1 = document.getElementById('output-section1');

const phoneInput2 = document.getElementById('del-phone');
const gamePortInput2 = document.getElementById('del-game-port');
const gameAccountInput2 = document.getElementById('del-game-account');
const startBtn2 = document.getElementById('start-btn2');
const outputSection2 = document.getElementById('output-section2');

const checkPortInput = document.getElementById('check-port');
const startBtn3 = document.getElementById('start-btn3');
const outputSection3 = document.getElementById('output-section3');

// --- Utility Functions ---
function validatePhone(phone) {
    return /^0\d{9}$/.test(phone);
}

function validateText(text) {
    return /^[A-Za-z0-9]{4,}$/.test(text);
}

function generateRandomIP() {
    return Array(4).fill().map(() => Math.floor(Math.random() * 256)).join('.');
}

function generateCode(len = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array(len).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function randomPercent(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setStartButtonState() {
    document.querySelectorAll('[id^=start-btn]').forEach(btn => btn.classList.remove('enabled'));

    const checks = [
        { btn: 'start-btn1', ids: ['phone', 'game-port', 'game-account'], valid: [validatePhone, validateText, validateText] },
        { btn: 'start-btn2', ids: ['del-phone', 'del-game-port', 'del-game-account'], valid: [validatePhone, validateText, validateText] }
    ];

    checks.forEach(({ btn, ids, valid }) => {
        const values = ids.map(id => document.getElementById(id).value.trim());
        const isValid = values.every((val, i) => valid[i](val));
        const button = document.getElementById(btn);
        button.disabled = !isValid;
        if (isValid) button.classList.add('enabled');
    });

    if (checkPortInput.value.trim() !== '') {
        startBtn3.disabled = false;
        startBtn3.classList.add('enabled');
    } else {
        startBtn3.disabled = true;
        startBtn3.classList.remove('enabled');
    }
}

// --- Login ---
function validateLoginInputs() {
    if (loginUser.value.trim() !== '' && loginPass.value.trim() !== '') {
        loginBtn.disabled = false;
        loginBtn.classList.add('enabled');
    } else {
        loginBtn.disabled = true;
        loginBtn.classList.remove('enabled');
    }
    loginError.style.display = 'none';
}

function handleLogin() {
    const username = loginUser.value.trim();
    const password = loginPass.value.trim();

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        loginOverlay.style.display = 'none';
        terminalWindow.style.display = 'flex';
        setStartButtonState();
    } else {
        loginError.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng!';
        loginError.style.display = 'block';
    }
}

loginUser.addEventListener('input', validateLoginInputs);
loginPass.addEventListener('input', validateLoginInputs);
loginBtn.addEventListener('click', handleLogin);
togglePass.addEventListener('click', () => {
    if (loginPass.type === 'password') {
        loginPass.type = 'text';
        togglePass.textContent = '🙈';
    } else {
        loginPass.type = 'password';
        togglePass.textContent = '👁️';
    }
});
loginPass.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !loginBtn.disabled) handleLogin();
});

document.querySelectorAll('input').forEach(input => input.addEventListener('input', setStartButtonState));
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(c => c.classList.remove('active'));
        document.getElementById(tab.dataset.tab).classList.add('active');
        setStartButtonState();
    });
});

const ipCache = new Map();

startBtn1.addEventListener('click', () => {
    const out = outputSection1;
    const phone = phoneInput1.value.trim();
    const port = gamePortInput1.value.trim().toUpperCase();
    const acc = gameAccountInput1.value.trim();
    const key = `${phone}_${acc}`;
    const ip = ipCache.get(key) || generateRandomIP();
    ipCache.set(key, ip);

    let progress = 0;
    out.innerHTML = '';
    const interval = setInterval(() => {
        progress++;
        out.innerHTML = `<div class='result-line'>Scanning... <span class='percent'>${progress}%</span></div>`;
        if (progress >= 100) {
            clearInterval(interval);
            out.innerHTML = `<div class='result-line'><strong>IP:</strong> <span style='color:#00ffff'>${ip}</span></div>`;
            if (DEFAULT_PORTS.includes(port)) {
                out.innerHTML += `<div class='result-line subtle-blink' style='color:#00ff00'><strong>\u2714 TÀI KHOẢN KHÔNG CÓ MÃ ẨN</strong></div>`;
            } else {
                out.innerHTML += `<div class='warning-icon'>\u2620</div><div class='result-line'>CẢNH BÁO TÀI KHOẢN CHỨA MÃ ẨN</div><div class='result-line blink'>${generateCode()}</div>`;
            }
        }
    }, 30);
});

startBtn2.addEventListener('click', () => {
    const out = outputSection2;
    const phone = phoneInput2.value.trim();
    const port = gamePortInput2.value.trim().toUpperCase();
    const acc = gameAccountInput2.value.trim();
    const key = `${phone}_${acc}`;
    const ip = ipCache.get(key) || generateRandomIP();
    ipCache.set(key, ip);

    let progress = 0;
    out.innerHTML = '';
    const interval = setInterval(() => {
        progress++;
        out.innerHTML = `<div class='result-line'>Deleting... <span class='percent'>${progress}%</span></div>`;
        if (progress >= 100) {
            clearInterval(interval);
            out.innerHTML = `<div class='result-line'><strong>IP:</strong> <span style='color:#00ffff'>${ip}</span></div>`;
            if (DEFAULT_PORTS.includes(port)) {
                out.innerHTML += `<div class='result-line' style='color:#00ff00'><strong>\u2714 TÀI KHOẢN KHÔNG CHỨA MÃ ẨN</strong></div>`;
            } else {
                out.innerHTML += `<div class='warning-icon'>\u2620</div><div class='result-line blink'>CẢNH BÁO</div><div class='result-line blink'>KHÔNG THỂ XÓA MÃ ẨN</div>`;
            }
        }
    }, 30);
});

startBtn3.addEventListener('click', () => {
    const out = outputSection3;
    const port = checkPortInput.value.trim().toUpperCase();
    let progress = 0;
    out.innerHTML = '';
    const interval = setInterval(() => {
        progress++;
        out.innerHTML = `<div class='result-line'>Checking... <span class='percent'>${progress}%</span></div>`;
        if (progress >= 100) {
            clearInterval(interval);
            const viTri = DEFAULT_PORTS.includes(port) ? 'Quốc tế' : 'Cambodia';
            const uyTin = DEFAULT_PORTS.includes(port) ? randomPercent(90, 99) : randomPercent(40, 50);
            const maAn = DEFAULT_PORTS.includes(port) ? 0 : randomPercent(70, 98);
            out.innerHTML += `<div class='result-line'><strong>Vị trí_</strong> <span style='color:#00ffff'>${viTri}</span></div><div class='result-line'><strong>% Uy tín_</strong> <span class='percent'>${uyTin}%</span></div><div class='result-line'><strong>% Mã ẩn_</strong> <span class='percent'>${maAn}%</span></div>`;
        }
    }, 30);
});
