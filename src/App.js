import React, { Component } from 'react';
import './App.css';
import mockEmail from './mock/mockEmail.json';
import ListEmail from './Component/ListEmail';
import './Component/css/ListEmail.css';
import './Component/css/ListEmail2.css';
import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import HeaderListEmail from './Component/HeaderListEmail';

class App extends Component {
    constructor() {
        super();
        this.state = {
            listEmail: [],
            isClickFilter: false
        }
    }

    componentWillMount() {
        this.setState({listEmail: mockEmail});
    }

    handleFilter = (status) => {
        const { listEmail } = this.state;
        let sortData = [];
        if (status !== 'name' && status !== 'email') {
            sortData = sortBy(listEmail, status);
        } else if(status === 'name') {
            sortData = orderBy(listEmail, 'from.name', 'asc');
        } else if(status === 'email') {
            sortData = orderBy(listEmail, 'from.email', 'asc');
        }
        this.setState({listEmail: sortData});
    }

    handleClickRead = (data) => {
        const { listEmail } = this.state;
        let updateData = listEmail;
        let indexList = 0;
        listEmail.map((value, key) => {
            if(value.from.email === data){
                indexList = key;
            }
            return indexList;
        });
        updateData[indexList].isread = true;
        this.setState({listEmail: updateData});
    }

  render() {
    const { listEmail } = this.state;
    return (
        <div id='layout'>
            <div className="email-list">
               <HeaderListEmail handleFilter={(data) => this.handleFilter(data)} />
               <ListEmail
                   listEmail={listEmail}
                   handleClickRead={(data) => this.handleClickRead(data)}
               />
            </div>
        </div>
    );
  }
}

export default App;
