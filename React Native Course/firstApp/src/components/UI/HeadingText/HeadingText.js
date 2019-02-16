import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = props => (
    <Text {...props} style={[styles.textHeader]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 28,
        fontWeight: 'bold'
    }
});

export default HeadingText;