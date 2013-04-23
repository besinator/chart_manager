# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130422231345) do

  create_table "admins", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "admins", ["email"], :name => "index_admins_on_email", :unique => true
  add_index "admins", ["reset_password_token"], :name => "index_admins_on_reset_password_token", :unique => true

  create_table "chart_configs", :force => true do |t|
    t.integer  "chart_id"
    t.string   "title"
    t.string   "subtitle"
    t.string   "xtitle"
    t.string   "ytitle"
    t.boolean  "inverted"
    t.string   "legend_layout"
    t.string   "legend_align"
    t.string   "legend_vertical_align"
    t.integer  "legend_border_width"
    t.string   "x_grid_line_color"
    t.integer  "x_grid_line_width"
    t.string   "y_grid_line_color"
    t.integer  "y_grid_line_width"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

  create_table "charts", :force => true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "group"
    t.string   "chart_type"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "regular_serie_data", :force => true do |t|
    t.integer  "regular_serie_id"
    t.string   "x_field"
    t.float    "data_index"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "regular_series", :force => true do |t|
    t.integer  "chart_id"
    t.string   "name"
    t.string   "series_type"
    t.string   "dash_style"
    t.string   "color"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "password_digest"
    t.string   "email"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
