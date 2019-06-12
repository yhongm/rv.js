// import RV from './rv'
// export default RV
// function test() {
//     let div = document.createElement('div')
//     div.style = "width:100px;height:100px"
//     div.innerText = "hello test"
//     document.body.appendChild(div)
// }
// export default {
//     test: test
// }
import _ from 'lodash';

export default function component() {
    var element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    console.log("component,:" + window.onload)
    window.onload = function () {
        console.log("window.onload")
    }
    return element;
}
// component()
// window.onload = function () {
//     console.log("999900000000000000000009999999")          
// }
// // export default component
// document.body.appendChild(component());


// window.onload = function () {
//     console.log("window.onload")
//     document.body.appendChild(component());
// }