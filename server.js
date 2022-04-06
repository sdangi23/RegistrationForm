const express = require('express');

const bodyParser = require('body-parser');

const app = express();

var cors = require('cors');

app.use(cors());

const Sequelize = require('sequelize');
const req = require('express/lib/request');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize('node-complete', 'root', 'shubhamdangi', {dialect: 'mysql', host:'localhost'});

const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
  });

app.use('/add-user' , async (req, res, next)=> {
  
  const name = req.body.name;
  const email = req.body.email;

  const data = await User.create( {name: name, email: email} );
  res.status(201).json({newUserDetail: data});

})

app.use('/get-users' , async (req, res, next) => {
    const users = await User.findAll();
    res.status(201).json({allUsers: users});
    })
  
app.use('/delete-user' , async (req, res, next) => {
  const uId = req.body.deleteId;
  console.log(uId , "ajsndkjn ashajksdhasbcdabs dashdahjs cd");
  await User.destroy({where: {id: uId}});
  res.sendStatus(201);
})


sequelize.sync().then( () =>{
  

    app.listen(3000);

    })
    .catch((err)=> console.log(err));


