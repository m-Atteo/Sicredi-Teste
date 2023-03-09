import 'cypress-plugin-api'
describe('Verifica simulações de cadastro', ()=>{

    beforeEach(() => {
        cy.api('GET', 'http://localhost:8080/api/v1/simulacoes').as('simulacoes')
    })
    
    it('Cadastro de CPF com seguro', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                body: {
                    cpf: registerData[0].cpf,
                    nome: registerData[0].nome,
                    email: registerData[0].email,
                    valor: registerData[0].valor,
                    parcelas: registerData[0].parcelas,
                    seguro: registerData[0].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 201)
            });                
        })
    });
    it('Cadastro de CPF sem seguro', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                body: {
                    cpf: registerData[1].cpf,
                    nome: registerData[1].nome,
                    email: registerData[1].email,
                    valor: registerData[1].valor,
                    parcelas: registerData[1].parcelas,
                    seguro: registerData[1].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 201)
            });                
        })
    })    
    it('Cadastro de CPF já cadastrado', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[2].cpf,
                    nome: registerData[2].nome,
                    email: registerData[2].email,
                    valor: registerData[2].valor,
                    parcelas: registerData[2].parcelas,
                    seguro: registerData[2].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 409)
                expect(response).has.property('mensagem', 'CPF duplicado')
            });                
        })    
    })
    it('Cadastro de CPF inválido', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[3].cpf,
                    nome: registerData[3].nome,
                    email: registerData[3].email,
                    valor: registerData[3].valor,
                    parcelas: registerData[3].parcelas,
                    seguro: registerData[3].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });                
        })
    })
    it('Cadastro de CPF com nome invalido', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[4].cpf,
                    nome: registerData[4].nome,
                    email: registerData[4].email,
                    valor: registerData[4].valor,
                    parcelas: registerData[4].parcelas,
                    seguro: registerData[4].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });                
        })
    })
    it('Cadastro de CPF com email inválido', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[5].cpf,
                    nome: registerData[5].nome,
                    email: registerData[5].email,
                    valor: registerData[5].valor,
                    parcelas: registerData[5].parcelas,
                    seguro: registerData[5].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('email', 'E-mail deve ser um e-mail válido')
            });                
        })
    })
    it('Cadastro de CPF com valor abaixo ou diferente de 1000', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[6].cpf,
                    nome: registerData[6].nome,
                    email: registerData[6].email,
                    valor: registerData[6].valor,
                    parcelas: registerData[6].parcelas,
                    seguro: registerData[6].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('valor', 'Valor deve ser maior ou igual a R$ 1.000')
            });                
        })
    })
    it('Cadastro de CPF com valor acima ou diferente de 40000', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[7].cpf,
                    nome: registerData[7].nome,
                    email: registerData[7].email,
                    valor: registerData[7].valor,
                    parcelas: registerData[7].parcelas,
                    seguro: registerData[7].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('valor', 'Valor deve ser menor ou igual a R$ 40.000')
            });                
        })
    })
    it('Cadastro de CPF com parcelas abaixo ou diferente de 2', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[8].cpf,
                    nome: registerData[8].nome,
                    email: registerData[8].email,
                    valor: registerData[8].valor,
                    parcelas: registerData[8].parcelas,
                    seguro: registerData[8].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('parcelas', 'Parcelas deve ser igual ou maior que 2')
            });                
        })
    })
    it('Cadastro de CPF com parcelas acima ou diferente de 48', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[9].cpf,
                    nome: registerData[9].nome,
                    email: registerData[9].email,
                    valor: registerData[9].valor,
                    parcelas: registerData[9].parcelas,
                    seguro: registerData[9].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('parcelas', 'Parcelas deve ser igual ou menor que 48')
            });                
        })
    })
    it('Cadastro de CPF com seguro inválido', () => {
        cy.fixture('ResgisterSimulation').then((registerData) =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/simulacoes',
                failOnStatusCode: false,
                body: {
                    cpf: registerData[10].cpf,
                    nome: registerData[10].nome,
                    email: registerData[10].email,
                    valor: registerData[10].valor,
                    parcelas: registerData[10].parcelas,
                    seguro: registerData[10].seguro
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });                
        })
    })
})