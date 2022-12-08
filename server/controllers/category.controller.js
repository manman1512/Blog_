const queryString = require('query-string');
const category = require('../models/category.model')
const post = require("../models/post.model");

module.exports = {
    // CREATE CATEGORY
    createCate: async (req, res) => {
        // console.log(req);
        const {_id} = req.user;
        const {name} = req.body;
        const newCate = new category({
            owner: _id,
            name: name
        })
        try {
            const saveCate = await newCate.save();
            res.status(200).json(saveCate)
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Loi server!"});
        }
    },
    // GET CATEGORY BY USER
    getCateByUser: async (req,res)=>{
        const {_id} = req.params;
        const cates = await category.find({
            owner: _id
        })
        console.log(cates);
        res.status(200).json(cates)

    },
    // GET CATEGORY
    getCate: async (req, res) => {
        try {
            const queryObject = queryString.parseUrl(req.url);
            if(queryObject.query.q){
            const cates = await category.find({
                name: {$regex: (queryObject.query.q), $options: "i"}
            });
            res.status(200).json(cates)}
            else{
                const cates = await category.find();
                res.status(200).json(cates)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Loi server!"});
        }
    },
    // getPostByTags: async (req,res)=>{
    //     try{
    //         const {tagId} = req.params;
    //         console.log(tagId);
    //         const postByTag = await post.find({
    //             categories: {
    //                 $in: [tagId]
    //             }
    //         }).count();
    //         res.status(200).json({
    //             success: true,
    //             message: "Get post by tag success!",
    //             data: {
    //                 tagId: tagId,
    //                 count: postByTag
    //             }
    //         })
    //     }catch(error){
    //         res.status(500).json({success: false, message: "Loi serverrrrrrrrr!"});
    //     }
    // },

    getPostByTag:async (req,res)=>{
        try{
            const {name} = req.params;
            const postByTag = await category.find({
                name: name
            })
            const promises = []
            postByTag.forEach((tag)=>{
                promises.push(new Promise(async(resolve, reject)=>{
                    try{
                        const response = await post.find({
                            categories: tag._id
                        }).populate("categories").populate("author")
                        resolve(response);
                    }catch(error){
                        reject(error)
                    }
                }))
            })
            const posts = await Promise.all(promises);
            res.status(200).json({
                // success: true,
                // message: "Get post by tagName success!",
                posts: posts[0]
            })
        }catch(error){
            // res.status(500).json({success: false, message: "Loi serverrrrrrrrr!"});
            console.log(error)
        }
    },
}