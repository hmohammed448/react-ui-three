import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  function getPlanner() {
    let syllabus = localStorage.getItem("study");
    return syllabus ? JSON.parse(syllabus) : [];
  }
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState(0);
  const [planner, setPlanner] = useState(getPlanner());

  useEffect(() => {
    localStorage.setItem("study", JSON.stringify(planner));
  }, [planner]);

  const onAdd = () => {
    const newPlanner = {
      sub: subject,
      hrs: hours,
      isCompleted: false,
    };

    setPlanner([...planner, newPlanner]);

    setSubject("");
    setHours(0);
  };

  const handleIncreaseHours = (index) => {
    const updatedPlanner = [...planner];
    updatedPlanner[index].hrs++;
    setPlanner(updatedPlanner);
  };

  const handleDecreaseHours = (index) => {
    const updatedPlanner = [...planner];
    if (updatedPlanner[index].hrs > 0) {
      updatedPlanner[index].hrs--;
      setPlanner(updatedPlanner);
    }
    if (updatedPlanner[index].hrs === 0) {
      let pln = updatedPlanner[index];
      let newPlan = updatedPlanner.filter((item) => item != pln);
      setPlanner(newPlan);
    }
  };

  return (
    <>
      <div className="my-8 flex flex-col items-center">
        <h1 className="text-center text-4xl font-black font-sans">
          Education Planner
        </h1>
        <div className="input mx-auto flex justify-center items-center gap-4 p-4 mt-8">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg"
          />
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="rounded-lg"
          />
          <button
            onClick={onAdd}
            className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
        <div
          className="view mt-8 text-center rounded-lg"
          style={{
            border: "1px solid",
            paddingTop: "1rem",
            minWidth: "500px",
            borderBottom: "none",
          }}
        >
          {planner.map((plan, index) => {
            if (plan.hrs > 0) {
              return (
                <p
                  className="text-2xl font-light border-transparent flex justify-center items-center gap-4"
                  style={{
                    color: "#155e75",
                    borderBottom: "1px solid",
                    borderWidth: "5px",
                  }}
                  key={index}
                >
                  {plan.sub}{" "}
                  <span class="material-symbols-outlined">menu_book</span>{" "}
                  -----&nbsp;&nbsp;
                  {plan.hrs}{" "}
                  <span class="material-symbols-outlined">timer</span>
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => handleIncreaseHours(index)}
                  >
                    add_circle
                  </span>
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDecreaseHours(index)}
                  >
                    do_not_disturb_on
                  </span>
                </p>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default App;
