import React from 'react'

const Footer = () => {
  const love = (<i className="fa fa-heart"/>);
  const chinguLink = (
    <a href="https://tropicalchancer.github.io/projectus/" target="_blank">Chingu</a>
  );

  return (
    <footer className="section bg-blue">
      <p className="text-center">
        Built with {love} by {chinguLink} Cohorts
      </p>
    </footer>
  );
};

export default Footer
