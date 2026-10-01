import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter basename="/elephant-learning">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;