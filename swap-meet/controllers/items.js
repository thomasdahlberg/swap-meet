const Item = require('../models/item');
const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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
	updateOne,
	showOne,
	addItem,
	deleteItem,
	index,
};

async function updateOne(req, res) {
	let uploadParams = {Bucket: BUCKET, Key: '', Body: ''};
	let url;
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		if (req.file){
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
					fs.unlinkSync(file.path);
					console.log('trigger 1');
					try {
						Item.findByIdAndUpdate(req.body.id, {
							name: req.body.name,
							description: req.body.description,
							image: url,
							itemType: req.body.itemType,
							swapPref: req.body.swapPref 
						}, function(error, item){
							console.log(error);
						});
					} catch (error) {
						res.status(400).json(error);
					}
				}
			})
		} else {
			console.log('trigger 2');
			try {
				Item.findByIdAndUpdate(req.body.id, {
					name: req.body.name,
					description: req.body.description,
					itemType: req.body.itemType,
					swapPref: req.body.swapPref 
				}, function(error, item){
						console.log(error);
				});
			} catch (error) {
					res.status(400).json(error);
			}
		}
		
		return res.status(200).send(req.file)
	})
}

async function showOne(req, res) {
	try {
		await Item.findById(req.params.id, function(err, item){
			res.status(200).json({ item });
		});
	} catch (error) {
		res.status(400).json(error); 
	}
}

	
async function addItem(req, res) {
	const item = new Item({
		name: req.body.name,
		description: req.body.description,
		image: "",
		itemType: req.body.itemType,
		swapPref: req.body.swapPref,
		active: true,
		location: null,
		swapped: false,
		currentOwner: req.user,
		ownerHistory: [req.user]
	});
	console.log(item);
	try {
		item.save();
		res.status(200).send(req.file ? req.file : {});
	} catch (error) {
		res.status(400).json(error);
	}            
}

async function deleteItem(req, res) {
	try {
		await Item.deleteOne({"_id": req.params.id}, function(err, obj) {
			if(err) throw err;
		})
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

async function addItemPhoto(req, res) {
	let uploadParams = {Bucket: BUCKET, Key: '', Body: ''};
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
		let url = `https://${BUCKET}.s3.amazonaws.com/${key}`;

		s3.upload(uploadParams, function(err, data) {
			if(err){
				console.log("Error", err);
			} if(data) {
				fs.unlinkSync(file.path);
				return url;
			}
		});
	})
}