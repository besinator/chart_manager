class CreateRegularSerieData < ActiveRecord::Migration
  def change
    create_table :regular_serie_data do |t|
      t.integer :regular_serie_id
      t.string :x_field
      t.float :data_index

      t.timestamps
    end
  end
end
