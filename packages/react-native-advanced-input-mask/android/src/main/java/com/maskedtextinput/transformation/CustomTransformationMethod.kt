package com.maskedtextinput.transformation

import android.text.method.TransformationMethod
import android.view.View

class CustomTransformationMethod(
  private val transformationString: String,
  private val transformationChar: Char,
) : TransformationMethod {
  override fun getTransformation(
    source: CharSequence,
    view: View,
  ): CharSequence = CardCharSequence(source)

  inner class CardCharSequence(
    private val source: CharSequence,
  ) : CharSequence {
    override val length: Int
      get() = source.length

    override fun get(index: Int): Char =
      if (index < transformationString.length && transformationString[index] == transformationChar) {
        transformationChar
      } else {
        source[index]
      }

    override fun subSequence(
      startIndex: Int,
      endIndex: Int,
    ): CharSequence {
      val result = StringBuilder()
      for (i in startIndex until endIndex) {
        result.append(
          if (transformationString[i] == transformationChar) {
            transformationChar
          } else {
            source[i]
          },
        )
      }
      return result
    }
  }

  override fun onFocusChanged(
    view: View,
    sourceText: CharSequence,
    focused: Boolean,
    direction: Int,
    previouslyFocusedRect: android.graphics.Rect?,
  ) {
    // No action needed
  }
}
