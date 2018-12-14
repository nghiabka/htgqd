import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField'

class CustomSelectField extends Component {

  render() {
    console.log(this.props)
    let {
      input,
      label,
      meta: { touched, error },
      children,
      ...custom
    } = this.props
    // onChange={input.onChange} onChange={(event, index, value) => input.onChange(value)}
    return (
      <SelectField
        value={input.value}
        fullWidth={true}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={input.onChange}
        children={children}
        {...custom}

      />
    );
  }
}

export default CustomSelectField;
