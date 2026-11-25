/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-25 00:12:02
 *
 * 表情一览: 用原生字体渲染全部 BGM 表情, 便于比对字形与尺寸
 * 输入框: 各形态 (单行/多行/自定义样式/受控与非受控/清空按钮) 的现场对照
 */
import { useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  BgmText,
  Component,
  Flex,
  HeaderPlaceholder,
  HeaderV2,
  Input,
  Page,
  ScrollView,
  Text
} from '@components'
import { _ } from '@stores'
import { ITEMS, SIZE } from './ds'
import { memoStyles } from './styles'

import type { ReactNode } from 'react'

function Case({ label, value, children }: { label: string; value?: string; children: ReactNode }) {
  const styles = memoStyles()

  return (
    <View style={styles.case}>
      <Text style={styles.label} size={12} lineHeight={16} type='sub'>
        {label}
      </Text>
      {children}
      <Text style={_.mt.xs} size={11} lineHeight={14} type='sub' numberOfLines={1}>
        value: {value === '' ? '(空)' : value}
      </Text>
    </View>
  )
}

/** 输入框各形态 */
function InputCases() {
  const styles = memoStyles()
  const [basic, setBasic] = useState('')
  const [withoutClear, setWithoutClear] = useState('showClear 关闭')
  const [colorClear, setColorClear] = useState('自定义清空按钮颜色')
  const [styledInput, setStyledInput] = useState('自定义 inputStyle')
  const [styledContainer, setStyledContainer] = useState('自定义 style')
  const [multiline, setMultiline] = useState('多行输入\n清空按钮应对齐首行')
  const [multilineStyled, setMultilineStyled] = useState('')
  const [password, setPassword] = useState('')
  const [readonly] = useState('editable=false')
  /** 受控但父级不回写: 输入不生效, 用于观察清空按钮状态 */
  const [frozen] = useState('父级不回写 value')

  return (
    <View style={styles.section}>
      <Text style={styles.title} size={14} bold>
        Input
      </Text>

      <Case label='基础 + 清空' value={basic}>
        <Input value={basic} onChangeText={setBasic} showClear placeholder='请输入' />
      </Case>

      <Case label='showClear 关闭' value={withoutClear}>
        <Input value={withoutClear} onChangeText={setWithoutClear} placeholder='没有清空按钮' />
      </Case>

      <Case label='自定义清空按钮颜色' value={colorClear}>
        <Input value={colorClear} onChangeText={setColorClear} showClear colorClear={_.colorMain} />
      </Case>

      <Case label='自定义 inputStyle + 清空 (检查右侧留白)' value={styledInput}>
        <Input
          value={styledInput}
          onChangeText={setStyledInput}
          showClear
          inputStyle={styles.customInput}
        />
      </Case>

      <Case label='自定义 style (容器边框)' value={styledContainer}>
        <Input
          value={styledContainer}
          onChangeText={setStyledContainer}
          showClear
          style={styles.customContainer}
        />
      </Case>

      <Case label='多行 3 行 + 清空 (检查图标对齐首行)' value={multiline}>
        <Input
          value={multiline}
          onChangeText={setMultiline}
          showClear
          multiline
          numberOfLines={3}
        />
      </Case>

      <Case label='多行 + inputStyle + 清空' value={multilineStyled}>
        <Input
          value={multilineStyled}
          onChangeText={setMultilineStyled}
          showClear
          multiline
          numberOfLines={2}
          placeholder='多行样式'
          inputStyle={styles.customInput}
        />
      </Case>

      <Case label='密码框 + 清空' value={password}>
        <Input
          value={password}
          onChangeText={setPassword}
          showClear
          secureTextEntry
          placeholder='密码'
        />
      </Case>

      <Case label='editable=false (不可编辑, 清空按钮不应出现)' value={readonly}>
        <Input value={readonly} showClear editable={false} />
      </Case>

      <Case label='受控但父级不回写 (输入无效)' value={frozen}>
        <Input value={frozen} onChangeText={() => {}} showClear />
      </Case>

      <Case label='非受控 defaultValue (聚焦显示清空, 点击可清掉原生文本)'>
        <Input defaultValue='defaultValue 文本' showClear placeholder='非受控' />
      </Case>

      <Case label='autoFocus (进入页面即聚焦)' value=''>
        <Input autoFocus placeholder='自动聚焦' showClear />
      </Case>
    </View>
  )
}

/** 表情一览 */
function Playground() {
  const styles = memoStyles()

  return (
    <Component id='screen-playground'>
      <Page>
        <HeaderPlaceholder />
        <ScrollView
          style={_.container.wind}
          contentContainerStyle={_.container.bottom}
          keyboardShouldPersistTaps='handled'
        >
          <InputCases />
          <Text style={styles.title} size={14} bold>
            BGM 表情
          </Text>
          <Flex wrap='wrap'>
            {ITEMS.map(({ index, size }) => (
              <View key={index} style={styles.item}>
                <Text size={12} lineHeight={20} bold align='center'>
                  {index}
                </Text>
                <View style={size === SIZE.large ? styles.iconLarge : styles.icon}>
                  <BgmText index={index} size={size} />
                </View>
              </View>
            ))}
          </Flex>
        </ScrollView>
      </Page>
      <HeaderV2 title='Playground' />
    </Component>
  )
}

export default observer(Playground)
