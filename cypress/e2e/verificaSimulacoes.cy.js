import 'cypress-plugin-api'
describe('Verifica se existrem simulações cadastradas', ()=>{

    it('Verifica CPF se existem simulações', () => {
            cy.api('GET', 'http://localhost:8080/api/v1/simulacoes/').as('simulacoes')
            cy.get('@simulacoes').its('body').then((res)=>{
                if(res.length != 0){
                    cy.get('@simulacoes').its('status').should('equal', 200)
                    cy.log('Existem ' + res.length + ' simulações cadastradas' )
                }
                else{
                    cy.get('@simulacoes').its('status').should('equal', 204)
                    cy.log('Ainda não existem simulações cadastradas')
                }
            })
    });
})