import 'cypress-plugin-api'
describe('Verifica simulações de cadastro', ()=>{

    beforeEach(() => {
        cy.api('GET', 'http://localhost:8080/api/v1/simulacoes').as('simulacoes')
    })
    
    it('Cadastro de CPF com seguro', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                body: {
                    cpf: registerData.cpfV1,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 201)
            });                
        })
    });
    it('Cadastro de CPF sem seguro', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                body: {
                    cpf: registerData.cpfV2,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.semSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 201)
            });                
        })
    })    
    it('Cadastro de CPF já cadastrado', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV1,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 409)
                expect(response).has.property('mensagem', 'CPF duplicado')
            });                
        })    
    })
    it('Cadastro de CPF inválido', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfI,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });                
        })
    })
    it('Cadastro de CPF com nome inválido', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV3,
                    nome: registerData.nomeI,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });                
        })
    })
    it('Cadastro de CPF com email inválido', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV4,
                    nome: registerData.nomeV,
                    email: registerData.emailI,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('email', 'E-mail deve ser um e-mail válido')
            });                
        })
    })
    it('Cadastro de CPF com valor abaixo ou diferente de 1000', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV5,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorMinI,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('valor', 'Valor deve ser maior ou igual a R$ 1.000')
            });                
        })
    })
    it('Cadastro de CPF com valor acima ou diferente de 40000', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV6,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorMaxI,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('valor', 'Valor deve ser menor ou igual a R$ 40.000')
            });                
        })
    })
    it('Cadastro de CPF com parcelas abaixo ou diferente de 2', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV7,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasMinI,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('parcelas', 'Parcelas deve ser igual ou maior que 2')
            });                
        })
    })
    it('Cadastro de CPF com parcelas acima ou diferente de 48', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV8,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasMaxI,
                    seguro: registerData.comSeguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('parcelas', 'Parcelas deve ser igual ou menor que 48')
            });                
        })
    })
    it('Cadastro de CPF com seguro inválido', () => {
        cy.fixture('resgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData.cpfV9,
                    nome: registerData.nomeV,
                    email: registerData.emailV,
                    valor: registerData.valorV,
                    parcelas: registerData.parcelasV,
                    seguro: registerData.seguroI
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });                
        })
    })
})