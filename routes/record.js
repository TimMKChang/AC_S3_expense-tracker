const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// '/restaurants/*' all should be authenticated
const { authenticated } = require('../config/auth')
router.all('*', authenticated)

// read all page
router.get('/', (req, res) => {

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const month = req.query.month || ''
  let _regex_date = new RegExp('');
  if (month) {
    _regex_date = new RegExp(`[0-9]{4}-${month}-[0-9]{2}`);
  }

  const category = req.query.category || ''
  const _regex_category = new RegExp(category);

  Record.find({ userId: req.user._id, date: { $regex: _regex_date }, category: { $regex: _regex_category } })
    .sort({ date: 'desc' })
    .lean()
    .then(records => {

      // get total amount
      let totalAmount = 0
      const iconHTML = {
        Housing: '<i class="fas fa-home"></i>',
        Transportation: '<i class="fas fa-shuttle-van"></i>',
        Entertainment: '<i class="fas fa-grin-beam"></i>',
        Food: '<i class="fas fa-utensils"></i>',
        Others: '<i class="fas fa-pen"></i>'
      }

      records.forEach(record => {
        totalAmount += record.amount
        record.icon = iconHTML[record.category]
      })

      return res.render('index', { records, totalAmount, category, months, month })
    })
    .catch(err => {
      return console.error(err)
    })
})
// read create page
router.get('/new', (req, res) => {
  return res.render('new')
})
// create
router.post('/', (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    merchant: req.body.merchant,
    userId: req.user._id
  })

  record.save(err => {
    if (err) {
      return console.error(err)
    }
    return res.redirect('/record')
  })

})
// read update page
router.get('/:id/edit', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .then(record => {

      // category selected
      let options = ['Housing', 'Transportation', 'Entertainment', 'Food', 'Others']
      let optionsHTML = ''
      options.forEach(option => {
        if (option === record.category) {
          optionsHTML += `<option value="${option}" selected="selected">${option}</option>`
        } else {
          optionsHTML += `<option value="${option}">${option}</option>`
        }
      })

      return res.render('edit', { record, optionsHTML })
    })
    .catch(err => {
      return console.error(err)
    })
})
// updete
router.put('/:id', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .then(record => {
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
      record.merchant = req.body.merchant

      record.save(err => {
        if (err) {
          return console.error(err)
        }
        return res.redirect('/record')
      })
    })
    .catch(err => {
      return console.error(err)
    })
})
// delete
router.delete('/:id', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .then(record => {
      record.remove(err => {
        if (err) {
          return console.error(err)
        }
        return res.redirect('/record')
      })
    })
    .catch(err => {
      return console.error(err)
    })
})

module.exports = router
