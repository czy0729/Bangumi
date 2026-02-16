/*
 * @Author: czy0729
 * @Date: 2023-11-17 04:55:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:23:35
 */
import React from 'react'
import { Alert } from 'react-native'
import { Flex, Input, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { alert, open } from '@utils'
import { s2tAsync } from '@utils/async'
import { ob } from '@utils/decorators'
import { FROZEN_FN, WEB } from '@constants'
import { AnyObject } from '@types'
import { Ctx } from '../../../types'
import { CONTENT_DIRECTORY, CONTENT_SMB, TITLE } from './ds'
import { styles } from './styles'

function UrlItem({
  store,
  connectRef
}: AnyObject<{
  store: Ctx['$']
}>) {
  let { $ } = useStore<Ctx>()
  $ = $?.state ? $ : store

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
            if (WEB) {
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
                onPress: FROZEN_FN
              }
            ])
          }}
        />
      </Flex>
      <Flex.Item>
        {WEB ? (
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

export default ob(UrlItem)
