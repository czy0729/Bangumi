/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:15:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 20:25:28
 */
import React from 'react'
import { Flex, Input, Text, Touchable } from '@components'
import { IconTouchable, Notice } from '@_'
import { _, useStore } from '@stores'
import { confirm, open, stl } from '@utils'
import { ob } from '@utils/decorators'
import { HOST_IMAGE_UPLOAD } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Form({ expand, onExpand }) {
  const { $ } = useStore<Ctx>()
  return (
    <>
      {expand && (
        <>
          <Flex style={_.mt.md}>
            <Text>昵称</Text>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                defaultValue={$.state.nickname}
                placeholder='请填入昵称'
                autoCapitalize='none'
                showClear
                onChangeText={text => $.onChangeText('nickname', text)}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Text>签名</Text>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                defaultValue={$.state.sign_input}
                placeholder='请填入签名'
                autoCapitalize='none'
                showClear
                onChangeText={text => $.onChangeText('sign_input', text)}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Text>头像</Text>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                defaultValue={$.state.avatar}
                placeholder='请填入网络地址'
                autoCapitalize='none'
                showClear
                onChangeText={text => $.onChangeText('avatar', text)}
              />
            </Flex.Item>
            <IconTouchable
              style={_.ml.xs}
              name='md-info-outline'
              onPress={() =>
                confirm(
                  '此头像非网页版头像，仅在APP内时光机和个人空间中显示。需要输入图片网络地址，是否前往免费图床？',
                  () => open(HOST_IMAGE_UPLOAD),
                  '提示'
                )
              }
            />
          </Flex>
          <Flex style={[_.mt.md, _.mb.md]}>
            <Text>背景</Text>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                defaultValue={$.state.bg}
                placeholder='请填入网络地址'
                autoCapitalize='none'
                showClear
                onChangeText={text => $.onChangeText('bg', text)}
              />
            </Flex.Item>
            <IconTouchable
              style={_.ml.xs}
              name='md-info-outline'
              onPress={() =>
                confirm(
                  '网页版没有背景概念，仅在APP内时光机和个人空间中显示。需要输入图片网络地址，是否前往免费图床？',
                  () => open(HOST_IMAGE_UPLOAD),
                  '提示'
                )
              }
            />
          </Flex>
        </>
      )}
      <Touchable style={stl(styles.more, expand && _.mb.md)} onPress={onExpand}>
        <Flex justify='center'>
          <Text style={[_.mt.sm, _.mb.sm]} size={13} type='sub' bold>
            {expand ? '收起资料' : '展开资料'}
          </Text>
        </Flex>
      </Touchable>
      {!expand && (
        <Notice style={styles.notice}>
          <Text size={12} lineHeight={13} bold>
            这是一个过时的功能，背景和头像仅在客户端中生效，建议到官方网页中设置。
          </Text>
        </Notice>
      )}
    </>
  )
}

export default ob(Form, COMPONENT)
