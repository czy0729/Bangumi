/*
 * @Author: czy0729
 * @Date: 2025-03-19 22:20:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 20:26:12
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Cover, Flex, Iconfont, Text } from '@components'
import { _, collectionStore, uiStore } from '@stores'
import { getAction, HTMLDecode } from '@utils'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CONTROL_DS, HEIGHT, WIDTH } from '../ds'
import { Manage } from '../../manage'
import { Popover } from '../../popover'
import EditForm from './edit-form'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Props } from './types'

function Subject({
  forwardRef,
  id,
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
          {!edit && (
            <Popover
              style={styles.popover}
              data={data}
              onSelect={(title: string) => onSubjectControl(title, item, pItem)}
            >
              <Flex style={styles.touch} justify='center'>
                <Iconfont name='md-more-vert' size={20} />
              </Flex>
            </Popover>
          )}
        </View>
      </Flex>
      {isEditing && (
        <EditForm
          forwardRef={forwardRef}
          content={content}
          order={order}
          item={item}
          pItem={pItem}
          onChange={onChange}
          onOrder={onOrder}
          onSubmit={onSubmit}
          onSubjectEdit={onSubjectEdit}
        />
      )}
    </View>
  )
}

export default observer(Subject)
