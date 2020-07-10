var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost', {  useUnifiedTopology: true, useUnifiedTopology: true})
var dbUrl = "mongodb://localhost:27017/";


(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
			
		if (action === "/Register") {
			console.log("Register");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						
				 
						 MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

							var finalcount;
							if (err) throw err;
							var dbo = db.db("mybase");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").countDocuments({"name" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Register.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 

		else if (action === "/Login"){
			console.log("Login");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mybase");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").countDocuments({"name" : splitName[1] , "password" : splitPassword[1] }, function(err, count){
								console.log(err, count);
								finalcount = count;
								console.log("myconut="+count);
								if(finalcount > 0)
								{
									console.log("Login success");
									db.close();
									return res.end(splitName[1]);
								}
								else
								{
										console.log("Login failed");
										db.close();
										//return res.end(msg);
									return res.end("fail");
								}
							});
						});
					});
				});
			}	
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Login.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
			
		else if (action === "/index"){
			console.log("Home");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "index.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
	}
	
		if (action === "/add") {
		
			console.log("add");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitType = splitMsg[1];
						var tempSplitSong = splitMsg[2];
						
						var tempSplitType = tempSplitType.split("=");
						var tempSplitSong = tempSplitSong.split("=");

						console.log("mess="+msg);
						console.log("mess="+formData);

						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						
				 
						MongoClient.connect(dbUrl, function(err, db)  {

						
							if (err) throw err;
							var dbo = db.db("mybase");
							var myobj = stringMsg;
							console.log(user);
				
									dbo.collection("song").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								
							
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "albums.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else if (action === "/readfavourlist"){
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						
						var splitName = usernameData.split("&");
						//var splitSong = usernameData.split("&");
						//var splitType = usernameData.split("&");
						
						var tempSplitName = splitName[1];
						//var tempSplitSong = splitSong[2];
						//var tempSplitType = splitType[3];
							
						var splitName = tempSplitName.split("=");
						//	var splitSong = tempSplitSong.split("=");
						//	var splitType = tempSplitType.split("=");

						
						console.log("mess="+user);
						console.log(tempSplitName);
						
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("mybase");
					//dbo.collection("song").find({"name" : splitName[1],"favorite_list" : splitSong[1],"splitType" : splitType[1]}).toArray(function(err, result) 
					dbo.collection("song").find({"name" : splitName[1]}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
			});
		});
	}
}
		else if (action === "/update")
		{
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
																		
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						var stringMsg = JSON.parse(msg);
						var splitArr = formData.split(",");
						var splitOldPW = splitArr[0];
						var splitNewPW = splitArr[1];
						var splitUserName = splitArr[2];
					
					
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mybase");
							var myobj = stringMsg;
							console.log(user);
							
							dbo.collection("user").count({"name":splitUserName ,"password" : splitOldPW }, function(err, count){
								//console.log(err, count);
								finalcount = count;
								//console.log("myconut="+count);
								if(finalcount > 0)
								{
									MongoClient.connect(dbUrl, function(err, db) {
												var finalcount2;
												if (err) throw err;
												var dbo = db.db("mybase");
												var myobj2 = stringMsg;
												console.log(user);
												var myquery2 = { name: splitUserName,password: splitOldPW};
													  var newvalues2 = { $set: {password: splitNewPW } };
													dbo.collection("user").updateOne(myquery2, newvalues2, function(err, count2){
													console.log(err, count2);
													finalcount2 = count2;
													console.log("myconut="+count);
													if(finalcount2 > 0)
													{
														console.log("Login failed");
															db.close();
															//return res.end(msg);
														return res.end("fail");
														
													}
													else
													{
														console.log("Login success");
														console.log("");
														console.log(splitNewPW[2]);
														console.log("");
														db.close();
														return res.end("");
													}
												  });
											});
								}
								else
								{
										console.log("Invaild password");
										db.close();
										//return res.end(msg);
									return res.end("fail");
								}
							});
						});
					});
				});
			}	
		}
		
		else if (action === "/removefavourlist")
		{
			if (req.method === "POST") {
				console.log("action = post");
				delfavData = '';
				delfav = '';
				return req.on('data', function(data) {
					delfavData += data;
					//console.log("delfav data="+ delfavData);
					return req.on('end', function() {
						var delfav;
						delfav = qs.parse(delfavData);
						delfav = JSON.stringify(delfav);
						console.log("delfav"+delfav);
						stringdelfav = JSON.parse(delfav);
						/*var splitdelfav = delfavData.split("&");
						console.log("splitdelfav="+splitdelfav);
						
						var tempSplitName = splitdelfav[1];
						var tempSplitDelfav = splitdelfav[2];
						
						var splitName = tempSplitName.split("=");
						var splitDelfav = tempSplitDelfav.split("=");
						console.log(splitName[1]);
						console.log(splitDelfav[1]);*/
				MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("mybase");
				 var delquery = { favlist: formData };
			console.log("delquery = " + delquery);

          dbo.collection("song").deleteOne(delquery, function(err, obj){
            if (err) throw err;
			return res.end("OK");
            console.log("1 document deleted");
            
            db.close();
				});               
              });
            });
          });
		}
	}	
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
				sendFileContent(res, "index.html", "text/html");
        if(loginStatus)
			{
				sendFileContent(res, "Login.html", "text/html");
			}			
			}
			else if (req.url === "/Register")
			{
				sendFileContent(res, "Register.html", "text/html");
			}	
			else if (req.url === "/Login")
			{
				sendFileContent(res, "login.html", "text/html");
			}
			else if (req.url === "/albums")
			{
				sendFileContent(res, "albums.html", "text/html");
			}
			else if (req.url === "/contact")
			{
				sendFileContent(res, "contact.html", "text/html");
			}
			else if (req.url === "/logout")
			{
				loginStatus = false;
				loginUser = "";
				sendFileContent(res, "finalindex.html", "text/html");
			}
			else if (req.url === "/profile")
			{
				sendFileContent(res, "profile.html", "text/html");
			}
		
			else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}else if(/^\/[a-zA-Z0-9\/_.-]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.mp4$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/mp4");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ico$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ico");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ttf$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ttf");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.woff$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/woff");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}
			else if(/^\/[a-zA-Z0-9\/_.-]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "audio/mp3");
			}else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		}
	});

	server.listen(8787);
	console.log("Server is running，time is" + new Date());

	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);
 
