class Chart < ActiveRecord::Base
  attr_accessible :chart_type, :group, :name, :user_id
  
  has_one :chart_config, dependent: :destroy
  has_many :regular_serie, dependent: :destroy
  
  belongs_to :user
end
