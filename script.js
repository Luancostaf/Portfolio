(function () {
    const NUM_STARS = 220;
    const starsEl = document.getElementById('stars');

    for (let i = 0; i < NUM_STARS; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const scale = 0.5 + Math.random() * 1.8;
        const dur = 2 + Math.random() * 4;

        s.style.left = x + '%';
        s.style.top = y + '%';
        s.style.width = (Math.random() * 2.2 + 0.6) + 'px';
        s.style.height = s.style.width;
        s.style.opacity = 0.6 + Math.random() * 0.5;
        s.style.animationDuration = dur + 's';
        s.style.transform = 'scale(' + scale + ')';
        s.dataset.speed = (0.1 + Math.random() * 0.8).toString();
        starsEl.appendChild(s);
    }

    window.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        document.querySelectorAll('#stars .star').forEach(star => {
            const speed = parseFloat(star.dataset.speed);
            const tx = dx * 30 * speed;
            const ty = dy * 30 * speed;
            star.style.transform = `translate3d(${tx}px,${ty}px,0)`;
        });
    });
})();

(function () {
    const NUM_SNOWFLAKES = 100;
    const snowEl = document.getElementById('snow');

    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
        const f = document.createElement('div');
        f.className = 'flake';
        const size = Math.random() * 4 + 2;

        f.style.width = size + 'px';
        f.style.height = size + 'px';
        f.style.left = Math.random() * 100 + '%';
        f.style.top = -(Math.random() * 100) + 'px';
        f.style.animationDuration = (5 + Math.random() * 10) + 's';
        f.style.animationDelay = (Math.random() * 10) + 's';
        snowEl.appendChild(f);
    }
})();

const btn = document.getElementById('toggleTheme');
const icon = document.getElementById('themeIcon');
const body = document.body;

btn.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');

    if (isDark) {
        body.classList.remove('dark');
        body.classList.add('light');
        icon.src = "https://luancostaf.github.io/Portfolio/assets/moon.png";
        icon.alt = "Ícone da lua";
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        icon.src = "https://luancostaf.github.io/Portfolio/assets/sun.png";
        icon.alt = "Ícone do sol";
    }
});

function typeWriter(element, textToType, speed) {
    let i = 0;
    element.textContent = ''; // Limpa o conteúdo
    element.style.visibility = 'visible'; // Torna o elemento visível

    return new Promise(resolve => {
        function type() {
            if (i < textToType.length) {
                // Adiciona o caractere
                element.textContent += textToType.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('finished');
                resolve();
            }
        }
        type();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const welcomeEl = document.getElementById('welcome-text');
    const titleEl = document.getElementById('about-title');
    const contentEl = document.getElementById('about-content');

    // 1. LER o texto completo diretamente do HTML e remover a classe 'hidden'
    const welcomeText = welcomeEl.textContent.trim();
    welcomeEl.classList.remove('hidden');

    const titleText = titleEl.textContent.trim();
    titleEl.classList.remove('hidden');

    // Pegamos o texto e mantemos quebras de linha/espaços múltiplos se houver
    const contentText = contentEl.textContent.trim();
    contentEl.classList.remove('hidden');

    // Sequência de animação
    async function startTypingSequence() {
        // 1. Escreve o "Boas-Vindas"
        await typeWriter(welcomeEl, welcomeText, 50);

        // 2. Escreve o título "Sobre mim"
        await typeWriter(titleEl, titleText, 100);

        // 3. Escreve o texto longo
        await typeWriter(contentEl, contentText, 25);
    }

    // Inicia a sequência de escrita
    startTypingSequence();
});



const revealElements = document.querySelectorAll(
    '.reveal-element, .reveal-up, .reveal-panorama'
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => observer.observe(el));




