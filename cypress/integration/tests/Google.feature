Feature: Google Main Page

  I want to Google for IU

  Scenario: Opening a search engine page
    Given I open Google page
    Then I see "Google" on the title

  Scenario: Typing "IU" in the search field
    When I type "IU pretty" in the textfield
    Then I see "IU pretty" on the title
