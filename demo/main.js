import '../src/query-builder.scss';
import QueryBuilder from '../src/index';
import ReactDOM from "react-dom";
import React from 'react';

const fields = [
    {name: 'sensor_parameter', label: 'Sensor Parameter'},
    {name: 'general_rule', label: 'General Rule'},
    // {name: 'isDev', label: 'Is a Developer?', value: false},
];


let test = {
    id: 'g-ec15f867-b5a3-47a8-892b-ff69c192d912',
    rules: [
        {
            id: 'r-9fd53882-8a00-4c81-8450-c9d5a5619690',
            field: 'sensor_parameter',
            value: 'asfasf',
            operator: 'null',
            custom: 'CUSTOm'
        }
    ],
    combinator: 'and'
}


class RootView extends React.Component {
    constructor() {
        super();
        this.state = {
            query: {}
        };
    }

    render() {
        let controlElements = {
            valueEditor: this.customValueEditor()
        }
        return (
            <div className="flex-box">
                <div className="scroll">
                    <QueryBuilder fields={this.props.fields}
                                  controlElements={controlElements}
                                  controlClassnames={{fields: 'form-control'}}
                                  onQueryChange={this.logQuery.bind(this)}/>
                </div>
                <div className="shrink query-log scroll">
                    <h4>Query</h4>
                    <pre>{JSON.stringify(this.state.query, null, 2)}</pre>
                </div>
            </div>
        );
    }

    customValueEditor() {
        let checkbox = class MyCheckbox extends React.Component {
            constructor(props) {
                super(props);
            }

            render() {
                if (this.props.field !== 'isDev' || this.props.operator !== '=') {
                    return <input type="text"
                                  value={this.props.value}
                                  onChange={e => this.props.handleOnChange(e.target.value)}/>
                }

                return (
                    <span>
                        <input type="checkbox"
                               value={!!this.props.value}
                               onChange={e => this.props.handleOnChange(e.target.checked)}/>
                    </span>
                );
            }
        };
        return checkbox;
    }

    logQuery(query) {
        this.setState({query});
    }

}

ReactDOM.render(<RootView fields={fields}/>, document.querySelector('.container'));

