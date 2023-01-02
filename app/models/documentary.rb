class Documentary < ApplicationRecord
  belongs_to :book
  acts_as_paranoid
  before_create :documentary_paramaterize

  def documentary_paramaterize
    self.slug = documentary_name.parameterize 
  end
end

# == Schema Information
#
# Table name: documentaries
#
#  id                  :integer         not null, primary key
#  documentary_name    :string
#  book_name           :string
#  slug                :string
#  views               :decimal(, )
#  price               :decimal(, )
#  book_id             :integer         not null
#  created_at          :datetime        not null
#  updated_at          :datetime        not null
#  deleted_at          :datetime
#  documentary_content :string
#

