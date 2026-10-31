/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 单条自定义跳转
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover, Tag } from '@_'
import { _, useStore } from '@stores'
import { confirm, stl } from '@utils'
import Form from '../form'
import { COMPONENT, MENU_ACTIVE, MENU_INACTIVE } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ uuid, active, name, url, sort }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const isActive = !!active
  const isEdit = !!uuid && $.editingUuid === uuid

  return (
    <>
      <Flex style={stl(styles.item, !isActive && styles.disabled)}>
        <Flex.Item>
          <Text size={15} bold>
            {name}
          </Text>
          <Flex style={_.mt.sm}>
            <Tag style={_.mr.sm} value={sort} />
            <Flex.Item>
              <Text size={12} type='sub' numberOfLines={1}>
                {url}
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        {isActive && <Tag style={_.ml.md} value='生效' />}
        <Popover
          style={_.ml.md}
          data={isActive ? MENU_ACTIVE : MENU_INACTIVE}
          onSelect={title => {
            switch (title) {
              case '编辑':
                $.openEdit({
                  uuid,
                  name,
                  url,
                  sort,
                  active
                })
                break

              case '删除':
                confirm(`确定删除 [${name}] ?`, () => {
                  $.deleteItem({
                    uuid
                  })
                })
                break

              case '停用':
                $.disableItem({
                  uuid
                })
                break

              case '启用':
                $.activeItem({
                  uuid
                })
                break

              case '测试':
                $.go({
                  url
                })
                break

              default:
                break
            }
          }}
        >
          <View style={styles.touch}>
            <Iconfont name='md-more-vert' color={_.colorDesc} />
          </View>
        </Popover>
      </Flex>
      {isEdit && <Form />}
    </>
  )
}

export default observer(Item)
