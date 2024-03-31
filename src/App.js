import { useEffect, useState } from "react";
import "./App.css";
import Count from "./Count";

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [calenderDate, setCalenderDate] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [notification, setNotification] = useState("");

  function handleStartTimer() {
    if (calenderDate.length > 0) {
      setNotification("");
      const selectedDate = new Date(calenderDate);
      const currentTime = new Date();
      const differenceMs = selectedDate - currentTime;
      const isIt100Days = 100 * 24 * 60 * 60 * 1000;
      if (differenceMs > isIt100Days) {
        setNotification("Selected time is more than 100 days.");
        return;
      }
      const id = setInterval(() => {
        const currentTime = new Date();
        const differenceMs = selectedDate - currentTime;
        let remainingSeconds = Math.ceil((differenceMs / 1000) % 60);
        let remainingMinutes = Math.ceil((differenceMs / (1000 * 60)) % 60);
        let remainingHours = Math.ceil((differenceMs / (1000 * 60 * 60)) % 24);
        let remainingDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        if (selectedDate.toDateString() === currentTime.toDateString()) {
          setDays(0);
          setHours(0);
        } else {
          setDays(remainingDays);
          setHours(remainingHours);
        }

        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);

        if (differenceMs <= 0) {
          setNotification(
            "The countdown is over! What's next on your adventure?"
          );
          clearInterval(intervalID);
        }
      }, 1000);
      setIntervalID(id);
    }
  }

  function handleCancelTimer() {
    clearInterval(intervalID);
    setIntervalID(null);
    setNotification("");
  }

  return (
    <div className="App">
      <div className="mainContainer">
        <div className="counterText">
          <h4 className="title">
            Countdown <span>Timer</span>
          </h4>
          <input
            type="datetime-local"
            onChange={(e) => setCalenderDate(e.target.value)}
          ></input>
          {intervalID == null ? (
            <button onClick={() => handleStartTimer()}>Start Timer</button>
          ) : (
            <button onClick={() => handleCancelTimer()}>Cancel Timer</button>
          )}
        </div>
        {notification === "" ? (
          <div className="allCardsDiv">
            <Count numbers={days} text={"Days"} />
            <Count numbers={hours} text={"Hours"} />
            <Count numbers={minutes} text={"Minutes"} />
            <Count numbers={seconds} text={"Seconds"} />
          </div>
        ) : (
          <p>{notification}</p>
        )}
      </div>
    </div>
  );
}

export default App;
