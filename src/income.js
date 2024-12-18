document.addEventListener('DOMContentLoaded', () => {
    const incomeForm = document.getElementById('income-form');
    const descriptionTextarea = document.getElementById('description');
    const descriptionCount = document.getElementById('description-count');

    // Validation function for each input field
    const validateField = (input, errorElement) => {
        if (input.validity.valid) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            return true;
        } else {
            if (input.validity.valueMissing) {
                errorElement.textContent = 'This field is required.';
            } else if (input.validity.tooShort) {
                errorElement.textContent = 'Input is too short.';
            } else if (input.validity.tooLong) {
                errorElement.textContent = 'Input is too long.';
            } else {
                errorElement.textContent = 'Invalid input.';
            }
            errorElement.style.display = 'block';
            return false;
        }
    };

    // Character count for description
    descriptionTextarea.addEventListener('input', () => {
        const maxLength = descriptionTextarea.getAttribute('maxlength');
        const currentLength = descriptionTextarea.value.length;
        descriptionCount.textContent = `${currentLength} / ${maxLength}`;
    });

    // Form validation and submission
    incomeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('income-name');
        const amountInput = document.getElementById('income-amount');
        const categoryInput = document.getElementById('income-category');
        const dateInput = document.getElementById('income-date');

        const nameError = document.getElementById('income-name-error');
        const amountError = document.getElementById('income-amount-error');
        const categoryError = document.getElementById('income-category-error');
        const dateError = document.getElementById('income-date-error');

        const isNameValid = validateField(nameInput, nameError);
        const isAmountValid = validateField(amountInput, amountError);
        const isCategoryValid = validateField(categoryInput, categoryError);
        const isDateValid = validateField(dateInput, dateError);

        if (isNameValid && isAmountValid && isCategoryValid && isDateValid) {
            // Create income object
            const incomeData = {
                name: nameInput.value,
                amount: parseFloat(amountInput.value),
                category: categoryInput.value,
                date: dateInput.value,
                description: descriptionTextarea.value || null
            };

            // TODO: Replace with actual income submission logic
            console.log('Income Data:', incomeData);
            
            // Optionally, show a success notification
            showNotification('Income added successfully!', 'success');

            // Reset form
            incomeForm.reset();
            descriptionCount.textContent = '0 / 200';
        }
    });

    // Notification function
    const showNotification = (message, type) => {
        const notification = document.createElement('div');
        notification.classList.add(`${type}-notification`);
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    };
});


document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside or on a nav link
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle) {
            navMenu.classList.remove('active');
        }
    });
});