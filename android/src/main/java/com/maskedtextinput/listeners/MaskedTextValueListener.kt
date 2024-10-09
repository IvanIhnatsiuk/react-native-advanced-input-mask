package com.maskedtextinput.listeners

import android.util.Log
import com.redmadrobot.inputmask.MaskedTextChangedListener

class MaskedTextValueListener(
  private val onChangeText: (Boolean, String, String, String) -> Unit,
) : MaskedTextChangedListener.ValueListener {
  private var previousFormattedText = ""
  private var previousExtractedText = ""

  override fun onTextChanged(
    maskFilled: Boolean,
    extractedValue: String,
    formattedValue: String,
    tailPlaceholder: String,
  ) {
    Log.i("onTextChanged", "formatted: $formattedValue, extractedValue: $extractedValue")
    if (previousFormattedText != formattedValue || previousExtractedText !== extractedValue) {
      previousFormattedText = formattedValue
      previousExtractedText = extractedValue
      onChangeText(maskFilled, extractedValue, formattedValue, tailPlaceholder)
    }
  }
}
