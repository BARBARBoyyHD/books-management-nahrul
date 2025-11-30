import { login } from "@/app/(auth)/login/action";
import { register } from "@/app/(auth)/register/action";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

interface ActionResponse {
  success: boolean;
  message?: string;
}

/**
 * Custom hook for handling user login mutation using a Server Action.
 * @param onSuccessfulLogin Optional callback to run after success (e.g., redirect).
 * @returns A useMutation result object.
 */
export function useLogin(
  onSuccessfulLogin?: () => void
): UseMutationResult<ActionResponse, Error, LoginCredentials> {
  return useMutation<ActionResponse, Error, LoginCredentials>({
    mutationKey: ["login"],

    mutationFn: async (credentials: LoginCredentials) => {
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      const result = await login(formData);

      // ❗ If backend says failed -> treat as error
      if (!result.success) {
        return Promise.reject(
          new Error(result.message || "Invalid email or password.")
        );
      }

      return result;
    },

    onSuccess: (data) => {
      toast.success("Login Successful!", {
        description: data.message || "Welcome back!",
      });

      if (onSuccessfulLogin) onSuccessfulLogin();
    },

    onError: (error) => {
      toast.error("Login Failed", {
        description: error.message || "Invalid email or password.",
      });
    },
  });
}

/**
 * Custom hook for handling user registration mutation using a Server Action.
 * NOTE: You must create a corresponding `register` Server Action in your action.ts.
 */
export function useRegister(
  onSuccessfulRegistration?: () => void
): UseMutationResult<ActionResponse, Error, RegisterCredentials> {
  return useMutation<ActionResponse, Error, RegisterCredentials>({
    mutationKey: ["register"],

    mutationFn: async (credentials: RegisterCredentials) => {
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      if (credentials.name) {
        formData.append("name", credentials.name);
      }

      // Call the imported Server Action directly (Assuming you create this function)
      const result = await register(formData);

      if (!result.success) {
        throw new Error(result.message || "Registration failed.");
      }
      return result;
    },

    onSuccess: () => {
      toast.success("Registration successful!", {
        description: "You are now logged in.",
      });
      if (onSuccessfulRegistration) {
        onSuccessfulRegistration();
      }
    },

    onError: (error) => {
      toast.error("Registration Error", {
        description: error.message,
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const result = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!result.ok) {
        const errorBody = await result.json();
        throw new Error(errorBody.error || "Logout failed on the server.");
      }
      return result.json();
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logout successful! Redirected To Home");
      window.location.href = "/";
    },

    onError: (error) => {
      toast.error("Logout Error", {
        description: error.message,
      });
    },
  });
}
