import axios from "axios";
import React, { useEffect, useState } from "react";
import './app.scss'


const App = () => {

  const [toSend, setToSend] = useState({
    price: 1000000,
    initFee: 10,
    months: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  }

  const percent = 0.035;
  const initial = Math.ceil(toSend.price * toSend.initFee / 100);
  const monthPay = Math.ceil((toSend.price - initial) * ((percent * Math.pow((1 + percent), toSend.months)) / (Math.pow((1 + percent), toSend.months) - 1)));
  const leasingSum = Math.ceil(initial + toSend.months * monthPay);


  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const postTodo = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
          params: {
            "car_coast": toSend.price,
            "initail_payment": initial,
            "initail_payment_percent": toSend.initFee,
            "lease_term": toSend.months,
            "total_sum": leasingSum,
            "monthly_payment_from": monthPay,
          },
          data: '',
            headers: {
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': '*',
        }
          });
      setIsLoading(false);
      console.log(response);
    } catch (e) {
      setIsLoading(false);
      console.log("something went wrong!", e);
    }
  };
  postTodo();
}

useEffect(() => {
  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value ? e.value : e.min);
    e.style.setProperty('--min', e.min);
    e.style.setProperty('--max', e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
  }
}, [toSend])

useEffect(() => {
  const but = document.getElementById('button');
  if (isLoading) {
    but.classList.add('loading')
  } else {
    but.classList.remove('loading')
  }
}, [isLoading])



return (
  <main>
    {isLoading && <div className="opacity"></div>}

    <h1>Рассчитайте стоимость автомобиля в лизинг</h1>

    <form
      className='form'
      id='form'>
      <section className="sec-A">
        <h3>Стоимость автомобиля</h3>
        <div>
          <input name='price' type="text" pattern="^[0-9]+$" value={toSend.price} onChange={handleChange} />
          <span>₽</span>
        </div>
        <input className='styled-slider slider-progress' name='price' type="range" min="1000000" max="6000000" step="10" value={toSend.price} onChange={handleChange} />
      </section>

      <section className="sec-B">
        <h3>Первоначальный взнос</h3>
        <div>
          <span>{initial}₽</span>
          <div className="percent-input">
            <input name='initFee' type="text" pattern="^[0-9]+$" value={toSend.initFee} onChange={handleChange} />
            <span>%</span>
          </div>
        </div>
        <input className='styled-slider slider-progress' name='initFee' type="range" min="10" max="60" step="5" value={toSend.initFee} onChange={handleChange} />
      </section>

      <section className="sec-C">
        <h3>Срок лизинга</h3>
        <div>
          <input name='months' type="text" pattern="^[0-9]+$" value={toSend.months} onChange={handleChange} />
          <span>мес.</span>
        </div>
        <input className='styled-slider slider-progress' name='months' type="range" min="1" max="60" step="1" value={toSend.months} onChange={handleChange} />
      </section>


      <section className="sec-D">
        <h3>Сумма договора лизинга</h3>
        <span className="calculated">{leasingSum}₽</span>
      </section>

      <section className="sec-E">
        <h3>Ежемесячный платеж от</h3>
        <span className="calculated">{monthPay}₽</span>
      </section>

      <button id='button' type='submit' onClick={onSubmit} className='submit_button sec-F'>{isLoading? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> :'Оставить заявку'}</button>
    </form>

  </main>
)
}

export default App


