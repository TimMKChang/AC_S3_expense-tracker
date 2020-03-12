// doAlert.js

// alert feature object
doAlert = {
  // use sweetalert to confirm when delete
  delete_alert(form) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this restaurant!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isDelete) => {
        if (isDelete) {
          form.submit();
        }
      });
  }
}

window.addEventListener('scroll', function (event) {
  const toTop = document.querySelector('#toTop')
  toTop.style.setProperty('top', `calc(${window.scrollY}px + 75vh)`)
})

// sort date
document.querySelector('#title-date').addEventListener('click', e => {

  // change up and down
  const titleDateHTML = e.target.closest('.btn')
  const iconHTML = titleDateHTML.querySelector('.fas')
  const listGroupChildrenHTML = e.target.closest('.list-group').children
  iconHTML.classList.toggle('fa-arrow-up')
  iconHTML.classList.toggle('fa-arrow-down')

  if (iconHTML.classList.contains('fa-arrow-down')) {
    for (let i = 1; i < listGroupChildrenHTML.length; i++) {
      listGroupChildrenHTML[i].setAttribute('style', `order: ${listGroupChildrenHTML.length - i};`)
    }
  } else if (iconHTML.classList.contains('fa-arrow-up')) {
    for (let i = 1; i < listGroupChildrenHTML.length; i++) {
      listGroupChildrenHTML[i].setAttribute('style', `order: ${i};`)
    }
  }

})

// sort amount
document.querySelector('#title-amount').addEventListener('click', e => {

  // change up and down
  const titleDateHTML = e.target.closest('.btn')
  const iconHTML = titleDateHTML.querySelector('.fas')
  const listGroupChildrenHTML = e.target.closest('.list-group').children

  iconHTML.classList.toggle('fa-arrow-up')
  iconHTML.classList.toggle('fa-arrow-down')

  // get amount
  const amounts = []
  for (let i = 1; i < listGroupChildrenHTML.length; i++) {
    amounts.push(listGroupChildrenHTML[i].querySelector('.record-amount').innerText)
  }

  amounts.sort(function (a, b) {
    return Number(a) - Number(b)
  })
  console.log(amounts)

  if (iconHTML.classList.contains('fa-arrow-down')) {
    for (let i = 1; i < listGroupChildrenHTML.length; i++) {
      const amountIndex = amounts.indexOf(listGroupChildrenHTML[i].querySelector('.record-amount').innerText)
      listGroupChildrenHTML[i].setAttribute('style', `order: ${amountIndex};`)
    }
  } else if (iconHTML.classList.contains('fa-arrow-up')) {
    for (let i = 1; i < listGroupChildrenHTML.length; i++) {
      const amountIndex = amounts.indexOf(listGroupChildrenHTML[i].querySelector('.record-amount').innerText)
      listGroupChildrenHTML[i].setAttribute('style', `order: ${listGroupChildrenHTML.length - amountIndex};`)
    }
  }

})

// chart

createPieChart()

function createPieChart() {

  const category = [
    'Housing',
    'Transportation',
    'Entertainment',
    'Food',
    'Others'
  ]

  const amounts = [0, 0, 0, 0, 0]

  const listGroupChildrenHTML = document.querySelector('.list-group').children
  for (let i = 1; i < listGroupChildrenHTML.length; i++) {
    const index = category.indexOf(listGroupChildrenHTML[i].querySelector('.category').dataset.category)
    amounts[index] += Number(listGroupChildrenHTML[i].querySelector('.record-amount').innerText)
  }

  const ctx = document.getElementById('recordChart');

  // And for a doughnut chart
  const myDoughnutChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: amounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: category,

    },
    options: {
      responsive: false
    }
  })

}
