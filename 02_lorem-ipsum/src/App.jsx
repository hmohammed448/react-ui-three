import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [para, setPara] = useState([]);

  const getParagraph = async () => {
    if (count > 0) {
      const instance = axios.create({
        baseURL: "https://lorem-ipsum-api.p.rapidapi.com/sentence",
        headers: { "X-Custom-Header": "foobar" },
      });

      const options = {
        method: "GET",
        url: "https://lorem-ipsum-api.p.rapidapi.com/sentence",
        params: { amount: count },
        headers: {
          "X-RapidAPI-Key":
            "57c8cfa361msh0151684ab7e5999p1373f6jsnc833eaefa84c",
          "X-RapidAPI-Host": "lorem-ipsum-api.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data.text);
        let str = response.data.text;
        let arr = str.split(". ");
        setPara(arr);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please increase count");
      return false;
    }
  };
  useEffect(() => {
    getParagraph(count);
    // if (count < 1) {
    //   setCount(1);
    // }
  }, [count, setPara]);

  return (
    <>
      <div>
        <h1 className="mt-8 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          TIRED OF BORING{" "}
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            LOREM IPSUM
          </mark>{" "}
          ?
        </h1>
        <p
          className=" text-center text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
          style={{ textTransform: "capitalize" }}
        >
          Generate new and funny favourite lorem ipsum text using lorem
          generator
        </p>

        <div className="mt-8 flex justify-center items-center gap-4">
          <label
            htmlFor="counter-input"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Paragraphs :
          </label>
          <div className="relative flex items-center">
            {/* <button
              type="button"
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onChange={() => onDecreament(index)}
            >
              <svg
                className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button> */}
            <input
              type="number"
              id="counter-input"
              className="flex-shrink-0 rounded-lg text-gray-900 dark:text-white border-2 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 text-center"
              style={{ width: "120px" }}
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            {/* <button
              type="button"
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onChange={() => onIncreament(index)}
            >
              <svg
                className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button> */}
          </div>
          <button
            type="button"
            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900"
            onClick={getParagraph}
          >
            GENERATE
          </button>
        </div>

        <div
          className="text-center py-4 mt-8 mx-auto text-left text-2xl"
          style={{ maxWidth: "500px" }}
        >
          <ol style={{listStyle: "katakana"}}>
            {para.map((item, index) => {
              return (
                <li key={index} className="mb-4">
                  {item}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
