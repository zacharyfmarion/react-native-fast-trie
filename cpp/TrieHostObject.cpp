#include "TrieHostObject.h"

namespace fasttrie {

    // From docs: https://github.com/Tessil/hat-trie
    // The balance between speed and memory usage can be modified through the max_load_factor method. 
    // A lower max load factor will increase the speed, a higher one will reduce the memory usage. 
    // Its default value is set to 8.0.
    // The default burst threshold, which is the maximum size of an array hash node before a burst occurs, 
    // is set to 16 384 which provides good performances for exact searches. If you mainly use prefix searches,
    // you may want to reduce it to something like 1024 or lower for faster iteration on the results through 
    // the burst_threshold method.
    TrieHostObject::TrieHostObject(size_t burst_threshold, size_t max_load_factor) : _trie(burst_threshold) {
        _trie.max_load_factor(max_load_factor);
    }

    std::vector<jsi::PropNameID> TrieHostObject::getPropertyNames(
        jsi::Runtime &rt) {
        std::vector<jsi::PropNameID> keys;
        const char *names[] = {"insert", "contains", "find"};
        for (const auto &name : names) {
            keys.push_back(jsi::PropNameID::forAscii(rt, name));
        }
        return keys;
    };

    jsi::Value TrieHostObject::get(jsi::Runtime &rt, const jsi::PropNameID &propNameID) {
        std::string propName = propNameID.utf8(rt);

        if (propName == "insert") {
            // Return a JavaScript function that inserts a string into the trie.
            return HOST_FN(rt, "insert", 1, {
                if (count != 1 || !arguments[0].isString()) {
                    throw jsi::JSError(rt, "insert expects a single string argument");
                }
                std::string key = arguments[0].asString(rt).utf8(rt);
                _trie.insert(key);
                return jsi::Value::undefined();
            });
        } else if (propName == "contains") {
            // Return a JavaScript function that checks if a string is in the trie.
            return HOST_FN(rt, "contains", 1, {
                if (count != 1 || !arguments[0].isString()) {
                    throw jsi::JSError(rt, "contains expects a single string argument");
                }
                std::string key = arguments[0].asString(rt).utf8(rt);
                auto it = _trie.find(key);
                bool found = (it != _trie.end());
                return jsi::Value(found);
            });
        } else if (propName == "find") {
            return HOST_FN(rt, "find", 2, {
                if (count < 1 || !arguments[0].isString()) {
                    throw jsi::JSError(rt, "find expects at least one argument, a string");
                }
                if (count > 1 && !arguments[1].isUndefined() && !arguments[1].isNumber()) {
                    throw jsi::JSError(rt, "Second argument to find must be a number or undefined");
                }

                std::string prefix = arguments[0].asString(rt).utf8(rt);
                size_t maxResults = std::numeric_limits<size_t>::max();
                if (count > 1 && arguments[1].isNumber()) {
                    maxResults = arguments[1].asNumber();
                }

                auto range = _trie.equal_prefix_range(prefix);
                auto it = range.first;
                
                // Because we don't know how many elements are in the range but we need to statically
                // allocate the array, we first put the results in a vector and then copy them into the
                // jsi::Array object
                std::vector<std::string> results;
                while (it != range.second && results.size() < maxResults) {
                    results.push_back(it.key());
                    ++it;
                }

                jsi::Array resultArray = jsi::Array(rt, results.size());
                for (size_t i = 0; i < results.size(); ++i) {
                    resultArray.setValueAtIndex(rt, i, jsi::String::createFromUtf8(rt, results[i]));
                }

                return resultArray;
            });
        }

        return jsi::Value::undefined();
    }

}  // namespace fasttrie
