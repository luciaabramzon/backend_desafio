


const express=require ('express')
const app=express()
const port=8080
var fs=require("fs")


let contenido= fs.readFileSync('./productos.txt','utf-8')
let contenidoArray=JSON.parse(contenido)
let aleatorio= contenidoArray[Math.floor(Math.random()*contenidoArray.length)]

app.get(`/`,(req,res)=>{
    res.end(`<h1> Desafio 3 </h1>`)
})

app.get(`/productos`,(req,res)=>{
    res.end(contenido)
})

app.get(`/productosRandom`,(req,res)=>{
    res.end(`Nombre: ${aleatorio.tittle}, Precio: ${aleatorio.price}, Image: ${aleatorio.image}`)
})

app.on("error",error=>console.log(`El error es ${error}`))

app.listen(port,()=>{
    console.log(`Tu servidor esta corriendo en ${port}`)
})  