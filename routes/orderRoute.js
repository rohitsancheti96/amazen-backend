import express from 'express';
import Order from '../models/orderModel';
import { isAuth } from '../util';

const router = express.Router();

router.get('/:id', isAuth, async (req, res) => {
    console.log(req.params.id);
    const order = await Order.findOne({ _id: req.params.id });
    console.log(order);
    if (order) {
        res.send(order);
    } else {
        console.log('404 error');
        res.status(404).send('Order Not Found.');
    }
});

router.post('/', isAuth, async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    if (newOrderCreated) {
        return res
            .status(201)
            .send({ message: 'New Order Created', data: newOrderCreated });
    } else {
        return res.status(500).send({ message: 'Error in creating Product.' });
    }
});

export default router;
