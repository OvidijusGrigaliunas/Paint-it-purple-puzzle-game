var socket = io()
var filledSquareCounter = 0;
var SquareNumber = 0;
var currentLevel = 1;
var ylenght = 0;
var xlenght = 0;
var blockageCount = 0;
var prisonedCount = 0;
var userName;
var maxLevel = localStorage.getItem('MaxLevelReached');
if(!localStorage.getItem('Volume')){
    localStorage.setItem('Volume', 7);
}
socket.on('curConnected', userList => {
    document.getElementById('currentOn').innerHTML='';
    for(i=0; i<userList.length; i++){
        let g = document.createElement('li');
        g.textContent=userList[i]
        document.getElementById('currentOn').appendChild(g);

    }
    

})
var currentVolume = parseInt(localStorage.getItem('Volume'));
window.addEventListener('load', (event) => {
    loadLevel();
    document.getElementById('musicAudio').volume= currentVolume/10;
    if(!localStorage.getItem('userName')){
        userName = prompt("Please enter your name");
        localStorage.setItem('userName', userName)
        socket.emit('updateList', userName);
    }
    else{
        userName = localStorage.getItem('userName');
        socket.emit('updateList', userName);
    }



});

function levelSelect(){
    document.getElementById('mainScreen').style.visibility = 'hidden';
    document.getElementById('levelSelect').style.visibility = 'visible';
    maxLevel = localStorage.getItem('MaxLevelReached');
    for (var i = 0; i < 9; i++){
        var g = document.createElement('button');
        g.innerHTML = `${i+1}`
        if (maxLevel>i || i==0){
            g.setAttribute("onclick", `loadStartinglevel(${i+1})`);
            g.className = 'levelSquare'
        }
        else{
            g.className = 'LockedlevelSquare'

        }
        document.getElementById('levelSelectionScreen').appendChild(g);
    }

}
function loadStartinglevel(selectedLevel){
    currentLevel = selectedLevel;
    loadLevel();
    document.getElementById('levelSelect').style.visibility = 'hidden';
    document.getElementById('levelSelectionScreen').innerHTML='';

}
function returntomenu(){
    document.getElementById('mainScreen').style.visibility = 'visible';
    document.getElementById('settingsWindow').style.visibility = 'hidden';

    
}
function ShowSettingsWindow(){
    document.getElementById('mainScreen').style.visibility = 'hidden';
    document.getElementById('settingsWindow').style.visibility = 'visible';
    loadVolumeSettings();
    

}
function loadVolumeSettings(){
    document.getElementById('volumesettings').innerHTML='';
    currentVolume = localStorage.getItem('Volume');
    for (var i = 0; i < 11; i++){
        var g = document.createElement('button');
        g.innerHTML = ``
        g.setAttribute("onclick", `setVolume(${i})`);
        if (currentVolume>i || i ==currentVolume){
            
            g.className = 'volumeBar0'
        }
        else{
            g.className = 'volumeBar1'

        }
        document.getElementById('volumesettings').appendChild(g);
    }
}
function setVolume(volumeValue){
    localStorage.setItem('Volume', volumeValue);
    document.getElementById('musicAudio').volume= volumeValue/10;
    loadVolumeSettings()

}
function loadLevel(){
    document.getElementById('mainDiv').innerHTML='';
    document.getElementById('puzzlePiecesHolder').innerHTML='';
    document.getElementById('tutorial').innerHTML='';
    document.getElementById('tutorial').append('Current level: '+currentLevel);
    

    

    switch(currentLevel){

        case 1:{
            document.getElementById('mainDiv').style.gridTemplateColumns = 'repeat(9, 4rem)'
            ylenght=9;
            xlenght=9;
            for (var i = 0; i < 9; i++){
                for (var a = 0; a < 9; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("ondrop", `drop(event)`);
                    g.setAttribute("ondragover", `allowDrop(event)`);
                    g.className = 'EmptySquare'
                    document.getElementById('mainDiv').appendChild(g);
                }
            }
            var a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceVertical`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `Verti`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
        
            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceHorizontal`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `Hori`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
        
            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalX`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `X`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
        
            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceStar`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `*`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
            
            for(var i =1; i<10;i++){
                for(var j = 1; j<10; j++){
                    switch(i){
                        case 1:{
                            if((j > 1 && j < 5)|| (j > 5 && j < 9)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 2:{
                            if((j > 2 && j < 5)|| (j > 5 && j < 8) || j==9){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 3:{
                            if(j==2 || j==4 || j==6 || (j>7 && j <10)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 4:{
                            if((j>1 && j <4) || (j>6 && j <10)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 6:{
                            if((j>1 && j <4) || (j>6 && j <10)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 7:{
                            if(j==2 || j==4 || j==6 || (j>7 && j <10)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;

                        }
                        case 8:{
                            if((j > 2 && j < 5)|| (j > 5 && j < 8) || j==9){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                            
                        }
                        default:{
                            break;
                        }
                    }
                }
            }
            break;
        }
        case 2:{
            document.getElementById('mainDiv').style.gridTemplateColumns = 'repeat(12, 4rem)'
            ylenght=9;
            xlenght=12;
            for (var i = 0; i < 9; i++){
                for (var a = 0; a < 12; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("ondrop", `drop(event)`);
                    g.setAttribute("ondragover", `allowDrop(event)`);
                    g.className = 'EmptySquare'
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            var a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceVertical`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `Verti`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
        
            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceHorizontal`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `Hori`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
        
            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalX`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `X`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalX1`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `X`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalX2`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `X`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
            for(var i =1; i<10;i++){
                for(var j = 1; j<13; j++){
                    switch(i){
                        case 1:{
                            if((j > 3 && j < 7) || (j > 9 && j < 13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 2:{
                            if(j==1 || (j > 3 && j < 7)|| (j > 8 && j < 13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 3:{
                            if(j==2 || j==5 || (j>9 && j <13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 4:{
                            if((j>0 && j <4) || j==7 || j==9 || (j>10 && j <13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 5:{
                            if((j>0 && j <4) || j==7 || j==12 || (j>8 && j <11)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 6:{
                            if((j>0 && j <3) || j==5 || (j>8 && j <12)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 7:{
                            break;

                        }
                        case 8:{
                            if((j > 2 && j < 9)|| (j > 9 && j < 13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                            
                        }
                        case 9:{
                            if((j > 1 && j < 10)|| (j > 10 && j < 13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        default:{
                            break;
                        }
                    }
                }
            }
            
            break;
        }
        case 3:{
            document.getElementById('mainDiv').style.gridTemplateColumns = 'repeat(6, 4rem)'
            ylenght=4;
            xlenght=6;
            for (var i = 0; i < 4; i++){
                for (var a = 0; a < 6; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("ondrop", `drop(event)`);
                    g.setAttribute("ondragover", `allowDrop(event)`);
                    g.className = 'EmptySquare'
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            var a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceVertical`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `Verti`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
        
            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceStar`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `*`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);


            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceCross`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `+`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            document.getElementById(`squareY1X5`).style.visibility='hidden';

            document.getElementById(`squareY3X5`).style.visibility='hidden';


            break;
        }
        case 4:{
            document.getElementById('mainDiv').style.gridTemplateColumns = 'repeat(6, 4rem)'
            ylenght=6;
            xlenght=6;
            blockageCount = 1;
            for (var i = 0; i < 6; i++){
                for (var a = 0; a < 6; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.className = 'EmptySquare'
                    if(i==0 && a==5){
                        
                        var blockage = document.createElement('div')
                        blockage.innerHTML = 'Vertical'
                        blockage.style.backgroundColor = 'red';
                        blockage.setAttribute("id", `Blockage1`);
                        blockage.className = 'Blockage'
                        
                        g.appendChild(blockage);

                    }
                    else if (i > 0 && a==5){

                        g.style.backgroundColor = 'white'
                    }
                    else{
                        g.setAttribute("ondrop", `drop(event)`);
                        g.setAttribute("ondragover", `allowDrop(event)`);
                    }
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            var a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceHorizontal`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `Hori`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceStar`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `*`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);
            for(var i =1; i<7;i++){
                for(var j = 1; j<7; j++){
                    switch(i){
                        case 2:{
                            if(j!=4 && j!=6){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 3:{
                            if(j<5){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 5:{
                            if(j<5){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }
                        case 6:{
                            if(j!=4 && j!=6){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden';
                            }
                            break;
                        }

                        default:{
                            break;
                        }
                    }
                }
            }

            break;
        }
        case 5:{
            document.getElementById('mainDiv').style.gridTemplateColumns = 'repeat(12, 4rem)'
            ylenght=8;
            xlenght=12;
            blockageCount = 1;
            for (var i = 0; i < 8; i++){
                for (var a = 0; a < 12; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.className = 'EmptySquare'
                    if(i==6 && a==1){
                        
                        var blockage = document.createElement('div')
                        blockage.innerHTML = 'Horizontal'
                        blockage.style.backgroundColor = 'red';
                        blockage.setAttribute("id", `BlockageHorizontal`);
                        blockage.className = 'Blockage'
                        
                        g.appendChild(blockage);

                    }
                    else if (i == 6 && a!=1){

                        g.style.backgroundColor = 'white'
                    }
                    else{
                        g.setAttribute("ondrop", `drop(event)`);
                        g.setAttribute("ondragover", `allowDrop(event)`);
                    }
                
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            var a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalX1`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `X`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceCross`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `+`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceStar1`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `*`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceStar2`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `*`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            for(var i =1; i<9;i++){
                for(var j = 1; j<13; j++){
                    switch(i){
                        case 1:{
                            if(j!=2){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 4:{
                            if(j==2 || j==3 || (j>5)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                            

                        }
                        case 5:{
                            if(j==1 || j==3 || j>5){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 6:{
                            if(j== 1 || j==2 || j==4 || (j>5 && j<8) || (j>10 && j < 13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 7:{
                            if(j==1){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 8:{
                            if((j > 1 && j < 5)||(j > 5 && j < 8) || j > 10){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }

                        default:{
                            break;
                        }
                    }
                }
            }

            break;
        }
        case 6:{
            document.getElementById('mainDiv').style.gridTemplateColumns = 'repeat(9, 4rem)'
            ylenght=9;
            xlenght=9;
            blockageCount = 2;
            for (var i = 0; i < 9; i++){
                for (var a = 0; a < 9; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.className = 'EmptySquare'
                    if(i==6 && a==1){
                        
                        var blockage = document.createElement('div')
                        blockage.innerHTML = 'Horizontal'
                        blockage.style.backgroundColor = 'red';
                        blockage.setAttribute("id", `BlockageHorizontal`);
                        blockage.className = 'Blockage'
                        
                        g.appendChild(blockage);

                    }
                    else if(i==6 && a==6){
                        g.style.backgroundColor='white';
                        var blockage = document.createElement('div')
                        blockage.innerHTML = 'Vertical'
                        blockage.style.backgroundColor = 'red';
                        blockage.setAttribute("id", `BlockageVertical`);
                        blockage.className = 'Blockage'
                        
                        g.appendChild(blockage);

                    }
                    else if (i != 6 && a==6){

                        g.style.backgroundColor = 'white'
                    }
                    else if (i == 6 && a!=1){

                        g.style.backgroundColor = 'white'
                    }
                    else{
                        g.setAttribute("ondrop", `drop(event)`);
                        g.setAttribute("ondragover", `allowDrop(event)`);
                    }
                
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            var a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalRight`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= "/"
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalRight1`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= "/"
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);


            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceCross`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `+`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceCross1`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `+`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceDiagonalX`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= `X`
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);


            for(var i =1; i<ylenght+1;i++){
                for(var j = 1; j<xlenght+1; j++){
                    switch(i){
                        case 2:{
                            if(j== 9 || (j>2 && j < 7)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 3:{
                            if(j== 2 || (j>3 && j < 6) || (j>7 && j < 10)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 4:{
                            if((j>1 && j < 4) || (j>7 && j < 10)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 5:{
                            if((j>1 && j < 4) || j==6 || j==8){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 6:{
                            if(j==2 || j==5 || j==9){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 8:{
                            if((j>2 && j < 6) ||  j==9){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 9:{
                            if((j>1 && j < 5) ||  j==6 || j==8){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        default:{
                            break;
                        }
                    }
                }
            }

            break;
        }

        case 7:{
            ylenght=5;
            xlenght=5;
            document.getElementById('mainDiv').style.gridTemplateColumns = `repeat(${xlenght}, 4rem)`
            blockageCount = 0;
            prisonedCount = 1;
            for (var i = 0; i < ylenght; i++){
                for (var a = 0; a < xlenght; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.className = 'EmptySquare'
                    if(i==0 && a==4){
                        var prison = document.createElement('div');
                        prison.innerHTML = '+';
                        prison.setAttribute("id", `PrisonCross`);
                        prison.className = 'Prison';
                        g.appendChild(prison);

                    }
                    else{
                    g.setAttribute("ondrop", `drop(event)`);
                    g.setAttribute("ondragover", `allowDrop(event)`);
                    }
                
                
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceHorizontal`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= "Hori"
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            for(var i =1; i<ylenght+1;i++){
                for(var j = 1; j<xlenght+1; j++){
                    switch(i){
                        case 2:{
                            if((j>0 && j < 3) || (j>3 && j < 6)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 4:{
                            if((j>0 && j < 3) || (j>3 && j < 6)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 5:{
                            if((j>0 && j < 3) || (j>3 && j < 6)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        default:{
                            break;
                        }
                    }
                }
            }

            break;
        }
        case 8:{
            ylenght=8;
            xlenght=6;
            document.getElementById('mainDiv').style.gridTemplateColumns = `repeat(${xlenght}, 4rem)`
            blockageCount = 1;
            prisonedCount = 2;
            for (var i = 0; i < ylenght; i++){
                for (var a = 0; a < xlenght; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.className = 'EmptySquare'
                    if(i==2 && a==2){
                        var prison = document.createElement('div');
                        prison.innerHTML = 'X';
                        prison.setAttribute("id", `PrisonDiagonalX`);
                        prison.className = 'Prison';
                        g.appendChild(prison);
                        g.style.backgroundColor='white';
                    }
                    else if(i==7 && a==2){
                        var prison = document.createElement('div');
                        prison.innerHTML = 'X';
                        prison.setAttribute("id", `PrisonDiagonalX`);
                        prison.className = 'Prison';
                        g.appendChild(prison);
                        g.style.backgroundColor='white';
                    }
                    else if(i==5 && a==2){
                        
                        var blockage = document.createElement('div')
                        blockage.innerHTML = 'Vertical'
                        blockage.style.backgroundColor = 'red';
                        blockage.setAttribute("id", `BlockageVertical`);
                        blockage.className = 'Blockage'
                        
                        g.appendChild(blockage);

                    }
                    else if(i!=5 && a==2){
                        g.style.backgroundColor='white';

                    }
                    else{
                    g.setAttribute("ondrop", `drop(event)`);
                    g.setAttribute("ondragover", `allowDrop(event)`);
                    }
                
                
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceHorizontal`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= "Hori"
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceCross`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= "+"
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            for(var i =1; i<ylenght+1;i++){
                for(var j = 1; j<xlenght+1; j++){
                    switch(i){
                        case 1:{
                            if((j>0 && j < 4) || (j>4 && j < 7)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 2:{
                            if((j>0 && j < 4) || (j>4 && j < 7)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 4:{
                            if((j>0 && j < 3) ||(j>3 && j < 7)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 5:{
                            if((j>3 && j < 7)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 7:{
                            if((j>3 && j < 7)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 8:{
                            if((j>0 && j < 3) || (j>4 && j < 7)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        
                        default:{
                            break;
                        }
                    }
                }
            }

            break;
        }
        case 9:{
            ylenght=10;
            xlenght=12;
            document.getElementById('mainDiv').style.gridTemplateColumns = `repeat(${xlenght}, 4rem)`
            blockageCount = 2;
            prisonedCount = 2;
            for (var i = 0; i < ylenght; i++){
                for (var a = 0; a < xlenght; a++){
                    var g = document.createElement('div');
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.setAttribute("id", `squareY${i+1}X${a+1}`);
                    g.className = 'EmptySquare'
                    if(i==2 && a==5){
                        var prison = document.createElement('div');
                        prison.innerHTML = '*';
                        prison.setAttribute("id", `PrisonStar`);
                        prison.className = 'Prison';
                        g.appendChild(prison);
                    }
                    else if(i==7 && a==3){
                        var prison = document.createElement('div');
                        prison.innerHTML = '+';
                        prison.setAttribute("id", `PrisonCross`);
                        prison.className = 'Prison';
                        g.appendChild(prison);
                    }
                    else if(i==9 && a==3){
                        
                        var blockage = document.createElement('div')
                        blockage.innerHTML = 'Vertical'
                        blockage.style.backgroundColor = 'red';
                        blockage.setAttribute("id", `BlockageVertical`);
                        blockage.className = 'Blockage'
                        
                        g.appendChild(blockage);

                    }
                    else if(i==4 && a==11){
                        var blockage = document.createElement('div')
                        blockage.innerHTML = 'Horizontal'
                        blockage.style.backgroundColor = 'red';
                        blockage.setAttribute("id", `BlockageHorizontal`);
                        blockage.className = 'Blockage'
                        
                        g.appendChild(blockage);
                    }
                    else if((i!=9 && a==3) || (i==4 && a!=11)){
                        g.style.backgroundColor='white';

                    }
                    else{
                    g.setAttribute("ondrop", `drop(event)`);
                    g.setAttribute("ondragover", `allowDrop(event)`);
                    }

                
                
                    document.getElementById('mainDiv').appendChild(g);
                }
            }

            

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceHorizontal`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= "Hori"
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            a = document.createElement('div');
            a.setAttribute("id", `puzzlePieceCross1`);
            a.setAttribute("draggable", `true`);
            a.setAttribute("ondragstart", `drag(event)`);
            a.innerHTML= "+"
            a.className = 'puzzlePieces';
            document.getElementById('puzzlePiecesHolder').appendChild(a);

            for(var i =1; i<ylenght+1;i++){
                for(var j = 1; j<xlenght+1; j++){
                    switch(i){  
                        case 1:{
                            if((j>0 && j < 4) || (j>4 && j < 8) ||  (j>9 && j < 12)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 2:{
                            if((j>1 && j < 4) || (j>4 && j < 7) || j==8 ||  (j>9 && j < 12)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 6:{
                            if((j>0 && j < 3) || (j>5 && j < 9) || (j>9 && j < 12)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 7:{
                            if(j==1 || j==3|| j==5|| (j>6 && j < 9) || (j>9 && j < 12)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 8:{
                            if((j>1 && j < 4) || (j>4 && j < 7) || j==8 || (j>9 && j < 12)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        case 9:{
                            if((j>0 && j < 4) || (j>4 && j < 8) || (j>9 && j < 13)){
                                document.getElementById(`squareY${i}X${j}`).style.visibility='hidden'; 
                            }
                            break;
                        }
                        default:{
                            break;
                        }
                    }
                }
            }

            break;
        }
        default:{
            alert('Thanks for playing :)')
            break;
        }
        
        
    }
    if(currentLevel!=10){
        SquareNumber=0;
        emptyColorCalc();
    }
    
    
}

function emptyColorCalc(){
    for(var i =1; i <ylenght+1; i++){
        for(var j =1; j <xlenght+1; j++){
            if(document.getElementById(`squareY${i}X${j}`).style.visibility!='hidden'){
                SquareNumber++;
            }
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    document.getElementById(data).setAttribute("draggable", `false`);
    ev.target.appendChild(document.getElementById(data));
    ev.target.setAttribute('ondragover', '');
    document.getElementById(data).style.width= '4rem';
    document.getElementById(data).style.height= '4rem';
    document.getElementById(data).style.margin= '0';
    document.getElementById(data).style.border= '';
    if (data.includes('puzzlePieceVertical')){
        fillSquaresVertical(ev.target.id)
    }
    else if (data.includes('puzzlePieceHorizontal')){
        fillSquaresHorizontal(ev.target.id)
    }
    else if (data.includes('puzzlePieceDiagonalX')){
        fillSquaresDiagonalX(ev.target.id)
    }
    else if (data.includes('puzzlePieceStar')){
        fillSquaresStar(ev.target.id)
    }
    else if (data.includes('puzzlePieceCross')){
        fillSquaresCross(ev.target.id)
    }
    else if (data.includes('puzzlePieceDiagonalRight')){
        fillSquaresDiagonalRight(ev.target.id)
    }

    filledSquareCalc()
    

    if(currentLevel == 4 && blockageCount != 0){
        activateBlockVertical(1,6);
    }
    else if(currentLevel == 5 && blockageCount != 0){
        activateBlockHorizontal(7,2);
    }
    else if(currentLevel == 6 && blockageCount != 0){
        if(document.getElementById('squareY7X2').hasChildNodes()){
            if( document.getElementById('squareY7X2').childNodes[0].id.includes('BlockageHorizontal')){
                activateBlockHorizontal(7,2);
            }
            
        }
        else if(document.getElementById('squareY7X7').hasChildNodes()){
            if(document.getElementById('squareY7X7').childNodes[0].id.includes('BlockageVertical')){
                activateBlockVertical(7,7);
            }
        }
        
        
        
    }
    else if(currentLevel==7 && prisonedCount !=0){
        freePrisonedPiece(1,5)
    }
    else if(currentLevel==8){
        if(blockageCount!=0){
        activateBlockVertical(6,3)
        }
        if(prisonedCount !=0){
            if(document.getElementById(`squareY3X3`).hasChildNodes()){
                if(document.getElementById(`squareY3X3`).childNodes[0].id.includes('Prison')){
                    freePrisonedPiece(3,3);
                }
            }
            if(document.getElementById(`squareY8X3`).hasChildNodes() && document.getElementById(`squareY8X3`).childNodes[0].id.includes('Prison')){
                if(document.getElementById(`squareY8X3`).childNodes[0].id.includes('Prison')){
                    freePrisonedPiece(8,3);
                }
            }
        }
    }
    else if(currentLevel==9){
        if(blockageCount!=0){
            if(document.getElementById(`squareY10X4`).hasChildNodes()){
                if(document.getElementById(`squareY10X4`).childNodes[0].id.includes('BlockageVertical')){
                    activateBlockVertical(10,4)
                }
            }
            if(document.getElementById(`squareY5X12`).hasChildNodes()){
                if(document.getElementById(`squareY5X12`).childNodes[0].id.includes('BlockageHorizontal')){
                    activateBlockHorizontal(5,12)
                }
            }
        }
        if(prisonedCount!=0){
            if(document.getElementById(`squareY8X4`).hasChildNodes()){
                if(document.getElementById(`squareY8X4`).childNodes[0].id.includes('Prison')){
                    freePrisonedPiece(8,4);
                }
            }
            if(document.getElementById(`squareY3X6`).hasChildNodes()){
                if(document.getElementById(`squareY3X6`).childNodes[0].id.includes('Prison')){
                    freePrisonedPiece(3,6);
                }
            }

        }
       
    }
    
    
    
}

function filledSquareCalc(){
    filledSquareCounter = 0;
    for(var i =1; i <ylenght+1; i++){
        for(var j =1; j <xlenght+1; j++){
            if(document.getElementById(`squareY${i}X${j}`).style.visibility!='hidden' && document.getElementById(`squareY${i}X${j}`).style.backgroundColor=='purple'){
                filledSquareCounter++;
            }
        }
    }
    if(filledSquareCounter == SquareNumber){
        alert('Yahoo');
        currentLevel++;
        loadLevel(currentLevel);
        localStorage.setItem('MaxLevelReached', currentLevel);
    }
}

function fillSquaresVertical(placementSquare){
    var placementSquareXY = placementSquare.split(/[Y,X]+/);
    var locationY = placementSquareXY[1];
    var locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationY++;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationY--;
        }
        else {
            break;
        }
    }
    

}
function fillSquaresHorizontal(placementSquare){
    var placementSquareXY = placementSquare.split(/[Y,X]+/);
    var locationY = placementSquareXY[1];
    var locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        }
        else {
            break;
        }
    }
    

}

function fillSquaresCross(placementSquare){
    var placementSquareXY = placementSquare.split(/[Y,X]+/);
    var locationY = placementSquareXY[1];
    var locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationY--;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationY++;
        }
        else {
            break;
        }
    }
    

}

function fillSquaresDiagonalX(placementSquare){
    var placementSquareXY = placementSquare.split(/[Y,X]+/);
    var locationY = placementSquareXY[1];
    var locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        locationY++;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        locationY--;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        locationY--;
        }
        else {
            break;
        }
    }
    
    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        locationY++;
        }
        else {
            break;
        }
    }
}

function fillSquaresDiagonalRight(placementSquare){
    var placementSquareXY = placementSquare.split(/[Y,X]+/);
    var locationY = placementSquareXY[1];
    var locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        locationY--;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        locationY++;
        }
        else {
            break;
        }
    }
}


function fillSquaresStar(placementSquare){
    var placementSquareXY = placementSquare.split(/[Y,X]+/);
    var locationY = placementSquareXY[1];
    var locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        locationY++;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        locationY--;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        locationY--;
        }
        else {
            break;
        }
    }
    
    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        locationY++;
        }
        else {
            break;
        }
    }
    
    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX++;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationX--;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden'  && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationY++;
        }
        else {
            break;
        }
    }

    locationY = placementSquareXY[1];
    locationX = placementSquareXY[2];
    while(document.getElementById(`squareY${locationY}X${locationX}`)){
        if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor != 'white'){
        document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'purple';
        locationY--;
        }
        else {
            break;
        }
    }
}


function activateBlockVertical(y , x){
    var locationY = y;
    var locationX = x;
    if(document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor == 'purple'){
        blockageCount--;
        document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondrop", `drop(event)`);
        document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondragover", `allowDrop(event)`);
        document.getElementById(`squareY${locationY}X${locationX}`).innerHTML='';
        while(document.getElementById(`squareY${locationY}X${locationX}`)){
            if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor == 'white'){
                
                document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'rgb(39, 38, 38)';
                if(!document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes()){
                    document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondrop", `drop(event)`);
                    document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondragover", `allowDrop(event)`);
                }
                
                if (currentLevel==9 && locationY==5 && locationX==4 && blockageCount!=0){
                    document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'White';
                }
            }
            
            locationY--;
        }
        locationY = y;
        locationX = x;
        while(document.getElementById(`squareY${locationY}X${locationX}`)){
            if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor == 'white'){
            document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'rgb(39, 38, 38)';
            if(!document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes()){
                document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondrop", `drop(event)`);
                document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondragover", `allowDrop(event)`);
            }
            }
            locationY++;
        }
        for(var i =1; i <ylenght+1; i++){
            for(var j =1; j <xlenght+1; j++){
                if(document.getElementById(`squareY${i}X${j}`).hasChildNodes()){
                    
                    if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceVertical')){
                        fillSquaresVertical(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceHorizontal')){
                        fillSquaresHorizontal(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceDiagonalX')){
                        fillSquaresDiagonalX(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceStar')){
                        fillSquaresStar(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceCross')){
                        fillSquaresCross(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceDiagonalRight')){
                        fillSquaresDiagonalRight(`squareY${i}X${j}`)
                    }
                }
            }
        }
        filledSquareCalc()
        
        
        
    }
}

function activateBlockHorizontal(y , x){
    var locationY = y;
    var locationX = x;
    if(document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor == 'purple'){
        blockageCount--;
        document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondrop", `drop(event)`);
        document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondragover", `allowDrop(event)`);
        document.getElementById(`squareY${locationY}X${locationX}`).innerHTML='';
        while(document.getElementById(`squareY${locationY}X${locationX}`)){
            if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && !document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes() && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor == 'white'){
            document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'rgb(39, 38, 38)';
            if(!document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes()){
                document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondrop", `drop(event)`);
                document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondragover", `allowDrop(event)`);
            } 
            }
            else if(document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes() && document.getElementById(`squareY${locationY}X${locationX}`).childNodes[0].id.includes('Blockage')){
                document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'rgb(39, 38, 38)';
            }
            if (currentLevel==9 && locationY==5 && locationX==4 && blockageCount!=0){
                document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'White';
            }
            locationX--;
        }
        locationY = y;
        locationX = x;
        while(document.getElementById(`squareY${locationY}X${locationX}`)){
            if(document.getElementById(`squareY${locationY}X${locationX}`).style.visibility != 'hidden' && !document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes() && document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor == 'white'){
            document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'rgb(39, 38, 38)';
            if(!document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes()){
                document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondrop", `drop(event)`);
                document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondragover", `allowDrop(event)`);
            }
            }
            else if(document.getElementById(`squareY${locationY}X${locationX}`).hasChildNodes() && document.getElementById(`squareY${locationY}X${locationX}`).childNodes[0].id.includes('Blockage')){
                document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor = 'rgb(39, 38, 38)';
            }
            locationX++;
        }
        for(var i =1; i <ylenght+1; i++){
            for(var j =1; j <xlenght+1; j++){
                if(document.getElementById(`squareY${i}X${j}`).hasChildNodes()){
                    
                    if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceVertical')){
                        fillSquaresVertical(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceHorizontal')){
                        fillSquaresHorizontal(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceDiagonalX')){
                        fillSquaresDiagonalX(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceStar')){
                        fillSquaresStar(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceCross')){
                        fillSquaresCross(`squareY${i}X${j}`)
                    }
                    else if (document.getElementById(`squareY${i}X${j}`).childNodes[0].id.includes('puzzlePieceDiagonalRight')){
                        fillSquaresDiagonalRight(`squareY${i}X${j}`)
                    }
                }
            }
        }
        
        filledSquareCalc()
        if(currentLevel==6 && blockageCount!=0){
            if(document.getElementById('squareY7X7').hasChildNodes()){
                if(document.getElementById('squareY7X7').childNodes[0].id.includes('BlockageVertical')){
                    activateBlockVertical(7,7);
                }
            }
        } 
        
        
        
    }
}

function freePrisonedPiece(y,x){
    var locationY = y;
    var locationX = x;
    var pieceName = document.getElementById(`squareY${locationY}X${locationX}`).childNodes[0].id.split('Prison')
    if(document.getElementById(`squareY${locationY}X${locationX}`).style.backgroundColor == 'purple'){
        
        var a = document.createElement('div');
        a.setAttribute("id", `puzzlePiece${pieceName[1]}${prisonedCount+5}`);
        a.setAttribute("draggable", `true`);
        a.setAttribute("ondragstart", `drag(event)`);
        pieceName = document.getElementById(`squareY${locationY}X${locationX}`).childNodes[0].id
        if (pieceName.includes('PrisonVertical')){
            a.innerHTML= `Verti`
        }
        else if (pieceName.includes('PrisonHorizontal')){
            a.innerHTML= `Hori`
        }
        else if (pieceName.includes('PrisonDiagonalX')){
            a.innerHTML= `X`
        }
        else if (pieceName.includes('PrisonStar')){
            a.innerHTML= `*`
        }
        else if (pieceName.includes('PrisonCross')){
            a.innerHTML= `+`
        }
        else if (pieceName.includes('PrisonDiagonalRight')){
            a.innerHTML= `/`
        }
        a.className = 'puzzlePieces';
        document.getElementById('puzzlePiecesHolder').appendChild(a);

        document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondrop", `drop(event)`);
        document.getElementById(`squareY${locationY}X${locationX}`).setAttribute("ondragover", `allowDrop(event)`);
        document.getElementById(`squareY${locationY}X${locationX}`).innerHTML='';
        prisonedCount--;
    }

}