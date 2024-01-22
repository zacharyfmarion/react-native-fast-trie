#ifdef __cplusplus
#import "fast-trie.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNFasTrieSpec.h"

@interface FastTrie : NSObject <NativeFastTrieSpec>
#else
#import <React/RCTBridgeModule.h>

@interface FastTrie : NSObject <RCTBridgeModule>
#endif

@end
