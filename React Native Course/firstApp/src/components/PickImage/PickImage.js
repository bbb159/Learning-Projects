import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import image from '../../assets/wallhaven.jpg';

class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={image} style={styles.imagePreview} />
                </View>
                <View style={styles.button}>
                    <Button title='Pick Image' onPress={() => alert('pick image')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
    imagePreview: {
        width: '100%',
        height: '100%'
    }
});


export default PickImage;