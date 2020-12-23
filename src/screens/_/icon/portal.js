/*
 * @Author: czy0729
 * @Date: 2020-12-23 21:30:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-23 22:08:33
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Portal } from '@ant-design/react-native'
import { SafeAreaView } from 'react-navigation'
import { Touchable } from '@components'
import { _ } from '@stores'

const forceInset = {
  top: 'always',
  bottom: 'always'
}

function IconPortal({ index, onPress }) {
  return (
    <Portal>
      <SafeAreaView style={_.container.flex} forceInset={forceInset}>
        <View style={_.container.flex} pointerEvents='box-none'>
          <Touchable
            style={[
              styles.icon,
              {
                left: index * (_.window.width / 5)
              }
            ]}
            onPress={onPress}
          />
        </View>
      </SafeAreaView>
    </Portal>
  )
}

IconPortal.defaultProps = {
  index: 0,
  onPress: Function.prototype
}

export default observer(IconPortal)

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: 0,
    width: _.window.width / 5,
    height: _.tabBarHeight
  }
})
