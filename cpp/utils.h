#ifndef FASTTRIE_UTILS_H
#define FASTTRIE_UTILS_H

#include <jsi/jsi.h>

#define HOST_FN(rt, name, functionArgCount, hostFunctionBody) \
    jsi::Function::createFromHostFunction(                                 \
        rt, jsi::PropNameID::forAscii(rt, name), (functionArgCount),       \
        [=](jsi::Runtime & rt, const jsi::Value &thisValue,                \
            const jsi::Value *arguments,                                        \
            size_t count) -> jsi::Value hostFunctionBody)

#define HOST_STR(str) jsi::String::createFromAscii(rt, str)

#endif
