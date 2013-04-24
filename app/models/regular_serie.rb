class RegularSerie < ActiveRecord::Base
  attr_accessible :chart_id, :color, :dash_style, :name, :series_type, :regular_serie_datum_attributes
  
  has_many :regular_serie_datum, dependent: :destroy
  belongs_to :chart
  
  accepts_nested_attributes_for :regular_serie_datum
end
