interface SignUpData {
  email: string;
  password: string;
  agreedToTerms: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const BLOCKED_DOMAINS = ["blocked.com", "spam.com", "temp.com"];
const EXISTING_USERS = ["user@example.com"];

export const signUp = async (data: SignUpData): Promise<ApiResponse> => {
  const delay = Math.random() * 1500 + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }
  if (!data.password) {
    return {
      success: false,
      message: "Password is required.",
    };
  }

  if (data.password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  if (!data.agreedToTerms) {
    return {
      success: false,
      message: "You must agree to the Terms of Service.",
    };
  }
  const domain = data.email.split("@")[1];
  if (BLOCKED_DOMAINS.includes(domain)) {
    return {
      success: false,
      message: "This email domain is blocked.",
    };
  }
  if (EXISTING_USERS.includes(data.email)) {
    return {
      success: false,
      message: "This email is already in use.",
    };
  }
  return {
    success: true,
    message: "Sign up successful! Welcome aboard!",
  };
};

export const signIn = async (
  email: string,
  password: string,
): Promise<ApiResponse> => {
  const delay = Math.random() * 1000 + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (email === "user@example.com" && password === "password123") {
    return {
      success: true,
      message: "Login successful!",
    };
  }

  return {
    success: false,
    message: "Invalid email or password.",
  };
};
