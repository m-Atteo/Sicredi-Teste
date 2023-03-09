import 'cypress-plugin-api'
describe('Verifica se os CPFs possuem alguma restrição', ()=>{

    it('Verifica CPF com restição', () => {
        cy.fixture('CPFRestrictions').then((CPFData) =>{
            cy.api('GET', 'http://localhost:8080/api/v1/restricoes/' + CPFData.withRestrictions).as('restricoes')
            cy.get('@restricoes').its('status').should('equal', 200)
            cy.get('@restricoes').its('body').then((res)=>{
                expect(res).has.property('mensagem', 'O CPF ' + CPFData.withRestrictions + ' tem problema')
            })
        })
    });

    it('Verifica CPF sem restrição', () => {
        cy.fixture('CPFRestrictions').then((CPFData) =>{
            cy.api('GET', 'http://localhost:8080/api/v1/restricoes/' + CPFData.withoutRestrictions).as('restricoes')
            cy.get('@restricoes').its('status').should('equal', 204)
        })
    });

})