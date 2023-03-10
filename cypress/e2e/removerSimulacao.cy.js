import 'cypress-plugin-api'
describe('Remove simulações cadastradas', ()=>{

    it('Remove simulações por ID inexistente', () => {
        cy.fixture('ids').then((idsData) => {
            cy.api({
                method: "DELETE",
                url: 'http://localhost:8080/api/v1/simulacoes/' + idsData.idValido,
                failOnStatusCode: false
            }).as('remove')
            cy.get('@remove').its('status').should('equal', 204)
        })
    });
    it('Tenta remover simulações por ID inexistente', () => {
        cy.fixture('ids').then((idsData) => {
            cy.api({
                method: "DELETE",
                url: 'http://localhost:8080/api/v1/simulacoes/' + idsData.idInvalido,
                failOnStatusCode: false
            }).as('remove')
            cy.get('@remove').its('status').should('equal', 404)
            cy.get('@remove').its('body').then((res) =>{
                expect(res).has.property('mensagem', 'Simulação não encontrada')
            })
        })
    });
})