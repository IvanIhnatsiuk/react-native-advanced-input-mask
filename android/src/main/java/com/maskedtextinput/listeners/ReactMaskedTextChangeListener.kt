package com.maskedtextinput.listeners

import android.view.View
import com.facebook.react.views.textinput.ReactEditText
import com.redmadrobot.inputmask.MaskedTextChangedListener
import com.redmadrobot.inputmask.helper.AffinityCalculationStrategy
import com.redmadrobot.inputmask.model.Notation

class ReactMaskedTextChangeListener(
  primaryFormat: String,
  affineFormats: List<String>,
  customNotations: List<Notation>,
  affinityCalculationStrategy: AffinityCalculationStrategy,
  autocomplete: Boolean,
  autoSkip: Boolean,
  field: ReactEditText,
  rightToLeft: Boolean,
  valueListener: MaskedTextValueListener,
  private val focusChangeListener: View.OnFocusChangeListener,
) : MaskedTextChangedListener(
    primaryFormat = primaryFormat,
    affineFormats = affineFormats,
    customNotations = customNotations,
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
      primaryFormat: String,
      affineFormats: List<String> = emptyList(),
      customNotations: List<Notation> = emptyList(),
      affinityCalculationStrategy: AffinityCalculationStrategy = AffinityCalculationStrategy.WHOLE_STRING,
      autocomplete: Boolean = true,
      autoSkip: Boolean = false,
      field: ReactEditText,
      rightToLeft: Boolean = false,
      valueListener: MaskedTextValueListener,
    ): MaskedTextChangedListener {
      val listener: MaskedTextChangedListener =
        ReactMaskedTextChangeListener(
          primaryFormat = primaryFormat,
          affineFormats = affineFormats,
          customNotations = customNotations,
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
