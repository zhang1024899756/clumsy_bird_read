import React, {Component} from 'react';
import {Platform, TextInput} from 'react-native';

class MyTextInput extends Component {
    shouldComponentUpdate(nextProps) {
        const { value, defaultValue } = this.props;
        return Platform.OS !== 'ios'
            || (value === nextProps.value && !nextProps.defaultValue)
            || (defaultValue === nextProps.defaultValue && !nextProps.value);
    }

    render() {
        return <TextInput {...this.props} />;
    }
};

export default MyTextInput;