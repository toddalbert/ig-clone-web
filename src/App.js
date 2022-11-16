import Header from './components/Header';
import Feed from './components/Feed';
import './App.css';

function App() {
  return (
    <main className="App">
      <Header />
      <div className="App-header">
        <Feed />
      </div>
    </main>
  );
}

export default App;
