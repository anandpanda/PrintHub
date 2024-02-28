const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAllProducts = async(req , res) => {

    const resultPerPage = 5 ;
    const productCount = await Product.countDocuments() ;

    const apiFeature = new ApiFeatures(Product.find() , req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query ;
    res.status(200).json({
        success : true ,
        products , 
        productCount
    })
}

exports.getProductDetails = async(req , res , next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product){
        return res.status(404).json({
            success : false ,
            message : "Product not found"
        })
    }

    res.status(200).json({
        success  : true ,
        product
    })
}

exports.deleteProduct = async(req , res , next) => {

    let product = await Product.findById(req.params.id) ;

    if(!product)
    {
        return res.status(404).json({
            success : false ,
            message : "Product not found"
        })
    }

    await Product.deleteOne({_id : product._id}) ;

    res.status(200).json({
        success : true , 
        id : req.params.id,
        message: 'Deleted'
    });
    
}
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
}

exports.createProduct = async(req , res , next) => {
    try {
        req.body.user = req.user.id ;
        const product = await Product.create(req.body) ;
        res.status(201).json({
            success : true ,
            product
        });
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        });
    }
}

exports.createProductReview = async(req , res , next) => {
    const {rating , comment , productId} = req.body ;
    const review = {
        user : req.user._id ,
        name : req.user.name ,
        rating : Number(rating) ,
        comment
    }
    const product = await Product.findById(productId) ;
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );
    if(isReviewed){
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment ;
                review.rating = rating ;
            }
        });
    }else{
        product.reviews.push(review) ;
        product.numOfReviews = product.reviews.length ;
    }

    let avg = 0 ;
    product.ratings = product.reviews.forEach(rev => {
        avg += rev.rating ;
    }) ;

    product.ratings = avg / product.reviews.length ; 

    await product.save({validateBeforeSave : false}) ;

    res.status(200).json({
        success : true
    })
} ;

exports.getProductReviews = async(req , res , next) => {
    const product = await Product.findById(req.query.id) ;
    if(!product){
        return res.status(404).json({
            success : false ,
            message : "Product not found"
        })
    }
    res.status(200).json({
        success : true ,
        reviews : product.reviews
    })
} ;

exports.deleteProductReview = async(req , res , next) => {
    const product = await Product.findById(req.query.productId) ;
    if(!product){
        return res.status(404).json({
            success : false ,
            message : "Product not found"
        })
    }

    const review = product.reviews.filter(
        rev => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0 ;
    reviews.forEach(rev => {
        avg += rev.rating ;
    });

    const ratings = avg / product.reviews.length ;

    const numOfReviews = product.reviews.length ;

    await product.findByIdAndUpdate(req.query.productId , {
        reviews , ratings , numOfReviews
    } , {
        new : true ,
        runValidators : true ,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true ,
        reviews : product.reviews
    })
} ;

