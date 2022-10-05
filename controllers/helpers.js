const formatNumber = (num) => num < 10 ? `0${num}` : `${num}`;

const formatDate = (date, withHour=false) => {    
    let dateString = '';

    dateString += formatNumber(date.getDate()) + '/';
    dateString += formatNumber(date.getMonth());
    dateString += `/${1900+date.getYear()}`;
    
    if(withHour) dateString += ' - ' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes());

    return dateString;
}

const formatDay = (date) => {
    let dateString = '';
    dateString += formatNumber(date.getDate()) + '.';
    dateString += formatNumber(date.getMonth()+1);
    return dateString;
}

const formatHour = (date) => {
    let dateString = '';
    dateString += formatNumber(date.getHours()) + ':';
    dateString += formatNumber(date.getMinutes());
    return dateString;
}

const formatMessage = (message, start) => {
    return message.replace(/!data!/g, formatDay(start)).replace(/!godz!/g, formatHour(start));
}

module.exports = {
    formatDate,
    formatMessage
}