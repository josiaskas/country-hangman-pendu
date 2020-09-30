import React from 'react';

function Key({value = 'A', pressed = false, index, OnMouseDown, OnMouseUp}){
    const display =  pressed ? 'key pressed' : 'key';
    const code =`Key${value}`;
    return(
        <div className={display} 
        onMouseDown={(event) =>{ 
                    OnMouseDown(value,code,pressed, index); 
                }
            }
        onMouseUp={(event) =>{ 
                    OnMouseUp(value,code,pressed, index); 
                }
            }
        >
            <div className="keycap">{value}</div>
        </div>
    );
}

export default Key;