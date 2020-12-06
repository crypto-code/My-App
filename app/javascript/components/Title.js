import React from "react"
import PropTypes from "prop-types"
import logo from "../../assets/images/logo.png"

class Title extends React.Component {
    render () {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo} height="60" className="d-inline-block align-top" style={{marginInline:"30px"}} alt=""/>
          <h1>Welcome to My To Do App</h1>
            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav ml-auto" style={{fontWeight: "bolder", fontSize:"x-large"}}>
                    {this.props.menuItems.map((item) =>
                        <li className="nav-item active" style={{marginRight: "50px"}}>
                            <a className="nav-link" id={item.id} style={{color: "darkblue"}} href="#">{item.name}</a>
                        </li>)}
                </ul>
            </div>
        </nav>
      </React.Fragment>
    );
  }
}

Title.propTypes = {
    menuItems: PropTypes.array
};
export default Title
