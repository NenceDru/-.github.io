document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');
    const date = urlParams.get('date');
    const adults = urlParams.get('adults');
    const children = urlParams.get('children');

    // Отображаем параметры поиска
    document.getElementById('search-region').textContent = getRegionName(region);
    document.getElementById('search-date').textContent = date;
    document.getElementById('search-adults').textContent = adults;
    document.getElementById('search-children').textContent = children;

    // Загружаем подходящие локации (в реальном проекте здесь будет fetch к API)
    const locations = getMockLocations(region, date);
    displayLocations(locations);
});

// Преобразуем значение региона в читаемое название
function getRegionName(regionValue) {
    const regions = {
        'moscow': 'Москва',
        'spb': 'Санкт-Петербург',
        'kazan': 'Казань',
        'ekb': 'Екатеринбург'
    };
    return regions[regionValue] || regionValue;
}
// Инициализация анимации шагов при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Анимация шагов
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, index * 300);
    });

    // Инициализация шагов (скрываем перед анимацией)
    const initSteps = () => {
        document.querySelectorAll('.step').forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'all 0.5s ease';
        });
    };

    initSteps();
});
// Моковые данные (в реальном проекте замените на fetch к API)
function getMockLocations(region, date) {
    const allLocations = [
        {
            id: 1,
            name: 'Детская площадка "Радуга"',
            address: 'ул. Садовая, д. 15, Москва',
            region: 'moscow',
            freeZones: 3
        },
        {
            id: 2,
            name: 'Квест-комната "Тайны фараона"',
            address: 'Ленинградский проспект, д. 22, Москва',
            region: 'moscow',
            freeZones: 2
        },
        {
            id: 3,
            name: 'Творческая мастерская "Арт-студия"',
            address: 'ул. Творческая, д. 8, Санкт-Петербург',
            region: 'spb',
            freeZones: 4
        },
        {
            id: 4,
            name: 'Спортивный комплекс "Олимп"',
            address: 'пр. Спортивный, д. 45, Казань',
            region: 'kazan',
            freeZones: 1
        }
    ];

    // Фильтрация по региону (если выбран не "Все регионы")
    return region === 'all' 
        ? allLocations 
        : allLocations.filter(loc => loc.region === region);
}

// Отображаем карточки локаций
function displayLocations(locations) {
    const container = document.getElementById('locations-list');
    
    if (locations.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>К сожалению, по вашим критериям ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска</p>
            </div>
        `;
        return;
    }

    container.innerHTML = locations.map(loc => `
        <div class="location-card">
            <div class="location-info">
                <h2 class="location-name">${loc.name}</h2>
                <p class="location-address">${loc.address}</p>
                <span class="location-region">${getRegionName(loc.region)}</span>
                <p class="free-zones">Свободных зон: ${loc.freeZones}</p>
            </div>
            <a href="zone_selection.html?id=${loc.id}" class="select-btn">Выбрать зону</a>
        </div>
    `).join('');
}
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.services-list input[type="checkbox"]');
    const servicesTotal = document.getElementById('services-total');
    const totalPrice = document.getElementById('total-price');
    const basePrice = 12000; // Базовая стоимость аренды

    function calculateTotal() {
        let servicesSum = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                servicesSum += parseInt(checkbox.value);
            }
        });
        
        servicesTotal.textContent = servicesSum;
        totalPrice.textContent = basePrice + servicesSum;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const zones = document.querySelectorAll('.zone:not(.booked)');
    const selectedZoneName = document.getElementById('selected-zone-name');
    const selectedZonePrice = document.getElementById('selected-zone-price');
    const bookingButton = document.getElementById('proceed-to-booking');

    zones.forEach(zone => {
        zone.addEventListener('click', function() {
            // Удаляем класс active у всех зон
            zones.forEach(z => z.classList.remove('active'));
            
            // Добавляем класс active к выбранной зоне
            this.classList.add('active');
            
            // Обновляем информацию о выбранной зоне
            const zoneNumber = this.getAttribute('data-zone');
            const zonePrice = this.getAttribute('data-price');
            
            selectedZoneName.textContent = `Зона ${zoneNumber}`;
            selectedZonePrice.textContent = zonePrice;
            
            // Показываем кнопку бронирования
            bookingButton.style.display = 'inline-block';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const zones = document.querySelectorAll('.zone:not(.booked)');
    const proceedButton = document.getElementById('proceed-to-booking');
    const selectedZoneName = document.getElementById('selected-zone-name');
    const selectedZonePrice = document.getElementById('selected-zone-price');
    
    zones.forEach(zone => {
        zone.addEventListener('click', function() {
            // Удаляем выделение у всех зон
            zones.forEach(z => z.classList.remove('selected'));
            
            // Добавляем выделение выбранной зоне
            this.classList.add('selected');
            
            // Обновляем информацию о выбранной зоне
            const zoneNumber = this.dataset.zone;
            const zonePrice = this.dataset.price;
            
            selectedZoneName.textContent = `Зона ${zoneNumber}`;
            selectedZonePrice.textContent = zonePrice;
            
            // Показываем кнопку и обновляем её ссылку
            proceedButton.style.display = 'inline-block';
            proceedButton.href = `/booking.html?zone=${zoneNumber}&price=${zonePrice}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const zoneNumber = urlParams.get('zone') || '3'; // По умолчанию зона 3, если параметр не передан
    const zonePrice = urlParams.get('price') || '12000'; // По умолчанию цена 12000
    
    // Обновляем информацию о заказе
    document.querySelector('.order-details p:nth-child(5)').innerHTML = 
        `<strong>Выбранная зона:</strong> Зона ${zoneNumber}`;
    document.querySelector('.order-details p:nth-child(6)').innerHTML = 
        `<strong>Стоимость аренды:</strong> ${parseInt(zonePrice).toLocaleString('ru-RU')} ₽`;
    
    // Обновляем базовую стоимость для калькулятора
    const basePrice = parseInt(zonePrice);
    const totalPrice = document.getElementById('total-price');
    totalPrice.textContent = basePrice.toLocaleString('ru-RU');
    
    const checkboxes = document.querySelectorAll('.services-list input[type="checkbox"]');
    const servicesTotal = document.getElementById('services-total');
    
    function calculateTotal() {
        let servicesSum = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                servicesSum += parseInt(checkbox.value);
            }
        });
        
        servicesTotal.textContent = servicesSum.toLocaleString('ru-RU');
        totalPrice.textContent = (basePrice + servicesSum).toLocaleString('ru-RU');
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
});

