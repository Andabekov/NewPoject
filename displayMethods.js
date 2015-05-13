// updates the next move 
		function updateNextMove(){
			var nextMove;
			switch (currentPlayer){
				case 0: nextMove=playersNameArray[0]; break;
				case 1: nextMove=playersNameArray[1]; break;
				case 2: nextMove=playersNameArray[2]; break;
				case 3: nextMove=playersNameArray[3]; break;
			}
			document.getElementById("nextMove").innerHTML = nextMove;
		}
		
		// updates trump on the screen
		function updateTrump(){
			var trump;
			switch(currentTrump){
				case 0: trump="Diamond"; break;
				case 1: trump="Heart"; break;
				case 2: trump="Spade"; break;
				case 3: trump="Club"; break;
			}
			document.getElementById("currentTrump").innerHTML = trump;
		}
		
		//updates scores on the screen
		function updateScores(){
			document.getElementById("team1Points").innerHTML = teamNSScore;
			document.getElementById("team2Points").innerHTML = teamEWScore;
			document.getElementById("team1Scores").innerHTML = NStotalScore;
			document.getElementById("team2Scores").innerHTML = EWtotalScore;
		}
		
		// updates all the results
		function updateResults(){
			updateNextMove();
			updateTrump();
			updateScores();
		}

		function updateSixes(){
			switch(NStotalScore){
				case 1: sixBack1.style.webkitTransform = "rotate(45deg)";
					sixBack1.style.MozTransform = "rotate(45deg)";
					sixBack1.style.marginLeft="7px";
					sixBack1.style.marginTop="7px"; break;
				case 2: sixBack1.style.webkitTransform = "rotate(0deg)";
					sixBack1.style.MozTransform = "rotate(0deg)";
					sixBack1.style.marginLeft="0px";
					sixBack1.style.marginTop="25px"; break;
				case 3: sixBack1.style.webkitTransform = "rotate(0deg)";
					sixBack1.style.MozTransform = "rotate(0deg)";
					sixBack1.style.marginTop="0px";
					sixBack1.style.marginLeft="15px"; break;
				case 4: sixBack1.style.webkitTransform = "rotate(0deg)";
					sixBack1.style.MozTransform = "rotate(0deg)";
					sixBack1.style.marginLeft="0px";
					sixBack1.style.marginTop="54px"; break;
				case 5: sixBack1.style.webkitTransform = "rotate(45deg)";
					sixBack1.style.MozTransform = "rotate(45deg)";
					sixBack1.style.marginLeft="15px";
					sixBack1.style.marginTop="45px"; break;
				case 6: sixBack1.style.webkitTransform = "rotate(0deg)";
					sixBack1.style.MozTransform = "rotate(0deg)";
					sixBack1.style.marginLeft="0px";
					sixBack1.style.marginTop="0px"; break;
			}
			switch(EWtotalScore){
				case 1: sixBack2.style.webkitTransform = "rotate(45deg)";
					sixBack2.style.MozTransform = "rotate(45deg)";
					sixBack2.style.marginLeft="7px";
					sixBack2.style.marginTop="7px"; break;
				case 2: sixBack2.style.webkitTransform = "rotate(0deg)";
					sixBack2.style.MozTransform = "rotate(0deg)";
					sixBack2.style.marginLeft="0px";
					sixBack2.style.marginTop="25px"; break;
				case 3: sixBack2.style.webkitTransform = "rotate(0deg)";
					sixBack2.style.MozTransform = "rotate(0deg)";
					sixBack2.style.marginTop="0px";
					sixBack2.style.marginLeft="15px"; break;
				case 4: sixBack2.style.webkitTransform = "rotate(0deg)";
					sixBack2.style.MozTransform = "rotate(0deg)";
					sixBack2.style.marginLeft="0px";
					sixBack2.style.marginTop="54px"; break;
				case 5: sixBack2.style.webkitTransform = "rotate(45deg)";
					sixBack2.style.MozTransform = "rotate(45deg)";
					sixBack2.style.marginLeft="15px";
					sixBack2.style.marginTop="45px"; break;
				case 6: sixBack2.style.webkitTransform = "rotate(0deg)";
					sixBack2.style.MozTransform = "rotate(0deg)";
					sixBack2.style.marginLeft="0px";
					sixBack2.style.marginTop="0px"; break;
			}
		}