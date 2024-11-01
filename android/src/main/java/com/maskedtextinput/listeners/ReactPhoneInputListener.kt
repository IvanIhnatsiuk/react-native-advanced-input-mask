package com.maskedtextinput.listeners

import android.view.View
import com.facebook.react.views.textinput.ReactEditText
import com.redmadrobot.inputmask.PhoneInputListener
import com.redmadrobot.inputmask.helper.AffinityCalculationStrategy

class ReactPhoneInputListener(
  affinityCalculationStrategy: AffinityCalculationStrategy,
  autocomplete: Boolean,
  autoSkip: Boolean,
  field: ReactEditText,
  rightToLeft: Boolean,
  valueListener: MaskedTextValueListener,
  private val focusChangeListener: View.OnFocusChangeListener,
) : PhoneInputListener(
    primaryFormat = "",
    affineFormats = emptyList(),
    customNotations = emptyList(),
    affinityCalculationStrategy = affinityCalculationStrategy,
    autocomplete = autocomplete,
    autoskip = autoSkip,
    field = field,
    rightToLeft = rightToLeft,
    valueListener = valueListener,
  ) {
  override fun onFocusChange(
    view: View?,
    hasFocus: Boolean,
  ) {
    super.onFocusChange(view, hasFocus)
    focusChangeListener.onFocusChange(view, hasFocus)
  }

  companion object {
    fun installOn(
      affinityCalculationStrategy: AffinityCalculationStrategy = AffinityCalculationStrategy.WHOLE_STRING,
      autocomplete: Boolean = true,
      autoSkip: Boolean = false,
      field: ReactEditText,
      rightToLeft: Boolean = false,
      valueListener: MaskedTextValueListener,
    ): PhoneInputListener {
      val listener: PhoneInputListener =
        ReactPhoneInputListener(
          affinityCalculationStrategy = affinityCalculationStrategy,
          autocomplete = autocomplete,
          autoSkip = autoSkip,
          field = field,
          rightToLeft = rightToLeft,
          focusChangeListener = field.onFocusChangeListener,
          valueListener = valueListener,
        )
      field.addTextChangedListener(listener)
      field.onFocusChangeListener = listener

      return listener
    }
  }
}
