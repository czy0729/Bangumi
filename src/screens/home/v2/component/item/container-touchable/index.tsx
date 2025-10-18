/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:46:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:27:29
 */
import React from 'react'
import { View } from 'react-native'
import { Link } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IMG_WIDTH } from '@constants'
import { COMPONENT, TITLE_HIT_SLOPS } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function ContainerTouchable({ subjectId, typeCn, name, name_cn, image, children }: Props) {
  r(COMPONENT)

  return useObserver(() => (
    <View style={systemStore.setting.homeListCompact ? styles.compact : styles.touch}>
      <Link
        path='Subject'
        getParams={() => ({
          subjectId,
          _jp: name,
          _cn: name_cn,
          _image: getCoverSrc(image, IMG_WIDTH),
          _type: typeCn
        })}
        eventId='首页.跳转'
        eventData={{
          to: 'Subject',
          from: 'list'
        }}
        withoutFeedback
        hitSlop={TITLE_HIT_SLOPS}
      >
        {children}
      </Link>
    </View>
  ))
}

export default ContainerTouchable
