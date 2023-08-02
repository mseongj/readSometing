import './App.css';

function App() {

  const INPUT_text = () => {
    const the_text = document.getElementsByClassName('INPUT')[0].value;
    document.getElementsByClassName("result_____del")[0].innerText = the_text;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='title'>
          <p>input text</p>
        </div>
      </header>
      <div className='App-body'>
        <input className='INPUT' onKeyUp={INPUT_text} ></input>
        <p className='result_____del'></p>
      </div>
    </div>
  );
}

export default App;
