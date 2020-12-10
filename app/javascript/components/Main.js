import React from "react"
import PropTypes from "prop-types"

class Main extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="main align-items-center" style={{offset:"50px"}}>
            <br/>
            <h1 style={{color:"white", fontFamily:"Copperplate", fontSize:"100px"}}>TASKS</h1>
            {Object.keys(this.props.tasks).map((key, index) =>
                <div className="d-flex">
                    <div className="list-group justify-content-center mx-auto" style={{margin:"2rem"}}>
                        <li className="list-group-item list-group-item-action active" style={{textAlign:"left", fontSize:"x-large", fontWeight:"bolder"}}>{key}</li>
                        {this.props.tasks[key].map((item) =>
                            <li key={item["id"]} className="list-group-item d-flex justify-content-between align-items-center" style={{width:"45rem", fontSize:"x-large"}}>
                                <div style={{whiteSpace: "initial", wordWrap: "break-word", width:"20rem", textAlign:"left"}}>
                                    {item["title"]}
                                </div>
                                <span>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href="#">Show</a>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href="#">Edit</a>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href="#">Delete</a>
                                </span>
                            </li>
                        )}
                    </div>
                </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  tasks: PropTypes.object
};
export default Main
