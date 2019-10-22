import React from 'react';

class Navbar extends React.Component {
render(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#3c1a5b'}}>
            <a className="navbar-brand" style={{color: '#fff748'}} href="/">REACT TO DO</a>
        </nav>
    );
}
}

export default Navbar