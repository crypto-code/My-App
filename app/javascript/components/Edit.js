import React from "react"
import PropTypes from "prop-types"

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: ""
    }
    this.func = this.func.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  func() {
    let date = document.getElementById("date");
    let datetime = document.getElementById("datetime");
    let check = document.getElementById("datecheck")
    if (check.checked === true) {
      datetime.value = date.value + "T" + datetime.value.split("T")[1];
      datetime.hidden = false;
      date.hidden = true;
    } else {
      date.value = datetime.value.split("T")[0];
      datetime.hidden = true;
      date.hidden = false;
    }
  }

  handleUpdate(task){
    fetch(`/tasks/${task.id}`,
     {
          method: 'PUT',
          body: JSON.stringify({task: task}),
          headers: {
            'Content-Type': 'application/json'
          }
     }).then((response) => {
            response.json().then(function(parsedJson) {
              if (parsedJson.id !== undefined){
                document.getElementById("success").hidden = false;
                document.getElementById("error").hidden = true;
                setTimeout(function () {
                  window.location.href = "/";
                }, 1000)
              } else {
                let error = document.getElementById("error_list");
                error.innerHTML = "";
                Object.keys(parsedJson).map((key, index) => {
                  var li = document.createElement("li");
                  li.innerText = key + ": " + parsedJson[key];
                  error.appendChild(li);
                })
                document.getElementById("error").hidden = false
                document.getElementById("success").hidden = true;
              }
            }).catch(function (error){
              console.log(error);
            })
     }).catch(function (error){
      console.log(error);
    })
  }

  handleEdit(){
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    if (!description) {
      description = null;
    }
    let flag = document.getElementById("flag").value;
    let datetime = null;
    let date = null;
    let user_id = this.props.task["user_id"];
    if (document.getElementById("datecheck").checked === true) {
      datetime = document.getElementById("datetime").value;
      date = document.getElementById("datetime").value.split("T")[0];
    } else {
      date = document.getElementById("date").value;
    }
    let id = this.props.task["id"]
    let task = {id: id, user_id: user_id, title: title, description: description, deadline: date, time: datetime, flag: flag}
    this.handleUpdate(task)
  }

  render () {
    return (
        <React.Fragment>
          <div className="back container-fluid">
            <div className="row">
              <div className="col-12 p-0">
                <div className="back jumbotron text-center m-0 d-flex flex-column justify-content-center">
                  <div className="card shadow-lg p-3 mb-5 bg-white rounded mx-auto">
                    <form className="card-body" style={{fontWeight:"bolder", fontFamily:"Copperplate", width:"80rem"}}>
                      <div className="alert alert-success" role="alert" style={{fontSize:"25px"}} hidden id="success">
                        Edit Saved Successfully
                      </div>
                      <div className="alert alert-danger" role="alert" style={{fontSize:"25px", textAlign:"center"}} hidden id="error">
                        Following Errors Encountered
                        <ul id="error_list" style={{listStylePosition: "inside"}}>
                        </ul>
                      </div>
                      <div className="container d-flex card-body" style={{textAlign:"left", width:"80rem", float:"left"}}>
                      <div className="container d-flex m-auto" style={{float:"left", width:"45rem"}}>
                          <u style={{color:"red"}}><h1 className="card-title m-auto" style={{fontSize:"45px", fontWeight:"bolder", color:"black"}}>Task: </h1></u>
                          <input name="title" id="title" className="m-auto" defaultValue={this.props.task["title"]} style={{fontSize:"40px", fontWeight:"bolder", color:"black", float:"left"}}/>
                      </div>
                        <span className="m-auto badge badge-primary badge-pill" style={{fontSize:"25px", marginBottom:"20px", float:"right"}}>
                          <span style={{color:"black"}}>Deadline: </span>
                          {this.props.datetime === ""
                            ? <input name="date" id="date" type="date" defaultValue={this.props.date} style={{background: "none"}}/>
                            : <input name="datetime" id="datetime" type="datetime-local" defaultValue={this.props.datetime} style={{background: "none"}}/>}
                          {this.props.datetime === ""
                              ? <input name="datetime" hidden id="datetime" type="datetime-local" defaultValue={this.props.date + "T12:00"} style={{background: "none"}}/>
                              : <input name="date" hidden id="date" type="date" defaultValue={this.props.date} style={{background: "none"}}/>}
                          <div className="form-check" style={{fontSize:"25px"}} id="datetime">
                            {this.props.datetime === ""
                                ? <input name="datecheck" type="checkbox" className="form-check-input" id="datecheck" onClick={this.func}/>
                                : <input name="datecheck" type="checkbox"  className="form-check-input" defaultChecked id="datecheck" onClick={this.func}/>}
                            <label className="form-check-label">Include Time</label>
                        </div>
                        </span>
                      </div>
                      <div className="card-body" style={{textAlign:"left"}}>
                        <span className="badge badge-info badge-pill" style={{marginInline:"5px", fontSize:"26px", marginBottom:"20px", width: "fit-content"}}>
                          <span style={{color:"black"}}>Flag: </span>
                          <input id="flag" name="flag" defaultValue={this.props.task["flag"]} style={{background: "none"}}/>
                        </span>
                        <h1 className="card-title" style={{fontSize:"40px", wordWrap:"break-word", width:"60rem"}}>
                          Description:
                        </h1>
                        <input name="description" id="description" defaultValue={this.props.task["description"]} style={{fontSize:"35px", wordWrap:"break-word", width:"60rem"}}/>
                      </div>
                      <div style={{textAlign:"right", color:"white"}}>
                        <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} onClick={this.handleEdit}>Save</a>
                        <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} href="/">Back</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

Edit.propTypes = {
  task: PropTypes.object,
  time: PropTypes.string,
  date: PropTypes.string,
  datetime: PropTypes.string
};
export default Edit
