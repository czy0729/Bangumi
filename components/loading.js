/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:08:19
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function Raw({ color = _.colorSub, size }) {
  return <ActivityIndicator color={color} size={size} />
}

Raw.defaultProps = {
  color: undefined,
  size: 'small'
}

function Loading({ style, color = _.colorSub, size, children }) {
  return (
    <View style={[_.container.column, style]}>
      <Raw color={color} size={size} />
      {children}
    </View>
  )
}

Loading.defaultProps = {
  color: undefined,
  size: 'small'
}

Loading.Raw = observer(Raw)

export default observer(Loading)

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
