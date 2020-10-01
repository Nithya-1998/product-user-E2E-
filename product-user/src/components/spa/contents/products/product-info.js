import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './productstyle.css'

class ProductInfo extends React.Component {
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
            outOfstock: this.props.outOfstock,
            quantity: this.props.quantity,
            size: this.props.size,
            type: this.props.type,
            color: this.props.color,
            manufacturer: this.props.manufacturer,
            supplier: this.props.supplier,
            warranty: this.props.warranty,
            material: this.props.material,
            editId: 0,
            deleteId: 0,
            prodDetail: [],
            isStockout: false,
            stockMsg: ''
        }
        this.getAllProducts();
        this.getProduct();
        console.log(parseFloat(this.props.cost));
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
        console.log(parseFloat(this.state.cost))
        let addedProd = {
            "title": this.state.title,
            "cost": parseFloat(this.state.cost),
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
            <tbody className="table table-responsive table-striped table-fixed table-dark">
                <tr>
                    <td>{this.state.id}</td>
                    <td><img src={this.state.imgurl} style={{ height: '30px', width: '30px' }} /></td>
                    <td><small>{this.state.title}</small></td>
                    <td><small>{this.state.cost}.00</small></td>
                    <td><small>{this.state.category}</small></td>
                    <td><small>{this.state.color}</small></td>
                    <td><small>{this.state.size}</small></td>
                    <td><small>{this.state.manufacturer}</small></td>
                    <td><small>{this.state.type}</small></td>
                    <td><small>{this.state.supplier}</small></td>
                    <td><small>{this.state.material}</small></td>
                    <td><small>{this.state.warranty}</small></td>
                    <td><small>{this.state.description}</small></td>
                    <td><small>{this.state.instock}</small></td>
                    <td><small>{this.state.outOfstock}</small></td>
                    <td><small>{this.state.quantity}</small></td>
                    <td>
                        <button>
                            <Link
                                to={
                                    {
                                        pathname: '/edit',
                                        state: this.state
                                    }
                                } style={{ textDecoration: "none", color: 'white' }}>
                                <small> <i className="material-icons text-dark font-weight-bold">create</i></small>
                            </Link>
                        </button>
                    </td>
                    <td>
                        <button onClick={this.onDelete} style={{ cursor: 'pointer' }} >
                            <i className="material-icons text-danger">delete</i>
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }
}
export default ProductInfo;