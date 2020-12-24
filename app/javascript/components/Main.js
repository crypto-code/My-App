import React from "react"
import PropTypes from "prop-types"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: "",
            flag: "",
        }
        this.confirmDelete = this.confirmDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

            this.props.alerts.map((item) => {
                let today = new Date();
                let dur;
                if (item["time"] != null){
                    let time = item["time"].split("T")[1].split(".")[0]
                    dur = new Date(item["deadline"]+"T"+time) - today;
                } else {
                    let time = "06:00:00"
                    dur = new Date(item["deadline"]+"T"+time) - today;
                }
                if (dur < 2147483640){
                    setTimeout(function() {
                        $("#" + item["id"] + "-alert").toast('show');
                    }, dur);
                }
            })
    }

    handleDelete(id, flag) {
        fetch(`/tasks/${id}`,
            {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                }).then((response) => {
                    let row = document.getElementById(id);
                    let p = row.parentElement;
                    row.animate({opacity: '0'}, 500, function(){
                        row.animate({height: '0px'}, 500, function(){
                            row.remove();
                        });
                    }).onfinish = function () {
                        row.remove();
                        if (p.childElementCount === 1){
                            p.remove();
                            document.getElementById(flag).remove();
                        }
                    }
                })
    }

    confirmDelete(title, id, flag) {
        this.setState({
            id: id,
            title: title,
            flag: flag
        })
    }

    handleChange(id) {
        window.location.href = "/tasks/"+id+"/edit"
    }

    componentDidMount() {
        $("[data-toggle='tooltip']").tooltip();
    }

    render () {
    return (
      <React.Fragment>
          <div aria-live="polite" aria-atomic="true" style={{position:"relative", zIndex:"3000000"}}>
              <div style={{position:"absolute", top:"60px", right:"20px", width:"fit-content"}} id="alert-container">
                  {this.props.alerts.map((item) =>
                          <div key={item["id"]} id={item["id"]+"-alert"} className="toast shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false"
                               style={{width:"20rem"}}>
                              <div className="toast-header" style={{fontSize:"larger"}}>
                                  <span className="mr-auto" style={{fontWeight:"bolder"}}>Task Alert</span>
                                  {item["time"] != null
                                  ? <span className="toast-time">{item["deadline"] + " " + item["time"].split("T")[1].split(".")[0]}</span>
                                  : <span className="toast-time">{item["deadline"] + " 6:00:00"}</span>}
                              </div>
                              <div className="toast-body" style={{fontSize:"large"}}>
                                  Time's Up <br/>
                                  <b>Task:</b> {item["title"]}
                                  <div style={{marginTop:"5px"}}>
                                      <button type="button" className="ml-3 mb-1 btn btn-dismiss" data-dismiss="toast"
                                              onClick={() => this.handleDelete(item["id"], item["flag"])} style={{fontWeight:"bold"}}>
                                          <span aria-hidden="true">Done</span>
                                      </button>
                                      <button type="button" className="ml-3 mb-1 btn btn-primary" data-dismiss="toast"
                                              onClick={() => this.handleChange(item["id"])} style={{fontWeight:"bold"}}>
                                          <span aria-hidden="true">Change</span>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      )}
              </div>
          </div>
          <div className="main align-items-center" style={{offset:"50px"}}>
              <br/>
          <div className="vertical-nav shadow-lg" id="sidebar" style={{whiteSpace: "nowrap", overflow:"auto"}}>
              <br/><br/><br/>
              <hr style={{border:"3px solid white"}}/>
              <div className="font-weight-bold text-uppercase" style={{fontSize:"30px", fontFamily:"Copperplate"}}>Flags</div>
              <hr style={{border:"3px solid white"}}/>
              <ul className="nav flex-column mb-0" style={{whiteSpace: "nowrap", overflow:"auto", fontWeight:"bold", fontSize:"25px"}}>
                  {this.props.flags.map((item) =>
                      <li key={item} id={item} className="nav-item">
                          <div className="nav-link flag-nav" style={{color:"white", background:"none", border:"none"}}>
                              {item}
                          </div>
                      </li>
                  )}
              </ul>
          </div>

          <div className="page-content p-5" id="content">
              <div className="container">
                  <div className="row justify-content-center">
                          <h1 style={{color:"white", fontFamily:"Copperplate", fontSize:"100px", marginRight:"60px", marginTop:"auto", marginBottom:"auto"}}>
                            TASKS
                          </h1>
                          <a className="badge badge-primary"  href="tasks/new"
                             style={{color:"white", fontFamily:"Copperplate", fontSize:"50px", height:"min-content",marginTop:"auto", marginBottom:"auto"}}>+</a>
                  </div>
              </div>
              {Object.keys(this.props.tasks).map((key, index) =>
                  <div className="d-flex" key={key}>
                      <div className="list-group justify-content-center mx-auto" style={{margin:"2rem"}}>
                          <li className="list-group-item list-group-item-action active" style={{textAlign:"left", fontSize:"xx-large", fontWeight:"bolder", fontFamily:"Copperplate"}}>{key}</li>
                          {this.props.tasks[key].map((item) =>
                              <li id={item["id"]} key={item["id"]} className="list-group-item d-flex justify-content-between align-items-center" style={{width:"60rem", fontSize:"x-large"}}>
                                  <div style={{whiteSpace: "initial", wordWrap: "break-word", width:"30rem", textAlign:"left"}} className="deadline">
                                      <div data-toggle="tooltip" data-placement="left" title={item["deadline"]}
                                           style={{width:"30rem", paddingRight:"20px", whiteSpace: "initial", wordWrap: "break-word", textAlign:"left"}}>{item["title"]}</div>
                                  </div>
                                  <span style={{color:"white"}}>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href={"tasks/" + item["id"]}>Show</a>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} href={"tasks/"+ item["id"]+"/edit"}>Edit</a>
                                    <a className="badge badge-primary badge-pill" style={{marginInline:"5px"}} data-toggle="modal" data-target="#confirmModal" onClick={() => this.confirmDelete(item["title"], item["id"], item["flag"])}>Delete</a>
                                </span>
                              </li>
                          )}
                      </div>
                  </div>
              )}
            </div>
          </div>
          <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalLabel"
               aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document" style={{width:"60rem"}}>
                  <div className="modal-content">
                      <div className="modal-header">
                          <h2 className="modal-title" id="confirmModalLabel">Confirmation Dialog</h2>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body" style={{fontSize:"x-large"}}>
                          <p>
                              Are you sure you want to delete<br/>
                          <b>Task ID</b>: {this.state.id}<br/>
                          <b>Title</b>: {this.state.title}
                          </p>
                      </div>
                      <div className="modal-footer" style={{fontSize:"x-large"}}>
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.handleDelete(this.state.id, this.state.flag)}>Confirm Delete</button>
                      </div>
                  </div>
              </div>
          </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
    tasks: PropTypes.object,
    flags: PropTypes.array,
    alerts: PropTypes.array
};
export default Main
