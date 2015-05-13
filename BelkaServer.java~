import java.net.*;
import java.io.*;
import java.util.*;

public class BelkaServer{
	static String userName="";
	static String gameID="";
	static ArrayList<Game> allGames = new ArrayList<Game>();
	static ArrayList<Shuffle> allShuffles = new ArrayList<Shuffle>();
	static int count=0;

	public static void main(String[] args) throws IOException{

		// read arguments
		int port = 2001;

		// open server socket
		ServerSocket socket = null; 
		try {
			socket = new ServerSocket(port); 
		} catch (IOException e) {
			System.err.println("Could not start server: " + e);
			System.exit(-1);
		}
		System.out.println("FileServer accepting connections on port " + port);
			
		// request handler loop
		while (true) {
			new MultiThread(socket.accept()).start();
		}
	}
}

class MultiThread extends Thread {
	private Socket connection = null;
	

	public MultiThread(Socket connection) {
		super("MultiThread");
		this.connection = connection;
	}

	public void run() {

		try {
			// wait for request 
			BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			OutputStream out = new BufferedOutputStream(connection.getOutputStream());
			PrintStream pout = new PrintStream(out); 
			// read first line of request (which is url thing, ignore the rest)
			String request = in.readLine();
			//if (request==null) continue;
			log(connection, request);
				
			if(request.indexOf("checkForGames")!=-1) {
				if(BelkaServer.allGames.size()!=0){
					for (Game game: BelkaServer.allGames) { 
						if(game.players.size()!=4)
							pout.print("accceptGameIds({gameId: '"+game.players.get(0)+"'});");
					}
				}
			}
			else if(request.indexOf("makeMove")!=-1){
				Game current = findGame(request);
				int start = request.indexOf("nextPlayer")+11; int end = request.indexOf('&', start); 
				int start1 = request.indexOf("card")+5; int end1 = request.indexOf('&', start1); 
				int start2 = request.indexOf("prevPlayed")+11; int end2 = request.indexOf('&', start2);

				current.nextMove = request.substring(start,end);
				current.playedCard = request.substring(start1,end1);
				current.prevPlayer = request.substring(start2,end2);
				current.flag=new boolean[]{true,true,true,true};
				pout.print("emptyFunction()");
			}
			else if(request.indexOf("checkForMove")!=-1){
				Game current = findGame(request);
				int start = request.indexOf("playerid")+9; int end = request.indexOf('&', start);
				int id = Integer.parseInt(request.substring(start,end));

				if(current.flag[id]==true){
					current.flag[id]=false;
					pout.print("setNextMove({nextMove: "+current.nextMove+", playedCard: '"+current.playedCard+"', prevPlayer: "+current.prevPlayer+"})");
					
				} else{
					pout.print("emptyFunction()");
				}
			}
			else if(request.indexOf("newRound")!=-1) {
				
				Game current = findGame(request);
				int numb=0;
				for(int i=0; i<BelkaServer.allGames.size();i++){
					if(BelkaServer.allGames.get(i)==current){
						numb=i;
						break;
					}
				}
				if(BelkaServer.count==0){
					BelkaServer.allShuffles.set(numb, new Shuffle());
					BelkaServer.count++;
				} else{
					BelkaServer.count++;
				}
				if(BelkaServer.count==4){
					BelkaServer.count=0;
				} 

				pout.print("dealNewRound({shuffle: '"+BelkaServer.allShuffles.get(numb).shuffle+"'})");
			}
			else if(request.indexOf("startgame")!=-1){
				Game current = findGame(request);
				int numb=0;
				for(int i=0; i<BelkaServer.allGames.size();i++){
					if(BelkaServer.allGames.get(i)==current){
						numb=i;
						break;
					}
				}

				String name0 = current.players.get(0); String name1 = current.players.get(1); 
				String name2 = current.players.get(2); String name3 = current.players.get(3);

				pout.print("callback({ name0: '"+name0+"',  name1: '"+name1+"', name2: '"+name2+"', name3: '"+name3+"', shuffle: '"+BelkaServer.allShuffles.get(numb).shuffle+"'})");
			}
			else if(request.indexOf("addPlayer")!=-1){
				boolean temp = false;
				Game current = findGame(request);
				
				if(current.players.size()==4) temp=true;

				pout.print("callback({full: "+temp+"})");
			}
			else if(request.indexOf("setUpNewGame")!=-1){
				// parse the line
				parseRequest(request);
				
				pout.print("HTTP/1.0 200 OK\r\n" +
					"Content-Type:jsonp\r\n" +
					"Date: " + new Date() + "\r\n" +
					"Server: FileServer 1.0\r\n\r\n");
				if(BelkaServer.gameID==""){
					int id=0;
					Game test = new Game(BelkaServer.userName);
					BelkaServer.allGames.add(test);

					Shuffle newShuffle = new Shuffle();
					BelkaServer.allShuffles.add(newShuffle);

					id = test.players.size()-1;
					pout.print("callback({name: '"+BelkaServer.userName+"', playerId: "+id+"})");
					
				}
				else{
					int id=0;
					for(Game game: BelkaServer.allGames){
						if(game.players.get(0).equals(BelkaServer.gameID)){
							game.addPlayer(BelkaServer.userName);
							id = game.players.size()-1;
						}
					}
					pout.print("callback2({name: '"+BelkaServer.userName+"', gameId: '"+BelkaServer.gameID+"', playerId: "+id+"})");
				}
			}
			
			out.flush();
			out.close(); 
			in.close();
			try {
				if (connection != null) connection.close();
			} catch (Exception e) { 
				System.err.println(e);
			}
		} catch (Exception e) {
			System.err.println(e);
		}
	}
	
	private void parseRequest(String request){

		int startIndex = getRequestParameter(request, "name");
		int endIndex = request.indexOf('&', startIndex);
		int startIndex2 = getRequestParameter(request, "id");
		int endIndex2 = request.indexOf('&', startIndex2);
		
		if(startIndex!=4 & startIndex2!=2){
			BelkaServer.userName = request.substring(startIndex, endIndex);
			BelkaServer.gameID = request.substring(startIndex2, endIndex2);
			System.out.println(BelkaServer.userName + " joined game "+BelkaServer.gameID);
		}
		else if(startIndex!=4){
			BelkaServer.userName = request.substring(startIndex, endIndex);
			BelkaServer.gameID="";
			System.out.println(BelkaServer.userName + " created a new game");
		}
	}

	private int getRequestParameter(String request, String parameter){
		int index = request.indexOf(parameter)+parameter.length()+1; // -1 if doent exist
		return index;
	}

	private void log(Socket connection, String msg) {
		System.err.println(new Date() + " [" + connection.getInetAddress().getHostAddress() + 
			   ":" + connection.getPort() + "] " + msg);
	}

	private Game findGame(String request){
		Game current = BelkaServer.allGames.get(0);
		int start = request.indexOf("gameid")+7; int end = request.indexOf('&', start); 
		String gameID = request.substring(start, end);
		
		for(Game game: BelkaServer.allGames) {
			if(game.players.get(0).equals(gameID)) current = game;
		}
		return current;
	}

	
}


class Game{
	private int count=0;
	public ArrayList<String> players=new ArrayList<String>();
	public String nextMove="0";
	public String playedCard;
	public String prevPlayer;
	public boolean[] flag = new boolean[4]; 
	public boolean newDeal;

	public Game(String creator){
		addPlayer(creator);	
	}

	public void addPlayer(String player){
		if(count<4){
			players.add(player);
			count++;
		}
	}
}

class Shuffle{

	public String shuffle;

	public Shuffle(){
		shuffle = shuffleCards();
	}

	public String shuffleCards(){
		int[] array = new int[32];
		int[][] players = new int[4][8];

		for(int i=0;i<32;i++) { array[i]=i; }

		String wholeString = "[";

		for(int i=0; i<4; i++){
			int[] temp = new int[8];

			for(int j=0; j<8; j++){
				int rdm=111;
				do { rdm = (int)Math.round(Math.random()*(array.length-1)); }
				while (array[rdm]==111);
				
				players[i][j] = array[rdm];
				temp[j] = players[i][j];
				array[rdm]=111;
			}
		}

		for(int i=0; i<4; i++){
			String string = "[";
			for(int j=0; j<8; j++){
				if(j<7)  string += players[i][j] + ",";
				else string += players[i][j] + "]";
			}
			if(i<3) wholeString += string + ",";
			else wholeString += string;
		}
		wholeString += "]";
		
		return wholeString;
	}
}

