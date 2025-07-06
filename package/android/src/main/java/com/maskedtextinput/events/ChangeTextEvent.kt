package com.maskedtextinput.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class ChangeTextEvent(
  surfaceId: Int,
  viewTag: Int,
  private val extractedText: String,
  private val formattedText: String,
  private val tailPlaceholder: String,
  private val complete: Boolean,
) : Event<ChangeTextEvent>(surfaceId, viewTag) {
  override fun getEventName(): String = EventNames.CHANGE_TEXT_EVENT

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? =
    Arguments.createMap().apply {
      putString("extracted", extractedText)
      putString("formatted", formattedText)
      putString("tailPlaceholder", tailPlaceholder)
      putBoolean("complete", complete)
    }
}
