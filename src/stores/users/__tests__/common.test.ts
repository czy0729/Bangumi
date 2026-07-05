/*
 * @Author: czy0729
 * @Date: 2026-06-01
 */
import { cheerioUsers } from '../common'

function createStatsBlock(key: string, total: string, score10: string) {
  const counts = [total, `${Number(total) + 1}`, `${Number(total) + 2}%`, '7.00', '1.20', score10]

  return `
    <div id="userStats_${key}" class="userStatsBlock">
      <div class="gridStats">
        ${counts.map(item => `<div class="item"><span class="num">${item}</span></div>`).join('')}
      </div>
      <ul class="horizontalChart">
        ${[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
          .map(item => `<li><span class="count bar_${item}">(${item === 10 ? score10 : 0})</span></li>`)
          .join('')}
      </ul>
    </div>
  `
}

function createUsersHTML(statsHTML: string) {
  return `
    <div id="headerSearchWrapper"></div>
    <div class="inner"><small class="grey">@sai</small></div>
    <div class="headerAvatar"><span class="avatarNeue" style="background-image:url('//lain.bgm.tv/pic/user/l/000/00/00/1.jpg')"></span></div>
    <small class="hot">42</small>
    <div class="nameSingle"><span class="name"><a>测试用户</a></span></div>
    <span class="tip">2020-01-01 加入</span>
    <div class="timeline"><small class="time">刚刚</small></div>
    <div id="anime"><div class="horizontalOptions">1部想看 2部看过 3部在看 4部搁置 5部抛弃</div></div>
    ${statsHTML}
    <div id="footer"></div>
  `
}

describe('cheerioUsers', () => {
  it('解析全部条目类型的用户统计', () => {
    const users = cheerioUsers(
      createUsersHTML(
        ['all', '1', '2', '3', '4', '6']
          .map((key, index) => createStatsBlock(key, String((index + 1) * 10), String(index + 1)))
          .join('')
      )
    )

    expect(users.userStats.total).toBe('10')
    expect(users.userStatsMap.all.total).toBe('10')
    expect(users.userStatsMap['1'].total).toBe('20')
    expect(users.userStatsMap['2'].total).toBe('30')
    expect(users.userStatsMap['3'].total).toBe('40')
    expect(users.userStatsMap['4'].total).toBe('50')
    expect(users.userStatsMap['6'].total).toBe('60')
    expect(users.userStatsMap['6'].chart['10']).toBe('6')
  })

  it('具体统计类型缺失时返回空统计', () => {
    const users = cheerioUsers(createUsersHTML(createStatsBlock('all', '10', '1')))

    expect(users.userStatsMap.all.total).toBe('10')
    expect(users.userStatsMap['6'].total).toBe('')
    expect(users.userStatsMap['6'].chart['10']).toBe('')
  })

  it('旧版单统计块作为全部统计', () => {
    const users = cheerioUsers(
      createUsersHTML(`
        <div class="gridStats">
          <div class="item"><span class="num">7</span></div>
          <div class="item"><span class="num">8</span></div>
          <div class="item"><span class="num">9%</span></div>
          <div class="item"><span class="num">6.50</span></div>
          <div class="item"><span class="num">1.00</span></div>
          <div class="item"><span class="num">3</span></div>
        </div>
        <ul class="horizontalChart">
          <li><span class="count">(2)</span></li>
        </ul>
      `)
    )

    expect(users.userStats.total).toBe('7')
    expect(users.userStatsMap.all.total).toBe('7')
    expect(users.userStatsMap.all.chart['10']).toBe('2')
  })
})
