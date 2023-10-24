import React from "react";
import { StyleSheet, View} from 'react-native';
import Navigators from "./Navigators";

export default App = () =>{
    return(
        <View style={styles.container}>
          <Navigators/>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        height:'100%',
        backgroundColor: '#2f2f2f'
    }
})
