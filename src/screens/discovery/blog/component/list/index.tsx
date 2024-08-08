/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:14:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 05:56:13
 */
import React from 'react'
import { View } from 'react-native'
import { Loading, ScrollView } from '@components'
import { ItemBlog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Pagination from '../paginantion'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function List({ type }: Props, { $ }: Ctx) {
  const styles = memoStyles()
  const blog = $.blog(type)
  return (
    <>
      <ScrollView
        keyboardDismissMode='on-drag'
        // scrollToTop={type === $.type}
      >
        {$.state.show && (
          <View style={styles.container}>
            {blog._loaded ? (
              blog.list.map(item => (
                <ItemBlog key={item.id} style={_.container.item} event={EVENT} {...item} />
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
}

export default obc(List, COMPONENT)
