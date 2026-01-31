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
var script = {"buttonToggleFullscreen":"this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","children":["this.MainViewer","this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F"],"defaultMenu":["fullscreen","mute","rotation"],"hash": "60578bf297f7100784381cc25e1667401daeec2d00d5d93f7a2086b20c18abb8", "definitions": [{"backgroundOpacity":0,"click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.Video360PlayListItem_01B661D3_0E82_E262_4157_E67CB5767BF4, 0, 0, 120 || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 1); this.MainViewerPanoramaPlayer.play()","iconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F.png","id":"IconButton_15C8772E_0549_3418_4190_EDCF9015B37F","class":"IconButton","data":{"name":"Skip Intro"},"horizontalAlign":"center","minHeight":0,"right":"2.29%","minWidth":0,"transparencyActive":true,"bottom":"20.49%","width":45,"height":45,"verticalAlign":"middle","rollOverIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_rollover.png","visible":false,"propagateClick":false,"pressedIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_pressed.png"},{"displayPlaybackBar":true,"clickAction":"play_pause","viewerArea":"this.MainViewer","id":"MainViewerVideoPlayer","displayPlayOverlay":true,"class":"VideoPlayer","buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC"},{"buttonCardboardView":"this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","mouseControlMode":"drag_rotation","class":"PanoramaPlayer","viewerArea":"this.MainViewer","displayPlaybackBar":true,"gyroscopeEnabled":true,"buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","aaEnabled":true,"touchControlMode":"drag_rotation","id":"MainViewerPanoramaPlayer","keepModel3DLoadedWithoutLocation":true,"arrowKeysAction":"translate"},{"thumbnailUrl":"media/media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_t.jpg","data":{"label":"sastrawut_colorgrading"},"vfov":180,"id":"media_2DCA9836_2101_25C2_41BC_F3DD9796BF32","video":["this.videores_019050D0_0E82_E27E_4198_1F0DA4F5AC9C"],"pitch":0,"cardboardMenu":"this.Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","hfov":360,"class":"Video360","hfovMin":60,"label":trans('media_2DCA9836_2101_25C2_41BC_F3DD9796BF32.label'),"hfovMax":140},{"id":"FadeOutEffect_11F6CE11_053F_D408_4154_A9560850F52F","easing":"cubic_in_out","class":"FadeOutEffect"},{"backgroundOpacity":0,"iconURL":"skin/IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.png","toolTipFontFamily":"Arial","toolTipBorderColor":"#767676","maxHeight":128,"maxWidth":128,"toolTipBackgroundColor":"#F6F6F6","class":"IconButton","id":"IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","horizontalAlign":"center","minHeight":1,"data":{"name":"full"},"right":"2.37%","toolTipTextShadowColor":"#000000","minWidth":1,"toolTipPaddingTop":4,"toolTipPaddingBottom":4,"toolTipFontColor":"#606060","mode":"toggle","toolTipPaddingLeft":6,"transparencyActive":true,"toolTip":trans('IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.toolTip'),"bottom":"5%","width":40,"height":40,"verticalAlign":"middle","toolTipPaddingRight":6,"visible":false,"propagateClick":false,"toolTipShadowColor":"#333333"},{"id":"Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","distance":2,"opacity":0.4,"selectedBackgroundColor":"#202020","rollOverFontColor":"#FFFFFF","backgroundColor":"#404040","rollOverBackgroundColor":"#000000","children":["this.MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B"],"label":trans('Menu_2FEE8641_3F28_BEEB_419C_72067918AF77.label'),"rollOverOpacity":0.8,"fontColor":"#FFFFFF","fontFamily":"Arial","class":"Menu","selectedFontColor":"#FFFFFF"},{"id":"FadeInEffect_01E8656B_0E7D_E222_4186_5FA72C5CFF63","easing":"cubic_in_out","class":"FadeInEffect"},{"data":{"label":"sastrawut edit_1 mp4"},"video":"this.videores_FE22AB50_EE9F_5E56_41B0_647625E38532","height":1920,"width":3840,"label":trans('video_E1C6E601_EE8E_A9B6_41E8_0094ABA91E22.label'),"class":"Video","thumbnailUrl":"media/video_E1C6E601_EE8E_A9B6_41E8_0094ABA91E22_t.jpg","id":"video_E1C6E601_EE8E_A9B6_41E8_0094ABA91E22"},{"backgroundOpacity":0,"iconURL":"skin/IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.png","toolTipFontFamily":"Arial","toolTipBorderColor":"#767676","maxHeight":55,"maxWidth":54,"toolTipBackgroundColor":"#F6F6F6","class":"IconButton","id":"IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","horizontalAlign":"center","minHeight":1,"data":{"name":"IconButton14830"},"right":"2.37%","toolTipTextShadowColor":"#000000","minWidth":1,"toolTipPaddingTop":4,"toolTipPaddingBottom":4,"toolTipFontColor":"#606060","toolTipPaddingLeft":6,"toolTip":trans('IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.toolTip'),"top":"2.32%","width":55,"height":55,"verticalAlign":"middle","toolTipPaddingRight":6,"visible":false,"propagateClick":false,"toolTipShadowColor":"#333333"},{"id":"mainPlayList","items":[{"media":"this.video_E1C6E601_EE8E_A9B6_41E8_0094ABA91E22","start":"this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', true, this.FadeInEffect_171D917D_0539_2CF8_417D_2859B3039FA1, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558], 'begin', false, null, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E,this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC], 'begin', true, this.FadeInEffect_171DA17D_0539_2CF8_4188_82D8F28E9B40, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.MainViewer], 'begin', true, this.FadeInEffect_01E8656B_0E7D_E222_4186_5FA72C5CFF63, 0, 0); this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.MainViewerVideoPlayer.set('displayPlayOverlay', true); this.MainViewerVideoPlayer.set('clickAction', 'play_pause'); this.changeBackgroundWhilePlay(this.mainPlayList, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 0)","begin":"this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)","class":"VideoPlayListItem","player":"this.MainViewerVideoPlayer"},"this.Video360PlayListItem_01B661D3_0E82_E262_4157_E67CB5767BF4"],"class":"PlayList"},{"id":"FadeInEffect_171DA17D_0539_2CF8_4188_82D8F28E9B40","class":"FadeInEffect"},{"id":"FadeInEffect_15341D8A_0559_D418_417B_3FB0AEB71BF7","easing":"cubic_in_out","class":"FadeInEffect"},{"toolTipFontFamily":"Arial","toolTipBorderColor":"#767676","playbackBarProgressBackgroundColorRatios":[0],"playbackBarBorderColor":"#FFFFFF","subtitlesTextShadowHorizontalLength":1,"toolTipBackgroundColor":"#F6F6F6","subtitlesBorderColor":"#FFFFFF","progressBackgroundColorRatios":[0],"playbackBarProgressBorderColor":"#000000","subtitlesTextShadowVerticalLength":1,"data":{"name":"Main Viewer"},"subtitlesFontFamily":"Arial","toolTipPaddingTop":4,"toolTipPaddingBottom":4,"progressRight":"33%","progressBarBackgroundColorDirection":"horizontal","progressOpacity":0.7,"playbackBarHeadBorderRadius":0,"progressBarBackgroundColorRatios":[0],"progressBarBorderColor":"#000000","playbackBarHeadBorderColor":"#000000","playbackBarBorderSize":0,"progressBarBackgroundColor":["#3399FF"],"subtitlesBackgroundColor":"#000000","progressBorderColor":"#000000","playbackBarBorderRadius":0,"surfaceReticleColor":"#FFFFFF","subtitlesGap":0,"playbackBarHeadShadowBlurRadius":3,"progressBackgroundColor":["#000000"],"playbackBarLeft":0,"toolTipFontSize":"1.11vmin","playbackBarHeadBackgroundColorRatios":[0,1],"progressBottom":10,"progressHeight":2,"toolTipShadowColor":"#333138","propagateClick":false,"playbackBarBackgroundOpacity":1,"progressBorderSize":0,"playbackBarHeadShadowColor":"#000000","playbackBarHeadBorderSize":0,"playbackBarHeadHeight":15,"subtitlesTextShadowOpacity":1,"playbackBarHeadShadow":true,"progressBarBorderSize":0,"id":"MainViewer","progressBarBorderRadius":2,"class":"ViewerArea","playbackBarHeadBackgroundColor":["#111111","#666666"],"minHeight":50,"firstTransitionDuration":0,"toolTipTextShadowColor":"#000000","minWidth":100,"playbackBarBottom":5,"progressBorderRadius":2,"subtitlesFontColor":"#FFFFFF","progressLeft":"33%","toolTipFontColor":"#606060","toolTipPaddingLeft":6,"subtitlesTop":0,"playbackBarBackgroundColor":["#FFFFFF"],"vrPointerColor":"#FFFFFF","playbackBarHeight":10,"playbackBarHeadWidth":6,"playbackBarProgressBorderSize":0,"vrPointerSelectionTime":2000,"surfaceReticleSelectionColor":"#FFFFFF","playbackBarBackgroundColorDirection":"vertical","playbackBarRight":0,"vrPointerSelectionColor":"#FF6600","playbackBarProgressBorderRadius":0,"subtitlesTextShadowColor":"#000000","subtitlesFontSize":"3vmin","subtitlesBottom":50,"playbackBarProgressBackgroundColor":["#3399FF"],"playbackBarHeadShadowOpacity":0.7,"toolTipPaddingRight":6,"width":"100%","height":"100%","subtitlesBackgroundOpacity":0.2},{"id":"FadeInEffect_171D917D_0539_2CF8_417D_2859B3039FA1","class":"FadeInEffect","duration":500},{"enterPointingToHorizon":true,"id":"media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_camera","initialPosition":{"hfov":120,"pitch":0,"class":"RotationalCameraPosition","yaw":0},"class":"RotationalCamera"},{"backgroundOpacity":0,"iconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC.png","id":"IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","class":"IconButton","left":"47.84%","horizontalAlign":"center","minHeight":0,"data":{"name":"play"},"minWidth":0,"mode":"toggle","transparencyActive":true,"bottom":"5%","width":45,"height":45,"verticalAlign":"middle","visible":false,"propagateClick":false,"pressedIconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_pressed.png"},{"posterURL":trans('videores_019050D0_0E82_E27E_4198_1F0DA4F5AC9C.posterURL'),"codec":"h264","class":"Video360Resource","height":1920,"bitrate":11111,"type":"video/mp4","url":trans('videores_019050D0_0E82_E27E_4198_1F0DA4F5AC9C.url'),"id":"videores_019050D0_0E82_E27E_4198_1F0DA4F5AC9C","framerate":29.97,"width":3840},{"id":"MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B","click":"this.setPlayListSelectedIndex(this.mainPlayList, 1)","class":"MenuItem","label":trans('MenuItem_2FF9F662_3F28_BEA8_41CA_777B5E1D296B.label')},{"id":"videores_FE22AB50_EE9F_5E56_41B0_647625E38532","height":1920,"class":"VideoResource","width":3840,"levels":["this.videolevel_019110BD_0E82_E226_4199_641D3561DEC5"]},{"camera":"this.media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_camera","media":"this.media_2DCA9836_2101_25C2_41BC_F3DD9796BF32","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","id":"Video360PlayListItem_01B661D3_0E82_E262_4157_E67CB5767BF4","begin":"this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 0)","class":"Video360PlayListItem","start":"this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', false, this.FadeOutEffect_11F6CE11_053F_D408_4154_A9560850F52F, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558], 'begin', true, this.FadeInEffect_15341D8A_0559_D418_417B_3FB0AEB71BF7, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E,this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC], 'begin', true, null, 0, 0); this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.MainViewerPanoramaPlayer.set('displayPlayOverlay', false); this.MainViewerPanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.mainPlayList, 1, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 1)"},{"posterURL":trans('videolevel_019110BD_0E82_E226_4199_641D3561DEC5.posterURL'),"height":1920,"url":trans('videolevel_019110BD_0E82_E226_4199_641D3561DEC5.url'),"codec":"h264","width":3840,"id":"videolevel_019110BD_0E82_E226_4199_641D3561DEC5","framerate":29.97,"type":"video/mp4","bitrate":16572,"class":"VideoResourceLevel"}],"id":"rootPlayer","class":"Player","start":"this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","data":{"defaultLocale":"en","textToSpeechConfig":{"pitch":1,"volume":1,"speechOnInfoWindow":false,"speechOnQuizQuestion":false,"speechOnTooltip":false,"stopBackgroundAudio":false,"rate":1},"history":{},"displayTooltipInTouchScreens":true,"name":"Player453","locales":{"en":"locale/en.txt"}},"backgroundColor":["#FFFFFF"],"minHeight":0,"minWidth":0,"backgroundColorRatios":[0],"scrollBarMargin":2,"layout":"absolute","scrollBarColor":"#000000","watermark":false,"width":"100%","gap":10,"scripts":{"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"historyGoBack":TDV.Tour.Script.historyGoBack,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"mixObject":TDV.Tour.Script.mixObject,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"clone":TDV.Tour.Script.clone,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"openLink":TDV.Tour.Script.openLink,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"initAnalytics":TDV.Tour.Script.initAnalytics,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"initQuiz":TDV.Tour.Script.initQuiz,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"getPixels":TDV.Tour.Script.getPixels,"toggleVR":TDV.Tour.Script.toggleVR,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"historyGoForward":TDV.Tour.Script.historyGoForward,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"getMainViewer":TDV.Tour.Script.getMainViewer,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"resumePlayers":TDV.Tour.Script.resumePlayers,"getKey":TDV.Tour.Script.getKey,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"init":TDV.Tour.Script.init,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"createTween":TDV.Tour.Script.createTween,"cloneBindings":TDV.Tour.Script.cloneBindings,"startMeasurement":TDV.Tour.Script.startMeasurement,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"downloadFile":TDV.Tour.Script.downloadFile,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"setMapLocation":TDV.Tour.Script.setMapLocation,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"showPopupImage":TDV.Tour.Script.showPopupImage,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"executeJS":TDV.Tour.Script.executeJS,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"textToSpeech":TDV.Tour.Script.textToSpeech,"shareSocial":TDV.Tour.Script.shareSocial,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"getMediaByName":TDV.Tour.Script.getMediaByName,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"quizFinish":TDV.Tour.Script.quizFinish,"getComponentByName":TDV.Tour.Script.getComponentByName,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"quizShowScore":TDV.Tour.Script.quizShowScore,"registerKey":TDV.Tour.Script.registerKey,"getOverlays":TDV.Tour.Script.getOverlays,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"showWindow":TDV.Tour.Script.showWindow,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"quizStart":TDV.Tour.Script.quizStart,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"translate":TDV.Tour.Script.translate,"unregisterKey":TDV.Tour.Script.unregisterKey,"existsKey":TDV.Tour.Script.existsKey,"enableVR":TDV.Tour.Script.enableVR,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"isPanorama":TDV.Tour.Script.isPanorama,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"playAudioList":TDV.Tour.Script.playAudioList,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"setValue":TDV.Tour.Script.setValue,"setLocale":TDV.Tour.Script.setLocale,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"disableVR":TDV.Tour.Script.disableVR},"height":"100%","propagateClick":false};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.2.7, Fri Jan 30 2026