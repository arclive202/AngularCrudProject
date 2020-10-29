var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');



var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './Photos');
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});

_router.post('/delete', function(req,res,next){

    // console.log('LETS LOOK AT RES FIRST')
    // console.log(res)


    // console.log('LETS LOOK AT REQ FIRST')
    // console.log(req.)


    console.log('WE ARE GATHERED HERE TODAY TO DELETE THE FILE')
    filepath = path.join(__dirname,'../Photos')+'\\'+req.body.filename;
    console.log(filepath)
    fs.unlink(filepath, (err) => {
        if (err) throw err;
        console.log('File was deleted');
      });
    



})




// _router.post('/download', function(req,res,next){
//     filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
//     res.sendFile(filepath);
// });

module.exports = _router;

