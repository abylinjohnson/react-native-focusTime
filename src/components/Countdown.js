import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';
const minutesToMillis = (min) => min * 1000 *60;
const formateTime = (time) => time < 10 ? `0${time}` : time;
export const Countdown = ({
  minutes,
  isPaused,
  onProgress,
  onEnd
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const countdown = () => {
    setMillis((time) => {
      if(time ===0 ){
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000
      return timeLeft;
    })
  }

  useEffect(()=> {
    setMillis(minutesToMillis(minutes))
  },[minutes])

  useEffect(()=>{
     onProgress(millis / minutesToMillis(minutes))
  },[millis])

  useEffect(() =>{
    if(isPaused){
      if(interval.current) clearInterval(interval.current)
      return;
    }
    interval.current = setInterval(countdown, 1000);
    return () => clearTimeout(interval.current)
  },[isPaused])


  const minute = Math.floor(millis /1000/60) % 60;
  const seconds = Math.floor(millis /1000) % 60;
  return(
    <Text style={styles.text}>{formateTime(minute)} : {formateTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    
    backgroundColor: 'rgba(94,132,226,0.3)'
  }
})