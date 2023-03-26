const buttons = document.querySelectorAll('.btn');


window.addEventListener('load', () => {
   buttons.forEach(button => {
     if(button.classList.contains('active')){
      activeCards(button)
     }
  })
})

buttons.forEach(el => {
  el.addEventListener('click', (ev) => {
    document.querySelectorAll('.btn').forEach(buttons => {
      buttons.classList.remove('active')
    })
    const btn = ev.target;
    btn.classList.add('active');
    activeCards(btn)
  })
})


const data = fetch('data.json')
.then((response) => {
  return response.json()
})
.then((data) => {
  importData(data)
})
.catch((err) => {
  alert('Erro no banco de dados!')
})

const updateTitle = (data, parentClass) => {
  const titleElement = document.querySelector(`.${parentClass} .title`);
  titleElement.textContent = data.title;
};

const updateTimeframe = (data, parentClass, timeframe) => {
  const timeframeElement = document.querySelector(`.${parentClass} .${timeframe} .title`);
  timeframeElement.textContent = `${data.timeframes[timeframe].current} hrs`;
  const previousElement = document.querySelector(`.${parentClass} .${timeframe} .subtitle-2`);
  previousElement.textContent = `Previous - ${data.timeframes[timeframe].previous} hrs`;
};

const parents = [
  'work-content',
  'play-content',
  'study-content',
  'exercise-content',
  'social-content',
  'selfCare-content'
]

const importData = (data) => {
  for(let i in data){
    updateTitle(data[i], parents[i]);
    updateTimeframe(data[i], parents[i], 'daily');
    updateTimeframe(data[i], parents[i], 'weekly');
    updateTimeframe(data[i], parents[i], 'monthly');
  }
}

function activeCards (button) {
  document.querySelectorAll('.row-2').forEach(allCards => {
    allCards.classList.add('hidden')
  })
  if(button.id === 'day') {
    document.querySelectorAll('.daily').forEach(dayBtn => {
      dayBtn.classList.remove('hidden');
    })
  }else if(button.id === 'week'){
    document.querySelectorAll('.weekly').forEach(weekBtn => {
      weekBtn.classList.remove('hidden');
    })
      
  }else if(button.id === 'month'){
    document.querySelectorAll('.monthly').forEach(monthBtn => {
      monthBtn.classList.remove('hidden');
    })
      
  }
}
