(function( $ ) {

    $.fn.mygame = function() {
      const gameObject = this;
      const leftUpConf = [0, 1, 2, 3];
      const rightDownConf = [3, 2, 1, 0];
      let score = 0;
      const time = new Audio('assets/time.mp3');
      let muter = false;
      let paused = true;
      let gameOver = false;

      $('.play').click(function () {
        if (paused === false) {
          time.pause();
          paused = true;
        } else {
          time.play();
          paused = false;
        }
      });

      $('.mute').click(function () {
        if (muter === true) {
          muter = false;
          time.muted = false;
        } else {
          time.muted = true;
          muter = true;
        }
      });

      // Create all 2048 empty boxes;
      const createBox = () => {
        let cont = 0;
        $(gameObject).append("<div id='mainTable'></div>");
        for (let valueX of  leftUpConf) {
          for (let valueY of  leftUpConf) {
            $("#mainTable").append("<div class='grid' x='"+valueX+"' y='"+valueY+"' id ='"+cont+"'></div>");
            cont++;
          }
        }
      };

      const createEmptyContainers = () => {
        $(".grid").append("<div class='empty-container'></div>");
      };

      const yourScore = (calc) => {
        score = score + calc;
        $(".scoreBox").replaceWith("<div class='scoreBox'><span>SCORE</span><div class='score'>"+score+"</div><span class='scoreAddition'></span></div>");
      };

      const updateMergedSum = (mergedSumPerMove) => {
        $(".scoreAddition").replaceWith("<span class='scoreAddition'>+"+mergedSumPerMove+"</span>");
      };

      const randomTwoFour = () => {
          return Math.random() < 0.9 ? 2 : 4;
      };

      const RandomSquare = () => {
        const randSquare = Math.floor(Math.random() * 16);
        const emptySquare = $("#"+randSquare).children().text() === "";
        if (emptySquare) {
          $('#'+randSquare).children().replaceWith("<div class='full-container new-container'>"+randomTwoFour()+"</div>");
        }
        else {
          RandomSquare()}
      };

      $('.newGame').click(() => {
        $(".newGame").hide();
        $("#mainTable").removeClass("mainTableEndGame");
        $('mygame').empty();
        createBox();
        createEmptyContainers();
        RandomSquare();
        RandomSquare();
        $("mygame").fadeIn(1000);
        $(".scoreBox").replaceWith("<div class='scoreBox'><span>SCORE</span><div class='score'>0</div></div>");
        score = 0;
        gameOver = false;
      });

      createBox();
      createEmptyContainers();
      RandomSquare();
      RandomSquare();

      const isFull = () => {
        let full = 0;
        for (let x of  leftUpConf) {
          for (let y of  leftUpConf) {
            const value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
            value !== "" && full++;
          }
        }
        return full === 16;
      };


      function GameOver() {
        let gameIsOver = true;
        if (gameOver === false) {
          for (let x of  leftUpConf) {
            for (let y of  leftUpConf) {
              const value = ($('[x="' + x + '"][y="' + y + '"]')).children().text();
              const sideValue = ($('[x="' + x + '"][y="' + (y + 1) + '"]')).children().text();
              if (value === sideValue) {
                gameIsOver = false;
              }
            }
          }
          for (let x of  rightDownConf) {
            for (let y of  rightDownConf) {
              const value = ($('[x="' + x + '"][y="' + y + '"]')).children().text();
              const sideValue = ($('[x="' + x + '"][y="' + (y - 1) + '"]')).children().text();
              if (value === sideValue) {
                gameIsOver = false;
              }
            }
          }
          for (let y of  leftUpConf) {
            for (let x of  leftUpConf) {
              const value = ($('[x="' + x + '"][y="' + y + '"]')).children().text();
              const sideValue = ($('[x="' + (x + 1) + '"][y="' + y + '"]')).children().text();
              if (value === sideValue) {
                gameIsOver = false;
              }
            }
          }
          for (let y of  rightDownConf) {
            for (let x of  rightDownConf) {
              const value = ($('[x="' + x + '"][y="' + y + '"]')).children().text();
              const sideValue = ($('[x="' + (x - 1) + '"][y="' + y + '"]')).children().text();
              if (value === sideValue) {
                gameIsOver = false;
              }
            }
          }
          if (gameIsOver) {
            gameOver = true;
            $("#mainTable").delay(2000).addClass("mainTableEndGame");
            $(".newGame").delay(2000).fadeIn(1000);
          }
        }
      }

    //if empty spaces remove them and replace by the side value
    const handleBoxMove = (moveConf, increment, isAxis) => {
      let boxHasBeenMoved = false;
      if (isAxis) {
          for (let x of  moveConf) {
            let emptyBoxes = 0;
            for (let y of  moveConf) {
              const boxStringValue = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
              // if box is empty increment emptyBoxes
              if(boxStringValue === ""){
                increment ? emptyBoxes++ : emptyBoxes--;
                // if box is full and I am not in first position
              } else if ((boxStringValue !== "") && (emptyBoxes !== 0)){
                $(($('[x="'+x+'"][y="'+(y+emptyBoxes)+'"]')).children().replaceWith("<div class='full-container tile-"+boxStringValue+"''>"+boxStringValue+"</div>"));
                $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class='empty-container'></div>"));
                boxHasBeenMoved = true;
              }
            }
          }
        } else {
        for (let y of  moveConf) {
          let emptyBoxes = 0;
          for (let x of  moveConf) {
            const boxStringValue = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
            // if box is empty increment emptyBoxes
            if(boxStringValue === ""){
              increment ? emptyBoxes++ : emptyBoxes--;
              // if box is full and I am not in first position
            } else if ((boxStringValue !== "") && (emptyBoxes !== 0)){
              $(($('[x="'+(x+emptyBoxes)+'"][y="'+y+'"]')).children().replaceWith("<div class='full-container tile-"+boxStringValue+"''>"+boxStringValue+"</div>"));
              $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class='empty-container'></div>"));
              boxHasBeenMoved = true;
            }
          }
        }
      }
      return boxHasBeenMoved;
    };

      // handle addition for boxes sharing the same value and standing side by side
      const handleAddition = (moveConf, additionDirection, isAxis) => {
        let mergedBoxSum = 0;
        let boxHasBeenMoved = false;
        if (isAxis) {
          for (let x of moveConf) {
            for (let y of  moveConf) {
              const value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
              const sideValue = ($('[x="'+x+'"][y="'+(y+additionDirection)+'"]')).children().text();
              const calc = value * 2;
              if (value === sideValue && value !== ""){
                $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class='full-container tile-"+calc+"'>"+calc+"</div>"));
                $(($('[x="'+x+'"][y="'+(y+additionDirection)+'"]')).children().replaceWith("<div class='empty-container'></div>"));
                boxHasBeenMoved = true;
                yourScore(calc);
                mergedBoxSum = mergedBoxSum + calc;
              }
            }
          }
        } else {
          for (let y of moveConf) {
            for (let x of  moveConf) {
              const value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
              const sideValue = ($('[x="'+(x+additionDirection)+'"][y="'+y+'"]')).children().text();
              const calc = value * 2;
              if (value === sideValue && value !== ""){
                $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class='full-container tile-"+calc+"''>"+calc+"</div>"));
                $(($('[x="'+(x+additionDirection)+'"][y="'+y+'"]')).children().replaceWith("<div class='empty-container'></div>"));
                boxHasBeenMoved = true;
                yourScore(calc);
                mergedBoxSum = mergedBoxSum + calc;
              }
            }
          }
        }
        if (boxHasBeenMoved) {
          updateMergedSum(mergedBoxSum);
        }
        return boxHasBeenMoved;
      };

      // handle boxes direction
      const moveBoxes = (moveConf, increment, additionDirection, isAxis) => {
        let boxHasBeenMoved = handleBoxMove(moveConf,increment, isAxis);
        let newAddition = handleAddition(moveConf, additionDirection, isAxis);
        newAddition && handleBoxMove(moveConf,increment, isAxis);
        if (boxHasBeenMoved || newAddition){
          RandomSquare();
        }
        isFull() && GameOver();
      };


    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        moveBoxes(leftUpConf, false, 1, true);
        break;

        case 38: // up
        moveBoxes(leftUpConf, false, 1, false);
        break;

        case 39: // right
        moveBoxes(rightDownConf, true, -1, true);
        break;

        case 40: // down
        moveBoxes(rightDownConf, true, -1, false);
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

    //swipe event on mobile
      const startTouch = (e) => {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
      };

      const moveTouch = (e) => {
        if (initialX === null) {
          return;
        }

        if (initialY === null) {
          return;
        }

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = initialX - currentX;
        const diffY = initialY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          // sliding horizontally
          if (diffX > 0) {
            // swiped left
            moveBoxes(leftUpConf, false, 1, true);
          } else {
            // swiped right
            moveBoxes(rightDownConf, true, -1, true);
          }
        } else {
          // sliding vertically
          if (diffY > 0) {
            // swiped up
            moveBoxes(leftUpConf, false, 1, false);
          } else {
            // swiped down
            moveBoxes(rightDownConf, true, -1, false);
          }
        }
        initialX = null;
        initialY = null;
        e.preventDefault();
      };

      let container = document.body;

      container.addEventListener("touchstart", startTouch, false);
      container.addEventListener("touchmove", moveTouch, false);

      // Swipe Up / Down / Left / Right
      let initialX = null;
      let initialY = null;

      return this;

};
}(jQuery));
$( "mygame" ).mygame();
