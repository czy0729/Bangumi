/*
 * @Author: czy0729
 * @Date: 2022-11-24 19:20:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 21:00:58
 */
import React from 'react'
import { Cover, Flex, Heatmap, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { useStore } from '@stores'
import { x18 } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { IMG_DEFAULT } from '@constants'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Item({ from, data }) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const _from = `系列${from}`

    return (
      <Touchable
        style={styles.touch}
        animate
        scale={0.9}
        onPress={() => {
          navigation.push('Subject', {
            subjectId: data.id,
            _jp: data.title,
            _image: getCoverSrc(data.image, COVER_WIDTH)
          })

          t('条目.跳转', {
            to: 'Subject',
            from: _from,
            subjectId: $.subjectId
          })
        }}
      >
        <Flex>
          <Squircle width={COVER_WIDTH} height={COVER_HEIGHT} radius={3}>
            <Cover
              src={data.image || IMG_DEFAULT}
              size={COVER_WIDTH}
              height={COVER_HEIGHT}
              cdn={!x18($.subjectId)}
              fadeDuration={0}
              skeleton={false}
              noDefault
            />
          </Squircle>
          <Text style={styles.text} size={10}>
            {data.type || from}
          </Text>
        </Flex>
        <Heatmap right={-19} id='条目.跳转' from={_from} />
      </Touchable>
    )
  })
}

export default Item
