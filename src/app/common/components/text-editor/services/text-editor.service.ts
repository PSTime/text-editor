import { Injectable } from '@angular/core';
import {CommandTypes} from '../models/command-types';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {

  constructor() { }

  public getSelectionStyles(selection: Selection): CommandTypes[] {

    const selectedText = selection.focusNode.textContent;

    const parentNod = selection.focusNode.parentNode;

    const tagNames: string[] = [];
    let node: HTMLElement|null = <HTMLElement> parentNod;

    do {
      if (!node) {
        break;
      }
      tagNames.push(node.tagName.toLowerCase());
      node = <HTMLElement> node.parentNode;
    }
    while (node && node.textContent === selectedText);

    return tagNames
      .map((tag: string) => this.convertHtmlTagToCommandType(tag))
      .filter((command: CommandTypes|null) => !!command);
  }

  private convertHtmlTagToCommandType(tag: string): CommandTypes|null {
    switch (tag) {
      case 'b':
        return CommandTypes.BOLD;
      case 'i':
        return CommandTypes.ITALIC;
      case 'u':
        return CommandTypes.UNDERLINE;
      default:
        return null;
    }
  }

}
