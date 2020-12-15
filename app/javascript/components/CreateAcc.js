import React from "react"
import PropTypes from "prop-types"
class CreateAcc extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="container-fluid" id="login">
          <div className="row">
            <div className="col-12 p-0">
              <div className="jumbotron min-vh-100 text-center m-0 d-flex flex-column justify-content-center" id="login">
                <div className="card shadow-lg p-3 mb-5 bg-white rounded mx-auto">
                  <div className="card-body" style={{fontWeight:"bolder", fontFamily:"Copperplate"}}>
                    <h1 className="card-title" style={{fontSize:"50px"}}>LOGIN</h1>
                    <form action="/welcome/login" method="POST">
                      {this.props.error !== "" &&
                      <p className="text-danger">{this.props.error}</p>
                      }
                      <div className="wrap-input">
                        <input type="text" placeholder="Username" name="user" style={{fontSize:"x-large"}} required/>
                      </div>
                      <div className="wrap-input">
                        <input type="password" placeholder="Password" name="pass" style={{fontSize:"x-large"}} required/>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{fontSize:"x-large"}}>Login</button>
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
  error: PropTypes.string
};
export default CreateAcc
