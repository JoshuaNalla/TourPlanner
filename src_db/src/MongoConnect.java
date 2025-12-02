import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.mindrot.jbcrypt.BCrypt;

public class MongoConnect {

    public static void registerUser(MongoCollection<Document> users, String username, String password) {
        // Check if username exists
        Document existing = users.find(Filters.eq("username", username)).first();
        if (existing != null) {
            System.out.println("Username already taken!");
            return;
        }

        // Hash the password
        String hashed = BCrypt.hashpw(password, BCrypt.gensalt());

        // Insert new user
        Document user = new Document("username", username).append("password", hashed);
        users.insertOne(user);
        System.out.println("User registered successfully!");
    }

    public static boolean loginUser(MongoCollection<Document> users, String username, String password) {
        Document user = users.find(Filters.eq("username", username)).first();
        if (user == null) {
            System.out.println("User not found!");
            return false;
        }

        String storedHash = user.getString("password");
        return BCrypt.checkpw(password, storedHash);
    }

    public static void main(String[] args){
        MongoClient client = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase db = client.getDatabase("UserDB");
        MongoCollection<Document> users = db.getCollection("users");

        // Example: Register a new user
        registerUser(users, "alice", "mypassword123");

        // Example: Try logging in
        boolean success = loginUser(users, "alice", "mypassword123");
        System.out.println("Login success: " + success);

    }
}
