import { Component } from "../core/maincore";

export default class Headline extends Component {
    render() {
        this.el.classList.add('headline')
        this.el.innerHTML = /*html*/ `
        <h1>헤드라인 부분<h1>
        `
    }
}