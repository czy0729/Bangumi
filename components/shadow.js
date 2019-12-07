/*
 * 统一iOS和安卓的阴影效果 (很多问题, 待废弃)
 * @Author: czy0729
 * @Date: 2019-04-01 07:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:10:51
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'

function Shadow({ style, children }) {
  const styles = memoStyles()
  return (
    <View style={[IOS ? styles.ios : styles.todoAndroid, style]}>
      {children}
    </View>
  )
}

export default observer(Shadow)

const memoStyles = _.memoStyles(_ => ({
  ios: {
    shadowColor: _.colorShadow,
    shadowOffset: { height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },

  // @todo 实测低端安卓机卡顿, 暂时不处理
  todo: {
    backgroundColor: _.colorPlain,
    elevation: 2
  }
}))

// export default class Shadow extends React.Component {
//   static defaultProps = {
//     initWidth: '100%',
//     initHeight: 0
//   }

//   state = {
//     width: this.props.initWidth,
//     height: this.props.initHeight
//   }

//   onLayout = ({ nativeEvent }) => {
//     const { height } = nativeEvent.layout
//     this.setState({
//       height
//     })
//   }

//   render() {
//     const { style, children } = this.props
//     if (IOS) {
//       return <View style={[styles.ios, style]}>{children}</View>
//     }

//     const { width, height } = this.state
//     return (
//       <View style={[{ width, height }, style]}>
//         <View style={styles.android} />
//         <View style={styles.content}>
//           <View onLayout={this.onLayout}>{children}</View>
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   ios: {
//     shadowColor: _.colorShadow,
//     shadowOffset: { height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8
//   },

//   // @issue
//   // 安卓的阴影没有iOS的选项多, elevation颜色太深不美观, 通过一些手段来弄浅一点
//   // 然后elevation最大的在最顶层, 会导致zIndex无效
//   // 安卓上没有backgroundColor时elevation没效果
//   android: {
//     ...StyleSheet.absoluteFill,
//     backgroundColor: _.colorPlain,
//     borderRadius: _.radiusXs,
//     overflow: 'hidden',
//     opacity: 0.4,
//     elevation: 20
//   },
//   content: {
//     ...StyleSheet.absoluteFill,
//     elevation: 20
//   }
// })
