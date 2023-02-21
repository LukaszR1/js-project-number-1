const buttonIncome = document.getElementById("income-button");
const buttonExpens = document.getElementById("expens-button");
const inputIncomeTitle = document.getElementById("income-title");
const inputIncomeAmount = document.getElementById("income-amount");
const inputExpensTitle = document.getElementById("expens-title");
const inputExpensAmount = document.getElementById("expens-amount");
const paragraphIncome = document.getElementById("income-total");
const paragraphExpens = document.getElementById("expens-total");
const spanBalance = document.getElementById("amount-balance");
const incomeList = document.getElementById("income-list");
const expensList = document.getElementById("expens-list");

const budgetArray = [];
const income = "income";
const expens = "expens";
let balanceAmount = 0;
let totalIncome = 0;
let totalExpens = 0;

buttonIncome.addEventListener("click", () => emptyInputs(income));
buttonExpens.addEventListener("click", () => emptyInputs(expens));

function balance() {
  if (spanBalance.innerHTML > "0") {
    spanBalance.innerHTML = `Możesz jeszcze wydać ${spanBalance.innerHTML} złotych`;
  } else if (spanBalance.innerHTML === "0") {
    spanBalance.innerHTML = `Bilans wynosi 0 złotych`;
  } else {
    spanBalance.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${spanBalance.innerHTML} złotych`;
  }
}
function emptyInputs(item) {
  if (item === income && inputIncomeTitle.value === "") {
    alert("podaj nazwę przychodu");
  } else if (item === income && inputIncomeAmount.value <= 0) {
    alert("wpisz wartość przychodu większą od zera");
  } else if (item === expens && inputExpensTitle.value === "") {
    alert("podaj nazwę wydatku");
  } else if (item === expens && inputExpensAmount.value <= 0) {
    alert("wpisz wartość wydatku większą od zera");
  } else {
    createBudgetItem(item);
    clearInputs(item);
  }
}

function clearInputs(item) {
  if (item === income) {
    inputIncomeTitle.value = "";
    inputIncomeAmount.value = "";
  } else if (item === expens) {
    inputExpensTitle.value = "";
    inputExpensAmount.value = "";
  }
}

function totalBalance() {
  balanceAmount = budgetArray.reduce((sum, item) => {
        if (item.type === income) {
      return sum + item.amount;
    }
    if (item.type === expens) {
      return sum - item.amount;      
    }          
  }, 0);      
};

function sumIncomes() {
  totalIncome = budgetArray.reduce((sum, item) => {
    if (item.type === income) {
      return sum + item.amount;
    }
    if (item.type === expens) {
      return sum;
    }  
  }, 0);
}

function sumExpenses() {
  totalExpens = budgetArray.reduce((sum, item) => {
    if (item.type === expens) {
      return sum + item.amount;
    }
    if (item.type === income) {
      return sum;
    }
  }, 0);
}

function displayAmount() {
  paragraphExpens.innerHTML = totalExpens;
  paragraphIncome.innerHTML = totalIncome;
  spanBalance.innerHTML = balanceAmount;
}

function removeInput(li, budgetItem) {
  li.remove();
  const indexToRemove = budgetArray.findIndex((item) => item.id === budgetItem.id);
  budgetArray.splice(indexToRemove, 1);
  sumIncomes();
  sumExpenses();
  totalBalance();
  displayAmount();
  balance();
      }

function createBudgetItem(item) {
  let budgetItem = {
    id: Math.random(),
    name: "",
    amount: 0,
    type: item,
  };
  budgetArray.push(budgetItem);
  function budgetValues() {
    if (budgetItem.type === income) {
      budgetItem.name = inputIncomeTitle.value;
      budgetItem.amount = Number(inputIncomeAmount.value);
    }
    if (budgetItem.type === expens) {
      budgetItem.name = inputExpensTitle.value;
      budgetItem.amount = Number(inputExpensAmount.value);
    }
  }
  budgetValues();
  totalBalance();
  sumIncomes();
  sumExpenses();
  displayAmount();
  balance();
  const li = document.createElement("li");
  addList();
  
  function addList() {
    if (budgetItem.type === expens) {
      expensList.appendChild(li);
    }
    if (budgetItem.type === income) {
      incomeList.appendChild(li);
    }
  }
  const divIncomeRow = document.createElement("div");
  const spanWrapper = document.createElement("div");
  const buttonWrapper = document.createElement("div");
  const spanIncome = document.createElement("span");
  const buttonEdit = document.createElement("button");
  const buttonRemove = document.createElement("button");
  const buttonSave = document.createElement("button");
  const editInputTitle = document.createElement("input");
  const editInputAmount = document.createElement("input");
  editInputAmount.setAttribute("type", "number");
  spanWrapper.style.setProperty("width", "150px");
  divIncomeRow.style.setProperty("width", "350px");
  divIncomeRow.style.setProperty("display", "flex");

  buttonSave.innerHTML = "zapisz";
  buttonEdit.innerHTML = "edytuj";
  buttonRemove.innerHTML = "usuń";

  li.appendChild(divIncomeRow);
  divIncomeRow.appendChild(spanWrapper);
  spanWrapper.appendChild(editInputTitle);
  spanWrapper.appendChild(editInputAmount);
  divIncomeRow.appendChild(buttonWrapper);
  spanWrapper.appendChild(spanIncome);
  buttonWrapper.appendChild(buttonEdit);
  buttonWrapper.appendChild(buttonSave);
  buttonWrapper.appendChild(buttonRemove);

  editInputTitle.hidden = true;
  editInputAmount.hidden = true;
  buttonSave.hidden = true;
  spanValue();
  function spanValue() {
    if (budgetItem.type === expens) {
      spanIncome.innerHTML = `${inputExpensTitle.value} ${inputExpensAmount.value}`;
    }
    if (budgetItem.type === income) {
      spanIncome.innerHTML = `${inputIncomeTitle.value} ${inputIncomeAmount.value}`;
    }
  }
  buttonEdit.addEventListener("click", () => {
    const result = budgetArray.filter((item) => item.id === budgetItem.id);
    editInputTitle.value = result[0].name;
    editInputAmount.value = result[0].amount;
    editInputTitle.hidden = false;
    editInputAmount.hidden = false;
    buttonSave.hidden = false;
    buttonEdit.hidden = true;
    spanIncome.hidden = true;
  });
  buttonSave.addEventListener("click", () => {
    if (budgetItem.type === income && editInputTitle.value === "") {
      alert(" wpisz nazwę przychodu w polu edycji");
    } else if (budgetItem.type === income && editInputAmount.value <= 0) {
      alert(" wpisz kwotę większą od zera w polu edycji przychodu ");
    } else if (budgetItem.type === expens && editInputTitle.value === "") {
      alert(" wpisz nazwę wydatków w polu edycji ");
    } else if (budgetItem.type === expens && editInputAmount.value <= 0) {
      alert("  wpisz kwotę większą od zera w polu edycji wydatków");
    } else {
      buttonSave.hidden = true;
      buttonEdit.hidden = false;
      editInputTitle.hidden = true;
      buttonRemove.hidden = false;
      editInputAmount.hidden = true;
      spanIncome.hidden = false;
      spanIncome.innerHTML =
        editInputTitle.value + " " + editInputAmount.value + " " + "PLN";
      budgetItem.name = editInputTitle.value;
      budgetItem.amount = parseInt(editInputAmount.value);
      sumIncomes();
      sumExpenses();
      totalBalance();
      displayAmount();
      balance();
    }
  });
  
  buttonRemove.addEventListener("click", ()=>removeInput(li,budgetItem))
      
}

  

