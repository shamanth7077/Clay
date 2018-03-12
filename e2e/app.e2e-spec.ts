import { ClayPage } from './app.po';

describe('clay App', () => {
  let page: ClayPage;

  beforeEach(() => {
    page = new ClayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
