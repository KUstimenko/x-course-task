import React, { Component } from "react";

class Footer extends Component {
  componentDidMount() {
    const yearEl = document.querySelector(".year");
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
  }

  render() {
    return (
      <footer className="footer">
        <h3>
          Виконано в {}
          <a
            className="footer__link"
            href="https://prometheus.org.ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prometheus
          </a>
          {} &copy; {} <span className="year">2022</span>
        </h3>
      </footer>
    );
  }
}

export default Footer;
