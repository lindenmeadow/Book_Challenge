class Book < ApplicationRecord
    belongs_to :genre

    validates :title, presence: :true
    validates  :author, presence: :true
    validates  :pages, presence: :true
    validates  :date_finished, presence: :true
    validates  :characters, presence: :true
    validates  :problem, presence: :true
    validates  :solution, presence: :true
    validates  :genre_rationale, presence: :true
    validates  :words_learned, presence: :true
    validates  :something_learned, presence: :true
    validates  :question, presence: :true
end
