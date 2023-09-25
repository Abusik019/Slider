class Converter {
  constructor(startCurrency = 'USD', endCurrency = 'RUB') {
    this.startCurrency = localStorage.getItem('startCurrency') || startCurrency;
    this.endCurrency = localStorage.getItem('endCurrency') || endCurrency;

    this.lastRequestHour = localStorage.getItem('lastRequestHour') || -1;

    this.data = JSON.parse(localStorage.getItem('data')) || [];
  }

  async getData() {

    const currentHour = new Date().getHours();
    if (currentHour !== +this.lastRequestHour) {
      const { data: res } = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
      this.data = res;
      this.lastRequestHour = currentHour;

      localStorage.setItem('lastRequestHour', this.lastRequestHour.toString());
      localStorage.setItem('data', JSON.stringify(this.data));


      console.log('Data was gotten!')
    } else {
      console.log('Data was already gotten!')
    }

    return this.data;
  }

  get StartCurrency() {
    return this.startCurrency;
  }

  set StartCurrency(value) {
    localStorage.setItem('startCurrency', value);
    this.startCurrency = value;
  }

  get EndCurrency() {
    return this.endCurrency;
  }

  set EndCurrency(value) {
    localStorage.setItem('endCurrency', value);
    this.endCurrency = value;
  }
}

const convert = new Converter(),
  selects = document.querySelectorAll('.select_my_currency'),
  inputs = document.querySelectorAll('.quantity_money');


console.log(await convert.getData());

selects.forEach((element, index) => {
  element.addEventListener('change', async (e) => {
    switch (index) {
      case 0:
        convert.StartCurrency = e.target.value;

        const data = await convert.getData();
        const rate = data?.Valute[convert.startCurrency]?.Value / data?.Valute[convert.startCurrency]?.Nominal;

        inputs[index + 1].value = (+inputs[index].value * rate).toFixed(2);
        break;
      case 1:
        convert.EndCurrency = e.target.value;
        break;
      default:
        alert('Invalid drop select node!')
    }

    console.log('Start: ' + convert.StartCurrency)
    console.log('End: ' + convert.EndCurrency)
  })
});


inputs.forEach((element, index) => {
  element.addEventListener('input', async (e) => {
    const data = await convert.getData();
    const rate = data?.Valute[convert.startCurrency]?.Value / data?.Valute[convert.startCurrency]?.Nominal;
    switch (index) {
      case 0:
        inputs[index + 1].value = (+element.value * rate).toFixed(2);
        break;
      case 1:
        inputs[index - 1].value = (+element.value / rate).toFixed(2);
        break;
      default:
        alert('Invalid drop select node!')
    }

    console.log('Start: ' + convert.StartCurrency)
    console.log('End: ' + convert.EndCurrency)
  })
});

