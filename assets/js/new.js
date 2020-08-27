// Array.insert prototype function
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

// Site reloader - hvert 20. minut > 1200000ms 10. minut > 600000ms
setTimeout(_ => {
window.location.reload();
}, 600000)

w3.slideshow('.etage', 4000)
let test1 = true
let test2 = true
let test3 = true
let test4 = true

// Global variables
const proxy = "https://cors-anywhere.herokuapp.com/";






// BUS 17 MOD AALBORG BUSTERMINAL

// Den rigtige fremgangsmåde at køre tingene i funktionen på er der ses i alle nedenfor.
// Alle test
// De andre kan rettes til - der er ret mange bugs hvis der er over en time imellem at bussen kommer, da den kun kan vise
// med antal minutter.. Så der er mange ting der kan forbedres!

// t er en variabel for antallet af gange funktion har kørt igennem - den starter sådan her
// 0 = 1 gang, 1 = 2 gange, 2 = 3 gange, osv.. ligesom key i arrays
startBus17 = async (t = 0) => {
    let bus17 = await( await fetch(proxy + "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851973402&rttime&format=json&useBus=1")).json()
    bus17 = await bus17.DepartureBoard.Departure
    let bus17modAab = []

    bus17.forEach(elem => {
        if (elem.direction == "Strubjerg") {
        bus17modAab.push(elem)
        }
    })

    console.log('Kennedy 17 Rute:')
    console.log(bus17modAab)

    let timer17
    let correctedTime = bus17modAab[t].date.split('.')
    let c1 = correctedTime.shift()
    correctedTime.insert(1, c1)
    let newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[t].time)

    timer17 = setInterval(function() {
    timeBetweenDates(newCompare)
    }, 1000)

    function timeReset(t, sT=60000){
        // clearInterval(timer17)
        correctedTime = bus17modAab[t].date.split('.')
        c1 = correctedTime.shift()
        correctedTime.insert(1, c1)
        newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[t].time)
        setTimeout(() => {
        test1 = true
        timer17 = setInterval(function() {
            timeBetweenDates(newCompare)
            }, 1000)        
        }, sT);

    }


    function timeBetweenDates(toDate) {

    let dateEntered = toDate
    let now = new Date()
    let difference1 = dateEntered.getTime() - now.getTime()

    if (difference1 <= 0) {

        // Timer færdig
        t++
        console.log('Antal af buskørsler: '+t)
        timeReset(t, 1)



        // // Timer done
        // clearInterval(timer17)
        //     correctedTime = bus17modAab[1].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[1].time)
        //     timer17 = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)

    } else {
        
        let seconds1 = Math.floor(difference1 / 1000)
        let minutes1 = Math.floor(seconds1 / 60)
        let hours1 = Math.floor(minutes1 / 60)

        minutes1 = minutes1 + 1

        hours1 %= 24
        minutes1 %= 60
        seconds1 %= 60

        document.querySelector('#bus17-aab').textContent = minutes1 + ' min'

        // if (minutes1 >= 30) {
        //     clearInterval(timer17)
        //     correctedTime = bus17modAab[1].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[1].time)
        //     timer17 = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
            
        // }
        
        // if (test1 == false) {
        //     clearInterval(timer17)
        //     correctedTime = bus17modAab[2].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[2].time)
        //     timer17 = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
        // }

        if (minutes1 <= 1) {
            clearInterval(timer17)
            document.querySelector('#bus17-aab').textContent = "Nu"
            if (test1) {
                t++
                console.log('Antal af buskørsler: '+t)
                console.log('TimeReset om 60 sekunder')
                // setTimeout( 
                    timeReset(t)
                // , 60000);
                test1 = false
                console.log('test - boolean turned: '+test1)
                }

            }
        }
    }

    }

startBus17()




// BUS 17 MOD SALTUMVEJ

startSaltum = async (t = 0) => {

    let bus17 = await( await fetch(proxy + "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851973402&rttime&format=json&useBus=1")).json()
    bus17 = await bus17.DepartureBoard.Departure
    let bus17modAab = []
    
    bus17.forEach(elem => {
        if (elem.direction == "Saltumvej") {
        bus17modAab.push(elem)
        }
    })

    console.log('Saltumvej Rute:')
    console.log(bus17modAab)
    
    let timerSaltum
    let correctedTime = bus17modAab[t].date.split('.')
    let c1 = correctedTime.shift()
    correctedTime.insert(1, c1)
    let newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[t].time)
    

    
    timerSaltum = setInterval(function() {
    timeBetweenDates(newCompare)
    }, 1000)
    

    function timeReset(t, sT=60000){
        clearInterval(timerSaltum)
        correctedTime = bus17modAab[t].date.split('.')
        c1 = correctedTime.shift()
        
        correctedTime.insert(1, c1)
        newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[t].time)
        setTimeout(() => {
        test3 = true
        timerSaltum = setInterval(function() {
            timeBetweenDates(newCompare)
            }, 1000)        
        }, sT);
     }



    function timeBetweenDates(toDate) {
    
    let dateEntered = toDate
    let now = new Date()
    let difference3 = dateEntered.getTime() - now.getTime()
    
    if (difference3 <= 0) {

        // Timer færdig
        t++
        console.log('Antal af buskørsler: '+t)
        timeReset(t, 1)


        // // Timer done
        // clearInterval(timerSaltum)
        //     correctedTime = bus17modAab[1].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[1].time)
        //     timerSaltum = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
    
    } else {
        
        let seconds3 = Math.floor(difference3 / 1000)
        let minutes3 = Math.floor(seconds3 / 60)
        let hours3 = Math.floor(minutes3 / 60)
    
        minutes3 = minutes3 + 1
    
        hours3 %= 24
        minutes3 %= 60
        seconds3 %= 60
    
        document.querySelector('#saltumvejtime').textContent = minutes3 + ' min'
    
        // if (minutes3 >= 30) {
        //     clearInterval(timerSaltum)
        //     correctedTime = bus17modAab[1].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[1].time)
        //     timerSaltum = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
            
        // }
        
        // if (test3 == false) {
        //     clearInterval(timerSaltum)
        //     correctedTime = bus17modAab[2].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus17modAab[2].time)
        //     timerSaltum = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
        // }
    
        if (minutes3 <= 1) {
            clearInterval(timerSaltum)
            document.querySelector('#saltumvejtime').textContent = "Nu"
            if (test3) {
                t++
                console.log('Antal af buskørsler: '+t)
                console.log('TimeReset om 60 sekunder')
                // setTimeout(
                    timeReset(t)
                // , 60000);
                test3 = false
                
                }   
            }
        }
    }
    
    }

    startSaltum()









// BUS 18 MOD STRUBJERG

startBus18 = async (t = 0) => {
// let bus18 = await( await fetch("http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851400602&rttime&format=json&useBus=1")).json()
let bus18 = await( await fetch(proxy + "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851400602&rttime&format=json&useBus=1")).json()
bus18 = await bus18.DepartureBoard.Departure
let bus18modAab = []
console.log(bus18);
bus18.forEach(elem => {
    if (elem.direction == "Aalborg Busterminal") {
    bus18modAab.push(elem)
    }
})
console.log(bus18modAab);


// console.log('Kennedy 18 Rute:')
// console.log(bus18modAab)

let timer18
let correctedTime = bus18modAab[t].date.split('.')
let c1 = correctedTime.shift()
correctedTime.insert(1, c1)
let newCompare = new Date(correctedTime.join('.')+'.'+bus18modAab[t].time)

timer18 = setInterval(function() {
timeBetweenDates(newCompare)
}, 1000)


function timeReset(t, sT=60000){
    correctedTime = bus18modAab[t].date.split('.')
    c1 = correctedTime.shift()
    
    correctedTime.insert(1, c1)
    newCompare = new Date(correctedTime.join('.')+'.'+bus18modAab[t].time)
    setTimeout(() => {
    test2 = true
    timer18 = setInterval(function() {
        timeBetweenDates(newCompare)
        }, 1000)        
    }, sT);
 }

function timeBetweenDates(toDate) {
let dateEntered = toDate
let now = new Date()
let difference2 = dateEntered.getTime() - now.getTime()

if (difference2 <= 0) {

    // Timer færdig
    t++
    console.log('Antal af buskørsler: '+t)
    timeReset(t, 1)



    // // Timer done
    // clearInterval(timer18)
    // correctedTime = bus18modAab[1].date.split('.')
    // c1 = correctedTime.shift()

    // correctedTime.insert(1, c1)
    // newCompare = new Date(correctedTime.join('.')+'.'+bus18modAab[1].time)
    // timer18 = setInterval(function() {
    //     timeBetweenDates(newCompare)
    //     }, 1000)

} else {
    
    let seconds2 = Math.floor(difference2 / 1000)
    let minutes2 = Math.floor(seconds2 / 60)
    let hours2 = Math.floor(minutes2 / 60)

    minutes2 = minutes2 + 1

    hours2 %= 24
    minutes2 %= 60
    seconds2 %= 60

    document.querySelector('#bus18-aab').textContent = minutes2 + ' min'

    // if (minutes2 >= 30) {
    //     clearInterval(timer18)
    //     correctedTime = bus18modAab[1].date.split('.')
    //     c1 = correctedTime.shift()

    //     correctedTime.insert(1, c1)
    //     newCompare = new Date(correctedTime.join('.')+'.'+bus18modAab[1].time)

    //     timer18 = setInterval(function() {
    //         timeBetweenDates(newCompare)
    //         }, 1000)
        
    // }
    
    // if (test2 == false) {
    //     t++
    //     clearInterval(timer18)
    //     correctedTime = bus18modAab[2].date.split('.')
    //     c1 = correctedTime.shift()

    //     correctedTime.insert(1, c1)
    //     newCompare = new Date(correctedTime.join('.')+'.'+bus18modAab[2].time)
    //     timer18 = setInterval(function() {
    //         timeBetweenDates(newCompare)
    //         }, 1000)
    // }

    if (minutes2 <= 1) {
        clearInterval(timer18)
        document.querySelector('#bus18-aab').textContent = "Nu"
        if (test2) {
            t++
            console.log('Antal af buskørsler: '+t)
            console.log('TimeReset om 60 sekunder')
            // setTimeout( 
                timeReset(t)
            // , 60000);
            test2 = false
            }

    }
}
}

}

startBus18()























startOsthavnen = async (t = 0) => {
    
    let bus18 = await( await fetch(proxy + "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851001703&rttime&format=json&useBus=1")).json()
    bus18 = await bus18.DepartureBoard.Departure
    let bus18modOst = []
    
    bus18.forEach(elem => {
        if (elem.direction == "Østhavnen") {
        bus18modOst.push(elem)
        }
    })

    // console.log('Østhavnen Rute:')
    // console.log(bus18modOst)
    

    let timerOst
    let correctedTime = bus18modOst[t].date.split('.')
    let c1 = correctedTime.shift()
    correctedTime.insert(1, c1)
    let newCompare = new Date(correctedTime.join('.')+'.'+bus18modOst[t].time)


    timerOst = setInterval(function() {
    timeBetweenDates(newCompare)
    }, 1000)


    function timeReset(t, sT=60000){
        correctedTime = bus18modOst[t].date.split('.')
        c1 = correctedTime.shift()
        correctedTime.insert(1, c1)
        newCompare = new Date(correctedTime.join('.')+'.'+bus18modOst[t].time)
        setTimeout(() => {
        test4 = true
        timerOst = setInterval(function() {
            timeBetweenDates(newCompare)
            }, 1000)        
        }, sT);
     }
    

    function timeBetweenDates(toDate) {
    
    let dateEntered = toDate
    let now = new Date()
    let difference4 = dateEntered.getTime() - now.getTime()
    
    if (difference4 <= 0) {
    
        // Timer færdig
        t++
        console.log('Antal af buskørsler: '+t)
        timeReset(t, 1)


        // // Timer done
        // clearInterval(timerOst)
        //     correctedTime = bus18modOst[1].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus18modOst[1].time)
        //     timerOst = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
    
    } else {
        
        let seconds4 = Math.floor(difference4 / 1000)
        let minutes4 = Math.floor(seconds4 / 60)
        let hours4 = Math.floor(minutes4 / 60)
    
        minutes4 = minutes4 + 1
    
        hours4 %= 24
        minutes4 %= 60
        seconds4 %= 60
    
        document.querySelector('#osthavnentime').textContent = minutes4 + ' min'
    
        // if (minutes4 >= 30) {
        //     clearInterval(timerOst)
        //     correctedTime = bus18modOst[1].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus18modOst[1].time)
        //     timerOst = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
            
        // }
        
        // if (test4 == false) {
        //     clearInterval(timerOst)
        //     correctedTime = bus18modOst[2].date.split('.')
        //     c1 = correctedTime.shift()
            
        //     correctedTime.insert(1, c1)
        //     newCompare = new Date(correctedTime.join('.')+'.'+bus18modOst[2].time)
        //     timerOst = setInterval(function() {
        //         timeBetweenDates(newCompare)
        //         }, 1000)
        // }
    
        if (minutes4 <= 1) {
            clearInterval(timerOst)
            document.querySelector('#osthavnentime').textContent = "Nu"
            if (test4) {
                t++
                console.log('Antal af buskørsler: '+t)
                console.log('TimeReset om 60 sekunder')
                // setTimeout( 
                    timeReset(t)
                // , 60000);
                test4 = false
                
            }
        }
    }
    }
    
    }
    startOsthavnen()









let newArray = new Date().toLocaleDateString('da-DK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).split(' ')
console.log(newArray)
newArray.splice(1, 0, '<br/>')
let sentence = newArray.join(' ')
console.log(sentence)
document.querySelector('.daydate span').innerHTML = sentence



function startTime() {
var today = new Date()
var h = today.getHours()
var m = today.getMinutes()
var s = today.getSeconds()
m = checkTime(m)
s = checkTime(s)
document.querySelector('#time').textContent =
h + ":" + m + ":" + s
var t = setTimeout(startTime, 500)
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
return i
}