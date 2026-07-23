/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 02:53:32
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { HTMLDecode, x18 } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import Desc from '../../desc'
import Rating from './rating'
import Title from './title'
import { COMPONENT_MAIN, DEFAULT_PROPS, HIT_SLOP } from './ds'

const ItemGrid = memo(
  ({
    navigation,
    styles,
    hideScore = false,
    subjectId = 0,
    name = '',
    image = '',
    score = '',
    collection = '',
    time = '2359'
  }) => {
    const { width, height } = styles.cover

    return (
      <View style={styles.item}>
        <Touchable
          animate
          hitSlop={HIT_SLOP}
          onPress={() => {
            navigation.push('Subject', {
              subjectId,
              _cn: HTMLDecode(name),
              _image: getCoverSrc(image, width)
            })

            t('每日放送.跳转', {
              to: 'Subject',
              subjectId
            })
          }}
        >
          <Cover width={width} height={height} src={image} radius cdn={!x18(subjectId)} />
          <Title name={name} collection={collection} />
          <Desc style={_.mv.xs} subjectId={subjectId} size={10} filterToShow />
          <Rating hideScore={hideScore} time={time} score={score} />
        </Touchable>
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default ItemGrid
