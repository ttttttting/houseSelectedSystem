import React from "react";

class Demo extends React.Component{
    state = {
        email:'',
    }
    render(){
        return <div>
            <input type="text" value={this.state.email}
            onChange={(ev) => {
                let target = ev.target,
                    text = target.value.trim();
                    this.setState({
                        email:text
                    })
            }}/>
        </div>
    }
}

export default Demo;