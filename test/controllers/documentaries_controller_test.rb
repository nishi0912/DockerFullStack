require "test_helper"

class DocumentariesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @documentary = documentaries(:one)
  end

  test "should get index" do
    get documentaries_url
    assert_response :success
  end

  test "should get new" do
    get new_documentary_url
    assert_response :success
  end

  test "should create documentary" do
    assert_difference('Documentary.count') do
      post documentaries_url, params: { documentary: { book_name: @documentary.book_name, books_id: @documentary.books_id, documentary_name: @documentary.documentary_name, price: @documentary.price, slug: @documentary.slug, views: @documentary.views } }
    end

    assert_redirected_to documentary_url(Documentary.last)
  end

  test "should show documentary" do
    get documentary_url(@documentary)
    assert_response :success
  end

  test "should get edit" do
    get edit_documentary_url(@documentary)
    assert_response :success
  end

  test "should update documentary" do
    patch documentary_url(@documentary), params: { documentary: { book_name: @documentary.book_name, books_id: @documentary.books_id, documentary_name: @documentary.documentary_name, price: @documentary.price, slug: @documentary.slug, views: @documentary.views } }
    assert_redirected_to documentary_url(@documentary)
  end

  test "should destroy documentary" do
    assert_difference('Documentary.count', -1) do
      delete documentary_url(@documentary)
    end

    assert_redirected_to documentaries_url
  end
end
