import React, { Component } from 'react';
import _ from 'lodash';


class JSONTable extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <table className="greyGridTable">
                <thead>
                    <tr>
                        { _.map(this.props.columns, column => {
                            return <th>{column}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                {
                    _.map(this.props.data, data => {
                        const dataArray = _.values(data);

                        return <tr>{_.map(dataArray, val => <td>{val}</td>)}</tr>
                    })
                }
                </tbody>
            </table>
        )
    }
}

export default JSONTable;