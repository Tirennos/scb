import React, { Component } from 'react';
import './App.css';
import mockEmail from './mock/mockEmail.json';
import ListEmail from './Component/ListEmail';
import './Component/css/ListEmail.css';
import './Component/css/ListEmail2.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';

class App extends Component {
    constructor() {
        super();
        this.state = {
            listEmail: [],
            isClickFilter: false,
            dropdownOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        this.setState({listEmail: mockEmail});
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
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
                <div id="appBar" className="email-item" style={{zIndex: 999, backgroundColor: '#fff', height: '80px'}}>
                    <p className="alignleft">Inbex</p>
                    <ButtonDropdown id='btnDropdown' className="alignright" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Filter
                        </DropdownToggle>
                        <DropdownMenu >
                            <DropdownItem disabled>Sort By</DropdownItem>
                            <DropdownItem onClick={() => this.handleFilter('subject')}>Subject</DropdownItem>
                            <DropdownItem onClick={() => this.handleFilter('email')}>Email</DropdownItem>
                            <DropdownItem onClick={() => this.handleFilter('name')}>Name</DropdownItem>
                            <DropdownItem onClick={() => this.handleFilter('isread')}>Sort by Unread</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
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
