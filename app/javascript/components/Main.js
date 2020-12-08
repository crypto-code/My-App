import React from "react"
import PropTypes from "prop-types"
class Main extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="main" style={{offset:"50px"}}>
            <br/>
            <h1>TASKS</h1>
            {this.props.tasks.map((item) =>
                <h1 key={item.id}>{item.task}</h1>)}
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  tasks: PropTypes.array
};
export default Main
