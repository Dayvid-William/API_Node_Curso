const http = require('http')

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

// POST /todos
// GET /todos
// GET /todos/:id
// DELETE /todos/:id
// PUT /todos/:id



  response.writeHead(404)
  response.end('Resource not found\n')

})

server.listen(3000, '0.0.0.0', () => {
  console.log("Server started")
})
