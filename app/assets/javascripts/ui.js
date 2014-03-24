$(document).ready(function(){
  var round;
  getCategory();

  var intervalId;
  // var time = 6;
  // var score = 12;
  // var answerPoints = [];
  timer = $(".timer button"); 
  

  function render() {
    var n = 0;

    // When the game initializes
    if (round.letter === "") {

      // List out all the categories and add input tags
      $.each(round.categoryList, function(index, category) {
        $("<label class='answer-label' id='slot-"+n+"'>"+category+"</label>").appendTo(".playcards");
        $("<input class='playcard' type='text' disabled='disabled' id='answer-"+n+"'>").appendTo("#slot-"+n);
        $("<br>").appendTo(".playcards");
        n++;
      });

      // Timer is disabled until the letter is selected
      timer.attr("disabled", true);

      // 
      $("#die_button").on("click", function() {
        setLetter();
      });

    } else {
      $("#die_button").attr("disabled", true);
    };

    // timer
    if (round.timerStarted === false) {
      
      console.log("first");
      timer.one("click", function() {
        console.log("second");
        $(".playcard").attr('disabled', false);
        intervalId = setInterval(countDown, 1000);
        // round.startTimer();
      });
    } else {
      console.log("else");
    }

    // When the timer has run out:
    if (round.timeLeft === 0) {
      timeUp();
    }
  }
  
  function getCategory(){
    $.ajax({
      dataType: "json",
      url: "category",
      data: {id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        round = new Round(success.category_list);
        render();
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
        round.setRoundLetter(success.letter);
      }
    });
  }


  function countDown() {
    round.timeLeft -= 1;
    console.log(round.timeLeft);
    
    if (round.timeLeft === 0) {
      timer.text(":0" + round.timeLeft);
      render();
    } else if(round.timeLeft < 10) {
      timer.text(":0" + round.timeLeft);
    } else {
      timer.text(":" + round.timeLeft);
    }
  }

  function timeUp() {
    clearInterval(intervalId);
    $("header").text("Time's Up!!!");
    $(".playcard").attr("disabled", "disabled");
    getAnswers();
    autoRejectAnswers();
  }

  // Take the player's answers from the input fields and store them in the round's answers
  function getAnswers() {
    for(var i = 0; i < 12; i++) {
      round.submitAnswer(i, $('#answer-' + i).val());
    }
  }

  // Take the player's answers and:
  //    1)  Score blank answers as 0
  //    2)  Score answers that don't start with the round's letter as 0
  function autoRejectAnswers() {
    $.ajax({
      dataType: "json",
      url: "auto_reject",
      data: {answers: round.answers, id: window.location.pathname.replace("/rounds/", "")},
      success: function(success) {
        for (var j = 0; j < 12; j++) {
          round.scores[j] = success["scores"][j];
        }
        usersJudgeAnswers();
          
      }
        // round.updateRejectedStyles();
        // round.finishScoring();
        // rejectBadAnswers();
      // }
    });
  };


  // Add reject buttons
  function usersJudgeAnswers() {

    for(var i = 1; i < 13; i++) {
      var button = $("<button>").text("Reject");
      button.addClass("reject-button");
      button.attr("id", "reject-" + i);

      var id = "#slot-" + i;
      button.appendTo(id);
      
      $(button).on("click", function() {
        $(this).toggleClass("rejected-button");
        $(this).siblings().toggleClass("rejected-input");
        // updateScore();
      });
    }
  };



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