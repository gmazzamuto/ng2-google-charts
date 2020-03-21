import { AppPage } from './app.po';
import { browser, by, logging, ExpectedConditions, element } from 'protractor';

describe('demo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should render Column chart', async () => {
    page.navigateTo();

    await new Promise( resolve => setTimeout(resolve, 5000) );

    const text = await page.getColumnChartText();

    const expected = ['Countries', 'Germany', 'USA', 'Brazil', 'Canada',
                      'France', 'RU'];
    for (const elm of expected) {
      if (text.includes(elm)) {
        continue;
      } else {
        fail(elm + ' not found');
      }
    }
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
