import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../ListItem/ListItem';

const PlaceList = props => {


    return (
        <FlatList 
            data={props.places}
            renderItem={(info) => (
                <ListItem
                    placeName={info.item.name} 
                    placeImage={info.item.image}
                    onItemPressed={() => props.onItemSelected(info.item.key)}/>
            )}
            keyExtractor={(info) => info.key.toString() }
            style={styles.listContainer}>
        </FlatList>
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: '100%'
    }
  });

export default PlaceList;