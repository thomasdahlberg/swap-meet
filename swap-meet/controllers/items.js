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
// const multerConfig = {
//     storage: multer.diskStorage({
//       destination: function(req, file, next){
//         next(null, '../public/photo-storage');
//       },
//       filename: function(req, file, next){
//         console.log(file);
//         const ext = file.mimetype.split('/')[1];
//         next(null, file.filename + Date.now() + '.' + ext);
//       }
//     }),
//     fileFilter: function(req, file, next){
//       if(!file){
//         next();
//       }
//       const image = file.mimetype.startsWith('image/');
//       if(image){
//         console.log('photo uploaded');
//         next(null, true);
//       } else {
//         console.log('file not supported');
//         return next();
//       }
//     }
//   };

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
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
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
    // console.log(req.body);
    // multer(multerConfig).single('image');

    // let AWS = require('aws-sdk');
    // AWS.config.update({region: 'REGION'});

    // let s3 = new AWS.S3({apiVersion: '2006-03-01'});

    // let uploadParams = {Bucket: BUCKET, Key: '', Body: ''};
    // let file = req.body.image;

    // let fs = require('fs');
    // let fileStream = fs.createReadStream(file);
    // fileStream.on('error', function(err){
    //     console.log('File Error', err);
    // });
    // const { v4: uuidv4 } = require('uuid');
    // uploadParams.Body = fileStream;
    // const key = uuidv4() + file.name;
    // console.log(key);
    // uploadParams.Key = key;
    // const url = `${S3_BASE_URL}${BUCKET}/${key}`;

    // s3.upload(uploadParams, function(err, data) {
    //     if(err){
    //         console.log("Error", err);
    //     } if(data) {
    //         console.log("Upload Success", data.Location);
    //     }
    // });
    
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
