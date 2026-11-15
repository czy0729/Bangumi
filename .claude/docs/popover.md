# Popover 三端实现与 Android 系统菜单增强

## 三端渲染链路

| 端 | 入口 | 渲染层 | 能力 |
| --- | --- | --- | --- |
| iOS | `index.tsx` | `HoldItem` → 自研 `hold-menu` | 文字颜色、右侧图标、选中勾、标题项、长按/点击激活 |
| Android | `index.android.tsx` | `PopMenuModule`（系统 `ListPopupWindow`，即 PopupMenu 内部容器） | 文字颜色、选中勾（行末素色勾）、标题项（置灰不可点）、深浅主题 |
| Web | `index.web.tsx` | `rc-dropdown` + `components/menu` | 纯文本 |

`types.ts` 的 `PopoverItem` 是三端统一的数据契约：`text / icon / checked / type / color`。
`utils.ts` 的 `toMenuEntries(data, value, title)` 是 **iOS / Android 共用的派生层**（Web 未接入，它仍是纯文本列表且自带文案去重语义）：查 `MENU_ICONS`（受 `MENU_ICONS_ENABLED` 控制）与 `MENU_TYPES`、由 `value` 推导 `checked`、置顶标题项。它输出 `PopoverMenuEntry`，其中 `raw` 与 `index` 始终对应原始 `data`，标题项 `index = -1`，避免选中回调索引错位。

文字色优先级（iOS `hold-menu/menu/menu-item/index.tsx` 与 Android `android/index.ts` 一致）：

```
isTitle → 原生 disabled 置灰
item.color → 显式色
item.type → getTextStyle({type}) 反查语义色
默认 → 跟随系统菜单主题色（不传色值）
```

`checked` 优先于 `item.icon` 渲染勾；Android 在行末渲染素色勾（54% 黑/白，不用主题
accent 色），与文字留 12dp 间距，各行右对齐。`icon` 字段安卓不渲染。

## Android 为什么用 ListPopupWindow

RN 0.72.10 的 `NativeViewHierarchyManager.showPopupMenu` 只做
`menu.add(Menu.NONE, Menu.NONE, i, items.getString(i))`，`PopupMenu` 实例是 private
字段，外界拿不到 `MenuItem`，无法上色 / 勾选。

系统的 `android.widget.PopupMenu` 公开能力里也没有**行末右侧**标记位（勾选位与图标位
都在左侧，`ListMenuItemView` 不支持 action view），而勾要右对齐只能控制行视图。所以
`PopMenuModule` 用 `android.widget.ListPopupWindow`——**PopupMenu 内部用的正是它**，
弹窗背景、阴影、锚点定位、动画、滚动、返回键与点外关闭全部系统渲染——行视图按需极简
构建（水平 `LinearLayout`：文字 + 右侧勾）：

- 文字颜色：行内 TextView 直接 `setTextColor`（不再需要 SpannableString）
- 选中勾：行末 `ImageView`（`ic_popmenu_check_light|dark`），仅选中行显示
- 标题项：置灰 + `isEnabled(false)`（无按压反馈、不响应点击）
- 深浅主题：JS 传 `dark`，`ContextThemeWrapper` 包框架 `Theme.Material(_Light)`；
  Activity 主题是 `Theme.AppCompat.DayNight`（跟随系统），包一层保证菜单跟随 App 内设置
- 宽度：用主题 TextView 自身的 paint 测量（字体与用户字体缩放一致），按最长文案 +
  行内边距 + 勾列计算，且不小于**系统 `popup_menu_item_layout` 的 `minWidth = 196dp`**
  （短文案菜单不会被挤窄），超屏夹取，行内省略号兜底

没有自绘弹窗容器（背景 / 阴影 / 定位逻辑），不要往那个方向加。

## Android 原生模块契约

原生侧文件：

- `android/app/src/main/java/com/czy0729/bangumi/popmenu/PopMenuModule.java`
- `android/app/src/main/java/com/czy0729/bangumi/popmenu/PopMenuPackage.java`
- `res/drawable/ic_popmenu_check_light|dark.xml`（素色勾向量图，54% 黑/白）
- 注册点：`MainApplication.java` 的 `getPackages()`

JS 侧：`src/components/popover/android/index.ts`（仅限 .android 入口引用），导出 `showAndroidPopMenu()`（命令式）与
`usePopoverPress()`（Popover 组件用）。另一处直接调用在
`src/screens/discovery/pic/component/item/main/index.android.tsx`，已统一走这个入口。

`NativeModules.PopMenuModule.show` 参数：

```
(anchorTag, dark, items, onSelect)
```

- `anchorTag` 为锚点 View 的 reactTag（`findNodeHandle`），原生在 UI 线程用
  `UIManagerModule.resolveView(tag)` 取回 View 作为弹窗锚点
- `items`：`{ text, color?, checked, isTitle, index }[]`，`color` 为**带符号** 32 位
  ARGB 整数，缺省表示跟随主题
- `onSelect(index)` 回传原始数据下标（adapter 的 itemId）；取消（点外部 / 返回键）
  不回调

颜色由 `android/index.ts` 的 `parseArgb()` 自己解析（支持 hex / 缩写 hex / `rgb()` / `rgba()` /
常用命名色），**不依赖 RN 的 `processColor`**：两端 RN 版本不同（iOS 0.88 / Android 0.72），
顶层导出在部分环境缺失。前景色解析失败（如 `hsl()`、未知命名色）时 JS 侧**不传 `color`**
（跟随主题），不做黑色兜底。

健壮性约定：

- `show()` 在 bridge 调用线程把 `ReadableArray` 拷成基础类型（内部 `Rows`）后才切 UI
  线程，不跨线程消费 bridge 对象
- UI 线程展示前重查 `isFinishing() / isDestroyed()`，`show()` 包 try/catch——检查与展示
  之间宿主窗口仍可能失效（`BadTokenException`），不能让它崩掉 App
- 模块实现 `LifecycleEventListener`：`onHostPause` / `onHostDestroy` / `invalidate()`
  （RN 0.72 替代已废弃的 `onCatalystInstanceDestroy`）都会收起菜单，避免 `WindowLeaked`
  与旧 Activity 引用
- `color` 缺省用 `hasColors` 布尔区分（`0` 是合法的 transparent，不能当哨兵）
- 早退分支（无 Activity / 空数据 / 锚点失效）同样会收起已打开的菜单

> **桥接陷阱（P0）**：`parseArgb()` 必须返回**带符号** 32 位整数（`| 0`），不能返回 `>>> 0`
> 的无符号值。RN 桥把 number 传成 `double`，而 Java 的 `(int) double` 是 JLS 5.1.3
> **饱和转换**（`4286611584.0 → 2147483647`），不是按位截断；无符号的不透明色会被钳成
> 半透明白，导致白底白字。原生侧另用 `(int)(long) getDouble()` 两步窄化做兜底。
> `android.test.ts` 的「桥接契约」用例固化了这条约束。

生命周期：点外部 / 返回键关闭时 `OnDismissListener` 把 `popup` 置 null（比对实例，避免旧
菜单异步 dismiss 误清新菜单），释放 `ListPopupWindow` 与 Activity 引用；点击回调加
`popup == null` 守卫，防止快速双击导致 RN `Callback` 二次 `invoke()` 抛异常。

## 降级与兼容

- 老 APK 未打包 `PopMenuModule` 时，`showAndroidPopMenu` 回退 `UIManager.showPopupMenu`，
  只显示纯文本（无字色与勾）；标题拼为首行（系统菜单无法置灰，点它不触发回调），
  选中下标会映射回原始数据
- 两者都缺失时 `globalWarn` 告警一次，不抛错
- `title / value` 现在在安卓生效：会多出置顶标题项（置灰不可点）、命中项行末素色勾
- 操作型菜单的 `md-*` 图标（非勾）不由原生渲染；`MENU_ICONS_ENABLED` 当前为 `false`，
  若以后打开，把图标资源一并传给原生（行内 `ImageView` 一列即可）

## 改动与验证

- 改动只留工作区，禁止改 `*.lock`、禁止 `yarn install` / `pod install` / gradle sync
- 新增原生代码必须**重新编译 APK** 才能生效，不能走 OTA
- 单测：`android.test.ts`（原生契约、颜色、降级、**桥接契约**）、`utils.test.ts`（派生归一化）、
  `entries.test.ts`（查表与勾选派生，用 `jest.doMock` 复刻 `hooks.menu.test.ts` 的时机）、
  `hooks.test.ts` / `hooks.menu.test.ts`（hook 激活方式）
  - `hooks.test.ts` / `hooks.menu.test.ts` 依赖 `react-test-renderer`，当前 iOS 环境未安装该包，
    需自行补齐依赖后优先回归；其余三个不依赖它，可直接跑
  - `jest/mocks/react-native.js` 的 `findNodeHandle` 固定返回 1，锚点 tag 断言依赖它；
    `jest/setup.js` 的 `@stores` mock 补了 `_.isDark`（默认浅色）
- 真机回归重点：深浅主题（跟随 App 设置而非系统）、长菜单滚动、锚点在屏幕边缘时的
  系统定位、简繁转换、标题项与选中项、返回键与外部点击关闭、老 APK 降级路径
