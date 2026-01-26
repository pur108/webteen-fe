import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    username: string;
    role: string;
    backendToken?: string;
  }

  interface Session {
    backendToken?: string;
    error?: string;
    user: {
      id: string;
      username: string;
      email: string;
      image: string;
      role: "user" | "creator" | "admin";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    image: string;
    role: "user" | "creator" | "admin";
    backendToken: string;
    error?: string;
  }
}
