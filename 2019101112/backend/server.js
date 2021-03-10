const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "TheJob"

// routes
var JobsRouter = require("./routes/api/jobs");
var ApplicantsRouter = require("./routes/api/applicants");
var ApplicationsRouter = require("./routes/api/applications");
var RecruiterRouter = require("./routes/api/recruiters");

var AuthRecruiterRouter = require("./routes/api/auth/recruitersAuth");
var AuthApplicantRouter = require("./routes/api/auth/applicantsAuth");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Connection to MongoDB
// mongoose.connect('mongodb://localhost/TheJob', 
// { useNewUrlParser: true, 
//     useCreateIndex : true
// });
// const connection = mongoose.connection;
// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully !");
// })

// Configure Mongo db -- URI 
const db = 'mongodb://localhost/TheJob';

// Connect to Mongo with Mongoose
mongoose.connect(db,{ 
    useNewUrlParser: true,
    useCreateIndex : true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


// setup API endpoints
// it comes here to testAPI and then go to testAPIRouter file
// app.use("/testAPI", testAPIRouter);
// app.use("/user", UserRouter);
app.use("/api/jobs", JobsRouter);
app.use("/api/applicant", ApplicantsRouter);
app.use("/api/application", ApplicationsRouter);
app.use("/api/recruiter", RecruiterRouter);


// to login and register
app.use("/api/auth/recruiter",AuthRecruiterRouter)
app.use("/api/auth/applicant",AuthApplicantRouter)


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
