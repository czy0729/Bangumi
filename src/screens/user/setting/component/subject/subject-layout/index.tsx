/*
 * @Author: czy0729
 * @Date: 2024-04-25 03:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 03:18:44
 */
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Highlight, SegmentedControl, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { subjectStore, systemStore } from '@stores'
import { confirm, feedback } from '@utils'
import { t } from '@utils/fetch'
import { useMount } from '@utils/hooks'
import commonStyles from '../../../styles'
import { DATA, TEXTS, THUMBS, VALUES } from '../ds'
import { getYuqueThumbs } from '../../../utils'
import { IconLayout } from '../../icons'
import { memoStyles } from './styles'

import type { LayoutKey } from '@stores/subject/types'
import type { WithFilterProps } from '../../../types'

/** 页面布局 */
function SubjectLayout({ filter }: WithFilterProps) {
  const [key, setKey] = useState(0)
  const [layoutStats, setLayoutStats] = useState<Partial<Record<LayoutKey, number>>>({})

  const styles = memoStyles()

  const refreshLayoutStats = useCallback(async () => {
    setLayoutStats(await subjectStore.fetchLayoutStats())
  }, [])

  useMount(() => {
    refreshLayoutStats()
  })

  return (
    <>
      <Flex style={styles.layout}>
        <Flex.Item>
          <Highlight type='sub' size={12} lineHeight={13} value={filter}>
            {TEXTS.layout.text}
          </Highlight>
        </Flex.Item>
        <Touchable
          style={styles.touch}
          onPress={() => {
            confirm(
              '确定重置所有条目的布局?\n将清除每个条目单独调整的展开/收起/隐藏, 全部恢复为上面的默认值',
              () => {
                systemStore.resetSubjectLayout()
                subjectStore.resetLayout()
                feedback(true)
                setKey(key + 1)
                refreshLayoutStats()
              }
            )
          }}
        >
          <Text size={13} bold underline>
            重置所有条目
          </Text>
        </Touchable>
      </Flex>

      <View key={String(key)}>
        {(Object.keys(DATA) as (keyof typeof DATA)[]).map(item => {
          const title = DATA[item]

          // showEp / showComic 不是 Setting 的键, 不支持隐藏:
          // 读路径恒为 undefined; 写路径 setSetting 仍会把这两个非 schema 键写入 setting 并持久化 (历史行为)
          const value =
            item === 'showEp' || item === 'showComic' ? undefined : systemStore.setting[item]
          const selectedIndex = value === -1 ? 2 : value ? 0 : 1

          const customized = layoutStats[item as LayoutKey]

          return (
            <ItemSetting
              icon={<IconLayout />}
              key={item}
              hd={title}
              information={customized ? `${customized} 个条目已单独设置` : undefined}
              ft={
                item === 'showEp' || item === 'showComic' ? (
                  <Text
                    style={commonStyles.segmentedControl}
                    type='sub'
                    size={13}
                    lineHeight={20}
                    bold
                    align='center'
                  >
                    此版块不支持隐藏
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
      </View>
    </>
  )
}

export default observer(SubjectLayout)
