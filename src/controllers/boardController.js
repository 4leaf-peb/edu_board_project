import { compile } from "pug";

export const detailController = (req, res) => {
  const sql = `
  select		A.board_no                          As  no,
            A.title                             As  title,
            B.name                              As  author, 
            "0"		                              As	hit,
            date_format(A.created,'%Y-%m-%d')   As created
    from		board	A
    join		emp		B
      on		A.author = B.m_no
   where    A.board_no = ${req.query.pk}
`;

  const db = req.body.connection;

  db.query(sql, (error, rows) => {
    res.render(`screens/board/detail`);
  });
};
export const editController = (req, res) => {
  res.render("screens/board/edit");
};
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
