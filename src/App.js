import React, { Component } from 'react';
import Projects from './Projects';
import SocialProfiles from './SocialProfiles';
import './index.css';
import profile from './assets/profile.png';

class App extends Component {
  state = { displayBio: false };

  /* We no longer need to use constructor or bind as we have our toggleDisplayBio in class property syntax. Because arrow functions do not have their own context, we can define the method as a property. */

  toggleDisplayBio = () => {
    this.setState({ displayBio: !this.state.displayBio });
  };

  render() {
    const bio = this.state.displayBio ? (
      <div>
        <p>I live in Los Angeles, and code every day.</p>
        <p>
          My favorite language is Javascript, and I think React.js is kickass.
        </p>
        <p>
          Besides coding, I also love weightlifting, cooking, and growing my own
          food!
        </p>
        <button onClick={this.toggleDisplayBio}>Show less</button>
      </div>
    ) : (
      <div>
        <button onClick={this.toggleDisplayBio}>Read more</button>
      </div>
    );

    return (
      <div>
        <img src={profile} alt="profile" className="profile" />
        <h1>Hello!</h1>
        <p>My name is Roman. I'm an aspiring software engineer!</p>
        <p>
          I'm look forward to working alongside some of the best engineering
          talent at Airbnb!
        </p>
        {bio}
        <hr />
        <Projects />
        <hr />
        <SocialProfiles />
      </div>
    );
  }
}

export default App;
