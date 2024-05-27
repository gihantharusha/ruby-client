import React, { useEffect, useState } from "react";
import "./home.css";
import send from "../icons/send.png";
import axios from "axios";

const Home = () => {
  const [response, setResponse] = useState([]);
  const [input, setInput] = useState();
  const [h1, setH1] = useState();
  const [placeholder, setPlaceholder] = useState("enter your search key word");
  const [subinput, setSubinput] = useState();
  const [cl, setClass] = useState("invisible");
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5001/getRememberMe`).then((res) => {
      setH1("Hello sir, you asked me to remind you");
      setResponse(res.data);
    });
  }, []);

  const clickButton = () => {
    setH1("");
    const simpleInput = " " + input.toLowerCase() + " ";
    console.log(simpleInput);

    const withoutSimble = simpleInput.replace(/[^a-zA-Z ]/g, "");
    const checkRemeber = withoutSimble.search(" remember ");
    const checkSearch = withoutSimble.search(" search ");
    const checkAddTodo = withoutSimble.search(" add todo ");

    if (checkRemeber >= 0) {
      axios.post(`http://localhost:5001/remember?data=${input}`);
      setResponse([{ data: " Ok sir i'll remember it" }]);
      setInput("");
    } else if (checkSearch >= 0) {
      setClass("inputs");
      setH1("Sir enter your data on below input area");
      setResponse([]);
      setKeyword("search");
    } else if (checkAddTodo >= 0) {
      setClass("inputs");
      setH1("Sir enter your data on below input area");
      setResponse([]);
      setKeyword("add todo");
      setPlaceholder("Title of todo");
    }
  };

  const addSubmit = () => {
    if (keyword === "search") {
      const data = subinput;
      setClass("invisible");
      setH1("");
      setSubinput("");
      axios.get(`http://localhost:5001/searchDate?data=${data}`).then((res) => {
        setResponse(res.data);
        setInput("");
      });
    } else if (keyword === "add todo") {
      const title = subinput;
      setSubinput("");
      setPlaceholder(" description of todo");
      const des = subinput;
      setSubinput("")
      setPlaceholder("Date of todo format:- year/month/day")
      const date = subinput;
      axios.post(`http://localhost:5001/addTodo?title=${title}&des=${des}&date=${date}`)
      setInput("")
    }
  };

  return (
    <div>
      <div className="top">
        <h1>mr.Ruby</h1>
      </div>

      <div className="reply">
        <h1>{h1}</h1>
        <ul>
          {response?.map((e) => (
            <li>{e.data}</li>
          ))}
        </ul>

        <div className={cl}>
          <input
            value={subinput}
            type="text"
            placeholder={placeholder}
            onChange={(e) => {
              e.preventDefault();
              setSubinput(e.target.value);
            }}
          />
          <button onClick={addSubmit}>submit</button>
        </div>
      </div>

      <div className="form">
        <textarea
          value={input}
          name=""
          id=""
          placeholder="Type your command"
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        ></textarea>
        <button onClick={clickButton}>
          <img src={send} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Home;
