const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.newOrder = async (req, res, next) => {
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body;

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user._id,
	});

	res.status(200).json({
		success: true,
		order,
	});
};

exports.getSingleOrder = async (req, res, next) => {
	try {
		console.log(req.params.id);
		const order = await Order.findById(req.params.id).populate(
			"user",
			"name email"
		);

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "No order found with this ID",
			});
		}

		res.status(200).json({
			success: true,
			order,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getAllOrders = async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
};

exports.myOrders = async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		order,
	});
};

exports.deleteOrder = async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return "no such order";
	}

	await order.deleteOne({ _id: req.params.id });

	res.status(200).json({
		success: true,
	});
};

exports.updateOrder = async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (order.orderStatus === "Delivered") {
		return "order already delivered";
	}

	order.orderItems.forEach(async (item) => {
		await updateStock(item.product, item.quantity);
	});

	order.orderStatus = req.body.status;

	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}

	await order.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
};

async function updateStock(id, quantity) {
	const product = await Product.findById(id);

	product.stock -= quantity;
	if (product.stock < 0) {
		return "no stock available";
	}
	await product.save({ validateBeforeSave: false });
}
