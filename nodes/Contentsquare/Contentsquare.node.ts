import { 
	ApplicationError,
	INodeType, 
	INodeTypeDescription, 
	IExecuteFunctions, 
	NodeApiError,
	NodeConnectionType,
	NodeOperationError
} from 'n8n-workflow';

export class Contentsquare implements INodeType {
	description: INodeTypeDescription = {
		name: 'contentsquare',
		displayName: 'Contentsquare',
		group: ['transform'],
		version: 1,
		description: 'Use the Contentsquare API',
    defaults:{ name: 'Contentsquare' },
		icon: 'file:contentsquare.svg',
		// @ts-ignore - node-class-description-inputs-wrong
		inputs: [{ type: NodeConnectionType.Main }],
		// @ts-ignore - node-class-description-outputs-wrong
		outputs: [{ type: NodeConnectionType.Main }],        
		usableAsTool: true,
		credentials: [{	name: 'contentsquareApi', required: true}],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Data Export API', value: 'dataExportAPI', description: 'Provides endpoints to create export jobs and retrieve details such as job lists, job runs, exportable fields, and custom or dynamic variables' },
				  { name: 'Metrics API', value: 'metricsAPI', description: 'Provides detailed metrics on user behavior and performance' },
          { name: 'Speed Analysis API', value: 'speedAnalysisAPI', description: 'Enables testing and monitoring of web pages to detect slowdowns, uncover optimization opportunities, and benchmark performance against competitors' }
			  ],
				default: 'dataExportAPI',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['dataExportAPI'] } },
				options: [					
					{ name: 'Create Export Job', value: 'dataExportAPIExportJobsCreate', action: 'Creates an export job', description: 'Allows for creating a new export job' },
					{ name: 'Get Job', value: 'dataExportAPIJobsGet', action: 'Gets a specific job', description: 'Allows for retrieving a specific job with its ID' },
					{ name: 'Get Job Run', value: 'dataExportAPIJobsRunGet', action: 'Gets a specific job run', description: 'Allows for retrieving a specific job run with its ID' },
					{ name: 'List Custom Variables', value: 'dataExportAPICustomVariablesList', action: 'Lists all custom variables', description: 'Allows for retrieving all the custom variables available on a project' },
					{ name: 'List Dynamic Variables', value: 'dataExportAPIDynamicVariablesList', action: 'Lists all dynamic variables', description: 'Allows for retrieving all the dynamic variables available on a project between two dates' },
					{ name: 'List Export Jobs', value: 'dataExportAPIExportJobsList', action: 'Lists all export jobs', description: 'Provides the list of all the available export jobs' },
					{ name: 'List Exportable Fields', value: 'dataExportAPIExportableFieldsList', action: 'Lists all exportable fields', description: 'Allows for retrieving all fields that can be extracted for a specified scope' },
					{ name: 'List Job Runs', value: 'dataExportAPIJobRunsList', action: 'Lists all job runs of a job', description: 'Provides the list of all the job runs related to a specific job' },
					{ name: 'List Successful Job Runs', value: 'dataExportAPISuccessfulJobRunsList', action: 'Lists all successful job runs', description: 'Provides the list of all the jobs runs that completed successfully' }
				],
				default: 'dataExportAPIExportJobsCreate',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['metricsAPI'] } },
				options: [					
					{ name: 'Get Page Activity Rate', value: 'metricsAPIPageActivityRateGet', action: 'Gets page activity rate', description: 'The ratio of time visitors spend interacting with the page to the time spent on the page' },
          { name: 'Get Page Bounce Rate', value: 'metricsAPIPageBounceRateGet', action: 'Gets page bounce rate', description: 'The ratio between the visitors who landed on the page and left the site without having seen a second page and all visitors who landed on the page' },
          { name: 'Get Page Conversion Rate', value: 'metricsAPIPageConversionRateGet', action: 'Gets page conversion rate', description: 'Ratio between the number of users that viewed the page and reached the goal during their navigation and the number of users that viewed the page' },
					{ name: 'Get Page Exit Rate', value: 'metricsAPIPageExitRateGet', action: 'Gets page exit rate', description: 'The ratio between the number of views of the page which are the last page view of the session and the total number of views of the page' },
					{ name: 'Get Page Fold Height', value: 'metricsAPIPageFoldHeightGet', action: 'Gets page screen height', description: 'Average screen height' },
					{ name: 'Get Page Height', value: 'metricsAPIPageHeightGet', action: 'Gets page height', description: 'The average height of the page in pixels at its first load (an average for all the URLs included in the page)' },
					{ name: 'Get Page Interaction Time', value: 'metricsAPIPageInteractionTimeGet', action: 'Gets page interaction time', description: 'The average time spent interacting on the page' },
					{ name: 'Get Page Landing Rate', value: 'metricsAPIPageLandingRateGet', action: 'Gets page landing rate', description: 'Ratio between users that landed on this screen and the total number of users (for mobile project only)' },
					{ name: 'Get Page Scroll Rate', value: 'metricsAPIPageScrollRateGet', action: 'Gets page scroll rate', description: 'The proportion of the page displayed by visitors (the ratio between the last line of pixels displayed on the screen and the height of the page)' },
					{ name: 'Get Page Time Spent', value: 'metricsAPIPageTimeSpentGet', action: 'Gets page time spent', description: 'The average time spent on the page, from the first page view trigger to the last event sent' },
					{ name: 'Get Page Unique Visits', value: 'metricsAPIPageUniqueVisitsGet', action: 'Gets page unique visits', description: 'The number of unique users who saw the selected page at least once during their session' },
					{ name: 'Get Page Views', value: 'metricsAPIPageViewsGet', action: 'Gets page views', description: 'The number of times the page was viewed' },
					{ name: 'Get Page Views per Visit', value: 'metricsAPIPageViewsPerVisitGet', action: 'Gets page views per visit', description: 'The average number of times the page is viewed per visit' },
					{ name: 'Get Page Visits', value: 'metricsAPIPageVisitsGet', action: 'Gets page visits', description: 'Number of sessions where the page has been seen at least once' },
					{ name: 'Get Page Web Vitals', value: 'metricsAPIPageWebVitalsGet', action: 'Gets page web vitals', description: 'Returns a list of web vitals metrics (including core web vitals)' },
					{ name: 'Get Site Bounce Rate', value: 'metricsAPISiteBounceRateGet', action: 'Gets site bounce rate', description: 'The ratio between the visitors who entered the site and left it without having seen a second page and all visitors' },
					{ name: 'Get Site Cart Average', value: 'metricsAPISiteCartAverageGet', action: 'Gets site cart average', description: 'The average cart amount is calculated by dividing the total revenue by the number of transactions' },
					{ name: 'Get Site Conversion Rate', value: 'metricsAPISiteConversionRateGet', action: 'Gets site conversion rate', description: 'Ratio between the number of sessions where a specified goal was reached and the total number of sessions' },
					{ name: 'Get Site Conversions', value: 'metricsAPISiteConversionsGet', action: 'Gets site conversions', description: 'The number of sessions where a specified goal was reached' },
					{ name: 'Get Site Pageview Average', value: 'metricsAPISitePageviewAverageGet', action: 'Gets site pageview average', description: 'Average number page views during a session (a page that has been refreshed counts as one view)' },
					{ name: 'Get Site Revenue', value: 'metricsAPISiteRevenueGet', action: 'Gets site revenue', description: 'Sum of all the transaction amounts' },
					{ name: 'Get Site Session Time Average', value: 'metricsAPISiteSessionTimeAverageGet', action: 'Gets site session time average', description: 'Average time spent from entry on the site to site exit for each visit' },
					{ name: 'Get Site Visits', value: 'metricsAPISiteVisitsGet', action: 'Gets site visits', description: 'Number of sessions' },
					{ name: 'Get Zone Attractiveness Rate', value: 'metricsAPIZoneAttractivenessRateGet', action: 'Gets zone attractiveness rate', description: 'The percentage of page views with at least one select the zone out of the views where the zone was displayed' },
					{ name: 'Get Zone Click Rate', value: 'metricsAPIZoneClickRateGet', action: 'Gets zone click rate', description: 'The percentage of pageviews with at least one select the zone' },
					{ name: 'Get Zone Click Recurrence', value: 'metricsAPIZoneClickRecurrenceGet', action: 'Gets zone click recurrence', description: 'The average number of clicks on the zone, for pageviews with at least one select the zone' },
					{ name: 'Get Zone Conversion Rate per Click', value: 'metricsAPIZoneConversionRatePerClickGet', action: 'Gets zone conversion rate per click', description: 'Percentage of visitors who achieved the goal after clicking on a zone' },
          { name: 'Get Zone Conversion Rate per Hover', value: 'metricsAPIZoneConversionRatePerHoverGet', action: 'Gets zone conversion rate per hover', description: 'Percentage of visitors who achieved the goal after hovering on a zone' },
          { name: 'Get Zone Conversion Rate per Tap', value: 'metricsAPIZoneConversionRatePerTapGet', action: 'Gets zone conversion rate per tap', description: 'Percentage that also completed the selected goal during the same session on app' },
          { name: 'Get Zone Engagement Rate', value: 'metricsAPIZoneEngagementRateGet', action: 'Gets zone engagement rate', description: 'Percentage of visitors who clicked after having hovered a zone' },
          { name: 'Get Zone Exposure Rate', value: 'metricsAPIZoneExposureRateGet', action: 'Gets zone exposure rate', description: 'The exposure rate takes into account the time spent on a zone' },
          { name: 'Get Zone Exposure Time', value: 'metricsAPIZoneExposureTimeGet', action: 'Gets zone exposure time', description: 'Time a zone was exposed' },
					{ name: 'Get Zone Hesitation Time', value: 'metricsAPIZoneHesitationTimeGet', action: 'Gets zone hesitation time', description: 'Average time elapsed between the last hover and the first select a zone' },
					{ name: 'Get Zone Hover Rate', value: 'metricsAPIZoneHoverRateGet', action: 'Gets zone hover rate', description: 'Percentage of users who hovered a zone at least once' },
					{ name: 'Get Zone Hover Time', value: 'metricsAPIZoneHoverTimeGet', action: 'Gets zone hover time', description: 'Average total time spent hovering over an element' },
					{ name: 'Get Zone Number of Clicks', value: 'metricsAPIZoneNumberOfClicksGet', action: 'Gets zone number of clicks', description: 'The total number of clicks on the zone, for pageviews with at least one select the zone' },
					{ name: 'Get Zone Revenue', value: 'metricsAPIZoneRevenueGet', action: 'Gets zone revenue', description: 'Total revenue generated by the segmented users after they clicked on an element' },
					{ name: 'Get Zone Revenue per Click', value: 'metricsAPIZoneRevenuePerClickGet', action: 'Gets zone revenue per click', description: 'Average revenue per click generated by users after they clicked on an element' },
          { name: 'Get Zone Revenue per Tap', value: 'metricsAPIZoneRevenuePerTapGet', action: 'Gets zone revenue per tap', description: 'Average revenue per tap generated by users after they tapped on an element on app' },
          { name: 'Get Zone Swipe Rate', value: 'metricsAPIZoneSwipeRateGet', action: 'Gets zone swipe rate', description: 'Percentage of users performing at least one swipe on a zone during a screen display on app' },
          { name: 'Get Zone Swipe Rate Recurrence', value: 'metricsAPIZoneSwipeRateRecurrenceGet', action: 'Gets zone swipe rate recurrence', description: 'Average number of times an element was swiped when engaged with during a screenview on app' },
          { name: 'Get Zone Tap Rate', value: 'metricsAPIZoneTapRateGet', action: 'Gets zone tap rate', description: 'Percentage of users that tapped on the zone at least once on app' },
          { name: 'Get Zone Tap Recurrence', value: 'metricsAPIZoneTapRecurrenceGet', action: 'Gets zone tap recurrence', description: 'Average number of times an element was tapped when engaged with during a screenview on app' },
          { name: 'Get Zone Time Before First Click', value: 'metricsAPIZoneTimeBeforeFirstClickGet', action: 'Gets zone time before first click', description: 'Number of seconds between page load and first select an element' },
					{ name: 'Get Zone Time Before First Tap', value: 'metricsAPIZoneTimeBeforeFirstTapGet', action: 'Gets zone tap before first tap', description: 'Number of seconds between screen load and first tap on an element' },
					{ name: 'List Goals', value: 'metricsAPIGoalsList', action: 'Lists all goals for a project', description: 'Gets the list of all goals for a project' },
					{ name: 'List Mappings', value: 'metricsAPIMappingsList', action: 'Lists all mappings for a project', description: 'Gets the list of all mappings for a project' },
					{ name: 'List Page Groups', value: 'metricsAPIPageList', action: 'Lists all page groups for a specific mapping', description: 'Gets all the page groups for a specific mapping' },
					{ name: 'List Page Groups Metrics', value: 'metricsAPIPageMetricsList', action: 'Lists all page groups metrics between two dates', description: 'Returns all page group metrics between two dates' },
					{ name: 'List Segments', value: 'metricsAPISegmentsList', action: 'Lists all segments for a project', description: 'Gets the list of all segments for a project' },
					{ name: 'List Site Metrics', value: 'metricsAPISiteMetricsList', action: 'Lists all site metrics between two dates', description: 'Returns all site metrics between two dates' },
          { name: 'List Zone Metrics', value: 'metricsAPIZoneMetricsList', action: 'Lists all zone metrics between two dates', description: 'Returns all zone metrics between two dates' },
          { name: 'List Zones', value: 'metricsAPIZonesList', action: 'Lists all zones for a zoning', description: 'Gets all the zones for a zoning' },
					{ name: 'List Zonings', value: 'metricsAPIZoningsList', action: 'Lists all zonings for a page group', description: 'Gets all the zonings for a page group' }
				],
				default: 'metricsAPIPageActivityRateGet',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['speedAnalysisAPI'] } },
				options: [					
					{ name: 'Create Event', value: 'speedAnalysisAPIEventsCreate', action: 'Creates an event', description: 'Returns the created event' },
					{ name: 'Delete Event', value: 'speedAnalysisAPIEventsDelete', action: 'Deletes an event', description: 'Returns the deleted event' },
					{ name: 'Get Analysis HAR From Analysis', value: 'speedAnalysisAPIAnalysiHARFromAnalysisPost', action: 'Gets analysis HAR from an analysis', description: 'Returns the HAR from the analysis' },
					{ name: 'Get Analysis Report', value: 'speedAnalysisAPIAnalysisReportPost', action: 'Gets an analysis report', description: 'Returns the analysis report' },
					{ name: 'Get Monitoring Last Report', value: 'speedAnalysisAPIMonitoringsLastReportPost', action: 'Gets the monitoring last report', description: 'Returns the last report of a monitoring' },
					{ name: 'Get Monitoring Reports', value: 'speedAnalysisAPIMonitoringsReportsPost', action: 'Gets the monitoring reports', description: 'Returns the monitoring reports' },
					{ name: 'Get Scenario HAR From Analysis', value: 'speedAnalysisAPIScenariosHARFromAnalysisPost', action: 'Gets scenario HAR from an analysis', description: 'Returns the HAR from the analysis' },
          { name: 'Get Scenario Report', value: 'speedAnalysisAPIScenariosReportPost', action: 'Gets a scenario report', description: 'Returns a scenario report' },
          { name: 'Get Scenario Reports', value: 'speedAnalysisAPIScenariosReportsPost', action: 'Gets the scenario reports', description: 'Returns the scenario reports' },
          { name: 'Get Scenario Step Report', value: 'speedAnalysisAPIScenariosStepReportPost', action: 'Gets the scenario step report', description: 'Returns the report of the scenario step' },
					{ name: 'List Events', value: 'speedAnalysisAPIEventsListPost', action: 'Gets a list of events', description: 'Returns the list of events' },
					{ name: 'List Monitorings', value: 'speedAnalysisAPIMonitoringsListPost', action: 'Gets the list of monitorings', description: 'Returns the list of monitorings' },
					{ name: 'List Scenarios', value: 'speedAnalysisAPIScenariosListPost', action: 'Gets the list of scenarios', description: 'Returns the list of scenarios' }
				],
				default: 'speedAnalysisAPIEventsCreate',
			},
      {
        displayName: 'Job ID',
        name: 'jobId',
        type: 'number',
        default: '',
        displayOptions:{ show:{ operation:['dataExportAPIJobsGet', 'dataExportAPIJobsRunGet', 'dataExportAPIJobRunsList'] } }
      },
      {
        displayName: 'Mapping ID',
        name: 'mappingId',
        type: 'number',
        default: '',
        displayOptions:{ show:{ operation:['metricsAPIPageList'] } }
      },
      {
        displayName: 'Page Group ID',
        name: 'pageGroupId',
        type: 'number',
        default: '',
        displayOptions:{ show:{ operation:['metricsAPIPageActivityRateGet', 'metricsAPIPageBounceRateGet', 'metricsAPIPageConversionRateGet', 'metricsAPIPageExitRateGet', 'metricsAPIPageHeightGet', 'metricsAPIPageInteractionTimeGet', 'metricsAPIPageLandingRateGet', 'metricsAPIPageMetricsList', 'metricsAPIPageFoldHeightGet', 'metricsAPIPageScrollRateGet', 'metricsAPIPageTimeSpentGet', 'metricsAPIPageUniqueVisitsGet', 'metricsAPIPageViewsGet', 'metricsAPIPageViewsPerVisitGet', 'metricsAPIPageVisitsGet', 'metricsAPIPageWebVitalsGet', 'metricsAPIZoningsList'] } }
      },
      {
        displayName: 'Run ID',
        name: 'runId',
        type: 'number',
        default: '',
        displayOptions:{ show:{ operation:['dataExportAPIJobsRunGet'] } }
      },
      {
        displayName: 'Zone ID',
        name: 'zoneId',
        type: 'number',
        default: '',
        displayOptions:{ show:{ operation:['metricsAPIZoneAttractivenessRateGet', 'metricsAPIZoneClickRateGet', 'metricsAPIZoneClickRecurrenceGet', 'metricsAPIZoneConversionRatePerClickGet', 'metricsAPIZoneConversionRatePerHoverGet', 'metricsAPIZoneConversionRatePerTapGet', 'metricsAPIZoneEngagementRateGet', 'metricsAPIZoneExposureRateGet', 'metricsAPIZoneExposureTimeGet', 'metricsAPIZoneHesitationTimeGet', 'metricsAPIZoneHoverRateGet', 'metricsAPIZoneHoverTimeGet', 'metricsAPIZoneMetricsList', 'metricsAPIZoneNumberOfClicksGet', 'metricsAPIZoneRevenueGet', 'metricsAPIZoneRevenuePerClickGet', 'metricsAPIZoneRevenuePerTapGet', 'metricsAPIZoneSwipeRateGet', 'metricsAPIZoneSwipeRateRecurrenceGet', 'metricsAPIZoneTapRateGet', 'metricsAPIZoneTapRecurrenceGet', 'metricsAPIZoneTimeBeforeFirstClickGet', 'metricsAPIZoneTimeBeforeFirstTapGet'] } }
      },
      {
        displayName: 'Zoning ID',
        name: 'zoningId',
        type: 'number',
        default: '',
        displayOptions:{ show:{ operation:['metricsAPIZonesList'] } }
      },
      {
        displayName: 'Query Parameters',
        name: 'queryParameters',
        type: 'collection',
        placeholder: 'Add Parameter',
        default:{},
        options:[
          {
            displayName: 'Device',
            name: 'device',
            description: 'Device filter for analysis',
            type: 'options',
            options: [
              {
                name: 'All',
                value: 'all'
              },
              {
                name: 'Desktop',
                value: 'desktop'
              },
              {
                name: 'Mobile',
                value: 'mobile'
              },
              {
                name: 'Tablet',
                value: 'tablet'
              }
            ],
            default: 'all'
          }, 
          {
            displayName: 'End Date',
            name: 'endDate',
            description: 'End of date range for analysis (must be a date after startDate)',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'Format',
            name: 'format',
            description: 'Start date of the query date range',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'Frequency',
            name: 'frequency',
            description: 'To filter based on the export frequency',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'From',
            name: 'from',
            description: 'To filter based on the export format',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'Goal ID',
            name: 'goalId',
            description: 'To return conversion metrics for a non-ecommerce goal',
            type: 'number',
            default: ''
          }, 
          {
            displayName: 'IDs',
            name: 'ids',
            description: 'Filter the results and get a list of segments that matches the IDs provided (multiple IDs should be separated by a comma)',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'Limit',
            name: 'limit',
            description: 'Max number of results to return',
            type: 'number',
            default: 50,
            typeOptions: {
              minValue: 1
            }
          },     
          {
            displayName: 'Metric Type',
            name: 'metricType',
            type: 'options',
            options: [
              {
                name: 'Quantile',
                value: 'Quantile'
              },
              {
                name: 'Average',
                value: 'Average'
              },
            ],
            default: 'Quantile'
          }, 
          {
            displayName: 'Order',
            name: 'order',
            description: 'To change the order of the results list',
            type: 'options',
            options: [
              {
                name: 'Ascending',
                value: 'ASC'
              },
              {
                name: 'Descending',
                value: 'DESC'
              },
            ],
            default: 'DESC'
          }, 
          {
            displayName: 'Page',
            name: 'page',
            description: 'The page of results to retrieve',
            type: 'number',
            default: ''
          }, 
          {
            displayName: 'Period',
            name: 'period',
            description: 'Granularity of the results (can only be used on a date range larger than one day)',
            type: 'options',
            options: [
              {
                name: 'Daily',
                value: 'daily'
              },
              {
                name: 'None',
                value: 'none'
              }
            ],
            default: 'none'
          },
          {
            displayName: 'Project ID',
            name: 'projectId',
            description: 'The target project (required only for an account-level API key)',
            type: 'number',
            default: ''
          }, 
          {
            displayName: 'Quantile',
            name: 'quantile',
            description: 'Default to the 75th percentile of each metric if the metric type is quantile (it is ignored if the metric type is average)',
            type: 'number',
            default: 75
          },  
          {
            displayName: 'Scope',
            name: 'scope',
            description: 'To filter based on the scope',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'Segment IDs',
            name: 'segmentIds',
            description: 'You can specify multiple segments separated by commas to retrieve the metrics for the intersection of the specified segments',
            type: 'number',
            default: ''
          }, 
          {
            displayName: 'Start Date',
            name: 'startDate',
            description: 'Beginning of date range for analysis (must be a date prior to endDate)',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'State',
            name: 'state',
            description: 'To filter based on the status',
            type: 'string',
            default: ''
          },
          {
            displayName: 'To',
            name: 'to',
            description: 'End date of the query date range',
            type: 'string',
            default: ''
          }
        ]
      },
      {
        displayName: 'Request Body',
        name: 'requestBody',
        type: 'json',
	      default: '{}',
        displayOptions:{ show:{ operation:['dataExportAPIExportJobsCreate', 'enrichmentAPISend', 'speedAnalysisAPIAnalysiHARFromAnalysisPost', 'speedAnalysisAPIAnalysisReportPost', 'speedAnalysisAPIEventsCreate', 'speedAnalysisAPIEventsDelete', 'speedAnalysisAPIEventsListPost', 'speedAnalysisAPIMonitoringsLastReportPost', 'speedAnalysisAPIMonitoringsListPost', 'speedAnalysisAPIMonitoringsReportsPost', 'speedAnalysisAPIScenariosHARFromAnalysisPost', 'speedAnalysisAPIScenariosReportPost', 'speedAnalysisAPIScenariosReportsPost', 'speedAnalysisAPIScenariosStepReportPost', 'speedAnalysisAPIScenariosListPost'] } }
      }
		]
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData = [];

		const credentials = await this.getCredentials('contentsquareApi');    
    const { clientId, clientSecret, projectId, scope } = credentials as { clientId: string, clientSecret: string, projectId: string, scope: string };
    if (!clientId || !clientSecret) { throw new ApplicationError('Missing Client ID or Client Secret.'); }

    const authResponse = await this.helpers.request({
      method: 'POST',
      url: 'https://api.contentsquare.com/v1/oauth/token',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        client_id: clientId,
        client_secret: clientSecret,
				grant_type: 'client_credentials',
        scope: scope,
        project_id: projectId
      },
      json: true,
    });

    const accessToken = authResponse?.access_token;
    const endpoint = authResponse?.endpoint;
    if (!accessToken) { throw new ApplicationError('Failed to retrieve access token'); }
    if (!endpoint) { throw new ApplicationError('Failed to retrieve endpoint'); }
		
		// Traitement des opérations
		for (let i = 0; i < items.length; i++) {
			try {		    
       	const operation = this.getNodeParameter('operation', i, '') as string;		
        const resource = this.getNodeParameter('resource', i, '') as string;	
        const jobId = this.getNodeParameter('jobId', i, '') as string;	
        const mappingId = this.getNodeParameter('mappingId', i, '') as string;	
        const pageGroupId = this.getNodeParameter('pageGroupId', i, '') as string;	
        const runId = this.getNodeParameter('runId', i, '') as string;	
        const zoneId = this.getNodeParameter('zoneId', i, '') as string;	
        const zoningId = this.getNodeParameter('zoningId', i, '') as string;	
        const queryParameters = this.getNodeParameter('queryParameters', i, {}) as Record<string, any>;
        const requestBody = this.getNodeParameter('requestBody', i, '') as string;
        
        let url = endpoint;
      
        const queryParams = new URLSearchParams();
        Object.entries(queryParameters).forEach(([key, value]) => {
          if (value !== '') queryParams.append(key, String(value));
        });
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
				
				switch (resource) {
          case 'dataExportAPI':			          
            switch (operation) {
              case 'dataExportAPICustomVariablesList':     
                url += `/v1/custom-vars`;
                break;
              case 'dataExportAPIDynamicVariablesList':
                url += `/v1/dynamic-var-keys${queryString}`;
                break;
              case 'dataExportAPIExportJobsCreate':      
                url += `/v1/exports`;
                break;
              case 'dataExportAPIJobsGet': 
              if (jobId == '') { throw new ApplicationError('Job ID is required'); }	
                url += `/v1/exports/${jobId}`;
                break;
              case 'dataExportAPIExportableFieldsList':
                url += `/v1/exportable-fields${queryString}`;
                break;
              case 'dataExportAPIExportJobsList': 
                url += `/v1/exports${queryString}`;
                break;
              case 'dataExportAPIJobsRunGet':
                if (jobId == '') { throw new ApplicationError('Job ID is required'); }
                if (runId== '') { throw new ApplicationError('Run ID is required'); }	
                url += `/v1/exports/${jobId}/runs/${runId}`;
                break;
              case 'dataExportAPIJobRunsList':
                if (jobId == '') { throw new ApplicationError('Job ID is required'); }	
                url += `/v1/exports/${jobId}/runs`;
                break;
              case 'dataExportAPISuccessfulJobRunsList':
                url += `/v1/exports/successful-runs${queryString}`;
                break;
            }
						break;	
          case 'metricsAPI':			          
            switch (operation) {
              case 'metricsAPIGoalsList':   
                url += `/v1/goals${queryString}`;
                break;
              case 'metricsAPIMappingsList':  
                url += `/v1/mappings${queryString}`;
                break;
              case 'metricsAPIPageActivityRateGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/activity-rate${queryString}`;
                break;
              case 'metricsAPIPageBounceRateGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/bounce-rate${queryString}`;
                break;
              case 'metricsAPIPageConversionRateGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/conversion-rate${queryString}`;
                break;
              case 'metricsAPIPageExitRateGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/exit-rate${queryString}`;
                break;
              case 'metricsAPIPageHeightGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/page-height${queryString}`;
                break;
              case 'metricsAPIPageInteractionTimeGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/interaction-time${queryString}`;
                break;
              case 'metricsAPIPageLandingRateGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/landing-rate${queryString}`;
                break;
              case 'metricsAPIPageList':  
                if (!mappingId) { throw new ApplicationError('Mapping ID is required'); }	
                url += `/v1/mappings/${mappingId}/page-groups${queryString}`;
                break;
              case 'metricsAPIPageMetricsList':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}${queryString}`;
                break;
              case 'metricsAPIPageFoldHeightGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/fold-height${queryString}`;
                break;
              case 'metricsAPIPageScrollRateGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/scroll-rate${queryString}`;
                break;
              case 'metricsAPIPageTimeSpentGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/elapsed-time${queryString}`;
                break;
              case 'metricsAPIPageUniqueVisitsGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/unique-visits${queryString}`;
                break;
              case 'metricsAPIPageViewsGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/views${queryString}`;
                break;
              case 'metricsAPIPageViewsPerVisitGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/views-visits${queryString}`;
                break;
              case 'metricsAPIPageVisitsGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/visits${queryString}`;
                break;
              case 'metricsAPIPageWebVitalsGet':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/metrics/page-group/${pageGroupId}/web-vitals${queryString}`;
                break;
              case 'metricsAPISegmentsList':     
                url += `/v1/segments${queryString}`;
                break;
              case 'metricsAPISiteBounceRateGet': 
                url += `/v1/metrics/site/bounce-rate${queryString}`;
                break;
              case 'metricsAPISiteCartAverageGet':
                url += `/v1/metrics/site/cart-average${queryString}`;
                break;
              case 'metricsAPISiteConversionRateGet':
                url += `/v1/metrics/site/conversion-rate${queryString}`;
                break;
              case 'metricsAPISiteConversionsGet':
                url += `/v1/metrics/site/conversions${queryString}`;
                break;
              case 'metricsAPISiteMetricsList':     
                url += `/v1/metrics/site${queryString}`;
                break;
              case 'metricsAPISitePageviewAverageGet':     
                url += `/v1/metrics/site/pageview-average${queryString}`;
                break;
              case 'metricsAPISiteRevenueGet':     
                url += `/v1/metrics/site/revenue${queryString}`;
                break;
              case 'metricsAPISiteSessionTimeAverageGet':     
                url += `/v1/metrics/site/session-time-average${queryString}`;
                break;
              case 'metricsAPISiteVisitsGet':
                url += `/v1/metrics/site/visits${queryString}`;
                break;
              case 'metricsAPIZoneAttractivenessRateGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/attractiveness-rate${queryString}`;
                break;
              case 'metricsAPIZoneClickRateGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/click-rate${queryString}`;
                break;
              case 'metricsAPIZoneClickRecurrenceGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/click-recurrence${queryString}`;
                break;
              case 'metricsAPIZoneConversionRatePerClickGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/conversion-rate-per-click${queryString}`;
                break;
              case 'metricsAPIZoneConversionRatePerHoverGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/conversion-rate-per-hover${queryString}`;
                break;
              case 'metricsAPIZoneConversionRatePerTapGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/conversion-rate-per-tap${queryString}`;
                break;
              case 'metricsAPIZoneEngagementRateGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/engagement-rate${queryString}`;
                break;
              case 'metricsAPIZoneExposureRateGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/exposure-rate${queryString}`;
                break;
              case 'metricsAPIZoneExposureTimeGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/exposure-time${queryString}`;
                break;
              case 'metricsAPIZoneHesitationTimeGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/hesitation${queryString}`;
                break;
              case 'metricsAPIZoneHoverRateGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/hover-rate${queryString}`;
                break;
              case 'metricsAPIZoneHoverTimeGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/hover-time${queryString}`;
                break;
              case 'metricsAPIZoneMetricsList':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}${queryString}`;
                break;
              case 'metricsAPIZoneNumberOfClicksGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/number-of-clicks${queryString}`;
                break;
              case 'metricsAPIZoneRevenueGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/revenue${queryString}`;
                break;
              case 'metricsAPIZoneRevenuePerClickGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/revenue-per-click${queryString}`;
                break;
              case 'metricsAPIZoneRevenuePerTapGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/revenue-per-tap${queryString}`;
                break;
              case 'metricsAPIZonesList':
                if (zoningId== '') { throw new ApplicationError('Zoning ID is required'); }	
                url += `/v1/zonings/${zoningId}/zones`;
                break;
              case 'metricsAPIZoneSwipeRateGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/swipe-rate${queryString}`;
                break;
              case 'metricsAPIZoneSwipeRateRecurrenceGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/swipe-recurrence${queryString}`;
                break;
              case 'metricsAPIZoneTapRateGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/tap-rate${queryString}`;
                break;
              case 'metricsAPIZoneTapRecurrenceGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/tap-recurrence${queryString}`;
                break;
              case 'metricsAPIZoneTimeBeforeFirstClickGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/time-before-first-click${queryString}`;
                break;
              case 'metricsAPIZoneTimeBeforeFirstTapGet':
                if (zoneId== '') { throw new ApplicationError('Zone ID is required'); }	
                url += `/v1/metrics/zone/${zoneId}/time-before-first-tap${queryString}`;
                break;
              case 'metricsAPIZoningsList':
                if (pageGroupId== '') { throw new ApplicationError('Page Group ID is required'); }	
                url += `/v1/page-groups/${pageGroupId}/zonings`;
                break;
            }
						break;
          case 'speedAnalysisAPI':			          
            switch (operation) {
              case 'speedAnalysisAPIAnalysiHARFromAnalysisPost':  
                url += `/v1/speed-analysis/analysis/har`;
                break;
              case 'speedAnalysisAPIAnalysisReportPost':     
                url += `/v1/speed-analysis/analysis/report`;
                break;
              case 'speedAnalysisAPIEventsCreate': 
                url += `/v1/speed-analysis/event/create`;
                break;
              case 'speedAnalysisAPIEventsDelete': 
                url += `/v1/speed-analysis/event/delete`;
                break;
              case 'speedAnalysisAPIEventsListPost': 
                url += `/v1/speed-analysis/event/list`;
                break;
              case 'speedAnalysisAPIMonitoringsLastReportPost': 
                url += `/v1/speed-analysis/monitoring/last-report`;
                break;
              case 'speedAnalysisAPIMonitoringsListPost':     
                url += `/v1/speed-analysis/monitoring/list`;
                break;
              case 'speedAnalysisAPIMonitoringsReportsPost':    
                url += `/v1/speed-analysis/monitoring/reports`;
                break;
              case 'speedAnalysisAPIScenariosHARFromAnalysisPost':   
                url += `/v1/speed-analysis/scenario/report/har`;
                break;
              case 'speedAnalysisAPIScenariosListPost':   
                url += `/v1/speed-analysis/scenario/list`;
                break;
              case 'speedAnalysisAPIScenariosReportPost':   
                url += `/v1/speed-analysis/scenario/report`;
                break;
              case 'speedAnalysisAPIScenariosReportsPost':   
                url += `/v1/speed-analysis/scenario/reports`;
                break;
              case 'speedAnalysisAPIScenariosStepReportPost':   
                url += `/v1/speed-analysis/scenario/step/report`;
                break;
            }
						break;	
					default:
            throw new NodeOperationError(this.getNode(),`Unknown resource:${resource}`);
				}

        const postOperations = ['Create', 'Delete', 'Post', 'Send'];

        const httpMethod: 'GET' | 'PATCH' | 'POST' | 'DELETE' = operation.endsWith('Delete') ? 'DELETE' :
                                                                operation.endsWith('Patch') ? 'PATCH' :
                                                                postOperations.some(op => operation.endsWith(op)) ? 'POST' : 'GET';

        let body;
        let headers: any = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        };


        if (['DELETE', 'PATCH', 'POST', 'PUT'].includes(httpMethod)) {
          body = JSON.parse(requestBody);
        }

        let requestConf;
        
        requestConf = {
          method: httpMethod,
          url,
          headers,
          ...(body ? { body } : {}),
        };

        console.log('url : ' + url);
        console.log('requestConf : ' + JSON.stringify(requestConf));

        const responseData = await this.helpers.request(requestConf);

        console.log('responseData : ' + responseData);

				if (typeof responseData === 'string') {
          const trimmed = responseData.trim();
          if (trimmed !== '') {
            try {
              returnData.push({ json: JSON.parse(trimmed) });
            } catch (e) {
              returnData.push({ text: trimmed });
            }
          } else {
            returnData.push({ 'Status Code': '204 No Content' });
          }
        } else if (responseData) {
          returnData.push(responseData);
        } else {
          returnData.push({ 'Status Code': '204 No Content' });
        }        

			} catch (error) {
        throw new NodeApiError(this.getNode(), {
          message: `Error calling Contentsquare API: ${error.message}`,
          description: error.stack || 'No stack trace available'
        });
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}