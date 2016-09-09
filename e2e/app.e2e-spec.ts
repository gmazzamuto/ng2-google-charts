import { Ng2GoogleChartsPage } from './app.po';

describe('ng2-google-charts App', function() {
  let page: Ng2GoogleChartsPage;

  beforeEach(() => {
    page = new Ng2GoogleChartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
