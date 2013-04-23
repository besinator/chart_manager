class CreateRegularSeries < ActiveRecord::Migration
  def change
    create_table :regular_series do |t|
      t.integer :chart_id
      t.string :name
      t.string :series_type
      t.string :dash_style
      t.string :color

      t.timestamps
    end
  end
end
