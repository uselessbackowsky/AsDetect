const fs = require ('fs')
const csv = require ('csv-parser')
const http = require('http')
const path = require('path')
const nodeCsvReadFile = []
const lineCsvReadFile = []
const server = http.createServer((req,res) =>{
  res.writeHead(200,{
      'content-type' : 'text/html'
  })
  let filePath = path.join(__dirname, req.url==='/' ? 'AsDetect.html' : req.url)
  const extnname = path.extname(filePath) 
  console.log(req.url)
  let constentType = 'text/html'
  switch (extnname) {
      case '.css':
          constentType ='text/css'
          break
      case '.js':
          constentType = 'text/javascript'
          break
  }
  fs.readFile (filePath, (err,data)=>{
      if (err) throw error
      
      else(res.writeHead(200, {
          'Content-type': constentType
      }))
      res.end(data)
  })
  fs.createReadStream('node.csv')
  .pipe(csv())
  .on('data', (data) => nodeCsvReadFile.push(data))
  .on('end', () => {
    console.log(nodeCsvReadFile);
  });
  fs.createReadStream('line.csv')
  .pipe(csv())
  .on('data', (data) => lineCsvReadFile.push(data))
  .on('end', () => {
    console.log(lineCsvReadFile)
  })
  
})
server.listen(3000,()=>{
  console.log('start')
})
  console.log('привет')