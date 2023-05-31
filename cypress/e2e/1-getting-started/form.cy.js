/// <reference types="Cypress"/>

describe("Central de atendimento ao cliente", () => {
  beforeEach(function () {
    cy.visit("./src/index.html")
  })
  it("Verifica título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
  })
  it("preenche os campos obrigatorios e envia o formulario", () => {
    const longText =
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis facere modi ullam praesentium eum animi quasi iure quo repellat sint, excepturi enim corrupti temporibus, culpa eligendi nesciunt sunt illo impedit."
    cy.get("#firstName").type("Denis")
    cy.get("#lastName").type("Coelho")
    cy.get("#email").type("denis@email.com")
    cy.get("#phone").type("9293892932")
    cy.get("#open-text-area").type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get(".success").should("be.visible")
  })

  it("exibe mensagem de erro ao submeter o formulario com um email nao valido ", () => {
    cy.get("#firstName").type("Denis")
    cy.get("#lastName").type("Coelho")
    cy.get("#email").type("denis@email,com")
    cy.get("#phone").type("9293892932")
    cy.get("#open-text-area").type("Teste")
    cy.get('button[type="submit"]').click()

    cy.get(".error").should("be.visible")
  })

  it("campo telefone continua vazio ao preencher campos nao-numericos", () => {
    cy.get("#phone").type("teste").should("have.value", "")
  })

  it("exibe msg de erro quando telefone é obrigatorio mas nao é preenchido", () => {
    cy.get("#firstName").type("Denis")
    cy.get("#lastName").type("Coelho")
    cy.get("#email").type("denis@email.com")
    cy.get("#phone-checkbox").check()
    cy.get("#open-text-area").type("Teste")
    cy.get('button[type="submit"]').click()

    cy.get(".error").should("be.visible")
  })

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Denis")
      .should("have.value", "Denis")
      .clear()
      .should("have.value", "")

    cy.get("#lastName")
      .type("Coelho")
      .should("have.value", "Coelho")
      .clear()
      .should("have.value", "")

    cy.get("#email")
      .type("denis@email.com")
      .should("have.value", "denis@email.com")
      .clear()
      .should("have.value", "")

    cy.get("#phone")
      .type("82934474593")
      .should("have.value", "82934474593")
      .clear()
      .should("have.value", "")
  })
  it("Exibe msg de erro ao submeter o formulario sem preencher todos os campos", () => {
    cy.get('button[type="submit"]').click()
    cy.get(".error").should("be.visible")
  })

  it("envia formulario com sucesso usando comandos customizados", () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get(".success").should("be.visible")
  })

  it("seleciona produto por texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube")
  })

  it('marca radio "feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback")
  })

  it("seleciona todos os radios em sequancia", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).check().should("be.checked")
      })
  })

  it("seleciona todos os checkbox, depois desmarca o ultimo", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked")
  })

  it("enviar arquivos", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json")
      })
  })

  it("selecionando arquivo simulando drag and drop", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json")
      })
  })
  it("verifica que ao clicar no link é aberto uma nova aba", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank")
  })

  it("verifica que ao clicar no link é aberto uma nova aba", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click()

    cy.contains("Talking About Testing").should("be.visible")
  })
})
