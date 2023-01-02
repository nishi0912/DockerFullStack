# == Schema Information
#
# Table name: books
#
#  id         :integer         not null, primary key
#  name       :string
#  content    :string
#  author     :string
#  sales      :decimal(, )
#  created_at :datetime        not null
#  updated_at :datetime        not null
#  deleted_at :datetime
#  slug       :string
#  published  :string
#  price      :decimal(, )
#

class Book < ApplicationRecord
    has_many :documentaries, dependent: :destroy
    acts_as_paranoid

    before_create :book_paramaterize
    
    def book_paramaterize
        self.slug = name.parameterize 
    end
end
