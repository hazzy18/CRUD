const mysql=require('mysql');
const bodyparser=require('body-parser');
const express=require('express');
const encoder=bodyparser.urlencoded();
var app=express();
var con=mysql.createConnection({
    host:"localhost",
    password:"",
    user:"root",
    database:"node_api"
})
con.connect((err)=>{
    if(err) throw err;
    console.log("connected");
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/table.html");
});
app.get("/info",(req,res)=>{
    res.sendFile(__dirname+"/info.html");
});

app.post("/update",encoder,(req,res)=>{
   var tile=req.body.title;
var bod=req.body.body;
var id=req.body.id;
 
    var qry="INSERT INTO item(title, body) VALUES(?,?)"; 
    var upqry="UPDATE item SET title=?, body =? WHERE id=?";
    const values=[tile,bod,id];
  con.query(upqry,values,(err,result)=>{
    if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send('An error occurred while updating.');
    }

    console.log('User updated successfully:', result);
    res.redirect("/");
  })
})
app.post("/insert",encoder,(req,res)=>{
    var tile=req.body.title;
var bod=req.body.body;
var id=req.body.id;
 
    var qry="INSERT INTO item(title, body) VALUES(?,?)"; 
    // var upqry="UPDATE item SET title=?, body =? WHERE id=?";
    const values=[tile,bod];
  con.query(qry,values,(err,result)=>{
    if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send('An error occurred while inserting.');
    }

    console.log('Data inserted successfully:', result);
    res.redirect("/");
  })

})
app.post("/delete",encoder,(req,res)=>{
    var tile=req.body.title;
// var bod=req.body.body;
// var id=req.body.id;
 
    var qry="DELETE FROM item WHERE title=?"; 
    // var upqry="UPDATE item SET WHERE title=?";
    const values=[tile];
  con.query(qry,values,(err,result)=>{
    if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).send('An error occurred while deleting.');
    }

    console.log('Data deleted successfully:', result);
    res.redirect("/");
  })

})
app.get('/fetch-data', (req, res) => {
    // Fetch data from the database
    const query = "SELECT * FROM item"; // Change this query based on your table structure
    con.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        // Send the fetched data as JSON response
        res.json(result);
    });
});

app.listen(5050);