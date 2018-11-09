import React, {Component, Fragment} from 'react';
import "./GeneralRule.scss"

class GeneralRule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ruleIsSelected: false
        }
    }


    componentDidMount() {
        const {ruleField} = this.props
        if (ruleField) {
            this.setState({
                ruleIsSelected: true
            })
        }
    }


    render() {

        const {
            type,
            field,
            operator,
            custom,
            ruleField,
            ruleFields,
            valuesGeneralRule,
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
            onRuleFieldChanged
        } = this.props
        console.log("operator", operator)
        return (
            <Fragment>

                {/*second field for dynamic add field next*/}
                <section>
                    <h3>Rule</h3>
                    {
                        React.createElement(controls.fieldSelector,
                            {
                                options: ruleFields,
                                title: translations.types.title,
                                value: ruleField,
                                className: `rule-fields ${classNames.fields}`,
                                handleOnChange: (value) => {
                                    this.setState({
                                        ruleIsSelected: true
                                    })
                                    onOperatorChanged("=")
                                    onRuleFieldChanged(value)
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
                                <span>{operator ? operator : null}</span>
                                <section>
                                    <h3>Value</h3>
                                    {
                                        React.createElement(controls.operatorSelector,
                                            {
                                                field: field,
                                                title: translations.operators.title,
                                                options: valuesGeneralRule,
                                                value: value,
                                                className: `rule-operators ${classNames.operators}`,
                                                handleOnChange: onValueChanged,
                                                level: level
                                            }
                                        )
                                    }
                                </section>
                            </Fragment>
                        ) :
                        null
                }



            </Fragment>
        );
    }
}


export default GeneralRule;
