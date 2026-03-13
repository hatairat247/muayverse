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
var script = {"buttonToggleFullscreen":"this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","defaultMenu":["fullscreen","mute","rotation"],"hash": "bff6a77bd6158b316db870ad26cb6b5a01d489ed3f18919cc79e060a42ddb138", "definitions": [{"id":"mainPlayList","items":[{"class":"VideoPlayListItem","media":"this.video_E1C6E601_EE8E_A9B6_41E8_0094ABA91E22","start":"this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC,this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E], 'begin', true, this.FadeInEffect_ED0532CE_E311_D7EB_41DA_1C0DCD8B3071, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', true, this.FadeInEffect_171D917D_0539_2CF8_417D_2859B3039FA1, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.MainViewer], 'begin', true, this.FadeInEffect_01E8656B_0E7D_E222_4186_5FA72C5CFF63, 0, 0); this._initItemWithComps(this.mainPlayList, 0, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558], 'begin', false, null, 0, 0); this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.MainViewerVideoPlayer.set('displayPlayOverlay', true); this.MainViewerVideoPlayer.set('clickAction', 'play_pause'); this.changeBackgroundWhilePlay(this.mainPlayList, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 0)","begin":"this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)","player":"this.MainViewerVideoPlayer"},"this.Video360PlayListItem_F3AB9EAA_E50C_E31A_41EC_82C29325E987"],"class":"PlayList"},{"iconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC.png","pressedIconURL":"skin/IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC_pressed.png","id":"IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","horizontalAlign":"center","left":"47.84%","data":{"name":"play"},"transparencyActive":true,"mode":"toggle","verticalAlign":"middle","minHeight":0,"minWidth":0,"bottom":"5%","height":45,"class":"IconButton","width":45,"backgroundOpacity":0,"visible":false,"propagateClick":false},{"displayPlaybackBar":true,"clickAction":"play_pause","viewerArea":"this.MainViewer","id":"MainViewerVideoPlayer","class":"VideoPlayer","displayPlayOverlay":true,"buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC"},{"toolTipFontFamily":"Arial","iconURL":"skin/IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.png","toolTipBorderColor":"#767676","id":"IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","horizontalAlign":"center","toolTipBackgroundColor":"#F6F6F6","data":{"name":"IconButton14830"},"toolTipTextShadowColor":"#000000","toolTipPaddingTop":4,"toolTipPaddingBottom":4,"right":"2.37%","maxHeight":55,"maxWidth":54,"toolTipFontColor":"#606060","toolTipPaddingLeft":6,"verticalAlign":"middle","minHeight":1,"minWidth":1,"top":"2.32%","width":55,"height":55,"class":"IconButton","backgroundOpacity":0,"visible":false,"toolTip":trans('IconButton_303C7758_3F28_9E98_41BE_DF89033D2558.toolTip'),"propagateClick":false,"toolTipPaddingRight":6,"toolTipShadowColor":"#333333"},{"id":"FadeInEffect_ED0532CE_E311_D7EB_41DA_1C0DCD8B3071","class":"FadeInEffect"},{"id":"FadeInEffect_EE678901_E312_D258_41D8_7E148374BF79","class":"FadeInEffect","easing":"cubic_in_out"},{"buttonCardboardView":"this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","viewerArea":"this.MainViewer","displayPlaybackBar":true,"gyroscopeEnabled":true,"buttonPause":"this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","aaEnabled":true,"id":"MainViewerPanoramaPlayer","touchControlMode":"drag_rotation","keepModel3DLoadedWithoutLocation":true,"class":"PanoramaPlayer","mouseControlMode":"drag_rotation","arrowKeysAction":"translate"},{"click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.Video360PlayListItem_F3AB9EAA_E50C_E31A_41EC_82C29325E987, 0, 0, 120 || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 1); this.MainViewerPanoramaPlayer.play()","iconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F.png","pressedIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_pressed.png","id":"IconButton_15C8772E_0549_3418_4190_EDCF9015B37F","horizontalAlign":"center","data":{"name":"Skip Intro"},"right":"2.29%","transparencyActive":true,"verticalAlign":"middle","minHeight":0,"minWidth":0,"bottom":"20.49%","height":45,"class":"IconButton","width":45,"rollOverIconURL":"skin/IconButton_15C8772E_0549_3418_4190_EDCF9015B37F_rollover.png","backgroundOpacity":0,"visible":false,"propagateClick":false},{"id":"FadeOutEffect_11F6CE11_053F_D408_4154_A9560850F52F","class":"FadeOutEffect","easing":"cubic_in_out"},{"toolTipFontFamily":"Arial","iconURL":"skin/IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.png","toolTipBorderColor":"#767676","id":"IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","horizontalAlign":"center","toolTipBackgroundColor":"#F6F6F6","data":{"name":"full"},"toolTipTextShadowColor":"#000000","toolTipPaddingTop":4,"toolTipPaddingBottom":4,"right":"2.37%","transparencyActive":true,"maxHeight":128,"maxWidth":128,"toolTipFontColor":"#606060","toolTipPaddingLeft":6,"mode":"toggle","verticalAlign":"middle","minHeight":1,"minWidth":1,"bottom":"5%","width":40,"height":40,"class":"IconButton","backgroundOpacity":0,"visible":false,"toolTip":trans('IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E.toolTip'),"propagateClick":false,"toolTipPaddingRight":6,"toolTipShadowColor":"#333333"},{"enterPointingToHorizon":true,"id":"media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_camera","class":"RotationalCamera","initialPosition":{"hfov":120,"pitch":0,"class":"RotationalCameraPosition","yaw":0}},{"class":"Video","video":"this.videores_FE22AB50_EE9F_5E56_41B0_647625E38532","height":1920,"width":3840,"thumbnailUrl":"media/video_E1C6E601_EE8E_A9B6_41E8_0094ABA91E22_t.jpg","id":"video_E1C6E601_EE8E_A9B6_41E8_0094ABA91E22"},{"toolTipFontFamily":"Arial","width":"100%","toolTipBorderColor":"#767676","subtitlesTextShadowVerticalLength":1,"subtitlesTextShadowHorizontalLength":1,"playbackBarProgressBackgroundColorRatios":[0],"playbackBarBorderColor":"#FFFFFF","subtitlesBorderColor":"#FFFFFF","progressBackgroundColorRatios":[0],"playbackBarProgressBorderColor":"#000000","toolTipBackgroundColor":"#F6F6F6","data":{"name":"Main Viewer"},"subtitlesFontFamily":"Arial","toolTipPaddingTop":4,"toolTipPaddingBottom":4,"progressRight":"33%","progressBarBackgroundColorDirection":"horizontal","progressOpacity":0.7,"playbackBarHeadBorderRadius":0,"playbackBarHeadBorderColor":"#000000","progressBarBorderColor":"#000000","playbackBarBorderRadius":0,"playbackBarBorderSize":0,"progressBarBackgroundColorRatios":[0],"progressBorderColor":"#000000","subtitlesGap":0,"progressBarBackgroundColor":["#3399FF"],"subtitlesBackgroundColor":"#000000","surfaceReticleColor":"#FFFFFF","playbackBarHeadShadowBlurRadius":3,"class":"ViewerArea","progressBackgroundColor":["#000000"],"playbackBarLeft":0,"toolTipFontSize":"1.11vmin","playbackBarHeadBackgroundColorRatios":[0,1],"progressBottom":10,"progressHeight":2,"propagateClick":false,"progressBorderSize":0,"playbackBarHeadShadowColor":"#000000","playbackBarHeadBorderSize":0,"playbackBarHeadHeight":15,"playbackBarHeadShadow":true,"subtitlesTextShadowOpacity":1,"playbackBarBackgroundOpacity":1,"vrPointerColor":"#FFFFFF","progressBarBorderSize":0,"id":"MainViewer","progressBarBorderRadius":2,"playbackBarHeadBackgroundColor":["#111111","#666666"],"toolTipShadowColor":"#333138","firstTransitionDuration":0,"surfaceReticleSelectionColor":"#FFFFFF","toolTipTextShadowColor":"#000000","subtitlesFontColor":"#FFFFFF","playbackBarBottom":5,"progressBorderRadius":2,"progressLeft":"33%","toolTipFontColor":"#606060","toolTipPaddingLeft":6,"subtitlesTop":0,"playbackBarBackgroundColor":["#FFFFFF"],"playbackBarHeight":10,"minHeight":50,"minWidth":100,"vrPointerSelectionTime":2000,"playbackBarHeadWidth":6,"playbackBarBackgroundColorDirection":"vertical","playbackBarProgressBorderSize":0,"vrPointerSelectionColor":"#FF6600","playbackBarRight":0,"playbackBarProgressBackgroundColor":["#3399FF"],"subtitlesFontSize":"3vmin","subtitlesBottom":50,"subtitlesTextShadowColor":"#000000","height":"100%","playbackBarHeadShadowOpacity":0.7,"playbackBarProgressBorderRadius":0,"toolTipPaddingRight":6,"subtitlesBackgroundOpacity":0.2},{"thumbnailUrl":"media/media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_t.jpg","vfov":180,"id":"media_2DCA9836_2101_25C2_41BC_F3DD9796BF32","class":"Video360","video":["this.videores_F3B08D15_E50C_E10F_41BD_8EB00744AFD9"],"pitch":0,"cardboardMenu":"this.Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","hfov":360,"hfovMin":60,"hfovMax":140},{"id":"FadeInEffect_171D917D_0539_2CF8_417D_2859B3039FA1","duration":500,"class":"FadeInEffect"},{"distance":2,"class":"Menu","selectedBackgroundColor":"#202020","rollOverOpacity":0.8,"backgroundColor":"#404040","rollOverBackgroundColor":"#000000","children":["this.menuItem_F6E3DE14_E51D_230E_41E5_EF8C5D48E485"],"opacity":0.4,"rollOverFontColor":"#FFFFFF","label":trans('Menu_2FEE8641_3F28_BEEB_419C_72067918AF77.label'),"id":"Menu_2FEE8641_3F28_BEEB_419C_72067918AF77","fontColor":"#FFFFFF","fontFamily":"Bebas Neue","selectedFontColor":"#FFFFFF"},{"id":"FadeInEffect_01E8656B_0E7D_E222_4186_5FA72C5CFF63","class":"FadeInEffect","easing":"cubic_in_out"},{"camera":"this.media_2DCA9836_2101_25C2_41BC_F3DD9796BF32_camera","media":"this.media_2DCA9836_2101_25C2_41BC_F3DD9796BF32","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","id":"Video360PlayListItem_F3AB9EAA_E50C_E31A_41EC_82C29325E987","class":"Video360PlayListItem","begin":"this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 0)","start":"this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC,this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E], 'begin', true, null, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558], 'begin', true, this.FadeInEffect_EE678901_E312_D258_41D8_7E148374BF79, 0, 0); this._initItemWithComps(this.mainPlayList, 1, [this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F], 'begin', false, this.FadeOutEffect_11F6CE11_053F_D408_4154_A9560850F52F, 0, 0); this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.MainViewerPanoramaPlayer.set('displayPlayOverlay', false); this.MainViewerPanoramaPlayer.set('clickAction', 'none'); this.changeBackgroundWhilePlay(this.mainPlayList, 1, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 1)"},{"id":"videores_FE22AB50_EE9F_5E56_41B0_647625E38532","height":1920,"class":"VideoResource","width":3840,"levels":["this.videolevel_F3B12D01_E50C_E107_41E9_126F78F3DAD3"]},{"posterURL":trans('videores_F3B08D15_E50C_E10F_41BD_8EB00744AFD9.posterURL'),"codec":"h264","bitrate":11111,"height":1920,"class":"Video360Resource","type":"video/mp4","url":trans('videores_F3B08D15_E50C_E10F_41BD_8EB00744AFD9.url'),"id":"videores_F3B08D15_E50C_E10F_41BD_8EB00744AFD9","framerate":29.97,"width":3840},{"id":"menuItem_F6E3DE14_E51D_230E_41E5_EF8C5D48E485","click":"var state = this.MainViewerPanoramaPlayer.get('state'); if(state == 'playing') { this.MainViewerPanoramaPlayer.pause() } else if(state == 'paused') { this.MainViewerPanoramaPlayer.play() }; var state = this.MainViewerVideoPlayer.get('state'); if(state == 'playing') { this.MainViewerVideoPlayer.pause() } else if(state == 'paused') { this.MainViewerVideoPlayer.play() }","class":"MenuItem","label":trans('menuItem_F6E3DE14_E51D_230E_41E5_EF8C5D48E485.label')},{"posterURL":trans('videolevel_F3B12D01_E50C_E107_41E9_126F78F3DAD3.posterURL'),"height":1920,"url":trans('videolevel_F3B12D01_E50C_E107_41E9_126F78F3DAD3.url'),"codec":"h264","bitrate":16572,"id":"videolevel_F3B12D01_E50C_E107_41E9_126F78F3DAD3","framerate":29.97,"type":"video/mp4","class":"VideoResourceLevel","width":3840}],"id":"rootPlayer","start":"this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","data":{"locales":{"en":"locale/en.txt"},"defaultLocale":"en","name":"Player453","textToSpeechConfig":{"pitch":1,"volume":1,"speechOnInfoWindow":false,"speechOnQuizQuestion":false,"speechOnTooltip":false,"stopBackgroundAudio":false,"rate":1},"displayTooltipInTouchScreens":true,"history":{},"forceDefaultLocale":true},"backgroundColor":["#FFFFFF"],"left":436.45,"backgroundColorRatios":[0],"layout":"absolute","watermark":false,"scrollBarMargin":2,"minHeight":0,"children":["this.MainViewer","this.IconButton_33C595F2_2101_6E42_41B9_2EEAAD3790EC","this.IconButton_303C7758_3F28_9E98_41BE_DF89033D2558","this.IconButton_580F081A_55DC_96C2_41D4_E0BC6F8FD89E","this.IconButton_15C8772E_0549_3418_4190_EDCF9015B37F"],"minWidth":0,"gap":10,"scrollBarColor":"#000000","width":"100%","scripts":{"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"textToSpeech":TDV.Tour.Script.textToSpeech,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"mixObject":TDV.Tour.Script.mixObject,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"openLink":TDV.Tour.Script.openLink,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"clone":TDV.Tour.Script.clone,"setValue":TDV.Tour.Script.setValue,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"executeJS":TDV.Tour.Script.executeJS,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"existsKey":TDV.Tour.Script.existsKey,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"getPixels":TDV.Tour.Script.getPixels,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"playAudioList":TDV.Tour.Script.playAudioList,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"showWindow":TDV.Tour.Script.showWindow,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"getMainViewer":TDV.Tour.Script.getMainViewer,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"getMediaByName":TDV.Tour.Script.getMediaByName,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"getOverlays":TDV.Tour.Script.getOverlays,"getKey":TDV.Tour.Script.getKey,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"init":TDV.Tour.Script.init,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"cloneBindings":TDV.Tour.Script.cloneBindings,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getComponentByName":TDV.Tour.Script.getComponentByName,"isPanorama":TDV.Tour.Script.isPanorama,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"showPopupImage":TDV.Tour.Script.showPopupImage,"historyGoForward":TDV.Tour.Script.historyGoForward,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"downloadFile":TDV.Tour.Script.downloadFile,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"setMapLocation":TDV.Tour.Script.setMapLocation,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"historyGoBack":TDV.Tour.Script.historyGoBack,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"enableVR":TDV.Tour.Script.enableVR,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"quizShowScore":TDV.Tour.Script.quizShowScore,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"quizStart":TDV.Tour.Script.quizStart,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"createTween":TDV.Tour.Script.createTween,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"disableVR":TDV.Tour.Script.disableVR,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"initAnalytics":TDV.Tour.Script.initAnalytics,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"toggleVR":TDV.Tour.Script.toggleVR,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"quizFinish":TDV.Tour.Script.quizFinish,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"shareSocial":TDV.Tour.Script.shareSocial,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"initQuiz":TDV.Tour.Script.initQuiz,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"registerKey":TDV.Tour.Script.registerKey,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"setLocale":TDV.Tour.Script.setLocale,"resumePlayers":TDV.Tour.Script.resumePlayers,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"startMeasurement":TDV.Tour.Script.startMeasurement,"unregisterKey":TDV.Tour.Script.unregisterKey,"translate":TDV.Tour.Script.translate,"getMediaByTags":TDV.Tour.Script.getMediaByTags},"height":"100%","class":"Player","propagateClick":false};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.2.7, Fri Mar 13 2026