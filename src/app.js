import express from "express";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import boardRouter from "./routers/boardRouter";

// handler = controller 가기 전에 body-parser를 들린다.
// post 방식일때 데이터를 가져올 수 있다.

const app = express();
const PORT = 7000;

app.set("view engine", "pug");
app.use(helmet());
app.use(morgan(`dev`));

app.use(express.static(path.join(__dirname, "/assets")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//암호화해서 가져온 data를 json형태로 보여주는 기능

app.use("/", globalRouter);
app.use("/board", boardRouter);

app.listen(PORT, () => {
  console.log(`🌟 LOL_BOARD WEB PROPJECT - http://localhost"${PORT}`);
});
