(function( $ ) {

    $.fn.mygame = function(size) {
      var gameObject = this;
      var blockSize = (size/4)-20;
      var boardSize = size;

      CreateBox();
      CreateBoxesIndideTheBox();
      RandomSquare();
      RandomSquare();
      RandomSquare();
      RandomSquare();
      RandomSquare();
      RandomSquare();
      RandomSquare();
      RandomSquare();

      //2048, Box creation
      function CreateBox(){
        var cont = 0;
        $(gameObject).append("<div id = 'maintable' style ='width:"+boardSize+"px; height:"+boardSize+"px'; position: relative></div>");
          for (var x = 0; x <=3; x++){
            for (var y = 0; y <=3; y ++){
              $("#maintable").append("<div class='grid' x ='"+x+"' y ='"+y+"' id = '"+cont+"' style = 'width:25%; height:25%; background-color:lightblue; float: left'></div>");
              cont++;
            }
          }
      };

      function CreateBoxesIndideTheBox(){
        $(".grid").append("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0; margin:10px; float: left'></div>");
    };

    function randomTwoFour(){
        var randSquare =Math.floor(Math.random() *2+1);
        if(randSquare==1){
            return 2;
        }else{return 4};
    };

      function RandomSquare(){
        var randSquare =Math.floor(Math.random() * 16);
        var str = $("#"+randSquare).children().text();
        if(str==""){
          $('#'+randSquare).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; margin:10px; float: left'>"+randomTwoFour()+"</div>");
      }else{RandomSquare()}
    };

    function MoveOnLeft(){
        for(var x=0;x<=3;x++){
            var count = 0;
            for(var y=0;y<=3;y++){
                var str = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
               if(($('[x="'+x+'"][y="'+y+'"]')).children().text()==""){
                count++;
            }else if (($('[x="'+x+'"][y="'+y+'"]')).children().text()!="" && count == 0 ){
                $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; margin:10px; float: left'>"+str+"</div>"));
              }else{
                $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; margin:10px; float: left'>"+str+"</div>"));
                $(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; margin:10px; float: left'></div>"));
            }
        }
    }

    for(var x=0;x<=3;x++){
      var count = 0;
        for(var y=0;y<=3;y++){
          var value = ($('[x="'+x+'"][y="'+y+'"]')).children().text();
          var calc = value * 2;
          count++;
          if(($('[x="'+x+'"][y="'+y+'"]')).children().text()!=($('[x="'+x+'"][y="'+(y+count)+'"]')).children().text()){
            break;
          }else if (($('[x="'+x+'"][y="'+y+'"]')).children().text()==($('[x="'+x+'"][y="'+(y+count)+'"]')).children().text()){
            $(($('[x="'+x+'"][y="'+(y)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; margin:10px; float: left'>"+calc+"</div>"));
            $(($('[x="'+x+'"][y="'+(y+count)+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; margin:10px; float: left'></div>"));
          }
       //}else if (($('[x="'+x+'"][y="'+y+'"]')).children().text()!="" && count == 0 ){
        //   $(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; margin:10px; float: left'>"+str+"</div>"));
         //}else{
           //$(($('[x="'+x+'"][y="'+(y-count)+'"]')).children().replaceWith("<div class = 'full-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:white; margin:10px; float: left'>"+str+"</div>"));
           //$(($('[x="'+x+'"][y="'+y+'"]')).children().replaceWith("<div class = 'empty-container' style ='width:"+blockSize+"px; height:"+blockSize+"px; background-color:#6F82D0 ; margin:10px; float: left'></div>"));
       //}
        }
    }
};


    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        MoveOnLeft();

        break;

        case 38: // up
        break;

        case 39: // right
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
return this;
};
}(jQuery));
$( "mygame" ).mygame(500);
