/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:36:33
 */
import { useMemo } from 'react'
import { Heatmap, ScrollView } from '@components'
import { InView, PreventTouchPlaceholder } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { useHorizontalLazy } from '@utils/hooks'
import { TITLE_CATALOG } from '../../ds'
import BlockTitle from '../block-title'
import IconCatalog from '../icon/catalog'
import Item from './item'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Catalog = memo(
  ({ styles, showCatalog = true, catalog }) => {
    const { list, onScroll } = useHorizontalLazy(catalog)

    const elRight = useMemo(() => (showCatalog ? <IconCatalog /> : null), [showCatalog])

    return (
      <InView style={stl(styles.container, !showCatalog && _.short)}>
        <BlockTitle
          layoutKey='showCatalog'
          style={_.container.wind}
          right={elRight}
          icon={!showCatalog && 'md-navigate-next'}
          splitStyles
        >
          {TITLE_CATALOG}
        </BlockTitle>

        {showCatalog && (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentContainerStyle}
            horizontal
            onScroll={onScroll}
          >
            {list.map(item => (
              <Item key={item.id} item={item} />
            ))}
            <Heatmap id='条目.跳转' from='条目' />
          </ScrollView>
        )}
        <PreventTouchPlaceholder />
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN,
  props => ({
    ...props,

    /** 目录数据每次请求都不一样, 此数据非重要数据, 使判断只认数组长度, 减少重渲染次数 */
    catalog: props.catalog?.length
  })
)

export default Catalog
