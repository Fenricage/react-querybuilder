import React, {Component} from 'react';
import "./GeneralRule.scss"

class GeneralRule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ruleIsSelected: false
        }
    }


    componentDidMount() {

    }


    render() {

        const {
            field,
            operator,
            custom,
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
        } = this.props

        return (
            <div>
                {
                    React.createElement(controls.operatorSelector,
                        {
                            field: field,
                            title: translations.operators.title,
                            options: getOperators(field),
                            value: operator,
                            className: `rule-operators ${classNames.operators}`,
                            handleOnChange: onOperatorChanged,
                            level: level
                        }
                    )
                }
            </div>
        );
    }
}


export default GeneralRule;
