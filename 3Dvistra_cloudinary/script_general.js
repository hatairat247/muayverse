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
var script = {"children":["this.MainViewer","this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E"],"layout":"absolute","minHeight":0,"minWidth":0,"propagateClick":false,"id":"rootPlayer","data":{"history":{},"displayTooltipInTouchScreens":true,"textToSpeechConfig":{"pitch":1,"speechOnQuizQuestion":false,"volume":1,"rate":1,"speechOnInfoWindow":false,"stopBackgroundAudio":false,"speechOnTooltip":false},"locales":{"en":"locale/en.txt"},"name":"Player453","defaultLocale":"en"},"backgroundColor":["#FFFFFF"],"scrollBarMargin":2,"hash": "fa23de8f224d370231f8c9ba330fa884daac1278b3bb99ee0df10c434725f291", "definitions": [{"id":"mainPlayList","items":[{"camera":"this.media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_camera","media":"this.media_2DCA9836_2101_25C2_41BC_F3DD9796BF32","class":"Video360PlayListItem","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","begin":"this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer)","start":"this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.MainViewerPanoramaPlayer.set('displayPlayOverlay', false); this.MainViewerPanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.mainPlayList, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 0)"}],"class":"PlayList"},{"thumbnailUrl":"media/media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_t.jpg","class":"Video360","hfov":360,"vfov":180,"hfovMax":140,"video":["this.videores_64F98522_6A93_269C_41D4_3CF07E4D2B94"],"data":{"label":"sastrawut_colorgrading"},"pitch":0,"hfovMin":60,"cardboardMenu":"this.Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","id":"media_2DCA9836_2101_25C2_41BC_F3DD9796BF32","label":trans('media_2DCA9836_2101_25C2_41BC_F3DD9796BF32.label')},{"playbackBarProgressBorderColor":"#000000","toolTipBorderColor":"#767676","toolTipPaddingLeft":6,"playbackBarBackgroundOpacity":1,"subtitlesBackgroundColor":"#000000","playbackBarHeadBorderRadius":0,"subtitlesTextShadowOpacity":1,"toolTipBackgroundColor":"#F6F6F6","playbackBarHeadBorderColor":"#000000","subtitlesFontColor":"#FFFFFF","playbackBarBorderSize":0,"subtitlesTop":0,"subtitlesTextShadowColor":"#000000","surfaceReticleSelectionColor":"#FFFFFF","toolTipPaddingTop":4,"firstTransitionDuration":0,"progressBackgroundColorRatios":[0],"progressOpacity":0.7,"progressRight":"33%","playbackBarHeadShadowBlurRadius":3,"subtitlesFontSize":"3vmin","subtitlesBackgroundOpacity":0.2,"data":{"name":"Main Viewer"},"progressBarBorderColor":"#000000","subtitlesTextShadowVerticalLength":1,"progressBarBackgroundColorDirection":"horizontal","progressBarBackgroundColorRatios":[0],"playbackBarHeadHeight":15,"subtitlesBorderColor":"#FFFFFF","playbackBarLeft":0,"playbackBarHeadShadowColor":"#000000","toolTipFontColor":"#606060","playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadShadow":true,"playbackBarHeadBorderSize":0,"subtitlesBottom":50,"progressBorderColor":"#000000","toolTipPaddingBottom":4,"toolTipFontFamily":"Arial","playbackBarHeadBackgroundColor":["#111111","#666666"],"progressBarBackgroundColor":["#3399FF"],"minHeight":50,"toolTipFontSize":"1.11vmin","minWidth":100,"progressBackgroundColor":["#000000"],"id":"MainViewer","progressBottom":10,"playbackBarBottom":5,"subtitlesFontFamily":"Arial","playbackBarBackgroundColor":["#FFFFFF"],"progressBorderSize":0,"progressBarBorderRadius":2,"progressBarBorderSize":0,"vrPointerSelectionColor":"#FF6600","playbackBarProgressBorderSize":0,"progressHeight":2,"playbackBarHeadWidth":6,"playbackBarRight":0,"playbackBarHeight":10,"playbackBarBackgroundColorDirection":"vertical","class":"ViewerArea","vrPointerSelectionTime":2000,"progressBorderRadius":2,"playbackBarProgressBackgroundColor":["#3399FF"],"progressLeft":"33%","playbackBarProgressBorderRadius":0,"vrPointerColor":"#FFFFFF","playbackBarHeadShadowOpacity":0.7,"toolTipTextShadowColor":"#000000","width":"100%","toolTipPaddingRight":6,"subtitlesTextShadowHorizontalLength":1,"surfaceReticleColor":"#FFFFFF","toolTipShadowColor":"#333138","playbackBarProgressBackgroundColorRatios":[0],"subtitlesGap":0,"playbackBarBorderColor":"#FFFFFF","propagateClick":false,"playbackBarBorderRadius":0,"height":"100%"},{"rollOverBackgroundColor":"#000000","distance":2,"class":"Menu","rollOverOpacity":0.8,"opacity":0.4,"backgroundColor":"#404040","fontColor":"#FFFFFF","selectedBackgroundColor":"#202020","rollOverFontColor":"#FFFFFF","label":trans('Menu_2FEE8641_3F28_BEEB_419C_72067918AF77.label'),"children":["this.MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B"],"id":"Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","fontFamily":"Arial","selectedFontColor":"#FFFFFF"},{"toolTipPaddingBottom":4,"toolTipFontFamily":"Arial","toolTipBorderColor":"#767676","propagateClick":false,"minHeight":1,"minWidth":1,"toolTipPaddingLeft":6,"id":"IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","horizontalAlign":"center","toolTipBackgroundColor":"#F6F6F6","data":{"name":"IconButton14830"},"right":"2.37%","iconURL":"skin/IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.png","toolTip":trans('IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.toolTip'),"toolTipPaddingTop":4,"backgroundOpacity":0,"class":"IconButton","verticalAlign":"middle","top":"2.32%","width":55,"height":55,"toolTipPaddingRight":6,"toolTipFontColor":"#606060","toolTipShadowColor":"#333333","maxHeight":55,"toolTipTextShadowColor":"#000000","maxWidth":54},{"minHeight":0,"minWidth":0,"propagateClick":false,"id":"IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","horizontalAlign":"center","left":"47.84%","iconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC.png","data":{"name":"Button53066"},"backgroundOpacity":0,"class":"IconButton","pressedIconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_pressed.png","verticalAlign":"middle","mode":"toggle","bottom":"5%","width":45,"height":45,"transparencyActive":true},{"toolTipPaddingBottom":4,"toolTipBorderColor":"#767676","toolTipPaddingLeft":6,"minHeight":1,"minWidth":1,"propagateClick":false,"id":"IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","toolTipFontFamily":"Arial","horizontalAlign":"center","toolTipBackgroundColor":"#F6F6F6","data":{"name":"IconButton1493"},"right":"2.37%","iconURL":"skin/IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.png","toolTip":trans('IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.toolTip'),"toolTipPaddingTop":4,"backgroundOpacity":0,"class":"IconButton","verticalAlign":"middle","mode":"toggle","bottom":"5%","width":40,"height":40,"toolTipPaddingRight":6,"toolTipFontColor":"#606060","toolTipShadowColor":"#333333","transparencyActive":true,"maxHeight":128,"toolTipTextShadowColor":"#000000","maxWidth":128},{"enterPointingToHorizon":true,"class":"RotationalCamera","id":"media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_camera","initialPosition":{"pitch":0,"yaw":0,"class":"RotationalCameraPosition","hfov":120}},{"viewerArea":"this.MainViewer","mouseControlMode":"drag_rotation","touchControlMode":"drag_rotation","class":"PanoramaPlayer","arrowKeysAction":"translate","gyroscopeEnabled":true,"aaEnabled":true,"displayPlaybackBar":true,"buttonCardboardView":"this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","keepModel3DLoadedWithoutLocation":true,"id":"MainViewerPanoramaPlayer","buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC"},{"posterURL":trans('videores_64F98522_6A93_269C_41D4_3CF07E4D2B94.posterURL'),"height":1920,"codec":"h264","class":"Video360Resource","framerate":29.97,"bitrate":17677,"type":"video/mp4","url":trans('videores_64F98522_6A93_269C_41D4_3CF07E4D2B94.url'),"id":"videores_64F98522_6A93_269C_41D4_3CF07E4D2B94","width":3840},{"id":"MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B","click":"this.setPlayListSelectedIndex(this.mainPlayList, 0)","class":"MenuItem","label":trans('MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B.label')}],"class":"Player","watermark":false,"defaultMenu":["fullscreen","mute","rotation"],"gap":10,"scripts":{"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"resumePlayers":TDV.Tour.Script.resumePlayers,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"getOverlays":TDV.Tour.Script.getOverlays,"downloadFile":TDV.Tour.Script.downloadFile,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"clone":TDV.Tour.Script.clone,"mixObject":TDV.Tour.Script.mixObject,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"openLink":TDV.Tour.Script.openLink,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"getKey":TDV.Tour.Script.getKey,"quizShowScore":TDV.Tour.Script.quizShowScore,"getMainViewer":TDV.Tour.Script.getMainViewer,"quizStart":TDV.Tour.Script.quizStart,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"executeJS":TDV.Tour.Script.executeJS,"toggleVR":TDV.Tour.Script.toggleVR,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"getPixels":TDV.Tour.Script.getPixels,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"quizFinish":TDV.Tour.Script.quizFinish,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"disableVR":TDV.Tour.Script.disableVR,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"showPopupImage":TDV.Tour.Script.showPopupImage,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"init":TDV.Tour.Script.init,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"createTween":TDV.Tour.Script.createTween,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"historyGoForward":TDV.Tour.Script.historyGoForward,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"textToSpeech":TDV.Tour.Script.textToSpeech,"enableVR":TDV.Tour.Script.enableVR,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"registerKey":TDV.Tour.Script.registerKey,"shareSocial":TDV.Tour.Script.shareSocial,"initAnalytics":TDV.Tour.Script.initAnalytics,"cloneBindings":TDV.Tour.Script.cloneBindings,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"startMeasurement":TDV.Tour.Script.startMeasurement,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"getComponentByName":TDV.Tour.Script.getComponentByName,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"setMapLocation":TDV.Tour.Script.setMapLocation,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"setValue":TDV.Tour.Script.setValue,"playAudioList":TDV.Tour.Script.playAudioList,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"isPanorama":TDV.Tour.Script.isPanorama,"getMediaByName":TDV.Tour.Script.getMediaByName,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"historyGoBack":TDV.Tour.Script.historyGoBack,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"unregisterKey":TDV.Tour.Script.unregisterKey,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"translate":TDV.Tour.Script.translate,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"showWindow":TDV.Tour.Script.showWindow,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"setLocale":TDV.Tour.Script.setLocale,"existsKey":TDV.Tour.Script.existsKey,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"initQuiz":TDV.Tour.Script.initQuiz,"cloneGeneric":TDV.Tour.Script.cloneGeneric},"width":"100%","scrollBarColor":"#000000","start":"this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","backgroundColorRatios":[0],"buttonToggleFullscreen":"this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","height":"100%"};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.2.7, Mon Dec 29 2025