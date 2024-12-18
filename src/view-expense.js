document.addEventListener('DOMContentLoaded', () => {
    const expensesList = document.getElementById('expenses-list');
    const noExpensesMessage = document.getElementById('no-expenses');
    const totalExpensesEl = document.getElementById('total-expenses');
    const averageExpenseEl = document.getElementById('average-expense');
    const categoryFilter = document.getElementById('category-filter');
    const dateSort = document.getElementById('date-sort');

    // Retrieve expenses from local storage
    const getExpenses = () => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        return expenses;
    };

    // Delete an expense
    const deleteExpense = (id) => {
        let expenses = getExpenses();
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    // Calculate total and average expenses
    const calculateExpenseStats = (expenses) => {
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        const average = expenses.length > 0 ? total / expenses.length : 0;

        totalExpensesEl.textContent = `$${total.toFixed(2)}`;
        averageExpenseEl.textContent = `$${average.toFixed(2)}`;
    };

    // Render expenses to the table
    const renderExpenses = () => {
        let expenses = getExpenses();

        // Apply category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory) {
            expenses = expenses.filter(expense => expense.category === selectedCategory);
        }

        // Apply date sorting
        const sortMethod = dateSort.value;
        expenses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortMethod === 'newest' 
                ? dateB - dateA 
                : dateA - dateB;
        });

        // Clear existing rows
        expensesList.innerHTML = '';

        // Render expenses or show no expenses message
        if (expenses.length === 0) {
            noExpensesMessage.style.display = 'flex';
            expensesList.parentElement.style.display = 'none';
        } else {
            noExpensesMessage.style.display = 'none';
            expensesList.parentElement.style.display = 'block';

            expenses.forEach(expense => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.name}</td>
                    <td>${expense.category}</td>
                    <td>$${parseFloat(expense.amount).toFixed(2)}</td>
                    <td>${expense.date}</td>
                    <td class="actions">
                        <button class="action-btn edit-btn" data-id="${expense.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${expense.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                expensesList.appendChild(row);
            });

            // Add event listeners for edit and delete buttons
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    deleteExpense(id);
                });
            });
        }

        // Calculate and display stats
        calculateExpenseStats(expenses);
    };

    // Initial render
    renderExpenses();

    // Event listeners for filtering and sorting
    categoryFilter.addEventListener('change', renderExpenses);
    dateSort.addEventListener('change', renderExpenses);

    // Mobile menu toggle (from previous implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle) {
            navMenu.classList.remove('active');
        }
    });
});