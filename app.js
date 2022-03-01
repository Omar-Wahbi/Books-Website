
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var obj = [];
var obj3 = [];
var results= [];
var want_read = [];
var check = fs.readFileSync('users.json');
if(check.length!=0)
{
  var xy = JSON.parse(check);
  obj = xy;
}
var global_Username = "";
var check2 = fs.readFileSync('data.json');
if(check2.length!=0)
{
  var xz = JSON.parse(check2);
  obj3 = xz;
}
var arr = ["Lord of the Flies","The Grapes of Wrath","Leaves of Grass","The Sun and Her Flowers","Dune","To Kill a Mockingbird"];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('login');
});

app.post('/',function(req,res){
  var x = req.body.username;
  var y = req.body.password;
  var z = {x,y};
  if(x==""||y=="")
  { 
    res.render('login');
  }
  else
  {
    if(obj.length==0)
    {
      res.send('<script>alert("invalid username or password"); window.history.back();</script>');
    }
    else
    {
      fs.readFile('users.json', 'utf8', function readFileCallback(err, data)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj2 = JSON.parse(data);
        var found_user = 0;
        for(var a=0;a<obj2.length && found_user==0;a++)
        {
          if(z.x==obj2[a].x && z.y==obj2[a].y)
          {
            found_user = 1;
            global_Username = x;
            res.redirect('/home');
          }
        }
        if(found_user==0)
        {
          res.send('<script>alert("invalid username or password"); window.history.back();</script>');
        }
      }
      });
    }
  }
});

app.get('/home',function(req,res){
  res.render('home');
});

app.get('/registration',function(req,res){
  res.render('registration');
});

app.post('/register',function(req,res){
  var x = req.body.username;
  var y = req.body.password;
  var z = {x,y};
  if(x==""||y=="")
  {
    res.redirect('/registration');
  }
  else
  {
    if(obj.length==0)
    {
      obj.push(z);
      var first_data = JSON.stringify(obj); 
      fs.writeFile ("users.json", first_data, function(err) 
      {
        if (err) 
        console.log('complete');
      });
      res.redirect('/');
    }
    else
    {
      fs.readFile('users.json', 'utf8', function readFileCallback(err, data)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj2 = JSON.parse(data); 
        var found_username =0;
        for(var a=0;a<obj2.length && found_username ==0;a++)
        {
           if(z.x==obj2[a].x)
          {
            found_username =1;
            res.send('<script>alert("Username is already taken"); window.history.back();</script>');
          }
        }
        if(found_username==0)
        {
          obj.push(z);
          var user_info = JSON.stringify(obj); 
          fs.writeFile ("users.json", user_info, function(err) 
          {
          if (err) 
            console.log('complete');
          });
          res.redirect('/');
        }
      }});
    }
  }
});

app.get('/novel',function(req,res){
  res.render('novel');
});

app.get('/poetry',function(req,res){
  res.render('poetry');
});

app.get('/fiction',function(req,res){
  res.render('fiction');
});

app.get('/flies',function(req,res){
  res.render('flies');
});


app.post('/flies',function(req,res){
  var f = "flies";
  var link_All = {global_Username,f}
  if(obj3.length == 0)
  {
      obj3.push(link_All);
      var first_store = JSON.stringify(obj3); 
      fs.writeFile ("data.json", first_store, function(err) 
      {
        if (err) 
        console.log('complete');
      });
      res.send('<script>alert("Added Successfully"); window.history.back();</script>');
  }
  else
  {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, stored)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj4 = JSON.parse(stored);
        var found_stored = false;
        var located_at = 0;
        for(var i=0;i<obj4.length;i++)
        {
          if(global_Username==obj4[i].global_Username &&  obj4[i].f == "flies" && found_stored == false)
          {
            found_stored = true;
            res.send('<script>alert("The book is already added"); window.history.back();</script>');
          }
        }
        if(found_stored==false)
        {
          var found_user_stored = false;
          for(var i =0;i<obj4.length;i++)
          {
            if(global_Username==obj4[i].global_Username)
            {
              located_at = i;
              found_user_stored = true;
            }
          }
          if(found_user_stored == false)
          {
            obj4.push(link_All);
            var storing = JSON.stringify(obj4); 
            fs.writeFile ("data.json", storing, function(err) 
            {
              if (err) 
               console.log('complete');
            });
              res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
          else
          {
          var obj5 = {f:"flies"}; 
          var obj6 = Object.assign({}, obj4[located_at], obj5);
          obj4[located_at]=obj6;
          var store = JSON.stringify(obj4); 
          fs.writeFile ("data.json", store, function(err) 
          {
            if (err) 
            console.log('complete');
          });
          res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
        }
      }
      });
  }
});


app.get('/grapes',function(req,res){
  res.render('grapes');
});


app.post('/grapes',function(req,res){
  var g = "grapes";
  var link_All = {global_Username,g}
  if(obj3.length == 0)
  {
      obj3.push(link_All);
      var first_store = JSON.stringify(obj3); 
      fs.writeFile ("data.json", first_store, function(err) 
      {
        if (err) 
        console.log('complete');
      });
      res.send('<script>alert("Added Successfully"); window.history.back();</script>');
  }
  else
  {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, stored)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj4 = JSON.parse(stored);
        var found_stored = false;
        var located_at = 0;
        for(var i=0;i<obj4.length;i++)
        {
          if(global_Username==obj4[i].global_Username && obj4[i].g == "grapes" && found_stored == false)
          {
            found_stored = true;
            res.send('<script>alert("The book is already added"); window.history.back();</script>');
          }
        }
        if(found_stored==false)
        {
          var found_user_stored = false;
          for(var i =0;i<obj4.length;i++)
          {
            if(global_Username==obj4[i].global_Username)
            {
              located_at = i;
              found_user_stored = true;
            }
          }
          if(found_user_stored == false)
          {
            obj4.push(link_All);
            var storing = JSON.stringify(obj4); 
            fs.writeFile ("data.json", storing, function(err) 
            {
              if (err) 
               console.log('complete');
            });
              res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
          else
          {
          var obj5 = {g:"grapes"}; 
          var obj6 = Object.assign({}, obj4[located_at], obj5);
          obj4[located_at]=obj6;
          var store = JSON.stringify(obj4); 
          fs.writeFile ("data.json", store, function(err) 
          {
            if (err) 
            console.log('complete');
          });
          res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
        }
      }
      });
  }
});


app.get('/sun',function(req,res){
  res.render('sun');
});


app.post('/sun',function(req,res){
  var s = "sun";
  var link_All = {global_Username,s}
  if(obj3.length == 0)
  {
      obj3.push(link_All);
      var first_store = JSON.stringify(obj3); 
      fs.writeFile ("data.json", first_store, function(err) 
      {
        if (err) 
        console.log('complete');
      });
      res.send('<script>alert("Added Successfully"); window.history.back();</script>');
  }
  else
  {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, stored)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj4 = JSON.parse(stored);
        var found_stored = false;
        var located_at = 0;
        for(var i=0;i<obj4.length;i++)
        {
          if(global_Username==obj4[i].global_Username && obj4[i].s == "sun" && found_stored == false)
          {
            found_stored = true;
            res.send('<script>alert("The book is already added"); window.history.back();</script>');
          }
        }
        if(found_stored==false)
        {
          var found_user_stored = false;
          for(var i =0;i<obj4.length;i++)
          {
            if(global_Username==obj4[i].global_Username)
            {
              located_at = i;
              found_user_stored = true;
            }
          }
          if(found_user_stored == false)
          {
            obj4.push(link_All);
            var storing = JSON.stringify(obj4); 
            fs.writeFile ("data.json", storing, function(err) 
            {
              if (err) 
               console.log('complete');
            });
              res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
          else
          {
          var obj5 = {s:"sun"}; 
          var obj6 = Object.assign({}, obj4[located_at], obj5);
          obj4[located_at]=obj6;
          var store = JSON.stringify(obj4); 
          fs.writeFile ("data.json", store, function(err) 
          {
            if (err) 
            console.log('complete');
          });
          res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
        }
      }
      });
  }
});


app.get('/leaves',function(req,res){
  res.render('leaves');
});


app.post('/leaves',function(req,res){
  var l = "leaves";
  var link_All = {global_Username,l}
  if(obj3.length == 0)
  {
      obj3.push(link_All);
      var first_store = JSON.stringify(obj3); 
      fs.writeFile ("data.json", first_store, function(err) 
      {
        if (err) 
        console.log('complete');
      });
      res.send('<script>alert("Added Successfully"); window.history.back();</script>');
  }
  else
  {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, stored)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj4 = JSON.parse(stored);
        var found_stored = false;
        var located_at = 0;
        for(var i=0;i<obj4.length;i++)
        {
          if(global_Username==obj4[i].global_Username && obj4[i].l == "leaves" && found_stored == false)
          {
            found_stored = true;
            res.send('<script>alert("The book is already added"); window.history.back();</script>');
          }
        }
        if(found_stored==false)
        {
          var found_user_stored = false;
          for(var i =0;i<obj4.length;i++)
          {
            if(global_Username==obj4[i].global_Username)
            {
              located_at = i;
              found_user_stored = true;
            }
          }
          if(found_user_stored == false)
          {
            obj4.push(link_All);
            var storing = JSON.stringify(obj4); 
            fs.writeFile ("data.json", storing, function(err) 
            {
              if (err) 
               console.log('complete');
            });
              res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
          else
          {
          var obj5 = {l:"leaves"}; 
          var obj6 = Object.assign({}, obj4[located_at], obj5);
          obj4[located_at]=obj6;
          var store = JSON.stringify(obj4); 
          fs.writeFile ("data.json", store, function(err) 
          {
            if (err) 
            console.log('complete');
          });
          res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
        }
      }
      });
  }
});


app.get('/dune',function(req,res){
  res.render('dune');
});


app.post('/dune',function(req,res){
  var d = "dune";
  var link_All = {global_Username,d}
  if(obj3.length == 0)
  {
      obj3.push(link_All);
      var first_store = JSON.stringify(obj3); 
      fs.writeFile ("data.json", first_store, function(err) 
      {
        if (err) 
        console.log('complete');
      });
      res.send('<script>alert("Added Successfully"); window.history.back();</script>');
  }
  else
  {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, stored)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj4 = JSON.parse(stored);
        var found_stored = false;
        var located_at = 0;
        for(var i=0;i<obj4.length;i++)
        {
          if(global_Username==obj4[i].global_Username && obj4[i].d == "dune" && found_stored == false)
          {
            found_stored = true;
            res.send('<script>alert("The book is already added"); window.history.back();</script>');
          }
        }
        if(found_stored==false)
        {
          var found_user_stored = false;
          for(var i =0;i<obj4.length;i++)
          {
            if(global_Username==obj4[i].global_Username)
            {
              located_at = i;
              found_user_stored = true;
            }
          }
          if(found_user_stored == false)
          {
            obj4.push(link_All);
            var storing = JSON.stringify(obj4); 
            fs.writeFile ("data.json", storing, function(err) 
            {
              if (err) 
               console.log('complete');
            });
              res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
          else
          {
          var obj5 = {d:"dune"}; 
          var obj6 = Object.assign({}, obj4[located_at], obj5);
          obj4[located_at]=obj6;
          var store = JSON.stringify(obj4); 
          fs.writeFile ("data.json", store, function(err) 
          {
            if (err) 
            console.log('complete');
          });
          res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
        }
      }
      });
  }
});


app.get('/mockingbird',function(req,res){
  res.render('mockingbird');
});


app.post('/mockingbird',function(req,res){
  var m = "mockingbird";
  var link_All = {global_Username,m}
  if(obj3.length == 0)
  {
      obj3.push(link_All);
      var first_store = JSON.stringify(obj3); 
      fs.writeFile ("data.json", first_store, function(err) 
      {
        if (err) 
        console.log('complete');
      });
      res.send('<script>alert("Added Successfully"); window.history.back();</script>');
  }
  else
  {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, stored)
      {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj4 = JSON.parse(stored);
        var found_stored = false;
        var located_at = 0;
        for(var i=0;i<obj4.length;i++)
        {
          if(global_Username==obj4[i].global_Username && obj4[i].m == "mockingbird" && found_stored == false)
          {
            found_stored = true;
            res.send('<script>alert("The book is already added"); window.history.back();</script>');
          }
        }
        if(found_stored==false)
        {
          var found_user_stored = false;
          for(var i =0;i<obj4.length;i++)
          {
            if(global_Username==obj4[i].global_Username)
            {
              located_at = i;
              found_user_stored = true;
            }
          }
          if(found_user_stored == false)
          {
            obj4.push(link_All);
            var storing = JSON.stringify(obj4); 
            fs.writeFile ("data.json", storing, function(err) 
            {
              if (err) 
               console.log('complete');
            });
              res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
          else
          {
          var obj5 = {m:"mockingbird"}; 
          var obj6 = Object.assign({}, obj4[located_at], obj5);
          obj4[located_at]=obj6;
          var store = JSON.stringify(obj4); 
          fs.writeFile ("data.json", store, function(err) 
          {
            if (err) 
            console.log('complete');
          });
          res.send('<script>alert("Added Successfully"); window.history.back();</script>');
          }
        }
      }
      });
  }
});


app.get('/readlist',function(req,res)
{
  if(obj3.length == 0)
  {
    res.render('readlist');
  }
  else
  {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, stored)
    {
      if (err)
      {
          console.log(err);
      } 
      else
      {
        obj4 = JSON.parse(stored);
        var located_at2 = 0;
        var found_user_stored2 = false;
        for(var i =0;i<obj4.length;i++)
        {
          if(global_Username==obj4[i].global_Username)
          {
            located_at2 = i;
            found_user_stored2 = true;
          }
        }
        if(found_user_stored2 == true)
        {
          if(obj4[located_at2].f !=null)
          {
            want_read.push("Lord of the Flies");
          }
          if(obj4[located_at2].g !=null)
          {
            want_read.push("The Grapes of Wrath");
          }
          if(obj4[located_at2].s !=null)
          {
            want_read.push("The Sun and Her Flowers");
          }
          if(obj4[located_at2].l !=null)
          {
            want_read.push("Leaves of Grass");
          }
          if(obj4[located_at2].d !=null)
          {
            want_read.push("Dune");
          }
          if(obj4[located_at2].m !=null)
          {
            want_read.push("To Kill a Mockingbird");
          }
          res.render('readlist',{want_read:want_read});
          want_read = [];
        }
        else
        {
          res.render('readlist',{want_read:want_read});
        }

      }
    });
  }
});

app.post('/search',function(req,res)
{
  if(req.body.Search == "")
  {
    res.send('<script>alert("please enter a name of a book"); window.history.back();</script>');
  }
  
  for(var i=0;i<arr.length;i++){
    if((arr[i].toLowerCase()).includes(req.body.Search.toLowerCase()))
      results.push(arr[i]);
  }

  if(results.length == 0)
  {
    res.send('<script>alert("Book Not Found"); window.history.back();</script>');
  }
  else
  {
    res.redirect('/searchresults');
  }
});

app.get('/searchresults',function(req,res){
  res.render('searchresults',{results:results});
  results = [];
});

app.listen(3000);



