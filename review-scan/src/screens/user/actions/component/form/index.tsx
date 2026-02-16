/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:29:57
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const Form = ({ style = undefined, name = '', url = '' }) => {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { edit } = $.state
  return (
    <Flex style={stl(styles.form, style)} align='end'>
      <Flex.Item>
        <Text size={13} bold>
          描述
        </Text>
        <Input
          style={[styles.input, _.mt.sm]}
          defaultValue={String(name)}
          placeholder='在菜单上显示，唯一'
          onChangeText={text => $.onChangeText('name', text)}
        />
        <Text style={_.mt.md} size={13} bold>
          网址或协议
        </Text>
        <Text style={_.mt.sm} type='sub' size={10} lineHeight={13} bold>
          打开指定网址{'\n'}例：https:// 或 http:// 开头会调用浏览器打开{'\n\n'}URL Scheme 唤起 App
          {'\n'}例：orpheus://search?q=xxx 直接打开网易云 App 搜索
          {'\n'}例：bilibili://search/xxx 直接打开 bilibili App 搜索{'\n'}
          因为命令是对应单独条目的，xxx 请自行替换为实际文字
        </Text>
        <Input
          style={_.mt.sm}
          defaultValue={String(url)}
          multiline
          numberOfLines={3}
          textAlignVertical='top'
          placeholder='输入 URI'
          onChangeText={text => $.onChangeText('url', text)}
        />
        <Text style={_.mt.md} size={13} bold>
          排序
        </Text>
        <Input
          style={[styles.input, _.mt.sm]}
          value={String(edit.sort)}
          placeholder='数字，越大越前，选填'
          keyboardType='number-pad'
          onChangeText={text => $.onChangeText('sort', text)}
        />
      </Flex.Item>
      <IconTouchable
        style={_.ml.md}
        name='md-check'
        size={22}
        color={_.colorDesc}
        onPress={$.submitEdit}
      />
      <View style={styles.close}>
        <IconTouchable name='md-close' size={22} color={_.colorDesc} onPress={$.closeEdit} />
      </View>
    </Flex>
  )
}

export default ob(Form, COMPONENT)
