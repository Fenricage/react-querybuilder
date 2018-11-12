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
        const {verbose_name} = this.props
        if (verbose_name) {
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
            verbose_name,
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
            onRuleFieldChanged,
            onVerboseNameChanged,
        } = this.props
        return (
            <Fragment>

                {/*second field for dynamic add field next*/}
                    {
                        React.createElement(controls.fieldSelector,
                            {
                                options: ruleFields,
                                title: translations.rule.title,
                                value: field,
                                className: `rule-fields ${classNames.fields}`,
                                handleOnChange: (value) => {
                                    this.setState({
                                        ruleIsSelected: true
                                    })

                                    const rule = ruleFields.find((rule) => {
                                        return rule.name === value
                                    })
                                    onVerboseNameChanged(rule.label)
                                    onOperatorChanged("=")
                                    onFieldChanged(value)
                                },
                                level: level
                            }
                        )
                    }


                {
                    this.state.ruleIsSelected ?
                        (
                            <Fragment>
                                <span>{operator ? operator : null}</span>
                                    {
                                        React.createElement(controls.operatorSelector,
                                            {
                                                field: field,
                                                title: translations.value.title,
                                                options: valuesGeneralRule,
                                                value: value,
                                                className: `rule-operators ${classNames.operators}`,
                                                handleOnChange: onValueChanged,
                                                level: level
                                            }
                                        )
                                    }
                            </Fragment>
                        ) :
                        null
                }



            </Fragment>
        );
    }
}


export default GeneralRule;
