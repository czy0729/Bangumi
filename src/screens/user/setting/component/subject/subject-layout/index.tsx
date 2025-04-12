/*
 * @Author: czy0729
 * @Date: 2024-04-25 03:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-11 17:03:33
 */
import React from 'react'
import { Heatmap, Highlight, SegmentedControl, Text } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { DATA, TEXTS, THUMBS, VALUES } from '../ds'
import { getYuqueThumbs } from '../../../utils'
import { memoStyles } from './styles'

/** 页面布局 */
function SubjectLayout({ filter }) {
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Highlight style={styles.layout} type='sub' size={12} lineHeight={13} value={filter}>
          {TEXTS.layout.text}
        </Highlight>
        {Object.keys(DATA).map((item: keyof typeof DATA) => {
          const title = DATA[item]
          const value = systemStore.setting[item]
          const selectedIndex = value === -1 ? 2 : value ? 0 : 1
          return (
            <ItemSetting
              key={item}
              hd={title}
              ft={
                item === 'showEp' || item === 'showComic' ? (
                  <Text style={commonStyles.segmentedControl} bold align='center'>
                    此功能块不支持自定义
                  </Text>
                ) : (
                  <SegmentedControl
                    style={commonStyles.segmentedControl}
                    size={12}
                    values={VALUES}
                    selectedIndex={selectedIndex}
                    onValueChange={label => {
                      if (label && label === VALUES[selectedIndex]) return

                      t('设置.切换', {
                        title: `条目.${title}`,
                        label
                      })

                      const _value = label === '显示' ? true : label === '折叠' ? false : -1
                      systemStore.setSetting(item, _value)
                    }}
                  />
                )
              }
              filter={filter}
              thumb={getYuqueThumbs(THUMBS[item])}
            >
              <Heatmap id='设置.切换' title={`条目.${title}`} />
            </ItemSetting>
          )
        })}
      </>
    )
  })
}

export default SubjectLayout
