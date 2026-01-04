/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:14:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-03 05:52:32
 */
import React from 'react'
import { View } from 'react-native'
import { Loading, ScrollView } from '@components'
import { ItemBlog } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Pagination from '../paginantion'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ type }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const blog = $.blog(type)

    return (
      <>
        <ScrollView keyboardDismissMode='on-drag' onScroll={$.onScroll}>
          {$.state.show && (
            <View style={styles.container}>
              {blog._loaded ? (
                blog.list.map((item, index) => (
                  <ItemBlog
                    key={item.id}
                    style={_.container.item}
                    index={index}
                    event={EVENT}
                    {...item}
                  />
                ))
              ) : (
                <Loading />
              )}
            </View>
          )}
        </ScrollView>
        <Pagination type={type} />
      </>
    )
  })
}

export default List
