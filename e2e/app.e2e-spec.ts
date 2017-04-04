import { SelectorAppPage } from './app.po';

describe('selector-app App', function() {
  let page: SelectorAppPage;

  beforeEach(() => {
    page = new SelectorAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
