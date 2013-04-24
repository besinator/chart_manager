class Chart < ActiveRecord::Base
  attr_accessible :chart_type, :group, :name, :user_id, :chart_config_attributes, :regular_serie_attributes
  
  has_one :chart_config, dependent: :destroy
  has_many :regular_serie, dependent: :destroy
  
  belongs_to :user
  
  accepts_nested_attributes_for :chart_config, :regular_serie
end
