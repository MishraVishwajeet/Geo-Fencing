var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var catSchema=new Schema({
	cname:{
		type:String,
		unique:true
	},
	image:String,
	time:{
		type:Date,
		default:Date.now()
	}
})
module.exports=mongoose.model('category',catSchema);
