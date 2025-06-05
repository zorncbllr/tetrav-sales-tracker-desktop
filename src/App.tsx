import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./components/ui/card";

function App() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card>
        <CardContent>
          <CardTitle>Hello Tauri App</CardTitle>
          <CardDescription>Lorem tauri description setup.</CardDescription>
        </CardContent>
        <CardFooter>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
