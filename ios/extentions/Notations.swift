import ForkInputMask
import Foundation

extension Dictionary where Key == String, Value == Any {
  func toNotation() -> Notation {
    let character = Array((self["character"] as! String))[0]
    let characterSet = CharacterSet(charactersIn: (self["characterSet"] as! String))
    let isOptional = self["isOptional"] as! Bool
    return Notation(character: character, characterSet: characterSet, isOptional: isOptional)
  }
}
