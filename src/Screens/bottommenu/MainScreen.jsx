import { View, Text, StyleSheet, ViewToken, FlatList ,ListItem} from 'react-native'
import React from 'react'


const data = new Array(50).fill(0).map((_, index) => ({ id: index }))

const MainScreen = () => {
    const viewableItems = useSharedValue <ViewToken[]> ([]);

    return (
        <View style={styles.container}>
            <Text>MainScreen</Text>
            <FlatList
                data={data}
                contentContainerStyle={{ paddingTop: 40 }}
                onViewableItemsChanged={({ viewableItems: vItems }) => {
                    viewableItems.value = vItems;
                  }}
                renderItem={({ item }) => {
                    return <ListItem item={item} viewableItems={viewableItems} />;
                  }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
export default MainScreen