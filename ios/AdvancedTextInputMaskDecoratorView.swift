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
class AdvancedTextInputMaskDecoratorView: UIView {
  // MARK: - Public Properties

  @objc var onAdvancedMaskTextChange: RCTDirectEventBlock?
  @objc weak var delegate: AdvancedTextInputMaskDecoratorViewDelegate?

  // MARK: - Private Properties

  private weak var textField: UITextField?
  private var maskInputListener: NotifyingAdvancedTexInputMaskListener?
  private var lastDispatchedEvent: [String: String] = [:]
  private var textFieldDelegate: UITextFieldDelegate?
  private var isInitialMount = true

  @objc private var primaryMaskFormat: NSString = "" {
    didSet {
      maskInputListener?.primaryMaskFormat = primaryMaskFormat as String
      maybeUpdateText(text: textField?.allText ?? "")
    }
  }

  @objc private var autocomplete: Bool = true {
    didSet {
      maskInputListener?.autocomplete = autocomplete
    }
  }

  @objc private var autocompleteOnFocus: Bool = false {
    didSet {
      maskInputListener?.autocompleteOnFocus = autocompleteOnFocus
    }
  }

  @objc private var allowSuggestions: Bool = true {
    didSet {
      maskInputListener?.allowSuggestions = allowSuggestions
    }
  }

  @objc private var autoSkip: Bool = false {
    didSet {
      maskInputListener?.autoskip = autoSkip
    }
  }

  @objc private var isRTL: Bool = false {
    didSet {
      maskInputListener?.rightToLeft = isRTL

      maybeUpdateText(text: textField?.allText ?? "")
    }
  }

  @objc private var affinityFormat: [String] = [] {
    didSet {
      maskInputListener?.affineFormats = affinityFormat
    }
  }

  @objc private var affinityCalculationStrategy: NSNumber? = 0 {
    didSet {
      maskInputListener?.affinityCalculationStrategy =
        AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy)
    }
  }

  @objc private var customNotations: NSArray? {
    didSet {
      let customNotations = (customNotations as? [[String: Any]])?.compactMap { $0.toNotation() } ?? []

      maskInputListener?.customNotations = customNotations
    }
  }

  @objc private var allowedKeys: NSString? {
    didSet {
      let allowedKeys = (allowedKeys ?? "") as String
      maskInputListener?.allowedKeys = allowedKeys
      guard let textField = textField else { return }
      if !allowedKeys.isEmpty {
        let nextText = textField.allText.filter { allowedKeys.contains($0) }
        updateTextWithoutNotification(text: nextText)
      }
    }
  }

  @objc private var defaultValue: NSString = "" {
    didSet {
      updateTextWithoutNotification(text: defaultValue as String)
    }
  }

  @objc private var value: NSString = "" {
    didSet {
      updateTextWithoutNotification(text: value as String)
    }
  }

  // MARK: - Event Handlers

  private func onAdvancedMaskTextChangedCallback(
    extracted: String,
    formatted: String,
    tailPlaceholder: String
  ) {
    let eventData: [String: String] = [
      "extracted": extracted,
      "formatted": formatted,
      "tailPlaceholder": tailPlaceholder,
    ]

    if NSDictionary(dictionary: eventData).isEqual(to: lastDispatchedEvent) {
      return
    }

    lastDispatchedEvent = eventData
    if onAdvancedMaskTextChange != nil {
      onAdvancedMaskTextChange!(eventData)
    }
    delegate?.onAdvancedMaskTextChange(eventData: eventData as NSDictionary)
  }

  // MARK: - Utility Methods

  @objc private func updateTextWithoutNotification(text: String) {
    if text == textField?.allText {
      return
    }

    guard let primaryMask = maskInputListener?.primaryMask else { return }
    let caretString = CaretString(
      string: text,
      caretPosition: text.endIndex,
      caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
    )
    let result = primaryMask.apply(toText: caretString)

    textField?.allText = result.formattedText.string
  }

  @objc private func maybeUpdateText(text: String) {
    guard let primaryMask = maskInputListener?.primaryMask else { return }
    guard let textField = textField else { return }

    if text == textField.allText {
      return
    }

    let caretString = CaretString(
      string: text,
      caretPosition: text.endIndex,
      caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
    )
    let result = primaryMask.apply(toText: caretString)

    if text == result.formattedText.string {
      return
    }

    textField.allText = result.formattedText.string
    maskInputListener?.notifyOnMaskedTextChangedListeners(forTextInput: textField, result: result)
  }

  // MARK: - Configuration Methods

  private func configureTextField() {
    findTextField()
    guard let textField = textField else { return }

    textFieldDelegate = AdvancedInputMaskDelegateWrapper(textFieldDelegate: textField.delegate)
    textField.delegate = textFieldDelegate
  }

  private func configureMaskInputListener() {
    guard let textField = textField else { return }

    maskInputListener = NotifyingAdvancedTexInputMaskListener(
      primaryFormat: primaryMaskFormat as String,
      autocomplete: autocomplete,
      autocompleteOnFocus: autocompleteOnFocus,
      autoskip: autoSkip,
      rightToLeft: isRTL,
      affineFormats: affinityFormat,
      affinityCalculationStrategy: AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy),
      customNotations: (customNotations as? [[String: Any]])?.compactMap { $0.toNotation() } ?? [],
      onMaskedTextChangedCallback: { [weak self] input, value, _, tailPlaceholder in
        self?.onAdvancedMaskTextChangedCallback(
          extracted: value,
          formatted: input.allText,
          tailPlaceholder: tailPlaceholder
        )
      },
      allowSuggestions: allowSuggestions,
      allowedKeys: (allowedKeys ?? "") as String
    )
    maskInputListener?.textFieldDelegate = textFieldDelegate
    textField.delegate = maskInputListener
  }

  @objc func cleanup() {
    textField = nil
    maskInputListener?.textFieldDelegate = nil
    maskInputListener = nil
  }

  // MARK: - View Lifecycle

  override func didMoveToWindow() {
    if textField == nil {
      configureTextField()
      configureMaskInputListener()

      if isInitialMount {
        // reset the initial text before setting the default value
        textField?.allText = ""
        updateTextWithoutNotification(text: defaultValue as String)
        isInitialMount = false
      }
    }
  }
}

extension AdvancedTextInputMaskDecoratorView {
  private func findFirstTextField(in view: UIView) -> UITextField? {
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

  private func findTextField() {
    #if ADVANCE_INPUT_MASK_NEW_ARCH_ENABLED
      if let parent = superview?.superview {
        for elementIndex in 1 ..< parent.subviews.count where parent.subviews[elementIndex] == superview {
          textField = findFirstTextField(in: parent.subviews[elementIndex - 1])
          break
        }
      }
    #else
      if let parent = superview {
        for elementIndex in 1 ..< parent.subviews.count where parent.subviews[elementIndex] == self {
          textField = findFirstTextField(in: parent.subviews[elementIndex - 1])
          break
        }
      }
    #endif
  }
}
