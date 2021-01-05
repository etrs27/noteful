import React from 'react';


class ErrorBoundaries extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="errorPage">
          <h3>Could not display the page.</h3>
          <p>Try refreshing the page or going back.</p>
        </div>
      );
    }
    return this.props.children;
  }
}


export default ErrorBoundaries