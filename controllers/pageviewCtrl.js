const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  port     : '3306',
  database : 'rideshare'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

Getpersonal = function (req, res, next) { 
  try {
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${req.query.user_ID}';`, function(err, rows, fields) { //这里写SQL query
      if (err) { throw err; } 
      res.status(200).send(rows);
    });
  } catch(err) {
    res.status(500).send('SERVER ERROR:' + err);
    connection.end();
  }
}
InputPersonal = function(req, res, next){
  try{
    var input = req.query;
    var string = input.user_ID;
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${string}';`, function(err, rows, fields) {
      if (err) {throw err;}
      var $ = rows[0];
      connection.query("UPDATE rideshare.user_info SET name = ?, phoneNum = ?, carType = ?, carLicense = ?, carColor = ?, WHERE user_ID = ?;", 
        [
          name,
          phoneNum,
          carType,
          carLicense,
          carColor,
          string
        ],
        function(err, rows, fields) {
          if(err){throw err;}
          res.status(200).send('Success added name: ' + $.name + '\n',
                              'Success added phoneNum: ' + $.phoneNum + '\n',
                              'Success added carType: ' + $.carType + '\n',
                              'Success added carLicense: ' + $.carLicense + '\n',
                              'Success added carColor: ' + $.carColor + '\n');
          });
      });
  }catch(err){
    res.status(500).send("Server Error: " + err);
    connection.end();
  }
}

module.exports = { Getpersonal, InputPersonal }
