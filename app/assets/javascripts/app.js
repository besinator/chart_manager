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
