const openFormBtn = document.getElementById('openFormBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupOverlay = document.getElementById('popupOverlay');
const feedbackForm = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const privacyLink = document.getElementById('privacyLink');
const FORM_SUBMIT_URL = 'https://api.slapform.com/MY_FORM_ID';
const FORM_STORAGE_KEY = 'feedbackFormData';
let isFormOpen = false;
document.addEventListener('DOMContentLoaded', function() {
    restoreFormData();
    openFormBtn.addEventListener('click', openForm);
    closePopupBtn.addEventListener('click', closeForm);

    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closeForm();
        }
    });

    feedbackForm.addEventListener('submit', handleFormSubmit);
    feedbackForm.addEventListener('input', saveFormData);
    window.addEventListener('popstate', function(event) {
        if (isFormOpen) {
            closeForm(false); 
        }
    });
    
   
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPrivacyPolicy();
    });
});
function openForm() {
    popupOverlay.style.display = 'flex';
    isFormOpen = true;
    setTimeout(() => {
        document.querySelector('.popup-content').style.transform = 'translateY(0)';
    }, 10);
    history.pushState({ formOpen: true }, '', '#feedback-form');
    document.getElementById('fullName').focus();
}
function closeForm(updateHistory = true) {
    popupOverlay.style.display = 'none';
    isFormOpen = false;
    if (updateHistory && window.location.hash === '#feedback-form') {
        history.back();
    }
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
}
function saveFormData() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        organization: document.getElementById('organization').value,
        message: document.getElementById('message').value,
        privacyPolicy: document.getElementById('privacyPolicy').checked
    };
    
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

function restoreFormData() {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            
            document.getElementById('fullName').value = formData.fullName || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('organization').value = formData.organization || '';
            document.getElementById('message').value = formData.message || '';
            document.getElementById('privacyPolicy').checked = formData.privacyPolicy || false;
        } catch (e) {
            console.error('Ошибка при восстановлении данных:', e);
        }
    }
}
function clearFormData() {
    localStorage.removeItem(FORM_STORAGE_KEY);
    feedbackForm.reset();
}
async function handleFormSubmit(e) {
    e.preventDefault();
    if (!feedbackForm.checkValidity()) {
        feedbackForm.reportValidity();
        return;
    }
    const formData = new FormData(feedbackForm);
    const formDataObject = {};
    
    for (let [key, value] of formData.entries()) {
        formDataObject[key] = value;
    }
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    
    try {
        await simulateFormSubmission(formDataObject);
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        clearFormData();
        setTimeout(() => {
            closeForm();
        }, 3000);
        
    } catch (error) {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        console.error('Ошибка при отправке формы:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить сообщение';
    }
}
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            if (Math.random() > 0.2) {
                console.log('Данные формы отправлены:', formData);
                resolve({ status: 'success', message: 'Форма успешно отправлена' });
            } else {
                
                reject(new Error('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.'));
            }
        }, 1500);
    });
}


function showPrivacyPolicy() {
    alert('ПОЛИТИКА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ\n\n' +
          '1. Сбор и использование данных\n' +
          '2. Конфиденциальность\n' +
          '3. Ваши права\n' +
          'Вы имеете право запросить доступ, исправление или удаление ваших персональных данных.');
}