/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 新增源头入口, 新建时原位展开表单
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import Form from '../form'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Create({ type, name, onScrollIntoViewIfNeeded }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  if ($.creatingType === type) {
    const { item } = $.state.edit

    return (
      <View style={styles.form}>
        <Text size={15} bold>
          添加{name}源头
        </Text>
        <Form
          style={_.mt.sm}
          name={item.name}
          url={item.url}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Touchable style={styles.btn} onPress={() => $.openCreate(type)}>
        <Flex style={styles.inner} direction='column' justify='center'>
          <Iconfont name='md-add' size={20} color={_.colorSub} />
          <Text style={_.mt.xs} type='sub' size={11} bold>
            添加源头
          </Text>
        </Flex>
      </Touchable>
    </View>
  )
}

export default observer(Create)
