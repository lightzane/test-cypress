Feature: Google Main Page

  I want to Google for IU
  Also I want to quick test a REST API using Cypress.
  This paragraph below feature is ignored by the compiler
  Feature is like "describe()"

  # This is a comment
  Scenario: Opening a search engine page
    Given I open Google page
    Then I see "Google" on the title

  # Scenario's are equivalent to "it()" or individual tests
  Scenario: Typing "IU" in the search field
    When I type "IU pretty" in the textfield
    Then I see "IU pretty" on the title

  # Given, When, Then are aliases/steps and can be replaced by "*"
  Scenario: Pokemon and REST API
    When I want to search "Bulbasaur" via rest-api testing
    Then I should see "Bulbasaur" in the result

# Given
# - Precondition
# - are steps to put the system in a known state
# - For several Given, use "And" or "But" for the number 2 and upwards to make it more readable

# When
# - User actions or events from another system
# - strongly recommended to only have a single "When" in a scenario

# Then
# - are steps used to describe an expected outcome, or result.
# - For several Then, use "And" or "But" for the number 2 and upwards to make it more readable

