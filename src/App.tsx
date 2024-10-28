import Navbar from "@/components/layout/Navbar";
import Simulation from "@/components/simulation/SimulationContainer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-dvh w-full flex flex-col bg-zinc-300 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-300">
        <Navbar />
        <div className="h-full flex flex-col md:flex-row">
          <div className="flex-grow">
            <Simulation />
          </div>
          <div className="min-h-36 md:w-72 border-t md:border-t-0 md:border-l border-zinc-800 p-4">
            <h1>Controls</h1>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
