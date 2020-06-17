const bodyParser=require('body-parser');
const express=require('express');
let app=express();
const mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/students', { useNewUrlParser: true, useUnifiedTopology: true});
const studentSchema=new mongoose.Schema({
	name:String,
	dob:Date,
	city:String
});
const student=mongoose.model('student',studentSchema);


app.get('/',function(req,res){
	res.sendFile(__dirname+"/student_entry.html")
});


app.post('/',function(req,res){
	let name=req.body.name;
	let dob=req.body.dob;
	let city=req.body.city;
	let pupil=new student({
		name:name,
		dob:dob,
		city:city
	});
	pupil.save();
	res.redirect('/add_success')
});


app.get('/add_success',(req,res)=>{
	res.send(`Name added successfully`);
})

app.listen(5000, ()=>{
	console.log(`server online on port no. 5000`);
})