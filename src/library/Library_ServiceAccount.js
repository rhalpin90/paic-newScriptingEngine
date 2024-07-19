/** @typedef {import('am-types').HttpClientScriptWrapper} HttpClient */

module.exports = function (/** @type HttpClient */ httpClient) {
    function getAccessTokenEndpoint(tenantFqdn) {
        return 'https://' + tenantFqdn + ':443/am/oauth2/access_token';
    }

    /**
     * Generates a JSON Web Token (JWT) unique identifier (JTI).
     */
    function createJti() {
        var bytes = org.forgerock.openam.shared.security.ThreadLocalSecureRandom.nextBytes(16);
        var jti = org.forgerock.util.encode.Base64.encode(bytes);
        return jti;
    }

    function createClaimsSet(tenantFqdn, serviceAccountId) {
        var oauthAccessTokenEndpoint = getAccessTokenEndpoint(tenantFqdn);
        var fifteenMinutesFromNow = new java.util.Date(new java.util.Date().getTime() + (15 * 60 * 1000));
        var jti = createJti();

        var claimsSet = new org.forgerock.json.jose.jwt.JwtClaimsSet();
        claimsSet.setIssuer(serviceAccountId);
        claimsSet.setSubject(serviceAccountId);
        claimsSet.addAudience(oauthAccessTokenEndpoint);
        claimsSet.setExpirationTime(fifteenMinutesFromNow);
        claimsSet.setJwtId(jti);
        return claimsSet;
    }

    function buildJws(tenantFqdn, serviceAccountId, serviceAccountJwk) {
        var claimsSet = createClaimsSet(tenantFqdn, serviceAccountId);
        var rsaJwk = org.forgerock.json.jose.jwk.RsaJWK.parse(serviceAccountJwk);
        var key = rsaJwk.toRSAPrivateKey();
        var rsaSigningHandler = new org.forgerock.json.jose.jws.handlers.RSASigningHandler(key);
        var jws = new org.forgerock.json.jose.builders.SignedJwtBuilderImpl(rsaSigningHandler)
            .headers()
            .alg(org.forgerock.json.jose.jws.JwsAlgorithm.RS256)
            .done()
            .claims(claimsSet)
            .build();
        return String(jws);
    }

    function fetchAccessToken(tenantFqdn, scope, serviceAccountId, serviceAccountJwk) {
        var oauthAccessTokenEndpoint = getAccessTokenEndpoint(tenantFqdn);
        var body = [
            'client_id=service-account',
            'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer'),
            'assertion=' + encodeURIComponent(buildJws(tenantFqdn, serviceAccountId, serviceAccountJwk)),
            'scope=' + encodeURIComponent(scope)
        ].join('&');
        try {
            var response = httpClient.send(oauthAccessTokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: body
            }).get();
            if (!response.ok) {
                throw new Error('Failed to get access_token: ' + response.status + ' // ' + response.text());
            }
            var responseBody = response.json();
            return responseBody.access_token;
        } catch (ex) {
            throw new Error('Exception while getting access_token: ' + ex.toString());
        }
    }

    return {
        fetchAccessToken: fetchAccessToken
    };
};
