//
//  FabricAdvanceTextInputMask.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 24/10/2024.
//
import ForkInputMask
import Foundation
import UIKit

@objc protocol AdvancedTextInputMaskDecoratorViewDelegate {
  func onAdvancedMaskTextChange(eventData: NSDictionary)
}

@objc(AdvancedTextInputViewDecoratorView)
class FabricAdvanceTextInputMaskDecoratorView: UIView {
  @objc var textView: UITextField?
  @objc var maskInputListener: MaskedTextInputListener?
  @objc var lastDispatchedEvent: [String: String] = [:]

  @objc weak var delegate: AdvancedTextInputMaskDecoratorViewDelegate?

  @objc var onAdvancedMaskTextChange: RCTDirectEventBlock?

  @objc var onAdvancedMaskTextChangedCallback: (_ extracted: String, _ formatted: String) -> Void {
    { [weak self] extracted, formatted in
      guard let self = self else { return }

      let eventData: [String: String] = [
        "extracted": extracted,
        "formatted": formatted,
      ]

      if NSDictionary(dictionary: eventData).isEqual(to: lastDispatchedEvent) {
        return
      }

      lastDispatchedEvent = eventData

      self.delegate?.onAdvancedMaskTextChange(eventData: eventData as NSDictionary)
    }
  }

  @objc var primaryMaskFormat: NSString = "" {
    didSet {
      maskInputListener?.primaryMaskFormat = primaryMaskFormat as String
      maybeUpdateText(text: textView?.allText ?? "")
    }
  }

  @objc var autocomplete: Bool = true {
    didSet {
      maskInputListener?.autocomplete = autocomplete
    }
  }

  @objc var autocompleteOnFocus: Bool = false {
    didSet {
      maskInputListener?.autocompleteOnFocus = autocompleteOnFocus
    }
  }

  @objc var allowSuggestions: Bool = true {
    didSet {
      maskInputListener?.allowSuggestions = allowSuggestions
    }
  }

  @objc var autoSkip: Bool = false {
    didSet {
      maskInputListener?.autoskip = autoSkip
    }
  }

  @objc var isRTL: Bool = false {
    didSet {
      maskInputListener?.rightToLeft = isRTL

      maybeUpdateText(text: textView?.allText ?? "")
    }
  }

  @objc var affinityFormat: [String] = [] {
    didSet {
      maskInputListener?.affineFormats = affinityFormat
    }
  }

  @objc var affinityCalculationStrategy: NSNumber? = 0 {
    didSet {
      maskInputListener?.affinityCalculationStrategy = AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy)
    }
  }

  @objc var customNotations: NSArray? {
    didSet {
      let customNotations = (customNotations as? [[String: Any]])?.map { $0.toNotation() } ?? []

      maskInputListener?.customNotations = customNotations
    }
  }

  @objc var defaultValue: NSString = "" {
    didSet {
      updateTextWithoutNotification(text: defaultValue as String)
    }
  }

  @objc var value: NSString = "" {
    didSet {
      maskInputListener?.autocomplete = false
      updateTextWithoutNotification(text: value as String)
      maskInputListener?.autocomplete = autocomplete
    }
  }

  @objc private func updateTextWithoutNotification(text: String) {
    if text == "" {
      return
    }

    guard let primaryMask = maskInputListener?.primaryMask else { return }
    let caretString = CaretString(
      string: text, caretPosition: text.endIndex, caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
    )
    let result = primaryMask.apply(toText: caretString)

    textView?.allText = result.formattedText.string
  }

  @objc private func maybeUpdateText(text: String) {
    guard let primaryMask = maskInputListener?.primaryMask else { return }

    let carretString = CaretString(
      string: text, caretPosition: text.endIndex, caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
    )
    let result = primaryMask.apply(toText: carretString)

    if text == result.formattedText.string {
      return
    }

    textView?.allText = result.formattedText.string
    maskInputListener?.notifyOnMaskedTextChangedListeners(forTextInput: textView as! UITextField, result: result)
  }

  func findFirstTextField(in view: UIView) -> UITextField? {
    // Loop through each subview
    for subview in view.subviews {
      // If the subview is a UITextField, return it
      if let textField = subview as? UITextField {
        return textField
      }
    }
    // If no UITextField is found, return nil
    return nil
  }

  @objc override func didMoveToWindow() {
    super.didMoveToWindow()
    var previousSibling: UITextField?
    if let parent = superview?.superview {
      for i in 1 ..< parent.subviews.count {
        if parent.subviews[i] == superview {
          previousSibling = findFirstTextField(in: parent.subviews[i - 1])
          break
        }
      }
    }

    if let previousSibling = previousSibling {
      textView = previousSibling
      guard let textView = textView else { return }
      maskInputListener = MaskedTextInputListener(
        primaryFormat: primaryMaskFormat as String,
        autocomplete: autocomplete,
        autocompleteOnFocus: autocompleteOnFocus,
        autoskip: autoSkip,
        rightToLeft: isRTL,
        affineFormats: affinityFormat,
        affinityCalculationStrategy: AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy), customNotations: (customNotations as? [[String: Any]])?.map { $0.toNotation() } ?? [],
        onMaskedTextChangedCallback: { input, value, _, _ in
          self.onAdvancedMaskTextChangedCallback(value, input.allText)
        },
        allowSuggestions: allowSuggestions
      )
      textView.delegate = maskInputListener
      updateTextWithoutNotification(text: defaultValue as String)
    }
  }
}
