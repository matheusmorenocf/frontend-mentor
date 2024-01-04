init()

function init() {
    document.querySelector('form').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const idade = calcularIdade()
        if (!idade) {
            return
        }
        document.querySelector('#years').textContent = idade.anos;
        document.querySelector('#months').textContent = idade.meses;
        document.querySelector('#days').textContent = idade.dias;
    
    })
}

function classError(id, error) {
    console.log(document.querySelector(`#${id}`))
    document.querySelector(`#${id}`).textContent = error;
    document.querySelectorAll('.input-content').forEach(elemento => {
        elemento.classList.add('active-error')
    })
    document.querySelectorAll('input[type="number"]').forEach(elemento => {
        elemento.style.outline = '2px solid red'
    })
}

function removeError() {
    const elementosComErro = document.querySelectorAll('.active-error');

    elementosComErro.forEach(elemento => {
        elemento.classList.remove('active-error');
    });

    document.querySelectorAll('input[type="number"]').forEach(elemento => {
        elemento.style.outline = ''
    })

    document.querySelector('#day-error').textContent = '';
    document.querySelector('#month-error').textContent = '';
    document.querySelector('#year-error').textContent = '';
}

function calcularIdade() {
    removeError()

    const dia = parseInt(document.getElementById('iday').value);
    const mes = parseInt(document.getElementById('imonth').value);
    const ano = parseInt(document.getElementById('iyear').value);

    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Ano bissexto
    if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
        diasPorMes[1] = 29;
    }

    if (!dia || !mes || !ano) {
        classError('day-error', 'This field is required');
        classError('month-error', 'This field is required');
        classError('year-error', 'This field is required');
        return
    }

    // Verificar se o dia é válido (entre 1 e 31)
    if (dia < 1 || dia > 31) {
        classError('day-error', 'Must be a valid day');
        return;
    }

    // Verificar se o mês é válido (entre 1 e 12)
    if (mes < 1 || mes > 12) {
        classError('month-error', 'Must be a valid month');
        return;
    }

    // Verificar se o dia e mês são válidos
    if (dia < 1 || dia > diasPorMes[mes - 1]) {
        classError('day-error', 'Must be a valid date');
        return;
    }

    const dataNascimento = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();
    if (dataNascimento.getFullYear() > dataAtual.getFullYear()) {
        classError('year-error', 'Must be a in past');
      return;
    }

    let idade = {};
    idade.anos = dataAtual.getFullYear() - dataNascimento.getFullYear();
    idade.meses = dataAtual.getMonth() - dataNascimento.getMonth();
    idade.dias = dataAtual.getDate() - dataNascimento.getDate();

    if (idade.dias < 0) {
      const ultimoDiaDoMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
      idade.dias += ultimoDiaDoMesAnterior;
      idade.meses--;
    }

    if (idade.meses < 0) {
      idade.meses += 12;
      idade.anos--;
    }

    return idade;

}

