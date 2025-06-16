/// <reference types="Cypress" />
// import React from 'react'
import About from '../../src/components/About'

describe('<About />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<About />).then(() => {
      cy.get('h1').should('contain', 'Acerca de nosotros')
      cy.get('#info').should('contain', 'Somos el equipo nº').contains(/[1-30]/)
      cy.get('.card').should('have.length', 5)
      cy.contains('Marc Rofes Romero').should('exist')
      cy.contains('Tomás Llorenç Guarino Sabaté').should('exist')
      cy.contains('Aitor Parra Fernández').should('exist')
      cy.contains('Patrick Albó Sureda').should('exist')
      cy.contains('Luis Pedraza Gomara').should('exist')
      cy.contains('Colaborador del proyecto').should('exist')
    })  
  })
})