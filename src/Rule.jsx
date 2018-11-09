import React from 'react';
import GeneralRule from "./templates/GeneralRule/GeneralRule"
import SensorParameter from "./templates/SensorParameter/SensorParameter"

export default class Rule extends React.Component {
    static get defaultProps() {
        return {
            id: '', //null
            parentId: '', //null
            field: '', //null
            operator: '', //null
            value: '', //null
            schema: {}, //null
            custom: '', //null
            ruleField: '',
            sensorField: '',
            objectField: ''
        };
    }

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const {
            field,
            operator,
            valuesGeneralRule,
            custom,
            ruleField,
            sensorField,
            sensorFields,
            objectFields,
            objectField,
            ruleFields,
            value,
            translations,
            schema: {
                fields,
                controls,
                getOperators,
                getLevel,
                classNames
            }
        } = this.props;
        var level = getLevel(this.props.id);



        let rule = null

        switch (field) {
            case "general_rule":
                rule = (
                    <GeneralRule
                        field={field}
                        ruleField={ruleField}
                        ruleFields={ruleFields}
                        valuesGeneralRule={valuesGeneralRule}
                        operator={operator}
                        custom={custom}
                        value={value}
                        translations={translations}
                        fields={fields}
                        controls={controls}
                        getOperators={getOperators}
                        getLevel={getLevel}
                        classNames={classNames}
                        level={level}
                        onFieldChanged={this.onFieldChanged}
                        onOperatorChanged={this.onOperatorChanged}
                        onValueChanged={this.onValueChanged}
                        onCustomChanged={this.onCustomChanged}
                        onRuleFieldChanged={this.onRuleFieldChanged}
                    />
                )
                break;
            case "sensor_parameter":
                rule = (
                    <SensorParameter
                        field={field}
                        ruleField={ruleField}
                        ruleFields={ruleFields}
                        operator={operator}
                        custom={custom}
                        valuesGeneralRule={valuesGeneralRule}
                        sensorFields={sensorFields}
                        sensorField={sensorField}
                        objectFields={objectFields}
                        objectField={objectField}
                        value={value}
                        translations={translations}
                        fields={fields}
                        controls={controls}
                        getOperators={getOperators}
                        getLevel={getLevel}
                        classNames={classNames}
                        level={level}
                        onFieldChanged={this.onFieldChanged}
                        onOperatorChanged={this.onOperatorChanged}
                        onValueChanged={this.onValueChanged}
                        onCustomChanged={this.onCustomChanged}
                        onRuleFieldChanged={this.onRuleFieldChanged}
                        onSensorFieldChanged={this.onSensorFieldChanged}
                        onObjectFieldChanged={this.onObjectFieldChanged}
                    />
                )
                break;
        }


        return (
            <div className={`rule ${classNames.rule}`}>

                <section>
                    <h3>Type</h3>
                    {
                        React.createElement(controls.fieldSelector,
                            {
                                options: fields,
                                title: translations.fields.title,
                                value: field,
                                className: `rule-fields ${classNames.fields}`,
                                handleOnChange: this.onFieldChanged,
                                level: level
                            }
                        )
                    }
                </section>


                {rule}

                {/*{*/}
                {/*React.createElement(controls.operatorSelector,*/}
                {/*{*/}
                {/*field: field,*/}
                {/*title: translations.operators.title,*/}
                {/*options: getOperators(field),*/}
                {/*value: operator,*/}
                {/*className: `rule-operators ${classNames.operators}`,*/}
                {/*handleOnChange: this.onOperatorChanged,*/}
                {/*level: level*/}
                {/*}*/}
                {/*)*/}
                {/*}*/}
                {/*{*/}
                {/*React.createElement(controls.valueEditor,*/}
                {/*{*/}
                {/*field: field,*/}
                {/*title: translations.value.title,*/}
                {/*operator: operator,*/}
                {/*value: value,*/}
                {/*className: `rule-value ${classNames.value}`,*/}
                {/*handleOnChange: this.onValueChanged,*/}
                {/*level: level*/}
                {/*}*/}
                {/*)*/}
                {/*}*/}
                {/*/!*TEST FIELD*!/*/}
                {/*{*/}
                {/*React.createElement(controls.valueEditor,*/}
                {/*{*/}
                {/*field: field,*/}
                {/*title: translations.value.title,*/}
                {/*operator: operator,*/}
                {/*value: custom,*/}
                {/*className: `rule-value ${classNames.value}`,*/}
                {/*handleOnChange: this.onCustomChanged,*/}
                {/*level: level*/}
                {/*}*/}
                {/*)*/}
                {/*}*/}

                {
                    React.createElement(controls.removeRuleAction,
                        {
                            label: translations.removeRule.label,
                            title: translations.removeRule.title,
                            className: `rule-remove ${classNames.removeRule}`,
                            handleOnClick: this.removeRule,
                            level: level
                        })
                }

                {/*<button onClick={this.removeTemplate}>*/}
                    {/*remove template*/}
                {/*</button>*/}
            </div>
        );
    }

    onFieldChanged = (value) => {
        this.removeTemplate()
        this.onElementChanged('field', value);

    }

    onOperatorChanged = (value) => {
        this.onElementChanged('operator', value);
    }

    onValueChanged = (value) => {
        this.onElementChanged('value', value);
    }

    onCustomChanged = (value) => {
        this.onElementChanged('custom', value);
    }

    onRuleFieldChanged = (value) => {
        this.onElementChanged('ruleField', value);
    }

    onSensorFieldChanged = (value) => {
        this.onElementChanged('sensorField', value);
    }

    onObjectFieldChanged = (value) => {
        this.onElementChanged('objectField', value);
    }

    onElementChanged = (property, value) => {
        const {id, schema: {onPropChange}} = this.props;

        onPropChange(property, value, id);
    }

    removeRule = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
    }

    removeTemplate = (event) => {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.props.schema.onTemplateRemove(this.props.id, this.props.parentId);
    }


}
