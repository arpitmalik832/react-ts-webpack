/* eslint-disable no-console */
/// <reference types="cypress" />

context('Spies, Stubs, and Clock', () => {
  it('cy.spy() - wrap a method in a spy', () => {
    // https://on.cypress.io/spy
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      foo() {
        return undefined;
      },
    };

    const spy = cy.spy(obj, 'foo').as('anyArgs');

    obj.foo();

    cy.wrap(spy).should('be.called');
  });

  it('cy.spy() retries until assertions pass', () => {
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      foo(x: string) {
        console.log('obj.foo called with', x);
      },
    };

    cy.spy(obj, 'foo').as('foo');

    setTimeout(() => {
      obj.foo('first');
    }, 500);

    setTimeout(() => {
      obj.foo('second');
    }, 2500);

    cy.get('@foo').should('have.been.calledTwice');
  });

  it('cy.stub() - create a stub and/or replace a function with stub', () => {
    // https://on.cypress.io/stub
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      foo(a: string, b: string) {
        console.log('a', a, 'b', b);
      },
    };

    const stub = cy.stub(obj, 'foo').as('foo');

    obj.foo('foo', 'bar');

    cy.wrap(stub).should('be.called');
  });

  it('cy.clock() - control time in the browser', () => {
    // https://on.cypress.io/clock

    // create the date in UTC so it's always the same
    // no matter what local timezone the browser is running in
    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
    cy.get('#clock-div').click();
    cy.get('#clock-div').should('have.text', '1489449600');
  });

  it('cy.tick() - move time in the browser', () => {
    // https://on.cypress.io/tick

    // create the date in UTC so it's always the same
    // no matter what local timezone the browser is running in
    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
    cy.get('#tick-div').click();
    cy.get('#tick-div').should('have.text', '1489449600');

    cy.tick(10000); // 10 seconds passed
    cy.get('#tick-div').click();
    cy.get('#tick-div').should('have.text', '1489449610');
  });

  it('cy.stub() matches depending on arguments', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const greeter = {
      greet(name?: string | number) {
        return `Hello, ${name}!`;
      },
    };

    // Create and alias the stub immediately
    cy.stub(greeter, 'greet')
      .callThrough()
      .withArgs(Cypress.sinon.match.string)
      .returns('Hi')
      .withArgs(Cypress.sinon.match.number)
      .throws(new Error('Invalid name'));

    // Test string argument
    cy.wrap(greeter.greet('World')).should('equal', 'Hi');

    // Test number argument
    try {
      greeter.greet(42);
    } catch (err) {
      cy.wrap((err as Error).message).should('equal', 'Invalid name');
    }

    // Test unmatched call
    const defaultResult = greeter.greet();
    cy.wrap(defaultResult).should('equal', 'Hello, undefined!');
  });

  it('matches call arguments using Sinon matchers', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const calculator = {
      add(a: number, b: number) {
        return a + b;
      },
    };

    const spy = cy.spy(calculator, 'add').as('add');

    cy.wrap(calculator.add(2, 3)).should('equal', 5);

    // if we want to assert the exact values used during the call
    cy.wrap(spy).should('be.calledWith', 2, 3);

    // let's confirm "add" method was called with two numbers
    cy.wrap(spy).should(
      'be.calledWith',
      Cypress.sinon.match.number,
      Cypress.sinon.match.number,
    );

    // alternatively, provide the value to match
    cy.wrap(spy).should(
      'be.calledWith',
      Cypress.sinon.match(2),
      Cypress.sinon.match(3),
    );

    // match any value
    cy.wrap(spy).should('be.calledWith', Cypress.sinon.match.any, 3);

    // match any value from a list
    cy.wrap(spy).should('be.calledWith', Cypress.sinon.match.in([1, 2, 3]), 3);

    const isEven = (x: number) => x % 2 === 0;

    // expect the value to pass a custom predicate function
    // the second argument to "sinon.match(predicate, message)" is
    // shown if the predicate does not pass and assertion fails
    cy.wrap(spy).should(
      'be.calledWith',
      Cypress.sinon.match(isEven, 'isEven'),
      3,
    );

    const isGreaterThan = (limit: number) => (x: number) => x > limit;

    const isLessThan = (limit: number) => (x: number) => x < limit;

    // you can combine several matchers using "and", "or"
    cy.wrap(spy).should(
      'be.calledWith',
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(2), '> 2')
        .and(Cypress.sinon.match(isLessThan(4), '< 4')),
    );

    cy.wrap(spy).should(
      'be.calledWith',
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(200), '> 200')
        .or(Cypress.sinon.match(3)),
    );

    // matchers can be used from BDD assertions
    cy.get('@add').should(
      'have.been.calledWith',
      Cypress.sinon.match.number,
      Cypress.sinon.match(3),
    );

    // you can alias matchers for shorter test code
    const { match: M } = Cypress.sinon;

    cy.get('@add').should('have.been.calledWith', M.number, M(3));
  });
});
