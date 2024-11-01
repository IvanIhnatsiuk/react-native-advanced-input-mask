package com.maskedtextinput.mappers

import com.facebook.react.bridge.ReadableArray

object AffinityFormatMapper {
  fun fromReadableArray(readableArray: ReadableArray): List<String> {
    val list = mutableListOf<String>()

    for (i in 0 until readableArray.size()) {
      val string = readableArray.getString(i)

      list.add(string)
    }

    return list
  }
}
