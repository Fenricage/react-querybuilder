import React from 'react';
import GeneralRule from "./templates/GeneralRule/GeneralRule"

export default class Rule extends React.Component {
    static get defaultProps() {
        return {
            id: '', //null
            parentId: '', //null
            field: '', //null
            operator: '', //null
            value: '', //null
            schema: {}, //null
            custom: '' //null
        };
    }

    render() {
        const {field, operator, custom, value, translations, schema: {fields, controls, getOperators, getLevel, classNames}} = this.props;
        var level = getLevel(this.props.id);

        if(field === "sensor_parameter") {
            console.log("SENSOR PARAMETER!")
        }


        let rule = null

        switch (field) {
            case "sensor_parameter":
                rule = (
                    <GeneralRule
                        field={field}
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
                    />
                )
        }


        return (
            <div className={`rule ${classNames.rule}`}>
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
            </div>
        );
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

    onElementChanged = (property, value) => {
        const {id, schema: {onPropChange}} = this.props;

        onPropChange(property, value, id);
    }

    removeRule = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
    }


}
