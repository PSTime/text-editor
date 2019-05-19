import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getHeaderText() {
    return element(by.css('app-header span')).getText();
  }
}
