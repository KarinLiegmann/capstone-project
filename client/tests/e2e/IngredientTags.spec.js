describe('<SearchBar /> Component E2E tested', () => {
    const TAG_INPUT_FIELD = '[data-testid="tag-input"]';

    /*const addThreeTags = () => {
        cy.get(TAG_INPUT_FIELD)
            .type('One')
            .type('{enter}')
            .type('Two')
            .type('{enter}')
            .type('Three')
            .type('{enter}');
    };*/
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
    it('should test the query value when typing', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('chick')
        cy.get(TAG_INPUT_FIELD).should('have.value', 'chick');
    });/*
});
    it('should generate a new tag when user enters a valid tag in the input field', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('chicken')
            .type('{enter}');
        cy.get(INGREDIENT_TAGS).should('have.length', 1);
    });
    it('should generate no tag when user enters an invalid ingredient-name in the input field', () => {
        cy.get(TAG_INPUT_FIELD)
            .type('12345')
            .type('{enter}')
        cy.get(INGREDIENT_TAGS).should('have.length', 0);
    });
    /*it('should delete last tag when user presses backspace key', () => {
        addThreeTags();
        cy.get(TAG_INPUT_FIELD).type('{backspace}');
        cy.get(TAG_SELECTOR).should('have.length', 2);
        cy.get(TAG_INPUT_FIELD).type('{backspace}');
        cy.get(TAG_SELECTOR).should('have.length', 1);
        cy.get(TAG_INPUT_FIELD).type('{backspace}');
        cy.get(TAG_SELECTOR).should('have.length', 0);
    });
    it('should select the first tag when the user presses the right arrow key', () => {
        addThreeTags();
        cy.get(TAG_INPUT_FIELD).type('{rightArrow}');
        cy.get(TAG_SELECTOR)
            .first()
            .should('have.attr', 'data-selected');
    });*/
});
