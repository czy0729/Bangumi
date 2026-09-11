/*
 * @Author: czy0729
 * @Date: 2023-07-06 07:36:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 20:22:26
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { Cover } from '../../../cover'
import { Flex, flexStyle } from '../../../flex'
import { Iconfont } from '../../../iconfont'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import Rank from '../rank'
import { memoStyles } from './styles'

import type { Props } from './types'

function Subject({ text, href, image, name, name_cn, rating, rank, air_date, onLinkPress }: Props) {
  const styles = memoStyles()

  const top = HTMLDecode(name_cn || name || text || '')
  const bottom = HTMLDecode(text !== top && text !== href ? text : name || name_cn || '')
  const showScore = !systemStore.setting.hideScore && !!rating?.score
  const showBottom = bottom && bottom !== top

  return (
    <View style={styles.wrap}>
      <Touchable style={stl(flexStyle(), styles.body)} onPress={onLinkPress}>
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
            <View style={_.mt.sm}>
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
            </View>
          )}
        </View>
      </Touchable>
    </View>
  )
}

export default observer(Subject)
