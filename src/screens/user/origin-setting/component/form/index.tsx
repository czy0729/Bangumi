/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 编辑与新建表单 (名字、网址、排序, 含参数快捷插入)
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Input, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import { PARAMS_KEY, PARAMS_TEXT, TEXT_PROPS } from './ds'
import { useForm } from './hooks'
import { memoStyles } from './styles'

import type { Params, Props } from './types'

function Form({ style, name, url, isBase = false, onScrollIntoViewIfNeeded }: Props) {
  const {
    urlInputRef,
    sortInputRef,
    selection,
    sortValue,
    handleChange,
    handleSelectionChange,
    handleInsert,
    handleSubmitEditing,
    submitEdit,
    closeEdit
  } = useForm()

  const styles = memoStyles()

  const editable = !isBase

  const renderLockTip = () =>
    !editable ? (
      <Text type='sub' {...TEXT_PROPS}>
        {'  '}
        默认项不允许修改
      </Text>
    ) : null

  const renderParams = (list: Params) => (
    <Flex style={styles.params} wrap='wrap'>
      {list.map(({ key, label, insert }) => (
        <Touchable key={key} style={_.mb.sm} onPress={() => handleInsert(key, insert)}>
          <Text style={_.mr.sm} type='sub' {...TEXT_PROPS}>
            <Text type={insert ? 'sub' : 'warning'} {...TEXT_PROPS} underline={insert}>
              {insert ? key : `[${key}]`}
            </Text>{' '}
            {label}
          </Text>
        </Touchable>
      ))}
    </Flex>
  )

  return (
    <Flex style={stl(styles.form, style)} align='end'>
      <Flex.Item>
        <Text size={13} bold>
          名字
          {renderLockTip()}
        </Text>
        <Input
          style={styles.input}
          defaultValue={String(name)}
          placeholder='菜单显示名称，唯一'
          keyboardType='default'
          autoCapitalize='none'
          autoCorrect={false}
          editable={editable}
          autoFocus={editable}
          returnKeyType='next'
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          onChangeText={handleChange('name')}
          onSubmitEditing={handleSubmitEditing('name')}
        />

        <Text style={_.mt.md} size={13} bold>
          网址
          {renderLockTip()}
        </Text>

        <Text style={_.mt.xs} type='sub' {...TEXT_PROPS}>
          支持参数 (下列选项可点击粘贴)：
        </Text>
        {renderParams(PARAMS_TEXT)}
        {renderParams(PARAMS_KEY)}

        <Input
          ref={urlInputRef}
          style={_.mt.sm}
          defaultValue={String(url)}
          selection={selection}
          multiline
          numberOfLines={4}
          textAlignVertical='top'
          placeholder='https://'
          keyboardType={IOS ? 'url' : 'default'}
          autoCapitalize='none'
          autoCorrect={false}
          editable={editable}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          onChangeText={handleChange('url')}
          onSelectionChange={handleSelectionChange}
        />

        <Text style={_.mt.md} size={13} bold>
          排序
        </Text>
        <Text style={_.mt.xs} type='sub' {...TEXT_PROPS}>
          数字，越大越前，选填
        </Text>
        <Input
          ref={sortInputRef}
          style={styles.input}
          value={sortValue}
          keyboardType='number-pad'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={!editable}
          returnKeyType='done'
          returnKeyLabel='更新'
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          onChangeText={handleChange('sort')}
          onSubmitEditing={handleSubmitEditing('sort')}
        />
      </Flex.Item>

      <IconTouchable
        style={_.ml.md}
        name='md-check'
        size={22}
        color={_.colorDesc}
        onPress={submitEdit}
      />
      <View style={styles.close}>
        <IconTouchable name='md-close' size={22} color={_.colorDesc} onPress={closeEdit} />
      </View>
    </Flex>
  )
}

export default observer(Form)
