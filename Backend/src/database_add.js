const sequelize = require('./db');
const User = require('./models/User');
const Volunteer = require('./models/volunteer');
const Organization = require('./models/organization');
const Request = require('./models/request');
const RequestAssociation = require('./models/requestAssociation');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ force: true }); // Recreate tables if not in production
      console.log('All models were synchronized successfully.');
    } else {
      await sequelize.sync(); // Keep existing tables in production
      console.log('Models synchronized, no changes to existing tables.');
    }

  } catch (error) {
      console.error('Error during database setup:', error);
  }
};

syncDatabase();

  
syncDatabase();
  
//       // 3. Insert Dummy Users
//       const user1 = await User.create({
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: 'password123',
//         role: 'volunteer'
//       });
  
//       const user2 = await User.create({
//         name: 'Helping Hands Org',
//         email: 'helpinghands@example.com',
//         password: 'password456',
//         role: 'organization'
//       });
  
//       // 4. Insert Dummy Volunteer (linked to user1)
//       await Volunteer.create({
//         userid: user1.userid,
//         NumProject: 3,
//         skills: 'Teaching, First Aid',
//         location: 'New York',
//         Bio: 'Passionate about community service.'
//       });
  
//       // 5. Insert Dummy Organization (linked to user2)
//       await Organization.create({
//         userid: user2.userid,
//         NumProject: 5,
//         location: 'California'
//       });
  
//       // 6. Insert Dummy Requests
//       await Request.bulkCreate([
//         {
//           request_title: 'Need volunteers for beach cleanup',
//           request_description: 'Join us to clean up the coastline.',
//           status: 'pending',
//           request_date: new Date(),
//         },
//         {
//           request_title: 'Blood Donation Camp',
//           request_description: 'Looking for donors for our camp.',
//           status: 'accepted',
//           request_date: new Date(),
//         }
//       ]);
  
//       console.log('Dummy data inserted successfully.');
  
//     } catch (error) {
//       console.error('Error during database setup:', error);
//     }
// };
  
// syncDatabase();
