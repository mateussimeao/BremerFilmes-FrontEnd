import { TOKEN_KEY } from "./User";

export const httpClient = async (
    url,
    options
  ) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7090";
    const response = await fetch(`${baseUrl}${url}`, options);
    if(response.status == 401){
        localStorage.removeItem(TOKEN_KEY);
        throw new Error("Erro de autorização");
    }
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro na API");
    }
    return response.json();
  };