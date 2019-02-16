import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, onChange, placeholder = '' }) => {
    return (
        <div className="form-group">
            {label && <label className="control-label">{label}</label>}
            <input
                type={type}
                name={field}
                className="form-control"
                value={value}
                onChange={onChange}
                placeholder = {placeholder}
            />
            {error && <span className={classnames("help-block", { 'text-danger': error})}>{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;