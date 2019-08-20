/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 16:12:04
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import _ from '@styles'

function Raw({ color, size }) {
  return <ActivityIndicator color={color} size={size} />
}

Raw.defaultProps = {
  color: _.colorDesc,
  size: 'small'
}

function Loading({ style, color, size, children }) {
  return (
    <View style={[_.container.column, style]}>
      <Raw color={color} size={size} />
      {children}
    </View>
  )
}

Loading.defaultProps = {
  color: _.colorDesc,
  size: 'small'
}

Loading.Raw = Raw

export default Loading

// import { StyleSheet, View, Animated } from 'react-native'

// const arr = [1, 2, 3, 4, 5]

// class Raw extends React.Component {
//   static defaultProps = {
//     color: _.colorDesc
//   }

//   constructor() {
//     super()

//     const initState = {}
//     arr.forEach(
//       item => (initState[`heightAnim${item}`] = new Animated.Value(20))
//     )
//     this.state = initState
//   }

//   componentDidMount() {
//     arr.forEach(item => {
//       const animation = Animated.sequence([
//         Animated.timing(this.state[`heightAnim${item}`], {
//           toValue: 40,
//           duration: 640,
//           delay: 200
//         }),
//         Animated.timing(this.state[`heightAnim${item}`], {
//           toValue: 20,
//           duration: 640,
//           delay: 200
//         }),
//         Animated.timing(this.state[`heightAnim${item}`], {
//           toValue: 20,
//           duration: 400
//         })
//       ])
//       setTimeout(() => {
//         Animated.loop(animation).start()
//       }, item * 240)
//     })
//   }

//   render() {
//     const { color } = this.props
//     return arr.map(item => (
//       <Animated.View
//         key={item}
//         style={[
//           styles.line,
//           {
//             backgroundColor: color,
//             height: this.state[`heightAnim${item}`]
//           }
//         ]}
//       />
//     ))
//   }
// }

// const styles = StyleSheet.create({
//   line: {
//     width: 4,
//     marginHorizontal: 2,
//     borderRadius: _.radiusSm
//   }
// })
