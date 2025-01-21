import Mask from './helper/Mask';
import RTLMask from './helper/RTLMask';
import CaretString from './model/CaretString';
import { CaretGravityType } from './model/types';
import type { Notation } from '../types';
import type { MaskResult } from './model/types';
import { AFFINITY_CALCULATION_STRATEGY } from '../enums';
import { calculateAffinityOfMask } from './helper/affinityCalculationStrategy';
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from 'react-native';

type Field = HTMLInputElement;

type MaskAffinity = { mask: Mask; affinity: number };

class MaskedTextChangedListener {
  public primaryFormat: string;
  public affineFormats: string[];
  public customNotations: Notation[];
  public affinityCalculationStrategy: AFFINITY_CALCULATION_STRATEGY;
  public autocomplete: boolean;
  public autoskip: boolean;
  public rightToLeft: boolean;
  public allowedKeys: string;

  private afterText: string = '';

  constructor(
    primaryFormat: string,
    affineFormats: string[] = [],
    customNotations: Notation[] = [],
    affinityCalculationStrategy: AFFINITY_CALCULATION_STRATEGY = AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING,
    autocomplete: boolean = true,
    autoskip: boolean = false,
    rightToLeft: boolean = false,
    allowedKeys: string = ''
  ) {
    this.primaryFormat = primaryFormat;
    this.affineFormats = affineFormats;
    this.customNotations = customNotations;
    this.affinityCalculationStrategy = affinityCalculationStrategy;
    this.autocomplete = autocomplete;
    this.autoskip = autoskip;
    this.rightToLeft = rightToLeft;
    this.allowedKeys = allowedKeys;
  }

  private get primaryMask(): Mask {
    return this.maskGetOrCreate(this.primaryFormat, this.customNotations);
  }

  public setText(field: Field, text: string, autocomplete?: boolean): void {
    const useAutocomplete = autocomplete ?? this.autocomplete;
    const textAndCaret = new CaretString(text, text.length, {
      type: CaretGravityType.Forward,
      autocomplete: useAutocomplete,
      autoskip: false,
    });

    const result: MaskResult = this.pickMask(textAndCaret).apply(textAndCaret);
    field.value = result.formattedText.string;

    field.setSelectionRange(
      result.formattedText.caretPosition,
      result.formattedText.caretPosition
    );

    this.afterText = result.formattedText.string;
  }

  public get placeholder(): string {
    return this.primaryMask.placeholder();
  }

  public get acceptableTextLength(): number {
    return this.primaryMask.acceptableTextLength();
  }

  public get totalTextLength(): number {
    return this.primaryMask.totalTextLength();
  }

  public get acceptableValueLength(): number {
    return this.primaryMask.acceptableValueLength();
  }

  public get totalValueLength(): number {
    return this.primaryMask.totalValueLength();
  }

  public handleTextChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): MaskResult => {
    const { nativeEvent, target } = event;
    const { inputType, text } =
      nativeEvent as NativeSyntheticEvent<TextInputChangeEventData>['nativeEvent'] &
        InputEvent;
    const textField = target as unknown as HTMLInputElement;
    const isDeletion =
      inputType === 'deleteContentForward' ||
      inputType === 'deleteContentBackward';

    const selectionStart = textField.selectionStart || 0;
    const isInside = selectionStart < text.length;
    const caretPosition = isDeletion || isInside ? selectionStart : text.length;
    const useAutocomplete = isDeletion ? false : this.autocomplete;
    const useAutoskip = isDeletion ? this.autoskip : false;

    const caretGravity = {
      type: isDeletion ? CaretGravityType.Backward : CaretGravityType.Forward,
      autoskip: useAutoskip,
      autocomplete: useAutocomplete,
    };
    const newText = this.allowedKeys
      ? [...text].filter((char) => this.allowedKeys.includes(char)).join('')
      : text;
    const textAndCaret = new CaretString(newText, caretPosition, caretGravity);
    const mask = this.pickMask(textAndCaret);
    const result = mask.apply(textAndCaret);

    textField.value = result.formattedText.string;
    textField.setSelectionRange(
      result.formattedText.caretPosition,
      result.formattedText.caretPosition
    );

    this.afterText = result.formattedText.string;

    return result;
  };

  handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ): void => {
    if (this.autocomplete) {
      const textField = event.target as unknown as HTMLInputElement;
      const text = textField.value.length > 0 ? textField.value : '';
      const textAndCaret = new CaretString(text, text.length, {
        type: CaretGravityType.Forward,
        autocomplete: this.autocomplete,
        autoskip: false,
      });
      const result = this.pickMask(textAndCaret).apply(textAndCaret);

      this.afterText = result.formattedText.string;
      textField.value = this.afterText;

      textField.setSelectionRange(
        result.formattedText.caretPosition,
        result.formattedText.caretPosition
      );
    }
  };

  pickMask = (text: CaretString): Mask => {
    if (this.affineFormats.length === 0) {
      return this.primaryMask;
    }

    const primaryAffinity = this.calculateAffinity(this.primaryMask, text);
    const masksAndAffinities: MaskAffinity[] = [];

    for (const format of this.affineFormats) {
      const candidateMask = this.maskGetOrCreate(format, this.customNotations);
      const affinity = this.calculateAffinity(candidateMask, text);
      masksAndAffinities.push({ mask: candidateMask, affinity });
    }

    masksAndAffinities.sort((a, b) => b.affinity - a.affinity);

    let insertIndex = -1;
    for (let i = 0; i < masksAndAffinities.length; i++) {
      const affinity = masksAndAffinities[i]?.affinity;
      if (affinity && primaryAffinity === affinity) {
        insertIndex = i;
        break;
      }
    }

    if (insertIndex >= 0) {
      masksAndAffinities.splice(insertIndex, 0, {
        mask: this.primaryMask,
        affinity: primaryAffinity,
      });
    } else {
      masksAndAffinities.push({
        mask: this.primaryMask,
        affinity: primaryAffinity,
      });
    }

    return masksAndAffinities[0]!.mask;
  };

  private maskGetOrCreate = (
    format: string,
    customNotations: Notation[]
  ): Mask =>
    this.rightToLeft
      ? RTLMask.getOrCreate(format, customNotations)
      : Mask.getOrCreate(format, customNotations);

  private calculateAffinity(mask: Mask, text: CaretString): number {
    return calculateAffinityOfMask(
      this.affinityCalculationStrategy,
      mask,
      text
    );
  }
}

export default MaskedTextChangedListener;
