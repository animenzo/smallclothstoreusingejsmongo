const express = require('express')
const router = express.Router()
const upload = require("../config/multerConfig")
const productModel = require("../models/productModel")
router.post("/create",upload.single('image'),async function(req,res){
    try {
        let {discount,name,price,bgcolor,panelcolor,textcolor} = req.body;
    let product = await  productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })

    req.flash("success","Product create successfully")
    res.redirect("/shop")
    } catch (error) {
        res.send(error.message)
    }
})
module.exports = router;