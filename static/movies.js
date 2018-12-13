/*
{
   "fields":{
      "directors":[
         "Joseph Gordon-Levitt"
      ],
      "release_date":"2013-01-18T00:00:00Z",
      "rating":7.4,
      "genres":[
         "Comedy",
         "Drama"
      ],
      "image_url":"http://ia.media-imdb.com/images/M/MV5BMTQxNTc3NDM2MF5BMl5BanBnXkFtZTcwNzQ5NTQ3OQ@@._V1_SX400_.jpg",
      "plot":"A New Jersey guy dedicated to his family, friends, and church, develops unrealistic expectations from watching porn and works to find happiness and intimacy with his potential true love.",
      "title":"Don Jon",
      "rank":1,
      "running_time_secs":5400,
      "actors":[
         "Joseph Gordon-Levitt",
         "Scarlett Johansson",
         "Julianne Moore"
      ],
      "year":2013
   },
   "id":"tt2229499",
   "type":"add"
}
*/

function getMovies(limit) {
    var limit = limit || 5000;

    return fetch('./movies-wikipedia.json').then((r) => r.json()).then((movies) => {
    	var id = 1;
        return movies.map((movie) => {
        	movie.id = id++;
            movie.stared = (movie.title.indexOf('b') > 4);
            return movie;
        });
    });

    return fetch('./movies.json').then((r) => r.text()).then((text) => {
        return text.split("\n").map((json) => {
            var v = JSON.parse(json);
            v.fields.id = v.id;
            v.fields.stared = (v.fields.title.indexOf('b') > 4);
            return v.fields;
        });
    });
}

function filterMovie(movie, options) {

	if (options.stared && !movie.stared) {
		return false;
	}

	return options.filter.length === 0 
		|| movie.title.toLowerCase().indexOf(options.filter.toLowerCase()) !== -1;

}