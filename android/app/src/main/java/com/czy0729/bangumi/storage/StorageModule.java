package com.czy0729.bangumi.storage;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.database.Cursor;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/**
 * 系统媒体存储模块: 替代 react-native-fs / rn-fetch-blob / @react-native-community/cameraroll
 * 项目内三库合计只提供两个能力, 这里以系统 API 直接实现:
 *  1. saveImage: 分享截图保存到系统相册
 *  2. saveDownload: 备份文本写入系统 Download 目录
 * API 29+ 走 MediaStore 贡献自己的文件, 无需任何存储权限;
 * API 28- 传统直写 + MediaScanner, 需 WRITE_EXTERNAL_STORAGE (JS 侧负责申请)
 */
public class StorageModule extends ReactContextBaseJavaModule {

  public StorageModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "StorageModule";
  }

  /**
   * 保存 base64 图片到系统相册
   *
   * @param base64Data 纯 base64 图片数据 (不含 Data URL 前缀, 由 JS 侧剥离)
   * @param mimeType   图片 MIME 类型 (如 image/jpeg)
   */
  @ReactMethod
  public void saveImage(String base64Data, String mimeType, Promise promise) {
    try {
      if (base64Data == null) {
        promise.reject("E_SAVE_IMAGE", "empty base64 data");
        return;
      }
      byte[] data = Base64.decode(base64Data, Base64.DEFAULT);
      // 空串 / 纯空白经 decode 后为空数组, 统一在此拦截, 避免相册出现坏图
      if (data.length == 0) {
        promise.reject("E_SAVE_IMAGE", "empty image data");
        return;
      }
      String displayName = "bangumi_" + System.currentTimeMillis() + "." + extensionOf(mimeType, "jpg");

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        ContentValues values = new ContentValues();
        values.put(MediaStore.MediaColumns.DISPLAY_NAME, displayName);
        values.put(MediaStore.MediaColumns.MIME_TYPE, mimeType);
        // 与原 CameraRoll 默认行为一致: 落在 DCIM (相册根)
        values.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DCIM);
        values.put(MediaStore.MediaColumns.IS_PENDING, 1);

        ContentResolver resolver = getReactApplicationContext().getContentResolver();
        Uri uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
        if (uri == null) {
          promise.reject("E_SAVE_IMAGE", "MediaStore insert failed");
          return;
        }

        writePendingRow(resolver, uri, data, values);
        promise.resolve(uri.toString());
        return;
      }

      File file = new File(
          Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM), displayName);
      file.getParentFile().mkdirs();
      try (FileOutputStream fos = new FileOutputStream(file)) {
        fos.write(data);
      }
      scanFile(file.getAbsolutePath(), mimeType);
      promise.resolve(Uri.fromFile(file).toString());
    } catch (Exception e) {
      promise.reject("E_SAVE_IMAGE", e);
    }
  }

  /**
   * 保存文本文件到系统 Download 目录
   *
   * @param fileName 文件名 (如 123_2026-11-18_12-00-00.json)
   * @param content  文本内容
   * @return 实际落盘的文件名 (重名时由系统自动改名, 不会覆盖已有文件)
   */
  @ReactMethod
  public void saveDownload(String fileName, String content, Promise promise) {
    try {
      byte[] data = content.getBytes(StandardCharsets.UTF_8);
      String mimeType = mimeOf(fileName);

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        ContentValues values = new ContentValues();
        values.put(MediaStore.MediaColumns.DISPLAY_NAME, fileName);
        values.put(MediaStore.MediaColumns.MIME_TYPE, mimeType);
        values.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
        values.put(MediaStore.MediaColumns.IS_PENDING, 1);

        ContentResolver resolver = getReactApplicationContext().getContentResolver();
        Uri uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
        if (uri == null) {
          promise.reject("E_SAVE_DOWNLOAD", "MediaStore insert failed");
          return;
        }

        writePendingRow(resolver, uri, data, values);
        // 重名时 MediaProvider 会自动改名, 回读真实落盘名 (自有行无需 READ 权限)
        promise.resolve(resolveDisplayName(resolver, uri, fileName));
        return;
      }

      File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
      File file = new File(dir, fileName);
      if (file.exists()) {
        // 与 MediaStore 路径行为对齐: 从不覆盖已有文件 (换名后复检, 防同毫秒碰撞)
        int dot = fileName.lastIndexOf('.');
        String base = dot >= 0 ? fileName.substring(0, dot) : fileName;
        String ext = dot >= 0 ? fileName.substring(dot) : "";
        long ts = System.currentTimeMillis();
        int seq = 0;
        do {
          String suffix = seq == 0 ? "" : "_" + seq;
          file = new File(dir, base + "_" + ts + suffix + ext);
          seq++;
        } while (file.exists());
      }
      file.getParentFile().mkdirs();
      try (FileOutputStream fos = new FileOutputStream(file)) {
        fos.write(data);
      }
      scanFile(file.getAbsolutePath(), mimeType);
      promise.resolve(file.getName());
    } catch (Exception e) {
      promise.reject("E_SAVE_DOWNLOAD", e);
    }
  }

  /** 写入 pending 行数据并结束 pending (失败时清理占位行, 避免残留 0 字节文件) */
  private static void writePendingRow(
      ContentResolver resolver, Uri uri, byte[] data, ContentValues values) throws Exception {
    try {
      try (OutputStream os = resolver.openOutputStream(uri)) {
        if (os == null) throw new IllegalStateException("openOutputStream returned null");
        os.write(data);
      }
      values.clear();
      values.put(MediaStore.MediaColumns.IS_PENDING, 0);
      // update 返回 0 说明行未能结束 pending (相册 / 文件管理器将永远看不到它), 抛错走占位行清理
      if (resolver.update(uri, values, null, null) == 0) {
        throw new IllegalStateException("failed to clear IS_PENDING");
      }
    } catch (Exception e) {
      resolver.delete(uri, null, null);
      throw e;
    }
  }

  /**
   * 回读实际落盘的文件名 (查自有贡献行, 无需 READ 权限)
   * - 优先 _data 路径的 basename: Q 上重名时 MediaProvider 只改路径不改 _display_name,
   *   R+ 两者一同改写, 故路径 basename 在所有版本上都是最终名
   * - _data 不可用时回退 _display_name (R+ 准确, Q 上可能仍是请求名), 再回退请求名
   */
  @RequiresApi(Build.VERSION_CODES.Q)
  private static String resolveDisplayName(ContentResolver resolver, Uri uri, String fallback) {
    try (Cursor cursor = resolver.query(
        uri,
        new String[] {MediaStore.MediaColumns.DISPLAY_NAME, MediaStore.MediaColumns.DATA},
        null,
        null,
        null)) {
      if (cursor != null && cursor.moveToFirst()) {
        String dataPath = cursor.getString(1);
        if (dataPath != null && dataPath.length() > 0) {
          String baseName = new File(dataPath).getName();
          if (baseName.length() > 0) return baseName;
        }
        String name = cursor.getString(0);
        if (name != null && name.length() > 0) return name;
      }
    } catch (Exception ignored) {
    }
    return fallback;
  }

  /** MediaScanner 收录 (API 28- 路径用; MediaStore 写入的文件无需扫描) */
  private void scanFile(String path, String mimeType) {
    MediaScannerConnection.scanFile(
        getReactApplicationContext(), new String[] {path}, new String[] {mimeType}, null);
  }

  /** image/jpeg → jpg, image/png → png; 复合子类型 (svg+xml 等) 回退默认扩展名 */
  private static String extensionOf(String mimeType, String fallback) {
    int slash = mimeType.indexOf('/');
    if (slash < 0) return fallback;
    String ext = mimeType.substring(slash + 1).toLowerCase();
    if (!ext.matches("[a-z0-9]{1,8}")) return fallback;
    return ext.equals("jpeg") ? "jpg" : ext;
  }

  /** 按扩展名推断 MIME (备份文件为 csv / json) */
  private static String mimeOf(String fileName) {
    String name = fileName.toLowerCase();
    if (name.endsWith(".json")) return "application/json";
    if (name.endsWith(".csv")) return "text/csv";
    if (name.endsWith(".txt")) return "text/plain";
    return "application/octet-stream";
  }
}
