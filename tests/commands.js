const test = require('ava')
const { stripIndent } = require('common-tags')
const { cyAwait } = require('..')

test('one assignment', (t) => {
  const input = stripIndent`
    const n = await cy.get('#projects-count')
  `
  const output = cyAwait(input)
  // console.log(output)
  t.is(
    output,
    stripIndent`
      cy.get('#projects-count').then(n => {});
    `,
  )
})

test('two assignments', (t) => {
  const input = stripIndent`
    const n = await cy.get('#projects-count').invoke('text')
  `
  const output = cyAwait(input)
  console.log(output)
  t.is(
    output,
    stripIndent`
      cy.get('#projects-count').invoke('text').then(n => {});
    `,
  )
})

test('three assignments', (t) => {
  const input = stripIndent`
    const n = await cy.get('#projects-count').invoke('text').then(parseInt)
  `
  const output = cyAwait(input)
  console.log(output)
  t.is(
    output,
    stripIndent`
      cy.get('#projects-count').invoke('text').then(parseInt).then(n => {});
    `,
  )
})

test('get number and assert', (t) => {
  const input = stripIndent`
    await cy.visit('/')
    const n = await cy.get('#projects-count').invoke('text').then(parseInt)
    expect(n, 'projects').to.be.within(350, 400)
  `
  const output = cyAwait(input)
  console.log(output)
  t.is(
    output,
    stripIndent`
      cy.visit('/');
      cy.get('#projects-count').invoke('text').then(parseInt).then(n => {
        expect(n, 'projects').to.be.within(350, 400);
      });
    `,
  )
})