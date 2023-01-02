require "application_system_test_case"

class DocumentariesTest < ApplicationSystemTestCase
  setup do
    @documentary = documentaries(:one)
  end

  test "visiting the index" do
    visit documentaries_url
    assert_selector "h1", text: "Documentaries"
  end

  test "creating a Documentary" do
    visit documentaries_url
    click_on "New Documentary"

    fill_in "Book name", with: @documentary.book_name
    fill_in "Books", with: @documentary.books_id
    fill_in "Documentary name", with: @documentary.documentary_name
    fill_in "Price", with: @documentary.price
    fill_in "Slug", with: @documentary.slug
    fill_in "Views", with: @documentary.views
    click_on "Create Documentary"

    assert_text "Documentary was successfully created"
    click_on "Back"
  end

  test "updating a Documentary" do
    visit documentaries_url
    click_on "Edit", match: :first

    fill_in "Book name", with: @documentary.book_name
    fill_in "Books", with: @documentary.books_id
    fill_in "Documentary name", with: @documentary.documentary_name
    fill_in "Price", with: @documentary.price
    fill_in "Slug", with: @documentary.slug
    fill_in "Views", with: @documentary.views
    click_on "Update Documentary"

    assert_text "Documentary was successfully updated"
    click_on "Back"
  end

  test "destroying a Documentary" do
    visit documentaries_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Documentary was successfully destroyed"
  end
end
