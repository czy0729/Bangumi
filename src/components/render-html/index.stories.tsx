/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:03:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:09:07
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { RenderHtml, RenderHtmlProps } from './index'

export default {
  title: 'components/RenderHtml',
  component: RenderHtml
}

export const Component = (args: RenderHtmlProps) => (
  <StorybookPage>
    <StorybookList>
      <RenderHtml {...args} />
    </StorybookList>
  </StorybookPage>
)

Component.args = {
  html: `<div id="bangumiInfo">
  <div class="infobox">
  <div align="center">
  <a href="//lain.bgm.tv/pic/cover/l/58/c1/376703_g5559.jpg" title="アイドルマスター シンデレラガールズ U149 偶像大师 灰姑娘女孩 U149" alt="アイドルマスター シンデレラガールズ U149 偶像大师 灰姑娘女孩 U149" class="thickbox cover"><img src="//lain.bgm.tv/r/400/pic/cover/l/58/c1/376703_g5559.jpg" width="210" class="cover"></a>
  </div>
  <ul id="infobox">
  <li><span class="tip">中文名: </span>偶像大师 灰姑娘女孩 U149</li>
  <li><span class="tip">话数: </span>12</li>
  <li><span class="tip">放送开始: </span>2023年4月5日</li>
  <li><span class="tip">放送星期: </span>星期三</li>
  <li><span class="tip">原作: </span><a href="/person/3502" class="l" title="万代南梦宫娱乐">バンダイナムコエンターテインメント</a></li>
  <li><span class="tip">导演: </span><a href="/person/16005" class="l" title="冈本学" rel="v:directedBy">岡本学</a></li>
  <li><span class="tip">脚本: </span><a href="/person/49466" class="l" title="村山冲">村山沖</a></li>
  <li><span class="tip">分镜: </span><a href="/person/33697" class="l" title="高岛宏之">高嶋宏之</a>、<a href="/person/16005" class="l" title="冈本学">岡本学</a></li>
  <li><span class="tip">演出: </span><a href="/person/43492" class="l" title="片冈史旭">片岡史旭</a>、<a href="/person/33697" class="l" title="高岛宏之">高嶋宏之</a></li>
   <li><span class="tip">音乐: </span><a href="/person/9557" class="l" title="宫崎诚">宮崎誠</a></li>
  <li><span class="tip">人物设定: </span><a href="/person/36858" class="l" title="井川典惠">井川典恵</a></li>
  <li><span class="tip">系列构成: </span><a href="/person/49466" class="l" title="村山冲">村山沖</a></li>
  <li><span class="tip">美术监督: </span><a href="/person/22660" class="l">井上一宏</a></li>
  <li><span class="tip">色彩设计: </span><a href="/person/28046" class="l" title="土居真纪子">土居真紀子</a></li>
  <li><span class="tip">总作画监督: </span><a href="/person/36858" class="l" title="井川典惠">井川典恵</a></li>
  <li><span class="tip">作画监督: </span><a href="/person/49792" class="l">槙田路子</a>、<a href="/person/43384" class="l">高妻匠</a>、<a href="/person/36858" class="l" title="井川典惠">井川典恵</a>、<a href="/person/41229" class="l" title="须川康太">須川康太</a>、<a href="/person/36759" class="l" title="佐佐木洋也">佐々木洋也</a></li>
  <li><span class="tip">摄影监督: </span><a href="/person/2344" class="l" title="关谷能弘">関谷能弘</a>；辅佐：三好眞樹雄</li>
  <li><span class="tip">原画: </span><a href="/person/48784" class="l" title="爱甲剑士">愛甲剣士</a>、<a href="/person/47173" class="l">Niii</a>、<a href="/person/43005" class="l" title="小田崎惠子">小田崎恵子</a>、<a href="/person/50376" class="l" title="力德钦也">力徳欽也</a>、<a href="/person/47103" class="l">大久保洸太郎</a>、<a href="/person/42749" class="l">榊原大河</a>、<a href="/person/33697" class="l" title="高岛宏之">高嶋宏之</a>、<a href="/person/44474" class="l">綾きらら</a>、<a href="/person/42960" class="l" title="伊藤史华">伊藤史華</a>、<a href="/person/37498" class="l">李明振</a>、<a href="/person/43426" class="l" title="藤原优花">藤原優花</a>、<a href="/person/42831" class="l" title="有间凉太">有間涼太</a>、<a href="/person/37072" class="l" title="特码头">TOMATO</a>、<a href="/person/11346" class="l" title="三宫昌太">三宮昌太</a>、<a href="/person/41229" class="l" title="须川康太">須川康太</a>、<a href="/person/43284" class="l" title="诸富直也">諸冨直也</a>、<a href="/person/38569" class="l">渡部尭皓</a>、<a href="/person/43417" class="l" title="拉鲁鲁">らるる</a>、<a href="/person/42270" class="l">相音光</a>、<a href="/person/48798" class="l" title="井口圣">井口聖</a>、<a href="/person/28135" class="l">佐藤弘明</a>、<a href="/person/42269" class="l">野田猛</a>、<a href="/person/43077" class="l" title="渊本宗平">淵本宗平</a>、<a href="/person/53144" class="l">saitou</a></li>
  <li><span class="tip">第二原画: </span><a href="/person/42900" class="l">上田彩加</a>、<a href="/person/15017" class="l" title="松本元气">松本元気</a>、<a href="/person/37021" class="l" title="塚本茜">塚本あかね</a>、<a href="/person/50765" class="l">佐藤悠己</a>、<a href="/person/48799" class="l" title="蔡泓铿">蔡泓鏗</a>、<a href="/person/46911" class="l" title="大槻知惠">大槻ちえ</a>、<a href="/person/49382" class="l" title="村田骏">村田駿</a></li>
  <li><span class="tip">助理制片人: </span>武井由香、浅野由理奈、伊香賀進、<a href="/person/42754" class="l">近藤成一</a>；副制片人：狭間和歌子</li>
  <li><span class="tip">背景美术: </span>概念美术：<a href="/person/39110" class="l" title="大久保锦一">大久保錦一</a>；</li>
   <li><span class="tip">剪辑: </span><a href="/person/12064" class="l" title="三岛章纪">三嶋章紀</a></li>
  <li><span class="tip">原案: </span>「アイドルマスター シンデレラガールズ U149」<a href="/person/28838" class="l">廾之</a>（サイコミ連載）</li>
  <li><span class="tip">主题歌编曲: </span>Sizuk(<a href="/person/9070" class="l" title="俊龙">俊龍</a>)（OP）</li>
  <li><span class="tip">主题歌作曲: </span><a href="/person/9070" class="l" title="俊龙">俊龍</a>（OP）</li>
  <li><span class="tip">主题歌演出: </span>U149 [橘ありす（CV：<a href="/person/7075" class="l" title="佐藤亚美菜">佐藤亜美菜</a>）、櫻井桃華（CV：<a href="/person/13177" class="l">照井春佳</a>）、赤城みりあ（CV：<a href="/person/9560" class="l" title="黑泽朋世">黒沢ともよ</a>）、的場梨沙（CV：<a href="/person/35512" class="l" title="集贝花">集貝はな</a>）、結城晴（CV：<a href="/person/20631" class="l" title="小市真琴">小市眞琴</a>）、 佐々木千枝（CV：<a href="/person/15780" class="l">今井麻夏</a>）、龍崎薫（CV：<a href="/person/19808" class="l" title="春濑夏美">春瀬なつみ</a>）、市原仁奈（CV：<a href="/person/11523" class="l">久野美咲</a>）、古賀小春（CV：<a href="/person/53122" class="l" title="小森结梨">小森結梨</a>）]（OP）</li>
  <li><span class="tip">企画: </span><a href="/person/53161" class="l">藤原孝史</a>、<a href="/person/43075" class="l" title="渡边耕一">渡邊耕一</a>、<a href="/person/42751" class="l" title="北条真">北條真</a>；企画协力：波多野公士</li>
  <li><span class="tip">制作管理: </span><a href="/person/42754" class="l">近藤成一</a></li>
  <li><span class="tip">製作: </span>PROJECT U149（<a href="/person/3502" class="l" title="万代南梦宫娱乐">バンダイナムコエンターテインメント</a>、<a href="/person/24925" class="l" title="Cy游戏">Cygames</a>、<a href="/person/228" class="l" title="日本哥伦比亚">日本コロムビア</a>）</li>
  <li><span class="tip">设定: </span><a href="/person/42269" class="l">野田猛</a>、<a href="/person/43005" class="l" title="小田崎惠子">小田崎恵子</a>、<a href="/person/52899" class="l" title="中村伦子">中村倫子</a>、<a href="/person/38569" class="l">渡部尭皓</a>、<a href="/person/49792" class="l">槙田路子</a></li>
  <li><span class="tip">音响监督: </span><a href="/person/16005" class="l" title="冈本学">岡本学</a></li>
  <li><span class="tip">音响: </span><a href="/person/43769" class="l">dugout</a></li>
  <li><span class="tip">音效: </span><a href="/person/21457" class="l" title="仓桥裕宗">倉橋裕宗</a></li>
  <li><span class="tip">特效: </span><a href="/person/52482" class="l">福田直征</a></li>
  <li><span class="tip">执行制片人: </span><a href="/person/53163" class="l">田中快</a>、<a href="/person/44483" class="l" title="竹中信广">竹中信広</a>、<a href="/person/53165" class="l">柏谷智浩</a></li>
  <li><span class="tip">制片人: </span>川口崚太、冨田功一郎、秋田穣、<a href="/person/53165" class="l">柏谷智浩</a>；动画制片人：<a href="/person/38758" class="l">上内健太</a></li>
  <li><span class="tip">音乐制作: </span><a href="/person/228" class="l" title="日本哥伦比亚">日本コロムビア</a></li>
  <li><span class="tip">动画制作: </span><a href="/person/22716" class="l">CygamesPictures</a></li>
  <li><span class="tip">CG 导演: </span><a href="/person/49454" class="l" title="石川宽贡">石川寛貢</a>、<a href="/person/49455" class="l">榊正宗</a>、<a href="/person/52898" class="l">神谷宣幸</a></li>
  <li><span class="tip">美术设计: </span><a href="/person/24807" class="l" title="高桥武之">高橋武之</a>、<a href="/person/18909" class="l" title="曾野由大">曽野由大</a>、<a href="/person/28890" class="l">金平和茂</a></li>
  <li><span class="tip">副导演: </span><a href="/person/33697" class="l" title="高岛宏之">高嶋宏之</a></li>
  <li><span class="tip">OP・ED 分镜: </span>寺本将梧（ED）、<a href="/person/38457" class="l">寺本将悟</a></li>
  <li><span class="tip">别名: </span>The Idolmaster: Cinderella Girls - U149</li>
  <li><span class="tip" style="visibility:hidden;">别名: </span>THE IDOLM@STER CINDERELLA GIRLS U149</li>
  <li><span class="tip">官方网站: </span>https://cinderella-u149-anime.idolmaster-official.jp/</li>
  <li><span class="tip">播放电视台: </span>テレビ東京</li>
  <li><span class="tip">其他电视台: </span>BS11</li>
  <li><span class="tip">Copyright: </span>©Bandai Namco Entertainment Inc. / PROJECT U149</li>
  <li><span class="tip">主题歌作词: </span>Mahiro（OP）</li>
  <li><span class="tip">音乐制作人: </span>柏谷智浩</li>
  <li><span class="tip">监修: </span>企画监修：本田良寛</li>
  </ul>
  <div class="modifyTool">
  <span class="tip_i">
  <p><span class="tip">修改：</span><a href="/subject/376703/edit" class="l">信息</a> / <a href="/subject/376703/upload_img" class="l">封面</a></p>
  <p><span class="tip">关联：</span><a href="/subject/376703/add_related/character" class="l">角色</a> / <a href="/subject/376703/add_related/person" class="l">制作人员</a> / <a href="/subject/376703/add_related/subject" class="l">条目</a></p>
  </span>
  </div>
  </div>
  </div>`
}
