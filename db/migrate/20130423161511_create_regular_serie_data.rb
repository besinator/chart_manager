class CreateRegularSerieData < ActiveRecord::Migration
  def change
    create_table :regular_serie_data do |t|
      t.string :x_field
      t.float :data_index
      t.integer :regular_serie_id

      t.timestamps
    end
  end
end
