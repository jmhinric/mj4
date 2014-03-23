$(document).ready(function(){
  var categoryList;
  getCategory();
  var round = new Round(categoryList);
  render();

  function render() {
    

    
  }



  var letter;
  setLetter();
  round.setRoundLetter(letter);

  function getCategory(){
    $.ajax({
      dataType: "json",
      url: "category",
      data: {id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        categoryList = success.category_list;
      }
    });
  }

  function setLetter() {
    $.ajax({
      dataType: "json",
      url: "letter",
      data: {id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        $(".timer button").attr("disabled", false);
        $("#die_button").attr("disabled", true);
        $("#roll_result").text(success.letter);
        letter = success.letter;
      }
    });
  }

  // var intervalId;
  // var time = 6;
  // var score = 12;
  // var answerPoints = [];
  

  // var randomLetterButton = $("#die_button");
  // randomLetterButton.on("click", function() {
  //   round.setLetter();
  // });


  // var timer = $(".timer button");
  // timer.attr("disabled", true);
  // timer.one("click", function() {
  //   $(".playcard").removeAttr('disabled');
  //   intervalId = setInterval(countDown, 1000);
  // });

  // function countDown() {
  //   time -= 1;
    
  //   if (time === 0) {
  //     timer.text(":0" + time);
  //     timeUp();
  //   } else if(time < 10) {
  //     timer.text(":0" + time);
  //   } else {
  //     timer.text(":" + time);
  //   }
  // }

  // function timeUp() {
  //   clearInterval(intervalId);
  //   $("header").text("Time's Up!!!");
  //   $(".playcard").attr("disabled", "disabled");
  //   round.getAnswers();
  //   round.autoRejectAnswers();
  // }

  


// Use some logic and code from this function for the Ruby Round class auto_reject method
  // function rejectBadAnswers() {
  //   for(var i = 1; i < 13; i++) {
  //     var randomLetter = $("#roll_result").text();
  //     if ( $('#answer-' + i).val() == "" ) {
  //       $('#reject-' + i).addClass("rejected-button");
  //       $('#reject-' + i).siblings().addClass("rejected-input");
  //       $('#reject-' + i).attr("disabled", "disabled");
  //       answerPoints[i - 1] = 0;
  //     } else if ( $('#answer-' + i).val().charAt(0).toLowerCase() !== randomLetter ) {
  //       $('#reject-' + i).addClass("rejected-button");
  //       $('#reject-' + i).siblings().addClass("rejected-input");
  //       $('#reject-' + i).attr("disabled", "disabled");
  //       answerPoints[i - 1] = 0;
  //     } else {
  //       answerPoints[i - 1] = 1;
  //     }

  //     updateScore();
  //   }
  // }

 

  // function updateScore() {
  //   var rejected = $(".rejected-button").length;
  //   finalScore = 12 - rejected;

  // }

});