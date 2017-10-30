$(document).ready(function(){
    //init parameters
    var gui, control, params, isPaused=true;
    var r = $('[id|=row]').length;//row
    var c = $('[id|=box]').length/r;//colomn
    var initMatrix = function(){
        
        var m = new Array(r);//matriks m[i][j]
        for(var i=0; i<r; i++ ){
            m[i]= new Array(c);
        }
        for(var i=0; i<r; i++){
            for(var j=0; j<c; j++){
                m[i][j]=0;
            }
        }
        return m
    }
    var m = initMatrix(), food=null;
    var snake=[];
    var head = '12_18';
    snake.push(head);
    snake.push('12_17');
    snake.push('12_16');
    snake.push('12_15');


    //function
    var iterasi = function(){
        for(var i=0; i<snake.length; i++){
            if(i==0){
                $('#box-'+snake[i]).addClass('head');
                $('#box-'+snake[i+1]).removeClass('head');
            }
            else{
                $('#box-'+snake[i]).addClass('active');
            }
        }
    }
    var random_move = function(){
        var i = parseInt(snake[0].split('_')[0]);
        var j = parseInt(snake[0].split('_')[1]);
        var r = Math.random();
        if (!food){
            if (r<=0.25){
                return i+"_"+(j+1);
            }
            else if (r<=0.5){
                return i+"_"+(j-1);
            }
            else if (r<=0.75){
                return (i-1)+"_"+j
            }
            else{
                return (i+1)+"_"+j;
            }
        }
            
        else{
            var k = parseInt(food.split('_')[0]);
            var l = parseInt(food.split('_')[1]);
            
            if (k>i){
                if (l==j || r>0.5){
                    return (i+1)+"_"+j
                }
                else if (r<=0.5 && l>j){
                    return i+"_"+(j+1)
                }
                else {
                    return i+"_"+(j-1)
                }
            }
            else if (k<i){
                if (l==j || r>0.5){
                    return (i-1)+"_"+j
                }
                else if (r<=0.5 && l>j){
                    return i+"_"+(j+1)
                }
                else {
                    return i+"_"+(j-1)
                }
            }
            else{
                if (l>j){
                    return i+"_"+(j+1)
                }
                else{
                    return i+"_"+(j-1)
                }
            }
        }
        
    }

    var slack = function(h){
        var i = parseInt(h.split('_')[0]) % r;
        var j = parseInt(h.split('_')[1]) % c;
        while (i<0){
            i+=r;
        }
        while (j<0){
            j+=c;
        }
        return i+"_"+j
    }
    var snake_game = function(){
        if(!isPaused){
            var h = random_move();
            h = slack(h);
            if(h==food){
                snake.unshift(h);
                $('#box-'+snake[0]).removeClass('food');
                food=null;
                console.log(snake.length)
            }
            else{
                $('#box-'+snake[snake.length-1]).removeClass('active');
                for (var i=snake.length-1; i>0; i--){
                    snake[i]=snake[i-1];
                }
                snake[0]=h;
            }
            iterasi();
            // console.log(snake[0]);
        }
        requestAnimationFrame(snake_game, control.time*1000);
    };
    $('[id|=box]').click(function(){
        if(!food){
            $(this).addClass('food');
            food = $(this).attr('id').replace('box-', '');
        }
    });

    //loop animation
    var requestAnimationFrame = function(callback, time){
        return  window.setTimeout(callback, time);
    };

    //GUI
    control = {
        time: 0.5,
        play: false,
        message: "checked menu 'play' to play snake game,  and let's see what happen next, and try to customize your snake speed"
    };

    gui = new dat.GUI();
    gui.add(control, 'message');
    gui.add(control, 'time', 0, 1).name('time');
    var play_pause = gui.add(control, 'play');
    play_pause.onChange(function(params){
        isPaused=!params;
    });
    gui.open();

    //init game
    iterasi();

    //snake_game
    snake_game();
})