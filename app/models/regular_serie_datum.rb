class RegularSerieDatum < ActiveRecord::Base
  attr_accessible :data_index, :regular_serie_id, :x_field
  belongs_to :regular_serie
end
