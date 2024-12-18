let incomes = JSON.parse(localStorage.getItem('income')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


let totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
let totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

let incomeMinTransactions = document.querySelector('#income-min-transactions')
let expenseMinTransactions = document.querySelector('#expense-min-transactions')

let incomeMaxTransactions = document.querySelector('#income-max-transactions')
let expenseMaxTransactions = document.querySelector('#expense-max-transactions')

let expenseAvrTransactions = document.querySelector('#expense-avr-transactions')
let incomeAvrTransactions = document.querySelector('#income-avr-transactions')

new Chart(document.getElementById('pie-chart'), {
    type: 'pie',
    data: {
        labels: ["Expenses", "Incomes"],
        datasets: [{
            backgroundColor: [" #fdbc30", "#42C2CF"],
            data: [totalExpense, totalIncome]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Pie chart for Expenses and Incomes'
        },
        responsive: true
    }
});

                                    /* Minimum transacrions function  */

function calculateMin(type) {
    let items = JSON.parse(localStorage.getItem(type)) || [];

    let minItem = items[0].amount;

    items.forEach(item => {
        if (item.amount < minItem) {
            minItem = item.amount;
        }
    });

    return minItem;
}



let minIncome = calculateMin('income');
let minExpense = calculateMin('expenses');
incomeMinTransactions.textContent = minIncome
expenseMinTransactions.textContent = minExpense



                                   /* maximum transacrions function  */

function calculateMax(type) {
    let items = JSON.parse(localStorage.getItem(type)) || [];

    let maxItem = items[0].amount;

    items.forEach(item => {
        if (item.amount > maxItem) {
            minItem = item.amount;
        }
    });

    return maxItem;
}

let maxIncome = calculateMax('income');
let maxExpense = calculateMax('expenses');
incomeMaxTransactions.textContent = maxIncome
expenseMaxTransactions.textContent = maxExpense


                                 /* average transacrions function  */


function calculateAverage(type) {
    let items = JSON.parse(localStorage.getItem(type)) || [];

    let total = items.length;
    let amount = 0;

    if (total === 0) {
        return 0; 
    } else {
        items.forEach(item => {
            amount += item.amount;
        });
        return amount / total; 
    }
}
 let averageIncome = calculateAverage('income')
 let averageExpense = calculateAverage('expenses')
 expenseAvrTransactions.textContent = averageExpense
 incomeAvrTransactions.textContent = averageIncome




                                        /*for Expense */

const expenseAmount = document.querySelector('.expense-amount')
expenseAmount.textContent = '$' + totalExpense



let nbExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalNbExpenses = expenses.length;
const expenseNbTransactions = document.querySelector('#expense-nb-transactions')
expenseNbTransactions.textContent = totalNbExpenses




                                        /*for Incomes */

const incomeAmount = document.querySelector('.income-amount')
incomeAmount.textContent = '$' + totalIncome


let totalNbIncomes = incomes.length;
const incomeNbTransactions = document.querySelector('#income-nb-transactions')
incomeNbTransactions.textContent = totalNbIncomes


