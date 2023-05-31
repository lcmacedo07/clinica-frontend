export const useUtilities = () => {

    function uppercase(str: string) {
        return str.toUpperCase();
    }

    function lowercase(str: string) {
        return str.toLowerCase();
    }

    function dateBRL(str: string) {
        let y, m, d, dateReceived, dateConvert;
        dateReceived = str.toString();
        dateReceived = dateReceived.split("-");
        y = dateReceived[0];
        m = dateReceived[1];
        d = dateReceived[2];
        dateConvert = d + '/' + m + '/' + y;

        return dateConvert;
    }

    function datetimeBRL(str: string) {
        let y, m, d, dateReceived, dateConvert, date, time;
        dateReceived = str.toString();

        dateReceived = dateReceived.split(" ");

        date = dateReceived[0].split("-");
        time = dateReceived[1];

        y = date[0];
        m = date[1];
        d = date[2];
        dateConvert = `${d}/${m}/${y} às ${time}`;

        return dateConvert;
    }

    function datetimezoneBRL(str: string) {
        const date = new Date(str);
        return date.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    function hoursSchedule(str: string) {
        let hours, h1, h2, hoursConvert;

        hours = str.split("-");
        h1 = hours[0];
        h2 = hours[1];
        hoursConvert = 'de ' + h1 + 'h às ' + h2 + 'h';
        return hoursConvert;
    }

    function toCurrency(str: string) {
        if (typeof str !== "number") {
            return str;
        }
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formatter.format(str);
    }






    return {
        toTitleCase,
    }
}