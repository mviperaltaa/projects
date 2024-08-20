import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Sidebar 1</p>
        <Sidebar initialMenuItems={[
            'Albert Eggstein',
            'Attila the Hen',
            'Dixie Chick',
            'Gregory Peck',
            'Mary Poopins'
          ]}></Sidebar>
      </header>
    </div>
  );
}

export default App;
