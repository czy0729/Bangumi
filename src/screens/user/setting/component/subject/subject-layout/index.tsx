/*
 * @Author: czy0729
 * @Date: 2024-04-25 03:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 04:05:14
 */
import React from 'react'
import { Heatmap, Highlight, SegmentedControl, Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { DATA, TEXTS, THUMBS, VALUES } from '../ds'
import { getYuqueThumbs } from '../../../utils'

/** 页面布局 */
function SubjectLayout({ filter }) {
  return useObserver(() => (
    <>
      <Highlight
        style={[_.container.wind, _.mt.md, _.mb.sm]}
        type='sub'
        size={12}
        lineHeight={13}
        value={filter}
      >
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
                <Text style={styles.segmentedControl} bold align='center'>
                  此功能块不支持自定义
                </Text>
              ) : (
                <SegmentedControl
                  style={styles.segmentedControl}
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
  ))
}

export default SubjectLayout
