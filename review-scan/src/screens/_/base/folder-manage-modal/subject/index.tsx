/*
 * @Author: czy0729
 * @Date: 2025-03-19 22:20:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 16:02:21
 */
import React from 'react'
import { View } from 'react-native'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { Cover, Flex, Iconfont, Input, Text } from '@components'
import { _, collectionStore, uiStore } from '@stores'
import { getAction, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { CONTROL_DS, HEIGHT, WIDTH } from '../ds'
import { IconTouchable } from '../../../icon'
import { Manage } from '../../manage'
import { Popover } from '../../popover'
import { memoStyles } from './styles'
import { Props } from './types'

function Subject({
  forwardRef,
  id,
  create,
  edit,
  content,
  order,
  length,
  pItem,
  item,
  index,
  onSubjectEdit,
  onSubjectControl,
  onChange,
  onOrder,
  onSubmit
}: Props) {
  const styles = memoStyles()
  const isEditing = !!edit && edit == item.id
  let data: readonly string[]
  if (length <= 1) {
    data = CONTROL_DS.single
  } else if (index === 0) {
    data = CONTROL_DS.top
  } else if (index === length - 1) {
    data = CONTROL_DS.bottom
  } else {
    data = CONTROL_DS.middle
  }

  const collection = collectionStore.collect(item.id, item.type)
  const isMusic = item.type === '音乐'

  return (
    <View style={styles.subject}>
      <Flex align='start'>
        <Cover
          src={item.image}
          size={WIDTH}
          height={isMusic ? WIDTH : HEIGHT}
          radius={_.radiusXs}
          type={isMusic ? item.type : undefined}
        />
        <Flex.Item style={styles.content}>
          <Flex align='start'>
            <Flex.Item>
              <Text
                size={13}
                lineHeight={15}
                type={item.id == id ? 'warning' : 'desc'}
                bold
                numberOfLines={2}
              >
                {HTMLDecode(item.title)}
              </Text>
              <Text style={_.mt.xs} size={10} lineHeight={12} type='sub' bold numberOfLines={2}>
                [{item.order}] {item.info}
              </Text>
            </Flex.Item>
            {!isEditing && (
              <Manage
                style={styles.manage}
                collection={collection}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: item.id,
                      title: item.title,
                      status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                      action: getAction(item.type)
                    },
                    '目录'
                  )
                }}
              />
            )}
          </Flex>
          {!isEditing && !!item.comment && (
            <Text style={styles.comment} size={10}>
              {item.comment}
            </Text>
          )}
        </Flex.Item>
        <View>
          {isEditing && (
            <IconTouchable
              style={styles.close}
              name='md-close'
              size={18}
              color={_.colorSub}
              onPress={onSubjectEdit}
            />
          )}
          {!edit && !create && (
            <Popover.Old
              style={styles.popover}
              data={data}
              onSelect={(title: string) => onSubjectControl(title, item, pItem)}
            >
              <Flex style={styles.touch} justify='center'>
                <Iconfont name='md-menu' size={18} />
              </Flex>
            </Popover.Old>
          )}
        </View>
      </Flex>
      {isEditing && (
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
      )}
    </View>
  )
}

export default ob(Subject)
