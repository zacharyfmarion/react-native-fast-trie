#include "TrieHostObject.h"

namespace fasttrie
{

    // From docs: https://github.com/Tessil/hat-trie
    // The balance between speed and memory usage can be modified through the max_load_factor method.
    // A lower max load factor will increase the speed, a higher one will reduce the memory usage.
    // Its default value is set to 8.0.
    // The default burst threshold, which is the maximum size of an array hash node before a burst occurs,
    // is set to 16 384 which provides good performances for exact searches. If you mainly use prefix searches,
    // you may want to reduce it to something like 1024 or lower for faster iteration on the results through
    // the burst_threshold method.
    TrieHostObject::TrieHostObject(size_t burst_threshold, size_t max_load_factor) : _trie(burst_threshold)
    {
        _trie.max_load_factor(max_load_factor);
    }

    std::vector<jsi::PropNameID> TrieHostObject::getPropertyNames(
        jsi::Runtime &rt)
    {
        std::vector<jsi::PropNameID> keys;
        const char *names[] = {"insert", "batchInsert", "contains", "find"};
        for (const auto &name : names)
        {
            keys.push_back(jsi::PropNameID::forAscii(rt, name));
        }
        return keys;
    };

    jsi::Value TrieHostObject::get(jsi::Runtime &rt, const jsi::PropNameID &propNameID)
    {
        std::string propName = propNameID.utf8(rt);

        if (propName == "insert")
        {
            // Return a JavaScript function that inserts a string into the trie.
            return HOST_FN(rt, "insert", 1, {
                if (count != 1 || !arguments[0].isString())
                {
                    throw jsi::JSError(rt, "insert expects a single string argument");
                }
                std::string key = arguments[0].asString(rt).utf8(rt);
                _trie.insert(key);
                return jsi::Value::undefined();
            });
        }
        if (propName == "batchInsert")
        {
            // Return a JavaScript function that inserts an array of strings into the trie.
            return HOST_FN(rt, "batchInsert", 1, {
                if (count != 1 || !arguments[0].isObject() || !arguments[0].asObject(rt).isArray(rt))
                {
                    throw jsi::JSError(rt, "batchInsert expects an array of strings");
                }

                jsi::Array values = arguments[0].asObject(rt).getArray(rt);
                size_t length = values.length(rt);
                for (size_t i = 0; i < length; ++i)
                {
                    jsi::Value val = values.getValueAtIndex(rt, i);
                    if (val.isString())
                    {
                        std::string key = val.asString(rt).utf8(rt);
                        _trie.insert(key);
                    }
                    else
                    {
                        // Handle non-string values appropriately, e.g., throw an error
                        throw jsi::JSError(rt, "All elements of the array must be strings");
                    }
                }
                return jsi::Value::undefined();
            });
        }

        else if (propName == "contains")
        {
            // Return a JavaScript function that checks if a string is in the trie.
            return HOST_FN(rt, "contains", 1, {
                if (count != 1 || !arguments[0].isString())
                {
                    throw jsi::JSError(rt, "contains expects a single string argument");
                }
                std::string key = arguments[0].asString(rt).utf8(rt);
                auto it = _trie.find(key);
                bool found = (it != _trie.end());
                return jsi::Value(found);
            });
        }
        else if (propName == "find")
        {
            return HOST_FN(rt, "find", 2, {
                if (count < 1 || !arguments[0].isString())
                {
                    throw jsi::JSError(rt, "find expects at least one argument, a string");
                }
                if (count > 1 && !arguments[1].isUndefined() && !arguments[1].isNumber())
                {
                    throw jsi::JSError(rt, "Second argument to find must be a number or undefined");
                }

                std::string prefix = arguments[0].asString(rt).utf8(rt);
                size_t maxResults = std::numeric_limits<size_t>::max();
                if (count > 1 && arguments[1].isNumber())
                {
                    maxResults = arguments[1].asNumber();
                }

                auto range = _trie.equal_prefix_range(prefix);

                // First iteration to determine the size
                size_t determinedSize = 0;
                for (auto it = range.first; it != range.second && determinedSize < maxResults; ++it)
                {
                    ++determinedSize;
                }

                // Create the jsi::Array with the determined size
                jsi::Array resultArray = jsi::Array(rt, determinedSize);

                // Second iteration to populate the jsi::Array
                size_t index = 0;
                for (auto it = range.first; it != range.second && index < maxResults; ++it, ++index)
                {
                    resultArray.setValueAtIndex(rt, index, jsi::String::createFromUtf8(rt, it.key()));
                }

                return resultArray;
            });
        }

        return jsi::Value::undefined();
    }

} // namespace fasttrie
