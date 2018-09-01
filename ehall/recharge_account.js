'use secret'

async function submitForm(pay) {
  const res = await fetch('http://ehall.dgut.edu.cn/home/form/submitForm', {
    method: 'POST',
    headers: {
      authorization: /PHPSESSID=([\w\d]+)/.exec(document.cookie)[1],
      'Content-Type': "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      id: 458,
      field2555: document.getElementById('2555').value,
      field2556: document.getElementById('2556').value,
      field2557: {
        pay: pay.toString(),
        pay_man: 'zc1',
        pay_target: '3'
      },
      field2646: '',
      field2706: '',
    }),
    credentials: 'include',
  })

  return await res.json();
}

async function payDemoFirst(pay, order_id) {
  const formData = new FormData();
  formData.append('order_id', order_id)
  formData.append('order_to', 'zc1')
  formData.append('pay_info', JSON.stringify([{
    accTrType: 1,
    number: 1,
    accTrAmt: pay * 100,
    mem: '充值上网费用'
  }]))

  await fetch('http://ehall.dgut.edu.cn/home/Pay/payDemoFirst', {
    method: 'POST',
    headers: {
      authorization: /PHPSESSID=([\w\d]+)/.exec(document.cookie)[1],
    },
    body: formData,
    credentials: 'include',
  })
}

async function payDemoSecond(pay, order_id) {
  const formData = new FormData();
  formData.append('order_id', order_id)
  formData.append('password', '')
  formData.append('order_to', 'zc1')
  formData.append('pay_info', JSON.stringify([{
    accTrType: 1,
    number: 1,
    accTrAmt: pay * 100,
    mem: '充值上网费用'
  }]))

  await fetch('http://ehall.dgut.edu.cn/home/Pay/payDemoSecond', {
    method: 'POST',
    headers: {
      authorization: /PHPSESSID=([\w\d]+)/.exec(document.cookie)[1],
    },
    body: formData,
    credentials: 'omit',
  })
}

const pay = parseInt(window.prompt('请输入充值金额'))
const order = await submitForm(pay)
await payDemoFirst(pay, order.info.order)
await payDemoSecond(pay, order.info.order)
