/*
 * @Author: czy0729
 * @Date: 2023-07-03 07:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-20 05:14:58
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Cover, Flex, Link, Text } from '@components'
import { fixedAll } from '@components/avatar/utils'
import { _, useStore } from '@stores'
import { SubjectFromHtmlCatalogItem } from '@stores/subject/types'
import { HTMLDecode, x18 } from '@utils'
import { WithItem } from '@types'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Item({ item }: WithItem<SubjectFromHtmlCatalogItem>) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const title = HTMLDecode(item.title)
    return (
      <Link
        style={styles.item}
        path='CatalogDetail'
        params={{
          catalogId: item.id
        }}
        eventId='条目.跳转'
        eventData={{
          to: 'CatalogDetail',
          from: '条目',
          catalogId: item.id
        }}
      >
        <Flex>
          <Cover
            src={fixedAll(item.avatar, _.r(40))}
            size={_.r(40)}
            radius
            type='目录'
            cdn={!x18($.subjectId)}
          />
          <Flex.Item style={_.ml.md}>
            <Text style={styles.text} size={9} lineHeight={12} bold numberOfLines={2}>
              {title}
              {title.length <= 6 ? '\n' : ' '}
              <Text size={9} lineHeight={12} type='sub'>
                {HTMLDecode(item.name)}
              </Text>
            </Text>
          </Flex.Item>
        </Flex>
      </Link>
    )
  })
}

export default Item
