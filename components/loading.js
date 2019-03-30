/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-17 15:30:01
 */
import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import _, { colorTitle, radiusSm } from '@styles'

const styles = StyleSheet.create({
  line: {
    width: 6,
    marginHorizontal: 2,
    backgroundColor: colorTitle,
    borderRadius: radiusSm
  }
})
const arr = [1, 2, 3, 4, 5]

export default class Loading extends React.Component {
  constructor() {
    super()

    const initState = {}
    arr.forEach(
      item => (initState[`heightAnim${item}`] = new Animated.Value(20))
    )
    this.state = initState
  }
  componentDidMount() {
    arr.forEach(item => {
      const animation = Animated.sequence([
        Animated.timing(this.state[`heightAnim${item}`], {
          toValue: 40,
          duration: 640,
          delay: 200
        }),
        Animated.timing(this.state[`heightAnim${item}`], {
          toValue: 20,
          duration: 640,
          delay: 200
        }),
        Animated.timing(this.state[`heightAnim${item}`], {
          toValue: 20,
          duration: 400
        })
      ])
      setTimeout(() => {
        Animated.loop(animation).start()
      }, item * 240)
    })
  }
  render() {
    return (
      <View style={_.container.row}>
        {arr.map(item => (
          <Animated.View
            key={item}
            style={[
              styles.line,
              {
                height: this.state[`heightAnim${item}`]
              }
            ]}
          />
        ))}
      </View>
    )
  }
}
