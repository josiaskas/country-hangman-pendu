import React from 'react';


function display({isOver=false, isAwin=false, show=['_']}){
    let message;
    if (isOver){
        message = isAwin ? <p id="edition">🎊  WIN 🎊 </p> :<p id="edition"> End🥺 </p>;
    }else{
        message = <p id="edition">{ show.join(' ')}</p>
    }
    return(
        <div className="display">
            {message}
        </div>
    );
}


export default display;