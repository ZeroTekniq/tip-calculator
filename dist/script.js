
const form = document.querySelector('#form');
const buttons = document.querySelectorAll('.tip-button');
const tipAmount = document.querySelector('.tip');
const totalAmount = document.querySelector('.total');
let bill = document.querySelector('#bill');
let numberOfPeople = document.querySelector('#people');
const custom = document.querySelector('.custom');
let resetButton = document.getElementById('reset');
let percentage = 0;  

const disableButtons = () => {
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('inactive');
        btn.classList.add('inactive.no-touch');
    });
}

const resetButtonPressed = (button) => {
    resetButton.addEventListener('click', () => {
        // form.reset();
        button.classList.remove('active');
        resetButton.classList.remove('active');
        // Reset values to 0
        percentage = 0;
        bill = document.querySelector('#bill').value = '';
        numberOfPeople = document.querySelector('#people').value = '';
        tipAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        // Reinitialize input values
        bill = document.querySelector('#bill');
        numberOfPeople = document.querySelector('#people');
        // Re-enable buttons
        buttons.forEach(btn => {
            btn.disabled = false;
        })
    })
}



const activateButton = (button) => {
    buttons.forEach(btn => {
        btn.classList.remove('active');
        resetButton.classList.add('active');
        
    })
    button.classList.add('active');
    disableButtons();
    resetButtonPressed(button);
}

const calcTotalPerPerson = (tipPerPerson, bill, numberOfPeople) => {
    const total = tipPerPerson + bill / numberOfPeople;
    totalAmount.textContent = '$' + total.toFixed(2);
    console.log(total);
}

const calcTipAmount = (percentage, bill, numberOfPeople) => {
    const tip = bill * percentage;
    console.log(tip);
    const tipPerPerson = tip / numberOfPeople;
    console.log(tipPerPerson );
    tipAmount.textContent = '$' + tipPerPerson.toFixed(2);
    calcTotalPerPerson(tipPerPerson, bill, numberOfPeople);
}

const convertToNumbers = () => {
   percentage = parseFloat(percentage / 100);
   bill = parseFloat(bill.value);
   numberOfPeople = parseFloat(numberOfPeople.value);
   console.log(percentage, bill, numberOfPeople);
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
            buttons.disabled = true;
            percentage = option[button.dataset.option];
            console.log(percentage, bill, numberOfPeople);
            convertToNumbers(percentage);
        })
    })
}

getPercentageNumber();

    