// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثير التمرير للشريط العلوي
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // إضافة تأثير تمرير أفقي للمحتوى
    const movieContainers = document.querySelectorAll('.movies-container');

    movieContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // إضافة وظيفة البحث
    const searchInput = document.querySelector('.navbar__search input');
    const searchButton = document.querySelector('.navbar__search button');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('بحث عن:', searchTerm);
            // هنا يمكنك إضافة منطق البحث الفعلي
            // مثال: الانتقال إلى صفحة نتائج البحث مع نقل مصطلب البحث
            // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    // السماح بالبحث بالضغط على Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // إضافة وظيفة تشغيل الفيديو عند الضغط على ز التشغيل
    const playButtons = document.querySelectorAll('.movie-card__icons button:first-child');

    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('تشغيل الفيلم/المسلسل');
            // هنا يمكنك إضافة منطق التشغيل الفعلي
            // مثال: فتح مشغل الفيديو أو الانتقال إلى صفحة التفاصيل
        });
    });

    // إضافة وظيفة إضافة إلى القائمة عند الضغط على ز الإضافة
    const addButtons = document.querySelectorAll('.movie-card__icons button:last-child');

    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('إضافة إلى قائمة المشاهدة');
            // هنا يمكنك إضافة منطق الإضافة الفعلي
            // مثال: إمعاينة الفيديو أو الانتقال إلى صفحة التفاصيل
        });
    });

    // إضافة وظيفة عرض التفاصيل عند الضغط على البطاقة
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('عرض تفاصيل الفيلم/المسلسل');
            // هنا يمكنك إضافة منطق عرض التفاصيل الفعلي
            // مثال: فتح نافذة منبثقة أو الانتقال إلى صفحة التفاصيل
        });
    });

    // إضافة تأثير التمرير الأفقي باستخدام الأزرار (إذا تمت إضافتها)
    // مثال: أزرار التمرير يمين/يسار
    const scrollButtons = document.querySelectorAll('.scroll-btn');

    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.parentElement.querySelector('.movies-container');
            const scrollAmount = 300; // مقدار التمرير

            if (this.classList.contains('scroll-left')) {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            } else if (this.classList.contains('scroll-right')) {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    });

    // إضافة تأثير التمرير إلى الأقسام عند النقر على الروابط
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // تجاهل الروابط الخارجية أو الروابط التي لا تحتوي على hash
            if (!this.getAttribute('href').startsWith('#')) {
                return;
            }

            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // تعديل حسب ارتفاع الشريط العلوي
                    behavior: 'smooth'
                });
            }
        });
    });

    // إضافة تأثير التمرير إلى الأقسام عند التمرير
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('.navbar').offsetHeight;

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - navHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        // هنا يمكنك تحديث شريط التنقل لتمييز القسم الحالي
        // مثال: إضافة فئة active للرابط المتوافق مع القسم الحالي
    });

    // إضافة تأثير التحميل البطيء للصور
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // دعم المتصفحات القديمة
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // إضافة وظيفة التبديل بين الوضع المظلم والفاتح
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');

            // حفظ تفضيل المستخدم في التخزين المحلي
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });

        // تطبيق التفضيل المحفوظ عند تحميل الصفحة
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
});
