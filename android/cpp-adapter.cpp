#include "fast-trie.h"

#include <fbjni/fbjni.h>
#include <jni.h>
#include <jsi/jsi.h>

using namespace facebook;

struct FastTrieBridge : jni::JavaClass<FastTrieBridge> {
  static constexpr auto kJavaDescriptor =
      "Lcom/fasttrie/FastTrieBridge;";

  static void registerNatives() {
    javaClassStatic()->registerNatives(
        {// initialization for JSI
         makeNativeMethod("installNativeJsi",
                          FastTrieBridge::installNativeJsi)
        });
  }

private:
  static void installNativeJsi(
      jni::alias_ref<jni::JObject> thiz, jlong jsiRuntimePtr) {
    auto jsiRuntime = reinterpret_cast<jsi::Runtime *>(jsiRuntimePtr);

    fasttrie::install(*jsiRuntime);
  }
};

JNIEXPORT jint JNI_OnLoad(JavaVM *vm, void *) {
  return jni::initialize(vm, [] { FastTrieBridge::registerNatives(); });
}
