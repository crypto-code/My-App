import React from "react"
import PropTypes from "prop-types"
class Show extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="back container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="back jumbotron text-center m-0 d-flex flex-column justify-content-center">
                  <div className="card shadow-lg p-3 mb-5 bg-white rounded mx-auto">
                    <div className="card-body" style={{fontWeight:"bolder", fontFamily:"Copperplate", width:"70rem"}}>
                      <div className="d-flex justify-content-between align-items-center">
                        <u style={{color:"red"}}><h1 className="card-title" style={{fontSize:"45px", fontWeight:"bolder", color:"black"}}>Task: {this.props.task["title"]}</h1></u>
                        <span className="badge badge-primary badge-pill" style={{marginInline:"5px", fontSize:"25px"}}>
                          {this.props.task["deadline"]} {this.props.time}
                        </span>
                      </div>
                      <div className="card-body" style={{textAlign:"left"}}>
                        <span className="badge badge-info badge-pill" style={{marginInline:"5px", fontSize:"25px", marginBottom:"20px"}}>{this.props.task["flag"]}</span>
                        <h1 className="card-title" style={{fontSize:"40px", wordWrap:"break-word", width:"60rem"}}>
                          Description:
                          {JSON.stringify(this.props.task["description"]) !== "null"
                            ? "  " + this.props.task["description"]
                            : "  N/A"}
                        </h1>
                      </div>
                        <div style={{textAlign:"right"}}>
                          <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} href={this.props.task["id"]+ "/edit"}>Edit</a>
                          <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} href="#">Delete</a>
                          <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} href="/">Back</a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

Show.propTypes = {
  task: PropTypes.object,
  time: PropTypes.string
};
export default Show
