

/*adding expenses */



document.addEventListener('DOMContentLoaded', function () {

    const expenseForm = document.getElementById('expense-form');


    expenseForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
        const description = document.getElementById('description').value;
        const expenseDate = document.getElementById('expense-date').value;


        if (expenseName === '' || isNaN(expenseAmount) || expenseAmount <= 0 || expenseDate === '') {
            alert('Please fill in all the fields correctly.');
            return;
        }

        const expenseId = Date.now().toString();


        const expense = {
            id: expenseId,
            name: expenseName,
            amount: expenseAmount,
            description: description,
            date: expenseDate
        };

        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        expenseForm.reset();

        alert('Expense added successfully!');
    });
});



                                /*View Expenses */

document.addEventListener('DOMContentLoaded', function () {

    function renderExpenses() {

        const tableBody = document.querySelector('.table tbody');

        tableBody.innerHTML = '';


        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        if (expenses.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5">No Expenses available</td>`;
            tableBody.appendChild(row);
        } else {
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td> 
                <td class="buttons">
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    }
        tableBody.addEventListener('click', function (event) {
            if (event.target.classList.contains('edit-btn')) {

                const expenseId = event.target.getAttribute('data-id');
                const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
                const expense = expenses.find(expense => expense.id === expenseId);


                const newName = prompt('Enter new name:', expense.name);
                const newDescription = prompt('Enter new description:', expense.description);
                const newAmount = parseFloat(prompt('Enter new amount:', expense.amount));
                const newDate = prompt('Enter new date:', expense.date);


                if (newName === '' || isNaN(newAmount) || newAmount <= 0 || newDate === '') {
                    alert('Please fill in all the fields correctly.');
                    return;
                }


                expense.name = newName;
                expense.description = newDescription;
                expense.amount = newAmount;
                expense.date = newDate;


                localStorage.setItem('expenses', JSON.stringify(expenses));


                renderExpenses();
            } else if (event.target.classList.contains('delete-btn')) {

                const expenseId = event.target.getAttribute('data-id');
                let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


                expenses = expenses.filter(expense => expense.id !== expenseId);


                localStorage.setItem('expenses', JSON.stringify(expenses));


                renderExpenses();
            }
        });
    }


    renderExpenses();
});







