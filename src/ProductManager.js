const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.products= [];
        this.counterId = 1;
        this.path = path;
        this.loadProducts();
    }
    
    async loadProducts() {
        try {
            const productsToAdd = JSON.parse(await fs.readFile(this.path, "utf-8"))
            this.products = productsToAdd
            this.counterId = Math.max(...this.products.map(prod => prod.id), 0) +1
        } catch (error) {
            console.log("Error al leer Archivo", error.message)
        }
    }

    async addProduct (product) {
        //Validar campos obligatiorios menos thumbnails
        if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
            console.log("Todos los campos son obligatorios");
            return;
        }
        //Validar campo "code"
        if(this.products.some(prod => prod.code === product.code)){
            console.error("Ya existe el producto");
            return;
        }

        product.id = this.counterId++;
        product.status = true;
        this.products.push(product);
        
        try { 
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
            console.log("Producto agregado", product);
            return product;
        } catch (error) {
            console.log("Error al escribir el archivo: ", error.message)
        }
    }
    async getProducts() {
        try {
            const dataRead = JSON.parse(await fs.readFile(this.path, "utf-8"))
            //this.products = dataRead;
            return dataRead;
        } catch (error) {
            console.log("Error al leer Archivo", error.message)
            return [];
        }
    }
    async getProductsById(id) {
        try {
            const dataRead = JSON.parse(await fs.readFile(this.path, "utf-8"))
            const productFound = dataRead.find(prod => prod.id === id)
            if(productFound){
                return productFound;
            }
            else {
                console.error("Producto no encontrado");
                return null;
            }
        } catch (error) {
            console.log("Error al buscar el producto: ", error.message)
        }
    }
    async updateProduct(id, newProduct) {
        try {
            const dataRead = JSON.parse(await fs.readFile(this.path, "utf-8"))
            const index = dataRead.findIndex(prod => prod.id === id)
            
            if(dataRead) {
                if(typeof newProduct === "object"){
                    dataRead[index] = {...dataRead[index], ...newProduct}
                } else if(typeof newProduct === "string"){
                    dataRead[index][newProduct] = newProduct;
                }
                await fs.writeFile(this.path, JSON.stringify(dataRead, null, 2), 'utf8');
                return newProduct;
            }
        } catch (error) {
            console.log("Error al modificar el archivo. ", error.message);
        }
    }
    async deleteProduct(id) {
        try {
            const dataRead = JSON.parse(await fs.readFile(this.path, "utf-8"))
            const prodIndex = dataRead.findIndex(prod => prod.id === id)
            
            if(prodIndex === -1) {
                console.error("Producto no encontrado");
                return null;
            }
            
            const productFound = dataRead.filter(prod => prod.id !== id)
            await fs.writeFile(this.path, JSON.stringify(productFound, null, 2), 'utf8');
            return productFound
            
        } catch (error) {
            console.log("Error al eliminar el producto: ", error.message)
        }
    }
}

module.exports = ProductManager;