/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:46:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:27:29
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { IMG_WIDTH } from '@constants'
import { COMPONENT, TITLE_HIT_SLOPS } from './ds'
import { styles } from './styles'
import { Props } from './types'

function ContainerTouchable({ subjectId, typeCn, name, name_cn, image, children }: Props) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => (
    <View style={systemStore.setting.homeListCompact ? styles.compact : styles.touch}>
      <Touchable
        withoutFeedback
        hitSlop={TITLE_HIT_SLOPS}
        onPress={() => {
          navigation.push('Subject', {
            subjectId,
            _jp: name,
            _cn: name_cn,
            _image: getCoverSrc(image, IMG_WIDTH),
            _type: typeCn
          })

          t('首页.跳转', {
            to: 'Subject',
            from: 'list'
          })
        }}
      >
        {children}
      </Touchable>
    </View>
  ))
}

export default ContainerTouchable
