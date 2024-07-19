import * as am from "am-types";

declare global {
    const logger: am.ScriptedLoggerWrapper;
    const httpClient: am.HttpClientScriptWrapper;
    const callbacks: am.ScriptedCallbacksWrapper;
    const callbacksBuilder: am.ScriptedCallbacksBuilder;
    const nodeState: am.NodeStateScriptWrapper;
    const systemEnv: am.ScriptPropertyResovler;
    const idRepository: am.ScriptedIdentityRepositoryScriptWrapper;
    const openidm: am.IdmIntegrationServiceScriptWrapper;
    const requestParameters: {
        get: (parameterName: string) => {
            get: (index: number) => string
        }
    };

    const action: {
        goTo: (outcome: string) => void
    };

    const scriptName: string;
}

export {};
