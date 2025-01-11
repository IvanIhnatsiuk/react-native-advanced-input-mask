import FormatError from './FormatError';

export default class FormatSanitizer {
  public static sanitize(formatString: string): string {
    FormatSanitizer.checkOpenBraces(formatString);
    const blocks = this.divideBlocksWithMixedCharacters(
      this.getFormatBlocks(formatString)
    );
    return FormatSanitizer.sortFormatBlocks(blocks).join('');
  }

  private static getFormatBlocks(formatString: string): string[] {
    const blocks: string[] = [];
    let currentBlock = '';
    let escape = false;

    for (const char of formatString) {
      if (char === '\\') {
        if (!escape) {
          escape = true;
          currentBlock += char;
          continue;
        }
      }

      if ((char === '[' || char === '{') && !escape) {
        if (currentBlock.length > 0) {
          blocks.push(currentBlock);
        }
        currentBlock = '';
      }

      currentBlock += char;

      if ((char === ']' || char === '}') && !escape) {
        blocks.push(currentBlock);
        currentBlock = '';
      }

      escape = false;
    }

    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }

    return blocks;
  }

  private static divideBlocksWithMixedCharacters(blocks: string[]): string[] {
    const resultingBlocks: string[] = [];

    for (const block of blocks) {
      if (block.startsWith('[')) {
        let blockBuffer = '';
        for (let i = 0; i < block.length; i++) {
          const blockCharacter = block[i];
          if (blockCharacter === '[') {
            blockBuffer += blockCharacter;
            continue;
          }
          if (blockCharacter === ']' && !blockBuffer.endsWith('\\')) {
            blockBuffer += blockCharacter;
            resultingBlocks.push(blockBuffer);
            break;
          }
          if (
            (blockCharacter === '0' || blockCharacter === '9') &&
            (blockBuffer.includes('A') ||
              blockBuffer.includes('a') ||
              blockBuffer.includes('-') ||
              blockBuffer.includes('_'))
          ) {
            blockBuffer += ']';
            resultingBlocks.push(blockBuffer);
            blockBuffer = '[' + blockCharacter;
            continue;
          }
          if (
            (blockCharacter === 'A' || blockCharacter === 'a') &&
            (blockBuffer.includes('0') ||
              blockBuffer.includes('9') ||
              blockBuffer.includes('-') ||
              blockBuffer.includes('_'))
          ) {
            blockBuffer += ']';
            resultingBlocks.push(blockBuffer);
            blockBuffer = '[' + blockCharacter;
            continue;
          }
          if (
            (blockCharacter === '-' || blockCharacter === '_') &&
            (blockBuffer.includes('0') ||
              blockBuffer.includes('9') ||
              blockBuffer.includes('A') ||
              blockBuffer.includes('a'))
          ) {
            blockBuffer += ']';
            resultingBlocks.push(blockBuffer);
            blockBuffer = '[' + blockCharacter;
            continue;
          }
          blockBuffer += blockCharacter;
        }
      } else {
        resultingBlocks.push(block);
      }
    }

    return resultingBlocks;
  }

  private static sortFormatBlocks(blocks: string[]): string[] {
    const sortedBlocks: string[] = [];

    for (const block of blocks) {
      let sortedBlock: string;
      if (block.startsWith('[')) {
        if (
          block.includes('0') ||
          block.includes('9') ||
          block.includes('A') ||
          block.includes('a')
        ) {
          sortedBlock =
            '[' +
            block.replace('[', '').replace(']', '').split('').sort().join('') +
            ']';
        } else {
          // For `_` or `-`, temporarily replace for sorting
          sortedBlock =
            '[' +
            block
              .replace('[', '')
              .replace(']', '')
              .replace('_', 'A')
              .replace('-', 'a')
              .split('')
              .sort()
              .join('') +
            ']';
          sortedBlock = sortedBlock.replace('A', '_').replace('a', '-');
        }
      } else {
        sortedBlock = block;
      }
      sortedBlocks.push(sortedBlock);
    }

    return sortedBlocks;
  }

  private static checkOpenBraces(str: string): void {
    let escape = false;
    let squareBraceOpen = false;
    let curlyBraceOpen = false;

    for (const char of str) {
      if (char === '\\') {
        escape = !escape;
        continue;
      }
      if (char === '[') {
        if (squareBraceOpen) {
          throw new FormatError();
        }
        squareBraceOpen = !escape;
      }
      if (char === ']' && !escape) {
        squareBraceOpen = false;
      }
      if (char === '{') {
        if (curlyBraceOpen) {
          throw new FormatError();
        }
        curlyBraceOpen = !escape;
      }
      if (char === '}' && !escape) {
        curlyBraceOpen = false;
      }
      escape = false;
    }
  }
}
