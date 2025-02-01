const express = require('express')
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

router.get("/",function(req,res){
    let error = req.flash("error")
    res.render("index",{error,loggedIn:false})
})

router.get("/shop",isLoggedIn,async function(req,res){
    let products = await productModel.find()
    let success = req.flash("success")
    res.render("shop",{products,success})
})

router.get("/cart",isLoggedIn,async function(req,res){
    let user = await userModel
    .findOne({email:req.user.email})
    .populate("cart");


   const bill =  user.cart.map(item=>
   {return (Number(item.price+20)-Number(item.discount))}
   )

    res.render("cart",{user,bill})
})


router.get("/addtocart/:productid",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    req.flash("success","Added to Cart")
    res.redirect("/shop")
})

router.get("/account",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email})
    res.render("account",{user,loggedIn:false})
})




module.exports = router;