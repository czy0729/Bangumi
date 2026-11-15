package com.czy0729.bangumi.popmenu;

import android.app.Activity;
import android.content.Context;
import android.content.res.ColorStateList;
import android.content.res.TypedArray;
import android.graphics.Paint;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.ContextThemeWrapper;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListPopupWindow;
import android.widget.TextView;

import androidx.annotation.NonNull;

import com.czy0729.bangumi.R;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.uimanager.UIManagerModule;

/**
 * 增强版系统菜单: ListPopupWindow (PopupMenu 内部用的就是它, 弹窗背景 / 阴影 / 锚点定位 /
 * 动画 / 滚动 / 返回键与点外关闭全部系统渲染), 行视图按需极简构建, 补齐 RN 未暴露的能力:
 *  - 行末素色勾: 勾列固定右对齐, 与文字留有间距, 灰度不随主题 accent
 *  - 文字颜色: 行内 TextView 直接 setTextColor
 *  - 标题项: 置灰 + isEnabled false (不响应点击)
 *  - 深浅主题: JS 传 dark, 用框架 Material 亮暗主题包装 context; 原生不感知项目语义色
 */
public class PopMenuModule extends ReactContextBaseJavaModule
    implements LifecycleEventListener {
  private static final String NAME = "PopMenuModule";

  private static final float ROW_HEIGHT_DIP = 48f;
  private static final float ROW_PADDING_H_DIP = 16f;
  private static final float TEXT_SIZE_SP = 16f;
  private static final float CHECK_SIZE_DIP = 18f;
  private static final float CHECK_GAP_DIP = 12f;
  private static final float SCREEN_MARGIN_DIP = 16f;
  /** 与系统 popup_menu_item_layout 的 minWidth 一致, 短文案菜单不会被挤窄 */
  private static final float MIN_WIDTH_DIP = 196f;
  /** 标题与勾的素色: 54% 黑 / 54% 白, 不用主题 accent */
  private static final int GREY_LIGHT = 0x8A000000;
  private static final int GREY_DARK = 0x8AFFFFFF;

  private ListPopupWindow popup;

  public PopMenuModule(ReactApplicationContext context) {
    super(context);
  }

  @NonNull
  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public void initialize() {
    super.initialize();
    getReactApplicationContext().addLifecycleEventListener(this);
  }

  /** RN 0.72 中替代 onCatalystInstanceDestroy */
  @Override
  public void invalidate() {
    getReactApplicationContext().removeLifecycleEventListener(this);
    UiThreadUtil.runOnUiThread(this::dismiss);
  }

  /** 退后台 / 宿主销毁时收起, 避免 WindowLeaked 与旧 Activity 引用 */
  @Override
  public void onHostResume() {}

  @Override
  public void onHostPause() {
    UiThreadUtil.runOnUiThread(this::dismiss);
  }

  @Override
  public void onHostDestroy() {
    UiThreadUtil.runOnUiThread(this::dismiss);
  }

  /**
   * 弹出系统菜单
   *  - anchorTag 为锚点 View 的 reactTag (findNodeHandle), 定位由系统完成
   *  - items 的结构见 src/components/popover/types.ts; index 为原始数据下标
   *  - 取消时不回调, 选中时回传原始数据下标
   */
  @ReactMethod
  public void show(int anchorTag, boolean dark, ReadableArray items, final Callback onSelect) {
    final Activity activity = getCurrentActivity();

    // 早退也要收起上一次的菜单, 避免旧菜单悬着关不掉
    if (activity == null || activity.isFinishing() || items == null || items.size() == 0) {
      UiThreadUtil.runOnUiThread(this::dismiss);
      return;
    }

    // bridge 参数 (ReadableArray) 只在调用线程消费, 拷成基础类型后再切 UI 线程
    Rows rows = buildRows(items);
    UiThreadUtil.runOnUiThread(() -> showOnUiThread(activity, anchorTag, dark, rows, onSelect));
  }

  /** 在调用线程把 bridge 参数拷成基础类型; 颜色缺省用 hasColors 区分 (0 是合法的 transparent) */
  private Rows buildRows(ReadableArray items) {
    int size = items.size();
    Rows rows = new Rows(size);

    for (int i = 0; i < size; i++) {
      ReadableMap item = items.getMap(i);
      if (item == null) continue;

      rows.titles[i] = item.hasKey("isTitle") && item.getBoolean("isTitle");
      rows.texts[i] = item.hasKey("text") && !item.isNull("text") ? item.getString("text") : "";
      rows.checkeds[i] = !rows.titles[i] && item.hasKey("checked") && !item.isNull("checked")
          && item.getBoolean("checked");
      rows.indexes[i] = item.hasKey("index") && !item.isNull("index") ? item.getInt("index") : i;
      rows.hasColors[i] = item.hasKey("color") && !item.isNull("color");
      if (rows.hasColors[i]) {
        // JS 侧 parseArgb() 返回带符号 32 位 ARGB, 但 RN 桥把 number 传成 double。
        // 必须 (int)(long) 两步: JLS 5.1.3 的 double→int 是饱和转换 (无符号值 0xff808080
        // 会被钳成 Integer.MAX_VALUE), 先转 long 再窄化为 int 才是按位截断。
        // 两端都按带符号值传递后, 这一步只是防御 JS 侧误传无符号值的兜底。
        rows.colors[i] = (int) (long) item.getDouble("color");
      }
    }
    return rows;
  }

  private void showOnUiThread(
      Activity activity,
      int anchorTag,
      boolean dark,
      Rows rows,
      Callback onSelect) {
    dismiss();

    // show() 与真正展示之间 Activity 可能被 finish (返回 / 旋转 / 切主题)
    if (activity.isFinishing() || activity.isDestroyed()) return;

    // resolveView 要求 UI 线程调用; 锚点已卸载或 tag 失效时静默返回
    View anchor = null;
    UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
    if (uiManager != null) {
      anchor = uiManager.resolveView(anchorTag);
    }
    if (anchor == null) return;

    // 弹窗按 context 主题渲染; Activity 是 AppCompat DayNight, 深浅会跟随系统设置,
    // 这里按 App 内深浅设置用框架 Material 主题包装, 保证菜单跟随 App
    Context themed = new ContextThemeWrapper(
        activity, dark ? android.R.style.Theme_Material : android.R.style.Theme_Material_Light);

    // 行宽用主题 TextView 自身的 paint 测量 (字体与用户字体缩放一致)
    TextView measuring = new TextView(themed);
    measuring.setTextSize(TypedValue.COMPLEX_UNIT_SP, TEXT_SIZE_SP);
    Paint paint = measuring.getPaint();

    float maxTextWidth = 0;
    boolean hasChecked = false;
    for (int i = 0; i < rows.texts.length; i++) {
      maxTextWidth = Math.max(maxTextWidth, paint.measureText(rows.texts[i].toString()));
      if (rows.checkeds[i]) hasChecked = true;
    }

    // 内容宽度 = max(最长文案 + 行内边距 + (有勾时) 勾列, 系统 196dp 最小值);
    // 超出屏幕留边距则夹取, 行内省略号兜底
    float density = activity.getResources().getDisplayMetrics().density;
    int padH = Math.round(ROW_PADDING_H_DIP * density);
    int checkColumn = hasChecked ? Math.round((CHECK_GAP_DIP + CHECK_SIZE_DIP) * density) : 0;
    int contentWidth = Math.round(maxTextWidth) + padH * 2 + checkColumn;
    contentWidth = Math.max(contentWidth, Math.round(MIN_WIDTH_DIP * density));
    int maxContentWidth = Math.round(
        (activity.getResources().getDisplayMetrics().widthPixels - SCREEN_MARGIN_DIP * 2 * density));
    contentWidth = Math.min(contentWidth, maxContentWidth);

    ListPopupWindow newPopup = new ListPopupWindow(themed);
    newPopup.setAnchorView(anchor);
    newPopup.setAdapter(new RowAdapter(themed, rows, dark));
    newPopup.setWidth(contentWidth);
    newPopup.setModal(true);
    // 快速双击 / 菜单已被返回键关掉时不再回调: RN Callback 二次 invoke 会抛异常;
    // itemId 存原始数据下标, 标题行为 -1 不响应
    newPopup.setOnItemClickListener((parent, view, position, id) -> {
      if (popup == null || id < 0) return;
      dismiss();
      if (onSelect != null) onSelect.invoke((int) id);
    });
    // 点外部 / 返回键关闭时释放引用, 避免模块长期持有 PopupWindow 与 Activity;
    // 比对实例可防止旧菜单的异步 dismiss 误清新菜单
    newPopup.setOnDismissListener(() -> {
      if (popup == newPopup) popup = null;
    });

    popup = newPopup;
    try {
      newPopup.show();
    } catch (RuntimeException e) {
      // 展示瞬间宿主窗口仍可能失效 (BadTokenException 等), 收起引用, 不让菜单崩溃 App
      popup = null;
    }
  }

  private void dismiss() {
    if (popup != null) {
      popup.dismiss();
      popup = null;
    }
  }

  private static int grey(boolean dark) {
    return dark ? GREY_DARK : GREY_LIGHT;
  }

  /** 拷贝后的菜单数据, 与 bridge 对象解耦, 可安全跨线程使用 */
  private static final class Rows {
    final CharSequence[] texts;
    final int[] colors;
    final boolean[] hasColors;
    final int[] indexes;
    final boolean[] checkeds;
    final boolean[] titles;

    Rows(int size) {
      texts = new CharSequence[size];
      colors = new int[size];
      hasColors = new boolean[size];
      indexes = new int[size];
      checkeds = new boolean[size];
      titles = new boolean[size];
    }
  }

  /** 行视图适配器: 左侧文字 (显式色或主题默认), 右侧素色勾 (仅选中行显示) */
  private static final class RowAdapter extends BaseAdapter {
    private final Context context;
    private final Rows rows;
    private final boolean dark;
    private final int defaultTextColor;
    private final int rowHeight;
    private final int padH;
    private final int checkSize;
    private final int checkGap;

    RowAdapter(Context context, Rows rows, boolean dark) {
      this.context = context;
      this.rows = rows;
      this.dark = dark;
      // 一次性解析主题默认字色 (textColorPrimary), 复用行时颜色可正确重置
      TypedArray ta = context.obtainStyledAttributes(new int[] {android.R.attr.textColorPrimary});
      ColorStateList list = ta.getColorStateList(0);
      ta.recycle();
      this.defaultTextColor = list != null ? list.getDefaultColor() : grey(dark);

      float density = context.getResources().getDisplayMetrics().density;
      this.rowHeight = Math.round(ROW_HEIGHT_DIP * density);
      this.padH = Math.round(ROW_PADDING_H_DIP * density);
      this.checkSize = Math.round(CHECK_SIZE_DIP * density);
      this.checkGap = Math.round(CHECK_GAP_DIP * density);
    }

    @Override
    public int getCount() {
      return rows.texts.length;
    }

    @Override
    public Object getItem(int position) {
      return rows.texts[position];
    }

    @Override
    public long getItemId(int position) {
      return rows.indexes[position];
    }

    /** 标题行禁用: 无按压反馈, 也不响应 onItemClick */
    @Override
    public boolean isEnabled(int position) {
      return !rows.titles[position];
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
      LinearLayout row;
      TextView text;
      ImageView check;

      if (convertView instanceof LinearLayout) {
        row = (LinearLayout) convertView;
        text = (TextView) row.getChildAt(0);
        check = (ImageView) row.getChildAt(1);
      } else {
        row = new LinearLayout(context);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setMinimumHeight(rowHeight);
        row.setPadding(padH, 0, padH, 0);

        text = new TextView(context);
        text.setTextSize(TypedValue.COMPLEX_UNIT_SP, TEXT_SIZE_SP);
        text.setSingleLine(true);
        text.setEllipsize(TextUtils.TruncateAt.END);
        row.addView(text, new LinearLayout.LayoutParams(
            0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));

        check = new ImageView(context);
        check.setImageResource(
            dark ? R.drawable.ic_popmenu_check_dark : R.drawable.ic_popmenu_check_light);
        LinearLayout.LayoutParams checkParams =
            new LinearLayout.LayoutParams(checkSize, checkSize);
        checkParams.leftMargin = checkGap;
        row.addView(check, checkParams);
      }

      text.setText(rows.texts[position]);
      if (rows.titles[position]) {
        text.setTextColor(grey(dark));
      } else {
        text.setTextColor(rows.hasColors[position] ? rows.colors[position] : defaultTextColor);
      }
      check.setVisibility(
          !rows.titles[position] && rows.checkeds[position] ? View.VISIBLE : View.GONE);

      return row;
    }
  }
}
