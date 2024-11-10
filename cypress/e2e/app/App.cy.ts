describe('app', () => {
  beforeEach(() => {
    cy.visit('https://react-js-vite.netlify.app');
  });

  it('display header along with the button', () => {
    cy.get('[data-cy=button]').should('have.text', 'Button');
  });
});
