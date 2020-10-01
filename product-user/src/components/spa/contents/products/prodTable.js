import React from 'react';
import axios from 'axios';
// import Product from './product';
import { Link } from 'react-router-dom';
import ProductInfo from './product-info';
import './productstyle.css';
class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            id: 0,
            editid: 0,
            searchValue: '',
            isTitleSearch: true,
            isCategorySearch: false,
            isManufacturerSearch: false,
            isSupplierSearch: false,
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
                    <ProductInfo
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        cost={product.cost}
                        instock={product.inStock}
                        category={product.category}
                        description={product.description}
                        imgurl={product.imageurl}
                        manufacturer={product.manufacturer}
                        type={product.type}
                        color={product.color}
                        material={product.material}
                        size={product.size}
                        supplier={product.supplier}
                        warranty={product.warranty}
                        outOfstock={product.outOfstock}
                        quantity={product.quantity}
                        editId={this.editProdutWithId}
                        deleteId={this.deleteProductWithId}
                    >
                    </ProductInfo>
                </div>
            )
        })
    }
    handleSearch = (event) => {
        event.preventDefault();
        let val = event.target.value
        if (val === '' || val.length === 0) {
            this.getAllProducts();
        }
        if (this.state.isCategorySearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.category.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
        if (this.state.isTitleSearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.title.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
        if (this.state.isManufacturerSearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.manufacturer.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
        if (this.state.isSupplierSearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.supplier.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }

    }
    searchManufacturer = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: true, isCategorySearch: false, isSupplierSearch: false, isTitleSearch: false })
    }
    searchCategory = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: false, isCategorySearch: true, isSupplierSearch: false, isTitleSearch: false })
    }
    searchTitle = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: false, isCategorySearch: false, isSupplierSearch: false, isTitleSearch: true })
    }
    searchSupplier = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: false, isCategorySearch: false, isSupplierSearch: true, isTitleSearch: false })
    }
    render() {
        return (
            <div>
                <span className="input-group-text" id="search"><i className="material-icons">search</i>
                    <input type="text" className="dropdown-item" onChange={this.handleSearch} placeholder="Search here..." />
                    {/* <i className="material-icons">search</i> */}
                    {/* <input type="text" className="dropdown-item" onChange={this.handleCategorySearch} placeholder="Search Category here..." /> */}
                    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <div className="d-flex">
                                    <div className="flex-shrink-1">
                                        <a className="nav-link bg-light text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                            Select <i className="material-icons">search</i> type
                                         </a>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item bg-dark text-light" data-target="#cost">
                                                Product
                                            </div>
                                            <button onClick={this.searchManufacturer} className="dropdown-item">Manufacturer</button>
                                            <button onClick={this.searchSupplier} className="dropdown-item">Supplier</button>
                                            <button onClick={this.searchCategory} className="dropdown-item">Category</button>
                                            <button onClick={this.searchTitle} className="dropdown-item">Title</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <a >
                        <button type="button" className="btn btn-dark mr-4 ml-4">
                            <Link to={
                                {
                                    pathname: '/add',
                                    state: this.state
                                }
                            } style={{ textDecoration: "none" }}>
                                <i className="material-icons text-light font-weight-bold">add</i>
                                <span className="text-light font-weight-bold"> Add Product</span></Link>
                        </button>
                    </a>
                </span>
                <div>
                    <div className="table-responsive">
                        <table className="table table-responsive table-striped table-fixed w-auto h-auto table-dark">
                            <tbody>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Cost</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Manufacturer</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Supplier</th>
                                        <th scope="col">Material</th>
                                        <th scope="col">Warranty</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">In Stock</th>
                                        <th scope="col">Out of Stock</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                            </tbody>
                            <tbody>
                                {this.renderAllProducts()}
                            </tbody>
                            <tbody>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Cost</th>
                                        <th>Category</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Manufacturer</th>
                                        <th>Type</th>
                                        <th>Supplier</th>
                                        <th>Material</th>
                                        <th>Warranty</th>
                                        <th>Description</th>
                                        <th>In Stock</th>
                                        <th>Out of Stock</th>
                                        <th>Quantity</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </tfoot>
                            </tbody>
                        </table>
                    </div>
                </div >
            </div >
        );
    }
}

export default ProductTable;