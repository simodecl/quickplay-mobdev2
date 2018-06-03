import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  info,
  type,
  onChange,
  disabled,
  icon,
  customCss
}) => {
  return (
    <div className="group-form">
        <div className="icon-input-group">
            <i className={classnames('auth-icon', icon)}></i>
            <textarea
                type={type}
                className={classnames('form-control form-control-lg', customCss)}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
        {info && <small className="form-text text-muted">{info}</small>}
    </div>

  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  icon: PropTypes.string,
  customCss: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;