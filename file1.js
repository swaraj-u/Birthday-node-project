let http = require('http');
let express = require('express');
let mongoose = require('mongoose');
let Birthday = require('./models/file2');

//To get add element

//connect to mongoDB
const dbURI = 'mongodb+srv://swarajrupadhyay:MkW8H2AW9kjrFtG2@clusterbirthday.9jailnj.mongodb.net/birthday_database?retryWrites=true&w=majority&appName=ClusterBirthday';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => console.log("connected to mongoDB database"))
.catch(err => console.log(err));

let app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({extended: true}));

app.get('/home', (req, res) => {
    Birthday.find({})
    .then(result => {
      res.render('index', {datas: result});
    })
    .catch(err => console.log(err));
});

app.get('/create', (req, res) => {
     res.render('create');
});

app.post('/create',(req,res) => {

  const data = req.body;

    const birthday = new Birthday({
    person: data.Person,
    birthdayDate: data.DOB
    });
    
    birthday.save()
    .then(result => {
      res.redirect('/home');
    })
    .catch(err => {
      console.log(err);
    })
});

app.delete('/home/:id' , (req,res) => {
  const id = req.params.id;

  Birthday.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect: '/home'});
  })
  .catch(err => console.log(err));
})

app.get('/:id', (req,res) => {
  const id = req.params.id;

  Birthday.findById(id)
  .then(result =>{
    res.render('update', {data: result});
  })
});

app.post('/update', (req,res) => {
  const data = req.body;
  
  Birthday.findOneAndUpdate({person: data.Person}, {birthdayDate: data.DOB})
  .then(result => {
    res.redirect('/home');
  })
  .catch(err => {
    console.log(err);
  })
});

// app.get('/fetch', (req,res) => {
//   res.render('fetch');
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

// const birthday1 = new Birthday({
//         person:"Swaraj Upadhyay",
//         birthdayDate:"2005-10-26"
//     });
// birthday1.save()
//   .then(result => {})
//   .catch(err => {
//         console.log(err);
//      });

// const birthday2 = new Birthday({
//       person:"Navin Kumar",
//       birthdayDate:"2005-12-06"
//   });
// birthday2.save()
// .then(result => {})
// .catch(err => {
//       console.log(err);
//    });
    // Birthday.findByIdAndDelete('6675ad6df0e76e1c4f3a9079')
    // .then(result => res.send(result))
    // .catch(err => console.log(err));
    // const birthday = new Birthday({
    //     person:"Navin Kumar",
    //     birthdayDate:"12/10/2005"
    // });

    // birthday.save()
    // .then(result => {
    //     res.send(result);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    // Birthday.findOneAndDelete({person: "Navin Kumar"})
    // .then(result => {
    //     res.send(result);
    // })
    // .catch(err => console.log(err));
    // Birthday.findOneAndUpdate({person: "Swaraj Upadhyay"}, {birthdayDate: "23/07/2004"})
    // .then(result => {
    //     res.send(result);
    // })
    // .catch(err => console.log(err));

// console.log(req.url);
    // res.render('index');
    // Birthday.findOne({person: "Swaraj Upadhyay"})
    // .then(result => {
    //    const date = result.birthdayDate;
    //    const dateOnly = date.toLocaleDateString('en-CA');
    //    const [year, month, day] = dateOnly.split('-');
    //    res.send(`Year: ${year}, Month: ${month}, Day: ${day}`);
    // })
    // .catch(err => console.log(err));

    // app.post('/fetch', (req,res) => {
//   Birthday.findOne({person: req.body.Person})
//   .then(result => {
//     res.render('fetch', {data: result});
//   })
// });
