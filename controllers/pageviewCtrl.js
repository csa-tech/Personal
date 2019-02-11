const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'mydatabase.c9ukuxyqda4n.us-west-1.rds.amazonaws.com',
  user     : 'CSAUser',
  password : 'Csa666!!',
  port     : '3306',
  database : 'myDataBase'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// 从secret.json文件里读取数据并转换为Object
// var secret = JSON.parse(require('fs').readFileSync('secret.json', 'utf8'));

// var connection = mysql.createConnection(secret);
// connection.connect();



Getpersonal = function (req, res, next) {
  try {
    var input = req.query;
    connection.query('SELECT * FROM rideshare.personal WHERE user_ID = '$input.user_ID';', function(err, rows, fields) { //这里写SQL query
      if (err) { throw err; } //出错时交给后面的finally去处理      

      // 成功时的处理
      // rows = [ RowDataPacket { count: 0, update_time: 2019-01-15T23:34:59.000Z } ]
      res.status(200).send(rows);
    });
  } catch(err) { // 这里使用try...catch语法，即使出bug也可以正常应答，并且断开和数据库的连接
    res.status(500).send('SERVER ERROR:' + err); // SQL出错时的处理
    connection.end();
  }
}


InputPersonal = function(req, res, next) {
  try {
    var input = req.query;
    var string = input.user_ID

    // queryString = 'SELECT count FROM rideshare.pageview;'
    connection.query('SELECT * FROM rideshare.personal WHERE user_ID = '$input.user_ID';', function(err, rows, fields) {
      if (err) { throw err; }
      //图片不知道怎么上传

      nickName = rows[1].nickName;

      queryString = 'UPDATE rideshare.personal SET nickName=' + nickName + 'WHERE user_ID = '${string}', update_time=NOW();'
      connection.query(queryString, function(err, rows, fields) {
        if (err) { throw err; }
        res.status(200).send('Sucess. New nickName: ' + nickName); 
      });

      phoneNum = rows[2].phoneNum;

      queryString = 'UPDATE rideshare.personal SET phoneNum=' + phoneNum + 'WHERE user_ID = '${string}', update_time=NOW();'
      connection.query(queryString, function(err, rows, fields) {
        if (err) { throw err; }
        res.status(200).send('Sucess. New phoneNum: ' + phoneNum); 
      });

      carType = rows[3].carType;

      queryString = 'UPDATE rideshare.personal SET carType=' + carType + 'WHERE user_ID = '${string}', update_time=NOW();'
      connection.query(queryString, function(err, rows, fields) {
        if (err) { throw err; }
        res.status(200).send('Sucess. New carType: ' + carType); 
      });

      carNum = rows[4].carNum;

      queryString = 'UPDATE rideshare.personal SET carNum=' + carNum + 'WHERE user_ID = '${string}', update_time=NOW();'
      connection.query(queryString, function(err, rows, fields) {
        if (err) { throw err; }
        res.status(200).send('Sucess. New carNum: ' + carNum); 
      });

      carCol = rows[5].carCol;

      queryString = 'UPDATE rideshare.personal SET carCol=' + carCol + 'WHERE user_ID = '${string}', update_time=NOW();'
      connection.query(queryString, function(err, rows, fields) {
        if (err) { throw err; }
        res.status(200).send('Sucess. New carCol: ' + carCol); 
      });

    });
  } catch(err) { 
    res.status(500).send('SERVER ERROR: ' + err); 
    connection.end();
  } 
}

  // 前面我们定义了view, add两个函数，现在我们要将它们导出，以供routes使用

// }
module.exports = { Getpersonal, InputPersonal }