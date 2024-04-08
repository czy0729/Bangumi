/*
 * @Author: czy0729
 * @Date: 2021-01-21 11:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 10:56:11
 */
import React from 'react'
import { Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover as CompCover, InView } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_HEIGHT } from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import Heatmaps from './heatmaps'
import { COMPONENT, ITEM_HEIGHT, ITEM_HEIGHT_COMPACT } from './ds'
import { styles } from './styles'

function Cover(
  {
    index,
    subjectId,
    typeCn,
    name,
    name_cn,
    image
  }: {
    index: number
    subjectId: SubjectId
    typeCn: SubjectTypeCn
    name: string
    name_cn: string
    image: string
  },
  { navigation }: Ctx
) {
  const { homeListCompact } = systemStore.setting
  const style = homeListCompact ? styles.inViewCompact : styles.inView
  const size = style.minWidth
  return (
    <Touchable
      animate
      onPress={() => {
        t('首页.跳转', {
          to: 'Subject',
          from: 'list'
        })

        navigation.push('Subject', {
          subjectId,
          _jp: name,
          _cn: name_cn,
          _image: getCoverSrc(image, size),
          _collection: '在看',
          _type: typeCn
        })
      }}
    >
      <InView
        style={style}
        y={(homeListCompact ? ITEM_HEIGHT_COMPACT : ITEM_HEIGHT) * index + _.headerHeight}
      >
        <CompCover
          src={image}
          size={size}
          height={homeListCompact ? style.minHeight : IMG_HEIGHT}
          type={typeCn}
          radius
        />
      </InView>
      {index === 0 && <Heatmaps />}
    </Touchable>
  )
}

export default obc(Cover, COMPONENT)
