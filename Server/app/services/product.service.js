const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
        // this.Category = client.db().collection("categories");
    }

    extractProductData(payload) {

        // Chuyển string thành ObjectId
        payload.category_id = new ObjectId(payload.category_id);

        const product = {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            image: payload.image,
            quantity: payload.quantity,
            category_id: payload.category_id // Chuyển đổi category_id sang ObjectId
          
        };

        // Remove undefined fields
        Object.keys(product).forEach(
          (key) => product[key] === undefined && delete product[key]
        );
        
        return product;
    }
      
    async create(payload) {
        const product = this.extractProductData(payload);
        const now = new Date();
        product.createdAt = now;
        product.updatedAt = now;
        
        
        const result = await this.Product.insertOne(product);
        return result;
    }
    

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Product.findOne({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = {
                        name: payload.name,
                        description: payload.description,
                        price: payload.price,
                        image: payload.image,
                        quantity: payload.quantity,
                        category_id: ObjectId(payload.category_id), // Chuyển đổi category_id sang ObjectId
                        updatedAt: new Date(),
        };

        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result.value;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ProductService;
