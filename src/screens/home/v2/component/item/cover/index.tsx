/*
 * @Author: czy0729
 * @Date: 2021-01-21 11:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:32:05
 */
import React from 'react'
import { Cover as CoverComp, getCoverSrc, Touchable } from '@components'
import { InView } from '@_'
import { _, systemStore } from '@stores'
import { x18 } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import Heatmaps from './heatmaps'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Cover({ index, subjectId, typeCn, name, name_cn, image }: Props) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const { homeListCompact } = systemStore.setting
    const style = homeListCompact ? styles.inViewCompact : styles.inView
    const width = style.minWidth
    const height = style.minHeight

    return (
      <Touchable
        animate
        onPress={() => {
          navigation.push('Subject', {
            subjectId,
            _jp: name,
            _cn: name_cn,
            _image: getCoverSrc(image, width),
            _type: typeCn
          })

          t('首页.跳转', {
            to: 'Subject',
            from: 'list'
          })
        }}
      >
        <InView style={style} y={height * index + _.headerHeight}>
          <CoverComp
            src={image}
            size={width}
            height={height}
            type={typeCn}
            radius
            cdn={!x18(subjectId)}
            priority={index < 4 ? 'high' : 'normal'}
          />
        </InView>
        {index === 0 && <Heatmaps />}
      </Touchable>
    )
  })
}

export default Cover
