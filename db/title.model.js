
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/title');
const Schema = mongoose.Schema;

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected');
})

const titleSchema = new Schema({
  title: String
});

let Title = mongoose.model('Title', titleSchema);

let saveTile = (randomData, cb) => {
  var titleArray = randomData[0].titleName;
  titleArray.forEach((data, index) => {
    const title = data;

    Title.findOne({title: title}, (err, data) => {
      if(err) console.log(err);
      if (data) cb(`${title} already exists in db`);
      else {
        const repo = new Title({
          title
        });
        repo.save()
          .then((title) => cb(title))
          .catch(err => cb(err))
      }
    })
  })
}

module.exports = {
  saveTile,
  Title
}