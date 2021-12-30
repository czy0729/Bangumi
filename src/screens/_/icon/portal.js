/*
 * @Author: czy0729
 * @Date: 2020-12-23 21:30:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-30 08:38:58
 */
import React from 'react'
import { View } from 'react-native'
import Portal from '@ant-design/react-native/lib/portal'
import { SafeAreaView } from 'react-navigation'
import { Touchable } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'

const forceInset = {
  top: 'always',
  bottom: 'always'
}

export const IconPortal = ob(({ index = 0, onPress = Function.prototype }) => {
  if (!systemStore.rendered) return null

  const styles = memoStyles()
  return (
    <Portal>
      <SafeAreaView style={_.container.flex} forceInset={forceInset}>
        <View style={_.container.flex} pointerEvents='box-none'>
          <View
            style={[
              styles.container,
              {
                left: index * (_.window.width / 5)
              }
            ]}
          >
            <Touchable style={styles.touch} onPress={onPress} />
          </View>
        </View>
      </SafeAreaView>
    </Portal>
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    bottom: 0
  },
  touch: {
    width: _.window.width / 5,
    height: _.tabBarHeight,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
