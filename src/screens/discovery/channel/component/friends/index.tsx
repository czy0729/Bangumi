/*
 * @Author: czy0729
 * @Date: 2020-05-04 16:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-23 20:44:24
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { findSubjectCn, getVisualLength, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { COVER_HEIGHT_SM, COVER_WIDTH_SM } from '../rank/ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TextProps } from '@components'
import type { Ctx } from '../../types'

function Friends() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { friends = [] } = $.channel
  if (!friends.length) return null

  const styles = memoStyles()

  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>好友最近关注</SectionTitle>

      <Flex style={styles.container} wrap='wrap'>
        {friends.map((item, index) => {
          const title = findSubjectCn(item.name, item.id)
          const visualLength = getVisualLength(title)
          const textProps: TextProps = {
            size: visualLength >= 18 ? 10 : visualLength >= 14 ? 11 : 12,
            numberOfLines: 3
          } as const

          return (
            <View
              key={`${item.id}${item.userId}`}
              style={stl(styles.item, index % 2 !== 0 && styles.itemMarginLeft)}
            >
              <Touchable
                animate
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId: item.id,
                    _jp: item.name,
                    _image: getCoverSrc(item.cover, COVER_WIDTH_SM),
                    _type: $.typeCn
                  })

                  t('频道.跳转', {
                    to: 'Subject',
                    from: 'friends',
                    type: $.type,
                    subjectId: item.id
                  })
                }}
              >
                <Flex align='start'>
                  <View style={styles.image}>
                    <Cover
                      src={item.cover}
                      width={COVER_WIDTH_SM}
                      height={COVER_HEIGHT_SM}
                      radius={_.radiusSm}
                      type={$.typeCn}
                      cdn={!x18(item.id, title)}
                    />
                  </View>

                  <Flex.Item style={$.typeCn === '音乐' ? _.ml.md : _.ml.sm}>
                    <Katakana.Provider {...textProps}>
                      <Katakana {...textProps} bold>
                        {title}
                      </Katakana>
                    </Katakana.Provider>

                    <Text style={_.mt.xs} size={11} numberOfLines={2}>
                      <Text
                        size={11}
                        type='sub'
                        bold
                        onPress={() => {
                          navigation.push('Zone', {
                            userId: item.userId,
                            _name: item.userName
                          })

                          t('频道.跳转', {
                            to: 'Zone',
                            from: 'friends',
                            type: $.type,
                            userId: item.userId
                          })
                        }}
                      >
                        {item.userName}
                      </Text>{' '}
                      {item.action}
                    </Text>
                  </Flex.Item>
                </Flex>
              </Touchable>
            </View>
          )
        })}
      </Flex>
    </View>
  )
}

export default observer(Friends)
