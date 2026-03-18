describe('Filtrado de productos', () => {
  it('el usuario filtra productos y ve resultados', () => {
    cy.visit('/')

    cy.contains('Filtrar por categoría').should('exist')

    cy.get('.v-select').click()
    cy.contains('.v-list-item', 'jewelery').click()

    cy.contains('jewelery').should('exist')
  })
})