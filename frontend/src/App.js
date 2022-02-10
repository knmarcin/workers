import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WorkerDetail from "./pages/WorkerDetail";
import WorkerEdit from "./pages/WorkerEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/workers/create" element={<WorkerEdit />} />
          <Route path="/workers/edit/:id" element={<WorkerEdit />} />
          <Route path="/workers/:id" element={<WorkerDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
