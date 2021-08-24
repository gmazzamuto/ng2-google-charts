describe('demo App', () => {

  it('should render Column chart', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('spyWinConsoleError');
      },
    });

    const expected = ['Countries', 'Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'];

    const getText = (el:HTMLElement) => el.textContent?.trim();
    const text = cy.get('#columnChart').find('text').then(els => {
      const texts = [...els].map(getText).slice(0, expected.length);
      expect(texts).to.deep.eq(expected);
    })
  });

  afterEach(() => {
    cy.get('@spyWinConsoleError').should('not.have.been.called');
  });

})
