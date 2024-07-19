import * as am from './index'

export type NodeState = {
    /**
     * Get the value for the given key from the state. The order of state types checked is the following:
     * 
     * 1. transient
     * 1. secure
     * 1. shared
     * 
     * @param key The key.
     * @returns The value or `null` if the key is not defined.
     */
    get: (key: string) => am.JsonValue;

    /**
     * Get the value for the given key from the state. Combines state from transient, secure and shared when values are
     * maps into an immutable object.
     * @param key The key.
     * @return The value or `null` if the key is not defined.
     */
    getObject: (key: string) => am.JsonValue;

    /**
     * Checks if the given key is defined in any of the types of state.
     *
     * @param key The key.
     * @return `true` if the key is defined, otherwise `false`.
     */
    isDefined: (key: string) => boolean;

    // TODO
    // keys: () => JavaSet<string>;

    /**
     * Puts the given key/value pair in the shared state.
     *
     * The shared state should only be used for non-sensitive information that will be signed
     * on round trips to the client.
     *
     * @param key The key.
     * @param value The value.
     * @return This modified `NodeState` instance.
     */
    putShared: (key: string, value: any) => NodeState;

    /**
     * Puts the given key/value pair in the transient state.
     *
     * The transient state should only be used for sensitive information that will be encrypted
     * on round trips to the client.
     *
     * @param key The key.
     * @param value The value.
     * @return This modified `NodeState` instance.
     */
    putTransient: (key: string, value: any) => NodeState;

    /**
     * Removes the given key from all states.
     *
     * @param key The key to remove.
     */
    remove: (key: string) => void;
}

export type NodeStateScriptWrapper = {
    /**
     * Get the value for the given `key` from the state. The order of state types checked is the following:
     * 
     * 1. transient
     * 1. secure
     * 1. shared
     * 
     * @param key The key.
     * @returns The value or `null` if the key is not defined.
     */
    get: (key: string) => any | null;

    /**
     * Get the value for the given key from the state. Combines state from transient, secure and shared when values are
     * maps into an immutable object.
     * @param key The key.
     * @return The value or null if the key is not defined.
     */
    getObject: (key: string) => any | null;

    /**
     * Checks if the given key is defined in any of the types of state.
     *
     * @param key The key.
     * @return `true` if the key is defined, otherwise `false`.
     */
    isDefined: (key: string) => boolean;

    // TODO
    // keys: () => JavaSet<string>;

    /**
     * Puts the given key/value pair in the shared state.
     *
     * The shared state should only be used for non-sensitive information that will be signed
     * on round trips to the client.
     *
     * @param key The key.
     * @param value The value.
     * @return This modified `NodeStateScriptWrapper` instance.
     */
    putShared: (key: string, value: any) => NodeStateScriptWrapper;

    /**
     * Puts the given key/value pair in the transient state.
     *
     * The transient state should only be used for sensitive information that will be encrypted
     * on round trips to the client.
     *
     * @param key The key.
     * @param value The value.
     * @return This modified `NodeStateScriptWrapper` instance.
     */
    putTransient: (key: string, value: any) => NodeStateScriptWrapper;

    /**
     * Removes the given key from all states.
     *
     * @param key The key to remove.
     */
    remove: (key: string) => void;
}
