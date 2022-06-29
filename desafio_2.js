
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
    async getById(){
        try{
            let elegido=await productos.find(id=>id.id===2)
            if(!elegido){
            console.log('no hay producots')
            }else{
            console.log(elegido)
            }
        }
        catch (err){
            console.log("error")
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

    export default Contenedor

    productos.push (new Contenedor ("plato",1305,"https://www.shopmania.es/q-jarrones"))
    productos.push (new Contenedor ("mesa",1650,"https://www.shopmania.es/q-jarrones"))
    
    const producto1= new Contenedor ("jarron",105,"https://www.shopmania.es/q-jarrones")
    productos.push(producto1)
  /*   producto1.save()   */
const express=require ('express')
const app=express()
const port=8080

let inventario = async function(){
    let inventario= await producto1.readFile()
    let contenidoArray=JSON.parse(inventario)
    let aleatorio= contenidoArray[Math.floor(Math.random()*contenidoArray.length)]
    return aleatorio
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