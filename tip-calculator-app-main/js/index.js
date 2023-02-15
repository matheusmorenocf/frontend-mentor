const inputBill = document.querySelector('#inputBill')
const inputNumPeople = document.querySelector('#inputNumPeople')
const inputReset = document.querySelector('#resetBtn')
const totalResult = document.querySelector('#totalResult')
const tipResult = document.querySelector('#tipResult')
const tipBtn = document.querySelectorAll('.tipButton')
const custom = document.querySelector('#custonButton')
const form = document.querySelector('form')

const calcTip = (bill, tip, numPeople) =>{
  const tipAmount = bill * (tip/100)
  return (tipAmount / numPeople)
}
const calcTotal = (bill, tip, numPeople) =>{
  const tipAmount = calcTip(bill, tip, numPeople)
  const total = bill / numPeople
  return total + tipAmount
}
const inputResult = (bill, tip, numPeople) => {
  tipResult.innerText = calcTip(bill, tip, numPeople).toLocaleString('en-US',{style: 'currency', currency: 'USD'})
  totalResult.innerText = calcTotal(bill, tip, numPeople).toLocaleString('en-US',{style: 'currency', currency: 'USD'})
}
const addError = () =>{
  document.getElementById('error').classList.remove('hiden')
  document.getElementById('error-2').classList.add('errorOutline')
}
const removeError = () =>{
  document.getElementById('error').classList.add('hiden')
  document.getElementById('error-2').classList.remove('errorOutline')
}
const reset = () => {
  inputBill.value = ''
  inputNumPeople.value = ''
  custom.value = ''
  tipResult.innerText = 0.00.toLocaleString('en-US',{style: 'currency', currency: 'USD'})
  totalResult.innerText = 0.00.toLocaleString('en-US',{style: 'currency', currency: 'USD'})
  tipBtn.forEach((element)=> element.classList.remove('active'))
  removeError()
  return
}
reset()

tipBtn.forEach((element)=>{
  if(element.type == "button"){
    element.addEventListener('click', (e) =>{
      if(inputBill.value === '' || inputNumPeople.value === ''){
        addError()
        return
      }
      removeError()
      tipBtn.forEach((element)=> element.classList.remove('active'))
      element.classList.add('active')
      const tip = element.value.slice(0, element.value.length-1) 
      inputResult(inputBill.value, tip, inputNumPeople.value)
    })
  }else{
    element.addEventListener('input', (e) =>{
      if(inputBill.value === '' || inputNumPeople.value === ''){
        addError()
        return
      }
      removeError()
      tipBtn.forEach((element)=> element.classList.remove('active'))
      const tip = element.value
      inputResult(inputBill.value, tip, inputNumPeople.value)
    })
  } 
})

form.addEventListener('reset', ()=>{
  reset()
})






