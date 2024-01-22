project(FastTrie)
cmake_minimum_required(VERSION 3.9.0)

set(PACKAGE_NAME "fast-trie")
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)
set(BUILD_DIR ${CMAKE_SOURCE_DIR}/build)

# Specifies a path to native header files.
include_directories(
  ../cpp
)

add_library(
  ${PACKAGE_NAME}
  SHARED
  ../cpp/fast-trie.cpp
  ../cpp/TrieHostObject.cpp
  cpp-adapter.cpp
)

set_target_properties(
  ${PACKAGE_NAME}
  PROPERTIES CXX_STANDARD 17
             CXX_EXTENSIONS OFF
             POSITION_INDEPENDENT_CODE ON)

find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)

target_link_libraries(${PACKAGE_NAME} fbjni::fbjni ReactAndroid::jsi android)
