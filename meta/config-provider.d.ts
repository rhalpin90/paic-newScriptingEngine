import * as am from 'am-types';

declare global {
    var nodeState: am.NodeState;
    var systemEnv: am.ScriptPropertyResovler;
    let config: any;
}

export {}
