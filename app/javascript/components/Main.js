import React from "react"
import PropTypes from "prop-types"

let Mainlist = ""

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
    return (
      <React.Fragment>
          <div className="main align-items-center" style={{offset:"50px"}}>
              <br/>
          <div className="vertical-nav shadow-lg" id="sidebar" style={{whiteSpace: "nowrap", overflow:"auto"}}>
              <br/><br/><br/>
              <hr style={{border:"3px solid white"}}/>
              <div className="font-weight-bold text-uppercase" style={{fontSize:"30px", fontFamily:"Copperplate"}}>Flags</div>
              <hr style={{border:"3px solid white"}}/>
              <ul className="nav flex-column mb-0" style={{whiteSpace: "nowrap", overflow:"auto", fontWeight:"bold", fontSize:"25px"}}>
                  {this.props.flags.map((item) =>
                      <li key={item} className="nav-item">
                          <div className="nav-link flag-nav" style={{color:"white", background:"none", border:"none"}}>
                              {item}
                          </div>
                      </li>
                  )}
              </ul>
          </div>

          <div className="page-content p-5" id="content">
            <h1 style={{color:"white", fontFamily:"Copperplate", fontSize:"100px"}}>TASKS</h1>
              {Object.keys(this.props.tasks).map((key, index) =>
                  <div className="d-flex" key={key} id={key}>
                      <div className="list-group justify-content-center mx-auto" style={{margin:"2rem"}}>
                          <li className="list-group-item list-group-item-action active" style={{textAlign:"left", fontSize:"xx-large", fontWeight:"bolder", fontFamily:"Copperplate"}}>{key}</li>
                          {this.props.tasks[key].map((item) =>
                              <li key={item["id"]} className="list-group-item d-flex justify-content-between align-items-center" style={{width:"45rem", fontSize:"x-large"}}>
                                  <div style={{whiteSpace: "initial", wordWrap: "break-word", width:"20rem", textAlign:"left"}}>
                                      {item["title"]}
                                  </div>
                                  <span>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href={"tasks/" + item["id"]}>Show</a>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href={"tasks/"+ item["id"]+"/edit"}>Edit</a>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href="#">Delete</a>
                                </span>
                              </li>
                          )}
                      </div>
                  </div>
              )}
            </div>
          </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
    tasks: PropTypes.object,
    flags: PropTypes.array
};
export default Main
