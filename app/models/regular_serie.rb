class RegularSerie < ActiveRecord::Base
  attr_accessible :chart_id, :color, :dash_style, :name, :series_type
  has_many :regular_serie_datum, dependent: :destroy
  
  belongs_to :chart
end
