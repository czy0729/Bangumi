/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 00:00:00
 */
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { s2t } from '@utils/thirdParty/open-cc'
import { ScrollView } from '../../scroll-view'
import { Text } from '../../text'
import { useTransitionProgress } from './hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Transition({ fixed, title, headerTitle }: Props) {
  r(COMPONENT)

  const { statusBarHeight } = useInsets()
  const { wrapStyles, bodyStyles } = useTransitionProgress(fixed)

  const titleText = systemStore.setting.s2t && title ? s2t(title) : title

  const styles = memoStyles()

  return (
    <Animated.View style={[styles.view, wrapStyles]} pointerEvents={fixed ? 'auto' : 'none'}>
      <Animated.View
        style={[
          styles.body,
          title && styles.bodyTitle,
          bodyStyles,
          {
            top: statusBarHeight + 2
          }
        ]}
      >
        {headerTitle || (
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} horizontal>
            <Text style={styles.text} size={15} numberOfLines={1}>
              {titleText}
            </Text>
          </ScrollView>
        )}
      </Animated.View>
    </Animated.View>
  )
}

export default observer(Transition)
