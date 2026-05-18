import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const APP_URL = import.meta.env.VITE_APP_URL;

/**
 * Instância configurada do Axios para comunicação com a API.
 * 
 * Configurações padrão:
 * - baseURL definida via variável de ambiente (VITE_API_URL)
 * - Cabeçalhos JSON para requisições e respostas
 * 
 * Esta instância deve ser reutilizada em toda a aplicação
 * para garantir consistência e facilitar manutenção.
 */
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // essencial para Sanctum SPA
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

/**
 * Garante que o cookie CSRF do Sanctum seja carregado
 * antes de qualquer requisição protegida.
 *
 * Deve ser chamado:
 * - antes do login
 * - antes da primeira requisição autenticada
 */
export async function ensureCsrfCookie() {
    await axios.get(`${APP_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        headers: {
            Accept: 'application/json'
        }
    });
}

/**
 * Interceptor para garantir CSRF automaticamente
 * em requisições mutáveis.
 */
api.interceptors.request.use(async (config) => {
    const method = config.method?.toLowerCase();

    if (['post', 'put', 'patch', 'delete'].includes(method)) {
        await ensureCsrfCookie();
    }

    return config;
});

export default api;