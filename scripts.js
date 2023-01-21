const button = document.getElementById('convert-button')
const select = document.getElementById('currency-select')


const convertValues = async () => {
    const input = document.getElementById('input-value').value
    const realValueText = document.getElementById('real-value-text')
    const converterValueText = document.getElementById('convert-value-text')
    const dateText = document.getElementById('date-cot')

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( response => response.json() )

    const dolar = data.USDBRL.high
    const dolarDate = data.USDBRL.create_date
    const euro = data.EURBRL.high
    const euroDate = data.EURBRL.create_date
    const Bticoin = data.BTCBRL.high
    const BticoinDate = data.BTCBRL.create_date


    realValueText.innerHTML = new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' }
    ).format(input);

    if (select.value === 'US$ Dolar Americano') {
        dateText.innerHTML = dolarDate
        converterValueText.innerHTML = new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
        ).format(input / dolar);
    }
    else if (select.value === '€ Euro' ) {
        dateText.innerHTML = euroDate
        converterValueText.innerHTML = new Intl.NumberFormat('de-DE',
            { style: 'currency', currency: 'EUR' }
        ).format(input / euro);
    }
    else {
        dateText.innerHTML = BticoinDate
        converterValueText.innerHTML = input / Bticoin
    }
}

changeCurrency = () => {
    const nameText = document.getElementById('name-text')
    const convertImg = document.getElementById('convert-img')

    if (select.value === '€ Euro') {
        nameText.innerHTML = 'Euro'
        convertImg.src = './images/Euro.png'
    }
    else if (select.value === 'Bitcoin') {
        nameText.innerHTML = 'Bitcoin'
        convertImg.src = './images/Bit.png'
    }
    else {
        nameText.innerHTML = 'Dollar Americano'
        convertImg.src = './images/Usa.png'
    }
    convertValues()
}

button.addEventListener('click', convertValues)
select.addEventListener('change', changeCurrency)