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
