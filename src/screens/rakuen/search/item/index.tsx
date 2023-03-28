/*
 * @Author: czy0729
 * @Date: 2020-10-23 11:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:58:47
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable, Expand, Flex, Heatmap } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { correctAgo, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ index, topicId, content }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { value, cache } = $.state
  const item = cache[topicId] || {}
  const titles = String(item.title).toLowerCase().split(String(value).toLowerCase())
  const contents = String(content).toLowerCase().split(String(value).toLowerCase())
  return (
    <View style={stl(styles.item, !!index && styles.border)}>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('帖子搜索.跳转', {
            to: 'Topic',
            topicId
          })

          navigation.push('Topic', {
            topicId
          })
        }}
      >
        {item.title ? (
          <Flex align='start'>
            <Avatar src={item.avatar} />
            <Flex.Item style={_.ml.sm}>
              <Text size={15} bold>
                {titles.map((item, index) => (
                  <>
                    <Text key={index} size={15} bold>
                      {item}
                    </Text>
                    {index !== titles.length - 1 && (
                      <Text key={index} size={15} bold type='warning'>
                        {value}
                      </Text>
                    )}
                  </>
                ))}
              </Text>
              <Text style={_.mt.xs} type='sub' size={12}>
                {correctAgo(item.time)} / {item.userName} / {item.group}
              </Text>
            </Flex.Item>
          </Flex>
        ) : (
          <Text size={16} type='main' bold>
            {topicId}.html
          </Text>
        )}
      </Touchable>
      <Expand ratio={1.5}>
        <Text lineHeight={16}>
          {contents.map((item, index) => (
            <>
              <Text key={index} lineHeight={16}>
                {item}
              </Text>
              {index !== contents.length - 1 && (
                <Text key={index} lineHeight={16} type='warning' bold>
                  {value}
                </Text>
              )}
            </>
          ))}
        </Text>
      </Expand>
      {!index && <Heatmap id='帖子搜索.跳转' />}
    </View>
  )
}

export default obc(Item)
