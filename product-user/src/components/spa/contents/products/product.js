import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './productstyle.css'
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            cost: this.props.cost,
            instock: this.props.instock,
            description: this.props.description,
            category: this.props.category,
            imgurl: this.props.imgurl,
            editId: 0,
            deleteId: 0,
            prodDetail: [],
            isStockout: false,
            stockMsg: ''
        }
        this.getAllProducts();
        this.getProduct();
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
    getProduct = () => {
        console.log(this.state.id);
        let id = this.state.id;
        axios.get('http:localhost:3000/allProducts/' + id).then((response) => {
            console.log(response.data);
            this.setState({ prodDetail: response.data })
        }, (error) => {
            console.log(error.data);
        });
    }
    onDelete = (event) => {
        event.preventDefault();
        this.props.deleteId(this.state.id);
        console.log(this.props.deleteId(this.state.id))
    }
    onEdit = (event) => {
        event.preventDefault();
        this.props.editId(this.state.id);
        console.log(this.props.editId(this.state.id))
    }
    stockMinus = (event) => {
        event.preventDefault();
        console.log((Number(this.state.instock) - 1));
        let minus = (Number(this.state.instock) - 1);
        if (minus <= 15) {
            this.setState({ isStockout: true, stockMsg: 'Running Out of Stock' })
            setTimeout(() => {
                this.setState({ isStockout: false, stockMsg: '' })
            }, 2000);
        }
        this.setState({ instock: minus })
        console.log(this.state.id)
        console.log(minus)
        let addedProd = {
            "title": this.state.title,
            "cost": Number(this.state.cost),
            "inStock": minus,
            "description": this.state.description,
            "category": this.state.category,
            "imgurl": this.state.imgurl
        }
        axios.put('http://localhost:3000/allProducts/' + this.state.id, addedProd).then(response => {
            console.log(response);
        }, error => {
            console.error(error);
        })
    }

    render() {
        return (
            <div className="mt-4 ml-2">
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="card mb-4 border-dark" style={{ width: '300px' }}>
                        <img src={this.state.imgurl} className="card-image-top" style={{ height: '15rem', width: '298px' }} />
                        <div className="card-body">
                            <div className="card-title font-weight-bold">
                                <div className="d-flex">
                                    <div className="flex-shrink-1">
                                        {this.state.title}
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="text-danger font-weight-bold text-right">
                                            Rs.  {this.state.cost}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-subtitle mb-2 text-muted">
                                <div className="d-flex">
                                    <div className="flex-shrink-1">
                                        <i className="material-icons text-danger">analytics</i>
                                        {this.state.instock}
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="text-dark font-weight-bold text-right">
                                            {this.state.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text mt-2">
                                {/* <div className="card-subtitle mb-2 text-muted">
                                    <div className="d-flex">
                                        <div className="flex-shrink-1">
                                            <i className="material-icons text-danger">category</i>
                                            {this.state.category}
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="text-dark font-weight-bold text-right">
                                                <button onClick={this.stockMinus} className="btn btn-info">
                                                    s-
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <ul className="nav nav-tabs nav-fill nav-justified mb-3" role="tablist">
                                    <li className="nav-item">
                                        <button className="btn btn-info mr-3 ml-3">
                                            <Link
                                                to={
                                                    {
                                                        pathname: '/edit',
                                                        state: this.state
                                                    }
                                                } style={{ textDecoration: "none", color: 'white' }}>
                                                <i className="material-icons text-light font-weight-bold">add_shopping_cart</i>
                                            </Link>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={this.onDelete} className="btn btn-dark"
                                            data-toggle="pill" role="tab" style={{ cursor: 'pointer' }} >
                                            <i className="material-icons text-danger">delete</i>
                                        </button>
                                    </li>
                                </ul>
                                {this.state.isStockout &&
                                    <div className="alert alert-danger mt-2  ml-4 mr-4" role="alert">
                                        {this.state.stockMsg}
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Product;