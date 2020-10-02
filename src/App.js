import React, {Component} from 'react';
import './App.css';
import  KeyBoard from './KeyBoard';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

const words = [
  'histoire',
  'geographie',
  'mathematiques',
  'chimie'
]

class App extends Component{

  images= [step0, step1, step2, step3, step4, step5, step6];

  DEFAULT_STATE = { score : 0,
    guesses:0,
    word : 'Hello',
    edition : '',
    display: ['_'],
    image: this.images[0]
  }
  constructor(props){
    super(props);
    this.state = {
      score : 0,
      guesses:0,
      word : 'salut',
      edition : '',
      display: ['_'],
      image: this.images[0],
    }
    this.receivingKey = this.receivingKey.bind(this);
  }
  receivingKey(key){
    const indexes = this.checkLetter(key);

    if(this.state.guesses <= 5){
      let display = this.state.display;
      if (indexes.length > 0) {
          for (const index of indexes) {
            display[index]= key;
            this.setState({score : this.state.score+1});
          }
          this.setState({edition : this.state.edition+key, display : display});
      }else{
        this.setState({
          image : this.images[this.state.guesses+1],
          guesses : this.state.guesses+1
        });
      }
      if (this.state.score === this.state.word.length) {
        this.gameIsOver(true);
      }
      return;
    }
    this.gameIsOver(false);
  }
  gameIsOver(isAWin){
    if (isAWin) {
      
      setTimeout(() => {
        this.restartGame();
      }, 2000);
    } else {
      
      setTimeout(() => {
        this.restartGame();
      }, 2000);
    }
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
            <img src={this.state.image} alt="level"/>
            <p id="edition">{this.state.display.join(' ')}</p>
          </div>
          <KeyBoard reciever={this.receivingKey} blockedKeys={this.blockedKeys()}/>
        </main>
      </div>
    )
  }
  restartGame(){
    this.setState({...this.DEFAULT_STATE});
    this.fetchWord();
  }
  fetchWord(){
    //can become more complex after
    const word = words[Math.floor(Math.random() * words.length)];
    this.setState({word : word.toUpperCase()});
    this.setState({display : '_'.repeat(word.length).split('')});
  }
  componentDidMount(){
    this.fetchWord();
  }
}

export default App;
