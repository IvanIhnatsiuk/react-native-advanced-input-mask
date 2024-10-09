package com.maskedtextinput.mappers

import com.redmadrobot.inputmask.helper.AffinityCalculationStrategy

class AffinityCalculationStrategyMapper {
  fun fromInt(value: Int): AffinityCalculationStrategy =
    when (value) {
      0 -> AffinityCalculationStrategy.WHOLE_STRING
      1 -> AffinityCalculationStrategy.PREFIX
      2 -> AffinityCalculationStrategy.CAPACITY
      3 -> AffinityCalculationStrategy.EXTRACTED_VALUE_CAPACITY
      else -> throw IllegalArgumentException("Invalid value for AffinityCalculationStrategy: $value")
    }
}
