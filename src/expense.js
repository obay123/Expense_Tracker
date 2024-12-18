// Expense Tracker Advanced Functionality
class ExpenseTracker {
    constructor() {
        this.form = null;
        this.inputs = null;
        this.descriptionInput = null;
        this.descriptionCount = null;
        this.categorySelect = null;
        this.mobileMenuToggle = null;
        this.navMenu = null;

        this.initializeDOM();
        this.bindEvents();
    }

    initializeDOM() {
        // More robust element selection with fallbacks
        this.form = document.getElementById('expense-form');
        this.inputs = this.form ? Array.from(this.form.querySelectorAll('input, select, textarea')) : [];
        this.descriptionInput = document.getElementById('description');
        this.descriptionCount = document.getElementById('description-count');
        this.categorySelect = document.getElementById('expense-category');
        
        // Mobile menu elements with optional chaining
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
    }

    bindEvents() {
        // Description character count
        if (this.descriptionInput && this.descriptionCount) {
            this.descriptionInput.addEventListener('input', this.handleDescriptionInput.bind(this));
        }

        // Input validation
        this.inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.validateInput(input);
            });
        });

        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', this.handleFormSubmission.bind(this));
        }

        // Mobile menu toggle
        if (this.mobileMenuToggle && this.navMenu) {
            this.mobileMenuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
    }

    handleDescriptionInput() {
        const currentLength = this.descriptionInput.value.length;
        this.descriptionCount.textContent = `${currentLength} / 200`;
        
        if (currentLength > 200) {
            this.descriptionInput.value = this.descriptionInput.value.slice(0, 200);
        }
    }

    validateInput(input) {
        // Find error element safely
        const errorElement = document.getElementById(`${input.id}-error`);
        
        // If no error element found, create a temporary one to prevent console errors
        if (!errorElement) {
            const tempErrorElement = document.createElement('span');
            tempErrorElement.id = `${input.id}-error`;
            tempErrorElement.classList.add('error-message');
            input.parentNode.appendChild(tempErrorElement);
            return this.validateAndShowError(input, tempErrorElement);
        }

        return this.validateAndShowError(input, errorElement);
    }

    validateAndShowError(input, errorElement) {
        if (input.validity.valueMissing) {
            this.showError(errorElement, 'This field is required');
            return false;
        }

        if (input.validity.typeMismatch) {
            this.showError(errorElement, 'Please enter a valid value');
            return false;
        }

        if (input.id === 'expense-amount' && parseFloat(input.value) <= 0) {
            this.showError(errorElement, 'Amount must be greater than zero');
            return false;
        }

        this.clearError(errorElement);
        return true;
    }

    showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    handleFormSubmission(event) {
        event.preventDefault();

        // Validate all inputs
        const isValid = this.inputs.every(input => this.validateInput(input));

        if (!isValid) {
            this.showGlobalError('Please correct the errors in the form.');
            return;
        }

        // Collect form data
        const expenseData = this.collectFormData();

        // Save to localStorage
        this.saveExpense(expenseData);

        // Reset form
        this.resetForm();

        // Show success notification
        this.showSuccessNotification('Expense added successfully!');
    }

    collectFormData() {
        return {
            id: Date.now().toString(),
            name: document.getElementById('expense-name').value,
            amount: parseFloat(document.getElementById('expense-amount').value),
            category: document.getElementById('expense-category').value,
            description: document.getElementById('description').value || '',
            date: document.getElementById('expense-date').value
        };
    }

    saveExpense(expense) {
        try {
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
        } catch (error) {
            console.error('Error saving expense:', error);
            this.showGlobalError('Failed to save expense. Please try again.');
        }
    }

    resetForm() {
        if (this.form) {
            this.form.reset();
        }
        if (this.descriptionCount) {
            this.descriptionCount.textContent = '0 / 200';
        }
    }

    showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showGlobalError(message) {
        const errorNotification = document.createElement('div');
        errorNotification.className = 'error-notification';
        errorNotification.textContent = message;
        document.body.appendChild(errorNotification);

        setTimeout(() => {
            errorNotification.remove();
        }, 3000);
    }
}

// Rest of the code remains the same...

// Instantiate the ExpenseTracker when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTracker();

    // Initialize Expenses View (if on view expenses page)
    if (document.querySelector('.table tbody')) {
        new ExpensesView();
    }
});

// Additional Utility: Expense Statistics (can be expanded)
class ExpenseStatistics {
    static calculateTotalExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    static getExpensesByCategory() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const categoryTotals = {};

        expenses.forEach(expense => {
            if (expense.category) {
                categoryTotals[expense.category] = 
                    (categoryTotals[expense.category] || 0) + expense.amount;
            }
        });

        return categoryTotals;
    }

    // Example method to get monthly expenses
    static getMonthlyExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const monthlyExpenses = {};

        expenses.forEach(expense => {
            const month = new Date(expense.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            monthlyExpenses[month] = (monthlyExpenses[month] || 0) + expense.amount;
        });

        return monthlyExpenses;
    }
}

// Optional: Add methods to log or display statistics
console.log('Total Expenses:', ExpenseStatistics.calculateTotalExpenses());
console.log('Expenses by Category:', ExpenseStatistics.getExpensesByCategory());
console.log('Monthly Expenses:', ExpenseStatistics.getMonthlyExpenses());