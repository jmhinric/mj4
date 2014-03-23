$(document).ready(function(){
  var round;
  getCategory();

  var intervalId;
  // var time = 6;
  // var score = 12;
  // var answerPoints = [];
  

  function render() {
    var n = 0;
    var timer = $(".timer button"); 
    $.each(round.categoryList, function(index, category) {
      $("<label class='answer-label' id='slot-"+n+"'>"+category+"</label>").appendTo(".playcards");
      $("<input class='playcard' type='text' disabled='disabled' id='answer-"+n+"'>").appendTo("#slot-"+n);
      $("<br>").appendTo(".playcards");
      n++;
    });

    if (round.letter === "") {
      timer.attr("disabled", true);

      $("#die_button").on("click", function() {
        setLetter();
        $("#die_button").attr("disabled", true);
      });
    } else {
      $("#die_button").attr("disabled", true);
    };

    //timer
    if (round.timerStarted == false) {
      timer.attr("disabled", false);
      console.log("first");
      timer.one("click", function() {
        console.log("second")
        // $(".playcard").removeAttr('disabled');
        // intervalId = setInterval(countDown(), 1000);
        // round.startLeft();
      });
    } else {
      console.log("else")
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
    
    if (round.timeLeft === 0) {
      timer.text(":0" + round.timeLeft);
      // timeUp();
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
    round.getAnswers();
    round.autoRejectAnswers();
  }

  


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