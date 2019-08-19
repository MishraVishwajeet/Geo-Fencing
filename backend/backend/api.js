let express=require('express');
let cors=require('cors'); 
let sha1=require('sha1');
let bodyParser=require('body-parser');
let app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static('attach'));
//firebase
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://goe-fence.firebaseio.com"
});
var db = admin.database();
var dlist = db.ref("/deviceList");
var d = db.ref("/");
var admin = db.ref("/adminId");
// ref.child("1ff8aaba150039ce").set("0");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });
const jwt = require('jsonwebtoken');
//file upload
//admin login api
app.post('/api/adminLogin',function(req,res)
{
    let email=req.body.email;
    let pass=req.body.password;
    admin.once("value",function(snap){
      var x=snap.val();
      if(email===x.email && pass===x.pass){
        const JWTToken = jwt.sign({
                ulogin:email
              },
              'secret',
               {
                 expiresIn: '2h'
               });
            res.json({status:200,err:0,msg:'Login',token:JWTToken})
      }
      else res.json({status:200,err:1,msg:'Email or pass is not correct'})
    });
})
app.post('/api/addcat',function(req,res)
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
app.post('/api/addnews',function(req,res)
{
  let cname=req.body.cname;
  // let titl=req.body.titl;
  // let des=req.body.des;
  // let iname=req.file.filename;

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
  d.once("value",function(snap){
    var x=snap.val();
    res.json({status:200,cData:snap.val()})
  });
  // NewsModel.find({},function(err,data)
  // {
  //   if(err){}
  //   else{
  //     res.json({status:200,nData:data})
  //   }  
  // })
})
app.get('/api/fetchcat',function(req,res)
{
  d.once("value",function(snap){
    var x=snap.val();
    res.json({status:200,cData:snap.val()})
  });
  // CatModel.find({},function(err,data)
  // {
  //   if(err){}
  //   else{
  //     res.json({status:200,cData:data})
  //   }  
  // })
})
app.get('/api/delCat/:catId',function(req,res)
{
  catid=req.params.catId;
  console.log(catid)
      dlist.child(catid).set("0");
      res.json({status:200,msg:'category Deleted'})
  // CatModel.remove({_id:catid},function(err,data)
  // {
  //   if(err){}
  //   else{
  //     res.json({status:200,msg:'category Deleted'})
  //   }
  // })
})
app.get('/api/delNews/:natId',function(req,res)
{
  natid=req.params.natId;
  // NewsModel.remove({_id:natid},function(err,data)
  // {
  //   if(err){}
  //   else{
  //     res.json({status:200,msg:'News Deleted'})
  //   }
  // })
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