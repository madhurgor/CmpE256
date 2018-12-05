const express = require('express')
const bodyParser = require('body-parser');
const exec = require('child_process').exec
const path = require('path')
const app = express()
const port = 3001

app.set('views', path.join(__dirname, '/view'));
app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {
  console.log(req.body)
  console.log('python "256 Project version 2.py" ' + req.body.home.split(',')[0] + ' ' + req.body.away.split(',')[0])
  exec('python "256 Project version 2.py" ' + req.body.home.split(',')[0] + ' ' + req.body.away.split(',')[0], (error, stdout, stderr) => {
    console.log(error)
    console.log(stderr)
    console.log(stdout)
    message = 'Among teams ' + req.body.home.split(',')[1] + ' and ' + req.body.away.split(',')[1] + ', '
    if (stdout == 2) {
      message += req.body.home.split(',')[1] + ' will win.'
    } else if (stdout == 0) {
      message += req.body.away.split(',')[1] + ' will win.'
    } else {
      message += ' the match will draw.'
    }
    res.render('home', {message: message})
  })
})

app.listen(port, () => {
  console.log(`CmpE 256 Project View Listening on Port ${port}!`)
})
