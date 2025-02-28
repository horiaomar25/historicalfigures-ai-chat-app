import './App.css';
import Input from './components/Input';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        
        <Input />
      </main>
    </div>
  );
}

export default App;
