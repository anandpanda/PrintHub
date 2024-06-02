const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const error = require("../middleware/error");


exports.getAllProducts = async (req, res, next) => {
	const resultPerPage = 8;
	const productsCount = await Product.countDocuments();
	const apiFeature = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);

	let products = await apiFeature.query;
	let filteredProductsCount = products.length;

	res.status(200).json({
		success: true,
		products,
		productsCount,
		resultPerPage,
		filteredProductsCount,
	});
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

exports.getProductDetails = async (req, res, next) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	if (!product) {
		return res.status(404).json({
			success: false,
			product,
			message: "Product not found",
		});
	}

	res.status(200).json({
		success: true,
		product,
	});
};

exports.deleteProduct = async (req, res, next) => {
	console.log("hiiiii");
	const productId = req.params.id;
	const product = await Product.findById(productId);
  console.log(product);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	//deleting images from cloudinary
	for (let i = 0; i < product.images.length; i++) {
		await cloudinary.v2.uploader.destroy(product.images[i].public_id);
	}

	await Product.deleteOne({ _id: product._id });

	res.status(200).json({
		success: true,
		id: req.params.id,
		message: "Deleted",
	});
};

exports.updateProduct = async (req, res, next) => {
	try {
		let product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		//Images start here
		let images = [];

		if (typeof req.body.images === "string") {
			images.push(req.body.images);
		} else {
			images = req.body.images;
		}

		if (images !== undefined) {
			for (let i = 0; i < product.images.length; i++) {
				await cloudinary.v2.uploader.destroy(
					product.images[i].public_id
				);
			}

			let imagesLinks = [];

			for (let i = 0; i < images.length; i++) {
				const result = await cloudinary.v2.uploader.upload(images[i], {
					folder: "products",
				});
				imagesLinks.push({
					public_id: result.public_id,
					url: result.secure_url,
				});
			}
			req.body.images = imagesLinks;
		}

		product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		});

		res.status(200).json({
			success: true,
			product,
		});
	} catch (error) {
		next(error);
	}
};

exports.createProduct = async (req, res, next) => {
	try {
		let images = [];

		if (typeof req.body.images === "string") {
			images.push(req.body.images);
		} else {
			images = req.body.images;
		}

		let imagesLinks = [];

		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.v2.uploader.upload(images[i], {
				folder: "products",
			});
			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			});
		}

		req.body.images = imagesLinks;
		req.body.user = req.user.id;
		const product = await Product.create(req.body);
		res.status(201).json({
			success: true,
			product,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.createProductReview = async (req, res, next) => {
	const { rating, comment, productId } = req.body;
	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};
	const product = await Product.findById(productId);
	const isReviewed = product.reviews.find(
		(r) => r.user && r.user.toString() === req.user._id.toString()
	);
	if (isReviewed) {
		product.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	let avg = 0;
	product.rating = product.reviews.forEach((rev) => {
		avg += rev.rating;
	});

	product.rating = avg / product.reviews.length;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
};

exports.getProductReviews = async (req, res, next) => {
	const product = await Product.findById(req.query.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}
	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
};

exports.deleteProductReview = async (req, res, next) => {
	const product = await Product.findById(req.query.productId);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	const review = product.reviews.filter(
		(rev) => rev._id.toString() !== req.query.id.toString()
	);

	let avg = 0;
	reviews.forEach((rev) => {
		avg += rev.rating;
	});

	const ratings = avg / product.reviews.length;

	const numOfReviews = product.reviews.length;

	await product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
};
