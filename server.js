const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var mysql = require("mysql");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','hbs');

app.get('/',function(req,res){
res.sendFile('index.html',{root:__dirname})
});
	
var connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'food',
 multipleStatements:true
});
	
connection.connect(function(err) {
	if(!err)
		console.log('DB connection succeded.');
	else
		console.log('DB connection failed');
})

app.post('/Next',function(req,res){
console.log(req.body);

var sql = "select food ,price from food where food= '"+ req.body.burger +"' or food = '"+ req.body.fish +"' or food='"+ req.body.combo +"'; select sum(price)as 'total' from food where food= '"+ req.body.burger +"' or food = '"+ req.body.fish +"' or food='"+ req.body.combo +"'";
connection.query(sql,function(err,result,field){
	if(!err)
		{ //console.log(field[0][0].name);
		//	console.log(field[0][1].name);
			console.log(result[0]);
			console.log(result[1]);

	/*	var a =JSON.stringify(result[0]);			
		var total =JSON.stringify(result[1]);

		res.send(a +'<br>'+ total );*/
		num=result[0].length;
		if(num>2){
		var a =[JSON.stringify(result[0][0].food),JSON.stringify(result[0][1].food),JSON.stringify(result[0][2].food)];
		var b =[JSON.stringify(result[0][0].price),JSON.stringify(result[0][1].price),JSON.stringify(result[0][2].price)];
		}else if(num >1){
		var a =[JSON.stringify(result[0][0].food),JSON.stringify(result[0][1].food)];
		var b =[JSON.stringify(result[0][0].price),JSON.stringify(result[0][1].price)];
		}else{
		var a =[JSON.stringify(result[0][0].food)];
		var b =[JSON.stringify(result[0][0].price)];			
		}
		var c =JSON.stringify(result[1][0].total);
		res.render('test',{food: a,price:b,total:c});
		}
	else
		console.log(err);

   
})
connection.end();	
})
app.listen(3000,()=>console.log("Listening on port 3000"));
