import React, {Component} from 'react';
import './App.css';

import  KeyBoard from './components/KeyBoard';
import Display from './components/Display';
import ScoreBoard from './components/Score';


import CountryApi from './Country';
const Countries = new CountryApi();

const DEFAULT_STATE = { 
  score : 0,
  failed:0,
  blockedKeys : [],
  display: [''],
  gameIsOver: false,
  isAwin: false,
  word:'',
  tips:[],
  tipsDisplayed:[],
  loading:true,
}
class App extends Component{
  constructor(props){
    super(props);
    this.state ={...DEFAULT_STATE};
    this.receivingKey = this.receivingKey.bind(this);
  }
  receivingKey(key,code){
    const touch = {key,code}
    console.log(touch);
    if (!this.state.gameIsOver) {
      const matchIndexes = touch.code !=="" ? this.checkLetter(touch.key) : [];
      if (matchIndexes.length !== 0) {
      this.correctKey(touch,matchIndexes);
      } 
      else {
        const failed = this.state.failed+1;
        const tips = this.state.tipsDisplayed.slice();
        tips.push(this.state.tips[failed-1]);
        this.setState({
          failed: failed,
          tipsDisplayed:tips,
        })
        if(failed >= 6){
          this.setState({
            gameIsOver: true,
            isAwin: false,
          })
          setTimeout(() => {
            this.restartGame(true)
          }, 2000);
        }
      }

    }
    
  }

  checkLetter(key){
    let indexes =[], i=-1;
    const word = this.state.word.split('');
    while ((i = word.indexOf(key, i+1)) !== -1){
      indexes.push(i);
    }
    return indexes;
  }
  correctKey(touch, matchIndexes){
    const display = [...this.state.display];
    const score = this.state.score + matchIndexes.length;
    const blockedKeys = [...this.state.blockedKeys];
    blockedKeys.push(touch.code);
    for (const index of matchIndexes) {
        display[index] = touch.key;
    }
    this.setState({
      display : display,
      score:score,
      blockedKeys : blockedKeys,
    })
    if(score >= this.state.word.length){
      this.setState({
        gameIsOver: true,
        isAwin: true,
      })
      // 
      setTimeout(() => {
        this.restartGame(true)
      }, 2000);
    }
  }
  restartGame(isAnotherGame=false){
    if(isAnotherGame){
      console.log('fin du jeu - bilan');
    }else{
      console.log('Welcome');
    }
    this.fetchAword();
    const state = {...DEFAULT_STATE};
    this.setState({...state});
  }
  render(){
    if (!this.state.loading) {
        return(
          <div className="App">
            <header className="App-header">
            <ScoreBoard 
              fail={this.state.failed} 
              score={this.state.score} 
              word={this.state.word} 
              tips={this.state.tipsDisplayed}/>
            </header>
            <main>
              <Display 
                isOver={this.state.gameIsOver} 
                isAwin={this.state.isAwin} 
                show={this.state.display}/>
                
              <KeyBoard reciever={this.receivingKey} blockedKeys={this.state.blockedKeys}/>
            </main>
            <footer>

            </footer>
          </div>  
        )
    }
    else{
      return(
        <div className="App">
          <p> En charge</p>
        </div>
        
      )
    }
  }
  fetchAword(){
    Countries.getCountry().then((Country)=>{
      this.setState({
        word : Country.name.toUpperCase(),
        display : '_'.repeat(Country.name.length).split(''),
        tips : Country.tips,
        loading:false
      })
    });
  }
  componentDidMount(){
    this.restartGame();
  }


}

export default App;
