import React from 'react';
import GeneralRule from "./templates/GeneralRule/GeneralRule"
import SensorParameter from "./templates/SensorParameter/SensorParameter"

export default class Rule extends React.Component {
    static get defaultProps() {
        return {
            id: '', //null
            parentId: '', //null
            type: '', //null
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
            type,
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
            sensor_id,
            value,
            verbose_name,
            translations,
            schema: {
                types,
                controls,
                getOperators,
                getLevel,
                classNames
            }
        } = this.props;
        var level = getLevel(this.props.id);


        let rule = null

        switch (type) {
            case "general_rule":
                rule = (
                    <GeneralRule
                        type={type}
                        field={field}
                        ruleField={ruleField}
                        ruleFields={ruleFields}
                        verbose_name={verbose_name}
                        valuesGeneralRule={valuesGeneralRule}
                        operator={operator}
                        custom={custom}
                        value={value}
                        translations={translations}
                        types={types}
                        controls={controls}
                        getOperators={getOperators}
                        getLevel={getLevel}
                        classNames={classNames}
                        level={level}
                        onOperatorChanged={this.onOperatorChanged}
                        onValueChanged={this.onValueChanged}
                        onCustomChanged={this.onCustomChanged}
                        onRuleFieldChanged={this.onRuleFieldChanged}
                        onVerboseNameChanged={this.onVerboseNameChanged}
                        onFieldChanged={this.onFieldChanged}
                    />
                )
                break;
            case "sensor_parameter":
                rule = (
                    <SensorParameter
                        type={type}
                        ruleField={ruleField}
                        ruleFields={ruleFields}
                        operator={operator}
                        custom={custom}
                        valuesGeneralRule={valuesGeneralRule}
                        sensorFields={sensorFields}
                        sensorField={sensorField}
                        objectFields={objectFields}
                        objectField={objectField}
                        sensor_id={sensor_id}
                        verbose_name={verbose_name}
                        value={value}
                        translations={translations}
                        types={types}
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
                        onVerboseNameChanged={this.onVerboseNameChanged}
                        removeTemplate={this.removeTemplate}
                    />
                )
                break;
        }


        return (
            <div className={`rule ${classNames.rule}`}>

                    {
                        React.createElement(controls.fieldSelector,
                            {
                                options: types,
                                title: translations.type.title,
                                value: type,
                                className: `rule-fields ${classNames.fields}`,
                                handleOnChange: this.onTypeChanged,
                                level: level
                            }
                        )
                    }


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

    onTypeChanged = (value) => {
        this.removeTemplate("main")
        this.onElementChanged('type', value);

    }

    onFieldChanged = (value) => {
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
        this.onElementChanged('sensor_id', value);
    }

    onObjectFieldChanged = (value) => {
        this.onElementChanged('objectField', value);
    }

    onVerboseNameChanged = (value) => {
        this.onElementChanged('verbose_name', value);
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

    removeTemplate = (templateName) => {
        // if(event) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        this.props.schema.onTemplateRemove(this.props.id, this.props.parentId, templateName);
    }


}
