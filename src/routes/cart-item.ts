import express from "express";
import Item from "../models/Item";

const routes = express.Router();

const item: Item[] = [
    {id: 1, product: "Chicken", price: 10, quantity: 3},
    {id: 2, product: "Cereal", price: 2.99, quantity: 5},
    {id: 3, product: "Oranges", price: 3.99, quantity: 10},
    {id: 4, product: "Bread", price: 4, quantity: 1},
    {id: 5, product: "Chips", price: 2, quantity: 2},

];

routes.get('/cart-items', (req, res) => {
    let results = item;
    const maxPrice = req.query.maxPrice;
    const prefix = req.query.prefix;
    const pageSize = req.query.pageSize ;

    if (maxPrice) {
        const maxPriceNum = Number(maxPrice);
        results = results.filter(item => item.price <= maxPriceNum);
    }

    if(prefix) {
        results = results.filter(item => item.product.startsWith(prefix as string));
    }

    if (pageSize) {
        results = results.slice(0, Number(pageSize as string));
    }
    res.status(200);
    res.json(results);
});

routes.get('/cart-items/:id', (req, res) => {
    const id = Number(req.params.id);
    const cart = item.find(item => item.id === id);

    if (cart) {
        res. status(200);
        res.json(cart);
    } else{
        res.status(404);
        res.send('ID' + id + 'Not Found');
    }
});

routes.post('/cart-items', (req, res) => {
    const cart: Item = req.body;
    let ids = item.map(i => i.id);
    let biggestId = Math.max(...ids);
    cart.id = ++biggestId;
    item.push(cart);
    res.status(201);
    res.json(cart);
});

routes.put('/cart-items/:id', (req, res) => {
    const cart: Item = req.body;
    const id = Number(req.params.id);
    const indexOfItem = item.findIndex(i => id === i.id);
    item[indexOfItem] = cart;
    res.status(200);
    res.json(cart);

});

routes.delete('/cart-items/:id', (req, res) => {
    const cart: Item = req.body;           
    const id = Number(req.params.id);//converting id to number
    const indexOfItem = item.findIndex(i => id === i.id);
    item.splice(indexOfItem, 1);
    res.status(204);
    res.end();

    



});    
export default routes;
