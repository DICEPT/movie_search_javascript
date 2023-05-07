import { Component } from "../core/maincore";
import store from "../store/movie";
import movieStore, {searchMovies} from '../store/movie'

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });
    movieStore.subscribe('pageMax', () => {
        const {pageMax, page} = movieStore.state
        if(pageMax > page){
            this.el.classList.remove('hide')
        } else {
            this.el.classList.add('hide')
        }
    })
  }
  render(){
    this.el.classList.add('btn','view-more','hide')
    this.el.textContent = 'MORE'

    this.el.addEventListener('click', async() => {
        this.el.classList.add('hide')
        await searchMovies(movieStore.state.page + 1)
    })

  }
}
