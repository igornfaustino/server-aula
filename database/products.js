const prisma = require("./prisma");


const getAllProducts = (moreThan) => {
    return prisma.products.findMany({
        where: {
            price: {
                gt: moreThan
            }
        }
    });
}

const getProductById = (id) => {
    return prisma.products.findFirst({
        where: {
            id: id
        }
    })
}

const saveProduct = (product) => {
    return prisma.products.create({
        data: product
    })
}

const updateProduct = (id, product) => {
    return prisma.products.update({
        where: {
            id: id
        },
        data: product
    })
}

const deleteProduct = (id) => {
    return prisma.products.delete({
        where: {
            id: id
        }
    })
}

module.exports = {
    saveProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}