import { h, Component } from 'preact';
import { Provider, connect } from 'unistore/preact';
import store from "./store";




// let increment = store.action('increment');
store.subscribe(console.log);

// Let's run a registered "increment" action in the worker.
// This will eventually log a state update to the console - `{ count: 1 }`
// increment();
class HtmlBouze extends Component {

    constructor(props) {
        super();
        this.state.html = props.html;
    }

    componentDidMount() {
        this.base.html = this.state.html;
    }
}


class Movies extends Component {

    constructor(props, { store }) {
        super(props);
        window.store = store;
        this.state = {
            movies: []
        };
        
        store.subscribe((state) => this.setState(state));
        this.action = name => store.action(name);

        this.action('getMovies')();
    }

    render() {
        return (
           <main>
           <div>
               <header>
                     <h1>{ this.state.movies.length } films</h1>

                    <div>
                       <label>
                           Search <input type="search" oninput={ (e) => this.action('filterMovies')({ filter: e.target.value }) } />
                       </label>
                   </div>
               </header>
           </div>
           <div className="films">
                <table>
                    <thead>
                        <th width="80%">Title</th>
                        <th width="10%">Rating</th>
                        <th width="10%">Stared</th>
                    </thead>
                    <tbody>
                        { this.renderMovies() }
                    </tbody>
                </table>
           </div>
           </main>
        );
    }

    renderMovies() {
       return this.state.movies.map((movie) => (

            <tr id={ movie.id }>
                <td>{ movie.title }</td>
                <td>{ movie.rating }</td>
                <td>
                    <a onclick={ () => this.action('toggleStar', movie.id) }>
                        <HtmlBouze html={ movie.stared ? "&#9733;" : "&#9734;" } />
                    </a>
                </td>
            </tr>
        ));
    }

};



export default () => (
    <Provider store={ store }>
        <Movies />
    </Provider>
);