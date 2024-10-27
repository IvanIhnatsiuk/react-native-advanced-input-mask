//
//  RNConversions.h
//  Pods
//
//  Created by Ivan Ignathuk on 25/10/2024.
//

#ifdef __cplusplus
#import <React/RCTConversions.h>

inline NSArray<NSDictionary *> *convertCustomNotations(std::vector<facebook::react::AdvancedTextInputMaskDecoratorViewCustomNotationsStruct> customNotationsArray)
{
    NSMutableArray *customNotations = [NSMutableArray arrayWithCapacity: customNotationsArray.size()];
    
    for (auto customNotation : customNotationsArray) {
        NSDictionary *notation = @{
            @"character": RCTNSStringFromString(customNotation.character),
            @"characterSet": RCTNSStringFromString(customNotation.characterSet),
            @"isOptional": @(customNotation.isOptional),
        };
        [customNotations addObject: notation];
    }
    
    return customNotations;
}

inline NSArray<NSString *>* convertAffinityFormat(std::vector<std::string> affinityFormatArray) {
    NSMutableArray<NSString *> *affinityFormats = [NSMutableArray arrayWithCapacity: affinityFormatArray.size()];
    
    for(auto &affinityFormat : affinityFormatArray){
        [affinityFormats addObject: RCTNSStringFromString(affinityFormat)];
    }
    
    return affinityFormats;
}

#endif
