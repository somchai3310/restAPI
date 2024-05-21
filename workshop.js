const express = require('express')
const bodyparser = require('body-parser')
const app = express()

// app.use(bodyparser.text())
app.use(bodyparser.json())

const port = 8000

let users = []
let counter = 1

/* 
GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับการดึง users รายคนออกมา
PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
*/


// GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', (req, res) => {
  const filterUsers = users.map(user => {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.firstname + ' ' + user.lastname
    }
  })
  res.json(filterUsers)
})

// POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', (req, res) => {
  let user = req.body
  user.id = counter
  counter +=1
  users.push(user)
  console.log('user', user);
  res.json({
    message: 'add ok',
    user: user
  })
})

// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', (req, res) => {
  let id = req.params.id

  // หา index ของ user
  let selectedIndex = users.findIndex(user => user.id == id)

  res.json(users[selectedIndex])
})

// PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id' , (req, res) => {
  let id = req.params.id
  let updateUser = req.body

  //  หา users จาก id ที่ส่งมา
  let selectedIndex = users.findIndex(user => user.id == id)
  
  // update users นั้น
  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
  users[selectedIndex].age = updateUser.age || users[selectedIndex].age
  users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender

  // users ที่ update ใหม่ update กลับเข้าไปที่ users ตัวเดิม
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