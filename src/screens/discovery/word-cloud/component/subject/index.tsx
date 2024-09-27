/*
 * @Author: czy0729
 * @Date: 2024-09-27 02:45:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 03:16:49
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Text } from '@components'
import { BlurView, Rank, Stars } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function Subject(_props, { $ }: Ctx) {
  if (!$.subject?.id) return null

  const styles = memoStyles()
  const top = $.subject.name_cn || $.subject.name
  const bottom = $.subject.name
  return (
    <BlurView style={styles.container} intensity={64}>
      <Flex align='start'>
        <Cover
          src={$.subject.images?.medium}
          size={IMG_WIDTH_SM}
          height={IMG_HEIGHT_SM}
          radius={_.radiusMd - 2}
        />
        <Flex.Item>
          <Flex style={styles.body} direction='column' justify='between' align='start'>
            <View>
              <Text size={15} bold>
                {top}{' '}
                <Text type='sub' size={13} lineHeight={15} bold numberOfLines={2}>
                  ({$.subject.air_date.slice(0, 7)})
                </Text>
              </Text>
              {bottom && bottom !== top && (
                <Text style={_.mt.xs} type='sub' size={13} bold numberOfLines={2}>
                  {bottom}
                </Text>
              )}
            </View>
            <Flex style={_.mt.sm}>
              <Rank style={styles.rank} value={$.subject.rank} />
              <Stars value={$.subject.rating.score} />
              <Text style={_.ml.xs} type='sub' size={11} bold>
                ({$.subject.rating.total}人评分)
              </Text>
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    </BlurView>
  )
}

export default obc(Subject)
