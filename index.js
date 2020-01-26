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
    fs.writeFile('index.html', generateHTML(response), function(err) {
          if (err) console.log('error', err)
           console.log(response);

  const html = fs.readFileSync('index.html', 'utf8'); 
  const options = { format: 'Letter' };
  pdf.create(html, options).toFile('./resume.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); 
  });    
    });
  })
   .catch(function (error) {
    console.log(error);
  })
}

function starred(answers) {
  let name = answers.name
  axios.get(`https://api.github.com/users/${name}/starred`
  )
  .then(function (response,) {
    let star = response.data.full_name
    // let starRepos = response.data;
    //  const starRepos1 = starRepos.full_name.length
    // let star = response.data.full_name;
    // const starRepos1 = starRepos.full_name;
     console.log(star)
  })
  .catch(function (error) {
    console.log(error);
  })
}

inquirer.prompt(questions)
  .then(answers => {
    gitCall(answers)
    starred(answers)
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
  <style>
body {
height:1300px;
}
</style>
   
  
</head>
  <body>
  
  <div class="container"><br>
  <center>
      <div style="background-color:${user.color}; border: black 5px solid; width: 400px; height: 450px; margin-bottom: 50px;">
        <h1 style="text-align:center;">${response.data.name}</h1>
        <img src="${response.data.avatar_url}" align="middle" alt="user profile picture" height="350" width="300">
      </div>
  </center>
  

  <ul style="background-color:${user.color}; border: black 5px solid;"> 
    <li class="lead">Bio: ${response.data.bio}</li>
    <li class="lead">I am following: ${response.data.following} GitHub Users</li>
    <li class="lead">My number of public repositories: ${response.data.public_repos}</li>
    <li class="lead">My number of followers: ${response.data.followers}</li>
    <li class="lead">My starred Repos: ${response.data.full_name}</li>
  </ul>

  <div style="background-color:${user.color}; border: black 5px solid; margin-bottom: 50px;">
    <h2>Links<h2>
      <ul>
        <li class="lead">GitHub: ${response.data.html_url}</li>
        <li class="lead">BLOG: ${response.data.blog}</li>
      </ul>
  </div>

  <center>
    <div  style="background-color:${user.color}; border: black 5px solid; width:650px; height:350px; margin-bottom: 50px;">
      <h5>Current city ${response.data.location}</h5>
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=${uLocation}&zoom=14&size=600x300&key=AIzaSyDIEVzD85LZ_BWwmWAD2qPxTiUNGgA28YI" align="middle">
    </div>
  <center>

  </div>
</div>
</body>
</html>`;

}







// starred_url: 'https://api.github.com/users/Odianrobert/starred{/owner}{/repo}',


