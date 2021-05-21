import { compile } from "pug";

export const listController = (req, res) => {
  const sql = `
  select		A.board_no                          As  no,
            A.title                             As  title,
            B.name                              As  author, 
            "0"		                              As	hit,
            date_format(A.created,'%Y-%m-%d')   As created
    from		board	A
    join		emp		B
      on		A.author = B.m_no
`;

  const db = req.body.connection;

  db.query(sql, (error, rows) => {
    res.render("screens/board/list", { boardList: rows });
  });
};
export const writeController = (req, res) => {
  res.render("screens/board/write");
};

export const detailController = (req, res) => {
  const sql = `
  select		A.board_no                          As  no,
            A.title                             As  title,
            A.contents                          As  contents,
            B.name                              As  author, 
            "0"		                              As	hit,
            date_format(A.created,'%Y-%m-%d')   As  created
    from		board	A
    join		emp		B
      on		A.author = B.m_no
   where    A.board_no = ${req.query.pk}
`;

  const db = req.body.connection;

  db.query(sql, (error, rows) => {
    // null, undefined
    if (!rows[0]) {
      console.log("404 Not Found Error!");
      listController(req, res);
      // listController를 실행시키려면 서순이 listController가 위에 있어야한다

      // return;
    } else {
      console.log(rows[0]);
      res.render(`screens/board/detail`, { board: rows[0] });
    }
    // board에 pk값이 있다, 없다를 검증 하는 소스
  });
};

export const editController = (req, res) => {
  res.render("screens/board/edit");
};

export const postDeleteController = (req, res) => {
  const pk = req.body.pk;
  const db = req.body.connection;

  const sql = `
    DELETE   FROM    board
            WHERE   board_no = ${pk}
    `;

  db.query(sql, (error, result) => {
    console.log(result);

    if (result.affectedRows > 0) {
      listController(req, res);
    } else {
      listController(req, res);
    }
  });
};
