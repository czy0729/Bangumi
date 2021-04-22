/*
 * @Author: czy0729
 * @Date: 2020-12-23 21:30:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-22 21:12:58
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
  if (!systemStore.rendered) {
    return null
  }

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
})

const styles = _.create({
  icon: {
    position: 'absolute',
    bottom: 0,
    width: _.window.width / 5,
    height: _.tabBarHeight,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
