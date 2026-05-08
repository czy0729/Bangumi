/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:14:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 05:54:46
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Loading, ScrollView } from '@components'
import { ItemBlog } from '@_'
import { useStore } from '@stores'
import Pagination from '../paginantion'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ type }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  // --- Render ---
  if (!$.state.show) return null

  const blog = $.blog(type)

  return (
    <>
      <ScrollView keyboardDismissMode='on-drag' onScroll={$.onScroll}>
        <View style={styles.container}>
          {!blog._loaded ? (
            <Loading />
          ) : (
            blog.list.map((item, index) => (
              <ItemBlog key={item.id} index={index} event={EVENT} {...item} />
            ))
          )}
        </View>
      </ScrollView>
      <Pagination type={type} />
    </>
  )
}

export default observer(List)
