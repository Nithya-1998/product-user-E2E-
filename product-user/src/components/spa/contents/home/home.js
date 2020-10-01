import React from 'react';
import AllProduct from '../products/products';
// import ProductTable from '../products/prodTable';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <AllProduct />
                {/* <ProductTable /> */}
            </div>
         );
    }
}
 
export default Home;