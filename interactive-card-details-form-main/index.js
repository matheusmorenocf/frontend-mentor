const cardNumberInput = document.querySelector('#cardNumber');
const cardNameInput = document.querySelector('#cardName');
const cardMonthInput = document.querySelector('#monthCard');
const cardYearInput = document.querySelector('#yearCard');
const cardCvcInput = document.querySelector('#cvcCard');
const currentYear = new Date().getFullYear().toString().slice(-2);



formatInput();


const formCard = document.querySelector('.form-card');
formCard.addEventListener('submit', (e) => {
  e.preventDefault();
  if (verification(cardNumberInput ,cardMonthInput, cardYearInput)){
    hiddenForm()
  }
  

})


function verification(number, month, year){
  const errorNumber = number.value.length < number.maxLength ? true : false
  const errorMonth  = month.value <= 0 || month.value > 12 ? true : false 
  const errorYear = year.value < currentYear ? true : false
  if(errorNumber){
    number.classList.add('error');
  }
  if(errorMonth){
    month.classList.add('error');
    document.querySelector('.month-error').innerText = 'Invalid month'
  }
  if(errorYear) {
    year.classList.add('error')
    document.querySelector('.year-error').innerText = 'Invalid year'
  }
  return errorNumber === true || errorMonth === true || errorYear === true ? false : true
}

function formatInput() {
  cardNumberInput.addEventListener('input', () =>{
    const cardNumber = document.querySelector('.cardNum');
    const value = cardNumberInput.value.replace(/\D/g,'')
    const formatValue = value.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, '$1 $2 $3 $4')
    cardNumberInput.value = formatValue;
    cardNumber.innerText = cardNumberInput.value;
  })
  cardNameInput.addEventListener('input', ()=>{
    const cardName = document.querySelector('.cardNam') 
    cardName.innerText = cardNameInput.value
  })
  const cardExp = document.querySelectorAll('.cardExp');
  cardMonthInput.addEventListener('input', ()=>{
    if (cardMonthInput.value.length > cardMonthInput.maxLength) {
      cardMonthInput.value = cardMonthInput.value.slice(0, cardMonthInput.maxLength);
    }
    cardExp[0].innerText = cardMonthInput.value;
  })
  cardYearInput.addEventListener('input', ()=>{
    if (cardYearInput.value.length > cardYearInput.maxLength) {
      cardYearInput.value = cardYearInput.value.slice(0, cardMonthInput.maxLength);
    }
    cardExp[2].innerText = cardYearInput.value;
  })
  cardCvcInput.addEventListener('input', ()=>{
    const cardCvc = document.querySelector('.cvcNum');
    if (cardCvcInput.value.length > cardCvcInput.maxLength) {
      cardCvcInput.value = cardCvcInput.value.slice(0, cardCvcInput.maxLength);
    }
    cardCvc.innerText = cardCvcInput.value;
  })
}

function hiddenForm(){
  document.querySelector('.form-container').classList.add('display-hidden');
  document.querySelector('.complete-state').classList.remove('display-hidden')
}


