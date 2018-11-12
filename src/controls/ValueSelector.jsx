import uniqueId from 'uuid/v4';
import React, {Component} from 'react';
import PropTypes from 'prop-types';


export class ValueSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultValue: "",
            defaultValueDeleted: false,
        }
    }


    componentDidMount() {
        const {options} = this.props
        this.setState({
            defaultValue: options[0].label
        })
    }


    render() {
        const {value, options, className, handleOnChange, title} = this.props;
        const {defaultValue, defaultValueDeleted} = this.state;

        const selectOptions = options.map(option => {
            if(option.name!==undefined) {
                return (
                    <option
                        key={option.id || option.name}
                        value={option.name}
                    >
                        {option.label}
                    </option>
                );
            }

        })

        return (
            <section>

                {
                 title ?
                     (
                         <h3>{title}</h3>
                     ) :
                     null
                }
                <select className={className}
                        value={value}
                        title={title}
                        onChange={e => {
                            handleOnChange(e.target.value)
                            this.setState({
                                defaultValueDeleted: true
                            })
                        }}>
                    <option key={-1} value="" disabled selected>{options[0].label}</option>
                    {selectOptions}

                </select>
            </section>
        );

    }
}


ValueSelector.displayName = 'ValueSelector';

export default ValueSelector;
