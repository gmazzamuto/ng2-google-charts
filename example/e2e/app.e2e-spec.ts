import { Ng2GoogleChartsExampleAppPage } from './app.po';

describe('ng2-google-charts-example-app App', function() {
  let page: Ng2GoogleChartsExampleAppPage;

  beforeEach(() => {
    page = new Ng2GoogleChartsExampleAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
