import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView} from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';

const HistoryItem = ({item,index}) => {
  return(
    <Text style={historyItem(item.status)}>
    {item.subject}
    </Text>
  )
}

 export const FocusHistory = ({ focusHistory, onClear}) => {
  const clearHistory = () =>{
    onClear();
  }
  return(
    <>
      <SafeAreaView style={{flex:0.5, alignItems:'center'}}>
      {!!focusHistory.length &&
      <>
        <Text style={styles.title}> Things we've focused on</Text>
        <FlatList
          style={{fex: 1}}
          contentContainerStyle={{flex:1, alignItems:"center"}}
          data={focusHistory}
          renderItem={HistoryItem}
        />
         <View style={styles.clearContainer}>
        <RoundedButton size={75} title="clear" onPress={() => onClear()} />
      </View>
        </>
      }
      </SafeAreaView>
     
    </>
  )
}

const historyItem = (status) => {
  return{
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }
}

const styles = StyleSheet.create({
  title:{
    color:'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    paddingBottom: spacing.sm
  }
})