// @ts-nocheck
/// <reference types="Cypress" />
import About from '../../src/components/About'

describe('<About />', () => {
  beforeEach(() => {
    cy.mount(<About />)
  })

  it('Muestra el número de equipo', () => {
    cy.get('#info').should('contain', 'Somos el equipo nº').contains(/\d+/)
  })

  it('Muestra el nombre de cada miembro del equipo', () => {
    cy.get('#members').should('contain', 'Yaiza Fontanet Rubiño')
    cy.get('#members').should('contain', 'Alexander Humberto Acosta Chirinos')
    cy.get('#members').should('contain', 'Enrique Madruga Ricardo')
    cy.get('#members').should('contain', 'Alberto Sanchez Ruiz')
  })

  it('Muestra la descripción de la aportación de cada miembro', () => {
    cy.get('#members').should('contain', 'Primeras pruebas de la aplicación')
    cy.get('#members').should('contain', 'Prueba de selección')
    cy.get('#members').should('contain', 'Prueba de la sección About')
    cy.get('#members').should('contain', 'Documentación del proyecto')
  })
})