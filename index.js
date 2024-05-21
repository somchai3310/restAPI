const express = require('express')
const bodyparser = require('body-parser')
const app = express()

// app.use(bodyparser.text())
app.use(bodyparser.json())

const port = 8000

let users = []
let counter = 1

// path = /
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/test', (req, res) => {
  let user = {
    firstname: 'test',
    lastname: 'lastname',
    age: 14,
  }
  res.json(user)
  // res.send('Hello test')
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/user', (req, res) => {
  let user = req.body
  user.id = counter
  counter +=1
  users.push(user)
  console.log('user', user);
  // res.send(req.body)
  res.json({
    message: 'add ok',
    user: user
  })
})

// path = PUT /user/:id
app.put('/user/:id' , (req, res) => {
  let id = req.params.id
  let updateUser = req.body

  //  หา users จาก id ที่ส่งมา
  let selectedIndex = users.findIndex(user => user.id == id)
  
  // update users นั้น
  // users[selectedIndex] = updateUser
  // (null || 'ทดสอบ')
  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname

  // users ที่ update ใหม่ update กลับเข้าไปที่ users ตัวเดิม
  res.json({
    message: 'update user complete!',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex
    }
  })
})

// path = patch
// มี fild นั้นค่อยทำ
app.patch('/user/:id', (req,res) =>{
  let id = req.params.id
  let updateUser = req.body

  //  หา users จาก id ที่ส่งมา
  let selectedIndex = users.findIndex(user => user.id == id)
  
  if (updateUser.firstname) {
    users[selectedIndex].firstname = updateUser.firstname
  }
  if (updateUser.lastname) {
    users[selectedIndex].lastname = updateUser.lastname
  }

  res.json({
    message: 'update user complete!',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex
    }
  })
})

// path DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  let id = req.params.id
  // หา index user ที่จะลบ
  let selectedIndex = users.findIndex(user => user.id == id)

  // ลบ
  // delete users[selectedIndex]
  users.splice(selectedIndex, 1)

  res.json({
    message: 'delete complete!',
    indexDeleted: selectedIndex
  })
})

app.listen(port, (req,res) => {
  console.log('http server run at '+port);
})