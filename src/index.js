import { clear } from '@testing-library/user-event/dist/clear';
import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react/cjs/react.production.min';
import './index.css';

function Button(props){
    return (
        <button className={props.className} onClick={props.onClick}>
          {props.value}
        </button>
      );
}

function Display(props){
    return(
    <div className='display'>{props.value}
    </div>
    )
};

class Calculator extends React.Component{
    constructor(props) {
        super(props);    
        this.state = {
            result: "", 
            displayString: "",
        }       
    }

    handleClick(i){
        switch(i){
            case "=":
                const res= this.calculate(this.state.displayString)
                let newResult
                let newDisplayString
                newResult= (res!="error") ? res : "Error"
                newDisplayString= (res!="error") ? this.state.displayString + i + res : "Error!"
                this.setState({
                    result: newResult,
                    displayString: newDisplayString
                })                
                break
                
            case "clear":
                this.setState({
                    result: "",
                    displayString: "",
                })
                break

                
            default:        
                //All number and operation buttons
                //Clear result and display after previous calculations and display a new input
                if(this.state.result!==""){
                    this.setState({
                        result: "",
                        displayString: i,
                    })
                }

                //Display new digits and operations as buttons clicked
                else{
                    const newString= this.state.displayString + i.toString()
                    this.setState({
                        displayString: newString,
                    })
                 }
        }
    }

    calculate(string){
        var newString= string.replace("exp","**")
        var res
        try{
            res=eval(newString)
        }
        catch(e){
            res= "error"
            }
        return res
    }


    renderButton(type, i) {      
        return (
          <Button
            value={i}
            className={type}
            onClick={() => this.handleClick(i)}
          />
        );
    }

    render() {
        return (
            <div>
                <Display value={this.state.displayString}   />
                <div className="row">
                    {this.renderButton("numberButton",7)}
                    {this.renderButton("numberButton",8)}
                    {this.renderButton("numberButton",9)}
                    {this.renderButton("mathButton","+")}    
                    {this.renderButton("mathButton","(")} 
                </div>
                <div className="row">
                    {this.renderButton("numberButton",4)}
                    {this.renderButton("numberButton",5)}
                    {this.renderButton("numberButton",6)}
                    {this.renderButton("mathButton","-")} 
                    {this.renderButton("mathButton",")")}  
                </div>
                <div className="row">
                    {this.renderButton("numberButton",1)}
                    {this.renderButton("numberButton",2)}
                    {this.renderButton("numberButton",3)}
                    {this.renderButton("mathButton","*")}   
                    {this.renderButton("mathButton","exp")} 
                </div>
                <div className="row">
                    {this.renderButton("numberButton",0)}              
                    {this.renderButton("numberButton",".")}        
                    {this.renderButton("numberButton","-")}
                    {this.renderButton("mathButton","/")}  
                    {this.renderButton("calcButton","=")}
                </div>
                <div className='row'>
                    {this.renderButton("clearButton","clear")}
                </div>           
            </div>

        );
    };

}

ReactDOM.render(<Calculator />, document.getElementById("root"))
