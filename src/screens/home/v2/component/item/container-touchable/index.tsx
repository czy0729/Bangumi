/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:46:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:34:45
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Link } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { IMG_WIDTH } from '@constants'
import { COMPONENT, TITLE_HIT_SLOPS } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function ContainerTouchable({
  subjectId,
  typeCn,
  name,
  name_cn,
  image,
  disabled,
  children
}: Props) {
  r(COMPONENT)

  return (
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
        disabled={disabled}
      >
        {children}
      </Link>
    </View>
  )
}

export default observer(ContainerTouchable)
