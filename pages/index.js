import React, { useState, useEffect } from "react";
import Link from "next/link";

//backgrounds bilder
const imageUrls = [
  "/styles/images/Lake.jpg",
  "/styles/images/SpaceMan.jpg",
  "/styles/images/chad.jpg",
  "/styles/images/Plan.jpg",
];
//backgrounds bilder
import Image from "next/image";
import logoImg from "./publik/question-mark-in-a-circle-svgrepo-com.svg";
import googleImg from "./publik/google.svg";
import apple from "./publik/appstore.svg";
// import logoImg from "./publik/question-mark-in-a-circle-svgrepo-com.svg"

//Bildspels funktion
export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change the duration between slides in milliseconds (e.g., 5000 for 5 seconds)
    return () => clearInterval(interval);
  }, []);
  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
  };
  //Bildspels funktion

  console.log(backgroundImageStyle);
  return (
    <div className="min-h-screen flex flex-col justify-evenly items-center">
      <main
        className=" flex justify-center flex-col items-center"
        style={backgroundImageStyle}
      >
        <div className="w-full">
          <nav className="flex justify-between">
            <span className="p-2">
              {/* <Image src={logoImg} alt="logo" width={50} height={50} /> */}
            </span>
            {/* <Link className="p-2 text-black" href="/highscore ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgb(248 250 252)"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link> */}
          </nav>
          <h1 id="title" className="flex justify-center text-6xl">
            Chas Quiz
          </h1>
          <div>
            <div className="flex justify-center items-center flex-col">
              <p className="flex justify-center font-semibold">Start a quiz!</p>
              <Link
                href="/quiz"
                // className="text-white font-bold no-underline bg-blue-600 rounded-2xl p-1.5 hover:bg-blue-400 px-6 py-2"
              >
                <button className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full my-5 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-xl mt-10">
                  Start a quiz
                </button>
              </Link>
              <p className="font-semibold">..or make your own quiz!</p>
              <Link
                className="no-underline text-blue-600 font-semibold "
                href="/custom-quiz"
              >
                <button className="h-16 text-blue-600 hover:text-slate-50 w-60 p-2 border-none font-semibold rounded-full my-5 bg-slate-50 hover:bg-blue-700 hover:cursor-pointer text-xl mt-10">
                  Create a quiz
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex justify-center">
        <footer className="flex justify-center"></footer>
      </footer>
    </div>
  );
}
