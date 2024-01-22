import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJoke,
  getJoke,
  getJokeError,
  getJokeStatus,
} from "../app/jokesSlice";

export const JokeContainer = () => {
  useEffect(() => {
    dispatch(fetchJoke(checked.toString()));
  }, []);
  // 1. The Dispatch, the state and initial states of checkboxes
  const dispatch = useDispatch();
  const joke = useSelector(getJoke);
  const jokeStatus = useSelector(getJokeStatus);
  const jokeError = useSelector(getJokeError);
  const [checked, setChecked] = useState(["Dark"]);

  // 2. Click and Check handling
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  const handleClick = () => {
    dispatch(fetchJoke(checked.toString()));
  };

  // 3. UX functions, (disabling the button when there is no category selected and updating the check)
  var isChecked = (item) => (checked.includes(item) ? true : false);
  var isNotEmpty = checked.length === 0 ? true : false;
  var getJokeColor = (jokeCategory) => {
    switch (jokeCategory) {
      case "Dark":
        return "purple";
      case "Programming":
        return "teal";
      case "Misc":
        return "green";
      case "Pun":
        return "yellow";
      case "Christmas":
        return "orange";
      case "Spooky":
        return "red";

      default:
        break;
    }
  };
  let jokeContent = "";

  if (jokeStatus === "loading") {
    jokeContent = <div>LOADING</div>;
  } else if (jokeStatus === "succeeded") {
    let color = getJokeColor(joke.category);
    switch (joke.type) {
      case "twopart":
        jokeContent = (
          <div>
            <div
              className={`inline-flex text-sm font-semibold py-1 px-3 m-2 text-${color}-600 bg-${color}-200 rounded-full mb-4`}
            >
              {joke.category}
            </div>
            <p className="text-lg pb-4">"{joke.setup}"</p>
            <p>"{joke.delivery}"</p>
            <div className="p-10 mx-5 text-center ">
              <button
                className="btn-sm text-white bg-gray-700 enabled:hover:bg-gray-800 w-full sm:w-auto disabled:opacity-50 disabled:shadow-none "
                onClick={handleClick}
                disabled={isNotEmpty}
              >
                Next joke
              </button>
            </div>
          </div>
        );
        break;

      default:
        jokeContent = (
          <div>
            <div
              className={`inline-flex text-sm font-semibold py-1 px-3 m-2 text-${color}-600 bg-${color}-200 rounded-full mb-4`}
            >
              {joke.category}
            </div>
            <p className="text-lg pb-4">"{joke.joke}"</p>
            <div className="p-10 mx-5 text-center ">
              <button
                className="btn-sm text-white bg-gray-700 enabled:hover:bg-gray-800 w-full sm:w-auto sm:ml-4 disabled:opacity-50 disabled:shadow-none "
                onClick={handleClick}
                disabled={isNotEmpty}
              >
                Next joke
              </button>
            </div>
          </div>
        );
        break;
    }
  } else if (jokeStatus === "failed") {
    jokeContent = (
      <div>
        <p className="uppercase">Error loading the joke</p>{" "}
        <small className="text-gray-400">{jokeError}</small>
      </div>
    );
  } else {
    jokeContent = <div></div>;
  }

  // 4. The return
  return (
    <section className="pt-12 md:pt-16" id="joke">
      <div className="joke-container" data-aos="fade-up" data-aos-delay="600">
        <div className="flex flex-wrap p-5 mx-5 border-b border-gray-800">
          <label className="checkbox purple">
            <input
              type="checkbox"
              value="Dark"
              checked={isChecked("Dark")}
              onChange={handleCheck}
            />
            <span className="indicator"></span>
            Dark
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              value="Programming"
              checked={isChecked("Programming")}
              onChange={handleCheck}
            />
            <span className="indicator"></span>
            Programming
          </label>
          <label className="checkbox green">
            <input
              type="checkbox"
              value="Misc"
              checked={isChecked("Misc")}
              onChange={handleCheck}
            />
            <span className="indicator"></span>
            Misc
          </label>
          <label className="checkbox yellow">
            <input
              type="checkbox"
              value="Pun"
              checked={isChecked("Pun")}
              onChange={handleCheck}
            />
            <span className="indicator"></span>
            Pun
          </label>
          <label className="checkbox orange">
            <input
              type="checkbox"
              value="Christmas"
              checked={isChecked("Christmas")}
              onChange={handleCheck}
            />
            <span className="indicator"></span>
            Christmas
          </label>
          <label className="checkbox red">
            <input
              type="checkbox"
              value="Spooky"
              checked={isChecked("Spooky")}
              onChange={handleCheck}
            />
            <span className="indicator"></span>
            Spooky
          </label>
        </div>
        <div
          className="p-5 mx-5 text-center flex flex-col justify-center h-full"
          style={{ paddingBottom: "70px" }}
        >
          {jokeContent}
        </div>
      </div>
    </section>
  );
};
