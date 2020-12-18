import React from "react"
import PropTypes from "prop-types"
class CreateAcc extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.error !== "" || this.props.success !== "") {
      if (!window.location.href.includes("#create")) {
        window.location = window.location.href + "#create"
      }
    }
  }
  render () {
    return (
      <React.Fragment>
        <div className="container-fluid" id="login">
          <div className="row">
            <div className="col-12 p-0">
              <div className="jumbotron min-vh-100 text-center m-0 d-flex flex-column justify-content-center" id="create">
                <div className="card shadow-lg p-3 mb-5 bg-white rounded mx-auto">
                  <div className="card-body" style={{fontWeight:"bolder", fontFamily:"Copperplate"}}>
                    <h1 className="card-title" style={{fontSize:"50px"}}>Create Account</h1>
                    <form action="/welcome/new" method="POST">
                      {this.props.error !== ""
                      ? <div className="alert alert-danger" role="alert" id="success">
                            {this.props.error}
                          </div>
                      : <div/>}
                      {this.props.success !== ""
                      ? <div className="alert alert-success" role="alert" id="success">
                            {this.props.success}
                          </div>
                      : <div/>}
                      <div className="wrap-input">
                        <input type="text" placeholder="Username" name="user" style={{fontSize:"x-large", width:"100%"}} required/>
                      </div>
                      <div className="wrap-input">
                        <input type="password" placeholder="Password" name="pass" style={{fontSize:"x-large", width:"100%"}} required/>
                      </div>
                      <div className="wrap-input">
                        <input type="password" placeholder="Confirm Password" name="confirm-pass" style={{fontSize:"x-large", width:"100%"}} required/>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{fontSize:"x-large"}}>Create</button>
                    </form>
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

CreateAcc.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string
};
export default CreateAcc
