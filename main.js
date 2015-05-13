		var start=true; // bool for establishing the start of the new game
		var waitForNewTrick=false; // bool for maikng players to wait till cards are collected
		var newRound; // bool for establishing new round of the game

		/*var diamonds = 0; var hearts = 1; var spades = 2; var clubs = 3;*/
		/*var Jack = 11; var Queen = 12; var King = 13; var Ace = 14;*/

		//var player0;  var playerID;
		//var player1 = "PC1"; var player2 = "PC2"; var player3 = "PC3"; 
		var pl0trump; var pl1trump; var pl2trump; var pl3trump;

		var playersNameArray = new Array();

		var currentPlayer=0; // curentPlayer is set to the top for now
		var currentTrump = 3; // stores current trump suit (by default it's clubs)

		var cardsArray = new Array(); // array of all 32 cards
		var playersArray = new Array(); // array of 4 players
		
		var teamNSCards = new Array(); // array storing NS team's cards
		var teamEWCards = new Array(); // array storing EW team's cards
		var teamNSScore = 0; var NStotalScore = 0; 
		var teamEWScore = 0; var EWtotalScore = 0;

		var currentTrick = new Array(); // array of current trick of cards
		
		var cardPoints = [0,0,0,0,0,0,0,0,0,0,10,2,3,4,11]; // array for counting the points

		// card object
		function card(img, num, suit, state){
			this.img = img;
			this.num = num;
			this.suit = suit;
			this.state = state; // if state=0 then card is not played, else its played
		}

		// player object
		function player(id, cards, trump){
			this.id=id;
			this.cards=cards;
			this.trump=trump;
		}

		// method which creates an array of 32 card objects
		function createCards(){
			// spades
			for(var i=0;i<8;i++){ cardsArray[i]=new card(i+1+".png", i+7, 2, 0); }
			// hearts
			for(var i=8;i<16;i++){ cardsArray[i]=new card(i+1+".png", i-1, 1, 0); }
			// diamonds
			for(var i=16;i<24;i++){ cardsArray[i]=new card(i+1+".png", i-9, 0, 0); }
			// clubs
			for(var i=24;i<32;i++){ cardsArray[i]=new card(i+1+".png", i-17, 3, 0); }
		}
		
		// method which creates an array of 4 player objects
		function createPlayers(){
			for(var i=0;i<4;i++){ 
				playersArray[i]=new player(i);
			}
			dealCards();
			if(start){
				for(var i=0;i<4;i++){ 
					playerTrump(i);
				}
				start=false;
			}
		}
		
		// method which deals 8 random cards to each player
		function dealCards(){
			for(var i=0;i<4;i++){
				playersArray[i].cards= new Array(8);
				for(var j=0;j<8;j++){
					var rdm = temp[i][j];
					playersArray[i].cards[j] = cardsArray[rdm];
					playersArray[i].cards[j].state=0;
				}

				// sorting starts here
				var arrayTemp = [];
				for(var j=0;j<8;j++){
					if(playersArray[i].cards[j].suit==0)
						arrayTemp.push(playersArray[i].cards[j]);
				}
				for(var j=0;j<8;j++){
					if(playersArray[i].cards[j].suit==2)
						arrayTemp.push(playersArray[i].cards[j]);
				}
				for(var j=0;j<8;j++){
					if(playersArray[i].cards[j].suit==1)
						arrayTemp.push(playersArray[i].cards[j]);
				}
				for(var j=0;j<8;j++){
					if(playersArray[i].cards[j].suit==3)
						arrayTemp.push(playersArray[i].cards[j]);
				}

				playersArray[i].cards = arrayTemp;
				// sorting ends here
			}
		}

		// method which identifies and sets the trump of each player
		function playerTrump(player_id){
			for(var x=0; x<8;x++){
				if(playersArray[player_id].cards[x].suit==3 && playersArray[player_id].cards[x].num==11){
					playersArray[player_id].trump = 3; 
					playersArray[(player_id+2)%4].trump = 2; 
					playersArray[(player_id+1)%4].trump = 0; 
					playersArray[(player_id+3)%4].trump = 1; 
					switch(player_id){
						case 0: pl0trump="club"; pl2trump="spade"; pl1trump="diamond"; pl3trump="heart"; break;
						case 1: pl1trump="club"; pl3trump="spade"; pl2trump="diamond"; pl0trump="heart"; break;
						case 2: pl2trump="club"; pl0trump="spade"; pl3trump="diamond"; pl1trump="heart"; break;
						case 3: pl3trump="club"; pl1trump="spade"; pl0trump="diamond"; pl2trump="heart"; break;
					}
					break;
				}
			}
		}
		
		// main method which starts the game by setting up the board
		function startGame(){
			document.getElementById("team1").innerHTML=playersNameArray[0]+", "+playersNameArray[2];
			document.getElementById("team2").innerHTML=playersNameArray[1]+", "+playersNameArray[3];

			for(var i=0;i<4;i++){
				for(var j=0;j<8;j++){
					
					var img = document.createElement("img");
					img.id=i;
					img.name=playersArray[i].cards[j].img;
					img.className="card";

					if(i==playerID) {
						img.src=playersArray[i].cards[j].img;
					} else {
						//alert(playersArray[i].cards[j].img);
						img.src="back.png";
					}
					
					var trumpImg = document.createElement("img");
					trumpImg.style.width="20px";
					

					if(i==playerID){ // at the bottom
						img.style.bottom="5%";
						img.style.left=48+j*3+"%";
						trumpImg.src="suits/"+window["pl"+i+"trump"]+".ico";
						document.getElementById("player2").innerHTML=playersNameArray[i]+"<br /><br />"+"Trump:";
						document.getElementById("player2").appendChild(trumpImg);
					} else if(i==playerID+2 || i==playerID-2){ // at the top
						img.style.top="5%";
						img.style.left=48+j*3+"%";
						trumpImg.src="suits/"+window["pl"+i+"trump"]+".ico";
						document.getElementById("player0").innerHTML=playersNameArray[i]+"<br /><br />"+"Trump:";
						document.getElementById("player0").appendChild(trumpImg);
					} else if(i==playerID+1 || i==playerID-3){ // on the left
						img.style.left="33%";
						img.style.top=30+j*4+"%";
						trumpImg.src="suits/"+window["pl"+i+"trump"]+".ico";
						document.getElementById("player3").innerHTML=playersNameArray[i]+"<br /><br />"+"Trump:";
						document.getElementById("player3").appendChild(trumpImg);

						img.style.webkitTransform = "rotate(90deg)";
						img.style.MozTransform = "rotate(90deg)";
						img.style.marginLeft="12px"
						img.style.marginTop="-12px"
						img.style.marginBottom="-17px"
					} else if(i==playerID-1 || i==playerID+3){ // on the right
						img.style.right="8%";
						img.style.top=30+j*4+"%";
						trumpImg.src="suits/"+window["pl"+i+"trump"]+".ico";
						document.getElementById("player1").innerHTML=playersNameArray[i]+"<br /><br />"+"Trump:";
						document.getElementById("player1").appendChild(trumpImg);

						img.style.webkitTransform = "rotate(90deg)";
						img.style.MozTransform = "rotate(90deg)";
						img.style.marginLeft="12px"
						img.style.marginTop="-12px"
						img.style.marginBottom="-17px"
					}

					document.body.appendChild(img);

					makeMove(i, j);
				}
			}
		}

		// method which makes the moves (animation)
		function makeMove(i, j){
			if(i==playerID){
			var img = document.getElementsByName(playersArray[i].cards[j].img)[0];
			
				$(img).click(function() {
					if(!waitForNewTrick){
						if(checkMove(i, j)){
							animateMove(i, j);
						}
					}
				});

				$(img).hover(function() {
					var flag=this.getAttribute("up");
					var sign="+";
					if(flag=="true") sign="-";
					if(!waitForNewTrick){
						if(checkMove2(i, j)){
							if(this.id==playerID) $(this).animate({bottom:sign+"=1%"}, "fast");
							if(flag=="false" || flag==null) this.setAttribute("up", "true");
							else this.setAttribute("up", "false");
						}
					}
				});
			}
		}
		
		function animateMove(i, j){
			
			var card = document.getElementsByName(playersArray[i].cards[j].img)[0];

			document.body.removeChild(card);
			document.body.appendChild(card);

			$(card).animate({bottom:"35%", left:"60.3%"}, "slow");

			if(currentTrick.length==4){
				waitForNewTrick = true;
				setTimeout(processCurrentTrick, 2000);
			} else{
				currentPlayer=(currentPlayer+1)%4;
			}

			setNextPlayer(currentPlayer, j, i);
			updateNextMove();
		}

		function animateMove2(i, j){

				currentTrick.push(playersArray[i].cards[j]);
				playersArray[i].cards[j].state=1;
				newRound=false;

				var card = document.getElementsByName(playersArray[i].cards[j].img)[0];
				
				var newCard = document.createElement("img");
				newCard.src = playersArray[i].cards[j].img;

				newCard.name=playersArray[i].cards[j].img;
				newCard.className="card";
				newCard.id = card.id;

				newCard.style.top = card.style.top;
				newCard.style.bottom = card.style.bottom;
				newCard.style.left = card.style.left;
				newCard.style.right = card.style.right;

				if(newCard.id==playerID-1 || newCard.id==playerID+3 || newCard.id==playerID+1 || newCard.id==playerID-3) {
					newCard.style.webkitTransform = "rotate(90deg)";
					newCard.style.MozTransform = "rotate(90deg)";
					newCard.style.marginLeft="12px"
					newCard.style.marginTop="-12px"
					newCard.style.marginBottom="-17px"
				}

				document.body.removeChild(card);
				document.body.appendChild(newCard);

				if(i==playerID+2 || i==playerID-2){ $(newCard).animate({top:"35%", left:"60.3%"}, "slow"); }
				else if(i==playerID){ $(newCard).animate({bottom:"35%", left:"60.3%"}, "slow"); }
				else if(i==playerID+1 || i==playerID-3){ $(newCard).animate({top:"46%",left:"55%"}, "slow"); }
				else if(i==playerID-1 || i==playerID+3){ $(newCard).animate({top:"46%",right:"30%"}, "slow"); }

				if(currentTrick.length==4){
					waitForNewTrick = true;
					setTimeout(processCurrentTrick, 2000);
				}
		}

		// this function is called whenever the move was made by currentplayer
		function setNextPlayer(currentPlayer, img, playedPlayer){
			$.ajax({
				url: "http://localhost:2001/makeMove",
				dataType: 'jsonp',
				data: {gameid: gameID, nextPlayer: currentPlayer, card: img, prevPlayed: playedPlayer},
				success: callback
			});
		}
		function callback(){}

		/*function AIMove(){
			if (currentPlayer==0) return ;
			do{
				j=Math.round(Math.random()*(playersArray[currentPlayer].cards.length-1));
			} while(playersArray[currentPlayer].cards[j].state==1 || !checkMove(currentPlayer, j));
			
			animateMove(currentPlayer,j);
		}*/


		// method which checks players moves against rules
		function checkMove(i, j){
			var check=false;

			if(currentPlayer!=i){
				check = false;
			}
			else {
				if((newRound==true) || (currentTrick.length==0)){ // if it's a start of the game/new trick, then accept the card (push into currentTrick)
					currentTrick.push(playersArray[i].cards[j]);
					playersArray[i].cards[j].state=1;
					check=true;
					newRound=false;
				} 
				else{ 
					// if the card is of trump suit or if it's Jack
					if((currentTrick[0].suit==currentTrump) || (currentTrick[0].num==11)){
						if((playersArray[i].cards[j].suit==currentTrump) || (playersArray[i].cards[j].num==11)){
							currentTrick.push(playersArray[i].cards[j]);
							playersArray[i].cards[j].state=1;
							check=true;
						}
						else if(noSuchTrump(i)){
							currentTrick.push(playersArray[i].cards[j]);
							playersArray[i].cards[j].state=1;
							check=true;
						}
						else{ check=false; }
					}
					else if((playersArray[i].cards[j].suit==currentTrick[0].suit) && (playersArray[i].cards[j].num!=11)){
						currentTrick.push(playersArray[i].cards[j]);
						playersArray[i].cards[j].state=1;
						check=true;
					}
					else if(noSuchSuit(i)){
						currentTrick.push(playersArray[i].cards[j]);
						playersArray[i].cards[j].state=1;
						check=true;
					}
					else{ check=false; }
				}

				
			}
			return check;
		}

		// duplicate of checkMove method (for hover)
		function checkMove2(i, j){
			var check;
			if(currentPlayer!=i){ check = false; }
			else {
				if((newRound==true) || (currentTrick.length==0)){ check=true; newRound=false; } 
				else{
					if((currentTrick[0].suit==currentTrump) || (currentTrick[0].num==11)){
						if((playersArray[i].cards[j].suit==currentTrump) || (playersArray[i].cards[j].num==11)){
							check=true;
						}
						else if(noSuchTrump(i)){ 
							check=true;
						}
						else{ check=false; }
					}
					else if((playersArray[i].cards[j].suit==currentTrick[0].suit) && (playersArray[i].cards[j].num!=11)){
						check=true; 
					}
					else if(noSuchSuit(i)){
						check=true;
					}
					else{ check=false; }
				}
			}
			return check;
		}

		// method checks if player has card of current trump or Jacks at all, if he has returns true, otherwise false
		function noSuchTrump(i){
			var noTrump = false;
			
			for(var x=0; x<playersArray[i].cards.length;x++){
				if((playersArray[i].cards[x].state==0) && ((playersArray[i].cards[x].num==11) || (playersArray[i].cards[x].suit==currentTrump))){
					break;
				}
				if(x==playersArray[i].cards.length-1){
					noTrump=true;
				}
			}
			return noTrump;
		}

		// method checks if player has card of current suit at all, if he has returns true, otherwise false
		function noSuchSuit(i){
			var dont_have = false;
			
			for(var x=0; x<playersArray[i].cards.length;x++){
				if((playersArray[i].cards[x].state==0) && (playersArray[i].cards[x].num!=11) && (playersArray[i].cards[x].suit==currentTrick[0].suit)){
					break;
				}
				if(x==playersArray[i].cards.length-1){
					dont_have=true;
				}
			}
			return dont_have;
		}
		
		// method which processes the trick
		function processCurrentTrick() {
			for(var x=0; x<4;x++){
				var img=document.getElementsByName(currentTrick[x].img)[0]; 
				// getElementsByName returns an array of elements
				document.body.removeChild(img);
			}
			assignTaker(properCompare());
			countScores();
			updateScores();
			updateNextMove();
			waitForNewTrick = false;
			currentTrick = new Array(); // empty the currentTrick

			if(newDeal()) tellServerNewRound();
		}
		
		// function which determines the taker by using the biggest card rpovided by properCompare method
		function assignTaker(card){
			var flag=false;
			var temp;

			for(var x=0;x<4;x++){
				if(!flag){
					for(var y=0;y<8;y++){
						if(playersArray[x].cards[y].img==card.img) {
							flag=true; currentPlayer=x; temp=x; break;
						}
					}
				} else {
					break;
				}
			}
			for(var x=0; x<4; x++){
				if((temp==0) || (temp==2)){
					teamNSCards.push(currentTrick[x]);
				} else {
					teamEWCards.push(currentTrick[x]); 
				}
			}
		}
		
		// method which sorts the cards in the trick and calls apropriate methods for comparison
		function properCompare(){
			var max;
			var sameSuit = new Array();
			var isTrump = new Array();
			for(var x=0;x<4;x++){
				if((currentTrick[x].suit==currentTrump) || (currentTrick[x].num==11)){
					isTrump.push(currentTrick[x]);
				}
				else if((currentTrick[x].suit==currentTrick[0].suit) && (currentTrick[x].suit!=currentTrump) && (currentTrick[x].num!=11)){
					sameSuit.push(currentTrick[x]);
				}
			}
			if(isTrump.length!=0){
				if(isTrump.length==1){
					max=isTrump[0];
				}
				else{
					max=compareTrumps(isTrump); 
				}
			}
			else{
				max=plainCompare(sameSuit);
			}
			return max;
		}
		
		// method which compares the cards with the same suit
		function plainCompare(array){
			var max=-1;
			var maxIndex;

			for(var x=0;x<array.length;x++){
				if(max<array[x].num) { 
					max=array[x].num; maxIndex=x; // max=cardPoints[array[x].num];
				}
			}
			return array[maxIndex];
		}
		
		// method which compares the cards with the trump suit
		function compareTrumps(array){
			var max;
			var trumpJacks = new Array();
			var plainTrumps =new Array();
			
			for(var x=0;x<array.length;x++){
				if(array[x].num==11){ 
					trumpJacks.push(array[x]);
				}
				else { 
					plainTrumps.push(array[x]);
				}
			}
			if(trumpJacks.length!=0){
				if(trumpJacks.length==1){
					max=trumpJacks[0];
				}
				else{
					max=compareJacks(trumpJacks);
				}
			}
			else{
				max=plainCompare(plainTrumps);
			}
			return max;
		}
		
		// method which compares the Jacks
		function compareJacks(array){
			var max=-1;
			var maxIndex;
			
			for(var x=0;x<array.length;x++){
				if(max<array[x].suit) { 
					max=array[x].suit; maxIndex=x;
				}
			}
			return array[maxIndex];
		}

		// method which launches the game
		function launcher(){
			
			newRound=true;
			WebSocketTest();
		}
		
		function startNewRound(){

			newRound=true;
			//createCards();
			dealCards();
			setCurrentTrump();
			startGame();
			teamNSScore=0;
			teamEWScore=0;
			updateResults();
		}

		function tellServerNewRound(){
			$.ajax({
				url: "http://localhost:2001/newRound",
				dataType: 'jsonp',
				data: {gameid: gameID, newRound: true},
				success: dealNewRound
			});
		}

		function dealNewRound(players){
			temp = JSON.parse(players.shuffle);
			startNewRound();
		}

		// method which determines the new round
		function newDeal(){

			for(var i=0;i<4;i++){
				for(var j=0;j<8;j++){
					if(playersArray[i].cards[j].state==0) return false;
				}
			}
			return true;
		}
		
		// method whcih counts the scores
		function countScores(){
			for(var x=0;x<teamNSCards.length;x++){
				teamNSScore+=cardPoints[teamNSCards[x].num];
			}
			for(var x=0;x<teamEWCards.length;x++){
				teamEWScore+=cardPoints[teamEWCards[x].num];
			}
			teamNSCards=new Array(); teamEWCards=new Array();
			
			if(newDeal()){
				if(teamNSScore>60 && teamNSScore<91) NStotalScore+=1;
				else if(teamNSScore>90 && teamNSScore<120) NStotalScore+=2;
				else if(teamNSScore==120) NStotalScore=12;
				else if(teamEWScore>60 && teamEWScore<91) EWtotalScore+=1;
				else if(teamEWScore>90 && teamEWScore<120) EWtotalScore+=2;
				else if(teamEWScore==120) EWtotalScore=12;
				setApropSixes();
				updateSixes();
			}
		}
		function setApropSixes(){
			sixOpen1 = document.getElementById("sixOpen1");
			sixOpen2 = document.getElementById("sixOpen2");
			sixBack1 = document.getElementById("sixBack1");
			sixBack2 = document.getElementById("sixBack2");
			if (playersArray[0].trump==3 || playersArray[2].trump==3){
				sixOpen1.src="cart_images/6club.png";
				sixOpen2.src="cart_images/6heart.png";
				sixBack1.src="back.png";
				sixBack2.src="back.png";
				if(NStotalScore>=6){
					sixOpen1.src="cart_images/6spade.png";
					sixBack1.src="cart_images/6club.png";
				}
				if(EWtotalScore>=6){
					sixOpen2.src="cart_images/6diamond.png";
					sixBack2.src="cart_images/6heart.png";
				}
			}
			else{
				sixOpen1.src="cart_images/6heart.png";
				sixOpen2.src="cart_images/6club.png";
				sixBack1.src="back.png";
				sixBack2.src="back.png";
				if(NStotalScore>=6){
					sixOpen2.src="cart_images/6diamond.png";
					sixBack2.src="cart_images/6heart.png";
				}
				if(EWtotalScore>=6){
					sixOpen1.src="cart_images/6spade.png";
					sixBack1.src="cart_images/6club.png";
				}
			}
		}
		function setCurrentTrump(){
			for(var i=0; i<4;i++){
				for(var j=0;j<8;j++){
					if(playersArray[i].cards[j].suit==3 & playersArray[i].cards[j].num==11){
						currentTrump=playersArray[i].trump;
						break;
					}
				}
			}
		}
