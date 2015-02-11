var main = function(){

//Animal is our parent object.  It takes the arguments of focus, name, strength and speed.
  var Animal = function(focus, name, strength, speed) {
      this.focus = focus;
      this.name = name;
      this.strength = strength;
      this.speed = speed; 
//The run function will advance the animal only if they are alive.
      this.run = function(){
        if(this.position === "dead") {
          this.position = "dead";
        } else {
          if(this.focus > (Math.random()*10)){
          this.position += this.speed;
          };
        }
      }
//The report function lets us know where the animal is.
      this.report = function() {
        return this.name + " is at " + this.position;
      };
    };
//Predator is a child object of Animal.  It adds an initial position to the animal of 0.
    function Predator(focus, name, strength, speed){
      Animal.call(this, focus, name, strength, speed);
      this.position = 0;
    };
//Prey is also a child object of Animal.  It adds an initial position to the animal of 5 to give the 
//prey a head start.
    function Prey(focus, name, strength, speed){
      Animal.call(this, focus, name, strength, speed);
      this.position = 5;
    };
//These are our variables.
  var turtle = new Prey(7,"turtle",10,2),
      rabbit = new Prey(3,"rabbit",5,9),
      shark = new Predator(6,"shark",1,3),
      distance = 30,
      allReport = function(){
        console.log(turtle.report());
        console.log(rabbit.report());
        console.log(shark.report());
      };

//We want to hide most of what's on the html page until certain events happen.
  $('.rabbit').hide();
  $('.turtle').hide();
  $('.predator').hide();
  $('.sharkDeadRabbit').hide();
  $('.sharkDeadTurtle').hide();
 
//Every time the button is clicked on the html page, the animals advance.
//They may also do something depending on relative position.
$('.button').click(function() {
//If either the rabbit or the turtle is dead we only want to see 
//their picture once - not for every subsequent click.
  $('.sharkDeadRabbit').hide();
  $('.sharkDeadTurtle').hide();
//this advances the animal.
  turtle.run();
  rabbit.run();
  shark.run();
//If the turtle or the rabbit has passed the distance then they win.
  if(rabbit.position>distance) {
    $('.rabbit').show();
    $('.button').hide();
  } else if(turtle.position>distance) {
    $('.turtle').show();
    $('.button').hide();
//If the shark kills both the rabbit and the turtle then the skar wins.
  } else if((turtle.position == "dead") && (rabbit.position == "dead")) {
    $('.predator').show();
    $('.button').hide();
//If the rabbit is dead and the shark is further ahead than the turtle, 
//then the turtle will be attacked.
  } else if((shark.position>=turtle.position) && (rabbit.position === "dead")) {
    turtle.strength -= shark.strength;
    if(turtle.strength>0) {
//If the turtle survives the attack then its strength is reduced
      alert("SHARK ATTACK! The turtle now has " + turtle.strength + " strength.");
      allReport();
//If the turtle does not survive then it is dead and the shark wins.
    } else {
      turtle.position = "dead";
      $('predator').show();
    }
//If the rabbit is dead and the shark is behind the turtle then the console will show
//where they are.
  } else if((shark.position<turtle.position) && (rabbit.position === "dead")) {
    allReport();
//If the turtle is dead and the shark is ahead of the rabbit then the shark attacks the rabit.
  } else if((shark.position>=rabbit.position) && (turtle.position === "dead")) {
    rabbit.strength -= shark.strength;
//If the rabbit survives the attack then its strength is reduced
    if(rabbit.strength>0) {
      alert("SHARK ATTACK! The rabbit now has " + rabbit.strength + " strength.");
      allReport();
//If the rabbit does not survive then it is dead and the shark wins.
    } else {
      rabbit.position = "dead";
      $('predator').show();
      }
//If the turtle is dead and the shark is behind the rabbit then the console will show
//where they are.
  } else if((shark.position<rabbit.position) && (turtle.position === "dead")) {
    allReport();
//If the shark is ahead of the rabbit and not the turtle then it attacks only the rabbit.
  } else if((shark.position>=rabbit.position) && (shark.position<turtle.position)) {
    rabbit.strength -= shark.strength;
//If the rabbit survives the attack its strength is reduced and alerts to the user.
      if(rabbit.strength>0){
      alert("SHARK ATTACK! The rabbit now has " + rabbit.strength + " strength");
      allReport();
//If the rabbit does not survive then it is dead and a photo is shown.
      } else {
        rabbit.position = "dead";
        allReport();
        $('.sharkDeadRabbit').show();
      }
//If the shark is ahead of the turtle and not the rabbit then it attacks the turtle.
  } else if((shark.position>=turtle.position) && (shark.position<rabbit.position)) {
    turtle.strength -= shark.strength;
//If the turtle survives the attack its strength is reduced and alerts to the user.
      if(turtle.strength>0){
      alert("SHARK ATTACK! The turtle now has " + turtle.strength + " strength");
      allReport();
//If the turtle does not survive then it is dead and a photo is shown.
      } else {
        turtle.position = "dead";
        allReport();
        $('.sharkDeadTurtle').show();
      }
//If the shark is ahead of the turtle and the rabbit then it attacks them both.
  } else if((shark.position>=turtle.position) && (shark.position>=rabbit.position)){
    turtle.strength -= shark.strength;
    rabbit.strength -= shark.strength;
//If neither survive then both are dead and the shark wins
      if((turtle.strength<=0) && (rabbit.strength<=0)) {
        turtle.position = "dead";
        rabbit.position = "dead";
        $('button').hide();
        $('predator').show();
        allReport();
//If only the rabbit survives then the turtle is dead and the rabbit has a new strength
//which alerts to the user.
      } else if((turtle.strength<=0) && (rabbit.strength>0)) {
        turtle.position = "dead";
        alert("SHARK ATTACK! The turtle is dead.  The rabbit now has " + rabbit.strength + " strength.");
        allReport();
//If only the turtle survives then the rabbit is dead and the turtle has a new strength
//which alerts to the user
      } else if((turtle.strength>0) && (rabbit.strength<=0)) {
        rabbit.position = "dead";
        alert("SHARK ATTACK! The rabbit is dead.  The turtle now has " + turtle.strength + " strength.");
        allReport();
//If both survive then both have a new strength which alerts to the user
      } else if ((turtle.strength>0) && (rabbit.strength>0)) {
        alert("SHARK ATTACK! The rabbit now has " + rabbit.strength + " strength and the turtle now has " + turtle.strength + " strength.");
        allReport();
      } 
//If the shark remains behind all prey then the console shows where each animal is.
  } else {
    allReport();
  }
    
  }); //this curly parenthesis closes out the button click function
   
}; //this curly parenthesis closes out the jquery function
  $(document).ready(main);