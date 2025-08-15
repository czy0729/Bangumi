/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 11:19:46
 */
import React, { ReactNode, useCallback, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { Flex } from '../../flex'
import { StorybookScroll } from '../../storybook'
import { styles } from './styles'
import { ListPropsWeb } from './types'

function List({
  contentContainerStyle,
  keyExtractor,
  sections,
  data,
  pagination,
  numColumns,
  scrollEnabled,
  showFooter,
  ListHeaderComponent,
  renderSectionHeader,
  renderItem,
  renderFooter,
  inverted,
  onFooterRefresh,
  onScroll
}: ListPropsWeb) {
  const pending = useRef(false)

  const handleFooterRefresh = useCallback(async () => {
    if (typeof onFooterRefresh !== 'function' || pending.current) return

    try {
      pending.current = true
      if (pagination?.page < pagination?.pageTotal) await onFooterRefresh()
    } catch (error) {}

    pending.current = false
  }, [pagination, onFooterRefresh])

  const elListHeader = useMemo(
    () =>
      React.isValidElement(ListHeaderComponent) ? (
        ListHeaderComponent
      ) : ListHeaderComponent ? (
        <ListHeaderComponent />
      ) : null,
    [ListHeaderComponent]
  )

  return useObserver(() => {
    let content: ReactNode
    if (sections) {
      content = sections.map((section: any, index: number) => (
        <View key={`section-${index}`} style={_.container.block}>
          {renderSectionHeader({ section })}
          {(section.data || [])
            .map((item: any) => {
              const element = renderItem({
                item,
                section
              })

              if (element) {
                const key =
                  typeof keyExtractor === 'function'
                    ? `section-item-${keyExtractor(item, index)}`
                    : `section-item-${index}`

                return React.cloneElement(element, {
                  key
                })
              }
              return null
            })
            .filter((item: any) => !!item)}
        </View>
      ))
    } else {
      content = data
        .map((item: any, index: number) => {
          const element = renderItem({
            item,
            index
          })
          if (element) {
            const key =
              typeof keyExtractor === 'function'
                ? `list-item-${keyExtractor(item, index)}`
                : `list-item-${index}`

            return React.cloneElement(element, {
              key
            })
          }
          return null
        })
        .filter(item => !!item)
    }

    return (
      <StorybookScroll
        style={contentContainerStyle}
        scrollEnabled={scrollEnabled}
        inverted={inverted}
        onScroll={onScroll}
        onFooterRefresh={handleFooterRefresh}
      >
        {elListHeader}
        {numColumns > 1 ? (
          <Flex style={styles.columnsContainer} wrap='wrap'>
            {content}
          </Flex>
        ) : (
          content
        )}
        {showFooter !== false && renderFooter}
      </StorybookScroll>
    )
  })
}

export default List
