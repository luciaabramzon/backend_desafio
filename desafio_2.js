
let productos=[]
var fs=require("fs")

 class Contenedor{
    constructor(tittle,price,image){
        this.tittle=tittle
        this.price=price
        this.image=image
        this.id= Contenedor.id
        Contenedor.id ++
    }
    static id = 0

    async save () {
        try{
            await fs.appendFileSync('productos.txt',JSON.stringify(productos))
            console.log("guardado")
        }
        catch (err){
            console.log("huo un error")
        }
        }
        
     async readFile(){
        try{
            const contenido=await fs.readFileSync('./productos.txt','utf-8')
            return contenido 
        }
        catch (err){
            console.log("no se puede leer archivo")
        }
    }
   async getbyId(id) {
        try {
            const inventary = await fs.promises.readFile(`./productos.txt`, "utf-8")
            let dataParse = JSON.parse(inventary)
            let objFind = dataParse.find(item => item.id == id)
            if (objFind) {
                return objFind
            } else {
                return null
            }

        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }
    } 
    async deleteById(){
        try{
            productos.splice(0,1)
            setTimeout(()=>{
                fs.promises.writeFile('./productos.txt',JSON.stringify(productos))
                console.log("guardados los cambios")
            },5000)
           
        }
        catch (err){
            console.log("No existe el archivo a eliminar")
        }
    }   
    async deleteAll(){
        try{
            setTimeout(()=>{
                fs.unlinkSync("./productos.txt")
                console.log("borrado todo")
            },10000)
        }
        catch (err){
            console.log(err)
        }  
    }
    }


    productos.push (new Contenedor ("plato",1305,"https://www.shopmania.es/q-jarrones"))
    productos.push (new Contenedor ("mesa",1650,"https://www.shopmania.es/q-jarrones"))
    
    const producto1= new Contenedor ("jarron",105,"https://www.shopmania.es/q-jarrones")
   productos.push(producto1) 
/*    producto1.save()    */
const express=require ('express')
const { get } = require("https")
const app=express()
const port=8081

let inventario = async function(){
    let inventario= await producto1.readFile()
    let contenidoArray=JSON.parse(inventario)
    let number= contenidoArray[Math.floor(Math.random()*contenidoArray.length)]
    let getById = await producto1.getbyId(number.id)
    return getById
  }
inventario()
 
 app.get(`/`,async (req,res)=>{
    res.end(`<h1> Desafio 3 </h1>`)
})

app.get(`/productos`,async (req,res)=>{
    res.end(await producto1.readFile())
})

  app.get(`/productosRandom`,async (req,res)=>{
    let aleatorio= await inventario()
    res.end(JSON.stringify(aleatorio))
})  

app.on("error",error=>console.log(`El error es ${error}`))

app.listen(port,()=>{
    console.log(`Tu servidor esta corriendo en ${port}`)
})   