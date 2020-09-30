import React, {Component} from 'react';
import './App.css';
import  KeyBoard from './KeyBoard';

const words = [
  'histoire',
  'geographie',
  'mathematiques',
  'chimie'
]
class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      score : 0,
      guesses:0,
      word : 'salut',
      edition : '',
      display: ['_']
    }
    this.receivingKey = this.receivingKey.bind(this);
  }
  receivingKey(key){
    const indexes = this.checkLetter(key);
    this.setState({guesses : this.state.guesses+1});
    let display = this.state.display;

    if (indexes.length > 0) {
        for (const index of indexes) {
          display[index]= key;
          this.setState({score : this.state.score+1});
        }
        this.setState({edition : this.state.edition+key, display : display});
        
    }
    return;
  }
  blockedKeys(){
    const blocked = [];
    for (const key of this.state.edition){
      const code =`Key${key}`;
      blocked.push(code);
    }
    return blocked
  }
  checkLetter(key){
    let indexes =[], i=-1;
    while ((i = this.state.word.indexOf(key, i+1)) !== -1){
        indexes.push(i);
    }
    return indexes;
  }
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <h2>
             Guesses: {this.state.guesses}
            <span id="score"> Score : {this.state.score} / {this.state.word.length}</span>
          </h2>
        </header>
        <main>
          <div>
            <p id="edition">{this.state.display.join(' ')}</p>
          </div>
          <KeyBoard reciever={this.receivingKey} blockedKeys={this.blockedKeys()}/>
        </main>
      </div>
    )
  }
  fetchWord(){
    const word = words[Math.floor(Math.random() * words.length)];
    this.setState({word : word.toUpperCase()});
    this.setState({display : '_'.repeat(word.length).split('')});
  }
  componentDidMount(){
    this.fetchWord();
  }
}

export default App;
