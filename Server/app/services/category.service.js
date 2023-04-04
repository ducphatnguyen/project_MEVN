const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("categories");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCategoryData(payload) {
        const category = {
            name: payload.name,
            // description: payload.description,
        };
        // Remove undefined fields
        Object.keys(category).forEach(
            (key) => category[key] === undefined && delete category[key]
        );
        return category;
    }

    async create(payload) {
        const category = this.extractCategoryData(payload);
        const now = new Date();
        category.createdAt = now;
        category.updatedAt = now;
        const result = await this.Category.insertOne(category);
        return result;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = {
            name: payload.name,
            // description: payload.description,
            // parentId: payload.parentId ? new ObjectId(payload.parentId) : null,
            updatedAt: new Date(),
        };

        const result = await this.Category.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result.value;
    }

    async find(filter) {
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Category.findOne({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async delete(id) {
        const result = await this.Category.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result.value;
    }
}

module.exports = CategoryService;
