import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class HeaderListEmail extends Component {
    constructor() {
        super();
        this.state = {
            dropdownOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const { handleFilter } = this.props;
        return (
                    <div id="appBar" className="email-item" style={{zIndex: 999, backgroundColor: '#fff', height: '80px'}}>
                        <p className="alignleft">Inbox</p>
                        <ButtonDropdown id='btnDropdown' className="alignright" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Filter
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem disabled>Sort By</DropdownItem>
                                <DropdownItem onClick={() => handleFilter('subject')}>Subject</DropdownItem>
                                <DropdownItem onClick={() => handleFilter('email')}>Email</DropdownItem>
                                <DropdownItem onClick={() => handleFilter('name')}>Name</DropdownItem>
                                <DropdownItem onClick={() => handleFilter('isread')}>Sort by Unread</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
        );
    }
}

HeaderListEmail.propTypes = {
    handleFilter: PropTypes.func.isRequired
}

export default HeaderListEmail;
