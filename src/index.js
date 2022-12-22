const http = require('http')

const wait = (time) =>
  new Promise(resolve =>
    setTimeout(resolve, time)
  )

const todosDatabase = (() => {
  let idSequence = 1
  const todos = {}

  const insert = async (todo) => {
    await wait(500)
    const id = idSequence++
    const data = { ...todo, id }
    todos[id] = data
    return data
  }

  const list = async () => {
    await wait(100)
    return Object.values(todos)
  }

  const get = async (id) => {
    await wait(100)
    return todos[id]
  }

  const update = async (todo) => {
    await wait(500)
    todos[todo.id] = todo
    return todo
  }

  const del = async (id) => {
    await wait(500)
    delete todos[id]
  }

  return {
    insert,
    list,
    get,
    update,
    del,
  }

})()

const JsonHeader = { 'Content-Type': 'application/json' }

const server = http.createServer((request, response) => {

  //Get /hello/:nome -> hello ${nome} !
  if (request.method == 'GET' && /^\/hello\/\w+$/.test(request.url)) {
    const [,, name] = request.url.split('/')
    response.writeHead(200)
    response.end(`Hello ${name}!\n`)
    return
  }

  // GET /hello -> hello world!
  if (request.method == 'GET' && request.url.startsWith('/hello')) {
    response.writeHead(200)
    response.end('Hello World!\n')
    return
  }

  // POST /echo
  if (request.method == 'POST' && request.url.startsWith('/echo')) {
    response.writeHead(200)
    request.pipe(response)
    return
  }

// *****************
// ** API TODOS **
// *****************

// {id, title, text}

// POST /todos { "text": "string", "title": "string" }

if (request.method == 'POST' && request.url.startsWith('/todos')) {
  let bodyRaw = ''

  request.on('data', data => bodyRaw+= data)

  request.once('end', () => {
    const todo = JSON.parse(bodyRaw)
    todosDatabase.insert(todo)
      .then(inserted => {
        response.writeHead(201, JsonHeader)
        response.end(JSON.stringify(inserted))
      })
  })

  return
}

// GET /todos
if (request.method == 'GET' && request.url.startsWith('/todos')) {
  todosDatabase.list()
    .then(todos => {
      response.writeHead(200, JsonHeader)
      response.end(JSON.stringify({ todos }))
    })
    return
}
// GET /todos/:id
// DELETE /todos/:id
// PUT /todos/:id



  response.writeHead(404)
  response.end('Resource not found\n')

})

server.listen(3000, '0.0.0.0', () => {
  console.log("Server started")
})
