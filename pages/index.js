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

// Kanske gör viss del till egen komponent
// och lägger in här vid ett senare tillfälle,
// om det blir för mycket kod. Men kodar här tillsvidare.

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
    <main className="flex justify-center flex-col" style={backgroundImageStyle}>
      <div className="w-full ">
        <nav className="flex justify-between bg-red-50">
          <span className="p-5 antialiased">Logo</span>

          <Link href="/highscore">High-score</Link>
        </nav>
        <h1 id="title" className="flex justify-center bg-red-50 ">
          Quiz Title
        </h1>
        <div className="flex justify-center">
          <div className="flex justify-center flex-col w-28">
            <h4>Start a quiz!</h4>
            <button className="rounded-xl bg-white text-base border-solid border-black">
              <Link
                href="/quiz"
                className="text-green-500 font-bold no-underline "
              >
                Start a quiz
              </Link>
            </button>
            <h4>..or make your own quiz!</h4>
            <button>
              <Link href="/custom-quiz">make my own quiz</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">Will make an accordion here</div>
      <footer className="flex justify-center">Footer down here</footer>
    </main>
  );
}
