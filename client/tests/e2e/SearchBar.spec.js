/// <reference types="Cypress" />

describe('<SearchBar /> Component E2E tested', () => {
    const TAG_INPUT_FIELD = '[data-testid="tag-input"]';
    const FETCHED_INGREDIENTS = '[data-testid="autofill-value"]'
    const ERROR_MESSAGE = '[data-testid="error-message"]'
    const INGREDIENT_TAGS = '[data-testid="ingredient-tags"]'

    beforeEach(() => {
        cy.visit('/');
    });
    it('does render the input field', () => {
        cy.get(TAG_INPUT_FIELD).should('be.visible');
    });
    it('should test the query value when typing', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('chick')
        cy.get(TAG_INPUT_FIELD).should('have.value', 'chick');
    });
    it('should fetch five autofill-suggestions from the API when three or more valid characters are typed into the input field', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('chick')
        cy.get(FETCHED_INGREDIENTS).should('have.length', 5);
    });
    it('should not fetch autofill-suggestions from the API when less than three valid characters are typed into the input field', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('ch')
        cy.get(FETCHED_INGREDIENTS).should('have.length', 0);
    });
    it('should not fetch autofill-suggestions from the API when three or more invalid characters are typed into the input field', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('12345')
        cy.get(FETCHED_INGREDIENTS).should('have.length', 0);
    });
    it('should render an error message when three or more invalid characters are typed into the input field', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('12345')
        cy.get(ERROR_MESSAGE).should('be.visible');
    });
    it('should render the autofill suggestions when three or more invalid characters are typed into the input field and are deleted with backspace', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('chickkk')
            .type('{backspace}')
            .type('{backspace}')
        cy.get(FETCHED_INGREDIENTS).should('have.length', 5);
    });
    it('should make sure that the first autofill-suggestions contains the value of the input field', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('chick')
        cy.get(FETCHED_INGREDIENTS).first().contains('chick');
    });
    it('should transform value of input field into lowercase-characters', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('Mozz')
        cy.get(TAG_INPUT_FIELD).should('have.value', 'mozz');
    });
    it('should render the the first autofill ingredient as tag when clicking on it and pressing enter', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('chicken')
        cy.get(FETCHED_INGREDIENTS).first().click();
        cy.get(TAG_INPUT_FIELD)
            .type('{enter}')
        cy.get(INGREDIENT_TAGS).should('be.visible');
    });
});
