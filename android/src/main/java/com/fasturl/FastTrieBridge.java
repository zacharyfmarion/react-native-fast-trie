package com.fasttrie;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;

public class FastTrieBridge {
  private native void installNativeJsi(long jsContextNativePointer);

  public static final FastTrieBridge instance = new FastTrieBridge();

  public void install(ReactContext context) {
      long jsContextPointer = context.getJavaScriptContextHolder().get();
      installNativeJsi(jsContextPointer);
  }
}
