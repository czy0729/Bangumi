/*
 * @Author: czy0729
 * @Date: 2023-11-17 04:55:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 06:55:29
 */
import React from 'react'
import { Alert } from 'react-native'
import { Flex, Text, Input } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { alert, open } from '@utils'
import { obc } from '@utils/decorators'
import { s2tAsync } from '@utils/async'
import { STORYBOOK } from '@constants'
import { Ctx } from '../../types'
import { CONTENT_DIRECTORY, CONTENT_SMB, TITLE } from './ds'
import { styles } from './styles'

function UrlItem({ connectRef }, { $ }: Ctx) {
  const { url } = $.state
  return (
    <Flex style={_.mt.sm} align='start'>
      <Flex style={styles.label}>
        <Text size={12}>跳转</Text>
        <IconTouchable
          style={_.ml._xs}
          name='md-info-outline'
          size={14}
          onPress={() => {
            if (STORYBOOK) {
              alert(s2tAsync(CONTENT_DIRECTORY), s2tAsync(TITLE))
              return
            }

            Alert.alert(s2tAsync(TITLE), s2tAsync(CONTENT_SMB), [
              {
                text: s2tAsync('已知问题和详细教程'),
                onPress: () => {
                  open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/rrb8zh')
                }
              },
              {
                text: s2tAsync('确定'),
                onPress: () => {}
              }
            ])
          }}
        />
      </Flex>
      <Flex.Item>
        {STORYBOOK ? (
          <Input
            ref={connectRef}
            style={styles.input}
            defaultValue={url}
            placeholder='选填，[PATH]=路径，[FILE]=文件，头尾不需要斜杠'
            showClear
            returnKeyType='done'
            returnKeyLabel='新增'
            onChangeText={text => $.onChange('url', text)}
          />
        ) : (
          <Input
            ref={connectRef}
            style={[styles.input, styles.inputMultiline]}
            inputStyle={styles.multilineInputStyle}
            defaultValue={url}
            showClear
            multiline
            numberOfLines={3}
            textAlignVertical='top'
            returnKeyType='done'
            returnKeyLabel='新增'
            onChangeText={text => $.onChange('url', text)}
          />
        )}
      </Flex.Item>
    </Flex>
  )
}

export default obc(UrlItem)
