const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'mydatabase.c9ukuxyqda4n.us-west-1.rds.amazonaws.com',
  user     : 'CSAUser',
  password : 'Csa666!!',
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

Getpersonal = function (req, res, next) { // only get
  try {
    var input = req.query;
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${input.user_ID}';`, function(err, rows, fields) { //这里写SQL query
      if (err) { throw err; } 
      res.status(200).send(rows);
    });
  } catch(err) {
    res.status(500).send('SERVER ERROR:' + err);
    connection.end();
  }
}
                          // can't set header after they are sent what is htis man
InputPersonal = function(req, res, next){
  // req = request
  // res = response
  try{
    var input = req.query;
    var string = input.user_ID;
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${string}';`, function(err, rows, fields) {
      if (err) {throw err;}
      name = rows[0].name;
      phoneNum = rows[0].phoneNum;
      carType = rows[0].carType;
      carLicense = rows[0].carLicense;
      carColor = rows[0].carColor;
      connection.query(`UPDATE rideshare.user_info SET name = '` + name + `
                                          ',phoneNum = '` + phoneNum + `
                                          ',carType = '` + carType + `
                                          ',carLicense = '` + carLicense + `
                                          ',carColor = '` + carColor + `' WHERE user_ID = '${string}';`, function(err, rows, fields) {
        if(err){throw err;}
        res.status(200).send('Success. New Name: ' + name);
      });
      // phoneNum = rows[0].phoneNum;
      // connection.query(`UPDATE rideshare.user_info SET phoneNum = '` + phoneNum + `' WHERE user_ID = '${string}';`, function(err, rows, fields) {
      //   if(err){throw err;}
      //   res.status(200).send('Success. New phoneNum: ' + phoneNum);
      // });
      // carType = rows[0].carType;
      // connection.query(`UPDATE rideshare.user_info SET carType = '` + carType + `' WHERE user_ID = '${string}';`, function(err, rows, fields) {
      //   if(err){throw err;}
      //   res.status(200).send('Success. New carType: ' + carType);
      // });
      // carLicense = rows[0].carLicense;
      // connection.query(`UPDATE rideshare.user_info SET carLicense = '` + carLicense + `' WHERE user_ID = '${string}';`, function(err, rows, fields) {
      //   if(err){throw err;}
      //   res.status(200).send('Success. New carLicense: ' + carLicense);
      // });
      // carColor = rows[0].carColor;
      // connection.query(`UPDATE rideshare.user_info SET carColor = '` + carColor + `' WHERE user_ID = '${string}';`, function(err, rows, fields) {
      //   if(err){throw err;}
      //   res.status(200).send('Success. New carColor: ' + carColor);
      // });
    });
  }catch(err){
    res.status(500).send("Server Error: " + err);
    connection.end();
  }
}

// InputPersonal = function(req, res, next) {
//   try {
//     var input = req.query;
//     var string = input.user_ID
//     // queryString = 'SELECT count FROM rideshare.pageview;'
//     console.log(`SELECT * FROM rideshare.user_info WHERE user_id = '${string}';`)
//     connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${string}';`, function(err, rows, fields) {
//       // input.user_ID appears to be undefined
//       if (err) { throw err; } 
//       //图片不知道怎么上传
      
//       console.log(rows[0]); // her comes out to be undefined maybe try rows.nickname
      
//       nickName = rows[0];

//       queryString = `UPDATE rideshare.user_info SET name=` + nickName +` WHERE user_ID = '${string}'`
//       connection.query(queryString, function(err, rows, fields) {
//         if (err) { throw err; }
//         res.status(200).send('Sucess. New nickName: ' + nickName); 
//       });

//       phoneNum = rows[0]

//       queryString = `UPDATE rideshare.user_info SET phoneNum=` + phoneNum +` WHERE user_ID = '${string}'`
//       connection.query(queryString, function(err, rows, fields) {
//         if (err) { throw err; }
//         res.status(200).send('Sucess. New phoneNum: ' + phoneNum); 
//       });

//       carType = rows[0].carType;

//       queryString = `UPDATE rideshare.user_info SET carType= `+ carType +` WHERE user_ID = '${string}'`
//       connection.query(queryString, function(err, rows, fields) {
//         if (err) { throw err; }
//         res.status(200).send('Sucess. New carType: ' + carType); 
//       });

//       carNum = rows[0].carLicense;

//       queryString = `UPDATE rideshare.user_info SET carLicense=`+ carNum +` WHERE user_ID = '${string}'`
//       connection.query(queryString, function(err, rows, fields) {
//         if (err) { throw err; }
//         res.status(200).send('Sucess. New carLicense: ' + carNum); 
//       });

//       carCol = rows[0].carColor;

//       queryString = `UPDATE rideshare.user_info SET carColor= `+ carCol +` WHERE user_ID = '${string}'`
//       connection.query(queryString, function(err, rows, fields) {
//         if (err) { throw err; }
//         res.status(200).send('Sucess. New carColor: ' + carCol); 
//       });

//     });
//   } catch(err) { 
//     res.status(500).send('SERVER ERROR: ' + err); 
//     connection.end();
//   } 
// }

  // 前面我们定义了view, add两个函数，现在我们要将它们导出，以供routes使用

// }
module.exports = { Getpersonal, InputPersonal }