export type ScriptPropertyResovler = {
    /**
     * Retrieve the property with the input name as a String.
     *
     * @param propertyName the name of the property value to retrieve, this must start with the prefix configured in
     *                     the global scripting configuration. Must not contain a | character.
     * @param defaultValue the default value to be used, if the `propertyName` cannot be retrieved
     * @return the property value as a String
     * @throws ScriptPropertyResolverException if the property cannot be retrieved
     */
    getProperty: (propertyName: string, defaultValue?: string) => string;
}
