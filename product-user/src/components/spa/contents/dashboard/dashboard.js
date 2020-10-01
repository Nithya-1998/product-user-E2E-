import React from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allproduct: [],
            chartData: [],
            dataLoadingStatus: 'loading'
        }
    }
    componentWillMount() {
        this.getAllProducts();
    }
    getAllProducts = () => {
        axios.get('http://localhost:3000/allProducts').then((response) => {
            console.log(response.data);
            this.setState({ allproduct: response.data });
        });
    }
    renChartData = () => {
        console.log(this.state.allproduct);

        let chD = [['Product Name', 'Stock Rate']];
        console.log(chD);
        let s = this.state.allproduct.map((prod) => {
            return (chD.push([prod.title, prod.inStock]));
        })
        console.log(chD)
        console.log(s);
        return chD;
    }
    renderData = () => {
        setTimeout(() => {
            console.log(this.state);
        }, 50);
        console.log(this.renChartData());
        return (
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={this.renChartData()}
                options={{
                    title: 'Product Stock Availability',
                }}
            />)
    }
    render() {
        return (
            <div>
                <div><h2>Dashboard Page</h2></div>
                {this.renderData()}
            </div>
        );
    }
}


export default Dashboard;