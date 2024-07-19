function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDateToLdapString(/** @type Date */ date) {
    var yyyy = date.getFullYear();
    var MM = pad(date.getMonth() + 1);
    var dd = pad(date.getDate());
    var HH = pad(date.getHours());
    var mm = pad(date.getMinutes());
    var ss = pad(date.getSeconds());
    return yyyy + MM + dd + HH + mm + ss + 'Z';
}

function parseLdapStringToDate(dateString) {
    var year = parseInt(dateString.substring(0, 4), 10);
    // Months are zero-based
    var month = parseInt(dateString.substring(4, 6), 10) - 1;
    var day = parseInt(dateString.substring(6, 8), 10);
    var hours = parseInt(dateString.substring(8, 10), 10);
    var minutes = parseInt(dateString.substring(10, 12), 10);
    var seconds = parseInt(dateString.substring(12, 14), 10);

    return new Date(year, month, day, hours, minutes, seconds);
}
module.exports = {
    addDays: addDays,
    formatDateToLdapString: formatDateToLdapString,
    parseLdapStringToDate: parseLdapStringToDate
};
