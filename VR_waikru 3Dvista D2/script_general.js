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
var script = {"buttonToggleFullscreen":"this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","children":["this.MainViewer","this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F"],"defaultMenu":["fullscreen","mute","rotation"],"start":"this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","id":"rootPlayer","data":{"locales":{"en":"locale/en.txt"},"name":"Player453","textToSpeechConfig":{"pitch":1,"volume":1,"speechOnInfoWindow":false,"speechOnQuizQuestion":false,"speechOnTooltip":false,"stopBackgroundAudio":false,"rate":1},"displayTooltipInTouchScreens":true,"history":{},"defaultLocale":"en"},"backgroundColor":["#FFFFFF"],"backgroundColorRatios":[0],"layout":"absolute","class":"Player","scrollBarMargin":2,"watermark":false,"minHeight":0,"minWidth":0,"gap":10,"scrollBarColor":"#000000","scripts":{"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"setLocale":TDV.Tour.Script.setLocale,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"clone":TDV.Tour.Script.clone,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"downloadFile":TDV.Tour.Script.downloadFile,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"initQuiz":TDV.Tour.Script.initQuiz,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"setValue":TDV.Tour.Script.setValue,"mixObject":TDV.Tour.Script.mixObject,"shareSocial":TDV.Tour.Script.shareSocial,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"openLink":TDV.Tour.Script.openLink,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"setMapLocation":TDV.Tour.Script.setMapLocation,"getOverlays":TDV.Tour.Script.getOverlays,"getKey":TDV.Tour.Script.getKey,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"getPixels":TDV.Tour.Script.getPixels,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"quizShowScore":TDV.Tour.Script.quizShowScore,"initAnalytics":TDV.Tour.Script.initAnalytics,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"historyGoBack":TDV.Tour.Script.historyGoBack,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"unregisterKey":TDV.Tour.Script.unregisterKey,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"getMainViewer":TDV.Tour.Script.getMainViewer,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"getComponentByName":TDV.Tour.Script.getComponentByName,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"disableVR":TDV.Tour.Script.disableVR,"init":TDV.Tour.Script.init,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"quizStart":TDV.Tour.Script.quizStart,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"showWindow":TDV.Tour.Script.showWindow,"existsKey":TDV.Tour.Script.existsKey,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"cloneBindings":TDV.Tour.Script.cloneBindings,"executeJS":TDV.Tour.Script.executeJS,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"showPopupImage":TDV.Tour.Script.showPopupImage,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"resumePlayers":TDV.Tour.Script.resumePlayers,"quizFinish":TDV.Tour.Script.quizFinish,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"createTween":TDV.Tour.Script.createTween,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"historyGoForward":TDV.Tour.Script.historyGoForward,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"textToSpeech":TDV.Tour.Script.textToSpeech,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"isPanorama":TDV.Tour.Script.isPanorama,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"getMediaByName":TDV.Tour.Script.getMediaByName,"playAudioList":TDV.Tour.Script.playAudioList,"registerKey":TDV.Tour.Script.registerKey,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"startMeasurement":TDV.Tour.Script.startMeasurement,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"enableVR":TDV.Tour.Script.enableVR,"toggleVR":TDV.Tour.Script.toggleVR,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"translate":TDV.Tour.Script.translate,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot},"height":"100%","width":"100%","propagateClick":false,"hash": "dc552ee5c6f6bc46d3cc3fab420f39216fe13e91f03eded077689da9a8056ab2", "definitions": [{"toolTipFontFamily":"Arial","iconURL":"skin/IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.png","toolTipBorderColor":"#767676","horizontalAlign":"center","id":"IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","toolTipBackgroundColor":"#F6F6F6","data":{"name":"full"},"toolTipTextShadowColor":"#000000","toolTipPaddingTop":4,"toolTipPaddingBottom":4,"right":"2.37%","maxHeight":128,"backgroundOpacity":0,"maxWidth":128,"toolTipFontColor":"#606060","class":"IconButton","mode":"toggle","toolTipPaddingLeft":6,"verticalAlign":"middle","minHeight":1,"minWidth":1,"bottom":"5%","width":40,"height":40,"toolTipPaddingRight":6,"transparencyActive":true,"visible":false,"toolTip":trans('IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.toolTip'),"propagateClick":false,"toolTipShadowColor":"#333333"},{"enterPointingToHorizon":true,"initialPosition":{"pitch":0,"hfov":120,"class":"RotationalCameraPosition","yaw":0},"class":"RotationalCamera","id":"media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_camera"},{"id":"FadeInEffect_34DD8992_38CC_64BA_41B1_8781432300F0","class":"FadeInEffect"},{"id":"FadeOutEffect_370F5A96_38BC_EB17_41A3_BF17C6C4E846","class":"FadeOutEffect","easing":"cubic_in_out"},{"id":"FadeInEffect_32723617_3CB0_BB6B_41C6_472C0165A387","class":"FadeInEffect","easing":"cubic_in_out"},{"iconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC.png","horizontalAlign":"center","id":"IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","left":"47.84%","data":{"name":"play"},"backgroundOpacity":0,"class":"IconButton","mode":"toggle","verticalAlign":"middle","minHeight":0,"minWidth":0,"bottom":"5%","height":45,"width":45,"pressedIconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_pressed.png","transparencyActive":true,"visible":false,"propagateClick":false},{"buttonCardboardView":"this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","mouseControlMode":"drag_rotation","viewerArea":"this.MainViewer","displayPlaybackBar":true,"gyroscopeEnabled":true,"buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","aaEnabled":true,"class":"PanoramaPlayer","touchControlMode":"drag_rotation","id":"MainViewerPanoramaPlayer","keepModel3DLoadedWithoutLocation":true,"arrowKeysAction":"translate"},{"iconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F.png","horizontalAlign":"center","click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.Video360PlayListItem_336C0035_3CB0_B7AF_41C8_16D980C0CC2E, 0, 0, 120 || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 1); this.MainViewerPanoramaPlayer.play()","id":"IconButton_15C8772E_0549_3418_4190_EDCF9015B37F","data":{"name":"Skip Intro"},"right":"2.29%","backgroundOpacity":0,"class":"IconButton","verticalAlign":"middle","minHeight":0,"minWidth":0,"rollOverIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_rollover.png","bottom":"20.49%","height":45,"width":45,"pressedIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_pressed.png","transparencyActive":true,"visible":false,"propagateClick":false},{"width":3840,"video":"this.videores_374D64CD_38BF_1F7A_41AE_6ACB47B871C4","height":1920,"class":"Video","label":trans('video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367.label'),"data":{"label":"VR360waikru_intro_7_2"},"thumbnailUrl":"media/video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367_t.jpg","id":"video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367"},{"toolTipFontFamily":"Arial","width":"100%","toolTipBorderColor":"#767676","subtitlesTextShadowVerticalLength":1,"subtitlesTextShadowHorizontalLength":1,"playbackBarProgressBackgroundColorRatios":[0],"playbackBarBorderColor":"#FFFFFF","subtitlesBorderColor":"#FFFFFF","progressBackgroundColorRatios":[0],"playbackBarProgressBorderColor":"#000000","toolTipBackgroundColor":"#F6F6F6","data":{"name":"Main Viewer"},"subtitlesFontFamily":"Arial","toolTipPaddingTop":4,"toolTipPaddingBottom":4,"progressRight":"33%","progressBarBackgroundColorDirection":"horizontal","playbackBarBorderRadius":0,"playbackBarHeadBorderRadius":0,"playbackBarHeadBorderColor":"#000000","class":"ViewerArea","progressBarBackgroundColorRatios":[0],"progressOpacity":0.7,"progressBarBorderColor":"#000000","playbackBarBorderSize":0,"progressBorderColor":"#000000","subtitlesGap":0,"progressBarBackgroundColor":["#3399FF"],"subtitlesBackgroundColor":"#000000","surfaceReticleColor":"#FFFFFF","playbackBarHeadShadowBlurRadius":3,"progressBackgroundColor":["#000000"],"playbackBarLeft":0,"toolTipFontSize":"1.11vmin","playbackBarHeadBackgroundColorRatios":[0,1],"progressBottom":10,"progressHeight":2,"propagateClick":false,"progressBorderSize":0,"playbackBarHeadShadowColor":"#000000","playbackBarHeadBorderSize":0,"playbackBarHeadHeight":15,"playbackBarHeadShadow":true,"subtitlesTextShadowOpacity":1,"playbackBarBackgroundOpacity":1,"vrPointerColor":"#FFFFFF","progressBarBorderSize":0,"id":"MainViewer","progressBarBorderRadius":2,"playbackBarHeadBackgroundColor":["#111111","#666666"],"toolTipShadowColor":"#333138","firstTransitionDuration":0,"surfaceReticleSelectionColor":"#FFFFFF","toolTipTextShadowColor":"#000000","subtitlesFontColor":"#FFFFFF","playbackBarBottom":5,"progressBorderRadius":2,"progressLeft":"33%","toolTipFontColor":"#606060","toolTipPaddingLeft":6,"subtitlesTop":0,"playbackBarBackgroundColor":["#FFFFFF"],"playbackBarHeight":10,"minHeight":50,"minWidth":100,"vrPointerSelectionTime":2000,"playbackBarHeadWidth":6,"playbackBarBackgroundColorDirection":"vertical","playbackBarProgressBorderSize":0,"vrPointerSelectionColor":"#FF6600","playbackBarRight":0,"subtitlesFontSize":"3vmin","subtitlesBottom":50,"subtitlesTextShadowColor":"#000000","playbackBarProgressBackgroundColor":["#3399FF"],"playbackBarHeadShadowOpacity":0.7,"toolTipPaddingRight":6,"playbackBarProgressBorderRadius":0,"height":"100%","subtitlesBackgroundOpacity":0.2},{"toolTipFontFamily":"Arial","iconURL":"skin/IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.png","toolTipBorderColor":"#767676","horizontalAlign":"center","id":"IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","toolTipBackgroundColor":"#F6F6F6","data":{"name":"IconButton14830"},"toolTipTextShadowColor":"#000000","toolTipPaddingTop":4,"toolTipPaddingBottom":4,"right":"2.37%","maxHeight":55,"backgroundOpacity":0,"maxWidth":54,"toolTipFontColor":"#606060","class":"IconButton","toolTipPaddingLeft":6,"verticalAlign":"middle","minHeight":1,"minWidth":1,"top":"2.32%","width":55,"height":55,"toolTipPaddingRight":6,"visible":false,"toolTip":trans('IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.toolTip'),"propagateClick":false,"toolTipShadowColor":"#333333"},{"id":"FadeInEffect_370F8A95_38BC_EB15_4190_7E585BB95B9E","class":"FadeInEffect","easing":"cubic_in_out"},{"id":"FadeOutEffect_370F9A95_38BC_EB15_41A4_B117ADD09A94","class":"FadeOutEffect","easing":"cubic_in_out"},{"id":"mainPlayList","items":[{"class":"VideoPlayListItem","media":"this.video_34A6AED4_38B7_6B6B_41B4_F827AB5EC367","start":"this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E,this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC], 'begin', true, this.FadeInEffect_370FBA95_38BC_EB15_41C2_D715CDB6AE8D, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.MainViewer,this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', true, this.FadeInEffect_370F8A95_38BC_EB15_4190_7E585BB95B9E, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558], 'begin', false, this.FadeOutEffect_370F9A95_38BC_EB15_41A4_B117ADD09A94, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'end', false, this.FadeOutEffect_3717F9DE_38D4_64AA_41B7_3D3372DA211A, 0, 0); this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.MainViewerVideoPlayer.set('displayPlayOverlay', true); this.MainViewerVideoPlayer.set('clickAction', 'play_pause'); this.changeBackgroundWhilePlay(this.mainPlayList, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 0)","begin":"this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)","player":"this.MainViewerVideoPlayer"},"this.Video360PlayListItem_336C0035_3CB0_B7AF_41C8_16D980C0CC2E"],"class":"PlayList"},{"id":"FadeOutEffect_3717F9DE_38D4_64AA_41B7_3D3372DA211A","class":"FadeOutEffect","easing":"cubic_in_out"},{"distance":2,"opacity":0.4,"selectedBackgroundColor":"#202020","rollOverOpacity":0.8,"backgroundColor":"#404040","fontColor":"#FFFFFF","children":["this.MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B","this.MenuItem_37640B1E_38BC_E917_4194_3179F188B768"],"selectedFontColor":"#FFFFFF","rollOverFontColor":"#FFFFFF","class":"Menu","label":trans('Menu_2FEE8641_3F28_BEEB_419C_72067918AF77.label'),"id":"Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","fontFamily":"Arial","rollOverBackgroundColor":"#000000"},{"id":"FadeInEffect_370FBA95_38BC_EB15_41C2_D715CDB6AE8D","class":"FadeInEffect"},{"vfov":180,"hfov":360,"id":"media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0","video":["this.videores_3309AED8_3CB0_48E6_41B1_78BA5DF83A12"],"pitch":0,"cardboardMenu":"this.Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","thumbnailUrl":"media/media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_t.jpg","data":{"label":"waikru_5_2"},"hfovMin":60,"class":"Video360","hfovMax":140,"label":trans('media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0.label')},{"displayPlaybackBar":true,"class":"VideoPlayer","viewerArea":"this.MainViewer","id":"MainViewerVideoPlayer","clickAction":"play_pause","displayPlayOverlay":true,"buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC"},{"id":"videores_374D64CD_38BF_1F7A_41AE_6ACB47B871C4","levels":["this.videolevel_330ABEC5_3CB0_48EF_41C1_A51DA01E5E89"],"height":1920,"class":"VideoResource","width":3840},{"camera":"this.media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0_camera","class":"Video360PlayListItem","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","id":"Video360PlayListItem_336C0035_3CB0_B7AF_41C8_16D980C0CC2E","media":"this.media_33422258_38B7_3B1B_41A5_F2CA24D6D6B0","begin":"this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 0)","start":"this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E,this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC,this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558], 'begin', true, this.FadeInEffect_34DD8992_38CC_64BA_41B1_8781432300F0, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', false, this.FadeOutEffect_370F5A96_38BC_EB17_41A3_BF17C6C4E846, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.MainViewer], 'begin', true, this.FadeInEffect_32723617_3CB0_BB6B_41C6_472C0165A387, 0, 0); this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.MainViewerPanoramaPlayer.set('displayPlayOverlay', false); this.MainViewerPanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.mainPlayList, 1, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 1)"},{"id":"MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B","class":"MenuItem","label":trans('MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B.label')},{"id":"MenuItem_37640B1E_38BC_E917_4194_3179F188B768","click":"this.setPlayListSelectedIndex(this.mainPlayList, 1)","class":"MenuItem","label":trans('MenuItem_37640B1E_38BC_E917_4194_3179F188B768.label')},{"height":1920,"codec":"h264","bitrate":17677,"framerate":29.97,"type":"video/mp4","url":trans('videores_3309AED8_3CB0_48E6_41B1_78BA5DF83A12.url'),"class":"Video360Resource","id":"videores_3309AED8_3CB0_48E6_41B1_78BA5DF83A12","width":3840,"posterURL":trans('videores_3309AED8_3CB0_48E6_41B1_78BA5DF83A12.posterURL')},{"height":1920,"url":trans('videolevel_330ABEC5_3CB0_48EF_41C1_A51DA01E5E89.url'),"class":"VideoResourceLevel","bitrate":16572,"id":"videolevel_330ABEC5_3CB0_48EF_41C1_A51DA01E5E89","type":"video/mp4","framerate":29.97,"codec":"h264","width":3840,"posterURL":trans('videolevel_330ABEC5_3CB0_48EF_41C1_A51DA01E5E89.posterURL')}]};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.2.7, Sun Feb 8 2026