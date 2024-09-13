/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 20:19:50
 */
import React from 'react'
import { View } from 'react-native'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { Cover, Flex, Iconfont, Input, Text } from '@components'
import { _, collectionStore } from '@stores'
import { CatalogDetail, CatalogDetailItem } from '@stores/discovery/types'
import { HTMLDecode, keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { AnyObject } from '@types'
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
}: AnyObject<{
  detail: CatalogDetail
}>) {
  const styles = memoStyles()
  const { list } = detail
  const renderItem = ({ item: i, index }: { item: CatalogDetailItem; index: number }) => {
    const isEditing = !!edit && edit == i.id
    let data: readonly string[]
    if (list.length <= 1) {
      data = CONTROL_DS.single
    } else if (index === 0) {
      data = CONTROL_DS.top
    } else if (index === list.length - 1) {
      data = CONTROL_DS.bottom
    } else {
      data = CONTROL_DS.middle
    }

    let collection: string = collectionStore.collect(i.id)
    if (i.type) {
      if (i.type === '书籍') {
        collection = collection.replace('看', '读')
      } else if (i.type === '游戏') {
        collection = collection.replace('看', '玩')
      } else if (i.type === '音乐') {
        collection = collection.replace('看', '听')
      }
    }

    return (
      <View style={styles.subject}>
        <Flex align='start'>
          <Cover
            src={i.image}
            size={WIDTH}
            height={HEIGHT}
            radius={_.radiusXs}
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
            <Text style={_.mt.xs} size={10} lineHeight={12} type='sub' bold numberOfLines={2}>
              [{i.order}] {i.info}
            </Text>
            {!isEditing && !!i.comment && (
              <Text style={styles.comment} size={10}>
                {i.comment}
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
                onPress={() => onSubjectEdit()}
              />
            )}
            {!edit && !create && (
              // @ts-expect-error
              <Popover.Old
                style={styles.popover}
                data={data}
                onSelect={(title: string) => onSubjectControl(title, i, item)}
              >
                <Flex style={styles.touch} justify='center'>
                  <Iconfont name='md-more-vert' size={18} color={_.colorSub} />
                </Flex>
                {/** @ts-expect-error */}
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
              onChange={onChange}
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
                onPress={() => onSubmit(i, detail)}
              />
            </Flex>
          </View>
        )}
      </View>
    )
  }

  // 编辑模式下只显示编辑项
  if (edit) {
    const item = list.find(item => item.id == edit)
    if (item) return <View style={styles.subjects}>{renderItem({ item, index: 0 })}</View>
  }

  return (
    <PaginationList2
      style={styles.subjects}
      keyExtractor={keyExtractor}
      data={list}
      limit={8}
      scrollEnabled={!edit}
      renderItem={renderItem}
      showFooter={false}
    />
  )
}

export default ob(Subjects)
