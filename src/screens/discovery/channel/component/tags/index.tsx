/*
 * @Author: czy0729
 * @Date: 2020-05-04 17:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 标签
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { IconNavigate, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Tags() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { tags = [] } = $.channel

  return (
    <View style={_.mt.lg}>
      <SectionTitle
        style={_.container.wind}
        right={
          <IconNavigate
            onPress={() => {
              navigation.push('Tags', {
                type: $.type
              })

              t('频道.跳转', {
                to: 'Tags',
                from: 'tags',
                type: $.type
              })
            }}
          />
        }
      >
        标签
      </SectionTitle>

      <View style={styles.card}>
        <Flex style={styles.tags} wrap='wrap'>
          {tags.slice(0, 24).map(item => (
            <Touchable
              key={item}
              style={styles.tag}
              animate
              scale={0.85}
              onPress={() => {
                navigation.push('Tag', {
                  type: $.type,
                  tag: item
                })

                t('频道.跳转', {
                  to: 'Tag',
                  from: 'tags',
                  type: $.type,
                  tag: item
                })
              }}
            >
              <Text type='desc' size={13} bold>
                {item}
              </Text>
            </Touchable>
          ))}
        </Flex>
      </View>
    </View>
  )
}

export default observer(Tags)
