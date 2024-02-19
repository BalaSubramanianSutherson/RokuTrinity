const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');

async function searchMovieContents(req){
    try{
        const storedMovieData = JSON.parse(fs.readFileSync('movies.json'));
        const movies = storedMovieData.filter(node => node.title && node.title.toLowerCase().includes(req.query.title.toLowerCase()));
        return movies;
    }catch(err){
        console.error('Get movie Contents function error:', err);
        return '[]';
    }
}

async function searchSeriesContents(req){
    try{
        const storedSeriesData = JSON.parse(fs.readFileSync('series.json'));
        const series = storedSeriesData.filter(node => node.title && node.title.toLowerCase().includes(req.query.title.toLowerCase()));
        return series;
    }catch(err){
        console.error('Get Series Contents function error:', err);
        return '[]';
    }
}

async function searchLiveStreamContents(req){
    try{
        const storedStreamData = JSON.parse(fs.readFileSync('livestream.json'));
        const stream = storedStreamData.filter(node => node.name && node.name.toLowerCase().includes(req.query.title.toLowerCase()));
        return stream;
    }catch(err){
        console.error('Get Live Stream Contents function error:', err);
        return '[]';
    }
}


async function getContents(req, res, next){
    console.log('Get Contents request'+ req.query.title)
    try{
        if(req.query.title){
            const movies = searchMovieContents(req);
            const series = searchSeriesContents(req);
            const stream = searchLiveStreamContents(req);
            const response = { "movies": movies,
                            "series": series,
                            "livestream": stream
                        }
            res.send(response)
        }else{
            res.send("-1")
        }
    }catch(err){
        console.error('Get Contents function error:', err);
        res.send('[]');
    }
}

async function getMovieContents(){
    console.log('Movie contents start updating '+ new Date());
    axios.get('http://ky-iptv.com/player_api.php?username=walkerrodney216%40gmail.com&password=Stream1958&action=get_vod_streams')
    .then(response => {

        const contents = response.data;
        const desiredAttributes = ['name', 'title', 'stream_id', 'stream_icon'];
        console.log("Movie contents size "+ contents.length)
        // Extract and create new objects with only those attributes
        const filteredData = contents.map(node => {
        return desiredAttributes.reduce((obj, key) => {
            obj[key] = node[key];
            return obj;
        }, {});
        });

        // Write the filtered data to a file
        fs.writeFileSync('movies.json', JSON.stringify(filteredData, null, 2));
        console.log('Movie contents updated '+ new Date());
        
      })
      .catch(error => {
        console.error('Error fetching Movie data:', error);
        throw error;
      });
}

async function updateMovieContents(req, res, next){
    try{
        getMovieContents()
        res.send('updated') 
    }catch(err){
        console.error('updateMovieContents function error:', err);
        next(err)
    }
}

async function getSeriesContents(){
    console.log('Series contents start updating '+ new Date());
    axios.get('http://ky-iptv.com/player_api.php?username=walkerrodney216%40gmail.com&password=Stream1958&action=get_series')
    .then(response => {
        const contents = response.data;
        const desiredAttributes = ['name', 'title', 'series_id', 'cover'];
        console.log("Series contents size "+ contents.length)
        // Extract and create new objects with only those attributes
        const filteredData = contents.map(node => {
        return desiredAttributes.reduce((obj, key) => {
            obj[key] = node[key];
            return obj;
        }, {});
        });

        // Write the filtered data to a file
        fs.writeFileSync('series.json', JSON.stringify(filteredData, null, 2));
        console.log('Series contents updated '+ new Date());
        
      })
      .catch(error => {
        console.error('Error fetching Series data:', error);
        throw error;
      });
}

async function updateSeriesContents(req, res, next){
    try{
        getSeriesContents()
        res.send('updated series content') 
    }catch(err){
        console.error('updateSeriesContents function error:', err);
        next(err)
    }
}

async function getLiveStreamContents(){
    console.log('LiveStream contents start updating '+ new Date());
    axios.get('http://ky-iptv.com/player_api.php?username=walkerrodney216%40gmail.com&password=Stream1958&action=get_live_streams')
    .then(response => {
        const contents = response.data;
        const desiredAttributes = ['name', 'stream_id', 'stream_icon'];
        console.log("Series contents size "+ contents.length)
        // Extract and create new objects with only those attributes
        const filteredData = contents.map(node => {
        return desiredAttributes.reduce((obj, key) => {
            obj[key] = node[key];
            return obj;
        }, {});
        });

        // Write the filtered data to a file
        fs.writeFileSync('livestream.json', JSON.stringify(filteredData, null, 2));
        console.log('Live stream contents updated '+ new Date());
    
      })
      .catch(error => {
        console.error('Error fetching Live stream data:', error);
        throw error;
      });
}

async function updateLiveContents(req, res, next){
    try{
        getLiveStreamContents()
        res.send('updated live contents') 
    }catch(err){
        console.error('updateLiveContents function error:', err);
        next(err)
    }
}


// Setting a cron job for every min
// cron.schedule('*/2 * * * *', ()=> {
//     console.log('running every minute 1, 2, 4 and 5');
//   });
 // every 2 hours 
cron.schedule('0 */2 * * *', getMovieContents);
// every-3-hours
cron.schedule('0 */3 * * *', getSeriesContents);
// every 5 hours
cron.schedule('0 */5 * * *', getLiveStreamContents);

module.exports = {
    getContents,
    updateMovieContents,
    updateSeriesContents,
    updateLiveContents
  };
