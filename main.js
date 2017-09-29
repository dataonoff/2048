(function( $ ) {

    $.fn.mygame = function(size) {
      var gameObject = this;
      var blockSize = (size/4)-20;
      var boardSize = size;
      var scoreadd = 0;
      var time = new Audio('Time.mp3');
      var muter = false;
      var paused = true;
      var left;
      var right;
      var up;
      var down;
      var newgame = false;
      var gameover = false;

      $('.play').click(function() {
        if (paused == false) {
      time.pause();
      paused = true;
      } else {
      time.play();
      paused = false;
      }
      });

      $('.mute').click(function(){
        if (muter == true){
          muter = false;
            time.muted = false;
        }
        else{
          time.muted = true;
          muter = true;
        }
      });

      $('.swag').click(function(){
        $(".swag").hide();
        $('mygame').empty();
        CreateBox();
        CreateBoxesIndideTheBox();
        RandomSquare();
        RandomSquare();
        $("mygame").fadeIn(1000);
        $("score").replaceWith("<score class='chiffre'>SCORE: 0</score>");
        newgame = true;
        gameover = false;
        });

      CreateBox();
      CreateBoxesIndideTheBox();
      RandomSquare();
      RandomSquare();


      function GameOver(){
        var full = 0;
        var scan = 0;
        if (gameover == false){
        for(var x=0;x<=3;x++){
            for(var y=0;y<=3;y++){
              var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
               var valueafterme = ($('[x="'+x+'"][y="'+(y+1)+'"]')).children().text();
              if (value != ""){
                full++;
                console.log(full);
              }}}
                if (full == 16){
                  for(var x=0;x<=3;x++){
                      for(var y=0;y<=3;y++){
                        var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
                         var valueafterme = ($('[x="'+x+'"][y="'+(y+1)+'"]')).children().text();
                         if (value == valueafterme){
                           scan++;
                         }}}
                         for(var x=3;x>=0;x--){
                             for(var y=3;y>=0;y--){
                               var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
                               var valueafterme = ($('[x="'+x+'"][y="'+(y-1)+'"]')).children().text();
                               if (value == valueafterme){
                                 scan++;
                               }}}
                               for(var y=0;y<=3;y++){
                                   for(var x=0;x<=3;x++){
                                     var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
                                     var valueafterme = ($('[x="'+(x+1)+'"][y="'+y+'"]')).children().text();
                                    if (value == valueafterme){
                                      scan++;
                                    }}}
                                    for(var y=3;y>=0;y--){
                                        for(var x=3;x>=0;x--){
                                          var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
                                          var valueafterme = ($('[x="'+(x-1)+'"][y="'+y+'"]')).children().text();
                                          if (value == valueafterme){
                                            scan++;
                                          }}}
                                          if (scan == 0){
                                            gameover = true;
                                            $( "mygame" ).delay( 1500 ).fadeOut( 800 );
                                            $(".swag").delay(2300).fadeIn(1000);
                                          }
                                          }
                                        }
                                        };


      function YourScore(calc){
        if (newgame == false){
        scoreadd = scoreadd + calc;
        $("score").replaceWith("<score class='chiffre'>SCORE: "+scoreadd+"</score>");
      }
      else{
        scoreadd = 0;
        scoreadd = scoreadd + calc;
        $("score").replaceWith("<score class='chiffre'>SCORE: "+scoreadd+"</score>");
        newgame = false;
      }
    };

      //2048, Box creation background-color: rgba(0, 0, 255, 0.5);
      function CreateBox(){
        var cont = 0;
        $(gameObject).append("<div id = 'maintable' style ='width:"+boardSize+"px; height:"+boardSize+"px'; position: relative></div>");
          for (var x = 0; x <=3; x++){
            for (var y = 0; y <=3; y ++){
              $("#maintable").append("<div class='grid' x ='"+x+"' y ='"+y+"' id = '"+cont+"' style = 'width:25%; height:25%; float: left'></div>");
              cont++;
            }
          }
      };

      function CreateBoxesIndideTheBox(){
        $(".grid").append("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0; margin:10px; border-radius: 10px; float: left'></div>");
    };

    function randomTwoFour(){
        var randSquare =Math.floor(Math.random() *2+1);
        if(randSquare==1){
            return 2;
        }else{return 4};
    };

      function RandomSquare(){
        var randSquare = Math.floor(Math.random() * 16);
        var str = $("#"+randSquare).children().text();
        if(str==""){
          $('#'+randSquare).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; opacity:0.8; border-radius: 10px; margin:10px; float: left'>"+randomTwoFour()+"</div>");
      }else{RandomSquare()}
    };

    function MoveOnLeft(){
      var leftmovenumber = 0;
      var leftcalcnumber = 0;
        for(var x=0;x<=3;x++){
            var count = 0;
            for(var y=0;y<=3;y++){
                var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
               if(str == ""){
                count++;
            }else if ((str != "") && (count == 0)){
                $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
              }else{
                $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; border-radius: 10px; background-color:white; margin:10px; float: left'>"+str+"</div>"));
                $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
                leftmovenumber++;
            }
        }
    }
        for(var x=0;x<=3;x++){
        var count = 1;
        for(var y=0;y<=3;y++){
          var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
          var valueafterme = ($('[x="'+x+'"][y="'+(y+count)+'"]')).children().text();
          var calc = value * 2;
          if( value != valueafterme){
          }
          else if (value == ""){
          }
          else if (value == valueafterme){
            //alert("if egaux : value:" + value +" valueafterme:" + valueafterme +" y:"+ y +" count:"+ count);
            $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+calc+"</div>"));
            $(($('[x="'+x+'"][y="'+(y+count)+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
            leftcalcnumber++;
            YourScore(calc);
          }
        }
    }
    for(var x=0;x<=3;x++){
        var count = 0;
        for(var y=0;y<=3;y++){
            var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
           if(str == ""){
            count++;
        }else if ((str != "") && (count == 0)){
            $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
          }else{
            $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
            $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
        }
    }
}
    if ((leftcalcnumber > 0) || (leftmovenumber > 0)){
      RandomSquare();
    }
    GameOver();
};

function MoveOnRight(){
  var rightmovenumber = 0;
  var rightcalcnumber = 0;
    for(var x=3;x>=0;x--){
        var count = 0;
        for(var y=3;y>=0;y--){
            var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
           if(str == ""){
            count++;
        }else if ((str != "") && (count == 0)){
            $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
          }else{
            $(($('[x="'+x+'"][y="'+(y+count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
            $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
            rightmovenumber++
        }
    }
}
for(var x=3;x>=0;x--){
  var count = 1;
    for(var y=3;y>=0;y--){
      var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
      var valueafterme = ($('[x="'+x+'"][y="'+(y-count)+'"]')).children().text();
      var calc = value * 2;

      if( value != valueafterme){
        //alert("if value differend de value afterme: value: " + value + " valueafterme: " + valueafterme + " y:" +y + " count:"+ count);
      }
      else if (value == ""){
        //alert("if value = rien: value :" + value + " valueafterme:"+ valueafterme +" y:"+ y +" count:"+ count);
      }
      else if (value == valueafterme){
        //alert("if egaux : value:" + value +" valueafterme:" + valueafterme +" y:"+ y +" count:"+ count);
        $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+calc+"</div>"));
        $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
        rightcalcnumber++;
        YourScore(calc);
      }
    }
}
for(var x=3;x>=0;x--){
    var count = 0;
    for(var y=3;y>=0;y--){
        var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
       if(str == ""){
        count++;
    }else if ((str != "") && (count == 0)){
        $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
      }else{
        $(($('[x="'+x+'"][y="'+(y+count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
        $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
        rightmovenumber++
    }
}
}
if ((rightcalcnumber > 0) || (rightmovenumber > 0)){
  RandomSquare();
}
};

function MoveUp(){
  var upmovenumber = 0;
  var upcalcnumber = 0;
    for(var y=0;y<=3;y++){
        var count = 0;
        for(var x=0;x<=3;x++){
            var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
           if(str == ""){
            count++;
        }else if ((str != "") && (count == 0)){
            $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
          }else{
            $(($('[x="'+(x-count)+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
            $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
            upmovenumber++;
        }
    }
}
for(var y=0;y<=3;y++){
  var count = 1;
    for(var x=0;x<=3;x++){
      var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
      var valueafterme = ($('[x="'+(x+count)+'"][y="'+y+'"]')).children().text();
      var calc = value * 2;

      if( value != valueafterme){
        //alert("if value differend de value afterme: value: " + value + " valueafterme: " + valueafterme + " y:" +y + " count:"+ count);
      }
      else if (value == ""){
        //alert("if value = rien: value :" + value + " valueafterme:"+ valueafterme +" y:"+ y +" count:"+ count);
      }
      else if (value == valueafterme){
        //alert("if egaux : value:" + value +" valueafterme:" + valueafterme +" y:"+ y +" count:"+ count);
        $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+calc+"</div>"));
        $(($('[x="'+(x+count)+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
        upcalcnumber++;
        YourScore(calc);
      }
    }
}
for(var y=0;y<=3;y++){
    var count = 0;
    for(var x=0;x<=3;x++){
        var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
       if(str == ""){
        count++;
    }else if ((str != "") && (count == 0)){
        $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
      }else{
        $(($('[x="'+(x-count)+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
        $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
    }
}
}
if ((upmovenumber > 0) || (upcalcnumber > 0)){
  RandomSquare();
}
};

function MoveDown(){
  var downmovenumber = 0;
  var downcalcnumber = 0;
    for(var y=3;y>=0;y--){
        var count = 0;
        for(var x=3;x>=0;x--){
            var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
           if(str == ""){
            count++;
        }else if ((str != "") && (count == 0)){
            $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
          }else{
            $(($('[x="'+(x+count)+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
            $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
            downmovenumber++;
        }
    }
}
for(var y=3;y>=0;y--){
  var count = 1;
    for(var x=3;x>=0;x--){
      var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
      var valueafterme = ($('[x="'+(x-count)+'"][y="'+y+'"]')).children().text();
      var calc = value * 2;

      if( value != valueafterme){
        //alert("if value differend de value afterme: value: " + value + " valueafterme: " + valueafterme + " y:" +y + " count:"+ count);
      }
      else if (value == ""){
        //alert("if value = rien: value :" + value + " valueafterme:"+ valueafterme +" y:"+ y +" count:"+ count);
      }
      else if (value == valueafterme){
        //alert("if egaux : value:" + value +" valueafterme:" + valueafterme +" y:"+ y +" count:"+ count);
        $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+calc+"</div>"));
        $(($('[x="'+(x-count)+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
        downcalcnumber++;
        YourScore(calc);
      }
    }
}
for(var y=3;y>=0;y--){
    var count = 0;
    for(var x=3;x>=0;x--){
        var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
       if(str == ""){
        count++;
    }else if ((str != "") && (count == 0)){
        $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
      }else{
        $(($('[x="'+(x+count)+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; border-radius: 10px; margin:10px; float: left'>"+str+"</div>"));
        $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; border-radius: 10px; margin:10px; float: left'></div>"));
    }
}
}
if ((downcalcnumber >0) || (downmovenumber > 0)){
  RandomSquare();
}
};

    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        MoveOnLeft();
        GameOver();
        break;

        case 38: // up
        MoveUp();
        GameOver();
        break;

        case 39: // right
        MoveOnRight();
        GameOver();
        break;

        case 40: // down
        MoveDown();
        GameOver();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


return this;
};
}(jQuery));
$( "mygame" ).mygame(500);
