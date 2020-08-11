require 'test_helper'

class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:one)
  end

  test "should get index" do
    get books_url, as: :json
    assert_response :success
  end

  test "should create book" do
    assert_difference('Book.count') do
      post books_url, params: { book: { author: @book.author, characters: @book.characters, date_finished: @book.date_finished, genre_id: @book.genre_id, genre_name: @book.genre_name, genre_rationale: @book.genre_rationale, pages: @book.pages, problem: @book.problem, question: @book.question, solution: @book.solution, something_learned: @book.something_learned, title: @book.title, words_learned: @book.words_learned } }, as: :json
    end

    assert_response 201
  end

  test "should show book" do
    get book_url(@book), as: :json
    assert_response :success
  end

  test "should update book" do
    patch book_url(@book), params: { book: { author: @book.author, characters: @book.characters, date_finished: @book.date_finished, genre_id: @book.genre_id, genre_name: @book.genre_name, genre_rationale: @book.genre_rationale, pages: @book.pages, problem: @book.problem, question: @book.question, solution: @book.solution, something_learned: @book.something_learned, title: @book.title, words_learned: @book.words_learned } }, as: :json
    assert_response 200
  end

  test "should destroy book" do
    assert_difference('Book.count', -1) do
      delete book_url(@book), as: :json
    end

    assert_response 204
  end
end
