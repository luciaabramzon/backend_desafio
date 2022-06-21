
let productos=[]

 class Contenedor{
    constructor(tittle,price,image){
        this.tittle=tittle
        this.price=price
        this.image=image
        this.id= Contenedor.id
        Contenedor.id ++
    }
    static id = 0
}

    productos.push (new Contenedor ("jarron",105,"https://www.shopmania.es/q-jarrones"))
    productos.push (new Contenedor ("plato",1305,"https://www.shopmania.es/q-jarrones"))
        productos.push (new Contenedor ("mesa",1650,"https://www.shopmania.es/q-jarrones"))

        var fs=require("fs")
 function save (){
        fs.appendFileSync("productos.txt",JSON.stringify(productos),function(err){
            if (err) throw err;
            console.log("guardado")
        })
    }
 save()
 
   function getById(){
    let elegido= productos.find(id=>id.id===2)
    if(!elegido){
        console.log('no hay producots')
    }else{
        console.log(elegido)
    }
    }
    getById()  

    function getAll(){
        fs.promises.readFile('./productos.txt','utf-8')
        .then(contenido => {
            console.log(contenido)
        })
        .catch(err => {
            console.log('Hubo un error de lectura')
        })
    }
getAll() 

function deleteAll(){
        fs.unlinkSync("./productos.txt")
    }
    deleteAll()

    function deleteById(){
        productos.splice(0,1)
        fs.writeFile('./productos.txt',JSON.stringify(productos),function (err){
            if (err) throw err;
            else{
                console.log("guardado")
            }
        })
    }
    deleteById()

