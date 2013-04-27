class ChartsController < ApplicationController
  respond_to :json

	#-----------------------------------------------------
	#get all charts => GET /charts
	#-----------------------------------------------------
  def index
  	current_user = User.first
  	charts = current_user.charts.all
		
		#include in chart respond also chart_config, regular_serie and regular_serie_datum (data) => all nested with chart
    respond_with(charts) do |format|
    
    	#get all charts as json string
    	charts_str = charts.to_json(
    		:include => [
    			'chart_config',
    			'regular_serie' => { 
    				:include => ['regular_serie_datum']
    		}]
    	)
    
    	#response string in specified format
    	response_str = "{\"success\": true, charts: #{charts_str}}"
    	
      format.json { render :json => response_str }
    end
  end

	#-----------------------------------------------------
	#create chart => POST /charts
	#-----------------------------------------------------
  def create
  	current_user = User.first
  	p "--------------------------------------------\n\n\n\n\n\n"
  	p params[:chart]
  	p "--------------------------------------------\n\n\n\n\n\n"
  	chart = current_user.charts.new(params[:chart])
    chart.save
		
    respond_with(chart) do |format|
    
    	
    	#get all charts as json string
    	chart_str = chart.to_json(
    		:include => [
    			'chart_config',
    			'regular_serie' => { 
    				:include => ['regular_serie_datum']
    		}]
    	)
    
    	#response string in specified format
    	response_str = "{\"success\": true, charts: #{chart_str}}"
      
      if chart.valid?
        format.json { render :json => response_str }
      else
        format.json { render json: { success: false, errors: chart.errors } }
      end
    end
  end

	#-----------------------------------------------------
	#update chart => PUT /charts/<id>
	#-----------------------------------------------------
  def update
  	current_user = User.first
  	chart =  current_user.charts.find(params[:id])
    chart.update_attributes(params[:chart])

    respond_with(chart) do |format|
    
    	#get all charts as json string
    	chart_str = chart.to_json(
    		:include => [
    			'chart_config',
    			'regular_serie' => { 
    				:include => ['regular_serie_datum']
    		}]
    	)
    
    	#response string in specified format
    	response_str = "{\"success\": true, charts: #{chart_str}}"
      
      if chart.valid?
      	format.json { render :json => response_str }
      else
        format.json { render json: { success: false, errors: chart.errors } }
      end
    end
  end

	#-----------------------------------------------------
	#delete chart => DELETE /charts/<id>
	#-----------------------------------------------------
  def destroy
  	current_user = User.first
  	chart =  current_user.charts.find(params[:id])
    chart.destroy

    respond_with(chart) do |format|
      format.json
    end
  end
end
