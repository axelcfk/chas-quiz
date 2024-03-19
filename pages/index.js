import React, { useState, useEffect } from "react";
import Link from "next/link";

// //backgrounds bilder
// const imageUrls = [
//   "/styles/images/Lake.jpg",
//   "/styles/images/SpaceMan.jpg",
//   "/styles/images/chad.jpg",
//   "/styles/images/Plan.jpg",
// ];
// //backgrounds bilder
// import Image from "next/image";
// import logoImg from "./publik/question-mark-in-a-circle-svgrepo-com.svg";
// import googleImg from "./publik/google.svg";
// import apple from "./publik/appstore.svg";
// // import logoImg from "./publik/question-mark-in-a-circle-svgrepo-com.svg"

// //Bildspels funktion
export default function Home() {
  //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentImageIndex((prevIndex) =>
  //         prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
  //       );
  //     }, 5000); // Change the duration between slides in milliseconds (e.g., 5000 for 5 seconds)
  //     return () => clearInterval(interval);
  //   }, []);
  //   const backgroundImageStyle = {
  //     backgroundImage: `url(${imageUrls[currentImageIndex]})`,
  //   };
  //   //Bildspels funktion

  // console.log(backgroundImageStyle);

  return (
        <div className="w-full pt-40">
          <nav className="flex justify-between">
           
          </nav>
          <h1 id="title" className="flex justify-center text-6xl">
            Chas Quiz
          </h1>
          <div>
            <div className="flex justify-center items-center flex-col">
              <p className="flex justify-center font-semibold">Start a quiz!</p>
              <Link href="/quiz">
                <button className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full  bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-xl ">
                  Start a quiz
                </button>
              </Link>
              <p className="font-semibold mt-16">..or make your own!</p>
              <Link
                className="no-underline text-blue-600 font-semibold "
                href="/custom-quiz"
              >
                <button className="h-16 text-blue-600 hover:text-slate-50 w-60 p-2 border-none font-semibold rounded-full  bg-slate-50 hover:bg-blue-700 hover:cursor-pointer text-xl ">
                  Create a quiz
                </button>
              </Link>
            </div>
          </div>
        </div>
  );
}
