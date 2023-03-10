import 'cypress-plugin-api'
describe('Consulta simulações por CPF', ()=>{

    it('Consulta simulação com CPF existente', () => {
        cy.fixture('alterSimulations').then((data) =>{
            cy.api('GET', 'http://localhost:8080/api/v1/simulacoes/' + data.cpfValido).as('consulta')
            cy.get('@consulta').its('status').should('equal', 200)
        })
    });

    it('Consulta simulação com CPF inexistente', () => {
        cy.fixture('alterSimulations').then((data) =>{
            cy.api({
                method: 'GET',
                url: 'http://localhost:8080/api/v1/simulacoes/' + data.cpfInvalido,
                failOnStatusCode: false
            }).as('consulta')
            cy.get('@consulta').its('status').should('equal', 404)
            cy.get('@consulta').its('body').then((res)=>{
                expect(res).has.property('mensagem', 'CPF ' + data.cpfInvalido + ' não encontrado')
            })
        })
    });
})