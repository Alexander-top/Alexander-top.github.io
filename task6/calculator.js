document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const quantityError = document.getElementById('quantityError');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const type2Options = document.getElementById('type2Options');
    const serviceOptionSelect = document.getElementById('serviceOption');
    const type3Properties = document.getElementById('type3Properties');
    const expressServiceCheckbox = document.getElementById('expressService');
    const resultDiv = document.getElementById('result');
    const basePrices = {
        type1: 1000,
        type2: 2000,
        type3: 3000
    };

    let currentServiceType = 'type1';
    let currentQuantity = 1;
    let currentOptionPrice = 0;
    let currentPropertyPrice = 0;
    const quantityRegex = /^[1-9]\d*$/;

    function validateQuantity(value) {
        return quantityRegex.test(value);
    }
    function showError(show) {
        if (show) {
            quantityError.classList.remove('hidden');
            quantityInput.style.borderColor = '#d32f2f';
        } else {
            quantityError.classList.add('hidden');
            quantityInput.style.borderColor = '#ccc';
        }
    }

    function updateDynamicOptions() {
        type2Options.classList.add('hidden');
        type3Properties.classList.add('hidden');
        switch (currentServiceType) {
            case 'type1':  
                break; 
            case 'type2':
                type2Options.classList.remove('hidden');
                break;
                
            case 'type3':
                type3Properties.classList.remove('hidden');
                break;
        }
    }
    
    function updateAdditionalCosts() {
        currentOptionPrice = 0;
        currentPropertyPrice = 0;

        if (currentServiceType === 'type2') {
            currentOptionPrice = parseInt(serviceOptionSelect.value) || 0;
        } else if (currentServiceType === 'type3') {
            currentPropertyPrice = expressServiceCheckbox.checked ? parseInt(expressServiceCheckbox.value) : 0;
        }
        
    }
    function calculateTotalCost() {
        const basePrice = basePrices[currentServiceType];
        const additionalCost = currentOptionPrice + currentPropertyPrice;
        const unitPrice = basePrice + additionalCost;
        const totalCost = unitPrice * currentQuantity;
        return {
            unitPrice: unitPrice,
            totalCost: totalCost,
            basePrice: basePrice,
            additionalCost: additionalCost
        };
    }

    function updateResult() {
        const cost = calculateTotalCost();
        
        let details = '';
        if (cost.additionalCost > 0) {
            details = ` (базовая: ${cost.basePrice.toLocaleString('ru-RU')} руб. + дополнения: ${cost.additionalCost.toLocaleString('ru-RU')} руб.)`;
        }
        
        resultDiv.textContent = `Общая стоимость: ${cost.totalCost.toLocaleString('ru-RU')} руб.${details}`;
    }
    function handleQuantityChange() {
        const value = quantityInput.value.trim();      
        if (value === '') {
            showError(false);
            currentQuantity = 1;
            updateResult();
        } else if (!validateQuantity(value)) {
            showError(true);
        } else {
            showError(false);
            currentQuantity = parseInt(value);
            updateResult();
        }
    }
    function handleServiceTypeChange(event) {
        currentServiceType = event.target.value; 
        updateDynamicOptions();
        updateAdditionalCosts();
        updateResult();
    }
    function handleServiceOptionChange() {
        updateAdditionalCosts();
        updateResult();
    }
    function handlePropertyChange() {
        updateAdditionalCosts();
        updateResult();
    }
    function initializeEventListeners() {
        quantityInput.addEventListener('input', handleQuantityChange);
        quantityInput.addEventListener('blur', handleQuantityChange);
        serviceTypeRadios.forEach(radio => {
            radio.addEventListener('change', handleServiceTypeChange);
        });
        serviceOptionSelect.addEventListener('change', handleServiceOptionChange);
        expressServiceCheckbox.addEventListener('change', handlePropertyChange);
    }

    function initializeCalculator() {
        currentServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        currentQuantity = parseInt(quantityInput.value) || 1;

        updateDynamicOptions();
        updateAdditionalCosts();
        initializeEventListeners();
        updateResult();
    }
    initializeCalculator();
});