/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:06:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 20:55:23
 */
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { CONTROL_DS } from '../ds'
import { IconTouchable } from '../../../icon'
import { Popover } from '../../popover'
import { decodeContent } from '../utils'
import { styles } from './styles'

import type { Props } from './types'

function Catalog({ id, expand, edit, item, detail, onExpand, onToggle, onControl }: Props) {
  const isIn = detail?.list?.some(i => i.id == id)
  const date = item.time?.split(' ')[0]?.replace('创建于:', '') || ''

  return (
    <Flex style={[styles.catalog, { padding: _.device(_.sm, _.md) }]}>
      <Flex.Item>
        <Touchable onPress={() => onExpand(item)}>
          <Flex>
            <Text bold>
              {item.title}
              <Text size={11} lineHeight={14} type='sub' bold>
                {' '}
                ({detail.list.length})
              </Text>
            </Text>
            <Iconfont
              name={expand.includes(item.id) ? 'md-keyboard-arrow-down' : 'md-navigate-next'}
              size={20}
              lineHeight={24}
            />
          </Flex>
          <Text style={_.mt.xs} type='sub' size={10} lineHeight={11} bold numberOfLines={2}>
            {date}
            {detail.content ? ' · ' : ''}
            {decodeContent(detail.content)}
          </Text>
        </Touchable>
      </Flex.Item>
      <Flex style={styles.control} justify='end'>
        {!edit && (
          <>
            {!!id && (
              <IconTouchable
                style={styles.star}
                name={isIn ? 'md-check-circle' : 'md-check-circle-outline'}
                size={20}
                color={isIn ? _.colorWarning : _.colorIcon}
                onPress={() => onToggle(item, detail, isIn)}
              />
            )}
            <Popover
              style={styles.popover}
              data={CONTROL_DS.root}
              onSelect={title => onControl(title, item)}
            >
              <Flex style={styles.touch} justify='center'>
                <Iconfont name='md-more-vert' size={18} />
              </Flex>
            </Popover>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default observer(Catalog)
