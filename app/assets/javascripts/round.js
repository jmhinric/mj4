$(document).ready(function () {

  var categoryLists = {};
  categoryLists["listOne"] = ["A boy's name", "A river", "An animal", "Things that are cold", "Insects", "TV Shows", "Things that grow", "Fruits", "Things that are black", "School subjects", "Movie Titles", "Musical Instruments"];



  function createCategories() {
    $.each(categoryLists["listOne"], function(index, category) {
      $("<li>").text(category).appendTo(".category-names");
    });
  }

  createCategories();

  function createButton() {
    var dieButton = $("<button>").attr("id", "die_button").text("Roll The Die");
    $(".die").append(dieButton);
  }
  createButton();

  function randomLetter() {
    var buttonPress = $("#die_button");
    buttonPress.on("click", function() {

    });
  }
});