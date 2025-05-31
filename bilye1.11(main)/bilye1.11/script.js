// DOM'un yüklenmesini bekleyelim
document.addEventListener('DOMContentLoaded', function() {
    // Ana işlevleri çağıralım
    setupGeneral();
    setupAnimations();
    setupCalculators();
    setupPageSpecific();
});

// Genel site işlevlerini kurulum
function setupGeneral() {
    // Abone ol formu işleme
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`${email} adresiniz bültenimize başarıyla kaydedildi. Teşekkür ederiz!`);
            this.reset();
        });
    }

    // Testimonial slider için otomatik kaydırma
    setupTestimonialSlider();
    
    // Yumuşak sayfa içi kaydırma
    setupSmoothScrolling();
    
    // Mobil menü oluştur
    setupMobileMenu();
    
    // Sayfa geçiş animasyonları
    addPageTransitionEffects();
    
    // İlerleme çubuğu
    createProgressBar();
    
    // Menü aktif sınıfını ayarlama
    setActiveMenuItem();
    
    // Yukarı çık butonu
    createBackToTopButton();
    
    // İletişim formu doğrulama
    setupFormValidation();
}

// Animasyonlarla ilgili işlevleri kurulum
function setupAnimations() {
    // Sayfa yükleme animasyonları
    animateElementsOnScroll();
    
    // SSS Bölümü Toggle
    setupFaqToggle();
}

// Hesaplayıcılarla ilgili işlevleri kurulum
function setupCalculators() {
    // Bazal Metabolizma Hızı Hesaplayıcısı
    setupBMRCalculator();
    
    // Gelişmiş Yiyecek Kalorisi Hesaplayıcısı
    createAdvancedFoodCalorieCalculator();
    
    // İnteraktif hesaplayıcıları yükselt
    enhanceCalculators();
}

// Sayfalara özel işlevleri kurulum
function setupPageSpecific() {
    // Mevcut sayfayı tespit et
    const currentPage = window.location.pathname.split('/').pop();
    
    // Hesaplayıcılar sayfası özel kodları
    if (currentPage === 'hesaplayicilar.html') {
        setupSpecificCalculators();
    }
    
    // Beslenme sayfası özel kodları
    if (currentPage === 'beslenme.html') {
        setupTabSystem();
    }
    
    // Ekip animasyonları (İletişim sayfası)
    if (currentPage === 'iletisim.html') {
        setupTeamAnimation();
    }
}

// Testimonial slider ayarları
function setupTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            const scrollPosition = testimonials[currentIndex].offsetLeft;
            testimonialSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, 5000); // Her 5 saniyede bir kaydır
    }
}

// Yumuşak sayfa içi kaydırma
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Header yüksekliği için offset
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobil menü oluşturma
function setupMobileMenu() {
    const header = document.querySelector('header');
    if (header && !document.querySelector('.mobile-toggle') && window.innerWidth < 768) {
        const nav = header.querySelector('nav');
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        header.querySelector('.container').insertBefore(mobileToggle, nav);
        
        // Mobil menü stilini CSS'e ekleyelim
        if (!document.getElementById('mobile-menu-style')) {
            const style = document.createElement('style');
            style.id = 'mobile-menu-style';
            style.innerHTML = `
                @media (max-width: 768px) {
                    .mobile-toggle {
                        display: block;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        color: var(--primary-color);
                        cursor: pointer;
                    }
                    header nav {
                        display: none;
                    }
                    header nav.active {
                        display: block;
                        width: 100%;
                    }
                    header nav ul {
                        flex-direction: column;
                        align-items: center;
                    }
                    header nav ul li {
                        margin: 10px 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Ekran boyutu değiştiğinde kontrol et
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            setupMobileMenu();
        }
    });
}

// Bazal Metabolizma Hızı (BMR) Hesaplayıcısı
function setupBMRCalculator() {
    const calculateBMR = document.getElementById('calculate-bmr');
    if (!calculateBMR) return;
    
    calculateBMR.addEventListener('click', function() {
        // Değerleri al
        const gender = document.getElementById('bmr-gender').value;
        const age = parseInt(document.getElementById('bmr-age').value);
        const weight = parseFloat(document.getElementById('bmr-weight').value);
        const height = parseFloat(document.getElementById('bmr-height').value);
        const formula = document.getElementById('bmr-formula').value;
        
        // Değerlerin girilip girilmediğini kontrol et
        if (!gender || isNaN(age) || isNaN(weight) || isNaN(height)) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // BMR'yi hesapla
        let bmr = 0;
        let formulaName = '';
        
        if (formula === 'mifflin') {
            // Mifflin-St Jeor formülü
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
            formulaName = 'Mifflin-St Jeor Formülü';
        } else if (formula === 'harris') {
            // Harris-Benedict formülü
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
            formulaName = 'Harris-Benedict Formülü';
        }
        
        // BMR değerini göster
        document.getElementById('bmr-value').textContent = Math.round(bmr);
        document.getElementById('formula-name').textContent = formulaName;
        
        // Aktivite seviyelerine göre kalori ihtiyacını hesapla
        const sedentary = bmr * 1.2;
        const light = bmr * 1.375;
        const moderate = bmr * 1.55;
        const active = bmr * 1.725;
        const veryActive = bmr * 1.9;
        
        // Aktivite seviyelerine göre değerleri göster
        document.getElementById('bmr-sedentary').textContent = Math.round(sedentary);
        document.getElementById('bmr-light').textContent = Math.round(light);
        document.getElementById('bmr-moderate').textContent = Math.round(moderate);
        document.getElementById('bmr-active').textContent = Math.round(active);
        document.getElementById('bmr-very-active').textContent = Math.round(veryActive);
        
        // Detayları göster
        document.getElementById('bmr-details').style.display = 'block';
    });
}

// Gelişmiş Yiyecek Kalorisi Hesaplayıcı
function createAdvancedFoodCalorieCalculator() {
    const foodSelect = document.getElementById('food-select');
    const foodQuantity = document.getElementById('food-quantity');
    const calculateButton = document.getElementById('calculate-food-calorie');
    const resultSection = document.getElementById('food-calorie-result');
    const detailedResult = document.getElementById('detailed-nutrition-result');

    // Daire grafiği için renk paletleri
    const chartColors = {
        protein: '#5F9DF7', // mavi
        carb: '#FF8243',    // turuncu
        fat: '#FB7185'      // kırmızı
    };

    let macroChart = null;

    if (foodSelect && calculateButton) {
        calculateButton.addEventListener('click', function() {
            const selectedOption = foodSelect.options[foodSelect.selectedIndex];
            if (!selectedOption.value) return;

            const quantity = parseFloat(foodQuantity.value) || 1;
            const foodName = selectedOption.text;
            const calories = parseFloat(selectedOption.value) * quantity;
            
            // Makro besinleri hesapla
            const protein = parseFloat(selectedOption.dataset.protein || 0) * quantity;
            const carb = parseFloat(selectedOption.dataset.carb || 0) * quantity;
            const fat = parseFloat(selectedOption.dataset.fat || 0) * quantity;
            
            // Toplam makro nutrientler (gram)
            const totalMacros = protein + carb + fat;
            
            // Yüzdeler
            const proteinPercent = totalMacros > 0 ? Math.round((protein / totalMacros) * 100) : 0;
            const carbPercent = totalMacros > 0 ? Math.round((carb / totalMacros) * 100) : 0;
            const fatPercent = totalMacros > 0 ? Math.round((fat / totalMacros) * 100) : 0;

            // Kalori dağılımı (protein 4 kcal/g, karbonhidrat 4 kcal/g, yağ 9 kcal/g)
            const proteinCalories = protein * 4;
            const carbCalories = carb * 4;
            const fatCalories = fat * 9;
            
            // Sonuçları gösterme
            updateNutritionDisplay(foodName, calories, protein, carb, fat, proteinPercent, carbPercent, fatPercent);
            
            // Grafik gösterimi
            createOrUpdateMacroChart(protein, carb, fat, proteinPercent, carbPercent, fatPercent);
            
            // Ekstra bilgileri göster
            document.getElementById('food-nutrients').style.display = 'block';
            if (detailedResult) detailedResult.style.display = 'block';
            
            // Yiyeceği listeye ekle ve toplamı güncelle
            addFoodToList(foodName, calories, protein, carb, fat);
        });
    }

    function updateNutritionDisplay(foodName, calories, protein, carb, fat, proteinPercent, carbPercent, fatPercent) {
        // Temel bilgileri güncelle
        document.getElementById('food-name').textContent = foodName;
        document.getElementById('food-calorie').textContent = calories.toFixed(1);
        document.getElementById('food-protein').textContent = protein.toFixed(1);
        document.getElementById('food-carb').textContent = carb.toFixed(1);
        document.getElementById('food-fat').textContent = fat.toFixed(1);

        // Detaylı sonuç HTML'i oluştur
        const detailedHtml = `
            <div class="nutrition-summary">
                <div class="nutrition-circle">
                    <div class="circle-value">${Math.round(calories)}</div>
                    <div class="circle-label">kcal</div>
                </div>
                <div class="nutrition-macros">
                    <div class="macro-item">
                        <span class="macro-name">Karbonhidrat</span>
                        <span class="macro-value">${carb.toFixed(2)} gr</span>
                        <span class="macro-percent">%${carbPercent}</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-name">Protein</span>
                        <span class="macro-value">${protein.toFixed(2)} gr</span>
                        <span class="macro-percent">%${proteinPercent}</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-name">Yağ</span>
                        <span class="macro-value">${fat.toFixed(2)} gr</span>
                        <span class="macro-percent">%${fatPercent}</span>
                    </div>
                </div>
            </div>
        `;
        
        // HTML'i DOM'a ekle
        if (detailedResult) {
            detailedResult.innerHTML = detailedHtml;
        }
    }

    function createOrUpdateMacroChart(protein, carb, fat, proteinPercent, carbPercent, fatPercent) {
        const ctx = document.getElementById('nutrientChart').getContext('2d');
        
        // Mevcut grafiği temizle
        if (macroChart) {
            macroChart.destroy();
        }
        
        // Yeni grafik oluştur
        macroChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    `Protein ${proteinPercent}%`,
                    `Karbonhidrat ${carbPercent}%`, 
                    `Yağ ${fatPercent}%`
                ],
                datasets: [{
                    data: [protein, carb, fat],
                    backgroundColor: [
                        chartColors.protein,
                        chartColors.carb,
                        chartColors.fat
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12
                            },
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value.toFixed(1)}g`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Özel yiyecek ekle
    const addCustomFood = document.getElementById('add-custom-food');
    if (addCustomFood) {
        addCustomFood.addEventListener('click', function() {
            const foodName = document.getElementById('custom-food-name').value;
            const calories = parseFloat(document.getElementById('custom-food-calorie').value);
            const unit = document.getElementById('custom-food-unit').value;
            const protein = parseFloat(document.getElementById('custom-food-protein').value || 0);
            const carb = parseFloat(document.getElementById('custom-food-carb').value || 0);
            const fat = parseFloat(document.getElementById('custom-food-fat').value || 0);
            
            if (!foodName || isNaN(calories)) {
                alert('Lütfen gerekli bilgileri doldurun.');
                return;
            }
            
            // Makro değerlerden hesaplanan kalori kontrolü
            const calculatedCalories = (protein * 4) + (carb * 4) + (fat * 9);
            if (Math.abs(calculatedCalories - calories) > 50 && protein > 0 && carb > 0 && fat > 0) {
                const userConfirm = confirm(
                    `Dikkat: Girilen makro besinlerin hesaplanan kalorisi (${calculatedCalories.toFixed(1)} kcal) ile girilen kalori değeri (${calories} kcal) arasında fark var.\n\n` +
                    `Devam etmek istiyor musunuz?`
                );
                if (!userConfirm) {
                    return;
                }
            }
            
            // Özel yiyecekler optgroup'u kontrol et/oluştur
            let customGroup = document.querySelector('optgroup[label="Özel Yiyecekler"]');
            if (!customGroup) {
                customGroup = document.createElement('optgroup');
                customGroup.label = 'Özel Yiyecekler';
                foodSelect.appendChild(customGroup);
            }
            
            // Yeni seçenek oluştur
            const option = document.createElement('option');
            option.value = calories;
            option.dataset.unit = unit;
            option.dataset.protein = protein;
            option.dataset.carb = carb;
            option.dataset.fat = fat;
            option.textContent = `${foodName} (${unit})`;
            
            // Seçeneği ekle
            customGroup.appendChild(option);
            
            // Formu temizle
            document.getElementById('custom-food-form').reset();
            
            // Yeni eklenen elemanı seç
            option.selected = true;
            
            // Birimdeki değişikliği yansıt
            document.getElementById('food-unit').textContent = `(${unit})`;
            
            // Kullanıcıya bilgi ver
            alert(`"${foodName}" başarıyla eklendi.`);
        });
    }

    // Eklenen yiyecekler listesi ve toplam besin değerleri
    let addedFoods = [];
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarb = 0;
    let totalFat = 0;
    
    // Yiyeceği listeye ekle ve toplamı güncelle
    function addFoodToList(name, calories, protein, carb, fat) {
        // Yeni yiyeceği diziye ekle - sayısal değerler zaten sayı olarak geliyor
        addedFoods.push({
            name: name,
            calories: calories,
            protein: protein,
            carb: carb,
            fat: fat
        });
        
        // Toplam değerleri güncelle
        totalCalories += calories;
        totalProtein += protein;
        totalCarb += carb;
        totalFat += fat;
        
        // Listeyi görsel olarak güncelle
        const addedFoodsList = document.getElementById('added-foods-list');
        if (!addedFoodsList) return;
        
        const listItem = document.createElement('li');
        
        let detailText = `${calories.toFixed(1)} kcal`;
        if (protein > 0 || carb > 0 || fat > 0) {
            detailText += ` <span class="macro-info"><span class="macro-tag protein-tag">P: ${protein.toFixed(1)}g</span> <span class="macro-tag carb-tag">K: ${carb.toFixed(1)}g</span> <span class="macro-tag fat-tag">Y: ${fat.toFixed(1)}g</span></span>`;
        }
        
        listItem.innerHTML = `<span class="food-name">${name}</span> - ${detailText}`;
        addedFoodsList.appendChild(listItem);
        
        // Toplam değerleri güncelle ve göster
        updateTotalNutrition();
    }
    
    // Toplam besin değerlerini güncelle ve göster
    function updateTotalNutrition() {
        // Toplam kalori gösterimini güncelle
        const totalCaloriesElement = document.getElementById('total-calories');
        if (totalCaloriesElement) {
            totalCaloriesElement.textContent = totalCalories.toFixed(1);
        }
        
        // Toplam makro besinleri güncelle
        let totalMacrosDiv = document.getElementById('total-macros');
        if (!totalMacrosDiv) {
            const totalCaloriesContainer = document.querySelector('.total-calories');
            if (totalCaloriesContainer) {
                totalMacrosDiv = document.createElement('div');
                totalMacrosDiv.id = 'total-macros';
                totalMacrosDiv.className = 'total-macros';
                totalCaloriesContainer.parentNode.insertBefore(totalMacrosDiv, totalCaloriesContainer.nextSibling);
            }
        }
        
        if (totalMacrosDiv) {
            // Toplam makroları göster
            totalMacrosDiv.innerHTML = `
                <p>Toplam Protein: <span class="macro-highlight protein-highlight">${totalProtein.toFixed(1)} g</span></p>
                <p>Toplam Karbonhidrat: <span class="macro-highlight carb-highlight">${totalCarb.toFixed(1)} g</span></p>
                <p>Toplam Yağ: <span class="macro-highlight fat-highlight">${totalFat.toFixed(1)} g</span></p>
            `;
            
            // Toplam makro yüzdelerini hesapla
            const totalMacrosGrams = totalProtein + totalCarb + totalFat;
            if (totalMacrosGrams > 0) {
                const proteinPercent = Math.round((totalProtein / totalMacrosGrams) * 100);
                const carbPercent = Math.round((totalCarb / totalMacrosGrams) * 100);
                const fatPercent = Math.round((totalFat / totalMacrosGrams) * 100);
                
                // Yüzdeleri göster
                totalMacrosDiv.innerHTML += `
                <div class="macro-percentages">
                    <p>Protein: <span class="percent-pill protein-percent">%${proteinPercent}</span></p>
                    <p>Karbonhidrat: <span class="percent-pill carb-percent">%${carbPercent}</span></p>
                    <p>Yağ: <span class="percent-pill fat-percent">%${fatPercent}</span></p>
                </div>
                `;
            }
        }
    }
    
    // Yiyecek listesini temizleme
    const clearFoodList = document.getElementById('clear-food-list');
    if (clearFoodList) {
        clearFoodList.addEventListener('click', function() {
            // Listeyi ve toplam değerleri sıfırla
            addedFoods = [];
            totalCalories = 0;
            totalProtein = 0;
            totalCarb = 0;
            totalFat = 0;
            
            const addedFoodsList = document.getElementById('added-foods-list');
            if (addedFoodsList) {
                addedFoodsList.innerHTML = '';
            }
            
            const totalCaloriesElement = document.getElementById('total-calories');
            if (totalCaloriesElement) {
                totalCaloriesElement.textContent = '0';
            }
            
            // Toplam makroları temizle
            const totalMacrosDiv = document.getElementById('total-macros');
            if (totalMacrosDiv) {
                totalMacrosDiv.innerHTML = '';
            }
        });
    }
}

// Scroll edildiğinde elemanları animasyonla göster
function animateElementsOnScroll() {
    // Animasyon için gözlemlenecek elementler
    const elementsToAnimate = document.querySelectorAll('.feature-card, .benefit-card, .importance-card, .practice-card, .team-member, .calculator-card, .section-title');
    
    // IntersectionObserver oluştur
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Eleman görünür olduğunda
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Gözlemi sonlandır
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // %10 görünür olduğunda tetikle
    
    // Elemanları gözleme ekle
    elementsToAnimate.forEach(element => {
        // Önce animasyon sınıfını kaldır
        element.classList.remove('animated');
        // Başlangıçta gizle
        element.style.opacity = "0";
        // Gözlemi başlat
        observer.observe(element);
    });
    
    // Scroll eventi için
    document.addEventListener('scroll', () => {
        elementsToAnimate.forEach(element => {
            // Ekranda görünürse
            if (isElementInViewport(element)) {
                element.classList.add('animated');
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    });
}

// Eleman görünür mü kontrol et
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// SSS Bölümü için açılır kapanır fonksiyon
function setupFaqToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Tıklanan sorunun cevap bölümünü al
            const answer = this.nextElementSibling;
            
            // Aktif sınıfını toggle et
            this.classList.toggle('active');
            
            // Cevabın görünürlüğünü değiştir
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// Aktif menü öğesini belirle
function setActiveMenuItem() {
    // Sayfa URL'sinden aktif sekmeyi bul
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    navLinks.forEach(link => {
        // Link href'inden sayfa adını al
        const linkPage = link.getAttribute('href');
        // Eğer mevcut sayfa ile eşleşiyorsa
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkPage === 'index.html') {
            // Ana sayfa için özel durum
            link.classList.add('active');
        }
    });
}

// Yukarı çık butonu oluştur
function createBackToTopButton() {
    // Button elementini oluştur
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('id', 'backToTopBtn');
    backToTopBtn.setAttribute('title', 'Yukarı Çık');
    backToTopBtn.style.display = 'none';
    
    // Stil ekle
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.zIndex = '99';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.outline = 'none';
    backToTopBtn.style.backgroundColor = '#5CDB95';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.padding = '15px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.fontSize = '18px';
    backToTopBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    backToTopBtn.style.transition = 'all 0.3s ease';
    
    // Hover efekti
    backToTopBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#4CAF50';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#5CDB95';
        this.style.transform = 'translateY(0)';
    });
    
    // Click olayı
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Butonu sayfaya ekle
    document.body.appendChild(backToTopBtn);
    
    // Scroll olayını dinle
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

// İletişim formu doğrulama
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basit doğrulama
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // İsim doğrulama
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, 'Lütfen adınızı girin');
                isValid = false;
            } else if (nameInput) {
                removeError(nameInput);
            }
            
            // E-posta doğrulama
            if (emailInput && emailInput.value.trim() === '') {
                showError(emailInput, 'Lütfen e-posta adresinizi girin');
                isValid = false;
            } else if (emailInput && !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Lütfen geçerli bir e-posta adresi girin');
                isValid = false;
            } else if (emailInput) {
                removeError(emailInput);
            }
            
            // Mesaj doğrulama
            if (messageInput && messageInput.value.trim() === '') {
                showError(messageInput, 'Lütfen mesajınızı girin');
                isValid = false;
            } else if (messageInput) {
                removeError(messageInput);
            }
            
            // Tüm alanlar geçerliyse gönderim simülasyonu
            if (isValid) {
                // Form gönderim simülasyonu
                showSubmitMessage(contactForm, 'Mesajınız başarıyla gönderildi. Teşekkür ederiz!');
                contactForm.reset();
            }
        });
    }
}

// E-posta doğrulama yardımcı fonksiyonu
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Hata mesajı göster
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    // Zaten hata mesajı varsa kaldır
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Hata mesajı ekle
    const error = document.createElement('div');
    error.className = 'error-message';
    error.innerText = message;
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    formGroup.appendChild(error);
}

// Hata mesajını kaldır
function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    
    // Hata mesajını kaldır
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

// Form gönderildi mesajı
function showSubmitMessage(form, message) {
    // Mesaj konteynerı oluştur
    const messageContainer = document.createElement('div');
    messageContainer.className = 'success-message';
    messageContainer.innerText = message;
    messageContainer.style.backgroundColor = '#5CDB95';
    messageContainer.style.color = 'white';
    messageContainer.style.padding = '10px';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.marginTop = '20px';
    messageContainer.style.animation = 'fadeIn 0.5s ease-out';
    
    // Formu temizle ve mesajı ekle
    form.innerHTML = '';
    form.appendChild(messageContainer);
    
    // 3 saniye sonra mesajı temizle
    setTimeout(() => {
        messageContainer.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            messageContainer.remove();
            // Formu yeniden yükle veya sayfayı yenile
            window.location.reload();
        }, 500);
    }, 3000);
}

// İnteraktif hesaplayıcıları yükselt
function enhanceCalculators() {
    // Bazal Metabolizma Hızı Hesaplayıcısı iyileştirmesi
    enhanceBMRCalculator();
    
    // Vücut Kitle İndeksi Hesaplayıcısı iyileştirmesi
    enhanceBMICalculator();
}

// Bazal Metabolizma Hesaplayıcısını interaktif yap
function enhanceBMRCalculator() {
    const bmrCalculator = document.getElementById('bmr-calculator');
    if (!bmrCalculator) return;
    
    // Yaş için kaydırıcı ekle
    const ageInput = document.getElementById('bmr-age');
    if (ageInput) {
        // Mevcut input'u gizle
        ageInput.style.display = 'none';
        
        // Kaydırıcı oluştur
        const ageSlider = document.createElement('input');
        ageSlider.type = 'range';
        ageSlider.min = '10';
        ageSlider.max = '90';
        ageSlider.value = ageInput.value || '30';
        ageSlider.id = 'bmr-age-slider';
        
        // Değer göstergesi oluştur
        const ageValue = document.createElement('span');
        ageValue.className = 'range-value';
        ageValue.textContent = ageSlider.value + ' yaş';
        
        // Kaydırıcı etiketleri
        const sliderLabels = document.createElement('div');
        sliderLabels.className = 'calculator-slider-labels';
        sliderLabels.innerHTML = '<span>10</span><span>50</span><span>90</span>';
        
        // Öğeleri ekle
        const ageGroup = ageInput.parentNode;
        ageGroup.appendChild(ageSlider);
        ageGroup.appendChild(ageValue);
        ageGroup.appendChild(sliderLabels);
        
        // Değişiklik olayı
        ageSlider.addEventListener('input', function() {
            ageValue.textContent = this.value + ' yaş';
            ageInput.value = this.value;
        });
    }
    
    // Kilo için kaydırıcı ekle
    const weightInput = document.getElementById('bmr-weight');
    if (weightInput) {
        // Mevcut input'u gizle
        weightInput.style.display = 'none';
        
        // Kaydırıcı oluştur
        const weightSlider = document.createElement('input');
        weightSlider.type = 'range';
        weightSlider.min = '40';
        weightSlider.max = '150';
        weightSlider.step = '0.5';
        weightSlider.value = weightInput.value || '70';
        weightSlider.id = 'bmr-weight-slider';
        
        // Değer göstergesi oluştur
        const weightValue = document.createElement('span');
        weightValue.className = 'range-value';
        weightValue.textContent = weightSlider.value + ' kg';
        
        // Kaydırıcı etiketleri
        const sliderLabels = document.createElement('div');
        sliderLabels.className = 'calculator-slider-labels';
        sliderLabels.innerHTML = '<span>40</span><span>95</span><span>150</span>';
        
        // Öğeleri ekle
        const weightGroup = weightInput.parentNode;
        weightGroup.appendChild(weightSlider);
        weightGroup.appendChild(weightValue);
        weightGroup.appendChild(sliderLabels);
        
        // Değişiklik olayı
        weightSlider.addEventListener('input', function() {
            weightValue.textContent = this.value + ' kg';
            weightInput.value = this.value;
        });
    }
    
    // Boy için kaydırıcı ekle
    const heightInput = document.getElementById('bmr-height');
    if (heightInput) {
        // Mevcut input'u gizle
        heightInput.style.display = 'none';
        
        // Kaydırıcı oluştur
        const heightSlider = document.createElement('input');
        heightSlider.type = 'range';
        heightSlider.min = '140';
        heightSlider.max = '210';
        heightSlider.value = heightInput.value || '170';
        heightSlider.id = 'bmr-height-slider';
        
        // Değer göstergesi oluştur
        const heightValue = document.createElement('span');
        heightValue.className = 'range-value';
        heightValue.textContent = heightSlider.value + ' cm';
        
        // Kaydırıcı etiketleri
        const sliderLabels = document.createElement('div');
        sliderLabels.className = 'calculator-slider-labels';
        sliderLabels.innerHTML = '<span>140</span><span>175</span><span>210</span>';
        
        // Öğeleri ekle
        const heightGroup = heightInput.parentNode;
        heightGroup.appendChild(heightSlider);
        heightGroup.appendChild(heightValue);
        heightGroup.appendChild(sliderLabels);
        
        // Değişiklik olayı
        heightSlider.addEventListener('input', function() {
            heightValue.textContent = this.value + ' cm';
            heightInput.value = this.value;
        });
    }
    
    // Sonuç gösterimi iyileştirmesi
    const calculateBMR = document.getElementById('calculate-bmr');
    const bmrResultSection = document.getElementById('bmr-details');
    
    if (calculateBMR && bmrResultSection) {
        // Orjinal hesaplama fonksiyonunu kaydet
        const originalOnClick = calculateBMR.onclick;
        
        // Yeni fonksiyon tanımla
        calculateBMR.onclick = function() {
            // Orjinal hesaplama fonksiyonunu çağır
            if (typeof originalOnClick === 'function') {
                originalOnClick.call(this);
            }
            
            // Sonuç değerini al
            const bmrValue = document.getElementById('bmr-value').textContent;
            
            // Dairesel gösterge oluştur
            if (!document.getElementById('bmr-result-circle')) {
                // Daire oluştur
                const resultCircle = document.createElement('div');
                resultCircle.className = 'result-circle';
                resultCircle.id = 'bmr-result-circle';
                resultCircle.innerHTML = `
                    <div class="result-value">${bmrValue}</div>
                    <div class="result-label">kalori/gün</div>
                `;
                
                // Sonuç bölümünün başına ekle
                bmrResultSection.insertBefore(resultCircle, bmrResultSection.firstChild);
            } else {
                // Mevcut daireyi güncelle
                document.querySelector('#bmr-result-circle .result-value').textContent = bmrValue;
            }
            
            // Animasyon ekle
            const circle = document.getElementById('bmr-result-circle');
            circle.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                circle.style.animation = '';
            }, 500);
        };
    }
}

// VKİ Hesaplayıcısını interaktif yap
function enhanceBMICalculator() {
    const bmiCalculator = document.getElementById('bmi-calculator');
    if (!bmiCalculator) return;
    
    // Boy için kaydırıcı
    const heightInput = document.getElementById('bmi-height');
    if (heightInput) {
        // Mevcut input'u gizle
        heightInput.style.display = 'none';
        
        // Kaydırıcı oluştur
        const heightSlider = document.createElement('input');
        heightSlider.type = 'range';
        heightSlider.min = '140';
        heightSlider.max = '210';
        heightSlider.value = heightInput.value || '170';
        heightSlider.id = 'bmi-height-slider';
        
        // Değer göstergesi oluştur
        const heightValue = document.createElement('span');
        heightValue.className = 'range-value';
        heightValue.textContent = heightSlider.value + ' cm';
        
        // Öğeleri ekle
        const heightGroup = heightInput.parentNode;
        heightGroup.appendChild(heightSlider);
        heightGroup.appendChild(heightValue);
        
        // Değişiklik olayı
        heightSlider.addEventListener('input', function() {
            heightValue.textContent = this.value + ' cm';
            heightInput.value = this.value;
        });
    }
    
    // Kilo için kaydırıcı
    const weightInput = document.getElementById('bmi-weight');
    if (weightInput) {
        // Mevcut input'u gizle
        weightInput.style.display = 'none';
        
        // Kaydırıcı oluştur
        const weightSlider = document.createElement('input');
        weightSlider.type = 'range';
        weightSlider.min = '40';
        weightSlider.max = '150';
        weightSlider.step = '0.5';
        weightSlider.value = weightInput.value || '70';
        weightSlider.id = 'bmi-weight-slider';
        
        // Değer göstergesi oluştur
        const weightValue = document.createElement('span');
        weightValue.className = 'range-value';
        weightValue.textContent = weightSlider.value + ' kg';
        
        // Öğeleri ekle
        const weightGroup = weightInput.parentNode;
        weightGroup.appendChild(weightSlider);
        weightGroup.appendChild(weightValue);
        
        // Değişiklik olayı
        weightSlider.addEventListener('input', function() {
            weightValue.textContent = this.value + ' kg';
            weightInput.value = this.value;
        });
    }
    
    // VKİ hesaplama butonu
    const calculateBMI = document.getElementById('calculate-bmi');
    const bmiResult = document.getElementById('bmi-result');
    
    if (calculateBMI && bmiResult) {
        // Sonuç alanı oluştur
        const resultDisplay = document.createElement('div');
        resultDisplay.className = 'interactive-calculator';
        resultDisplay.innerHTML = `
            <div class="result-circle" id="bmi-result-circle">
                <div class="result-value">0</div>
                <div class="result-label">VKİ</div>
            </div>
            <div class="range-indicator">
                <div class="range-marker" id="bmi-marker"></div>
            </div>
            <div class="range-labels">
                <span>Zayıf</span>
                <span>Normal</span>
                <span>Fazla</span>
                <span>Obez</span>
            </div>
            <div class="calculator-info-text" id="bmi-category">Lütfen hesaplamak için yukarıdaki butona tıklayın.</div>
        `;
        
        // Sonuç alanını ekle
        bmiResult.parentNode.insertBefore(resultDisplay, bmiResult);
        
        // Hesaplama butonuna tıklama olayı
        calculateBMI.addEventListener('click', function() {
            // Form değerlerini al
            const height = parseFloat(heightInput.value) / 100; // cm'den m'ye çevir
            const weight = parseFloat(weightInput.value);
            
            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                alert('Lütfen geçerli boy ve kilo değerleri girin.');
                return;
            }
            
            // VKİ hesapla
            const bmi = weight / (height * height);
            
            // Sonuç değerini göster
            document.querySelector('#bmi-result-circle .result-value').textContent = bmi.toFixed(1);
            
            // VKİ kategorisini belirle
            let category, markerPosition;
            if (bmi < 18.5) {
                category = 'Zayıf';
                markerPosition = (bmi / 18.5) * 25; // %0-%25 arasında
            } else if (bmi < 25) {
                category = 'Normal';
                markerPosition = 25 + ((bmi - 18.5) / 6.5) * 25; // %25-%50 arasında
            } else if (bmi < 30) {
                category = 'Fazla Kilolu';
                markerPosition = 50 + ((bmi - 25) / 5) * 25; // %50-%75 arasında
            } else {
                category = 'Obez';
                markerPosition = 75 + Math.min(((bmi - 30) / 10) * 25, 25); // %75-%100 arasında (en fazla %100)
            }
            
            // Kategoriyi göster
            document.getElementById('bmi-category').textContent = `VKİ Kategorisi: ${category}`;
            
            // İşaretçiyi konumlandır
            const marker = document.getElementById('bmi-marker');
            marker.style.left = markerPosition + '%';
            
            // Daire rengini kategoriye göre değiştir
            const resultCircle = document.getElementById('bmi-result-circle');
            if (bmi < 18.5) {
                resultCircle.style.background = 'linear-gradient(145deg, #f1c40f, #e67e22)'; // Sarı
            } else if (bmi < 25) {
                resultCircle.style.background = 'linear-gradient(145deg, #2ecc71, #27ae60)'; // Yeşil
            } else if (bmi < 30) {
                resultCircle.style.background = 'linear-gradient(145deg, #e67e22, #d35400)'; // Turuncu
            } else {
                resultCircle.style.background = 'linear-gradient(145deg, #e74c3c, #c0392b)'; // Kırmızı
            }
            
            // Animasyon ekle
            resultCircle.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                resultCircle.style.animation = '';
            }, 500);
        });
    }
}

// Sayfa geçiş animasyonlarını ekle
function addPageTransitionEffects() {
    // Body'ye animasyon sınıfını ekle
    document.body.classList.add('page-transition');
    
    // Tüm sayfalar için link geçişleri
    // Sadece site içi linklere uygulanacak
    document.querySelectorAll('a').forEach(link => {
        // Harici linkler, çapalar, javascript: linkleri hariç
        if (link.hostname === window.location.hostname && 
            !link.href.includes('#') && 
            !link.href.includes('javascript:') &&
            !link.getAttribute('target')) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Mevcut sayfanın kaybolma animasyonu
                document.body.style.animation = 'fadeOut 0.5s forwards';
                
                // Animasyon bitince yeni sayfaya git
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            });
        }
    });
    
    // Sayfa yüklendiğinde animasyonu başlat
    window.addEventListener('pageshow', function(e) {
        document.body.style.animation = 'pageEnter 0.8s forwards';
    });
}

// İlerleme çubuğu oluştur
function createProgressBar() {
    // İlerleme çubuğu elementi oluştur
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);
    
    // Scroll olayını dinle ve ilerleme çubuğunu güncelle
    window.addEventListener('scroll', function() {
        // Sayfanın ne kadar kaydırıldığını hesapla
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        // İlerleme çubuğunun genişliğini güncelle
        progressBar.style.width = scrollPercentage + '%';
    });
}

// Ekip üyeleri için hover animasyonu
function setupTeamAnimation() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            // Hover animasyonu
            const image = this.querySelector('.member-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            // Hover animasyonunu kaldır
            const image = this.querySelector('.member-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Beslenme sayfası sekme sistemi
function setupTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif sekme sınıfını kaldır
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.style.animation = 'none';
            });
            
            // Tıklanan sekmeyi aktifleştir
            button.classList.add('active');
            const targetPane = document.getElementById(button.dataset.target);
            if (targetPane) {
                targetPane.classList.add('active');
                // Animasyon ekle
                targetPane.style.animation = 'fadeIn 0.5s ease-out';
            }
        });
    });
}

// Sayfalara özel JavaScript
function runPageSpecificFunctions() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Hesaplayıcılar sayfası özel kodları
    if (currentPage === 'hesaplayicilar.html') {
        setupCalculators();
    }
    
    // Beslenme sayfası özel kodları
    if (currentPage === 'beslenme.html') {
        setupTabSystem();
    }
    
    // Ekip animasyonları (İletişim sayfası)
    if (currentPage === 'iletisim.html') {
        setupTeamAnimation();
    }
}

// Hesaplayıcı sayfası için özel fonksiyonlar
function setupSpecificCalculators() {
    console.log('Hesaplayıcılar sayfası yüklendi');
    // Burada hesaplayıcılar sayfasına özel özellikler eklenebilir
} 