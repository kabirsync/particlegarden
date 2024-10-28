import Navbar from "@/components/layout/Navbar";
import Simulation from "@/components/simulation/SimulationContainer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-dvh flex flex-col">
        <Navbar />
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
