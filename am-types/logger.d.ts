export type ScriptedLoggerWrapper = {
    isTraceEnabled: () => boolean;
    isDebugEnabled: () => boolean;
    isInfoEnabled: () => boolean;
    isWarnEnabled: () => boolean;
    isErrorEnabled: () => boolean;

    trace: (message: string, ...arguments: any[]) => void;
    debug: (message: string, ...arguments: any[]) => void;
    info: (message: string, ...arguments: any[]) => void;
    warn: (message: string, ...arguments: any[]) => void;
    error: (message: string, ...arguments: any[]) => void;
}
