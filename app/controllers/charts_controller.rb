class ChartsController < ApplicationController
  respond_to :js

  def index
  	current_user = User.first
    charts = current_user.charts.all
		
    respond_with(charts) do |format|
      format.json
    end
  end

  def create
  	current_user = User.first
  	chart = current_user.charts.new(params[:chart])
    chart.save

    respond_with(chart) do |format|
      if chart.valid?
        format.json
      else
        format.json { render json: { success: false, errors: chart.errors } }
      end
    end
  end

  def update
  	current_user = User.first
  	chart =  current_user.charts.find(params[:id])
    chart.update_attributes(params[:chart])

    respond_with(chart) do |format|
      if chart.valid?
        format.json
      else
        format.json { render json: { success: false, errors: chart.errors } }
      end
    end
  end

  def destroy
  	current_user = User.first
  	chart =  current_user.charts.find(params[:id])
    chart.destroy

    respond_with(chart) do |format|
      format.json
    end
  end
end