const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.json());



app.get('/employees',(req, res)=> {

    connection.query('SELECT * FROM employee', (err,rows)=> {
        if(err){
            console.log(err)
        } else{
            console.log(rows)
            res.send(rows)
        }

    })

})

app.get('/employees/:id',(req, res)=> {

    connection.query('SELECT * FROM employee where id=?',[req.params.id], (err,rows)=> {
        if(err){
            console.log(err)
        } else{
            console.log(rows)
            res.send(rows)
        }

    })

})


app.delete('/employees/:id',(req, res)=> {

    connection.query('DELETE  FROM employee WHERE id=?',[req.params.id], (err,rows)=> {
        if(err){
            console.log(err)
        } else{
            console.log(rows)
            res.send(rows)
        }

    })

})

app.post('/employees',(req, res)=> {

   var emp = req.body
   var empdata = [emp.name, emp.salary];
   console.log(req.body);

   connection.query('INSERT INTO employee (name,salary) VALUES (?)', [empdata], (err, rows) => {
    
        if(err){
            console.log(err)
        } else{
            console.log(rows)
            res.send(rows)
        }

    })

})


app.patch('/employees',(req, res)=> {

    var emp = req.body
    var empdata = [emp.name, emp.salary];
    console.log(req.body);
 
    connection.query('UPDATE  employee  SET? WHERE id='+emp.id,[emp],(err,rows) => {
     
         if(err){
             console.log(err)
         } else{
             console.log(rows)
             res.send(rows)
         }
 
     })
 
 })


 app.put('/employees',(req, res)=> {

    var emp = req.body
    var empdata = [emp.name, emp.salary];
    console.log(req.body);
 
    connection.query('UPDATE  employee  SET? WHERE id='+emp.id,[emp],(err,rows) => {
     
         if(err){
             console.log(err)
         } else{

            if(rows.affectedRows== 0){

                var empdata = [emp.name, emp.salary];
                console.log(req.body);
             
                connection.query('INSERT INTO employee (name,salary) VALUES (?)', [empdata], (err, rows) => {
                 
                     if(err){
                         console.log(err)
                     } else{
                         console.log(rows)
                         res.send(rows)
                     }
             
                 })

            } else{

                console.log(rows)
                res.send(rows)
            }
            
         }
 
     })
 
 })
app.listen(3000,()=> console.log('Express server is running on port 3000'))