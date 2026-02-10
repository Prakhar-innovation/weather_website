import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weather: null,
      error: ""
    };
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { city } = this.state;
    if (!city) return;

    try {
      const API_KEY = "452e6ab7ea10bcb5c2a006a493610223";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      this.setState({ weather: data, error: "" });
    } catch (err) {
      this.setState({ error: err.message, weather: null });
    }
  };

  render() {
    const { city, weather, error } = this.state;

    return (
      <div className="app">
        <div className="header">API Based Weather Detection App</div>

        <div className="section">
          <div className="weather-card">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={this.handleChange}
              />
              <button type="submit">Get Weather</button>
            </form>

            {error && <p className="error">{error}</p>}

            {weather && (
              <div className="weather-info">
                <h2>{weather.name}</h2>
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="desc">
                  {weather.weather[0].description}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="footer">
          Copyright © 2026 - Prakhar Mishra - AI&DS
        </div>
      </div>
    );
  }
}
