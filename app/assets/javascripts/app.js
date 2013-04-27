/**
 *= require_self
 
 *= require extjs4/Chart/ux/Highcharts
 *= require extjs4/Chart/ux/Highcharts/Serie
 *= require extjs4/Chart/ux/Highcharts/LineSerie
 *= require extjs4/Chart/ux/Highcharts/SplineSerie
 *= require extjs4/Chart/ux/Highcharts/AreaRangeSerie
 *= require extjs4/Chart/ux/Highcharts/AreaSerie
 *= require extjs4/Chart/ux/Highcharts/AreaSplineRangeSerie
 *= require extjs4/Chart/ux/Highcharts/AreaSplineSerie
 *= require extjs4/Chart/ux/Highcharts/BarSerie
 *= require extjs4/Chart/ux/Highcharts/BoxPlotSerie
 *= require extjs4/Chart/ux/Highcharts/BubbleSerie
 *= require extjs4/Chart/ux/Highcharts/ColumnRangeSerie
 *= require extjs4/Chart/ux/Highcharts/ColumnSerie
 *= require extjs4/Chart/ux/Highcharts/ErrorBarSerie
 *= require extjs4/Chart/ux/Highcharts/FunnelSerie
 *= require extjs4/Chart/ux/Highcharts/GaugeSerie
 *= require extjs4/Chart/ux/Highcharts/PieSerie
 *= require extjs4/Chart/ux/Highcharts/RangeSerie
 *= require extjs4/Chart/ux/Highcharts/ScatterSerie
 *= require extjs4/Chart/ux/Highcharts/WaterfallSerie
 
 *= require extjs4/Ext/ux/ColorPickerCombo
*/

//here is storage for combobox options - chart_type
/*
var chart_types_store = Ext.create('Ext.data.Store', {
	fields: ['name'],
	data: [
		{"name": "line"},
		{"name": "spline"},
		{"name": "step"},
		{"name": "area"},
		{"name": "bar"},
		{"name": "column"},
		{"name": "scatter"},
		{"name": "funnel"},
	]
});
*/
//Instance of application
Ext.application({
  //global namespace - chart manager
  name: 'CM',
  appFolder: '/assets/app',
  controllers: ['Charts'],
  requires: [
		'CM.ChartsConfig'
  ],
  autoCreateViewport: true
});
