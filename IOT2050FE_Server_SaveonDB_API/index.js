const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
require("dotenv").config();
require("./saveModbus");
const dataTest = require("./src/routes/index");

// // Khắc phục lỗi cors khi gọi API bên frontend
// app.use(cors({origin: true}))
// Add headers
app.use(function (req, res, next) {
  // Pass to next layer of middleware
  next();
});

// Connect to MongoDB
const db = require("./src/config/db/index");
db.connect();
// -------------------------------------------------------
// -------------------LIBRARY-----------------------------
// -------------------------------------------------------

// Kiểm tra path để đưa vào file tĩnh là folder public
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng middleware đã có sẵn body parser, dùng để đưa giá trị vào biến body như là với biến query
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// HTTP logger xem các log gửi đi khi refresh lại trang
// app.use(morgan('combined'));

// Template engine để phân chia các phần của trang web một cách có cấu trúc hơn và được lập trình sẵn
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,

      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
            </a>`;
      },
    },
  })
);
// Đặt cho ứng dụng sử dụng view engine là handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// ---------------------------------------------------------
// ---------------------BODY PART---------------------------
// ---------------------------------------------------------

// Override để chuyển đổi các phương thức
app.use(methodOverride("_method"));

// Custom middleware
// app.use(SortMiddleware);

// Routes init khởi tạo tuyến đường
// route(app);
// app.get("/", function (req, res) {
//   return res.render("hello");
// });
const port = process.env.PORT;
app.use("/", dataTest);
app.listen(port, "0.0.0.0");
