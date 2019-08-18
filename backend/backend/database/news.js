var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var newsSchema=new Schema({
	title:String,
	des:String,
	cname:String,
	image:String,
	time:{
		type:Date,
		default:Date.now()
	}
})
module.exports=mongoose.model('news',newsSchema);
