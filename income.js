
document.addEventListener('DOMContentLoaded', function () {
    const incomeForm = document.getElementById('income-form');

    incomeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const incomeName = document.getElementById('income-name').value;
        const incomeAmount = parseFloat(document.getElementById('income-amount').value);
        const description = document.getElementById('description').value;
        const incomeDate = document.getElementById('income-date').value;

        if (incomeName === '' || isNaN(incomeAmount) || incomeAmount <= 0 || incomeDate === '') {
            alert('Please fill in all the fields correctly.');
            return;
        }

        const incomeId = Date.now().toString();

        const income = {
            id: incomeId,
            name: incomeName,
            amount: incomeAmount,
            description: description,
            date: incomeDate
        };

        let incomes = JSON.parse(localStorage.getItem('income')) || [];

        incomes.push(income);

        localStorage.setItem('income', JSON.stringify(incomes));

        incomeForm.reset();

        alert('Income added successfully!');

        console.log('Incomes:', incomes);
    });
});


        /* View Incomes  */


document.addEventListener('DOMContentLoaded', function () {
    function renderIncomes() {
        const tableBody = document.querySelector('.table tbody');
        tableBody.innerHTML = '';

        const incomes = JSON.parse(localStorage.getItem('income')) || [];
        if (incomes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5">No incomes available</td>`;
            tableBody.appendChild(row);
        } else {
        incomes.forEach(income => {
            const row = document.createElement('tr');
            row.innerHTML = `
                                    <td>${income.name}</td>
                                    <td>${income.description}</td>
                                    <td>${income.amount}</td>
                                    <td>${income.date}</td>
                                    <td class="buttons">
                                        <button class="edit-btn" data-id="${income.id}">Edit</button>
                                        <button class="delete-btn" data-id="${income.id}">Delete</button>
                                    </td>
                                `;
            tableBody.appendChild(row);
        
        });}
        

        tableBody.addEventListener('click', function (event) {
            if (event.target.classList.contains('edit-btn')) {
                const incomeId = event.target.getAttribute('data-id');
                const incomes = JSON.parse(localStorage.getItem('income')) || [];
                const income = incomes.find(income => income.id === incomeId);

                const newName = prompt('Enter new name:', income.name);
                const newDescription = prompt('Enter new description:', income.description);
                const newAmount = parseFloat(prompt('Enter new amount:', income.amount));
                const newDate = prompt('Enter new date:', income.date);

                if (newName === '' || isNaN(newAmount) || newAmount <= 0 || newDate === '') {
                    alert('Please fill in all the fields correctly.');
                    return;
                }

                income.name = newName;
                income.description = newDescription;
                income.amount = newAmount;
                income.date = newDate;

                localStorage.setItem('income', JSON.stringify(incomes));

                renderIncomes();
            } else if (event.target.classList.contains('delete-btn')) {
                const incomeId = event.target.getAttribute('data-id');
                let incomes = JSON.parse(localStorage.getItem('income')) || [];

                incomes = incomes.filter(income => income.id !== incomeId);

                localStorage.setItem('income', JSON.stringify(incomes));

                renderIncomes();
            }
        });
    }

    renderIncomes();
});
