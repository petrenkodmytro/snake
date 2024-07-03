import "./App.css";
import Snake from "./components/snake/snake";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>SNAKE</p>
      </header>
      <main className="min-h-[90vh]">
        <Snake />
      </main>
      <footer className="text-red-900">Developed by Dmytro Petrenko</footer>
    </div>
  );
}

export default App;
