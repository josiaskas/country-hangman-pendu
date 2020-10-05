import React, {Component} from 'react';

import step0 from "../images/0.jpg";
import step1 from "../images/1.jpg";
import step2 from "../images/2.jpg";
import step3 from "../images/3.jpg";
import step4 from "../images/4.jpg";
import step5 from "../images/5.jpg";
import step6 from "../images/6.jpg";

const images= [step0, step1, step2, step3, step4, step5, step6];
//fail score word

class ScoreBoard extends Component{

    // constructor(props){
    //     super(props);
    // }
    image(){
        const step = this.props.fail;
        let image;
        if (step <= 6) {
            image = images[step];
        } else {
            image = images[0];
        }
        return image;
    }
    render(){
        return(
            <div id="ScoreBoard">
                <h2>Failed: {this.props.fail}
                    <span id="score"> Score : {this.props.score} / {this.props.word.length}</span>
                </h2>
                <div className="tipsSection">
                    <h3>Tips</h3>
                    <ul id="Tips">
                        {this.props.tips.map((tip,index) => {
                            if (index === 3) {
                                return(
                                    <li key={index}><img className="flag" src={tip} alt="flag"/></li>
                                )
                            } else {
                                return(
                                    <li key={index}>{tip}</li>
                                )
                            }
                            
                        })}
                    </ul>
                </div>
                <img id="ImageScore" src={this.image()} alt="level"/>
            </div>
        );
    }
}

export default ScoreBoard;