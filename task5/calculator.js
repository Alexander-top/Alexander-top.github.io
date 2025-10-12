document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const quantityError = document.getElementById('quantityError');
    
    
    const quantityRegex = /^[1-9]\d*$/;
    function validateQuantity() {
         const value = quantityInput.value.trim();
        
        if (value === '') {
            showError('Поле количества не может быть пустым!');
            return false;
        }
        
        if (!quantityRegex.test(value)) {
            showError('Введите корректное количество');
            return false;
        }
        
        hideError();
        return true;
    }
    
    function showError(message) {
        quantityError.textContent = message;
        quantityError.style.display = 'block';
        quantityInput.classList.add('error');
        return false;
    }
    function hideError() {
        quantityError.style.display = 'none';
        quantityInput.classList.remove('error');
    }
    
   
    function calculateTotal() {
        if (!validateQuantity()) {
            resultDiv.style.display = 'none';
            return;
        }   
        const quantity = parseInt(quantityInput.value.trim());
        const price = parseFloat(productSelect.value);
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const productName = selectedOption.text.split(' - ')[0];
        
        if (isNaN(price) || price <= 0) {
            showError('Выберите товар из списка');
            resultDiv.style.display = 'none';
            return;
        }
        
        const total = quantity * price;
        resultDiv.innerHTML = `
            <h3>Результат расчета:</h3>
            <p>Товар: ${productName}</p>
            <p>Количество: ${quantity}</p>
            <p>Цена за единицу: ${price} руб.</p>
            <p><strong>Общая стоимость: ${total} руб.</strong></p>
        `;
        resultDiv.style.display = 'block';
    }
    quantityInput.addEventListener('input', function() {
        validateQuantity();
    });
    quantityInput.addEventListener('blur', function() {
        validateQuantity();
    });
    
    calculateBtn.addEventListener('click', calculateTotal);
    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
             event.preventDefault();
            calculateTotal();
        }
    });
    hideError();
});