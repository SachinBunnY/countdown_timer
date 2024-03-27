import { useEffect, useState } from "react";
import "./App.css";
import Count from "./Count";

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [calenderDate, setCalenderDate] = useState(0);

  function calculateRemainingDays(selectedDate, para) {
    const currentDate = new Date();
    const parsedSelectedDate = new Date(selectedDate);
    const differenceMs = parsedSelectedDate - currentDate;

    let remainingDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    const remainingSecs = Math.ceil(differenceMs / (1000 * 60 * 60));
    if (para === "secs") {
      return remainingSecs;
    }
    remainingDays = remainingDays.toString().replace(/^0+/, "");
    return remainingDays;
  }

  useEffect(() => {
    if (calenderDate.length > 0) {
      let date = calenderDate.split("T")[0];
      setDays(calculateRemainingDays(date, "date"));
      setSeconds(calculateRemainingDays(date, "secs"));
      let hourAndMins = calenderDate.split("T")[1];
      setHours(hourAndMins.split(":")[0].toString().replace(/^0+/, ""));
      setMinutes(hourAndMins.split(":")[1]);
    }
  }, [calenderDate]);

  return (
    <div className="App">
      <div className="counterText">
        <h4>Countdown Timer</h4>
        <input
          type="datetime-local"
          onChange={(e) => setCalenderDate(e.target.value)}
        ></input>
        <button>Start Timer</button>
      </div>
      <div className="allCardsDiv">
        <Count numbers={days} text={"Days"} />
        <Count numbers={hours} text={"Hours"} />
        <Count numbers={minutes} text={"Minutes"} />
        <Count numbers={seconds} text={"Seconds"} />
      </div>
    </div>
  );
}

export default App;
