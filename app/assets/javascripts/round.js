$(document).ready(function () {
  var intervalId;
  var time = 6;
  var score = 12;
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
    $("<h3>").text("Score: " + score).appendTo(".score");
    usersJudgeAnswers();
  }

  function usersJudgeAnswers() {
    for(var i = 1; i < 13; i++) {
      var button = $("<button>").text("Reject");
      button.attr("id", "reject-" + i);

      var id = "#slot-" + i;
      button.appendTo(id);
      
      $(button).one("click", function() {
        updateScore();

        $(this).css("background", "red");
        $(this).siblings().css("text-decoration", "line-through");
      });
    }
  }

  function updateScore() {
    score--;
    $(".score h3").text("Score: " + score);

  }

  var buttonPress = $("#die_button");

  buttonPress.on("click", function() {
    var letter = $.ajax({
      dataType: "json",
      url: "letter",
      success: function(success) {
        $("#roll_result").text(success.letter);
      }
    });

    buttonPress.attr("disabled", true);
  });

});