// Footer.jsx

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white text-slate-950 h-20 flex justify-center items-center">
      <ul className=" flex p-4 justify-between space-x-24">
        <li className="list-none ">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M15 18H9"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </Link>
        </li>
        <li className="list-none">
          <Link href="/quiz">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
            >
              <g>
                <path fill="none" d="M0 0H24V24H0z" />
                <path d="M12 19c.828 0 1.5.672 1.5 1.5S12.828 22 12 22s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm0-17c3.314 0 6 2.686 6 6 0 2.165-.753 3.29-2.674 4.923C13.399 14.56 13 15.297 13 17h-2c0-2.474.787-3.695 3.031-5.601C15.548 10.11 16 9.434 16 8c0-2.21-1.79-4-4-4S8 5.79 8 8v1H6V8c0-3.314 2.686-6 6-6z" />
              </g>
            </svg>
          </Link>
        </li>
        <li className="list-none">
          <Link href="/custom-quiz" className="hover:cursoe-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 21 21"
            >
              <g
                fill="none"
                fill-rule="evenodd"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                transform="translate(3 3)"
              >
                <path d="m7 1.5h-4.5c-1.1045695 0-2 .8954305-2 2v9.0003682c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5003682" />

                <path d="m14.5.46667982c.5549155.5734054.5474396 1.48588056-.0167966 2.05011677l-6.9832034 6.98320341-3 1 1-3 6.9874295-7.04563515c.5136195-.5178979 1.3296676-.55351813 1.8848509-.1045243z" />

                <path d="m12.5 2.5.953 1" />
              </g>
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
