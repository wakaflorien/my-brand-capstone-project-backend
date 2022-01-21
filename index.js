require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500

const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors')

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Blog API",
        version: "1.0.0",
        description: "A simple Express Blog API"
      },
      servers: [
        {
          url: "http://localhost:3500",
          description: "Development server"
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ["./routes/*.js", "./routes/api/*.js"]
  };
  
  const specs = swaggerJsDoc(options);

//connect to databse
connectDB();

// enable CORS
app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json  
app.use(express.json());

// middleware for cookies
app.use(cookieParser())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

//routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))
app.use('/contact', require('./routes/api/queries'))

app.use('/posts', require('./routes/api/posts'))
app.use('/comments', require('./routes/api/comments'))

mongoose.connection.once('open', ()=> {
    console.log("Connected to MongoDB!")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})