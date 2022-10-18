/*
 * @Author: czy0729
 * @Date: 2020-12-23 21:30:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 15:43:03
 */
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Portal from '@ant-design/react-native/lib/portal'
import { Touchable } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as IconPortalProps } from './types'

export { IconPortalProps }

const FORCE_INSET = {
  top: 'always',
  bottom: 'always'
} as const

export const IconPortal = ob(({ index = 0, onPress = () => {} }: IconPortalProps) => {
  if (!systemStore.rendered) return null

  const styles = memoStyles()
  return (
    <Portal>
      <SafeAreaView style={_.container.flex} forceInset={FORCE_INSET}>
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
