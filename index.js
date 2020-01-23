const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

let user 
var name 



const questions = [
  {
    type: 'input',
    name: 'name',
    message: "Enter your Github username",
    answer: ""
  },
  {
    type: 'input',
    name: 'color',
    message: "Enter your favorite color"
  }
]
function gitCall(answers) {
  name = answers.name
  const queryURL = `https://api.github.com/users/${name}`
  axios.get(queryURL)
  .then(function(response) {

      const html = fs.writeFileSync("index.html", generateHTML(response));
      var options = { format: 'Letter' };
      pdf.create(html, options).toFile('C:\Users\Robert Odion\Desktop\DeveloperProfileGenerator\pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res);  { filename: '"Resume".pdf' }
      });
    
   })

  //  fs.writeFile("index.html", generateHTML(response), function(err) {
  //  var html = fs.readFileSync('./test/businesscard.html', 'utf8');
  //  if (err) console.log('error', err);
  //    console.log(response)
   
    
   
  //  pdf.create(html, options).toFile('./name.pdf', function(err, res) {
  //   if (err) return console.log(err);
  //   console.log(res); // { filename: '/app/businesscard.pdf' }
  // });

  
   .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    console.log('success!')
  });
}



  
inquirer.prompt(questions)
  .then(answers => {
    // console.log(JSON.stringify(answers, null, '  '))
    // console.log(answers.name)
    gitCall(answers)
    // userMap(answers)
    user=answers
  })
  .catch(function(err) {
    console.log(err);
});


  

function generateHTML(response) {
  const uLocation = response.data.location
  return `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
  
   
  
</head>
  <body style='background-color:${user.color}'>
  
  <div class="container"><br>
  <center>
      <div style="background-color: lightgray; border: black 5px solid; width: 350px; height: 375px; margin-bottom: 15px;">
        <h1 style="text-align:center;">${response.data.name}</h1>
        <img src="${response.data.avatar_url}" align="middle" alt="user profile picture" height="300" width="300">
      </div>
  </center>
  

  <ul style="background-color: lightgray; border: black 5px solid;"> 
    <li class="lead">Bio: ${response.data.bio}</li>
    <li class="lead">I am following: ${response.data.following} GitHub Users</li>
    <li class="lead">My number of public repositories: ${response.data.public_repos}</li>
    <li class="lead">My number of followers: ${response.data.followers}</li>
  </ul>

  <div style="background-color: lightgray; border: black 5px solid; margin-bottom: 15px;">
    <h2>Links<h2>
      <ul>
        <li class="lead">GitHub: ${response.data.html_url}</li>
        <li class="lead">BLOG: ${response.data.blog}</li>
      </ul>
  </div>

  <center>
    <div  style="background-color: lightgray; border: black 5px solid; width:650px; height:275px; margin-bottom: 15px;">
      <h5>Current city ${response.data.location}</h5>
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=${uLocation}&zoom=14&size=600x200&key=AIzaSyDIEVzD85LZ_BWwmWAD2qPxTiUNGgA28YI" align="middle">
    </div>
  <center>

  </div>
</div>
</body>
</html>`;

}








// starred_url: 'https://api.github.com/users/Odianrobert/starred{/owner}{/repo}',


