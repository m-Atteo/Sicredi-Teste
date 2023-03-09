import 'cypress-plugin-api'
describe('Altera simulações de cadastro', ()=>{

    it('Altera nome para nome inválido com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                failOnStatusCode: false,
                body: {
                    nome: alterData.nomeInvalido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });
        })     
    });
    it('Altera nome para nome válido com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                body: {
                    nome: alterData.nomeValido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 200)
            });               
        })     
    });
    it('Altera email para email inválido com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                failOnStatusCode: false,
                body: {
                    email: alterData.emailInvalido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('email', 'E-mail deve ser um e-mail válido')
            });                
        })     
    });
    it('Altera email para email válido com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                body: {
                    email: alterData.emailValido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 200)
            });                
        })     
    });
    it('Altera valor para valor inválido (abaixo do possível) com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                failOnStatusCode: false,
                body: {
                    valor: alterData.valorMenorInvalido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('valor', 'Valor deve ser maior ou igual a R$ 1.000')
            });                
        })     
    });
    it('Altera valor para valor inválido (acima do possível) com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                failOnStatusCode: false,
                body: {
                    valor: alterData.valorMaiorInvalido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('valor', 'Valor deve ser menor ou igual a R$ 40.000')
            });                
        })     
    });
    it('Altera valor para valor válido com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                body: {
                    valor: alterData.valorValido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 200)
            });                
        })     
    });
    it('Altera parcela para parcela inválida (abaixo do possível) com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                failOnStatusCode: false,
                body: {
                    valor: alterData.parcelaMenorInvalido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('parcelas', 'Parcelas deve ser igual ou maior que 2')
            });                
        })     
    });
    it('Altera parcela para parcela inválida (acima do possível) com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                failOnStatusCode: false,
                body: {
                    valor: alterData.parcelaMaiorInvalido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 400)
                expect(response.body.erros).has.property('parcelas', 'Parcelas deve ser igual ou menor que 48')
            });                
        })     
    });
    it('Altera parcela para parcela válida com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                body: {
                    valor: alterData.parcelaValido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 200)
            });                
        })     
    });
    it('Altera seguro para seguro inválido com CPF com registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfValido,
                failOnStatusCode: false,
                body: {
                    seguro: alterData.seguroInvalido
                }
            }).then(response => {
                expect(response).has.property('status', 400)
            });                
        })     
    });
    it('Altera nome para CPF sem registro', () => {
        cy.fixture('alterSimulations').then((alterData) =>{
            cy.request({
                method: 'PUT',
                url: 'http://localhost:8080/api/v1/simulacoes/' + alterData.cpfInvalido,
                failOnStatusCode: false,
                body: {
                    nome: alterData.nomeValido,
                    seguro: alterData.seguroValido
                }
            }).then(response => {
                expect(response).has.property('status', 404)
                expect(response.body).has.property('mensagem', 'CPF ' + alterData.cpfInvalido + ' não encontrado')
            });                
        })     
    });
})