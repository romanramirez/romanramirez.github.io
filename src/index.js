// This allows us to import the react library into the file
import React from 'react';

// This allows us to import the ReactDOM library
// This file will do insertion with our core document
import ReactDOM from 'react-dom';

// This makes our .App file available to the entire project
import App from './App';

// This uses the ReactDOM library to create our react element, inserts it into our html root element, and renders it
ReactDOM.render(<App />, document.getElementById('root'));
