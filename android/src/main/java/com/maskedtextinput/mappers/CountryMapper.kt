package com.maskedtextinput.mappers

import com.facebook.react.bridge.ReadableArray
import com.redmadrobot.inputmask.model.Country

object CountryMapper {
  fun fromReadableArray(readableArray: ReadableArray): List<Country> {
    val list = mutableListOf<Country>()

    for (i in 0 until readableArray.size()) {
      val map = readableArray.getMap(i)
      if (map != null) {
        val name = map.getString("name") ?: ""
        val nameNative = map.getString("nameNative")
        val emoji = map.getString("emoji") ?: ""
        val iso3166alpha2 = map.getString("iso3166alpha2") ?: ""
        val iso3166alpha3 = map.getString("iso3166alpha3") ?: ""
        val countryCode = map.getString("countryCode") ?: ""
        val primaryFormat = map.getString("primaryFormat") ?: ""
        var affineFormats: List<String> = emptyList()
        val affineFormatsArray = map.getArray("affineFormats")
        if (affineFormatsArray != null) {
          affineFormats = AffinityFormatMapper.fromReadableArray(affineFormatsArray)
        }
        val phoneRegex = map.getString("phoneRegex") ?: ""

        list.add(
          Country(
            name = name,
            nameNative = nameNative,
            emoji = emoji,
            iso3166alpha2 = iso3166alpha2,
            iso3166alpha3 = iso3166alpha3,
            countryCode = countryCode,
            primaryFormat = primaryFormat,
            affineFormats = affineFormats,
            phoneRegex = phoneRegex,
          ),
        )
      }
    }

    return list
  }
}
