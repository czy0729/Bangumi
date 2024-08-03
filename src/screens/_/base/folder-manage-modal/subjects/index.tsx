/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:55:42
 */
import React from 'react'
import { View } from 'react-native'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { Cover, Flex, Iconfont, Input, Text } from '@components'
import { _, collectionStore } from '@stores'
import { HTMLDecode, keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { CONTROL_DS, HEIGHT, WIDTH } from '../ds'
import { IconTouchable } from '../../../icon'
import { PaginationList2 } from '../../pagination-list-2'
import { Popover } from '../../popover'
import { Tag } from '../../tag'
import { memoStyles } from './styles'

function Subjects({
  id,
  create,
  edit,
  content,
  order,
  item,
  detail,
  forwardRef,
  onChange,
  onOrder,
  onSubjectEdit,
  onSubjectControl,
  onSubmit
}) {
  const styles = memoStyles()
  const { list } = detail
  return (
    <PaginationList2
      style={styles.subjects}
      keyExtractor={keyExtractor}
      data={list}
      limit={8}
      scrollEnabled={!edit}
      renderItem={({ item: i, index }) => {
        const isEditing = !!edit && edit == i.id
        let data
        if (list.length <= 1) {
          data = CONTROL_DS.single
        } else if (index === 0) {
          data = CONTROL_DS.top
        } else if (index === list.length - 1) {
          data = CONTROL_DS.bottom
        } else {
          data = CONTROL_DS.middle
        }

        const collection = collectionStore.collect(i.id)
        return (
          <Flex style={styles.subject} align='start'>
            <Cover
              src={i.image}
              size={WIDTH}
              height={HEIGHT}
              radius={_.radiusSm}
              type={i.type === '音乐' ? i.type : undefined}
            />
            <Flex.Item style={styles.content}>
              <View>
                {!!collection && <Tag style={styles.collection} value={collection} />}
                <Text
                  size={13}
                  lineHeight={15}
                  type={i.id == id ? 'warning' : 'desc'}
                  bold
                  numberOfLines={2}
                >
                  {collection ? '           ' : ''}
                  {HTMLDecode(i.title)}
                </Text>
              </View>
              <Text style={_.mt.xs} size={9} lineHeight={12} type='sub' bold numberOfLines={2}>
                [{i.order}] {i.info}
              </Text>
              {!isEditing && !!i.comment && (
                <Text style={styles.comment} size={10}>
                  {i.comment}
                </Text>
              )}
              {isEditing && (
                <>
                  <TextareaItem
                    ref={forwardRef}
                    style={styles.textarea}
                    defaultValue={content}
                    placeholder='输入评价'
                    placeholderTextColor={_.colorDisabled}
                    rows={4}
                    selectionColor={_.colorMain}
                    clear
                    onChange={onChange}
                  />
                  <Input
                    style={[styles.textarea, _.mt.md]}
                    defaultValue={String(order == '0' ? '' : order)}
                    keyboardType='number-pad'
                    placeholder='输入排序 (数字越小越前)'
                    onChangeText={onOrder}
                  />
                </>
              )}
            </Flex.Item>
            <Flex style={styles.control} justify='end'>
              {isEditing && (
                <View style={styles.editWrap}>
                  <IconTouchable
                    name='md-close'
                    size={18}
                    color={_.colorSub}
                    onPress={() => onSubjectEdit()}
                  />
                  <View style={styles.submit}>
                    <IconTouchable
                      name='md-check'
                      size={18}
                      color={_.colorSub}
                      onPress={() => onSubmit(i, detail)}
                    />
                  </View>
                </View>
              )}
              {!edit && !create && (
                // @ts-expect-error
                <Popover.Old
                  style={styles.popover}
                  data={data}
                  onSelect={title => onSubjectControl(title, i, item)}
                >
                  <Flex style={styles.touch} justify='center'>
                    <Iconfont name='md-more-vert' size={18} color={_.colorSub} />
                  </Flex>
                  {/** @ts-expect-error */}
                </Popover.Old>
              )}
            </Flex>
          </Flex>
        )
      }}
    />
  )
}

export default ob(Subjects)
