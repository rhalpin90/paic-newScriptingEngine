/**
 * Generate a Version 4 (pseudorandom), Variant 1 (big-endian) UUID. This uses
 * Java's Math.random and therefore does not gurantee true randomness but
 * it should work for most cases unless you need to generate lots and worry
 * collisions.
 */
function v4() {
    return 'xxxxxxxx-xxxx-4xxx-Nxxx-xxxxxxxxxxxx'
        .replace(/x/g, () => ((Math.random() * 16) | 0).toString(16))
        .replace(/N/g, () => ((Math.random() * 4) | 0 + 8).toString(16));
}

module.exports = {
    v4: v4
};
