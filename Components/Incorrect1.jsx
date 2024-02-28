export function IncorrectButton1() {
  return (
    <div>
      <button onClick={handleButtonClick} className="bg-orange-500 m-5">
        {question[index].incorrect_answers[0]}
      </button>
    </div>
  );
}

export function IncorrectButton2() {
  return <div></div>;
}

export function IncorrectButton3() {
  return <div></div>;
}
