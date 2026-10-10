/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:14:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 日志列表, 按标签页分页展示
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { ITEM_BLOG_HEIGHT } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, stl } from '@utils'
import Pagination from '../pagination'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ type }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const blog = $.blog(type)

  return (
    <>
      <View style={stl(_.container.flex, !$.state.show && styles.hide)}>
        <ListView
          ref={$.forwardRef}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.container}
          data={blog}
          skipEnteringExitingAnimations={4}
          estimatedItemHeight={ITEM_BLOG_HEIGHT}
          itemHeightKey={`${type}-${$.state.currentPage[type]}`}
          renderItem={renderItem}
          showFooter={false}
          onScroll={$.onScroll}
        />
        {!blog._loaded && <Loading style={styles.loading} />}
      </View>
      <Pagination type={type} />
    </>
  )
}

export default observer(List)
