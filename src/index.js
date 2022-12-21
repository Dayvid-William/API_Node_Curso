const http = require('http')

const server = http.createServer((request, response) => {

  // GET /hello -> hello world!
  if (request.method == 'GET' && request.url.startsWith('/hello')) {
    response.writeHead(200)
    response.end('Hello World!\n')
    return
  }

  //Get /hello/:nome -> hello ${nome} !
  if (request.method == 'GET' && /^\/hello\/\/w+$/.test(request.url)) {

  }
})

server.listen(3000, '0.0.0.0', () => {
  console.log("Server started")
})
