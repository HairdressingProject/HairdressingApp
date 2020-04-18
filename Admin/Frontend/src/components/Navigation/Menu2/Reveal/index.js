import React from 'react';

export const Reveal = () => {

    // const revealClasses = createClassName(
    //     props.noDefaultClassName ? null : 'reveal',
    //     props.className,
    //     {
    //     'tiny': props.isTiny,
    //     'small': props.isSmall,
    //     'large': props.isLarge,
    //     'full': props.isFullscreen
    //     },
    //     generalClassNames(props)
    // );

    // const passProps = removeProps(props, objectKeys(Reveal.propTypes));

    return (<div id="item-modal" className="reveal" data-reveal><h1>Awesome. I Have It.</h1></div>)

    // return (
    //     <div class="reveal" id="exampleModal1" data-reveal>
    //         <h1>Awesome. I Have It.</h1>
    //         <p class="lead">Your couch. It is mine.</p>
    //         <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
    //         <button class="close-button" data-close aria-label="Close modal" type="button">
    //             <span aria-hidden="true">&times;</span>
    //         </button>
    //     </div>
    // )
}







// var ReactDOM = require('react-dom');
// var Reveal = React.createClass({
//     componentDidMount: function() {
//         var modalMarkup = (
//             <div id="item-modal" className="reveal" data-reveal><h1>Awesome. I Have It.</h1></div>
//         )

//         var $modal = $(ReactDOMServer.renderToString(modalMarkup));
//         $(ReactDOM.findDOMNode(this)).html($modal);
//         var modal = new Foundation.Reveal($("#item-modal"))
//     },

//     render: function () {
//         return (<div></div>);
//     }



// });

// module.exports = Reveal;