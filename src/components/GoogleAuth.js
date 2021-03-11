import React from 'react';

class GoogleAuth extends React.Component {  
  componentDidMount = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '41327560252-sehu73ve1ghd0kl1apkg54gt6vpld31n.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.props.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);

        const GoogleUser = this.auth.currentUser.get();
        console.log(GoogleUser.getBasicProfile())
      })
    });
  }

  onAuthChange = () => {
    this.props.onAuthChange(this.auth.isSignedIn.get());
  }

  signIn = () => {
    this.auth.signIn();
  }

  signOut = () => {
    this.auth.signOut();
  }

  signInBtn = (
    <button onClick={this.signIn}>sign in</button>
  );

  signOutBtn = (
    <button onClick={this.signOut}>sign out</button>
  );

  renderAuthBtn = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return this.signOutBtn;
    } else {
      return this.signInBtn; 
    }
  }
  
  render() {
    return (
      <div>{this.renderAuthBtn()}</div>
    );
  }
}
export default GoogleAuth;
