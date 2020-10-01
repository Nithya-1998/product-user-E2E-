import React from 'react';
import Product from './product';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AllProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            id: 0,
            editid: 0,
            searchValue: '',
            isTitleSearch: true,
            isCategorySearch: false,
            toggleName: true,
        }
        this.getAllProducts();
    }
    getAllProducts = () => {
        axios.get('http://localhost:3000/allProducts').then((response) => {
            console.log(response.data);
            let tit = [];
            let instk = [];
            for (let obj of response.data) {
                tit.push(obj.title);
                instk.push(obj.inStock);
            }
            this.setState({ allProducts: response.data })
            console.log(this.state.allProducts)
        }, (error) => {
            console.log(error.data);
        })
    }
    editProdutWithId = (id) => {
        this.setState({ editid: id })
        console.log('Edit Product with id: ' + id);
        this.props.history.push({
            pathname: '/edit',
            state: { editid: id }
        })
    }
    deleteProductWithId = (id) => {
        console.log("Deleted Successfully" + id);
        axios.delete('http://localhost:3000/allProducts/' + id).then((response) => {
            console.log(response.data);
            this.setState({ prodDetail: response.data });
            this.getAllProducts();
        }, (error) => {
            console.log(error.data);
        });
    }
    renderAllProducts = () => {
        return this.state.allProducts.map(product => {
            return (
                <div>
                    <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        cost={product.cost}
                        instock={product.inStock}
                        category={product.category}
                        description={product.description}
                        imgurl={product.imageurl}
                        editId={this.editProdutWithId}
                        deleteId={this.deleteProductWithId}
                    >
                    </Product>
                </div>
            )
        })
    }
    handleSearch = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        let val = event.target.value;
        this.setState({ searchValue: val });
        if (val === '' || val.length === 0) {
            this.getAllProducts();
        }
        let searchProd = this.state.allProducts.filter((prod) => {
            return (prod.category.toLowerCase().match(val.toLowerCase()) || prod.title.toLowerCase().match(val.toLowerCase()));
        });
        console.log(searchProd);
        this.setState({ allProducts: searchProd });
    }
    handleCategory = (event) => {
        event.preventDefault();
        this.setState({ isCategorySearch: true, isTitleSearch: false })
    }
    handleTitle = (event) => {
        event.preventDefault();
        this.setState({ isTitleSearch: true, isCategorySearch: false })
    }
    sortName = (event) => {
        event.preventDefault();
    }
    sortPrice = (event) => {
        event.preventDefault();
    }
    handlePrice1 = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log(this.state.allProducts)
        if (!event.target.value) {
            let price1 = this.state.allProducts.filter((prod) => {
                return (prod.cost < 1000);
            });
            console.log(price1);
            this.setState({ allProducts: price1 });
        } else {
            this.getAllProducts();
        }
    }
    handlePrice2 = (event) => {
        event.preventDefault();
        if (!event.target.value) {
            let price2 = this.state.allProducts.filter((prod) => {
                return (prod.cost >= 1000 && prod.cost <= 10000);
            });
            console.log(price2);
            this.setState({ allProducts: price2 });
        } else {
            this.getAllProducts();
        }

    }
    handlePrice3 = (event) => {
        event.preventDefault();
        if (!event.target.value) {
            let price3 = this.state.allProducts.filter((prod) => {
                return (prod.cost <= 50000 && prod.cost >= 10000);
            });
            console.log(price3);
            this.setState({ allProducts: price3 });
        } else {
            this.getAllProducts();
        }
    }
    handlePrice4 = (event) => {
        event.preventDefault();
        if (!event.target.value) {
            let price4 = this.state.allProducts.filter((prod) => {
                return (prod.cost <= 100000 && prod.cost >= 50000);
            });
            console.log(price4);
            this.setState({ allProducts: price4 });
        } else {
            this.getAllProducts();
        }

    }
    handlePrice5 = (event) => {
        event.preventDefault();
        if (!event.target.value) {
            let price5 = this.state.allProducts.filter((prod) => {
                return (prod.cost >= 100000);
            });
            console.log(price5);
            this.setState({ allProducts: price5 });
        } else {
            this.getAllProducts();
        }

    }
    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container-fluid">
                        <h1 className="display-4 text-white">Find Product</h1>
                        <div className="input-group">
                            <div className="input-group-prepend mb-5">
                                <span className="input-group-text" id="search"><i className="material-icons">search</i></span>
                            </div>
                            <input type="text" id="search" onChange={this.handleSearch} className="form-control" placeholder="Search Product here..." />
                            {/* <a >
                                <button type="button" className="btn btn-secondary mt-auto">
                                    <Link to={
                                        {
                                            pathname: '/add',
                                            state: this.state
                                        }
                                    } style={{ textDecoration: "none" }}>
                                        <i className="material-icons text-light font-weight-bold">add</i>
                                        <span className="text-light font-weight-bold"> Add Product</span></Link>
                                </button>
                            </a> */}
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-white bg-white" style={{ width: '0px' }}>
                    <button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbardropdown">
                        <i className="material-icons text-white">menu</i>
                    </button>
                    <div className="collapse navbar-collapse navbar-light navbar-light" id="navbardropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <div className="d-flex">
                                    <div className="flex-shrink-1">
                                        <a className="nav-link bg-dark text-light dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                            data-toggle="dropdown">
                                            <i className="material-icons">sort</i>
                                            Sort
                                        </a>
                                        <div className="dropdown-menu">
                                            <button value={this.state.toggleName} onClick={this.sortName} className="dropdown-item">Name</button>
                                            <button onClick={this.sortPrice} className="dropdown-item">Price</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="d-flex">
                                    <div className="flex-shrink-1">
                                        <a className="nav-link bg-white text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="material-icons">filter_list</i>
                                              Filter
                                         </a>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item bg-dark text-light" data-target="#cost">
                                                Cost
                                            </div>
                                            <button onClick={this.handlePrice1} className="dropdown-item"> Below 1000</button>
                                            <button onClick={this.handlePrice2} className="dropdown-item"> 1000-10000</button>
                                            <button onClick={this.handlePrice3} className="dropdown-item">10000-50000</button>
                                            <button onClick={this.handlePrice4} className="dropdown-item">50000-100000</button>
                                            <button onClick={this.handlePrice5} className="dropdown-item"> Above 100000</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        {this.renderAllProducts()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AllProduct;