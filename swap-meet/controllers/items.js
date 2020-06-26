const Item = require('../models/item');
const multer = require('multer');

module.exports = {
    showOne,
    addItem,
    addPhoto,
    index
};

const S3_BASE_URL = 'https://s3-us-east-1.amazonaws.com/';
const BUCKET = 'swap-meet';

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/photo-storage')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

let upload = multer({ storage: storage }).single('file')

async function addPhoto(req, res) {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});
    const fs = require('fs');
    const { v4: uuidv4 } = require('uuid');

    let uploadParams = {Bucket: BUCKET, Key: '', Body: ''};

    // AWS.config.update({region: 'REGION'});

    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let file = req.file;
        let fileStream = fs.createReadStream(file.path);
        fileStream.on('error', function(err){
            console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        const key = uuidv4() + file.filename;
        console.log(key);
        uploadParams.Key = key;
        const url = `${S3_BASE_URL}${BUCKET}/${key}`;
        console.log(url);
        s3.upload(uploadParams, function(err, data) {
            if(err){
                console.log("Error", err);
            } if(data) {
                console.log("Upload Success", data.Location);
            }
        });
        console.log(req.file);
        return res.status(200).send(req.file)
    })
    
}

async function showOne(req, res) {
    try {
        await Item.findByIdAndUpdate(req.body.itemId, function(err, item){
            res.status(200).json({ item });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}

async function addItem(req, res) {
    console.log(req.body);
    
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        image: null,
        itemType: req.body.itemType,
        swapPref: req.body.swapPref,
        active: true,
        location: null,
        swapped: false,
        currentOwner: req.user,
        ownerHistory: [req.user]
    });
    try {
        await item.save();
        res.json({ item });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function index(req, res) {
    try {
        await Item.find({}, function(err, items){
            res.status(200).json({ items });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}

async function getOne(req, res) {
    try {
        await Item.findById(req.body, function(err, item){
            res.status(200).json({ item });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}
