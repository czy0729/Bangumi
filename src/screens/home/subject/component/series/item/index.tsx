/*
 * @Author: czy0729
 * @Date: 2022-11-24 19:20:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:54:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Cover, Flex, Heatmap, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { useStore } from '@stores'
import { x18 } from '@utils'
import { t } from '@utils/fetch'
import { IMG_DEFAULT } from '@constants'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Item({ from, data }) {
  const { $, navigation } = useStore<Ctx>()

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
        <Squircle width={COVER_WIDTH} height={COVER_HEIGHT} radius={4}>
          <Cover
            src={data.image || IMG_DEFAULT}
            size={COVER_WIDTH}
            height={COVER_HEIGHT}
            radius={0}
            cdn={!x18($.subjectId, data.title)}
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
}

export default observer(Item)
