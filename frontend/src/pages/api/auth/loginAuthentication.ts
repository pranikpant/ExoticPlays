const API_URL = 'http://localhost:8080/api'

interface AuthResponse {
  success: boolean
  error?: string
}

export async function LoginAuthentication(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        }),
        credentials: 'include'
    });
    return await response.json();
};
