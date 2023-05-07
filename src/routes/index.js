import { createRouter } from "../core/maincore";
import Home from './Home'
import Movie from './Movie'

export default createRouter([
    {path: '#/', component: Home},
    {path: '#/movie', component: Movie}
    // {path: '#/About', component: About}
])