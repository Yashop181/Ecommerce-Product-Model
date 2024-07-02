const express = require('express');
const router = express.Router();
const Product = require('./models');

router.post('/', async(req,res)=>{
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.patch('/:id', async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        });
        if(!product)
            {
                return res.status(404).send();
            }
            res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product)
            {
                return res.status(404).send({message: 'Product Not found'});
            }
            res.status(200).send({message:"Product Deleted",product})
    } catch (error) {
        res.status(500).send({ error: 'Server error', details: error });
    }
});
module.exports = router;