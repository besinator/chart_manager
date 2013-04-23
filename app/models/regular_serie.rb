class RegularSerie < ActiveRecord::Base
  attr_accessible :chart_id, :color, :dash_style, :name, :series_type
  has_one :regular_serie_data, dependent: :destroy
  
  belongs_to :chart
end
