import { NodeInitializer, Node } from "node-red";
import statusChart from "./type";
import path from "path";
import util from "./util";
import { myConst } from "./define";

const nodeInit: NodeInitializer = (RED): void => {

    const DEFALUT_MAKE_GRAPH_BASE: statusChart.makeGraphBase = {
        result: false,
        data: [],
        configs: {
            /* xAxis */
            xTickFormat:            myConst.items.xTickFormat.default,
            startDateTime:          myConst.items.startDateTime.default,
            endDateTime:            myConst.items.endDateTime.default,
            xAxisLabelsFontSize:    myConst.items.xAxisLabelsFontSize.default,
            xAxisLabelslColor:      myConst.items.xAxisLabelslColor.default,
            /* yAxis */
            yAxisLabelsFontSize:    myConst.items.yAxisLabelsFontSize.default,
            yAxisLabelslColor:      myConst.items.yAxisLabelslColor.default,
            /* tooltips */
            timeFormat:             myConst.items.timeFormat.default,
            segmentTooltipContent:  myConst.items.segmentTooltipContent.default,
            /* chart */
            topMargin:              myConst.items.topMargin.default,
            maxLineHeight:          myConst.items.maxLineHeight.default,
            resetZoomLabelFontSize: myConst.items.resetZoomLabelFontSize.default,
            resetZoomLabelColor:    myConst.items.resetZoomLabelColor.default,
            zColorScale:            myConst.items.zColorScale.default,
            /* options */
            enableAnimations:       myConst.items.enableAnimations.default,
            enableDateMarker:       myConst.items.enableDateMarker.default,
        }
    };

    // Holds a reference to node-red-dashboard module.
    // Initialized at #1.
    let ui: any = undefined;

    /**
     *
     *
     * @param {Node} _node
     * @param {statusChart.nodeConf} _config
     * @returns
     */
    function checkConfig(_node: Node, _config: statusChart.nodeConf) {
        const _util: util = util.getInstance();

        // group
        if (!_config || !_config.hasOwnProperty("group")) {
            _node.error(RED._("ui_timelines_chart.error.no-group"));
            return false;
        }

        // [xAxis]tick format, string
        {
            const _propertyName: string = "xTickFormat";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.xTickFormat, _util.REG_EXPRESSTION_TO_MATCH_ONLY.DATETIME_FORMAT_AND_NOT_EMPTY) || (myConst.items.xTickFormat.maxLen < _config.xTickFormat?.length)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.xTickFormat}". This ${_propertyName} was corrected with the default value: "${myConst.items.xTickFormat.default}".`);
                _config.xTickFormat = myConst.items.xTickFormat.default;
            }
        }

        // [xAxis]start date time, string
        {
            const _propertyName: string = "startDateTime";
            if ((!_config.hasOwnProperty(_propertyName) || !_util.isDateTime(_config.startDateTime) || (myConst.items.startDateTime.maxLen < _config.startDateTime?.length)) && ( "" !== _config.startDateTime )) {
                _node.error(`Incorrect ${_propertyName} value :"${_config.startDateTime}".`);
                return false;
            }
        }

        // [xAxis]end date time, string
        {
            const _propertyName: string = "endDateTime";
            if ((!_config.hasOwnProperty(_propertyName) || !_util.isDateTime(_config.endDateTime) || (myConst.items.endDateTime.maxLen < _config.endDateTime?.length)) && ( "" !== _config.endDateTime )) {
                _node.error(`Incorrect ${_propertyName} value :"${_config.endDateTime}".`);
                return false;
            }
        }

        // [xAxis]labels font size, number
        {
            const _propertyName: string = "xAxisLabelsFontSize";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.xAxisLabelsFontSize, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (myConst.items.xAxisLabelsFontSize.minNum > _config.xAxisLabelsFontSize || myConst.items.xAxisLabelsFontSize.maxNum < _config.xAxisLabelsFontSize)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.xAxisLabelsFontSize}". This ${_propertyName} was corrected with the default value: "${myConst.items.xAxisLabelsFontSize.default}".`);
                _config.xAxisLabelsFontSize = myConst.items.xAxisLabelsFontSize.default;
            }
        }

        // [xAxis]labels color, string
        {
            const _propertyName: string = "xAxisLabelslColor";
            if (!_config.hasOwnProperty(_propertyName) || (myConst.items.xAxisLabelslColor.maxLen < _config.xAxisLabelslColor?.length) || ("" === _config.xAxisLabelslColor) || (_config.xAxisLabelslColor == null) ){
                _node.warn(`Incorrect ${_propertyName} value :"${_config.xAxisLabelslColor}". This ${_propertyName} was corrected with the default value: "${myConst.items.xAxisLabelslColor.default}".`);
                _config.xAxisLabelslColor = myConst.items.xAxisLabelslColor.default;
            }
        }

        // [yAxis]labels font size: number
        {
            const _propertyName: string = "yAxisLabelsFontSize";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.yAxisLabelsFontSize, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (myConst.items.yAxisLabelsFontSize.minNum > _config.yAxisLabelsFontSize || myConst.items.yAxisLabelsFontSize.maxNum < _config.yAxisLabelsFontSize)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.yAxisLabelsFontSize}". This ${_propertyName} was corrected with the default value: "${myConst.items.yAxisLabelsFontSize.default}".`);
                _config.yAxisLabelsFontSize = myConst.items.yAxisLabelsFontSize.default;
            }
        }

        // [yAxis]labels color: string
        {
            const _propertyName: string = "yAxisLabelslColor";
            if (!_config.hasOwnProperty(_propertyName) || (myConst.items.yAxisLabelslColor.maxLen < _config.yAxisLabelslColor?.length) || ("" === _config.yAxisLabelslColor) || (_config.yAxisLabelslColor == null) ){
                _node.warn(`Incorrect ${_propertyName} value :"${_config.yAxisLabelslColor}". This ${_propertyName} was corrected with the default value: "${myConst.items.yAxisLabelslColor.default}".`);
                _config.yAxisLabelslColor = myConst.items.yAxisLabelslColor.default;
            }
        }

        // [chart]reset zoom label font size: number
        {
            const _propertyName: string = "resetZoomLabelFontSize";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.resetZoomLabelFontSize, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (myConst.items.resetZoomLabelFontSize.minNum > _config.resetZoomLabelFontSize || myConst.items.resetZoomLabelFontSize.maxNum < _config.resetZoomLabelFontSize)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.resetZoomLabelFontSize}". This ${_propertyName} was corrected with the default value: "${myConst.items.resetZoomLabelFontSize.default}".`);
                _config.resetZoomLabelFontSize = myConst.items.resetZoomLabelFontSize.default;
            }
        }

        // [chart]reset zoom label color: string
        {
            const _propertyName: string = "resetZoomLabelColor";
            if (!_config.hasOwnProperty(_propertyName) || (myConst.items.resetZoomLabelColor.maxLen < _config.resetZoomLabelColor?.length) || ("" === _config.resetZoomLabelColor) || (_config.resetZoomLabelColor == null) ){
                _node.warn(`Incorrect ${_propertyName} value :"${_config.resetZoomLabelColor}". This ${_propertyName} was corrected with the default value: "${myConst.items.resetZoomLabelColor.default}".`);
                _config.resetZoomLabelColor = myConst.items.resetZoomLabelColor.default;
            }
        }


        // [tooltips]time format: string
        {
            const _propertyName: string = "timeFormat";
            if (!_config.hasOwnProperty(_propertyName) || (myConst.items.timeFormat.maxLen < _config.timeFormat?.length) || ("" === _config.timeFormat) || (_config.timeFormat == null) ){
                    _node.warn(`Incorrect ${_propertyName} value :"${_config.timeFormat}". This ${_propertyName} was corrected with the default value: "${myConst.items.timeFormat.default}".`);
                _config.timeFormat = myConst.items.timeFormat.default;
            }
        }

        // [tooltips]segment tooltip content: string
        {
            const _propertyName: string = "segmentTooltipContent";
            if (!_config.hasOwnProperty(_propertyName) || (myConst.items.segmentTooltipContent.maxLen < _config.segmentTooltipContent?.length) || ("" === _config.segmentTooltipContent) || (_config.segmentTooltipContent == null) ){
                // _node.warn(`Incorrect ${_propertyName} value :"${_config.segmentTooltipContent}". This ${_propertyName} was corrected with the default value: "${myConst.items.segmentTooltipContent.default}".`);
                _config.segmentTooltipContent = myConst.items.segmentTooltipContent.default;
            }
        }

        // [options]enable animations: boolean
        {
            const _propertyName: string = "enableAnimations";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.enableAnimations, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_BOOLEAN_AND_NOT_EMPTY)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.enableAnimations}". This ${_propertyName} was corrected with the default value: "${myConst.items.enableAnimations.default}".`);
                _config.enableAnimations = myConst.items.enableAnimations.default;
            }
        }

        // [options]enable date marker: boolean
        {
            const _propertyName: string = "enableDateMarker";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.enableDateMarker, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_BOOLEAN_AND_NOT_EMPTY)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.enableDateMarker}". This ${_propertyName} was corrected with the default value: "${myConst.items.enableDateMarker.default}".`);
                _config.enableDateMarker = myConst.items.enableDateMarker.default;
            }
        }

        // [options]forward input messages: boolean
        {
            const _propertyName: string = "forwardInputMessages";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.forwardInputMessages, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_BOOLEAN_AND_NOT_EMPTY)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.forwardInputMessages}". This ${_propertyName} was corrected with the default value: "${myConst.items.forwardInputMessages.default}".`);
                _config.forwardInputMessages = myConst.items.forwardInputMessages.default;
            }
        }

        // [chart]line height: number
        {
            const _propertyName: string = "maxLineHeight";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.maxLineHeight, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (myConst.items.maxLineHeight.minNum > _config.maxLineHeight || myConst.items.maxLineHeight.maxNum < _config.maxLineHeight)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.maxLineHeight}". This ${_propertyName} was corrected with the default value: "${myConst.items.maxLineHeight.default}".`);
                _config.maxLineHeight = myConst.items.maxLineHeight.default;
            }
        }

        // [chart]top margin: number
        {
            const _propertyName: string = "topMargin";
            if (!_config.hasOwnProperty(_propertyName) || !_util.isRegExp(_config.topMargin, _util.REG_EXPRESSTION_TO_MATCH_ONLY.HALF_NUMBER_AND_NOT_EMPTY) || (myConst.items.topMargin.minNum > _config.topMargin || myConst.items.topMargin.maxNum < _config.topMargin)) {
                _node.warn(`Incorrect ${_propertyName} value :"${_config.topMargin}". This ${_propertyName} was corrected with the default value: "${myConst.items.topMargin.default}".`);
                _config.topMargin = myConst.items.topMargin.default;
            }
        }

        return true;
    }

    /**
     *
     *
     * @param {number} [digits=1000]
     * @returns {string}
     */
    function getUniqueId(digits: number = 1000): string {
        var strong = typeof digits !== 'undefined' ? digits : 1000;
        return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16);
    };

    /**
     * make html
     *
     * @param {statusChart.nodeConf} _config
     * @returns {string}
     */
    function makeHTML(_config: statusChart.nodeConf): string {
        // debug
        // console.log(`makeHTML id:${_config.graphItems.uniqueId}`);
        // debug

        const _configAsJson = JSON.stringify(_config);

        // const _loadScripts = String.raw`
        // <script src='ui-timelines-chart/js/timelines-chart.min.js'></script>
        // <script src='ui-timelines-chart/js/moment.min.js'></script>
        // <script src='ui-timelines-chart/js/utility.js'></script>
        // `;

        const _html = String.raw`
        <div class='container-${_config.uniqueId}' align='center'>
            <!-- タイトル表示 -->
            <div class='graph-title-${_config.uniqueId}'>${_config.label}</div>
            <!-- グラフ表示 -->
            <div ng-init='init(${_configAsJson})' id='${_config.uniqueId}'></div>
        </div>
        `;

        const _css = String.raw`
        <!-- <style title="${_config.uniqueId}"> -->
        <style>
        .container-${_config.uniqueId} {
            width:100%;
            padding: 0;
            margin: 0;
            font-size: 24px;
        }
        .container-${_config.uniqueId} .graph-title-${_config.uniqueId} {
            padding: 10px 0 10px 0;
            font-size:32px;
        }
        .container-${_config.uniqueId} .timelines-chart .reset-zoom-btn {
            font-size: ${_config.resetZoomLabelFontSize}px !important;
            fill: ${_config.resetZoomLabelColor} !important;
        }
        .container-${_config.uniqueId} .timelines-chart .axises .x-axis text,
        .container-${_config.uniqueId} .brusher .tick text {
            font-size: ${_config.xAxisLabelsFontSize}px !important;
            fill: ${_config.xAxisLabelslColor} !important;
        }
        .container-${_config.uniqueId} .timelines-chart .axises .y-axis text,
        .container-${_config.uniqueId} .timelines-chart .axises .grp-axis text {
            font-size: ${_config.yAxisLabelsFontSize}px !important;
            fill: ${_config.yAxisLabelslColor} !important;
        }
        <\style>
        `;

        return String.raw`
            ${_html}
            ${_css}
        `
    }

    /**
     * Node initialization function
     *
     * @param {Node} this
     * @param {statusChart.nodeConf} _config
     */
    function initWidget(this: Node, _config: statusChart.nodeConf): void {
        const _node: Node = this;
        let _done: any = null;
        let _graphObjects:statusChart.makeGraphBase = DEFALUT_MAKE_GRAPH_BASE;
        try {

            if(ui === undefined) {
                // #1: Load node-red-dashboard module.
                // Should use RED.require API to cope with loading different
                // module.  And it should also be executed at node
                // initialization time to be loaded after initialization of
                // node-red-dashboard module.
                // 
                ui = RED.require("node-red-dashboard")(RED);
            }
            // Initialize node
            RED.nodes.createNode(this, _config);

            if (checkConfig(_node, _config)) {

                let _group: any = RED.nodes.getNode(_config?.group);
                // console.log(`config.width: ${config.width}, config.height: ${config.height}`);

                // widget width
                let _width: number = myConst.items.widgetWidth.default;  //default
                if(0 < Number(_config?.width)) {
                    _width = Number(_config.width);
                } else if(0 < Number(_group?.config?.width)) {
                    _width = Number(_group.config.width);
                }

                // widget height
                let _height: number = myConst.items.widgetWidth.default;  //default
                if(0 < Number(_config?.height)) {
                    _height = Number(_config.height);
                }

                // Generate uniqueId
                _config.uniqueId = getUniqueId();

                // Generate HTML/Angular code
                let _html = makeHTML(_config);

                //console.log("config:", _config);

                // Initialize Node-RED Dashboard widget
                // see details: https://github.com/node-red/node-red-ui-nodes/blob/master/docs/api.md
                //  #  name[*-optioal] ----------- description --------------------------------------
                //  1. node*                       制御ノード。スコープが「グローバル」の場合はオプション。
                //  2. format                      ウィジェットのHTMLコード。テンプレートダッシュボードウィジェットノードと同じHTMLを受け入れます。
                //  3. group*                      ィジェットが属するグループノードオブジェクト
                //  4. width*                      ウィジェットの幅
                //  5. height*                     ウィジェットの高さ
                //  6. templateScope               ウィジェットのスコープ（「グローバル」または「ローカル」）
                //  7. EmmitOnlyNewValues*         変更された場合はメッセージを送信する
                //  8. forwardInputMessages*       入力メッセージを出力に転送する
                //  9. storeFrontEndInputAsState*  受信したメッセージを保存する
                // 10. convert*                    値をフロントエンドに変換するためのコールバック
                // 11. beforeEmit*                 メッセージを準備するためのコールバック
                // 12. convertBack*                送信されたメッセージを変換するためのコールバック
                // 13. beforeSend*                 メッセージを準備するためのコールバック
                // 14. order                       グループで注文する
                // 15. initController*             コントローラで初期化するコールバック                
                _done = ui.addWidget({
                    node: _node,              // controlling node
                    format: _html,            // HTML/Angular code
                    group: _config.group,     // belonging Dashboard group
                    width: _width,            // width of widget
                    height: _height,          // height of widget
                    templateScope: "local",   // scope of HTML/Angular(local/global)*
                    order: _config.order,     // order
                    emitOnlyNewValues: myConst.items.emitOnlyNewValues.default,  // send message if changed
                    forwardInputMessages: _config.forwardInputMessages,    // forward input messages to output
                    storeFrontEndInputAsState: myConst.items.storeFrontEndInputAsState.default,    // store received message
                    convertBack: function (_value: statusChart.graphData) { // callback to convert value to front-end
                        return _value;
                    },
                    beforeEmit: function(_msg: statusChart.inputNodeMsg, _value: statusChart.graphData): { msg: statusChart.makeGraphBase } {
                        _graphObjects = makeGraph(_node, _config, _msg);
                        /* debug */
                        // console.log(_config);
                        // console.log(_graphObjects);
                        /* debug */
                        return { msg: _graphObjects };
                    },
                    beforeSend: function (_msg: statusChart.inputNodeMsg, _original: {msg:statusChart.inputNodeMsg}) {
                        if(_msg) {
                            _msg.payload = <any>_graphObjects;
                            return _msg;
                        }
                        // if (_original) { return _original.msg; }
                    },
                    initController: function($scope: any, events: any) {
                        // Remark: all client-side functions should be added here!  
                        // If added above, it will be server-side functions which are not available at the client-side ...
                        // console.log('initController');

                        const loadScripts: { name: string, path: string}[] = [
                            {
                                name: 'timelines-chart',
                                path: 'ui-timelines-chart/js/timelines-chart.min.js'
                            },
                            {
                                name: 'moment',
                                path: 'ui-timelines-chart/js/moment.min.js'
                            },
                            {
                                name: 'utility',
                                path: 'ui-timelines-chart/js/utility.js'
                            }
                        ];

                        $scope.loadedScripts = false;
                        $scope.staticScriptId = "";
                        $scope.dynamicScriptId = "";
                        $scope.elementDynamicScriptId = null;
                        $scope.elementStaticScriptId = null;
                        $scope.valueId = Date.now().toString(16) + Math.floor(1000 * Math.random()).toString(16);
 
                        /**
                         * update: chart
                         *
                         * @param {statusChart.makeGraphBase} msg
                         * @returns {boolean}
                         */
                        function update(msg: statusChart.makeGraphBase): boolean {
                            // console.log('update');
                            try {

                                // timelines chart: static script
                                loadStaticScript();

                                // timelines chart: dynamic script
                                loadDynamicScript(msg);

                                return true;
                            } catch (error) {
                                console.log(error);
                                return false;
                            }
                        }

                        /**
                         * loadStaticScript()
                         *
                         * @returns {void}
                         */
                        function loadStaticScript(): void {
                            // console.log('timelines chart: static script $scope.uniqueId:' + String($scope.uniqueId));

                            const _staticScript: HTMLElement | null = document.getElementById($scope.staticScriptId);
                            if( null === _staticScript ){
                                // console.log(`create static timelines-chart $scope.staticScriptId:${$scope.staticScriptId}`);

                                const _createStatcScript = document.createElement('script');
                                _createStatcScript.type = 'text/javascript';
                                _createStatcScript.id = $scope.staticScriptId;
                                _createStatcScript.innerHTML = String.raw`
                                // const styleSheet${$scope.valueId} = utility.getStyleSheet('${$scope.uniqueId}');
                                const timelinesChart${$scope.valueId} = {
                                    instance: TimelinesChart()(document.getElementById('${$scope.uniqueId}')),
                                    currentZoomX: [],
                                    currentZoomY: [],
                                    ruleStylexAxisLabels: utility.getStyleRule('.container-${$scope.uniqueId} .timelines-chart .axises .x-axis text, .container-${$scope.uniqueId} .brusher .tick text'),
                                    ruleStyleyAxisLabels: utility.getStyleRule('.container-${$scope.uniqueId} .timelines-chart .axises .y-axis text, .container-${$scope.uniqueId} .timelines-chart .axises .grp-axis text'),
                                    ruleStyleResetZoomLabel: utility.getStyleRule('.container-${$scope.uniqueId} .timelines-chart .reset-zoom-btn')
                                }
                                // console.log("styleSheet${$scope.uniqueId}:", styleSheet${$scope.uniqueId});
                                // console.log("timelinesChart${$scope.uniqueId}.ruleStylexAxisLabels :", timelinesChart${$scope.uniqueId}.ruleStylexAxisLabels);
                                // console.log("timelinesChart${$scope.uniqueId}.ruleStyleyAxisLabels :", timelinesChart${$scope.uniqueId}.ruleStyleyAxisLabels);
                                // console.log("timelinesChart${$scope.uniqueId}.ruleStyleResetZoomLabel :", timelinesChart${$scope.uniqueId}.ruleStyleResetZoomLabel);
                                `;
                                $scope.parent.appendChild(_createStatcScript);
                                $scope.elementStaticScriptId = _createStatcScript;
                            }
                        }

                        /**
                         * loadDynamicScript()
                         *
                         * @param {statusChart.makeGraphBase} msg
                         */
                        function loadDynamicScript(msg: statusChart.makeGraphBase): void {
                            // console.log('timelines chart: dynamic script $scope.uniqueId:' + String($scope.uniqueId));

                            const _dynamicScript: HTMLElement | null = document.getElementById($scope.dynamicScriptId);
                            if( null !== _dynamicScript ){
                                // console.log(`update dynamic timelines-chart $scope.dynamicScriptId:${$scope.dynamicScriptId}`);
                                _dynamicScript.remove();
                            }

                            const _createDynamicScript = document.createElement('script');
                            _createDynamicScript.type = 'text/javascript';
                            _createDynamicScript.id = $scope.dynamicScriptId;
                            _createDynamicScript.innerHTML = String.raw`
                            {
                                const _chartobj = timelinesChart${$scope.valueId};
                                if(_chartobj){
                                    /* css */
                                    _chartobj.ruleStylexAxisLabels.style.cssText    = 'font-size: ${msg.configs.xAxisLabelsFontSize}px !important; fill: ${msg.configs.xAxisLabelslColor} !important';
                                    _chartobj.ruleStyleyAxisLabels.style.cssText    = 'font-size: ${msg.configs.yAxisLabelsFontSize}px !important; fill: ${msg.configs.yAxisLabelslColor} !important';
                                    _chartobj.ruleStyleResetZoomLabel.style.cssText = 'font-size: ${msg.configs.resetZoomLabelFontSize}px !important; fill: ${msg.configs.resetZoomLabelColor} !important';

                                    /* chart */
                                    _chartobj.instance
                                        .data(${JSON.stringify(msg.data)})
                                        .width(${$scope.parent.clientWidth})
                                        // .maxHeight(${$scope.parent.clientHeight})
                                        .maxLineHeight(${msg.configs.maxLineHeight.toString()})
                                        .topMargin(${msg.configs.topMargin.toString()})
                                        .rightMargin(90)
                                        .leftMargin(90)
                                        .bottomMargin(40)
                                        .xTickFormat(n => moment(n).format('${msg.configs.xTickFormat}'))
                                        .timeFormat('${msg.configs.timeFormat}')
                                        .segmentTooltipContent('${msg.configs.segmentTooltipContent}')
                                        .zQualitative(true)
                                        .enableOverview(true)
                                        .enableAnimations(${msg.configs.enableAnimations})
                                        .dateMarker(${msg.configs.enableDateMarker ? 'new Date()' : 'null'})
                                        .zoomX((_chartobj.currentZoomX?.length) ? _chartobj.currentZoomX : [moment('${msg.configs.startDateTime}'), moment('${msg.configs.endDateTime}')])
                                        .zoomY((_chartobj.currentZoomY?.length) ? _chartobj.currentZoomY : [])
                                        .onZoom((x,y)=>{ _chartobj.currentZoomX=x; _chartobj.currentZoomY=y; })
                                        .overviewDomain([moment('${msg.configs.startDateTime}'), moment('${msg.configs.endDateTime}')])
                                        .zColorScale().range(${JSON.stringify(msg.configs.zColorScale.range)}).domain(${JSON.stringify(msg.configs.zColorScale.domain)})
                                }
                            }
                            `;
                            $scope.parent.appendChild(_createDynamicScript);
                            $scope.elementDynamicScriptId = _createDynamicScript;
                        }

                        /**
                         * loadScript
                         *
                         * @param {string} _id
                         * @param {string} _path
                         */
                        function loadScript(_id: string, _path: string): void {
                            // console.log('loadscript', _path);

                            const _head = document.getElementsByTagName('head')[0];
                            const _script = document.createElement('script');
                            _script.type = 'text/javascript';
                            _script.id = _id;
                            _script.src = _path;
                            _script.async = false;
                            _head.appendChild(_script);
                            _script.onload = function () {
                                try {
                                    // console.log(`script loaded. id:${_id}`);
                                    _script.setAttribute('data-inited', "true");
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }

                        /**
                         * isLoadedScript
                         *
                         * @returns {boolean}
                         */
                        function isLoadedScript(): boolean {
                            let _result: boolean = true;
                            for( let _idx = 0; _idx < loadScripts.length ; _idx++ ) {
                                let _attribute = document.getElementById(loadScripts[_idx].name)?.getAttribute('data-inited') || "false";
                                if ("true" !== _attribute) {
                                    // console.log(`script not loaded. name:${loadScripts[_idx].name}`);
                                    _result = false;
                                    break;
                                }
                            }
                            return _result;
                        }

                        /**
                         * $scope.init
                         *
                         * @param {statusChart.nodeConf} config
                         * @returns void
                         */
                        $scope.init = function (config: statusChart.nodeConf): void {
                            // console.log('$scope.init');
                            $scope.config = config;
                            $scope.uniqueId = config.uniqueId;

                            loadScripts.forEach(function(_elem: { name:string, path:string }, _index: number) {
                                if (!document.getElementById(_elem.name)) {
                                    // console.log(`loadScript index:${_index} name:${_elem.name} id:${$scope.uniqueId}`);
                                    loadScript(_elem.name, _elem.path);
                                }
                            });

                            $scope.parent = document.getElementById($scope.uniqueId);
                            $scope.staticScriptId = "script_static_" + $scope.uniqueId;
                            $scope.dynamicScriptId = "script_dynamic_" + $scope.uniqueId;

                            // console.log(`$scope.uniqueId: ${$scope.uniqueId}`);
                            // console.log(`$scope.parent: ${$scope.parent}`);
                            // console.log(`$scope.staticScriptId: ${$scope.staticScriptId}`);
                            // console.log(`$scope.dynamicScriptId: ${$scope.dynamicScriptId}`);
                        }

                        /**
                         * $scope.$watch
                         *
                         * @param {statusChart.makeGraphBase} msg
                         * @returns void
                         */
                        $scope.$watch('msg', function (msg: statusChart.makeGraphBase): void {
                            // console.log('$scope.$watch');
                            if (!msg) {
                                return
                            }

                            if (false === $scope.loadedScripts){
                                if(true !== isLoadedScript()){
                                    return;
                                }
                                $scope.loadedScripts = true;
                            }

                            if (msg.result === true) {
                                setTimeout( function() { update(msg) }, 100 );
                                // update(msg)
                            }
                        })

                        $scope.$on('$destroy', function () {
                            // console.log('$scope.$on $destroy');

                            if(null !== $scope.elementDynamicScriptId){
                                // console.log(`destroy: element dynamicScript id:${$scope.uniqueId}`);
                                $scope.elementDynamicScriptId.remove();
                            }

                            if(null !== $scope.elementStaticScriptId){
                                // console.log(`destroy: element staticScript id:${$scope.uniqueId}`);
                                $scope.elementStaticScriptId.remove();
                            }

                        })
                    }
                });
            } else {
                throw new Error(`The "config" is incorrect.`);
            }
        }
        catch (_error) {
            _node.status({fill:"red", shape:"ring", text:"resources.message.error"});
            _node.error(_error);
        }
        _node.on("close", function() {
            if (_done) {
                // finalize widget on close
                _done();
            }
        });
    }
    
    /**
     * makeGraph
     *
     * @param {Node} _node
     * @param {statusChart.nodeConf} _config
     * @param {statusChart.inputNodeMsg} _msg
     * @returns {statusChart.makeGraphBase}
     */
    function makeGraph(_node: Node, _config: statusChart.nodeConf, _msg: statusChart.inputNodeMsg): statusChart.makeGraphBase {
        try {

            // 処理開始
            _node.status({fill:"blue", shape:"dot", text:"resources.message.connect"});

            // グラフ描画用データ
            if(typeof _msg.payload.dataItems !== 'object' || 0 >= _msg.payload?.dataItems?.length ) {
                throw new Error("data not found.");
            }
            const _graphData: statusChart.graphData[] = _msg.payload.dataItems;

            // configs(priority: input > node property)
            const _createConf = {
            /*  values                  node-in: msg.payload.settings                           node-property                             default                          */
                xTickFormat:            _msg.payload?.settings?.xAxis?.xTickFormat              ?? _config.xTickFormat              ?? myConst.items.xTickFormat.default,
                xAxisLabelsFontSize:    _msg.payload?.settings?.xAxis?.labelsFontSize           ?? _config.xAxisLabelsFontSize      ?? myConst.items.xAxisLabelsFontSize.default,
                xAxisLabelslColor:      _msg.payload?.settings?.xAxis?.labelsColor              ?? _config.xAxisLabelslColor        ?? myConst.items.xAxisLabelslColor.default,
                startDateTime:          _msg.payload?.settings?.xAxis?.startDateTime            ?? _config.startDateTime            ?? myConst.items.startDateTime.default,
                endDateTime:            _msg.payload?.settings?.xAxis?.endDateTime              ?? _config.endDateTime              ?? myConst.items.endDateTime.default,
                yAxisLabelsFontSize:    _msg.payload?.settings?.yAxis?.labelsFontSize           ?? _config.yAxisLabelsFontSize      ?? myConst.items.yAxisLabelsFontSize.default,
                yAxisLabelslColor:      _msg.payload?.settings?.yAxis?.labelsColor              ?? _config.yAxisLabelslColor        ?? myConst.items.yAxisLabelslColor.default,
                timeFormat:             _msg.payload?.settings?.tooltips?.timeFormat            ?? _config.timeFormat               ?? myConst.items.timeFormat,
                segmentTooltipContent:  _msg.payload?.settings?.tooltips?.segmentTooltipContent ?? _config.segmentTooltipContent    ?? myConst.items.segmentTooltipContent,
                resetZoomLabelFontSize: _msg.payload?.settings?.chart.resetZoom?.labelFontSize  ?? _config.resetZoomLabelFontSize   ?? myConst.items.resetZoomLabelFontSize.default,
                resetZoomLabelColor:    _msg.payload?.settings?.chart.resetZoom?.labelColor     ?? _config.resetZoomLabelColor      ?? myConst.items.resetZoomLabelColor.default,
                maxLineHeight:          _msg.payload?.settings?.chart?.height                   ?? _config.maxLineHeight            ?? myConst.items.maxLineHeight.default,
                topMargin:              _msg.payload?.settings?.chart?.topMargin                ?? _config.topMargin                ?? myConst.items.topMargin.default,
                lineColors:             _msg.payload?.settings?.chart?.lineColors               ?? _config.lineColors               ?? myConst.items.lineColors.default,
                enableAnimations:       _msg.payload?.settings?.options?.enableAnimations       ?? _config.enableAnimations         ?? myConst.items.enableAnimations.default,
                enableDateMarker:       _msg.payload?.settings?.options?.enableDateMarker       ?? _config.enableDateMarker         ?? myConst.items.enableDateMarker.default,
            }

            // 設定：開始日時(X軸)
            let _startDateTime:string = _createConf.startDateTime;
            if( myConst.items.startDateTime.default === _startDateTime ){
                let _min = "";
                _graphData.forEach((_ele, _idx) => {
                    _ele.data.forEach((_ele, _idx) => {
                        let _temp = _ele.data.reduce(function (a, b) { return a.timeRange[0] < b.timeRange[0] ? a : b; }).timeRange[0];
                        _min = (( "" === _min || _min > _temp) ? _temp : _min);
                    })
                })
                _startDateTime = _min;
            }
            // console.log(`_startDateTime: in:${_createConf.startDateTime} out:${_startDateTime}`);

            // 設定： 終了日時(X軸)
            let _endDateTime:string = _createConf.endDateTime;
            if( myConst.items.endDateTime.default === _endDateTime ){
                let _max = "";
                _graphData.forEach((_ele, _idx) => {
                    _ele.data.forEach((_ele, _idx) => {
                        let _temp = _ele.data.reduce(function (a, b) { return a.timeRange[1] > b.timeRange[1] ? a : b; }).timeRange[1];
                        _max = (( "" === _max || _max < _temp) ? _temp : _max);
                    });
                });
                _endDateTime = _max;
            }
            // console.log(`_endDateTime: in:${_createConf.endDateTime} out:${_endDateTime}`);

            // 設定：グラフ凡例
            let _zColorScale: statusChart.zColorScaleObject = { range:[], domain:[] };
            if( 0 < _createConf.lineColors.length ){
                _createConf.lineColors.forEach((_ele, _idx) => {
                    _zColorScale.range.push(_ele.statusColor);
                    _zColorScale.domain.push(_ele.statusValue);
                });
            }

            // 処理完了
            _node.status({fill:"green", shape:"dot", text:"resources.message.complete"});

            return {
                result : true,
                data : _graphData,
                configs:{
                    /* xAxis */
                    xTickFormat:            _createConf.xTickFormat,
                    xAxisLabelsFontSize:    _createConf.xAxisLabelsFontSize,
                    xAxisLabelslColor:      _createConf.xAxisLabelslColor,
                    startDateTime:          _startDateTime,
                    endDateTime:            _endDateTime,
                    /* yAxis */
                    yAxisLabelsFontSize:    _createConf.yAxisLabelsFontSize,
                    yAxisLabelslColor:      _createConf.yAxisLabelslColor,
                    /* tooltips */
                    timeFormat:             _createConf.timeFormat,
                    segmentTooltipContent:  _createConf.segmentTooltipContent,
                    /* chart */
                    resetZoomLabelFontSize: _createConf.resetZoomLabelFontSize,
                    resetZoomLabelColor:    _createConf.resetZoomLabelColor,
                    maxLineHeight:          _createConf.maxLineHeight,
                    topMargin:              _createConf.topMargin,
                    zColorScale:            _zColorScale,
                    /* options */
                    enableAnimations:       _createConf.enableAnimations,
                    enableDateMarker:       _createConf.enableDateMarker,
                }
            };
        } catch (_error) {
            _node.status({fill:"red", shape:"ring", text:"resources.message.error"});
            _node.error(_error);
            return DEFALUT_MAKE_GRAPH_BASE;
        }
    }

    RED.nodes.registerType('ui_timelines_chart', initWidget);

    let _uipath = 'ui'
    if (RED.settings.ui) {
        _uipath = RED.settings.ui.path
    }

    let _fullPath = path.join('/', _uipath, '/ui-timelines-chart/*').replace(/\\/g, '/')
    RED.httpNode.get(_fullPath, function (req, res) {
        var options = {
            root: __dirname + '/lib/',
            dotfiles: 'deny'
        }
        res.sendFile(req.params[0], options)
    })
};

export = nodeInit;
