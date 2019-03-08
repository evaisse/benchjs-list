import createStore from 'stockroom/worker';
import { getMovies, filterMovie } from './../../movies';

let store = createStore({
    count: 0,
    movies: [],
});

store.registerActions(store => ({

    increment: ({ count }) => ({ count: count+1 }),

    async getMovies() {
        console.log("get movies");
        let movies = await getMovies();
        return { movies, rawMovies: movies };
    },

    async filterMovies({ rawMovies }, options = {}) {
        console.log(arguments);
        let filter = options.filter;
        let stared = options.stared;
        let movies;
        if (!options.filter && options.stared === undefined) {
            movies = rawMovies;
        } else {
            movies = rawMovies.filter((m) => filterMovie(m, options));
        }

        return Promise.resolve({
            movies,
            filters: { filter, stared },
        });
    },

}));

export default store;  // if you wish to use `stockroom/inline`