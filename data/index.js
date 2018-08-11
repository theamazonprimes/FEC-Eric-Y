const Sequelize = require('sequelize');
const request = require('request');
const sequelize = new Sequelize('seed', 'oleeze', 'oleeze', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const Question = sequelize.define('question', {
  question_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question:{ 
    type: Sequelize.TEXT,
    unique: true,
  },
  votes: {
    type: Sequelize.INTEGER,
  },
  date: Sequelize.DATE,
 },
 {
    timestamps: false,
});



const Answer = sequelize.define('answer', {
  question_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Question,
      key: 'question_id'
    }
  },
  username: Sequelize.STRING,
  answer:{ 
    type: Sequelize.TEXT,
    unique: true,
  },
  date: Sequelize.DATE,
}, {
  timestamps: false,
});

sequelize.sync()
  // .then(() => Question.create({
  //   question: 'How many people?',     
  //   votes: 5,
  //   date: new Date(1980, 6, 20)
  // }))
  .then(() => Answer.create({
    username: 'Oleeze',
    answer: 'You need 12 people',
    date: new Date(2000, 6, 20),
    question_id: 1 
  }))
  .catch(err => {
    console.log(err);
  });