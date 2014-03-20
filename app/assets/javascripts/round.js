$(document).ready(function () {
  var intervalId;
  var time = 3;
  // var categoryLists = {};
  // categoryLists["listOne"] = ["A boy's name", "A river", "An animal", "Things that are cold", "Insects", "TV Shows", "Things that grow", "Fruits", "Things that are black", "School subjects", "Movie Titles", "Musical Instruments"];



  // function createCategories() {
  //   $.each(categoryLists["listOne"], function(index, category) {
  //     $("<li>").text(category).appendTo(".category-names");
  //   });
  // }
  // createCategories();
  var timer = $(".timer button");
  timer.one("click", function() {
    intervalId = setInterval(countDown, 1000);
    });

  function countDown() {
    time -= 1;
    
    if (time === 0) {
      timer.text(":0" + time);
      timeUp();
    } else if(time < 10) {
      timer.text(":0" + time);
    } else {
      timer.text(":" + time);
    }
  }

  function timeUp() {
    clearInterval(intervalId);
    $("header").text("Time's Up!!!");
    $(".playcard").attr("disabled", "disabled");
  }

  function createButton() {
    var dieButton = $("<button>").attr("id", "die_button").text("Roll The Die");
    $(".die").append(dieButton);
  }
  createButton();

  function randomLetter() {
    var buttonPress = $("#die_button");
    buttonPress.on("click", function() {

  };
});