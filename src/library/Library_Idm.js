// Library Script for IDM common functionality

/** @typedef {import('am-types').HttpClientScriptWrapper} HttpClient */

module.exports = function (/** @type HttpClient */ httpClient) {
    /**
     * Creates an instance of an IDM connector helper.
     * @param {string} tenantFqdn
     * @param {string} connectorName
     * @param {string} accessToken
     */
    function createConnector(tenantFqdn, connectorName, accessToken) {
        /**
         * Queries the `openidm/system/<connector-name>/user` endpoint with the given `queryFilter` for the specified
         * `fields`.
         * @param {string} queryFilter
         * @param {string[]} fields
         */
        function queryUser(queryFilter, fields) {
            var url = 'https://' + tenantFqdn + '/openidm/system/' + connectorName + '/user'
                + '?_queryFilter=' + encodeURIComponent(queryFilter)
                + '&_fields=' + encodeURIComponent(fields.join(','));
            var response = httpClient.send(url, {
                method: 'GET',
                headers: {
                    'Accept-API-Version': 'resource=1.0'
                },
                token: accessToken
            }).get();
            if (!response.ok) {
                throw new Error('IDM search by email was expected to succeed but was actually: [' + response.status + '] ' + response.text());
            }
            return response.json();
        }

        function findUserByEmail(mail, fields) {
            var queryFilter = '/mail eq "' + mail + '"';
            return queryUser(queryFilter, fields);
        }

        function findUserByUserName(username, fields) {
            var queryFilter = '/userName eq "' + username + '"';
            return queryUser(queryFilter, fields);
        }

        function patchUserPassword(userId, password) {
            var url = 'https://' + tenantFqdn + '/openidm/system/' + connectorName + '/user/' + userId;
            var response = httpClient.send(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                token: accessToken,
                body: [
                    {
                        operation: 'replace',
                        field: '/password',
                        value: password
                    }
                ]
            }).get();
            if (!response.ok) {
                throw new Error('IDM patch failed: [' + response.status + '] ' + response.text());
            }
        }

        return {
            findUserByEmail: findUserByEmail,
            findUserByUserName: findUserByUserName,
            patchUserPassword: patchUserPassword
        };
    }

    return {
        createConnector: createConnector
    };
};
