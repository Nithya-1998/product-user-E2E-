import React from 'react';
class Footer extends React.Component {
    state = {}
    render() {
        return (
            // <div className="fixed-footer">
            //     <div className="container" style={{margin:'15px'}}> &copy; CompanyName</div>
            // </div>
            <div className="navbar fixed-bottom mt-5 navbar-dark opacity">
                <h6 className="text-white">Copyright 2019</h6>
            </div>
        );
    }
}

export default Footer;