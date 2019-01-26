import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class ListEmail extends Component {

    constructor() {
        super();
        this.state = {
            handleMouseEvent: 'leave'
        }
    }

    bg_color = (codeName) => {
        let codeColor = codeName.charCodeAt(0) - 65;
        let x = codeColor >= 0 && codeColor < 9 ? '255' : '0';
        let y = codeColor > 9 && codeColor < 16 ? '255' : '0';
        let z = codeColor > 16 && codeColor < 27 ? '255' : '0';
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        return bgColor;
    }

    onClickRead = (readList) => {
        const { handleClickRead } = this.props;
        console.log('readList:', readList);
        handleClickRead(readList);
    }

    renderWithData () {
        const { listEmail } = this.props;
        return (
            <div id='renderWithData'>
            {
                listEmail.map((data, key) => {
                    const symbolName = (data.from.name);
                    let firstStr = [];
                    let secondStr = [];
                    let bgColor = [];
                    for (let i=0; i < symbolName.length; i++)
                        if(symbolName[i].length > 0) {
                            firstStr.push(symbolName[i]);
                            bgColor.push(this.bg_color(symbolName[i]));
                            break;
                        }
                    for (let j=0; j < symbolName.length; j++)
                        if((/\s/.test(symbolName[j])) && !(/\s/.test(symbolName[j+1]))) {
                            secondStr.push(`${symbolName[j+1]}`);
                            break;
                        }
                    return (
                        <div id='nam'
                             className="email-item selected"
                             key={key}
                             onClick={() => {this.onClickRead(data.from.email)}}>
                            <div className="image" style={{backgroundColor: bgColor}}>
                                <div style={{color: 'white'}}>{firstStr}{secondStr}</div>
                            </div>
                            <div className="email-item__unread-dot" data-read={data.isread}/>
                            <div className="email-item__subject ">{data.from.name}</div>
                            <div className="email-item__details" >
                                <span className="email-item__from truncate">{data.subject}</span>
                                <span className="email-item__from truncate" style={{opacity: '.5'}}>{data.body}</span>
                                <span className="email-item__time truncate">{moment(data.time).format('HH:mm')}</span>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }

    renderNoData = () => {
        return (
            <div id='nam' className="email-item selected" style={{backgroundColor: '#eee', textAlign: 'center'}}>
                <div id='renderNoData' className="email-item__subject " >{'Nothing to see here, great job!'}</div>
            </div>
        )
    }

    render() {
        const { listEmail } = this.props;
        let content = {};
        if (listEmail && listEmail.length) {
            content = this.renderWithData();
        } else {
            content = this.renderNoData();
        }
        return content;
    }
}

ListEmail.defaultProps = {
    listEmail: []
}

ListEmail.propTypes = {
    listEmail: PropTypes.array.isRequired,
    handleClickRead: PropTypes.func
}


export default ListEmail;
