import 'cypress-plugin-api'
describe('Altera simulações de cadastro', ()=>{

    beforeEach(() => {
        cy.api('GET', 'http://localhost:8080/api/v1/simulacoes').as('simulacoes')
    })

    it('', () => {
        
    });

})