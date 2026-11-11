/*
 * @Author: czy0729
 * @Date: 2026-11-11 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 00:00:00
 *
 * 章节标记参与过的讨论
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Flex, Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { IconChat } from '../../icons'
import { memoStyles } from './styles'

import type { WithFilterProps } from '../../../types'

/** 预览用的章节按钮 */
const PREVIEW = [1, 2, 3]

function HomeEpRepliedDot({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('epRepliedDot')

  const styles = memoStyles()

  const renderPreview = (withDot: boolean) =>
    PREVIEW.map((num, index) => (
      <View key={num} style={index ? _.ml.xs : undefined}>
        <Button type='ghostPlain' size='sm'>
          {num}
        </Button>
        {withDot && index < 2 && <View style={styles.dot} />}
      </View>
    ))

  return (
    <ItemSettingBlock icon={<IconChat />} filter={filter} {...TEXTS.homeEpRepliedDot}>
      <ItemSettingBlock.Item
        title='开启'
        active={value}
        filter={filter}
        onPress={() => {
          if (value) return

          handleSwitch()

          t('设置.切换', {
            title: '章节标记参与过的讨论',
            checked: !value
          })
        }}
      >
        <Flex style={_.mt.sm}>{renderPreview(true)}</Flex>
      </ItemSettingBlock.Item>
      <ItemSettingBlock.Item
        style={_.ml.md}
        title='关闭'
        active={!value}
        filter={filter}
        onPress={() => {
          if (!value) return

          handleSwitch()

          t('设置.切换', {
            title: '章节标记参与过的讨论',
            checked: !value
          })
        }}
      >
        <Flex style={_.mt.sm}>{renderPreview(false)}</Flex>
      </ItemSettingBlock.Item>
      <Heatmap id='设置.切换' title='章节标记参与过的讨论' />
    </ItemSettingBlock>
  )
}

export default observer(HomeEpRepliedDot)
