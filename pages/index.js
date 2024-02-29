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
import apple from "./publik/appstore.svg"
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
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex justify-center flex-col" style={backgroundImageStyle}>
        <div className="w-full">
          <nav className="flex justify-between">
            <span className="p-2">
              <Image src={logoImg} alt="logo" width={28} height={29} />
            </span>
            <Link className="p-2 text-black" href="/highscore ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
          </nav>
          <h1 id="title" className="flex justify-center">
            Quiz Title
          </h1>
          <div className="flex justify-center">
            <div className="flex justify-center flex-col">
              <h4 className="flex justify-center">Start a quiz!</h4>
              <button className="bg-white text-base border-solid border-0">
                <Link
                 
                href="/quiz"
                 
                className="text-white font-bold no-underline bg-blue-600 rounded-2xl p-1.5 hover:bg-blue-400 px-6 py-2"
                
              >
                  Start a quiz
                </Link>
              </button>
              <h4>..or make your own quiz!</h4>
              <button className="rounded-2xl border-solid border-blue-600 bg-white hover:bg-blue-50 py-1.5">
                <Link
                  className="no-underline text-blue-600 font-semibold "
                  href="/custom-quiz"
                >
                  make my own quiz
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          Will make an accordion here
        </div>
      </main>
      <footer className="flex justify-center">
        <footer className="flex justify-center">
          <Image src={googleImg} alt="logo" width={78} height={78} />
          <Image src={apple} alt="logo" width={78} height={78} />
        </footer>
      </footer>
    </div>
  );
}
