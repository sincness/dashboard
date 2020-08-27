const express = require('express')
const app = express()
const fetch = require('node-fetch')
const Parser = require('rss-parser')


// Port nummer
const port = 3000

app.use('/assets', express.static('assets'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  //Fetch api data
  const weatherData = await (
    await fetch('https://vejr.eu/api.php?location=Aalborg&degree=C')).json()
  //Parse fetched data to json
  const dataActivity = await (await fetch('https://api.mediehuset.net/infoboard/activities')).json()
  const dataNews = await (await fetch('https://api.mediehuset.net/infoboard/news')).json()

  const activity = dataActivity.items
  const news = dataNews.items

  let parser = new Parser()
  let feed = await parser.parseURL('https://www.tv2nord.dk/rss')

  // Foreach loop igennem aktiviteter som tildeler hver aktivitet en farve med refference til studieretningen
activity.forEach(elem => {
    (elem.class.search('we') > 0) ? elem.color = 'red' :
    (elem.class.search('dm') > 0) ? elem.color = 'green' :
    (elem.class.search('mg') > 0) ? elem.color = 'purple' :
    (elem.class.search('gr') > 0) ? elem.color = 'blue' : elem.color = 'grey'
    elem.friendly_name = (!elem.friendly_name) ? elem.name : elem.friendly_name
  })

        // Dato hell

        // Deklarerer array med skolens skematider
        // Tiderne her er angivet i sekunder fra midnat og 
        // fungerer dermed på alle datoer
        const schedule_hours = [
            { start: 29700, stop: 33599 }, //8:15 - 9:20
            { start: 33600, stop: 37799 }, //9:20 - 10:30
            { start: 37800, stop: 41399 }, //10:30 - 11:30
            { start: 41400, stop: 46799 }, //12:00 - 13:00
            { start: 46800, stop: 50399 }, //13:00 - 14:00
            { start: 50400, stop: 54900 }, //14:00 - 15:15
        ]

        // Henter dags dato og tid
        const date = new Date()
        // Konverterer dags datotid til timestamp
        const curtime = (new Date(date.getFullYear(), date.getMonth(), date.getDate()+1, 0, 0, 0).getTime()/1000)
        // Sætter dags datotid til dagens begyndelse (Kl. 00:00:00)
        const curdate = (new Date(date.getFullYear(), date.getMonth(), date.getDate()+1, 0, 0, 0).getTime()/1000)


        // Deklarerer array til aktuel datos skematider
        const curdate_hours = []

        // Looper skematider
        schedule_hours.forEach(obj => {
            // Sætter skematider på aktuel dato
            curdate_hours.push({
                start: curdate + obj.start, 
                stop: curdate + obj.stop
            })
        })


        // Tjekker om nutid findes i aktuel datos skematider
        const curhour = curdate_hours.filter(obj => obj.start <= curtime && obj.stop >= curtime)

        // Deklarerer temporary array til aktuelle aktiviteter
        let temp_list = []

        // Hvis nutid er i skematider...
        if(curhour.length) {
            // Filtrer fetch data efter hvilke skematider nutid befinder sig i
            temp_list = await activity.filter(item => item.stamp >= curhour[0].start && item.stamp <= curhour[0].stop)
        } else {
            // Træk første index ud af fetch data
            const firstkey = activity.find(Boolean)
            // Hent data der passer i næstkommende skoledags første skematid (8:15 - 9:20)
            temp_list = await activity.filter(item => item.stamp <= (firstkey.stamp+3899))
        }

        // Deklarerer array til endelig liste
        const activity_list = []

        // Lopper arrayet for at behandle data 
        // fikse titel efter om feltet friendly name
        // er tomt eller ej
        temp_list.forEach(element => {
            // console.log(helpers.get_education(element.class));

            // ALT HVAD JEG HAVDE LAVET FØR SKAL 

            // Fikser titel med ternary value
            element.friendly_name = (!element.friendly_name) ? element.name : element.friendly_name;

            // Tilføjer key/values til ny liste
            activity_list.push(element);
        })
        let active = temp_list






  res.render('pages/index', {
    active,
    weatherData,
    feed,
    news,
  })

})
app.listen(port, () => console.log(`Express server kører på http://localhost:${port}`))