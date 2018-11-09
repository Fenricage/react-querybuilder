import React, {Component, Fragment} from 'react';
import "./SensorParameter.scss"

class SensorParameter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ruleIsSelected: false,
            objIsSelected: false,
            operatorType: null
        }
    }


    componentDidMount() {
        const {sensorField} = this.props
        if (sensorField) {
            this.setState({
                ruleIsSelected: true
            })
        }
    }





    render() {

        const {
            field,
            operator,
            custom,
            ruleFields,
            valuesGeneralRule,
            sensorFields,
            sensorField,
            objectFields,
            objectField,
            value,
            level,
            translations,
            fields,
            controls,
            getOperators,
            getLevel,
            classNames,
            onFieldChanged,
            onOperatorChanged,
            onValueChanged,
            onCustomChanged,
            onRuleFieldChanged,
            onSensorFieldChanged,
            onObjectFieldChanged
        } = this.props





        return (
            <Fragment>

                {/*second field for dynamic add field next*/}
                <section>
                    <h3>Sensor</h3>
                    {
                        React.createElement(controls.fieldSelector,
                            {
                                options: sensorFields,
                                title: translations.fields.title,
                                value: sensorField,
                                className: `rule-fields ${classNames.fields}`,
                                handleOnChange: (value) => {
                                    this.setState({
                                        ruleIsSelected: true
                                    })
                                    onSensorFieldChanged(value)
                                },
                                level: level
                            }
                        )
                    }
                </section>


                {
                    this.state.ruleIsSelected ?
                        (
                            <Fragment>
                                {/*<span>*/}
                                    {/*=*/}
                                {/*</span>*/}
                                <section>
                                    <h3>Object</h3>
                                    {
                                        React.createElement(controls.operatorSelector,
                                            {
                                                field: field,
                                                title: translations.operators.title,
                                                options: objectFields,
                                                value: objectField,
                                                className: `rule-operators ${classNames.operators}`,
                                                handleOnChange: (value) => {

                                                    console.log("objectFields", objectFields)
                                                    let currentField = objectFields.find((field, index) => {
                                                        return field.name === value
                                                    })

                                                    this.setState({
                                                        operatorType: currentField.type
                                                    })


                                                    console.log("currentField", currentField)
                                                    console.log("value", value)
                                                    onObjectFieldChanged(value)

                                                },
                                                level: level
                                            }
                                        )
                                    }
                                </section>
                            </Fragment>
                        ) :
                        null
                }

                {
                    this.state.operatorType ?
                        (
                            <p>124</p>
                        ) :
                        (null)
                }



            </Fragment>
        );
    }
}


export default SensorParameter;
