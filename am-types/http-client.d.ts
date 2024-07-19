export type HttpMethod =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH"

export type ResponseScriptWrapper = {
    headers: Record<string, string[]>;
    ok: boolean;
    status: number;
    statusText: string;

    formData: () => Record<string, string[]>;
    json: () => Record<string, any>;
    text: () => string;
}

export type HttpClientScriptWrapper = {
    send: (uri: string, requestOptions?: {
        method?: HttpMethod;
        headers?: Record<string, any>
        token?: string;
        body?: any;
    }) => Promise<ResponseScriptWrapper> & { get: () => ResponseScriptWrapper };
}
