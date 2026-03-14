(function(){
var translateObjs = {};
function trans(a, b) {
    var c = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    return translateObjs[c[0x0]] = c, '';
}
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a]);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"children":["this.MainViewer","this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F"],"scrollBarColor":"#000000","backgroundColorRatios":[0],"top":198.95,"id":"rootPlayer","buttonToggleFullscreen":"this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","data":{"locales":{"en":"locale/en.txt"},"defaultLocale":"en","name":"Player453","displayTooltipInTouchScreens":true,"history":{},"textToSpeechConfig":{"pitch":1,"speechOnInfoWindow":false,"volume":1,"speechOnQuizQuestion":false,"stopBackgroundAudio":false,"speechOnTooltip":false,"rate":1}},"backgroundColor":["#FFFFFF"],"scripts":{"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"mixObject":TDV.Tour.Script.mixObject,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"getMediaByName":TDV.Tour.Script.getMediaByName,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"clone":TDV.Tour.Script.clone,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"showPopupImage":TDV.Tour.Script.showPopupImage,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"setValue":TDV.Tour.Script.setValue,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"getComponentByName":TDV.Tour.Script.getComponentByName,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"getKey":TDV.Tour.Script.getKey,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"historyGoBack":TDV.Tour.Script.historyGoBack,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"resumePlayers":TDV.Tour.Script.resumePlayers,"getPixels":TDV.Tour.Script.getPixels,"unregisterKey":TDV.Tour.Script.unregisterKey,"openLink":TDV.Tour.Script.openLink,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"disableVR":TDV.Tour.Script.disableVR,"initAnalytics":TDV.Tour.Script.initAnalytics,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"getOverlays":TDV.Tour.Script.getOverlays,"downloadFile":TDV.Tour.Script.downloadFile,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"quizShowScore":TDV.Tour.Script.quizShowScore,"setMapLocation":TDV.Tour.Script.setMapLocation,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"startMeasurement":TDV.Tour.Script.startMeasurement,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"init":TDV.Tour.Script.init,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"existsKey":TDV.Tour.Script.existsKey,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"quizStart":TDV.Tour.Script.quizStart,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"enableVR":TDV.Tour.Script.enableVR,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"isPanorama":TDV.Tour.Script.isPanorama,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getMainViewer":TDV.Tour.Script.getMainViewer,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"showWindow":TDV.Tour.Script.showWindow,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"playAudioList":TDV.Tour.Script.playAudioList,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"cloneBindings":TDV.Tour.Script.cloneBindings,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"createTween":TDV.Tour.Script.createTween,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"quizFinish":TDV.Tour.Script.quizFinish,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"registerKey":TDV.Tour.Script.registerKey,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"executeJS":TDV.Tour.Script.executeJS,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"historyGoForward":TDV.Tour.Script.historyGoForward,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"translate":TDV.Tour.Script.translate,"textToSpeech":TDV.Tour.Script.textToSpeech,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"initQuiz":TDV.Tour.Script.initQuiz,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"toggleVR":TDV.Tour.Script.toggleVR,"setLocale":TDV.Tour.Script.setLocale,"shareSocial":TDV.Tour.Script.shareSocial},"left":237.5,"layout":"absolute","start":"this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","propagateClick":false,"minWidth":0,"gap":10,"minHeight":0,"class":"Player","watermark":false,"height":"100%","scrollBarMargin":2,"defaultMenu":["fullscreen","mute","rotation"],"hash": "ff4623016ab321d877b021e0e54e29d30ee2f9dc99e4318510d25fcd2de3185e", "definitions": [{"id":"FadeOutEffect_F353FDB0_E517_2105_41E6_8A18C344227B","easing":"cubic_in_out","class":"FadeOutEffect"},{"id":"FadeInEffect_370F8A95_38BC_EB15_4190_7E585BB95B9E","easing":"cubic_in_out","class":"FadeInEffect"},{"selectedFontColor":"#FFFFFF","distance":2,"class":"Menu","fontColor":"#FFFFFF","opacity":0.4,"selectedBackgroundColor":"#202020","backgroundColor":"#404040","rollOverFontColor":"#FFFFFF","children":["this.menuItem_F256C041_E575_1F07_41D5_53E165DA7927"],"rollOverOpacity":0.8,"label":trans('Menu_2FEE8641_3F28_BEEB_419C_72067918AF77.label'),"id":"Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","fontFamily":"Bebas Neue","rollOverBackgroundColor":"#000000"},{"playbackBarHeadBackgroundColor":["#111111","#666666"],"playbackBarHeadShadowColor":"#000000","toolTipFontColor":"#606060","toolTipTextShadowColor":"#000000","subtitlesBackgroundColor":"#000000","vrPointerColor":"#FFFFFF","progressBorderRadius":2,"playbackBarHeight":10,"playbackBarBackgroundColor":["#FFFFFF"],"subtitlesTextShadowOpacity":1,"playbackBarProgressBorderSize":0,"data":{"name":"Main Viewer"},"progressLeft":"33%","surfaceReticleSelectionColor":"#FFFFFF","playbackBarRight":0,"playbackBarHeadWidth":6,"playbackBarBackgroundColorDirection":"vertical","playbackBarProgressBorderRadius":0,"subtitlesTextShadowVerticalLength":1,"playbackBarProgressBackgroundColor":["#3399FF"],"toolTipPaddingRight":6,"subtitlesFontColor":"#FFFFFF","playbackBarHeadShadowOpacity":0.7,"vrPointerSelectionColor":"#FF6600","class":"ViewerArea","toolTipFontFamily":"Arial","playbackBarProgressBackgroundColorRatios":[0],"subtitlesTop":0,"playbackBarBorderColor":"#FFFFFF","playbackBarProgressBorderColor":"#000000","playbackBarBorderRadius":0,"subtitlesBottom":50,"subtitlesFontSize":"3vmin","progressBackgroundColorRatios":[0],"toolTipBorderColor":"#767676","toolTipBackgroundColor":"#F6F6F6","toolTipPaddingTop":4,"subtitlesBackgroundOpacity":0.2,"progressRight":"33%","toolTipPaddingBottom":4,"subtitlesTextShadowColor":"#000000","progressBarBackgroundColorDirection":"horizontal","progressOpacity":0.7,"playbackBarHeadBorderColor":"#000000","id":"MainViewer","subtitlesTextShadowHorizontalLength":1,"progressBarBorderColor":"#000000","playbackBarBorderSize":0,"progressBarBackgroundColorRatios":[0],"subtitlesBorderColor":"#FFFFFF","playbackBarHeadBorderRadius":0,"subtitlesFontFamily":"Arial","playbackBarHeadShadowBlurRadius":3,"progressBorderColor":"#000000","toolTipPaddingLeft":6,"playbackBarHeadHeight":15,"progressBarBackgroundColor":["#3399FF"],"propagateClick":false,"minWidth":100,"playbackBarLeft":0,"minHeight":50,"progressBottom":10,"toolTipShadowColor":"#333138","progressBackgroundColor":["#000000"],"playbackBarBackgroundOpacity":1,"playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadShadow":true,"playbackBarHeadBorderSize":0,"toolTipFontSize":"1.11vmin","height":"100%","surfaceReticleColor":"#FFFFFF","progressBorderSize":0,"progressHeight":2,"subtitlesGap":0,"progressBarBorderSize":0,"firstTransitionDuration":0,"width":"100%","progressBarBorderRadius":2,"playbackBarBottom":5,"vrPointerSelectionTime":2000},{"horizontalAlign":"center","id":"IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","left":"47.84%","data":{"name":"play"},"iconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC.png","mode":"toggle","backgroundOpacity":0,"pressedIconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_pressed.png","propagateClick":false,"minWidth":0,"verticalAlign":"middle","minHeight":0,"bottom":"5%","transparencyActive":true,"class":"IconButton","height":45,"width":45,"visible":false},{"toolTipBorderColor":"#767676","toolTipBackgroundColor":"#F6F6F6","toolTipFontColor":"#606060","toolTipPaddingBottom":4,"horizontalAlign":"center","toolTipTextShadowColor":"#000000","id":"IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","data":{"name":"full"},"right":"2.37%","iconURL":"skin/IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.png","maxHeight":128,"maxWidth":128,"mode":"toggle","toolTipPaddingLeft":6,"backgroundOpacity":0,"transparencyActive":true,"propagateClick":false,"minWidth":1,"verticalAlign":"middle","minHeight":1,"toolTipPaddingRight":6,"toolTipShadowColor":"#333333","bottom":"5%","class":"IconButton","height":40,"toolTipFontFamily":"Arial","width":40,"toolTip":trans('IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.toolTip'),"visible":false,"toolTipPaddingTop":4},{"id":"mainPlayList","items":[{"class":"VideoPlayListItem","media":"this.video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367","start":"this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558], 'begin', false, this.FadeOutEffect_F353FDB0_E517_2105_41E6_8A18C344227B, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.MainViewer,this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', true, this.FadeInEffect_370F8A95_38BC_EB15_4190_7E585BB95B9E, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC,this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E], 'begin', true, this.FadeInEffect_F353FDB0_E517_2105_41CE_4F8E629610BF, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'end', false, this.FadeOutEffect_F3531DB0_E517_2105_41EA_1648DA7CC61A, 0, 0); this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.MainViewerVideoPlayer.set('displayPlayOverlay', true); this.MainViewerVideoPlayer.set('clickAction', 'play_pause'); this.changeBackgroundWhilePlay(this.mainPlayList, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 0)","begin":"this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)","player":"this.MainViewerVideoPlayer"},"this.Video360PlayListItem_E85C5CAF_E554_1B37_41E8_DEDD30C31542"],"class":"PlayList"},{"hfovMin":60,"hfov":360,"hfovMax":140,"thumbnailUrl":"media/media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_t.jpg","id":"media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0","class":"Video360","video":["this.videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B"],"pitch":0,"data":{"label":"waikru_5_2"},"vfov":180,"cardboardMenu":"this.Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","label":trans('media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0.label')},{"displayPlayOverlay":true,"clickAction":"play_pause","buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","id":"MainViewerVideoPlayer","class":"VideoPlayer","displayPlaybackBar":true,"viewerArea":"this.MainViewer"},{"displayPlaybackBar":true,"mouseControlMode":"drag_rotation","buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","viewerArea":"this.MainViewer","gyroscopeEnabled":true,"aaEnabled":true,"touchControlMode":"drag_rotation","arrowKeysAction":"translate","class":"PanoramaPlayer","id":"MainViewerPanoramaPlayer","keepModel3DLoadedWithoutLocation":true,"buttonCardboardView":"this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558"},{"id":"FadeOutEffect_F3532DB1_E517_2107_41C4_00F9F85E047A","easing":"cubic_in_out","class":"FadeOutEffect"},{"thumbnailUrl":"media/video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367_t.jpg","id":"video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367","class":"Video","width":3840,"video":"this.videores_374D64CD_38BF_1F7A_41AE_6ACB47B871C4","height":1920,"data":{"label":"VR360waikru_intro_7_2"},"label":trans('video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367.label')},{"toolTipBorderColor":"#767676","toolTipBackgroundColor":"#F6F6F6","toolTipFontColor":"#606060","toolTipPaddingBottom":4,"horizontalAlign":"center","toolTipTextShadowColor":"#000000","id":"IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","data":{"name":"IconButton14830"},"right":"2.37%","iconURL":"skin/IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.png","maxHeight":55,"maxWidth":54,"toolTipPaddingLeft":6,"backgroundOpacity":0,"propagateClick":false,"minWidth":1,"verticalAlign":"middle","minHeight":1,"toolTipPaddingRight":6,"toolTipShadowColor":"#333333","top":"2.32%","height":55,"toolTipFontFamily":"Arial","class":"IconButton","width":55,"toolTip":trans('IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.toolTip'),"visible":false,"toolTipPaddingTop":4},{"initialPosition":{"pitch":0,"class":"RotationalCameraPosition","yaw":0,"hfov":120},"id":"media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_camera","enterPointingToHorizon":true,"class":"RotationalCamera"},{"id":"FadeOutEffect_32C45056_3CC4_9D19_41CD_FAAB30EB850F","duration":5000,"class":"FadeOutEffect"},{"id":"FadeInEffect_F353FDB0_E517_2105_41CE_4F8E629610BF","class":"FadeInEffect"},{"id":"FadeInEffect_32723617_3CB0_BB6B_41C6_472C0165A387","duration":5000,"class":"FadeInEffect"},{"id":"FadeOutEffect_F3531DB0_E517_2105_41EA_1648DA7CC61A","easing":"cubic_in_out","class":"FadeOutEffect"},{"click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.Video360PlayListItem_E85C5CAF_E554_1B37_41E8_DEDD30C31542, 0, 0, 120 || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 1); this.MainViewerPanoramaPlayer.play()","horizontalAlign":"center","id":"IconButton_15C8772E_0549_3418_4190_EDCF9015B37F","rollOverIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_rollover.png","data":{"name":"Skip Intro"},"right":"2.29%","iconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F.png","backgroundOpacity":0,"pressedIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_pressed.png","propagateClick":false,"minWidth":0,"verticalAlign":"middle","minHeight":0,"bottom":"20.49%","transparencyActive":true,"class":"IconButton","height":45,"width":45,"visible":false},{"id":"FadeInEffect_F3530DB1_E517_2107_41D3_0C5FF5F541EF","class":"FadeInEffect"},{"id":"menuItem_F256C041_E575_1F07_41D5_53E165DA7927","click":"var state = this.MainViewerPanoramaPlayer.get('state'); if(state == 'playing') { this.MainViewerPanoramaPlayer.pause() } else if(state == 'paused') { this.MainViewerPanoramaPlayer.play() }; var state = this.MainViewerVideoPlayer.get('state'); if(state == 'playing') { this.MainViewerVideoPlayer.pause() } else if(state == 'paused') { this.MainViewerVideoPlayer.play() }","class":"MenuItem","label":trans('menuItem_F256C041_E575_1F07_41D5_53E165DA7927.label')},{"camera":"this.media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_camera","media":"this.media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","id":"Video360PlayListItem_E85C5CAF_E554_1B37_41E8_DEDD30C31542","class":"Video360PlayListItem","begin":"this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 0)","start":"this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558,this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC,this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E], 'begin', true, this.FadeInEffect_F3530DB1_E517_2107_41D3_0C5FF5F541EF, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.MainViewer], 'begin', true, this.FadeInEffect_32723617_3CB0_BB6B_41C6_472C0165A387, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.MainViewer], 'end', false, this.FadeOutEffect_32C45056_3CC4_9D19_41CD_FAAB30EB850F, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', false, this.FadeOutEffect_F3532DB1_E517_2107_41C4_00F9F85E047A, 0, 0); this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.MainViewerPanoramaPlayer.set('displayPlayOverlay', false); this.MainViewerPanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.mainPlayList, 1, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 1)"},{"height":1920,"codec":"h264","bitrate":17677,"framerate":29.97,"type":"video/mp4","url":trans('videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B.url'),"id":"videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B","posterURL":trans('videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B.posterURL'),"class":"Video360Resource","width":3840},{"id":"videores_374D64CD_38BF_1F7A_41AE_6ACB47B871C4","height":1920,"class":"VideoResource","width":3840,"levels":["this.videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04"]},{"height":1920,"url":trans('videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04.url'),"codec":"h264","bitrate":16572,"framerate":29.97,"id":"videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04","posterURL":trans('videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04.posterURL'),"type":"video/mp4","class":"VideoResourceLevel","width":3840}],"width":"100%"};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.2.7, Fri Mar 13 2026