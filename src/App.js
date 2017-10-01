import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Parent modalRoot={this.props.modalRoot} />
      </div>
    );
  }
}

export default App;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Render directly into the app element's container.
    const container = this.props.root.childNodes.item(0)

    const Children = ({ children }) => children;

    container.appendChild(this.el);
    ReactDOM.render(
      <Children>
        This text is being manipulated by a separate instance of ReactDOM than the rest of the page.
        <br />
        Apparently, React's{' '}
        <a href="https://reactjs.org/docs/reconciliation.html#motivation">
          heuristic reconciliation algorithm
        </a>
        {' '}hasn't replaced it yet.
      </Children>,
      container.childNodes.item(1)
    );
  }

  componentWillUnmount() {
    this.props.root.childNodes.item(0).removeChild(this.el);
  }
  
  render() {
    const portal = ReactDOM.createPortal(
      this.props.children,
      this.el,
    );

    console.info(portal);

    return portal;
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM. 
    this.setState({
      clicks: this.state.clicks + 1
    });
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is <s>not</s> a child of the div
          with the onClick handler.
        </p>
        <p>
          Turns out you can render React
          portals back into DOM elements
          created by the main ReactDOM
          rendering process.
        </p>
        <Modal root={this.props.modalRoot} >
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}
