import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  

  return (
        <div className="w-full pt-20">
        
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
