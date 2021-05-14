import mysql from "mysql2";

export const dbConnectionHandler = (req, res, next) => {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "fourleaf0309",
    database: "edu",
  });

  console.log(connection);

  //   재귀호출 , 자기 자신을 다시 한번 더 호출
  //    언제 ? db접속에 실패하면

  connection.on(`error`, (error) => {
    console.log(`error`);
    console.log("DB Connection Failed! Re Try Connect!");
    setTimeout(() => {
      dbConnectionHandler();
    }, 3000);
  });
  //   connection이 ()이 되면 = connection.on();
  //   실패감지

  req.body[`connection`] = connection;

  next();
};
// 중간에 들리는 곳 = middleware
// 순서
// router => middleware => controller
// db접속 후 접속된 개체를 controller로 넘겨줌
