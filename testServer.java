import java.net.*;
import java.io.*;
import java.util.*;
 
public class testServer {
    public static void main(String[] args) throws IOException {
 
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
			Socket connection = null;
			try {
				// wait for request
				connection = socket.accept();
				BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
				OutputStream out = new BufferedOutputStream(connection.getOutputStream());
				PrintStream pout = new PrintStream(out);
				
				// read first line of request (which is url thing, ignore the rest)
				String request = in.readLine();
				if (request==null) continue;
				log(connection, request);
				
				System.out.println(request);
				// parse the line
				//out.print("Connectdet!");
				
				//out.close();
				//connection.close();
				out.flush();
				out.close();
				in.close();
				connection.close();
			} catch (IOException e) { 
				System.err.println(e);
			}
			try {
				if (connection != null) connection.close(); 
			} catch (IOException e) { 
				System.err.println(e);
			}
			
        
        socket.close();
		}
    }
	
	private static void log(Socket connection, String msg) {
		System.err.println(new Date() + " [" + connection.getInetAddress().getHostAddress() + 
			   ":" + connection.getPort() + "] " + msg);
    }
}