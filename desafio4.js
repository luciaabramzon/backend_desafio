// clase contenedor desafio 2
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
    static id = 1

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

//desafio 4

const express=require ('express')
const app=express()
const PORT=process.env.PORT || 8080
const {Router}= express
const multer=require('multer')
const { json } = require("body-parser")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const routerProductos= Router()
app.use('/api/productos',routerProductos)

app.get('/',async (req,res)=>{
    res.end( await producto1.readFile())
})

app.get('/:id',async (req,res)=>{
    const id =req.params.id 
    let inventario= await producto1.readFile()
    let contenidoArray=JSON.parse(inventario)
    if(id>contenidoArray.length){
        res.json({error: `El ID no existe`})
    }
    else{
    let number=contenidoArray[id-1]
    res.end(JSON.stringify(number))
}
})

app.post('/',(req,res)=>{
    const producto=req.body
    let productoNuevo= new Contenedor(producto)
    productos.push(productoNuevo)
    res.json(productos)
})

app.put('/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    let inventario= await producto1.readFile()
    let contenidoArray=JSON.parse(inventario)
    if(id> contenidoArray.length){
        res.json({error: `El ID no existe`})
    } else { 
        res.json({mensaje: `Cambiado producto ${id}`})
    }
})

app.delete('/:id',async (req,res)=>{
    const id=parseInt(req.params.id)
    let inventario= await producto1.readFile()
    let contenidoArray=JSON.parse(inventario)
    if(id> contenidoArray.length){
        res.json({error: `El ID no existe`})
    } else { 
    let idBorrar=contenidoArray.filter((item)=> item.id != id)
    res.end(`Eliminado contenido id= ${id}`)
}
})

const server=app.listen(PORT,()=>{
    console.log(`Su app corre en el puerto ${PORT}`)
})

server.on("error",error=>console.log(`Error: ${error}`))

//storage HTML

/* app.get(`/`,(req,res)=>{
    res.sendFile(__ + '/public/index.html')
}) */

let storage= multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+ '-'+ Date.now())
    }
})

let upload=multer({sotrage:storage})


app.post('/uploadfile', upload.single('myFile'),(req,res,next)=>{
    const file=req.file
    if(!file){
        const error=new Error ('Please upload file')
        error.httpStatusCode=400;
        return next(error)
    }
    res.send(file)
})
