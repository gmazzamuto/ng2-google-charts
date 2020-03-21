import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getColumnChartText(): Promise<Array<string>> {
    return element(by.id('columnChart'))
           .all(by.tagName('text'))
           .map(x => x.getText()) as Promise<Array<string>>;
  }
}
