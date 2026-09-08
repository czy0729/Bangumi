/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { s2t } from '@utils/thirdParty/open-cc'
import { ScrollView } from '../../scroll-view'
import { StorybookState } from '../../storybook'
import { Text } from '../../text'
import { useTransitionProgress } from './hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Transition({ fixed, title, headerTitle }: Props) {
  r(COMPONENT)

  // 避免页面退后也触发了渐出动画
  const _fixed =
    (StorybookState.navigateAction === 'POP' &&
      StorybookState.scrollTopMap.get(window?.location?.search)) >= 80
      ? true
      : fixed
  const { wrapStyles, bodyStyles } = useTransitionProgress(_fixed)

  const titleText = systemStore.setting.s2t && title ? s2t(title) : title

  const styles = memoStyles()

  return (
    <Animated.View style={[styles.view, wrapStyles]} pointerEvents={fixed ? 'auto' : 'none'}>
      <Animated.View style={[styles.body, title && styles.bodyTitle, bodyStyles]}>
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
