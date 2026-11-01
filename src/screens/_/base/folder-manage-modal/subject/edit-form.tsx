/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 条目编辑表单 (评价 / 排序)
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Input, TextareaItem } from '@components'
import { _ } from '@stores'
import { IconTouchable } from '../../../icon'
import { memoStyles } from './styles'

import type { EditFormProps } from './types'

function EditForm({
  forwardRef,
  content,
  order,
  item,
  pItem,
  onChange,
  onOrder,
  onSubmit
}: EditFormProps) {
  const styles = memoStyles()

  return (
    <View style={styles.control}>
      <TextareaItem
        ref={forwardRef}
        style={styles.textarea}
        defaultValue={content}
        placeholder='输入评价'
        placeholderTextColor={_.colorDisabled}
        rows={4}
        selectionColor={_.colorMain}
        clear
        onChange={text => onChange(text, 'content')}
      />
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Input
            style={styles.textarea}
            defaultValue={String(order == '0' ? '' : order)}
            keyboardType='number-pad'
            placeholder='输入排序 (数字越小越前)'
            onChangeText={onOrder}
          />
        </Flex.Item>
        <IconTouchable
          style={styles.check}
          name='md-check'
          size={18}
          color={_.colorSub}
          onPress={() => {
            onSubmit(item, pItem)
          }}
        />
      </Flex>
    </View>
  )
}

export default observer(EditForm)
