import Link from "next/link";

// Kanske gör viss del till egen komponent
// och lägger in här vid ett senare tillfälle,
// om det blir för mycket kod. Men kodar här tillsvidare.

export default function Home() {
  return (
    <main className="flex justify-center flex-col">
      <div className="w-full bg-red-50">
        <nav className="flex justify-between bg-red-50">
        <span className="p-5 antialiased">Logo</span>

          <Link href="/highscore">High-score</Link>
        </nav>
        <h1 id="title" className="flex justify-center bg-red-50 ui-serif">
          Quiz Title
        </h1>
        <div className="flex justify-center">
          <div className="flex justify-center flex-col w-28">
            <h4>Start a quiz!</h4>
            <button>
              <Link href="/quiz">Start a quiz</Link>
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
