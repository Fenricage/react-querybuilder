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
        const {sensor_id} = this.props
        if (sensor_id) {

            this.setOperatorType(sensor_id)
            this.setState({
                ruleIsSelected: true
            })

        }
    }

    setOperatorType(value) {
        const {onOperatorChanged} = this.props

        //type operator depending on the type of sensor

        switch (value) {
            case "sensor_1":
                onOperatorChanged("=")
                this.setState({
                    operatorType: "boolean"
                })
                break

            case "sensor_2":
                this.setState({
                    operatorType: "number"
                })
                break
        }
    }


    render() {
        const {
            type,
            field,
            operator,
            custom,
            ruleFields,
            verbose_name,
            valuesGeneralRule,
            sensorFields,
            sensor_id,
            sensorField,
            objectFields,
            objectField,
            value,
            level,
            translations,
            types,
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
            onObjectFieldChanged,
            onVerboseNameChanged,
            removeTemplate
        } = this.props

        let operatorTemplate = null

        //type operator template depending on the type of operator
        switch (this.state.operatorType) {
            case "boolean":
                operatorTemplate = (
                    <Fragment>
                        <span>=</span>

                        {React.createElement(controls.operatorSelector,
                            {
                                field: field,
                                title: translations.operators.title,
                                options: valuesGeneralRule,
                                value: value,
                                className: `rule-operators ${classNames.operators}`,
                                handleOnChange: onValueChanged,
                                level: level
                            }
                        )}
                    </Fragment>
                )

                break
            case "number":
                operatorTemplate = (
                    <Fragment>
                        {
                            React.createElement(controls.operatorSelector,
                                {
                                    field: field,
                                    options: getOperators(field),
                                    value: operator,
                                    className: `rule-operators ${classNames.operators}`,
                                    handleOnChange: onOperatorChanged,
                                    level: level
                                }
                            )


                        }
                        {
                            React.createElement(controls.valueEditor,
                                {
                                    field: field,
                                    title: translations.value.title,
                                    operator: operator,
                                    value: value,
                                    className: `rule-value ${classNames.value}`,
                                    handleOnChange: onValueChanged,
                                    level: level
                                }
                            )
                        }
                    </Fragment>
                )

                break
        }


        return (
            <Fragment>

                {/*second field for dynamic add field next*/}
                    {
                        React.createElement(controls.fieldSelector,
                            {
                                options: sensorFields,
                                title: translations.sensor.title,
                                value: sensor_id,
                                className: `rule-fields ${classNames.fields}`,
                                handleOnChange: (value) => {


                                    this.setState({
                                        ruleIsSelected: true
                                    })


                                    //remove
                                    removeTemplate("main")
                                    //add property after remove template
                                    const sensor = sensorFields.find((sensor) => {
                                        return sensor.name === value
                                    })

                                    onVerboseNameChanged(sensor.label)
                                    onSensorFieldChanged(value)

                                    this.setOperatorType(value)


                                },
                                level: level
                            }
                        )
                    }


                {/*{*/}
                {/*this.state.ruleIsSelected ?*/}
                {/*(*/}
                {/*<Fragment>*/}
                {/*/!*<span>*!/*/}
                {/*/!*=*!/*/}
                {/*/!*</span>*!/*/}
                {/*<section>*/}
                {/*<h3>Object</h3>*/}
                {/*{*/}
                {/*React.createElement(controls.operatorSelector,*/}
                {/*{*/}
                {/*field: field,*/}
                {/*title: translations.operators.title,*/}
                {/*options: objectFields,*/}
                {/*value: objectField,*/}
                {/*className: `rule-operators ${classNames.operators}`,*/}
                {/*handleOnChange: (value) => {*/}

                {/*console.log("objectFields", objectFields)*/}
                {/*let currentField = objectFields.find((field, index) => {*/}
                {/*return field.name === value*/}
                {/*})*/}

                {/*this.setState({*/}
                {/*operatorType: currentField.type*/}
                {/*})*/}


                {/*console.log("currentField", currentField)*/}
                {/*console.log("value", value)*/}
                {/*onObjectFieldChanged(value)*/}

                {/*},*/}
                {/*level: level*/}
                {/*}*/}
                {/*)*/}
                {/*}*/}
                {/*</section>*/}
                {/*</Fragment>*/}
                {/*) :*/}
                {/*null*/}
                {/*}*/}


                {
                    this.state.operatorType ?
                        operatorTemplate :
                        null
                }


            </Fragment>
        );
    }
}


export default SensorParameter;
