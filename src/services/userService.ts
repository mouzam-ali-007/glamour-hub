import usersData from '@/data/users.json';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class UserService {
  private users: User[] = usersData;

  // Get all users
  getAllUsers(): User[] {
    return this.users;
  }

  // Find user by email
  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // Check if user exists
  userExists(email: string): boolean {
    return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // Add new user
  addUser(userData: NewUser): User {
    const newUser: User = {
      id: Date.now().toString(), // Simple ID generation
      ...userData
    };
    
    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  // Validate user credentials
  validateUser(email: string, password: string): User | null {
    const user = this.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // Save users to localStorage (simulating database persistence)
  private saveUsers(): void {
    try {
      localStorage.setItem('users', JSON.stringify(this.users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  // Load users from localStorage on initialization
  loadUsersFromStorage(): void {
    try {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback to default users if localStorage fails
      this.users = usersData;
    }
  }
}

// Create singleton instance
const userService = new UserService();

// Load users from storage on service initialization
userService.loadUsersFromStorage();

export default userService; 