// DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// Initialize total expense
let totalExpense = 0;

// Function to add a new expense
function addExpense(name, amount) {
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
    <strong>${name}</strong>: $${amount}
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
`;
    expenseItem.dataset.amount = amount; 
    expenseList.appendChild(expenseItem);
    totalExpense += parseFloat(amount);
    totalAmount.textContent = totalExpense.toFixed(2);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const expenseName = document.getElementById('expense-name').value.trim();
    const expenseAmount = document.getElementById('expense-amount').value.trim();

    if (expenseName && expenseAmount) {
        addExpense(expenseName, expenseAmount);
        expenseForm.reset();
    } else {
        alert('Please fill out all fields');
    }
}

// Event listener for form submission
expenseForm.addEventListener('submit', handleFormSubmit);

// Function to delete an expense
function deleteExpense(expenseItem) {
    const amount = parseFloat(expenseItem.dataset.amount);
    expenseList.removeChild(expenseItem);
    totalExpense -= amount;
    totalAmount.textContent = totalExpense.toFixed(2);
}

// Function to edit an expense
function editExpense(expenseItem) {
    const name = expenseItem.querySelector('strong').textContent;
    const amount = parseFloat(expenseItem.dataset.amount);
    
    const newName = prompt('Enter the new expense name:', name);
    const newAmount = prompt('Enter the new expense amount:', amount);

    if (newName && newAmount) {
        const oldAmount = parseFloat(expenseItem.dataset.amount);
        const newAmountFloat = parseFloat(newAmount);
        expenseItem.querySelector('strong').textContent = newName;
        expenseItem.dataset.amount = newAmountFloat;
        
        totalExpense -= oldAmount;
        totalExpense += newAmountFloat;
        totalAmount.textContent = totalExpense.toFixed(2);
    }
}

// Event delegation for delete and edit buttons
expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const expenseItem = event.target.parentElement;
        deleteExpense(expenseItem);
    } else if (event.target.classList.contains('edit-btn')) {
        const expenseItem = event.target.parentElement;
        editExpense(expenseItem);
    }
});
