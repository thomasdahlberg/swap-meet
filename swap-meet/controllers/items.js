const Item = require('../models/item');
const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const S3_BASE_URL = 's3-us-east-1.amazonaws.com/';
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

module.exports = {
    showOne,
    addItem,
    index
};

// async function addPhoto(req, res) {
//     let uploadParams = {Bucket: BUCKET, Key: '', Body: ''};

//     upload(req, res, function(err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             return res.status(500).json(err)
//         }
//         let file = req.file;
//         let fileStream = fs.createReadStream(file.path);
        
//         fileStream.on('error', function(err){
//             console.log('File Error', err);
//         });

//         uploadParams.Body = fileStream;
//         const key = uuidv4() + file.filename;
//         uploadParams.Key = key;
//         const url = `${S3_BASE_URL}${BUCKET}/${key}`;

//         s3.upload(uploadParams, function(err, data) {
//             if(err){
//                 console.log("Error", err);
//             } if(data) {
//                 console.log("Upload Success", data.Location);
//                 fs.unlinkSync(file.path);
//             }
//         });
//         return res.status(200).send(req.file)
//     })
    
// }

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
    // console.log(req);
    let uploadParams = {Bucket: BUCKET, Key: '', Body: ''};
    let url;
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
        uploadParams.Key = key;
        url = `https://${BUCKET}.s3.amazonaws.com/${key}`;

        s3.upload(uploadParams, function(err, data) {
            if(err){
                console.log("Error", err);
            } if(data) {
                console.log("Upload Success", data.Location);
                fs.unlinkSync(file.path);
                console.log('still running');
                const item = new Item({
                    name: req.body.name,
                    description: req.body.description,
                    image: url,
                    itemType: req.body.itemType,
                    swapPref: req.body.swapPref,
                    active: true,
                    location: null,
                    swapped: false,
                    currentOwner: req.user,
                    ownerHistory: [req.user]
                });
                console.log("Serverside Item:", item);
                try {
                    item.save();
                } catch (error) {
                    res.status(400).json(error);
                }            
            }
        });
        return res.status(200).send(req.file)
    })
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
