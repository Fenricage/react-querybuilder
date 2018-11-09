import '../src/query-builder.scss';
import QueryBuilder from '../src/index';
import ReactDOM from "react-dom";
import React from 'react';

const types = [
    {name: undefined, label: 'Condotion type..'},
    {name: 'sensor_parameter', label: 'Sensor Parameter'},
    {name: 'general_rule', label: 'General Rule'},
    // {name: 'isDev', label: 'Is a Developer?', value: false},
];

const ruleFields = [
    {name: undefined, label: 'Select rule..'},
    {name: 'hallway_motions', label: 'Hallway Motions'},
    {name: 'in_house', label: 'In-House Status'},
];

const valuesGeneralRule = [
    {name: undefined, label: 'value'},
    {name: 'away', label: 'Away'},
    {name: 'inside', label: 'Inside'},
];

const sensorFields = [
    {name: undefined, label: 'Select sensor'},
    {name: 'sensor_1', label: 'Sensor'},
    {name: 'sensor_2', label: 'Sensor2'},
];

const objectFields = [
    {name: undefined, label: 'Select object'},
    {name: 'object_1', label: 'Object', type: "boolean"},
    {name: 'object_2', label: 'Object2', type: "number"},
];


let test = {
    id: 'g-ec15f867-b5a3-47a8-892b-ff69c192d912',
    rules: [
        {
            id: 'r-9fd53882-8a00-4c81-8450-c9d5a5619690',
            type: 'general_rule',
            value: 'inside',
            operator: '<',
            ruleField: 'in_house'
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

                    <QueryBuilder types={this.props.types}
                                  query={test}
                                  ruleFields={this.props.ruleFields}
                                  valuesGeneralRule={this.props.valuesGeneralRule}
                                  sensorFields={this.props.sensorFields}
                                  objectFields={objectFields}
                                  // controlElements={controlElements}
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

ReactDOM.render(
    <RootView
        types={types}
        ruleFields={ruleFields}
        valuesGeneralRule={valuesGeneralRule}
        sensorFields={sensorFields}
        objectFields={objectFields}
    />,
    document.querySelector('.container')
);

