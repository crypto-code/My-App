import React from "react"
import PropTypes from "prop-types"
import logo from "../../assets/images/logo.png"

class Title extends React.Component {
    render () {
    return (
      <React.Fragment>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <img src={logo} height="45" className="d-inline-block align-top" style={{marginInline:"30px"}} alt=""/>
          <h2>TODO App</h2>
            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav ml-auto" style={{fontWeight: "bolder", fontSize:"x-large"}}>
                    <li className="nav-item active" style={{marginRight: "20px"}}>
                        <input className="nav-link form-control" style={{color:"black", width:"200px"}}/>
                    </li>
                    <li className="nav-item active" style={{marginRight: "60px"}}>
                        <button type="submit" className="nav-link btn btn-primary shadow" style={{width:"100px"}}>Search</button>
                    </li>
                    {this.props.menuItems.map((item) =>
                        <li key={item.id} className="nav-item active" style={{marginRight: "50px"}}>
                            <a className="nav-link" id={item.id} style={{color: "darkblue"}} href={item.url}>{item.name}</a>
                        </li>)}
                </ul>
            </div>
        </nav>
              {this.props.head
                  ? <header className="App-header">
                      <h1 style={{fontSize:"100px"}}>Welcome to My TO-DO App</h1>
                      <img src={logo} className="App-logo" alt="logo" />
                    </header>
                  : <div/>}
          <script>
              history.pushState(null, null, document.URL);
              window.addEventListener('popstate', function () {
              history.pushState(null, null, document.URL)
          });
          </script>
      </React.Fragment>
    );
  }
}

Title.propTypes = {
    menuItems: PropTypes.array,
    head: PropTypes.bool,
};
export default Title
