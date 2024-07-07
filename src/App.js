import "./App.css";
import SnakePage from "./components/SnakePage";
import snake from "./assets/snake.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="flex gap-5 py-3">
          <img className="rounded-lg" width={50} src={snake} alt="snake" />
          SNAKE
        </p>
      </header>
      <main className="min-h-[90vh]">
        <SnakePage />
      </main>
      <footer className="py-10 text-red-900">
        <a className="italic underline text-teal-700" href="https://github.com/petrenkodmytro/snake" target="blank">
          Developed by Dmytro Petrenko
        </a>{" "}
      </footer>
    </div>
  );
}

export default App;
