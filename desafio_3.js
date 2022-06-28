const fs = require("fs")

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        async function createFile() {
            try {
                await fs.promises.writeFile(`${fileName}`, "")
                console.log("archivo Creado ")
            } catch (err) {
                console.log(`hubo un error : ${err}`)
            }
        }
        createFile()
    }
    //guardar el objeto en el archivo y devolver el id asignado 
    async save(obj) {
        try {
            let inventary = await fs.promises.readFile(`${this.fileName}`, 'utf-8')
            console.log(inventary)
            if (!inventary) {
                obj.id = 1
                const arrObjs = [obj]
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(arrObjs))
                return obj.id
            } else {
                inventary = JSON.parse(inventary);
                obj.id = inventary[inventary.length - 1].id + 1
                inventary.push(obj)
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(inventary))
                return obj.id
            }
        } catch (err) {
            console.log(`no se pudeo agregar el objeto por : ${err}`)
        }
    }
    // recibe un id y devuelve el objeto con ese id si no existe devolver null

    async getbyId(id) {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
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
    // devolver un array de objetos con todos los objetos que esten el archivo 
    async getAll() {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let inventaryParse = JSON.parse(inventary)
            return inventaryParse
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }

    // borrar el elemento segun el id que le pasemos en el archivo 
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let objsFind = dataParse.filter((item) => item.id != id)
            fs.promises.writeFile(`${this.fileName}`, JSON.stringify(objsFind))
            console.log(`objeto con id : ${id} borrado`)
        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }

    }
    // elimina todos 
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, " ")
            console.log("contenido Borrado")
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }
}

const newFile = new Contenedor("./productos.txt")

async function cargarProductos (){
    await newFile.save({ title: "cartuchera", price: 100, thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/891/147/products/15222071-151595990d47d4f35b16467701309837-1024-1024.jpg" })
    await newFile.save({ title: "lapiz", price: 300, thumbnail: "https://papeleria24h.files.wordpress.com/2019/03/punta-lapiz-staedtler-tradition-110.jpg?w=982" })
    await newFile.save({ title: "carpeta", price: 500, thumbnail: "https://www.rioshopdeco.com.ar/6534-large_default/carpeta-pp-tonalizada-escolar-3x40-azul-art-5401.jpg" })
}
 cargarProductos()  
