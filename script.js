document.addEventListener('DOMContentLoaded', () => {
    // 1. Плавное появление заголовка и текста при загрузке
    const headerItems = document.querySelectorAll('.step1, .reklama, h4, sub');
    headerItems.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(15px)";
        el.style.transition = "all 0.8s ease-out";
        el.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, 100);
    });

    // 2. Умная анимация галереи (Blur + Scale)
    const images = document.querySelectorAll('.gallery img');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Когда фотку видно: проявляем
                entry.target.style.opacity = "1";
                entry.target.style.filter = "blur(0px)";
                entry.target.style.transform = "translateY(0) scale(1)";
            } else {
                // Когда уходит из кадра: плавно прячем
                entry.target.style.opacity = "0.2";
                entry.target.style.filter = "blur(8px)";
                entry.target.style.transform = "translateY(20px) scale(0.95)";
            }
        });
    }, observerOptions);

    images.forEach(img => {
        // Начальное состояние
        img.style.opacity = "0";
        img.style.filter = "blur(10px)";
        img.style.transform = "translateY(30px) scale(0.9)";
        img.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(img);
    });
});
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
});
const photosTitle = document.querySelector('.dynamic-photos');
const fontFamilies = [
    '-apple-system, sans-serif', 
    'serif', 
    'monospace', 
    'cursive'
];
let fontIndex = 0;

setInterval(() => {
    fontIndex = (fontIndex + 1) % fontFamilies.length;
    photosTitle.style.fontFamily = fontFamilies[fontIndex];
}, 2000);
const images = document.querySelectorAll('.gallery img');

images.forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Наклон картинки
        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;
        
        // Координаты блика
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
        
        // Наложение светового пятна
        img.style.backgroundImage = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 75%)`;
        img.style.backgroundBlendMode = "overlay";
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        img.style.backgroundImage = 'none';
    });
});
