export type IdmIntegrationServiceScriptWrapper = {

    /**
     * Creates a new object in IDM.
     *
     * @param resourceName  The resource name of the object to be created. e.g. "managed/user"
     * @param newResourceId The new ID of the object to be created.  Set to 'null' if the server should generate the
     *                      ID.
     * @param content       The object being created
     * @param params        Additional parameters that are passed to the create request
     * @param fields        An array of the fields that should be returned in the result. The list of fields can include
     *                      wild cards, such as * or *_ref. If no fields are specified, the entire new object is
     *                      returned.
     * @return The created object
     * @throws ResourceException    when object creation fails
     */
    create: (resourceName: string, newResourceId: string, content: Record<string, any>, params?: Record<string, any>, fields?: any[]) => Record<string, any>;

    /**
     * Reads and returns a resource object.
     *
     * @param resourceName The full path to the object to be read, including the ID.
     * @param params       The parameters that are passed to the read request. Generally, no additional parameters are
     *                     passed to a read request, but this might differ, depending on the request. If you need to
     *                     specify a list of fields as a third parameter, and you have no additional params to pass, you
     *                     must pass null here. Otherwise, you simply omit both parameters.
     * @param fields       An array of the fields that should be returned in the result. The list of fields can include
     *                     wild cards, such as * or *_ref. If no fields are specified, the entire object is returned.
     * @return The resource object, or null if not found.
     * @throws ResourceException    when there was an unexpected error.
     */
    read: (resourceName: string, params?: Record<string, any>, fields?: any[]) => Record<string, any>;

    /**
     * Updates an entire resource object.
     *
     * @param id     The complete path to the object to be updated, including its ID.
     * @param rev    The revision of the object to be updated. Use null if the object is not subject to revision
     *               control, or if you want to skip the revision check and update the object, regardless of the
     *               revision.
     * @param value  The complete replacement object
     * @param params The parameters that are passed to the update request.
     * @param fields An array of the fields that should be returned in the result. The list of fields can include wild
     *               cards, such as * or *_ref. If no fields are specified, the entire object is returned.
     * @return The modified resource object
     * @throws ResourceException    when the object cannot be updated
     */    
    update: (id: string, rev: string, value: Record<string, any>, params?: Record<string, any>, fields?: any[]) => Record<string, any>;

    /**
     * Deletes an object.
     *
     * @param resourceName The complete path to the object to be deleted, including its ID.
     * @param rev          The revision of the object to be deleted. Use null if the object is not subject to revision
     *                     control, or if you want to skip the revision check and delete the object, regardless of the
     *                     revision.
     * @param params       The parameters that are passed to the delete request.
     * @param fields       An array of the fields that should be returned in the result. The list of fields can include
     *                     wild cards, such as * or *_ref. If no fields are specified, the entire object is returned.
     * @return The deleted object
     * @throws ResourceException    when the object cannot be deleted
     */
    delete: (resourceName: string, rev: string, params?: Record<string, any>, fields?: any[]) => Record<string, any>;

    /**
     * Performs a partial modification of a managed or system object. Unlike the update function, only the modified
     * attributes are provided, not the entire object.
     *
     * @param resourceName The full path to the object being updated, including the ID.
     * @param rev          The revision of the object to be updated. Use null if the object is not subject to revision
     *                     control, or if you want to skip the revision check and update the object, regardless of the
     *                     revision.
     * @param patch        An array of one or more JSON objects.
     * 
     *                     The value of the modifications to be applied to the object. The patch set includes the
     *                     operation type, the field to be changed, and the new values. A PATCH request can add, remove,
     *                     replace, or increment an attribute value.
     * @param params       Additional parameters that are passed to the patch request.
     * @param fields       An array of the fields that should be returned in the result. The list of fields can include
     *                     wild cards, such as * or *_ref. If no fields are specified, the entire new object is
     *                     returned.
     * @return The modified resource object.
     * @throws ResourceException    when the object could not be patched
     */
    patch: (resourceName: string, rev: string, patch: any[], params?: Record<string, any>, fields?: any[]) => Record<string, any>;

    /**
     * Performs an action on an object.
     *
     * @param resource   The resource that the function acts upon, for example, managed/user.
     * @param actionName The action to execute. Actions are used to represent functionality that is not covered by the
     *                   standard methods for a resource (create, read, update, delete, patch, or query). In general,
     *                   you should not use the openidm.action function for create, read, update, patch, delete or query
     *                   operations. Instead, use the corresponding function specific to the operation (for example,
     *                   openidm.create).
     * @param content    Content given to the action for processing.
     * @param params     Additional parameters passed to the script. The params object must be a set of simple key:value
     *                   pairs, and cannot include complex values.
     * @param fields     An array of the fields that should be returned in the result. The list of fields can include
     *                   wild cards, such as * or *_ref. If no fields are specified, the entire object is returned.
     * @return Result of the action, may be null.
     * @throws ResourceException    when the action fails
     */
    action: (resource: string, actionName: string, content?: Record<string, any>, params?: Record<string, any>, fields?: any[]) => Record<string, any>;

    /**
     * Performs a query on the specified resource object.
     *
     * @param resourceName The resource name of the object to be queried
     * @param params       The parameters that are passed to the query (_queryFilter, or _queryId). Additional
     *                     parameters passed to the query will differ, depending on the query.
     * @param fields       A list of the fields that should be returned in the result. The list of fields can include
     *                     wild cards, such as * or *_ref.
     * @return The result of the query.
     * @throws ResourceException    when the object could not be queried
     */
    query: (resourceName: string, params: Record<string, any>, fields?: any[]) => Record<string, any>;
}
