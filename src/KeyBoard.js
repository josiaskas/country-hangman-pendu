import React, { Component } from 'react';

import Key from './Key';
import './KeyBoard.css';

class KeyBoard extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            selectedKey :'',
            alphabetKeys : 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''),
            optionKeys:[],
            pressedKey:false,
        }
        //on propose une version de la methode avec un this defini. On appelle d'ici oft
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
       
    }
    handleMouseDown = (key,code)=>{
        this.setState({selectedKey : code});
    }
    handleMouseUp = (key,code)=>{
        this.keyPressedTimer(100);
    }   
    handleKeyDown(event){
        const {code} = event;
        this.setState({selectedKey : code});
    }
    handleKeyUp(event){
       // const {key, code} = event;
        this.sendSelectedkey()
        this.setState({selectedKey : ''});

    }
    keyPressedTimer(timeout){
        this.setState({pressedKey:true})
        setTimeout(() => {
            this.sendSelectedkey();
            this.setState({selectedKey : ''});
            this.setState({pressedKey:false});
        }, timeout);
    }
    checkAlphabetKeyState(value){
        const code = `Key${value.toUpperCase()}`;
        if ( this.props.blockedKeys.includes(code) || (this.state.selectedKey === code)) {
            return true;
        } else {
            return  false;
        }
    }
    sendSelectedkey(options){
        if(options){
            this.props.reciever(this.state.selectedKey);
        }else{
            if (!this.props.blockedKeys.includes(this.state.selectedKey)) {
                this.props.reciever(this.state.selectedKey.slice(3));
            }
        }
    }

    render(){
        return (
            <div id="KeyboardSection" onKeyDown={this.handlePressedKey}>
                <div className="keyboard" >
                    <div id="main">
                        
                        {this.state.alphabetKeys.map((value, index)=>{
                            return (<Key    
                                key={index} 
                                value={value} 
                                pressed={this.checkAlphabetKeyState(value)} 
                                OnMouseDown={this.handleMouseDown}
                                OnMouseUp={this.handleMouseUp}
                            />)
                        })
                        }
                    </div>
                    <div id="addition_wrap">
                        <div id="addition">
                            <div className="k18 left f_key">
                                <div className="keycap"><span className="top">Opt</span><span className="bottom">Alt</span></div>
                            </div>
                            <div className="k224 k91 left f_key">
                                <div className="keycap"><span className="top">⌘</span><span className="bottom">◇</span></div>
                            </div>
                            <div className="k32 key">
                                <div className="keycap"></div>
                            </div>
                            <div className="k224 k93 right f_key">
                                <div className="keycap"><span className="top">⌘</span><span className="bottom">◇</span><span className="side">Stop</span></div>
                            </div>
                            <div className="k18 right f_key">
                                <div className="keycap"><span className="top">Opt</span><span className="bottom">Alt</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
    componentDidMount(){
        document.addEventListener('keydown',this.handleKeyDown);
        document.addEventListener('keyup',this.handleKeyUp);
        
    }
}



export default KeyBoard;