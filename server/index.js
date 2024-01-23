// imports
const express = require('express')
const config = require('./lib/config')

// consts
const app = express()
app.use(express.json())
const port = config.httpPort

// state
const allUsers = []
const user = {}

// Routes
app
  .route('/registration')
  .all((req, res, next) => {
    if (req.method == 'POST' || req.method == 'GET') {
      next()
    } else {
      res.status(406).setHeader('Content-Type', 'application/json')
      res.json({ status: 406, message: 'Method not allowed' })
    }
  })
  .get((req, res) => {
    res.end('Hello World!')
  })
  .post((req, res) => {
    const regData = { ...req.body }
    let isValid = true
    let errMsg = 'Missing required fields'

    // validate all fields required
    if (typeof regData.email !== 'string') isValid = false
    if (regData.email?.trim().length <= 0) isValid = false
    if (typeof regData.type !== 'string') isValid = false
    if (regData.type?.trim().length <= 0) isValid = false
    if (typeof regData.password !== 'string') isValid = false
    if (regData.password?.trim().length <= 0) isValid = false
    if (regData.type && regData.type?.trim() === 'PF') {
      if (typeof regData.personalData.name !== 'string') isValid = false
      if (regData.personalData.name?.trim().length <= 0) isValid = false
      if (typeof regData.personalData.document !== 'string') isValid = false
      if (regData.personalData.document?.trim().length <= 0) isValid = false
      if (typeof regData.personalData.birthDay !== 'string') isValid = false
      if (regData.personalData.birthDay?.trim().length <= 0) isValid = false
      if (typeof regData.personalData.phone !== 'string') isValid = false
      if (regData.personalData.phone?.trim().length <= 0) isValid = false
    } else if (regData.type && regData.type?.trim() === 'PJ') {
      if (typeof regData.companyData.companyName !== 'string') isValid = false
      if (regData.companyData.companyName?.trim().length <= 0) isValid = false
      if (typeof regData.companyData.document !== 'string') isValid = false
      if (regData.companyData.document?.trim().length <= 0) isValid = false
      if (typeof regData.companyData.oppeningDate !== 'string') isValid = false
      if (regData.companyData.oppeningDate?.trim().length <= 0) isValid = false
      if (typeof regData.companyData.phone !== 'string') isValid = false
      if (regData.companyData.phone?.trim().length <= 0) isValid = false
    } else {
      isValid = false
    }

    // validate unique email field
    const idx = allUsers.findIndex((obj) => obj.email === regData.email?.trim())
    if (idx !== -1) {
      isValid = false
      errMsg = 'User already exists!'
    }

    if (isValid) {
      allUsers.push(regData)
      res.status(201).setHeader('Content-Type', 'application/json')
      res.json({ status: 201, message: 'Registration created' })
    } else {
      res.status(403).setHeader('Content-Type', 'application/json')
      res.json({ status: 403, message: errMsg })
    }
  })

app
  .route('/users')
  .all((req, res, next) => {
    if (req.method == 'GET') {
      // TODO: Only authenticated user can access this route
      next()
    } else {
      res.status(406).setHeader('Content-Type', 'application/json')
      res.json({ status: 406, message: 'Method not allowed' })
    }
  })
  .get((req, res) => {
    res.status(200).setHeader('Content-Type', 'application/json')
    res.json(allUsers)
  })

app
  .route('/user')
  .all((req, res, next) => {
    if (req.method == 'GET' || req.method == 'PUT' || req.method == 'DELETE') {
      // TODO: Only authenticated user can access this route
      next()
    } else {
      res.status(406).setHeader('Content-Type', 'application/json')
      res.json({ status: 406, message: 'Method not allowed' })
    }
  })
  .get((req, res) => {
    res.status(200).setHeader('Content-Type', 'application/json')
    res.json(user)
  })
  .put((req, res) => {
    res.end('Update a new user')
  })
  .delete((req, res) => {
    res.end('Delete a new user')
  })

app.all('*', function (req, res) {
  res.status(406).setHeader('Content-Type', 'application/json')
  res.json({ status: 404, message: 'Not found' })
})

//
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
