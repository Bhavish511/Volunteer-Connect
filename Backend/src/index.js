const sequelize = require('./db');
const User = require('./models/User');
const Volunteer = require('./models/volunteer');
const Organization = require('./models/organization');
const Request = require('./models/request');
const requestassociation = require('./models/requestAssociation');
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const verification = require('../middleware/verification');
const express = require('express');
const volunteer = require('./models/volunteer');

// const { RiEyeCloseFill } = require('react-icons/ri');
const { list } = require('postcss');
app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 5000;
const JWT_SECRET = 'Bhavishkumar';


const bodyParser = require('body-parser');
const cors = require("cors");  // To enable cross-origin requests
const corsOptions = {
    origin: 'http://localhost:3000', // your frontend origin
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON data from the request body



app.post("/registervolunteer",
    [
        body("username","Enter the Valid name!!").isLength({min: 3}),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
        body("role", "Role must be volunteer or organization").isIn(["volunteer"]),
        body("location", "Location is required").notEmpty(),
    ],
    async(req, res) => {
        let verify_flag = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ verify_flag, errors: errors.array() });
        }

        try {
            console.log(req.body);
            
            let existinguser = await User.findOne({ where: { email: req.body.email } });
            if(existinguser != null) {
                return res.status(400).json({ verify_flag, error: "User with this email already exists" });
            }
            console.log("sdddddddddddddd");
            
            const salt = await bcrypt.genSalt(12);
            const encryptedPass  = await bcrypt.hash(req.body.password, salt);
            console.log(req.body.Numproject);
            console.log("sdfdfffffff");
            
            
            const user1 = await User.create({
                name: req.body.username,
                email: req.body.email,
                password: encryptedPass,
                role: req.body.role,
            });

            
            await Volunteer.create({
                NumProject: req.body.no_projects,
                skills: req.body.skills,
                location: req.body.location,
                Bio: req.body.bio,
                userid: user1.userid                
            });
            const payload = {
                email : user1.email
            };
            
            const authtoken = jwt.sign(payload, JWT_SECRET);
            console.log(authtoken);
            verify_flag = true;
            res.json({verify_flag, authtoken});
        
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
app.post("/registerorg",
    [
        body("username","Enter the Valid name!!").isLength({min: 3}),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
        body("role", "Role must be volunteer or organization").isIn(["organization"]),
        body("location", "Location is required").notEmpty(),
    ],
    async(req, res) => {
        let verify_flag = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ verify_flag, errors: errors.array() });
        }

        try {
            let existinguser = await User.findOne({ where: { email: req.body.email } });
            if(existinguser != null) {
                return res.status(400).json({ verify_flag, error: "User with this email already exists" });
            }

            const salt = await bcrypt.genSalt(12);
            const encryptedPass  = await bcrypt.hash(req.body.password, salt);
            console.log(req.body.Numproject);
            
            const user1 = await User.create({
                name: req.body.username,
                email: req.body.email,
                password: encryptedPass,
                role: req.body.role,
            });
            await Organization.create({
                NumProject: req.body.no_projects,
                location: req.body.location,
                userid: user1.userid                
            });

            const payload = {
                email : user1.email
            };
            
            const authtoken = jwt.sign(payload, JWT_SECRET);
            console.log(authtoken);
            verify_flag = true;
            res.json({verify_flag, authtoken});
        
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

app.post("/volunteerlogin",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    ],
    // console.log("Svnfkjbvkbj")
    
    async(req, res) => {

        console.log("sdgfvskdjbvkzdbfkvbs");
        let verify_flag = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ verify_flag, errors: errors.array() });
        }
        
        // const { Email, Password } = req.body;
        const Email = req.body.email;
        const Password = req.body.password;
        const pass = req.body.password;


        // console.log(pass);
        

        console.log(Email);
        
        try {
            let user1 = await User.findOne({ where: { email: Email}});
            // console.log(user1.email);
            
            // console.log(user1);
            if(!user1) {
                return res.status(400).json({ verify_flag, error: "User with this email doesn't exists" });
            }
            console.log(pass);
            const isPasswordCorrect = await bcrypt.compare(Password, user1.password);

            if(!isPasswordCorrect) {
                return res.status(400).json({ verify_flag, error: "Invalid credentials" });
            }
            
            const payload = {
                email : Email
            };
            
            const authtoken = jwt.sign(payload, JWT_SECRET);
            // console.log(authtoken);
            verify_flag = true;
            res.json({verify_flag, authtoken});


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");         
        }
    }
);

app.post("/organizationlogin",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    ],
    async(req, res) => {
        let verify_flag = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ verify_flag, errors: errors.array() });
        }
        
        // const { Email, Password } = req.body;
        const Email = req.body.email;
        const Password = req.body.password;
        const pass = req.body.password;


        // console.log(pass);
        

        console.log(Email);
        
        try {
            let user1 = await User.findOne({ where: { email: Email}});
            // console.log(user1.email);
            
            // console.log(user1);
            if(!user1) {
                return res.status(400).json({ verify_flag, error: "User with this email doesn't exists" });
            }
            // console.log(pass);
            const isPasswordCorrect = await bcrypt.compare(Password, user1.password);

            if(!isPasswordCorrect) {
                return res.status(400).json({ verify_flag, error: "Invalid credentials" });
            }
            
            const payload = {
                email : Email
            };
            
            const authtoken = jwt.sign(payload, JWT_SECRET);
            // console.log(authtoken);
            verify_flag = true;
            res.json({verify_flag, authtoken});


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");         
        }
    }
);

app.put("/updaterequest/:newStatus/:id", verification ,async(req, res) =>{
    let verify_flag = false;
        try {
            const {newStatus, id } = req.params;
            const Email = req.payload.email;
            // console.log(Email);
            
            const reqdata = await Request.findOne({ where: { request_Id: id } });
            console.log(reqdata);
            console.log(reqdata.status);
            
            const reqstatus = reqdata.status;
            console.log(reqstatus);
            
            // console.log(reqstatus);
            if (!reqdata) {
                return res.status(404).json({ error: "Request not found" });
            }
            console.log(newStatus);
            // const reqstatus = reqdata.status;
            console.log(reqstatus);
            if(reqstatus == "rejected" || reqstatus == "accepted"){
                                
                // console.log(reqstatus);
                return res.status(409).json({ error: "Request status is not pending" });
            } else if(reqstatus == "pending"){
                await Request.update(
                    { status: newStatus }, // <-- New status value
                    { where: { request_id: id } } // <-- Condition to find the request
                  );
                  verify_flag =true;
                  return res.status(200).json({ message: `Status updated to ${status}` });

            }
        }catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
});

app.put("/updateProfile", verification, async(req, res) => {
    // const { Email, Password } = req.body;
    verify_flag =false;
    const Email = req.payload.email;
    console.log(Email);

    // const {username,skills,location,bio} = req.body;
    try {
        let user1 = await User.findOne({ where: { email: Email}});
        console.log(user1);

        await User.update(
            {
                userid: user1.userid , 
                name: req.body.username
            },
            {
                where: { userid: user1.userid }  
            } 
        );

        if(user1.role === "volunteer"){
            const Voldata = await volunteer.findOne({ where: { userid: user1.userid } });

            await Volunteer.update(
                {
                    volunteerid: Voldata.volunteeerid , 
                    NumProject: Voldata.NumProject , 
                    skills: req.body.skills , 
                    location: req.body.location , 
                    bio: req.body.bio
                },
                {
                    where: { userid: user1.userid }  
                }
            );   
        }
        verify_flag =true;
        return res.status(200).json({ message: `Detail updated successfully!!..` });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


// app.all("/dashboardOrg",verification, (req, res) => {
//     res.send(`Hit with method: ${req.method}`);
// });
app.get("/organizationdashboard", verification, async (req, res) => {

    // console.log("Route hit");
    // res.send("Hit");
    try {

        console.log("dvfdzv");
        
        const Email = req.payload.email;
        console.log("Authenticated Email:", Email);
    

        const user1 = await User.findOne({ where: { email: Email } });
    
        if (!user1) {
            return res.status(404).json({ error: "User not found" });
        }
        // console.log(user1.userid);
        const orgdetail = await Organization.findOne({ where: { userid: user1.userid } });
        console.log(orgdetail);

        const reqobj = await requestassociation.findAll({ where: { organizationid: orgdetail.organizationid } });
        console.log(reqobj);
        
        // const uniqueRequestIds = new [(reqobj.map(assoc => assoc.request_Id))];
        // const uniquevolunteerIds = new [(reqobj.map(assoc => assoc.volunteerId))];
        const uniqueRequestIds = reqobj.map(assoc => assoc.request_Id);
        const uniquevolunteerIds = reqobj.map(assoc => assoc.volunteerId);

        let requestTitles = [],reqid = [], reqdescription = [], reqstatus = [], reqdates = [];
        let volunteerSkills = [],volunteerEmails = [], volunteerName = [], volunteeerprojects = [];
        let no_requests = 0;
        // Get the count
        for (let uniqueRequestId of uniqueRequestIds) {
            let request = await Request.findOne({ where: { request_Id: uniqueRequestId } });
            requestTitles.push(request.request_title);
            reqdescription.push(request.request_description);
            reqstatus.push(request.status);
            reqdates.push(request.request_date);
            reqid.push(uniqueRequestId);
            no_requests += 1;
        }
        let no_volunteers = 0;
        for (let uniquevolunteerId of uniquevolunteerIds) {
            let vid = await Volunteer.findOne({ where: { volunteerid : uniquevolunteerId } });
            volunteerSkills.push(vid.skills);
            volunteeerprojects.push(vid.NumProject);
            let user1 = await User.findOne({ where: { userid: vid.userid}});
            volunteerEmails.push(user1.email);
            volunteerName.push(user1.name);
            no_volunteers +=1;
            // vids.push(uniquevolunteerId);
        }
        console.log({
            no_projects : orgdetail.NumProject,
            no_requests : no_requests, // Get the count
            no_volunteers: no_volunteers,
            requestTitles : requestTitles,
            requestStatus: reqstatus,
            requestDates : reqdates,
            request_id : reqid,
            vskills : volunteerSkills,
            vemail : volunteerEmails,
            vusername : volunteerName,
            vno_projects : volunteeerprojects,
        });
        
        return res.json({
            no_projects : orgdetail.NumProject,
            no_requests : no_requests, // Get the count
            no_volunteers: no_volunteers,
            requestTitles : requestTitles,
            requestStatus: reqstatus,
            requestDates : reqdates,
            request_id : reqid,
            vskills : volunteerSkills,
            vemail : volunteerEmails,
            vusername : volunteerName,
            vno_projects : volunteeerprojects,
        });
        // Proceed with additional logic here
    
        res.status(200).json({ message: "Organization dashboard data retrieved successfully." });
        } catch (error) {
        console.error("Error fetching organization dashboard data:", error);
        res.status(500).json({ error: "Internal Server Error" });
        }
});
app.get("/viewprofile/:email", verification, async(req, res) => {


    let verify_flag = false;
    try {

        const { email } = req.params;
        const Email = req.payload.email;
        // console.log(Email);
        
        let user1 = await User.findOne({ where: { email: email}});
        // console.log(user1);
        
                    
        const Volunteer = await volunteer.findOne({ where: { userid: user1.userid}});
        // if(!Volunteer) {
        //     return res.status(400).json({ verify_flag, error: "User with this email doesn't exists" });
        // }
        // console.log(Volunteer);
        let volunteeerid = Volunteer.volunteerid;

        let association_ids = await requestassociation.findAll({ where: { volunteerId: volunteeerid}});
        console.log(association_ids);
        let orgnames = []
        let reqid = []
        let reqnames = []
        let reqdescription = []
        let reqstatus = []
        let reqdates = []
        for (let association_id of association_ids) {
            let request = await Request.findOne({ where: { request_Id: association_id.request_Id } });
            if(request.status === "accepted"){
                
                const orgid= association_id.organizationId; 
                let existinguser = await Organization.findOne({ where: { organizationid: orgid } });
                let user1 = await User.findOne({ where: { userid: existinguser.userid}});
                orgnames.push(user1.name)
                reqnames.push(request.request_title);
                reqdescription.push(request.request_description);
                reqstatus.push(request.status);
                reqdates.push(request.request_date);
                reqid.push(association_id.request_Id);
            }
        }
        console.log(Volunteer.Bio);
        
        // console.log(Volunteer.NumProject);
        const responseData = {
            volunteerName: user1.name,  // Assuming name is part of the volunteer data
            volunteerEmail: user1.email,  // Assuming email is part of the volunteer data
            volunteerSkills: Volunteer.skills,
            organizationNames: orgnames,
            requestTitles: reqnames,
            volunteerLocation: Volunteer.location,
            volunteerBio: Volunteer.Bio,
            requestDescriptions: reqdescription,
            requestStatuses: reqstatus,
            requestDates: reqdates,
            requestIds: reqid,
            no_projects: Volunteer.NumProject
        };
        verify_flag = true;
        res.json(responseData);

        // console.log(Email);
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");  
        }
    } 
);

app.post("/organizationReqVoln", verification, async(req, res) =>{
    let verify_flag = false;
    try {


        const Email = req.payload.email;
        console.log(Email);
        let user1 = await User.findOne({ where: { email: Email}});
        let org = await Organization.findOne({ where: { userid: user1.userid}});
        let orgid = org.organizationid;



        const {volunteerEmail,title,description} = req.body;
        console.log(volunteerEmail);
        
        console.log(title);
        console.log(description);
        let createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: 'YYYY-MM-DD HH:MM:SS'
        const newRequest = await Request.create({
            request_title: title,
            request_description: description,
            status: "pending",
            request_date: createdAt
        });
        let user2 = await User.findOne({ where: { email: volunteerEmail}});
        let vol = await Volunteer.findOne({ where: { userid: user2.userid}});
        let volid = vol.volunteerid;
        let reqid = newRequest.request_id;

        const newAssociation = await requestassociation.create({
            volunteerId: volid,
            organizationId: orgid,
            request_Id: reqid
        });
        console.log(reqid);
        res.status(200).json({ message: "Request Posted Successfully successfully." });
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");  
    }
});

// for volunteer dashboard and to se all request of volunteer for both
app.get("/:type", verification, async (req, res) => {
    const { type } = req.params;
    const Email = req.payload.email;

    try {
        const user1 = await User.findOne({ where: { email: Email } });
        if (!user1) return res.status(400).json({ error: "User not found" });

        if (type === "volunteerDashboard" || type === "request") {
            const Volunteer = await volunteer.findOne({ where: { userid: user1.userid } });
            if (!Volunteer) {
                return res.status(400).json({ error: "Volunteer profile not found" });
            }

            const volunteeerid = Volunteer.volunteerid;
            const association_ids = await requestassociation.findAll({ where: { volunteerId: volunteeerid } });

            let orgnames = [], reqid = [], reqnames = [], reqdescription = [], reqstatus = [], reqdates = [];

            for (let association_id of association_ids) {
                const orgid = association_id.organizationId;
                const existingOrg = await Organization.findOne({ where: { organizationid: orgid } });
                const orgUser = await User.findOne({ where: { userid: existingOrg.userid } });
                orgnames.push(orgUser.name);

                const request = await Request.findOne({ where: { request_Id: association_id.request_Id } });
                reqnames.push(request.request_title);
                reqdescription.push(request.request_description);
                reqstatus.push(request.status);
                reqdates.push(request.request_date);
                reqid.push(association_id.request_Id);
            }

            return res.json({
                volunteerName: user1.name,
                volunteerEmail: user1.email,
                volunteerSkills: Volunteer.skills,
                volunteerLocation: Volunteer.location,
                volunteerBio: Volunteer.bio,
                organizationNames: orgnames,
                requestTitles: reqnames,
                requestDescriptions: reqdescription,
                requestStatuses: reqstatus,
                requestDates: reqdates,
                requestIds: reqid,
                NumProject: Volunteer.NumProject
            });

        }else {
            return res.status(404).json({ error: "Unknown endpoint" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
app.listen(port, ()=>{
    console.log(`Listening to the port: ${port}`);
});



// app.get("/volunteerDashboard", verification , async( req, res) => {

//     let verify_flag = false;
//     try {

//         const Email = req.payload.email;
//         // console.log(Email);
        
//         let user1 = await User.findOne({ where: { email: Email}});
//         // console.log(user1);
        
                    
//         let Volunteer = await volunteer.findOne({ where: { userid: user1.userid}});
//         if(!Volunteer) {
//             return res.status(400).json({ verify_flag, error: "User with this email doesn't exists" });
//         }
//         // console.log(Volunteer);
//         let volunteeerid = Volunteer.volunteerid;

//         let association_ids = await requestassociation.findAll({ where: { volunteerId: volunteeerid}});
//         console.log(association_ids);
//         let orgnames = []
//         let reqid = []
//         let reqnames = []
//         let reqdescription = []
//         let reqstatus = []
//         let reqdates = []
//         for (let association_id of association_ids) {
//             const orgid= association_id.organizationId; 
//             let existinguser = await Organization.findOne({ where: { organizationid: orgid } });
//             let user1 = await User.findOne({ where: { userid: existinguser.userid}});
//             orgnames.push(user1.name)
//             let request = await Request.findOne({ where: { request_Id: association_id.request_Id } });
//             reqnames.push(request.request_title);
//             reqdescription.push(request.request_description);
//             reqstatus.push(request.status);
//             reqdates.push(request.request_date);
//             reqid.push(association_id.request_Id);
//         }




//         // console.log(Volunteer.NumProject);
        
//         const responseData = {
//             volunteerName: user1.name,  // Assuming name is part of the volunteer data
//             volunteerEmail: user1.email,  // Assuming email is part of the volunteer data
//             volunteerSkills: Volunteer.skills,
//             organizationNames: orgnames,
//             requestTitles: reqnames,
//             requestDescriptions: reqdescription,
//             requestStatuses: reqstatus,
//             requestDates: reqdates,
//             requestIds: reqid,
//             NumProject: Volunteer.NumProject
//         };
        
//         res.json(responseData);

//         // console.log(Email);
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");  
//     }
// });