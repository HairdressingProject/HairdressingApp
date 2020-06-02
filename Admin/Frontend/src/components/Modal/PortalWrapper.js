import React from 'react';
import ReactDOM from 'react-dom';

const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');

export class PortalWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        )
    }
}