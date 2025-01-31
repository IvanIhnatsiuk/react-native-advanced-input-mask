package com.maskedtextinput.mappers

import com.facebook.react.bridge.ReadableArray
import com.redmadrobot.inputmask.model.Notation

class NotationMapper {
  fun fromReadableArray(readableArray: ReadableArray): List<Notation> {
    val list = mutableListOf<Notation>()
    for (i in 0 until readableArray.size()) {
      val map = readableArray.getMap(i)
      if (map != null) {
        val char = map.getString("character")?.first()
        val characterSet = map.getString("characterSet")
        val isOptional = map.getBoolean("isOptional")
        if (char != null && characterSet != null) {
          list.add(Notation(char, characterSet, isOptional))
        }
      }
    }
    return list
  }
}
