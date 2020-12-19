import React from "react"
import PropTypes from "prop-types"
class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      flag: ""
    }
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id, flag) {
    fetch(`/tasks/${id}`,
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        }).then((response) => {
      setTimeout(function () {
        window.location.href = "/";
      }, 1000)
    })
  }

  confirmDelete(title, id, flag) {
    this.setState({
      id: id,
      title: title,
      flag: flag
    })
  }
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
                        <div style={{textAlign:"right", color:"white"}}>
                          <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} href={this.props.task["id"]+ "/edit"}>Edit</a>
                          <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} data-toggle="modal" data-target="#confirmModal"
                             onClick={() => this.confirmDelete(this.props.task["title"], this.props.task["id"], this.props.task["flag"])} >Delete</a>
                          <a className="btn btn-primary" style={{marginInline:"10px", width:"10rem", fontSize:"20px"}} href="/">Back</a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
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

Show.propTypes = {
  task: PropTypes.object,
  time: PropTypes.string
};
export default Show
