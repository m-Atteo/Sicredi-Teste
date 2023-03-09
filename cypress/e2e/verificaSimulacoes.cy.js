import 'cypress-plugin-api'
describe('Verifica se os CPFs possuem alguma restrição', ()=>{

    it.only('Verifica CPF se existem simulações', () => {
        cy.fixture('CPFRestrictions').then((CPFData) =>{
            cy.api('GET', 'http://localhost:8080/api/v1/simulacoes/').as('restricoes')
            
            cy.get('@restricoes').its('body').then((res)=>{
                if(res[0] != ""){
                    cy.get('@restricoes').its('status').should('equal', 200)
                    cy.log('Existem ' + res.length + ' simulações cadastradas' )
                }
                else{
                    cy.get('@restricoes').its('status').should('equal', 204)
                    cy.log('Ainda não existem simulações cadastradas')
                }
            })
        })
    });
})