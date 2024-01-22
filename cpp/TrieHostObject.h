#ifndef FASTTRIE_HOSTOBJECT_H
#define FASTTRIE_HOSTOBJECT_H

#include "utils.h"
#include "tsl/htrie_set.h"

namespace fasttrie {
    namespace jsi = facebook::jsi;

    class JSI_EXPORT TrieHostObject : public jsi::HostObject {
    public:
        TrieHostObject(size_t burst_threshold, size_t max_load_factor);

        std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime &rt);
        jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propNameID);

    private:
        tsl::htrie_set<char> _trie;
    };

}  // namespace fasttrie

#endif
