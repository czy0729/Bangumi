/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 08:17:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Loading, RenderHtml, ScrollView, Text } from '@components'
import { styles } from './styles'

import type { Props } from './types'

function Names({ name }: Props) {
  return (
    <ScrollView style={styles.names}>
      {name._loaded ? (
        name.list.length ? (
          name.list.map((item, index) => (
            <Flex key={index} style={styles.item} align='start'>
              <Text style={styles.date} type='sub' size={12}>
                {item.date}
              </Text>
              <Flex.Item style={styles.content}>
                <RenderHtml
                  html={item.content}
                  baseFontStyle={{
                    fontSize: 12,
                    lineHeight: 13
                  }}
                />
              </Flex.Item>
            </Flex>
          ))
        ) : (
          <Flex style={styles.empty} direction='column' justify='center'>
            <Text type='sub' size={13} align='center'>
              没有找到历史昵称
            </Text>
          </Flex>
        )
      ) : (
        <Flex style={styles.loading}>
          <Loading />
        </Flex>
      )}
    </ScrollView>
  )
}

export default observer(Names)
