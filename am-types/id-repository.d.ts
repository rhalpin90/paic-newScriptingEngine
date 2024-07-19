export type ScriptedIdentityScriptWrapper = {
    /**
     * Retrieves a particular attribute's value
     * @param attributeName The name of the attribute to be retrieved
     * @return The value of the attribute
     */
    getAttributeValues: (attributeName: string) => string[];

    /**
     * Sets the attribute's values. If the attribute already exists all existing values will be overridden. If it doesn't exist, it will be created.
     * @param attributeName The name of the attribute
     * @param attributeValues The values of the attribute
     */
    setAttribute: (attributeName: string, attributeValues: string[]) => void;
    
    /**
     * Adds a new attribute value to the existing set for the named attribute. If the identity does not have any
     * existing values, this sets the attribute to have the single value provided.
     * @param attributeName The name of the attribute
     * @param attributeValue The value of the attribute to add
     */
    addAttribute: (attributeName: string, attributeValue: string) => void;
    
    /**
     * Persists the current state of the user's attributes
     */
    store: () => void;
};

export type ScriptedIdentityRepositoryScriptWrapper = {
    /**
     * Retrieves the attributes associated with a particular user
     *
     * @param userName The name of the user
     * @return A ScriptedIdentity object containing the attributes for the specified user, or null if not found
     */
    getIdentity: (userName: string) => ScriptedIdentityScriptWrapper;
}
