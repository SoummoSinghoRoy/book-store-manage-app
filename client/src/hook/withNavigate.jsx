import React from 'react';
import { useNavigate } from 'react-router-dom';

const withNavigate = (Component) => {
    return (props) => {
        const navigation = useNavigate();

        return <Component navigation={navigation} {...props} />
    }
}

export default withNavigate;