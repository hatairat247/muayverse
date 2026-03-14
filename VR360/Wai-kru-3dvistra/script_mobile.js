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
var script = {"children":["this.MainViewer_mobile","this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_mobile","this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558_mobile","this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E_mobile","this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_mobile"],"scrollBarColor":"#000000","backgroundColorRatios":[0],"top":198.95,"id":"rootPlayer","buttonToggleFullscreen":"this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E_mobile","data":{"locales":{"en":"locale/en.txt"},"defaultLocale":"en","name":"Player453","displayTooltipInTouchScreens":true,"history":{},"textToSpeechConfig":{"pitch":1,"speechOnInfoWindow":false,"volume":1,"speechOnQuizQuestion":false,"stopBackgroundAudio":false,"speechOnTooltip":false,"rate":1}},"backgroundColor":["#FFFFFF"],"scripts":{"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"mixObject":TDV.Tour.Script.mixObject,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getMediaByName":TDV.Tour.Script.getMediaByName,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"clone":TDV.Tour.Script.clone,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"historyGoBack":TDV.Tour.Script.historyGoBack,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"showPopupImage":TDV.Tour.Script.showPopupImage,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"setValue":TDV.Tour.Script.setValue,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"getComponentByName":TDV.Tour.Script.getComponentByName,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"getKey":TDV.Tour.Script.getKey,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"resumePlayers":TDV.Tour.Script.resumePlayers,"getPixels":TDV.Tour.Script.getPixels,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"openLink":TDV.Tour.Script.openLink,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"disableVR":TDV.Tour.Script.disableVR,"initAnalytics":TDV.Tour.Script.initAnalytics,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"unregisterKey":TDV.Tour.Script.unregisterKey,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"getOverlays":TDV.Tour.Script.getOverlays,"downloadFile":TDV.Tour.Script.downloadFile,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"quizShowScore":TDV.Tour.Script.quizShowScore,"setMapLocation":TDV.Tour.Script.setMapLocation,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"startMeasurement":TDV.Tour.Script.startMeasurement,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"init":TDV.Tour.Script.init,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"existsKey":TDV.Tour.Script.existsKey,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"cloneBindings":TDV.Tour.Script.cloneBindings,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"enableVR":TDV.Tour.Script.enableVR,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"isPanorama":TDV.Tour.Script.isPanorama,"quizStart":TDV.Tour.Script.quizStart,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getMainViewer":TDV.Tour.Script.getMainViewer,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"showWindow":TDV.Tour.Script.showWindow,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"playAudioList":TDV.Tour.Script.playAudioList,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"createTween":TDV.Tour.Script.createTween,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"quizFinish":TDV.Tour.Script.quizFinish,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"registerKey":TDV.Tour.Script.registerKey,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"executeJS":TDV.Tour.Script.executeJS,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"historyGoForward":TDV.Tour.Script.historyGoForward,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"initQuiz":TDV.Tour.Script.initQuiz,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"translate":TDV.Tour.Script.translate,"textToSpeech":TDV.Tour.Script.textToSpeech,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"shareSocial":TDV.Tour.Script.shareSocial,"setLocale":TDV.Tour.Script.setLocale,"toggleVR":TDV.Tour.Script.toggleVR},"left":237.5,"layout":"absolute","start":"this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E_mobile].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","propagateClick":false,"minWidth":0,"gap":10,"minHeight":0,"class":"Player","watermark":false,"height":"100%","scrollBarMargin":2,"defaultMenu":["fullscreen","mute","rotation"],"hash": "c439eb4558750665f777f302fb847c454eacca4d7ace63a0ad544d27313e7063", "definitions": [{"id":"FadeOutEffect_F353FDB0_E517_2105_41E6_8A18C344227B","easing":"cubic_in_out","class":"FadeOutEffect"},{"id":"FadeInEffect_370F8A95_38BC_EB15_4190_7E585BB95B9E","easing":"cubic_in_out","class":"FadeInEffect"},{"selectedFontColor":"#FFFFFF","distance":2,"class":"Menu","fontColor":"#FFFFFF","opacity":0.4,"selectedBackgroundColor":"#202020","backgroundColor":"#404040","rollOverFontColor":"#FFFFFF","children":["this.menuItem_F256C041_E575_1F07_41D5_53E165DA7927"],"rollOverOpacity":0.8,"label":trans('Menu_2FEE8641_3F28_BEEB_419C_72067918AF77.label'),"id":"Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","fontFamily":"Bebas Neue","rollOverBackgroundColor":"#000000"},{"id":"mainPlayList","items":[{"class":"VideoPlayListItem","media":"this.video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367","start":"this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558_mobile], 'begin', false, this.FadeOutEffect_F353FDB0_E517_2105_41E6_8A18C344227B, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.MainViewer_mobile,this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_mobile], 'begin', true, this.FadeInEffect_370F8A95_38BC_EB15_4190_7E585BB95B9E, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_mobile,this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E_mobile], 'begin', true, this.FadeInEffect_F353FDB0_E517_2105_41CE_4F8E629610BF, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_mobile], 'end', false, this.FadeOutEffect_F3531DB0_E517_2105_41EA_1648DA7CC61A, 0, 0); this.MainViewer_mobileVideoPlayer.set('displayPlaybackBar', true); this.MainViewer_mobileVideoPlayer.set('displayPlayOverlay', true); this.MainViewer_mobileVideoPlayer.set('clickAction', 'play_pause'); this.changeBackgroundWhilePlay(this.mainPlayList, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 0)","begin":"this.fixTogglePlayPauseButton(this.MainViewer_mobileVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)","player":"this.MainViewer_mobileVideoPlayer"},"this.Video360PlayListItem_E9D4DE69_E554_173B_41EB_CC8C8C452853"],"class":"PlayList"},{"playbackBarHeadBackgroundColor":["#111111","#666666"],"playbackBarHeadShadowColor":"#000000","toolTipFontColor":"#606060","toolTipTextShadowColor":"#000000","subtitlesBackgroundColor":"#000000","vrPointerColor":"#FFFFFF","progressBorderRadius":2,"playbackBarHeight":10,"playbackBarBackgroundColor":["#FFFFFF"],"subtitlesTextShadowOpacity":1,"playbackBarProgressBorderSize":0,"data":{"name":"Main Viewer"},"progressLeft":"33%","surfaceReticleSelectionColor":"#FFFFFF","playbackBarRight":0,"playbackBarHeadWidth":6,"playbackBarBackgroundColorDirection":"vertical","playbackBarProgressBorderRadius":0,"subtitlesTextShadowVerticalLength":1,"playbackBarProgressBackgroundColor":["#3399FF"],"toolTipPaddingRight":3,"subtitlesFontColor":"#FFFFFF","playbackBarHeadShadowOpacity":0.7,"vrPointerSelectionColor":"#FF6600","class":"ViewerArea","toolTipFontFamily":"Arial","playbackBarProgressBackgroundColorRatios":[0],"subtitlesTop":0,"playbackBarBorderColor":"#FFFFFF","playbackBarProgressBorderColor":"#000000","playbackBarBorderRadius":0,"subtitlesBottom":50,"subtitlesFontSize":"3vmin","progressBackgroundColorRatios":[0],"toolTipBorderColor":"#767676","toolTipBackgroundColor":"#F6F6F6","subtitlesBackgroundOpacity":0.2,"progressRight":"33%","subtitlesTextShadowColor":"#000000","progressBarBackgroundColorDirection":"horizontal","progressOpacity":0.7,"playbackBarHeadBorderColor":"#000000","toolTipTextShadowBlurRadius":1,"id":"MainViewer_mobile","subtitlesTextShadowHorizontalLength":1,"progressBarBorderColor":"#000000","playbackBarBorderSize":0,"progressBarBackgroundColorRatios":[0],"subtitlesBorderColor":"#FFFFFF","playbackBarHeadBorderRadius":0,"subtitlesFontFamily":"Arial","playbackBarHeadShadowBlurRadius":1.5,"progressBorderColor":"#000000","toolTipPaddingLeft":3,"playbackBarHeadHeight":15,"progressBarBackgroundColor":["#3399FF"],"propagateClick":false,"minWidth":50,"playbackBarLeft":0,"minHeight":25,"toolTipShadowBlurRadius":1,"progressBottom":10,"toolTipShadowColor":"#333138","progressBackgroundColor":["#000000"],"playbackBarBackgroundOpacity":1,"playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadShadow":true,"playbackBarHeadBorderSize":0,"toolTipBorderRadius":1,"toolTipFontSize":"1.11vmin","height":"100%","surfaceReticleColor":"#FFFFFF","progressBorderSize":0,"progressHeight":2,"subtitlesGap":0,"progressBarBorderSize":0,"firstTransitionDuration":0,"width":"100%","progressBarBorderRadius":2,"playbackBarBottom":5,"vrPointerSelectionTime":2000},{"click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.Video360PlayListItem_E9D4DE69_E554_173B_41EB_CC8C8C452853, 0, 0, 120 || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 1); this.MainViewer_mobilePanoramaPlayer.play()","horizontalAlign":"center","id":"IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_mobile","rollOverIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_rollover.png","data":{"name":"Skip Intro"},"right":"2.29%","iconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F.png","backgroundOpacity":0,"pressedIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_pressed.png","propagateClick":false,"minWidth":0,"verticalAlign":"middle","minHeight":0,"bottom":"20.49%","transparencyActive":true,"class":"IconButton","height":32,"width":39,"visible":false},{"displayPlayOverlay":true,"clickAction":"play_pause","buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_mobile","id":"MainViewer_mobileVideoPlayer","class":"VideoPlayer","displayPlaybackBar":true,"viewerArea":"this.MainViewer_mobile"},{"toolTipBorderColor":"#767676","toolTipBackgroundColor":"#F6F6F6","toolTipFontColor":"#606060","horizontalAlign":"center","toolTipTextShadowColor":"#000000","toolTipTextShadowBlurRadius":1,"id":"IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E_mobile","data":{"name":"full"},"right":"2.37%","iconURL":"skin/IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.png","maxHeight":64,"maxWidth":64,"mode":"toggle","toolTipPaddingLeft":3,"backgroundOpacity":0,"transparencyActive":true,"propagateClick":false,"minWidth":1,"verticalAlign":"middle","minHeight":1,"toolTipShadowBlurRadius":1,"toolTipPaddingRight":3,"toolTipShadowColor":"#333333","bottom":"5%","class":"IconButton","height":33,"toolTipFontFamily":"Arial","width":37,"toolTipBorderRadius":1,"toolTipFontSize":6,"toolTip":trans('IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E_mobile.toolTip'),"visible":false},{"horizontalAlign":"center","id":"IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_mobile","left":"46.2%","data":{"name":"play"},"iconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC.png","mode":"toggle","backgroundOpacity":0,"pressedIconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_pressed.png","propagateClick":false,"minWidth":0,"verticalAlign":"middle","minHeight":0,"bottom":"5%","transparencyActive":true,"class":"IconButton","height":32,"width":44,"visible":false},{"id":"FadeOutEffect_F3532DB1_E517_2107_41C4_00F9F85E047A","easing":"cubic_in_out","class":"FadeOutEffect"},{"thumbnailUrl":"media/video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367_t.jpg","id":"video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367","class":"Video","width":3840,"video":"this.videores_374D64CD_38BF_1F7A_41AE_6ACB47B871C4","height":1920,"data":{"label":"VR360waikru_intro_7_2"},"label":trans('video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367.label')},{"toolTipBorderColor":"#767676","toolTipBackgroundColor":"#F6F6F6","toolTipFontColor":"#606060","horizontalAlign":"center","toolTipTextShadowColor":"#000000","toolTipTextShadowBlurRadius":1,"id":"IconButton_303C7758_3F28_9E98_41BE_DF89033D2558_mobile","data":{"name":"IconButton14830"},"right":"2.37%","iconURL":"skin/IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.png","maxHeight":50,"maxWidth":50,"toolTipPaddingLeft":3,"backgroundOpacity":0,"propagateClick":false,"minWidth":1,"verticalAlign":"middle","minHeight":1,"toolTipShadowBlurRadius":1,"toolTipPaddingRight":3,"toolTipShadowColor":"#333333","top":"2.32%","height":50,"toolTipFontFamily":"Arial","class":"IconButton","width":50,"toolTipBorderRadius":1,"toolTipFontSize":6,"toolTip":trans('IconButton_303C7758_3F28_9E98_41BE_DF89033D2558_mobile.toolTip'),"visible":false},{"initialPosition":{"pitch":0,"class":"RotationalCameraPosition","yaw":0,"hfov":120},"id":"media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_camera","enterPointingToHorizon":true,"class":"RotationalCamera"},{"id":"FadeOutEffect_32C45056_3CC4_9D19_41CD_FAAB30EB850F","duration":5000,"class":"FadeOutEffect"},{"id":"FadeInEffect_F353FDB0_E517_2105_41CE_4F8E629610BF","class":"FadeInEffect"},{"id":"FadeInEffect_32723617_3CB0_BB6B_41C6_472C0165A387","duration":5000,"class":"FadeInEffect"},{"id":"FadeOutEffect_F3531DB0_E517_2105_41EA_1648DA7CC61A","easing":"cubic_in_out","class":"FadeOutEffect"},{"hfovMin":60,"hfov":360,"hfovMax":140,"thumbnailUrl":"media/media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_t.jpg","id":"media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0","class":"Video360","video":["this.videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B"],"pitch":0,"data":{"label":"waikru_5_2"},"vfov":180,"cardboardMenu":"this.Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","label":trans('media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0.label')},{"id":"FadeInEffect_F3530DB1_E517_2107_41D3_0C5FF5F541EF","class":"FadeInEffect"},{"displayPlaybackBar":true,"mouseControlMode":"drag_rotation","buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_mobile","viewerArea":"this.MainViewer_mobile","gyroscopeEnabled":true,"aaEnabled":true,"touchControlMode":"drag_rotation","arrowKeysAction":"translate","class":"PanoramaPlayer","id":"MainViewer_mobilePanoramaPlayer","keepModel3DLoadedWithoutLocation":true,"buttonCardboardView":"this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558_mobile"},{"id":"menuItem_F256C041_E575_1F07_41D5_53E165DA7927","click":"var state = this.MainViewer_mobilePanoramaPlayer.get('state'); if(state == 'playing') { this.MainViewer_mobilePanoramaPlayer.pause() } else if(state == 'paused') { this.MainViewer_mobilePanoramaPlayer.play() }; var state = this.MainViewer_mobileVideoPlayer.get('state'); if(state == 'playing') { this.MainViewer_mobileVideoPlayer.pause() } else if(state == 'paused') { this.MainViewer_mobileVideoPlayer.play() }","class":"MenuItem","label":trans('menuItem_F256C041_E575_1F07_41D5_53E165DA7927.label')},{"camera":"this.media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_camera","media":"this.media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0","end":"this.trigger('tourEnded')","player":"this.MainViewer_mobilePanoramaPlayer","id":"Video360PlayListItem_E9D4DE69_E554_173B_41EB_CC8C8C452853","class":"Video360PlayListItem","begin":"this.fixTogglePlayPauseButton(this.MainViewer_mobilePanoramaPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 0)","start":"this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558_mobile,this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_mobile,this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E_mobile], 'begin', true, this.FadeInEffect_F3530DB1_E517_2107_41D3_0C5FF5F541EF, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.MainViewer_mobile], 'begin', true, this.FadeInEffect_32723617_3CB0_BB6B_41C6_472C0165A387, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.MainViewer_mobile], 'end', false, this.FadeOutEffect_32C45056_3CC4_9D19_41CD_FAAB30EB850F, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_mobile], 'begin', false, this.FadeOutEffect_F3532DB1_E517_2107_41C4_00F9F85E047A, 0, 0); this.MainViewer_mobilePanoramaPlayer.set('displayPlaybackBar', true); this.MainViewer_mobilePanoramaPlayer.set('displayPlayOverlay', false); this.MainViewer_mobilePanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.mainPlayList, 1, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 1)"},{"id":"videores_374D64CD_38BF_1F7A_41AE_6ACB47B871C4","height":1920,"class":"VideoResource","width":3840,"levels":["this.videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04"]},{"height":1920,"codec":"h264","bitrate":17677,"framerate":29.97,"type":"video/mp4","url":trans('videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B.url'),"id":"videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B","posterURL":trans('videores_EEABBC84_E554_7BEA_41E4_34DCD3EF6D8B.posterURL'),"class":"Video360Resource","width":3840},{"height":1920,"url":trans('videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04.url'),"codec":"h264","bitrate":16572,"framerate":29.97,"id":"videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04","posterURL":trans('videolevel_EEAECC56_E554_7B69_41E7_B67E6E767C04.posterURL'),"type":"video/mp4","class":"VideoResourceLevel","width":3840}],"width":"100%"};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.2.7, Fri Mar 13 2026