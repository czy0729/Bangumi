/*
 * @Author: czy0729
 * @Date: 2023-07-06 07:36:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:39:08
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { HTMLDecode } from '@utils'
import { Cover } from '../../../cover'
import { Flex } from '../../../flex'
import { Iconfont } from '../../../iconfont'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import Rank from '../rank'
import { memoStyles } from './styles'
import { Props } from './types'

function Subject({ text, href, image, name, name_cn, rating, rank, air_date, onLinkPress }: Props) {
  const styles = memoStyles()
  const top = HTMLDecode(name_cn || name || text || '')
  const bottom = HTMLDecode(text !== top && text !== href ? text : name || name_cn || '')
  const showScore = !systemStore.setting.hideScore && !!rating?.score
  const showBottom = bottom && bottom !== top
  return (
    <View style={styles.wrap}>
      <Touchable animate onPress={onLinkPress}>
        <Flex style={styles.body}>
          <Cover src={image} size={40} radius={_.radiusXs} />
          <View style={_.ml.sm}>
            <Text style={styles.top} size={12} bold numberOfLines={2}>
              {top}
              {!!air_date && air_date !== '0000-00-00' && (
                <Text size={10} lineHeight={12} type='sub' bold>
                  {'  '}
                  {String(air_date).slice(0, 7)}
                </Text>
              )}
            </Text>
            {(showScore || showBottom) && (
              <Flex style={_.mt.sm}>
                {showScore && (
                  <Flex style={_.mr.xs}>
                    <Rank value={rank} />
                    <Iconfont name='md-star' size={10} color={_.colorWarning} />
                    <Text style={_.ml.xxs} type='sub' size={10} bold>
                      {rating?.score}
                    </Text>
                    {!!rating?.total && (
                      <Text style={_.ml.xs} type='sub' size={10} bold>
                        ({rating?.total})
                      </Text>
                    )}
                  </Flex>
                )}
              </Flex>
            )}
          </View>
        </Flex>
      </Touchable>
    </View>
  )
}

export default observer(Subject)
