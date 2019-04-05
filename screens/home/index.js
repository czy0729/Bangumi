/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-05 21:50:44
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import Tabs from '@components/@ant-design/tabs'
import { ManageModal } from '@screens/_'
import inject from '@utils/inject'
import _, { window, colorMain, colorPlain, colorBg, radiusSm } from '@styles'
import Login from './login'
import List from './list'
import Store, { tabs } from './store'

class Home extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.mounted()
  }

  render() {
    const { $ } = this.context
    if (!$.isLogin) {
      return <Login />
    }

    const { loading } = $.state
    if (loading) {
      return <Loading />
    }

    const { visible, subjectId, page } = $.state
    const { name, name_cn: nameCn } = $.getSubject(subjectId)
    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: colorBg
          }
        ]}
      >
        <Tabs
          tabs={tabs}
          initialPage={page}
          tabBarBackgroundColor={colorPlain}
          tabBarUnderlineStyle={styles.tabBarUnderline}
          prerenderingSiblingsNumber={0}
          onChange={$.tabsChange}
        >
          <List />
          <List title='动画' />
          <List title='书籍' />
          <List title='三次元' />
        </Tabs>
        <ManageModal
          visible={visible}
          subjectId={subjectId}
          title={nameCn || name}
          desc={name}
          onSubmit={$.doUpdateCollection}
          onClose={$.closeManageModal}
        />
      </View>
    )
  }
}

export default inject(Store)(observer(Home))

const tabWidth = window.width / 4
const lineWidth = 56
const styles = StyleSheet.create({
  tabBarUnderline: {
    width: lineWidth,
    marginLeft: (tabWidth - lineWidth) / 2,
    backgroundColor: colorMain,
    borderRadius: radiusSm
  }
})
