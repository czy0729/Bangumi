/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 14:30:45
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs } from '@components'
import { ManageModal } from '@screens/_'
import inject from '@utils/inject'
import _ from '@styles'
import Login from './login'
import List from './list'
import Store, { tabs } from './store'

class Home extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    if (!$.isLogin) {
      return <Login />
    }

    const { visible, subjectId, page, _loaded } = $.state
    if (!_loaded) {
      return null
    }

    const { name, name_cn: nameCn } = $.subject(subjectId)
    return (
      <View style={_.container.screen}>
        <Tabs tabs={tabs} initialPage={page} onChange={$.tabsChange}>
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
