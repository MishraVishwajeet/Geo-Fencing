let express=require('express');
let cors=require('cors');
let sha1=require('sha1');
let bodyParser=require('body-parser');
let app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static('attach'));
//mongodb connection
// let mongoose=require('mongoose');
// mongoose.connect("mongodb://localhost/mrng_fresh");
let AdminModel=require('./database/adminLogin');
let CatModel=require('./database/category');
let NewsModel=require('./database/news');
const jwt = require('jsonwebtoken');
//file upload
let multer=require('multer');
let DIR = './attach/';
let storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
            cb(null,DIR);
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });
let upload = multer({ storage: storage});
//admin login api
app.post('/api/adminLogin',function(req,res)
{
    let email=req.body.email;
    let pass=sha1(req.body.password);
    // let ins=new AdminModel({email:email,pass:pass});
    // ins.save(function(err,data)
    //   {
    //        if(err){}
    //        else
    //        {
    //            console.log(data)
    //        }
    //   })
    // AdminModel.find({email:email,pass:pass},function(err,data)
    //   {
    //       if(err){
    //         res.json({status:404,err:1,msg:err})
    //       }
    //       else if(data.length==0)
    //       {
    //           res.json({status:200,err:1,msg:'Email or pass is not correct'})
    //       }
    //       else
    //       {
    //         const JWTToken = jwt.sign({
    //             ulogin:email
    //           },
    //           'secret',
    //            {
    //              expiresIn: '2h'
    //            });
    //         res.json({status:200,err:0,msg:'Login',token:JWTToken})
    //       }
    //   })
    const JWTToken = jwt.sign({
                ulogin:email
              },
              'secret',
               {
                 expiresIn: '2h'
               });
            res.json({status:200,err:0,msg:'Login',token:JWTToken})
      
  
})
app.post('/api/addcat',upload.single('image'),function(req,res)
{
  let cname=req.body.cname;
  let iname=req.file.filename;
  let ins=new CatModel({cname:cname,image:iname});
  ins.save(function(err)
  {
    if(err){
          }
      else
      {
        console.log("Data Saved");
      }
  })
})
app.post('/api/addnews',upload.single('image'),function(req,res)
{
  let cname=req.body.cname;
  let titl=req.body.titl;
  let des=req.body.des;
  let iname=req.file.filename;
  let ins=new NewsModel({title:titl,cname:cname,image:iname,des:des});
  ins.save(function(err)
  {
    if(err){
          }
      else
      {
        console.log("Data Saved");
      }
  })
})

app.get('/api/fetchnews',function(req,res)
{
  NewsModel.find({},function(err,data)
  {
    if(err){}
    else{
      res.json({status:200,nData:data})
    }  
  })
})
app.get('/api/fetchcat',function(req,res)
{
  CatModel.find({},function(err,data)
  {
    if(err){}
    else{
      res.json({status:200,cData:data})
    }  
  })
})
app.get('/api/delCat/:catId',function(req,res)
{
  catid=req.params.catId;
  CatModel.remove({_id:catid},function(err,data)
  {
    if(err){}
    else{
      res.json({status:200,msg:'category Deleted'})
    }
  })
})
app.get('/api/delNews/:natId',function(req,res)
{
  natid=req.params.natId;
  NewsModel.remove({_id:natid},function(err,data)
  {
    if(err){}
    else{
      res.json({status:200,msg:'News Deleted'})
    }
  })
})
app.post('/api/changePass',function(req,res)
{   
    let pass=sha1(req.body.data.oldpass);
    let newpass=sha1(req.body.data.passwordFormGroup.newpass);
    let email=req.body.cLogin;
    AdminModel.find({email:email,pass:pass},function(err,data)
      {
          if(err){
            res.json({status:404,err:1,msg:err})
          }
          else if(data.length==0)
          {
              res.json({status:200,err:1,msg:'Email or pass is not correct'})
          }
          else
          {
            AdminModel.update({email:email}, { $set: { pass: newpass }},{upsert:true}, function(err, doc)
            {
              if(err)
              {
                return res.json({status:500,err:1,msg:err})
              } 
                console.log("data updated");
                return res.json({status:200,err:0,msg:"succesfully saved"});
            })
          }
     })
  })

app.listen("8888",function()
{
    console.log("Work on 8888");
})