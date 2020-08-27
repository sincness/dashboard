module.exports = {

    stamp2time: (stamp) => {
        let date = new Date(stamp * 1000); //Konverterer unix timestamp til js timestamp
        let hours = date.getHours(); //Henter timer
        let minutes = date.getMinutes(); //Henter minutter
        hours = (hours < 10) ? String(hours).padStart(2, "0") : hours; //Sætter 0 foran hvis < 9
        minutes = (minutes < 10) ? String(minutes).padStart(2, "0") : minutes; //Sætter 0 foran hvis < 9
        return hours + ':' + minutes; //Returnerer format
    },


}