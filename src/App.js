import "./App.css";
import SnakePage from "./components/SnakePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>SNAKE</p>
      </header>
      <main className="min-h-[90vh]">
        <SnakePage />
      </main>
      <footer className="text-red-900">
        <a className="italic underline text-teal-700" href="https://github.com/petrenkodmytro/snake" target="blank">
          Developed by Dmytro Petrenko
        </a>{" "}
      </footer>
    </div>
  );
}

export default App;
