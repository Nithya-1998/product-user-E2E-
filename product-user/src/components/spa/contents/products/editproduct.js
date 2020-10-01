import React from 'react';
import './productstyle.css';
import axios from 'axios';
class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location)
        console.log(this.props.location.state);
        this.state = {
            editProductDetail: [],
            id: this.props.location.state.id,
            title: this.props.location.state.title,
            imgurl: this.props.location.state.imgurl,
            cost: this.props.location.state.cost,
            instock: this.props.location.state.instock,
            outOfstock: this.props.location.state.outOfstock,
            quantity: this.props.location.state.quantity,
            description: this.props.location.state.description,
            category: this.props.location.state.category,
            color: this.props.location.state.color,
            size: this.props.location.state.size,
            type: this.props.location.state.type,
            manufacturer: this.props.location.state.manufacturer,
            material: this.props.location.state.material,
            supplier: this.props.location.state.supplier,
            warranty: this.props.location.state.warranty,
            product: []
        }
    }
    componentWillMount() {
        this.getProduct();
    }
    getProduct = () => {
        axios.get('http://localhost:3000/allProducts/' + this.state.id).then((response) => {
            console.log(response.data);
            this.setState({ product: response.data })
            console.log(this.state.product)
        }, (error) => {
            console.log(error.data);
        })
    }

    handleTitleChange = (event) => {
        event.preventDefault();
        this.setState({ title: event.target.value })
    }
    handleCostChange = (event) => {
        event.preventDefault();
        this.setState({ cost: event.target.value })
    }
    handleInStock = (event) => {
        event.preventDefault();
        this.setState({ instock: event.target.value })
    }
    handleDescription = (event) => {
        event.preventDefault();
        this.setState({ description: event.target.value })
    }
    handleCategory = (event) => {
        event.preventDefault();
        this.setState({ category: event.target.value })
    }
    handleUrl = (event) => {
        event.preventDefault();
        this.setState({ imgurl: event.target.value })
    }
    handleOutofstock = (event) => {
        event.preventDefault();
        this.setState({ outOfstock: event.target.value })
    }
    handleQuantity = (event) => {
        event.preventDefault();
        this.setState({ quantity: event.target.value })
    }
    handleColor = (event) => {
        event.preventDefault();
        this.setState({ color: event.target.value })
    }
    handleManufacturer = (event) => {
        event.preventDefault();
        this.setState({ manufacturer: event.target.value })
    }
    handleMaterial = (event) => {
        event.preventDefault();
        this.setState({ material: event.target.value })
    }
    handleSupplier = (event) => {
        event.preventDefault();
        this.setState({ supplier: event.target.value })
    }
    handleWarranty = (event) => {
        event.preventDefault();
        this.setState({ warranty: event.target.value })
    }
    handleSize = (event) => {
        event.preventDefault();
        this.setState({ size: event.target.value })
    }
    handleType = (event) => {
        event.preventDefault();
        this.setState({ type: event.target.value })
    }
    
    onSave = (event) => {
        console.log(parseInt(this.state.cost));
        console.log();
        event.preventDefault();
        let prod = {
            "title": this.state.title,
            "cost": Number(this.state.cost),
            "inStock": Number(this.state.instock),
            "description": this.state.description,
            "category": this.state.category,
            "imgurl": this.state.imgurl,
            "outOfstock": Number(this.state.outOfstock),
            "quantity": Number(this.state.quantity),
            "color": this.state.color,
            "type": this.state.type,
            "manufacturer": this.state.manufacturer,
            "material": this.state.material,
            "size": Number(this.state.size),
            "warranty": Number(this.state.warranty),
            "supplier": this.state.supplier
        };
        axios.put('http://localhost:3000/allProducts/' + this.state.id, prod).then(
            (response) => {
                console.log(response.data);
                this.props.history.push('/products');
            },
            (error) => {
                console.log(error.data);
            }
        );
    }

    render() {
        return (
            <div>
                <form>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="card mt-4 mb-5">
                                    <div className="card-title h1 ml-4 mt-4">Edit Details</div>
                                    <div className="mt-2 ml-4 mr-4">
                                        <div className="row justify-content-center">
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Product Name </b></label>
                                                <input type="text" id="productName" className="title" value={this.state.title} onChange={this.handleTitleChange}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Cost(Rs.) </b></label>
                                                <input type="number" id="productcost" className="cost" value={this.state.cost} onChange={this.handleCostChange}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>ImageUrl </b></label>
                                                <input type="text" id="imgUrl" className="imgUrl" value={this.state.imgurl} onChange={this.handleUrl}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>In Stock </b></label>
                                                <input type="number" id="instock" className="instock" value={this.state.instock} onChange={this.handleInStock}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Out of Stock </b></label>
                                                <input type="number" id="outOfstock" className="outOfstock" value={this.state.outOfstock} onChange={this.handleOutofstock}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Quantity </b></label>
                                                <input type="number" id="quantity" className="quantity" value={this.state.quantity} onChange={this.handleQuantity}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Description </b></label>
                                                <input type="text" id="productdescription" className="productdescription" value={this.state.description} onChange={this.handleDescription}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Category </b></label>
                                                <input type="text" id="category" className="category" value={this.state.category} onChange={this.handleCategory}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Color </b></label>
                                                <input type="text" id="color" className="color" value={this.state.color} onChange={this.handleColor}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Size </b></label>
                                                <input type="number" id="size" className="size" value={this.state.size} onChange={this.handleSize}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Type </b></label>
                                                <input type="text" id="type" className="type" value={this.state.type} onChange={this.handleType}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Supplier </b></label>
                                                <input type="text" id="supplier" className="supplier" value={this.state.supplier} onChange={this.handleSupplier}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Material </b></label>
                                                <input type="text" id="material" className="material" value={this.state.material} onChange={this.handleMaterial}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Manufacturer </b></label>
                                                <input type="text" id="manufacturer" className="manufacturer" value={this.state.manufacturer} onChange={this.handleManufacturer}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Warranty </b></label>
                                                <input type="number" id="warranty" className="warranty" value={this.state.warranty} onChange={this.handleWarranty}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <div className="btn-group mb-4 mt-4">
                                                    <button type="button" onClick={this.onSave} className="btn btn-success font-weight-bold">
                                                        Save Changes
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}

export default EditProduct;