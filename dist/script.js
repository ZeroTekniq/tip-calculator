
const form = document.querySelector('#form');
const billInputError = document.querySelector('.bill-input-error');
const numberOfPeopleError = document.querySelector('.number-of-people-error');
const buttons = document.querySelectorAll('.tip-button');
const customTipInput = document.getElementById('custom');
const tipAmount = document.querySelector('.tip');
const totalAmount = document.querySelector('.total');
const billLabel = document.querySelector('.bill-label');
let bill = document.querySelector('#bill');
let numberOfPeople = document.querySelector('#people');
const numOfPeopleInputBox = document.querySelector('.num-of-people-input-box');
const custom = document.querySelector('.custom');
let resetButton = document.getElementById('reset');
let percentage = 0;  

const resetForm = () => {
    resetButtonAndCards();
    // Reset values to 0
        percentage = 0;
        bill = document.querySelector('#bill').value = '';
        numberOfPeople = document.querySelector('#people').value = '';
     // Reinitialize input values
        customTipInput.value = '';
        bill = document.querySelector('#bill'); 
        bill.disabled = false;
        numberOfPeople = document.querySelector('#people');
        numOfPeopleInputBox.classList.remove('num-of-people-input-box-error');
        numberOfPeople.disabled = false;
    // Reset Labels
        resetButton.classList.remove('active');
        billLabel.style.color = 'var(--clr-grey-500)';
        billInputError.style.display = 'none';
        numberOfPeopleError.style.display = 'none';
        console.log('Form reset');
}

const resetButtonAndCards = () => {
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    // Re-enable buttons
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('inactive');
            btn.classList.remove('inactive.no-touch');
        })
}

const resetButtonPressed = (button) => {
    resetButton.addEventListener('click', () => {
        if (!button) return;
        button.classList.remove('active');
        
        resetForm();
    })
}

const disableButtons = () => {
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('inactive');
        btn.classList.add('inactive.no-touch');
    });
    bill.disabled = true;
    numberOfPeople.disabled = true;
}

const billInputIsNotValid = () => {
    let valid = false;
    if (bill.value !== '' && (!isNaN(bill.value))) {
        valid = true;
    } else {
        bill.disabled = false;
        resetButtonAndCards();
        billInputError.style.display = 'block';
        console.log('Should have displayed bill error message');
    }
    console.log(valid);
    return valid;
}

const numberOfPeopleIsNotValid = () => {
    let valid = false;
    if (numberOfPeople.value !== '' && (!isNaN(numberOfPeople.value))) {
        valid = true;
    } else {
        numberOfPeople.disabled = false;
        resetButtonAndCards();
        numberOfPeopleError.style.display = 'block';
        numOfPeopleInputBox.classList.add('num-of-people-input-box-error');
        console.log('Please enter a valid number');
    }
    console.log(valid);
    return valid;
}

const getCustomTip = () => {
    customTipInput.addEventListener('focus', () => {
        convertToNumbers();
        customTipInput.disabled = false;
        customTipInput.style.textAlign = 'center';
        customTipInput.value = '';
        customTipInput.style.color = 'var(--clr-grey-500)';
        
    })
    customTipInput.addEventListener('input', (e) => {
        customTipInput.disabled = false;
        percentage = e.target.value;
        console.log(percentage);
        convertToNumbers();
        resetButtonPressed();
    })
}

const activateButton = (button) => {
    buttons.forEach(btn => {
        btn.classList.remove('active');
    })
    if (button.classList.contains('custom-tip')) {
        console.log('Custom tip selected');
        getCustomTip();
        // return;
    }else {
        resetButton.classList.add('active');
        button.classList.add('active');
        disableButtons();
        resetButtonPressed(button);
    }
}

const calcTotalPerPerson = (tipPerPerson, bill, numberOfPeople) => {
    const total = tipPerPerson + bill / numberOfPeople;
    totalAmount.textContent = '$' + total.toFixed(2);
    resetButtonPressed();
}

const calcTipAmount = (percentage, bill, numberOfPeople) => {
    bill = parseFloat(bill.value);
    numberOfPeople = parseFloat(numberOfPeople.value);
    console.log(percentage, bill, numberOfPeople);
    const tip = bill * percentage;
    const tipPerPerson = tip / numberOfPeople;
    tipAmount.textContent = '$' + tipPerPerson.toFixed(2);
    calcTotalPerPerson(tipPerPerson, bill, numberOfPeople);
}

const convertToNumbers = () => {
   if (percentage === '' || isNaN(percentage)) {
       percentage = 0;
   } else {
       percentage = parseFloat(percentage / 100);
       console.log(percentage);
    }
   calcTipAmount(percentage, bill, numberOfPeople);
}
  
const getPercentageNumber = () => {
    const option = {
                'five': 5,
                'ten': 10,
                'fifteen': 15,
                'twenty-five': 25,
                'fifty': 50,
                'custom': custom
            };
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            activateButton(button);
            if (numberOfPeopleIsNotValid() === false && billInputIsNotValid() === false) {
                resetButtonPressed(button);
                return;
            } 
            else if (numberOfPeopleIsNotValid() === false || billInputIsNotValid() === false) {
                resetButtonAndCards();
                resetButtonPressed(button);
                return;
            }
             else {
                buttons.disabled = true;
                percentage = option[button.dataset.option];
                convertToNumbers();
            }
        })
    })
}

getPercentageNumber();

    