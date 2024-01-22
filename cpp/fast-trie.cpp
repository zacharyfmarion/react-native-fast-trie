#include "fast-trie.h"

#include "TrieHostObject.h"

namespace fasttrie {
    namespace jsi = facebook::jsi;

    void install(jsi::Runtime &rt) {
        auto FastTrie = HOST_FN(rt, "FastTrie", 2, {
            if (count != 2 || !arguments[0].isNumber() || !arguments[1].isNumber()) {
                throw jsi::JSError(rt, "FastTrie expects two number arguments");
            }
            size_t burst_threshold = arguments[0].asNumber();
            size_t max_load_factor = arguments[1].asNumber();

            return jsi::Object::createFromHostObject(
                rt, std::make_shared<TrieHostObject>(
                       TrieHostObject(burst_threshold, max_load_factor)));
        });

        rt.global().setProperty(rt, "__FastTrie", std::move(FastTrie));
    }
}  // namespace fasttrie
