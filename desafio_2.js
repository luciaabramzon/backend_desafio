
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
        try{
            const contenido= await fs.promises.readFile('./productos.txt','utf-8')
            console.log(contenido)
        }
        catch (err){
            console.log("no se puede leer archivo")
        }
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
    producto1.save()

