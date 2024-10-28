import Simulation from "@/components/SimulationContainer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-dvh flex flex-col">
        <nav className="h-12 bg-zinc-800">
          <p>Navbar</p>
        </nav>
        <div className="h-full flex flex-col md:flex-row">
          <div className="bg-zinc-700 flex-grow">
            <Simulation />
          </div>
          <div className="bg-zinc-600 min-h-36 md:w-72">
            <h1>Controls</h1>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
