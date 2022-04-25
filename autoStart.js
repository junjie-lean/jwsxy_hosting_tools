'use strict';

/**
 * @description 刷分托管器
 * @class Scores_Tools
 */
class Scores_Tools {
  constructor(config) {
    // console.log(config);
    // this.timer = null;
    const { silent, dev } = config;
    //静默模式
    this.silentMode = silent;
    //开发模式
    this.devMode = dev;
    //静音播放
    this.needMuted = false;

    this.observe_target = dev ? 'body' : '#playervideocontainer';
    this.warning_target = dev ? '*' : '#dvWarningView';

    //ob实例
    this.observeIns = null;

    //开始工作
    this.start();
  }

  /**
   * @description 开始播放
   */
  makeReplay() {
    window.myMousedown = 1 === 1;
    window?.removeWarningHtml();
    window?.restartStudy();
    return this;
  }

  /**
   * @description 处理弹窗
   */
  makeOb() {
    if (this.needMuted) {
      const video = document.querySelector('video');
      if (video) {
        video.muted = true;
      }
    }
    const ob_target = document.querySelector(this.observe_target);
    const ob_config = { attributes: true, childList: true, subtree: true };
    const oberverCb = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const warnView = document.querySelector('#dvWarningView');
          if (warnView) {
            console.log('警告弹窗打开了！');
            console.log(mutation);
            this.makeReplay();
          }
        }
      }
    };

    if (ob_target) {
      setInterval(() => {
        console.log('autoStart js is active');
      }, 10000);

      //命中播放页面
      this.observeIns = new MutationObserver(oberverCb);
      this.observeIns.observe(ob_target, ob_config);
    }

    return this;
  }

  /**
   * @description 释放Ob
   */
  stopOb() {
    this.observeIns.disconnect();
  }

  /**
   * @description 查看当前是否在处理
   */
  checkCurrentIsObservering(continueOb = false) {
    console.log(this.observeIns);

    if (!this.observeIns) {
      this.makeOb();
    }
  }

  start() {
    this.makeOb();
  }
}

const silent = true;
const dev = false;

const myScores = new Scores_Tools({ silent, dev });

// 以下位商学院播放逻辑源码
// 暂时用到方法
if (1 === 2) {
  function docViewerScrollChanged(a, b) {
    b > 0 && a > studySize && (studySize = a);
  }
  function docLoaded(a) {
    (type = 1), TimerStartLoad();
  }
  function InitFrist() {
    if ('1' == $('#hidNeedMobile').val()) return ShowBindPhone(), !1;
  }
  function restartStudy(a) {
    '1' == submitIsOpen && (commonHelper.startTimer(), (videoStudy.isCheat = !0)),
      '1' === a
        ? initFirstStudy(!0)
        : 'VideoKnowledge' == knowledgeType
        ? void 0 !== myPlayer && 'paused' == myPlayer.getState() && myPlayer.play()
        : ResetTimer();
  }
  function gotoUdp() {
    location.replace('/udp/personal/accountsecurity.htm');
  }
  function videoSeek() {
    oldTime = -1;
  }
  function videoTimeChange(a) {
    if (msgCheatTimes) {
      var b = parseInt(a);
      oldTime != b && msgCheatTimes.indexOf(b) > -1 && (showMsgCheat('0'), (oldTime = b));
    }
  }
  function deleteHeart(a, b) {
    var c = lecaiAPiUrl + '/kng/knowledges/' + (a || kngId) + '/heart';
    $.ajax({
      type: 'POST',
      url: c,
      headers: { Source: '501', Token: token },
      data: JSON.stringify({}),
      contentType: 'application/json',
      dataType: 'json',
      complete: function (a) {
        'function' == typeof b && b();
      },
    });
  }
  function setExpCookie(a, b, c) {
    var d = new Date();
    d.setTime(d.getTime() + 1e3 * (c || 60)),
      (document.cookie = a + '=' + escape(b) + ';expires=' + d.toGMTString() + ';path=/');
  }
  function getExpCookie(a) {
    var b = document.cookie.match(new RegExp('(^| )' + a + '=([^;]*)(;|$)'));
    return null != b ? unescape(b[2]) : null;
  }
  function delExpCookie(a) {
    null != getExpCookie(a) && setExpCookie(a, '', -1);
  }
  function checkHeart(a) {
    if ('1' === isSingle && heartNum >= heartbeatTime) {
      heartNum = 0;
      var b = lecaiAPiUrl + '/kng/knowledges/' + kngId + '/heart';
      $.ajax({
        type: 'GET',
        url: b,
        headers: { Source: '501', Token: token },
        contentType: 'application/json',
        dataType: 'json',
        success: function (b) {
          (heartbeatTime = b.heartbeatTime),
            (heartData = b),
            b.checkResult
              ? 'function' == typeof a && a()
              : showHeartTip(
                  heartTipText
                    .replace('{title1}', b.knowledgeName)
                    .replace('{title2}', b.knowledgeName)
                );
        },
        error: function () {
          'function' == typeof a && a();
        },
      });
    } else 'function' == typeof a && a();
  }
  function showHeartTip(a) {
    var b = document.getElementById('iframeScorm');
    null != b && (b.style.display = 'none');
    var c =
      "<div id='dvHeartTip' class='playgoon'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>" +
      a +
      "</div><input type='button' style='width: 150px; margin-left: 95px;' onclick='closeWebPage();' value='" +
      closekng +
      "' class='btnok' /><input type='button' style='width: 150px; margin-left: 20px;' onclick='learnKng();' value='" +
      continuestudy +
      "' class='btnok' /></div>";
    'DocumentKnowledge' == knowledgeType
      ? $('#docplayercontainer').append(c)
      : ($('#playervideocontainer').append(c),
        $('#playeraudiocontainer').append(c),
        $('#playercontainer').append(c)),
      'VideoKnowledge' == knowledgeType && void 0 !== myPlayer && 'playing' == myPlayer.getState()
        ? myPlayer.pause()
        : (clearInterval(timer), clearInterval(timecheck)),
      CreateSubmitLog('多知识心跳提示', '{}');
  }
  function learnKng() {
    var a = {
        oldKnowledgeId: heartData.knowledgeId,
        oldSourceId: heartData.source,
        newKnowledgeId: kngId,
      },
      b = lecaiAPiUrl + '/kng/knowledges/learn';
    $.ajax({
      type: 'POST',
      url: b,
      headers: { Source: '501', Token: token },
      data: JSON.stringify(a),
      contentType: 'application/json',
      dataType: 'json',
      complete: function (a) {
        $('#dvHeartTip').remove();
        var b = document.getElementById('iframeScorm');
        if ((null != b && (b.style.display = ''), checkFirst))
          if (((checkFirst = !1), 'VideoKnowledge' == knowledgeType)) {
            if (
              (void 0 !== myPlayer && 'paused' == myPlayer.getState()
                ? myPlayer.play()
                : ResetTimer(),
              standardStudyHours > 0 && standardStudyHours < 120 && smalltime > 0)
            ) {
              if ('VideoKnowledge' == knowledgeType && videoLength < 15 && videoLength > 0)
                return void completeDivShow();
              var c = '';
              timersmall = setInterval(function () {
                smalltime >= 0
                  ? (smalltime > 0 ? (c = smalltime + secondtime) : InitLoadStudy(),
                    $('#spanCountdown').html(c),
                    (smalltime -= 1))
                  : clearInterval(timersmall);
              }, 1e3);
            }
          } else initFirstStudy();
        else
          'VideoKnowledge' == knowledgeType &&
          void 0 !== myPlayer &&
          'paused' == myPlayer.getState()
            ? myPlayer.play()
            : ResetTimer();
      },
    });
  }
  function deleteCookieHeart(a) {
    var b = getExpCookie('heartKngId');
    b
      ? (delExpCookie('heartKngId'),
        deleteHeart(b, function () {
          'function' == typeof a && a();
        }))
      : 'function' == typeof a && a();
  }
  function TimerStartLoad() {
    'True' == openRewardTip &&
      standardStudyHours < 120 &&
      !isCompleted &&
      'function' == typeof showRewardTip &&
      showRewardTip(),
      deleteCookieHeart(function () {
        (checkFirst = !0),
          checkHeart(function () {
            initFirstStudy();
          }, !0);
      });
  }
  function initFirstStudy(a) {
    if (
      !a &&
      msgCheatTimes &&
      (('VideoKnowledge' != knowledgeType && msgCheatTimes.indexOf(0) > -1) || !cheatMobile)
    )
      return void showMsgCheat('1');
    if ((SyncSchedule(), standardStudyHours <= 0))
      isCompleted || completedStudy(), completeDivShow();
    else if (standardStudyHours > 0 && standardStudyHours < 120) {
      if ('VideoKnowledge' == knowledgeType && videoLength < 15 && videoLength > 0)
        return void completeDivShow();
      var b = '';
      timersmall = setInterval(function () {
        smalltime >= 0
          ? (smalltime > 0 ? (b = smalltime + secondtime) : InitLoadStudy(),
            $('#spanCountdown').html(b),
            (smalltime -= 1))
          : clearInterval(timersmall);
      }, 1e3);
    } else InitLoadStudy();
  }
  function AddUserKnowledge() {
    if ('1' == isSingle && '' != curTitle) CheatWarming(curTitle);
    else {
      var a =
        '{"orgID":"' +
        orgID +
        '","userID":"' +
        userID +
        '","knowledgeID":"' +
        kngId +
        '","packageID":"' +
        packageID +
        '","masterID":"' +
        masterID +
        '","masterType":"' +
        masterType +
        '","isSingle":"' +
        isSingle +
        '"}';
      $.ajax({
        type: 'POST',
        contentType: 'text/json',
        url: '/Services/StyService.svc/AutoCreateUserKnowledge',
        data: a,
        dataType: 'json',
        cache: !1,
        success: function (a) {
          '' != a
            ? CheatWarming(a)
            : (SyncSchedule(),
              (existsUserKnowledge = 1),
              InitLoadStudy(),
              (studySize = 1),
              $('#divProcessArea').show(),
              $('#ScheduleText').show(),
              $('#divStartArea').show(),
              $('#divNotStartArea').hide(),
              $('#divWarkup').show(),
              $('#spantalscore').text(standardStudyScore),
              0 == initiativeCreditMode && $('#spanStudyScroeShow').show());
        },
      });
    }
  }
  function CheatWarming(a) {
    if ('-2' == a || '-2.' == a) AppendEditPlanHtml();
    else {
      if ('-1' != a && '-1.' != a) return;
      AppendFilePlanHtml();
    }
    $('#divProcessArea').hide(),
      $('#ScheduleText').hide(),
      $('#divNotStartArea').hide(),
      $('#divCompletedArea').hide(),
      $('#divStartArea').hide(),
      (isHere = 1);
  }
  function GetCurSchedule() {
    SyncSchedule();
  }
  function InitLoadStudy() {
    if (standardStudyHours < validtimeSpan) isCompleted || completedStudy();
    else {
      countDown(standardStudyHours - actualStudyHours, function (a) {
        $('#spanLeavTimes').html(a);
      }),
        standardStudyHours - actualStudyHours >= validtimeSpan &&
          (UserActionTimer.fn.Start(kngId, validtimeSpan),
          (timecheck = setInterval(CheckIsMove, 1e3 * validtimeSpan)));
    }
  }
  function countDown(a, b) {
    if (
      (clearInterval(timer),
      ('VideoKnowledge' != knowledgeType ||
        void 0 === myPlayer ||
        'paused' != myPlayer.getState()) &&
        !autoStop)
    ) {
      if ($('#hidSpeed').val()) {
        var c = $('#hidSpeed').val();
        (c = parseFloat(c)), (c = c > 2 ? 1 : c), (a = parseInt(a / c));
      }
      timer = setInterval(function () {
        timerCount++, cheatTimeNum++, heartNum++;
        var c = $('#ScheduleText').text();
        'True' == openRewardTip &&
          a <= 60 &&
          c.indexOf('100%') < 0 &&
          !isCompleted &&
          ('function' == typeof showRewardTip && showRewardTip(), (openRewardTip = 'False')),
          checkHeart(function () {
            if (
              (msgCheatTimes &&
                'VideoKnowledge' !== knowledgeType &&
                msgCheatTimes.indexOf(cheatTimeNum) > -1 &&
                showMsgCheat('0'),
              reZero >= validtimeSpan && reZero % validtimeSpan == 0 && submitStudy(),
              !msgCheatTimes &&
                '1' == antionhook &&
                reZero >= phaseTrackIntervalTime &&
                reZero % phaseTrackIntervalTime == 0)
            )
              try {
                var c = document.getElementById('iframeScorm');
                null != c && (c.style.display = 'none'),
                  (autoStop = !0),
                  AppendWarningHtml(),
                  CreateSubmitLog('防作弊日志记录', '{}');
              } catch (h) {}
            if ((reZero++, actualStudyHours++, --a <= 0)) {
              var d = 1;
              type > 0 && ((d = 0), studySize >= pageSize && (d = 1)),
                1 == d &&
                  0 == initiativeCreditMode &&
                  0 == getCreditMode &&
                  standardStudyHours > 0 &&
                  ($('#spanFinishScroeShow').show(),
                  $('#spanFinishScore').show(),
                  $('#spanActCmpScore').text(standardStudyScore),
                  $('#spanTalCmpScore').text(standardStudyScore));
            } else {
              var e = '';
              (daysold = Math.floor(a / 86400)), daysold > 0 && (e += daysold + daytime);
              var f = a - 86400 * daysold;
              (hrsold = Math.floor(f / 3600)), hrsold > 0 && (e += hrsold + hourtime);
              var g = f - 3600 * hrsold;
              (minsold = Math.floor(g / 60)),
                minsold > 0 && (e += minsold + minutetime),
                (seconds = g - 60 * minsold),
                seconds > 0 && (e += seconds + secondtime),
                b(e);
            }
          });
      }, 1e3);
    }
  }
  function MinuteChange(a) {
    if (a < 100)
      if (a > 0) {
        $('#divScheduleWidth').css('width', 1.13 * a + 'px'),
          $('#ScheduleText').html(a + '%'),
          $('#hidStudySchedule').val(a),
          $('div.select')
            .find('.percent')
            .html(a + '%');
        var b = ((a * standardStudyScore) / 100).toFixed(2);
        0 == getCreditMode && $('#spanobscore').text(b),
          a >= studyRate &&
            ($('#spanCmp').html(
              '<input type="button" class="btn btn-warning" value="' +
                ifinishstudy +
                '" onclick="completedStudy();" />'
            ),
            $('#divHead2').show()),
          $('#hidUserActualStudyScore').val(b),
          $('#hidUserActualStudyHours').val(actualStudyHours);
      } else $('#divScheduleWidth').css('width', '0px');
    else
      $('#divScheduleWidth').css('width', '113px'),
        '100%' !== $('#ScheduleText').html() && $('#ScheduleText').html('100%'),
        $('#hidStudySchedule').val('100'),
        $('div.select').find('.percent').html('100%'),
        $('#divStartArea').hide(),
        $('#divNotStartArea').hide(),
        $('#divCompletedArea').show(),
        (actualStudyHours = standardStudyHours),
        (studySize = pageSize),
        0 == initiativeCreditMode &&
          standardStudyScore > 0 &&
          ($('#spanFinishScroeShow').show(),
          $('#spanFinishScore').show(),
          $('#spanActCmpScore').text(standardStudyScore),
          $('#spanTalCmpScore').text(standardStudyScore)),
        (isCompleted = !0);
  }
  function CheckIsMove() {
    UserActionTimer.fn.Start(kngId, validtimeSpan);
  }
  function fullScreenAction(a) {
    UserActionTimer.fn.SetValidTimeSpan(a);
  }
  function ResetTimer() {
    $('#divNotStartArea').is(':visible') ||
      window.setTimeout(function () {
        isHere = 1;
        try {
          (thisU.MouseActionTime = new Date()), (thisU.LastMouseActionTime = thisU.MouseActionTime);
        } catch (a) {}
        (isHere = 0), InitLoadStudy();
      }, 1e3);
  }
  function StopTimer() {
    clearInterval(timer);
  }
  function submitStudy() {
    if ('PostStudy' == masterType || 'O2OStudy' == masterType || 'OJTStudy' == masterType)
      return void submitPostStudy();
    var a = 0;
    $('#hidViewSchedule').length > 0 && (a = $('#hidViewSchedule').val());
    var b = masterType;
    'Plan' != masterType &&
      'PlanStudy' != masterType &&
      'Position' != masterType &&
      'PositionStudy' != masterType &&
      ((b = ''), (masterID = '')),
      $('#hidSpeed').val() &&
        ((speed = $('#hidSpeed').val()),
        (speed = parseFloat(speed)),
        (speed = speed > 2 ? 1 : speed)),
      'null' == masterID && (masterID = ''),
      submitStudyMethod(
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          masterID +
          '","masterType":"' +
          b +
          '","packageId":"' +
          packageID +
          '","pageSize":' +
          pageSize +
          ',"studySize":' +
          pageSize +
          ',"studyTime":' +
          120 * speed +
          ',"type":' +
          type +
          ',"offLine":false,"end":false,"care":true,"deviceId":"","studyChapterIds":"' +
          stuChpIDs +
          '","viewSchedule":' +
          parseFloat(a) +
          '}',
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          masterID +
          '","masterType":"' +
          b +
          '","packageId":"' +
          packageID +
          '","pageSize":' +
          pageSize +
          ',"studySize":' +
          pageSize +
          ',"studyTime":' +
          120 * speed +
          ',"type":' +
          type +
          ',"offLine":false,"end":false,"care":true,"deviceId":"","studyChapterIds":"' +
          stuChpIDs +
          '","viewSchedule":' +
          parseFloat(a) +
          ',"multiple":' +
          parseFloat(speed) +
          ',"realHour":120}',
        'study',
        'submit'
      );
  }
  function submitPostStudy() {
    var a = 0;
    $('#hidViewSchedule').length > 0 && (a = $('#hidViewSchedule').val());
    var b = masterType,
      c = getQueryString('taskId') || masterID;
    c && c.indexOf(',') && (c = c.split(',')[0]),
      c.indexOf(':st=') > -1 && (c = c.replace(':st=', '')),
      $('#hidSpeed').val() &&
        ((speed = $('#hidSpeed').val()),
        (speed = parseFloat(speed)),
        (speed = speed > 2 ? 1 : speed)),
      'null' == masterID && (masterID = ''),
      submitStudyMethod(
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          c +
          '","masterType":"' +
          b +
          '","sourceId":"' +
          packageID +
          '","studyTime":' +
          120 * speed +
          ',"deviceId":"","offLine":false,"end":false,"viewSchedule":' +
          parseFloat(a) +
          '}',
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          c +
          '","masterType":"' +
          b +
          '","sourceId":"' +
          packageID +
          '","studyTime":' +
          120 * speed +
          ',"deviceId":"","offLine":false,"end":false,"viewSchedule":' +
          parseFloat(a) +
          ',"multiple":' +
          parseFloat(speed) +
          ',"realHour":120}',
        'poststudy',
        'submit'
      );
  }
  function completeDivShow() {
    $('#divCheat').hide(),
      $('#divProcessArea').show(),
      $('#ScheduleText').show(),
      $('#divNotStartArea').hide(),
      $('#divCompletedArea').show(),
      $('#divStartArea').hide(),
      0 == initiativeCreditMode &&
        0 == getCreditMode &&
        standardStudyScore > 0 &&
        ($('#spanFinishScore').show(),
        $('#spanActCmpScore').text(standardStudyScore),
        $('#spanTalCmpScore').text(standardStudyScore)),
      $('#icon' + kngId) && ($('#icon' + kngId).prop('class', 'pic2'), (iscurfinish = 1)),
      (actualStudyHours = standardStudyHours),
      (studySize = pageSize),
      MinuteChange(100),
      (isHere = 1);
  }
  function completedStudy() {
    if ('PostStudy' == masterType || 'O2OStudy' == masterType || 'OJTStudy' == masterType)
      return void completedPostStudy();
    var a = 0;
    $('#hidViewSchedule').length > 0 && (a = $('#hidViewSchedule').val());
    var b = masterType;
    'Plan' != masterType && 'Position' != masterType && (b = ''),
      $('#hidSpeed').val() &&
        ((speed = $('#hidSpeed').val()),
        (speed = parseFloat(speed)),
        (speed = speed > 2 ? 1 : speed)),
      'null' == masterID && (masterID = '');
    var c =
        '{"knowledgeId":"' +
        kngId +
        '","masterId":"' +
        masterID +
        '","masterType":"' +
        b +
        '","packageId":"' +
        packageID +
        '","pageSize":' +
        pageSize +
        ',"studySize":' +
        pageSize +
        ',"studyTime":' +
        120 * speed +
        ',"type":' +
        type +
        ',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"' +
        stuChpIDs +
        '","viewSchedule":' +
        parseFloat(a) +
        '}',
      d =
        '{"knowledgeId":"' +
        kngId +
        '","masterId":"' +
        masterID +
        '","masterType":"' +
        b +
        '","packageId":"' +
        packageID +
        '","pageSize":' +
        pageSize +
        ',"studySize":' +
        pageSize +
        ',"studyTime":' +
        120 * speed +
        ',"type":' +
        type +
        ',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"' +
        stuChpIDs +
        '","viewSchedule":' +
        parseFloat(a) +
        ',"multiple":' +
        parseFloat(speed) +
        ',"realHour":120}';
    submitStudyMethod(c, d, 'study', 'completed'),
      console.log('completedStudy encryptRequest = ' + c + ' || request =' + d);
  }
  function completedLaveTimeStudy() {
    if ('PostStudy' == masterType || 'O2OStudy' == masterType || 'OJTStudy' == masterType)
      return void completedPostStudy();
    var a = 0;
    $('#hidViewSchedule').length > 0 && (a = $('#hidViewSchedule').val());
    var b = masterType;
    'Plan' != masterType && 'Position' != masterType && (b = ''),
      $('#hidSpeed').val() &&
        ((speed = $('#hidSpeed').val()),
        (speed = parseFloat(speed)),
        (speed = speed > 2 ? 1 : speed)),
      'null' == masterID && (masterID = ''),
      submitStudyMethod(
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          masterID +
          '","masterType":"' +
          b +
          '","packageId":"' +
          packageID +
          '","pageSize":' +
          pageSize +
          ',"studySize":' +
          pageSize +
          ',"studyTime":' +
          120 * speed +
          ',"type":' +
          type +
          ',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"' +
          stuChpIDs +
          '","viewSchedule":' +
          parseFloat(a) +
          '}',
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          masterID +
          '","masterType":"' +
          b +
          '","packageId":"' +
          packageID +
          '","pageSize":' +
          pageSize +
          ',"studySize":' +
          pageSize +
          ',"studyTime":' +
          120 * speed +
          ',"type":' +
          type +
          ',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"' +
          stuChpIDs +
          '","viewSchedule":' +
          parseFloat(a) +
          ',"multiple":' +
          parseFloat(speed) +
          ',"realHour":120}',
        'study',
        'completed'
      );
  }
  function completedPostStudy() {
    var a = 0;
    $('#hidViewSchedule').length > 0 && (a = $('#hidViewSchedule').val());
    var b = masterType,
      c = getQueryString('taskId') || masterID;
    c && c.indexOf(',') && (c = c.split(',')[0]),
      c.indexOf(':st=') > -1 && (c = c.replace(':st=', '')),
      $('#hidSpeed').val() &&
        ((speed = $('#hidSpeed').val()),
        (speed = parseFloat(speed)),
        (speed = speed > 2 ? 1 : speed)),
      submitStudyMethod(
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          c +
          '","masterType":"' +
          b +
          '","sourceId":"' +
          packageID +
          '","studyTime":' +
          120 * speed +
          ',"deviceId":"","offLine":false,"end":true,"viewSchedule":' +
          parseFloat(a) +
          '}',
        '{"knowledgeId":"' +
          kngId +
          '","masterId":"' +
          c +
          '","masterType":"' +
          b +
          '","sourceId":"' +
          packageID +
          '","studyTime":' +
          120 * speed +
          ',"deviceId":"","offLine":false,"end":true,"viewSchedule":' +
          parseFloat(a) +
          ',"multiple":' +
          parseFloat(speed) +
          ',"realHour":120}',
        'poststudy',
        'completed'
      );
  }
  function escape2Html(a) {
    var b = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
    return a.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (a, c) {
      return b[c];
    });
  }
  function AppendWarningHtml() {
    if ($('#dvWarningView').length <= 0) {
      var a =
        "<div class='playgoon' id='dvWarningView'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>" +
        $('#hfTip').val() +
        "</div><input id='reStartStudy' type='button' class='btnok' value='" +
        iheretitle +
        "' /></div>";
      'DocumentKnowledge' == knowledgeType
        ? $('#docplayercontainer').append(a)
        : ($('#playervideocontainer').append(a),
          $('#playeraudiocontainer').append(a),
          $('#playercontainer').append(a)),
        (document.getElementById('reStartStudy').onmousedown = function () {
          myMousedown = !0;
        }),
        (document.getElementById('reStartStudy').onclick = removeWarningHtml),
        'VideoKnowledge' == knowledgeType && void 0 !== myPlayer && 'playing' == myPlayer.getState()
          ? myPlayer.pause()
          : clearInterval(timer);
    }
  }
  function removeWarningHtml() {
    if (myMousedown) {
      (myMousedown = !1), $('#dvWarningView').remove();
      var a = document.getElementById('iframeScorm');
      null != a && (a.style.display = ''),
        (autoStop = !1),
        'VideoKnowledge' == knowledgeType && void 0 !== myPlayer && 'paused' == myPlayer.getState()
          ? myPlayer.play()
          : ResetTimer();
    }
  }
  function showSingleTrack(a) {
    var b = document.getElementById('iframeScorm');
    if ((null != b && (b.style.display = 'none'), $('#dvSingleTrack').length <= 0)) {
      var c =
        "<div id='dvSingleTrack' class='playgoon'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>" +
        trackanticheat1 +
        a +
        trackanticheat2 +
        "</div><input type='button' style='width: 150px; margin-left: 175px;' onclick='StartCurStudy();' value='" +
        iwantstudy +
        "' class='btnok' /></div>";
      'DocumentKnowledge' == knowledgeType
        ? $('#docplayercontainer').append(c)
        : ($('#playervideocontainer').append(c),
          $('#playeraudiocontainer').append(c),
          $('#playercontainer').append(c)),
        'VideoKnowledge' == knowledgeType && void 0 !== myPlayer && 'playing' == myPlayer.getState()
          ? myPlayer.pause()
          : (clearInterval(timer), clearInterval(timecheck));
    }
  }
  function AppendFilePlanHtml() {
    if ($('#dvWarningView').length <= 0) {
      var a =
        "<div class='playgoon' id='divEditPlan'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>" +
        planfiled +
        "</div><input type='button' class='btnok' value='" +
        iknow +
        "' onclick='RemoveEditPlanHtml();' /></div>";
      'DocumentKnowledge' == knowledgeType
        ? $('#playercontainerdiv').append(a)
        : $('#playercontainer').append(a),
        'VideoKnowledge' == knowledgeType && void 0 !== myPlayer && 'playing' == myPlayer.getState()
          ? myPlayer.pause()
          : clearInterval(timer);
    }
  }
  function AppendEditPlanHtml() {
    if ($('#dvWarningView').length <= 0) {
      var a =
        "<div class='playgoon' id='divEditPlan'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>" +
        planupdated +
        "</div><input type='button' class='btnok' value='" +
        iknow +
        "' onclick='RemoveEditPlanHtml();' /></div>";
      'DocumentKnowledge' == knowledgeType
        ? $('#playercontainerdiv').append(a)
        : $('#playercontainer').append(a),
        'VideoKnowledge' == knowledgeType && void 0 !== myPlayer && 'playing' == myPlayer.getState()
          ? myPlayer.pause()
          : clearInterval(timer);
    }
  }
  function RemoveEditPlanHtml() {
    $('#divEditPlan').remove();
    var a = document.getElementById('iframeScorm');
    null != a && (a.style.display = '');
  }
  function ShowBindPhone() {
    return $('#hidNeedMobile').val('1'), AppendBindPhone(), !1;
  }
  function AppendBindPhone() {
    if ($('#dvWarningBindPhone').length <= 0) {
      var a =
        "<div id='dvWarningBindPhone' class=''><div class='chaos-bg-color text-center'><div class='clearfix ph30'><div class='no-phone-img'></div><div class='font-size-18 text-center'><span data-localize='sys_msg_needphone'></span></div><div class='font-szie-14 text-grey text-center mv10'><span data-localize='sys_msg_bindingmobile'></span></div><div class='text-center'><input type='button' class='btn btn-primary mt15 binding-phone' data-localize='mine_lbl_bindimmediately' onclick='openBindPhone();' /></div></div><div class='chaos-shade-close' onclick='closeWebPage();'></div></div><div class='ui-widget-overlay' style='width: 100%; height: 100%; z-index: 100;'></div></div>";
      'DocumentKnowledge' == knowledgeType
        ? $('#playercontainerdiv').append(a)
        : ($('#playervideocontainer').append(a),
          $('#playeraudiocontainer').append(a),
          $('#playercontainer').append(a)),
        'VideoKnowledge' == knowledgeType && void 0 !== myPlayer && 'playing' == myPlayer.getState()
          ? myPlayer.pause()
          : timer && clearInterval(timer);
    }
  }
  function openBindPhone() {
    ShowIFrameDialog(
      jQuery.i18n.map.mine_lbl_bindphone,
      550,
      420,
      '/udp/Usm/Personal/Daliogs/BindMobilePhone.aspx'
    );
  }
  function showMsgCheat(a) {
    void 0 !== myPlayer && 'playing' == myPlayer.getState() && myPlayer.pause(),
      clearInterval(timer),
      clearInterval(timersmall),
      ShowIFrameDialog(
        smsCheatTitle,
        320,
        300,
        '/kng/Dialog/MessageCheatDaialog.aspx?kngId=' +
          kngId +
          '&first=' +
          a +
          '&mobile=' +
          cheatMobile +
          '&area=' +
          cheatArea +
          '&pid=' +
          masterID +
          '&masterType=' +
          masterType
      ),
      setTimeout(function () {
        $('.edialogclose').hide();
      }, 10),
      setTimeout(function () {
        $('.edialogclose').hide();
      }, 100),
      setTimeout(function () {
        $('.edialogclose').hide();
      }, 1e3),
      CreateSubmitLog('短信防作弊  弹出短信验证码', '{}');
  }
  function closeWebPage() {
    var a = navigator.userAgent;
    -1 != a.indexOf('Firefox') || -1 != a.indexOf('Presto')
      ? window.location.replace('about:blank')
      : ((window.opener = null), window.open('', '_self'), window.close()),
      window.close();
  }
  function refresh() {
    window.location.reload();
  }
  function SyncPostStudySchedule() {
    var url =
        'PostStudy' === masterType
          ? 'studyapi/uk/singlepostsync'
          : 'studyapi/uk/singleotherpostsync',
      masterTypeStr = masterType,
      taskId = getQueryString('taskId') || masterID;
    taskId && taskId.indexOf(',') && (taskId = taskId.split(',')[0]),
      taskId.indexOf(':st=') > -1 && (taskId = taskId.replace(':st=', ''));
    var arr =
      '{"knowledgeId":"' +
      kngId +
      '","sourceId":"' +
      packageID +
      '","taskId":"' +
      taskId +
      '","sourceType":"' +
      masterTypeStr +
      '","orgId":"' +
      orgID +
      '","userId":"' +
      userID +
      '"}';
    AjaxCallApiMethod({
      type: 'POST',
      url: url,
      data: arr,
      cache: !1,
      async: !1,
      success: function (result) {
        '' != result
          ? ((result = eval('(' + result + ')')),
            (actualStudyHours = 60 * result.actualStudyHours),
            MinuteChange(result.studySchedule))
          : MinuteChange(0);
      },
      error: function (a) {
        console.log(a);
      },
    });
  }
  function SyncSchedule() {
    if (!isCompleted) {
      var masterTypeStr = masterType;
      if ('PostStudy' == masterType || 'O2OStudy' == masterType || 'OJTStudy' == masterType)
        return void SyncPostStudySchedule();
      'Plan' != masterType && 'Position' != masterType && (masterTypeStr = '');
      var arr =
        '{"knowledgeId":"' +
        kngId +
        '","packageId":"' +
        packageID +
        '","masterId":"' +
        masterID +
        '","masterType":"' +
        masterTypeStr +
        '"}';
      AjaxCallApiMethodSubmitStudy({
        type: 'POST',
        url: 'study/updateprogress',
        data: arr,
        cache: !1,
        async: !1,
        success: function (result) {
          (result = eval('(' + result + ')')),
            (actualStudyHours = 60 * result.actualstudyhours),
            MinuteChange(result.studyschedule);
        },
        error: function (a) {},
      });
    }
  }
  function submitStudyMethod(encryptRquest, request, type, postType) {
    var studyBody = request;
    encryptRquest = JSON.stringify(encryptRquest);
    var arr = '{"body":' + encryptRquest + '}',
      studyUrl = 'study/submit?encryption=';
    'PostStudy' === masterType
      ? (studyUrl = 'studyapi/study/postsubmit?encryption=')
      : ('O2OStudy' != masterType && 'OJTStudy' != masterType) ||
        (studyUrl = 'studyapi/study/postsubmitother?encryption='),
      CreateSubmitLog(studyUrl, encryptRquest);
    var requsetBody = '';
    jQuery.ajax({
      type: 'POST',
      contentType: 'text/json',
      url: '/kng/services/KngComService.svc/GetEncryptRequest',
      data: arr,
      dataType: 'json',
      cache: !1,
      async: !1,
      success: function (result) {
        (result = eval('(' + result + ')')),
          'OK' == result.Status &&
            ((requsetBody = result.Data),
            AjaxCallApiMethodSubmitStudy({
              type: 'POST',
              url: studyUrl + requsetBody,
              data: studyBody,
              success: function (a) {
                CreateSubmitLog(studyUrl + 'success', encryptRquest),
                  'submit' == postType && 'study' == type
                    ? submitStudySuccess(a)
                    : 'submit' == postType && 'poststudy' == type
                    ? submitPostStudySuccess(a)
                    : 'completed' == postType && 'study' == type
                    ? (deleteHeart(), studyCompletedSuccess(a))
                    : 'completed' == postType &&
                      'poststudy' == type &&
                      (deleteHeart(), poststudyCompletedSuccess(a));
              },
              error: function (a) {
                CreateSubmitLog(studyUrl + 'error' + a.responseText, encryptRquest),
                  SyncSchedule(),
                  console.log(a),
                  submitStudyError(a);
              },
            }));
      },
      error: function (a) {
        console.log('EncryptBody error' + arr);
      },
    });
  }
  function submitStudySuccess(a) {
    if ('' == a) GetCurSchedule(), InitLoadStudy();
    else {
      if (a.indexOf('﹡') > -1) {
        var b = a.split('﹡');
        b.length > 0 &&
          ((a = b[1]), a.length > 8 && (a = a.substring(0, 8) + '...'), (a = '[' + a + ']'));
      }
      CheatWarming(a);
    }
  }
  function submitStudyError(xhr) {
    var msg = eval('(' + xhr.responseText + ')'),
      result = msg.error.message;
    if (result.indexOf('﹡') > -1) {
      var arrResult = result.split('﹡');
      arrResult.length > 0 &&
        ((result = arrResult[1]),
        result.length > 8 && (result = result.substring(0, 8) + '...'),
        (result = '[' + result + ']'));
    }
    CheatWarming(result);
  }
  function submitPostStudySuccess(a) {
    if (a) {
      if (a.indexOf('﹡') > -1) {
        var b = a.split('﹡');
        b.length > 0 &&
          ((a = b[1]), a.length > 8 && (a = a.substring(0, 8) + '...'), (a = '[' + a + ']'));
      }
      CheatWarming(a);
    } else GetCurSchedule(), InitLoadStudy();
  }
  function studyCompletedSuccess(a) {
    if ('' == a) GetCurSchedule(), completeDivShow();
    else {
      if (a.indexOf('﹡') > -1) {
        var b = a.split('﹡');
        b.length > 0 &&
          ((a = b[1]), a.length > 8 && (a = a.substring(0, 8) + '...'), (a = '[' + a + ']'));
      }
      CheatWarming(a);
    }
  }
  function poststudyCompletedSuccess(a) {
    if (a) {
      if (a.indexOf('﹡') > -1) {
        var b = a.split('﹡');
        b.length > 0 &&
          ((a = b[1]), a.length > 8 && (a = a.substring(0, 8) + '...'), (a = '[' + a + ']'));
      }
      CheatWarming(a);
    } else completeDivShow();
  }
  function AjaxCallApiMethodSubmitStudy(a) {
    var b = {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      Source: 501,
    };
    jQuery.extend(b, { token: token });
    var c = a.url,
      d = lecaiAPiUrl + c;
    isLteIE9() && (d = '/forie9/qidaapi/v1/' + c), (a.url = d);
    var e = { contentType: 'application/json', dataType: 'text', headers: b };
    jQuery.extend(e, a), jQuery.ajax(e);
  }
  function CreateSubmitLog(a, b) {
    logCount++,
      (a =
        a +
        '  ,知识id：' +
        kngId +
        '  ,日志记录次数：' +
        logCount +
        '  ,定时器次数：' +
        timerCount +
        '  ,标准学时：' +
        standardStudyHours +
        '  ,实际学时：' +
        actualStudyHours);
    try {
      if ('VideoKnowledge' == knowledgeType) {
        a = a + '  ,视频进度位置：' + parseInt(player.bdPlayer.getPosition());
      }
    } catch (d) {}
    var c = '{"kngId":"' + kngId + '","apiUrl":"' + a + '","context":' + b + '}';
    AjaxAsyncCallMethodWithKng(
      'CreateSubmitLog',
      c,
      function (a) {
        console.log('学习记录提交！');
      },
      !0,
      !0,
      !0
    );
  }
  var timerspan = void 0,
    timerminute = void 0,
    timecheck = void 0,
    timersmall = void 0,
    speed = 1,
    type = 0,
    stuChpIDs = '',
    iscurfinish = void 0,
    reZero = 0,
    myPlayer,
    curversion,
    myMousedown = !1,
    oldTime = -1,
    heartNum = 0,
    heartbeatTime = 0,
    autoStop = !1,
    cheatTimeNum = 0,
    heartData = {},
    checkFirst = !1,
    logCount = 0,
    timerCount = 0,
    smalltime = 15;
  if (void 0 === msgCheatTimes) var msgCheatTimes = '';
  if (void 0 === openRewardTip) var openRewardTip = 'False';
  if (msgCheatTimes) {
    msgCheatTimes = msgCheatTimes.split(';');
    for (var i = 0; i < msgCheatTimes.length; i++)
      msgCheatTimes[i] = 60 * parseInt(msgCheatTimes[i]);
  }
  masterType || (masterType = getQueryString('masterType') || getQueryString('st') || ''),
    '1' === isSingle &&
      (window.onbeforeunload = function () {
        heartbeatTime > 0 && (deleteHeart(), setExpCookie('heartKngId', kngId)),
          videoStudy.heartbeatTime > 0 &&
            (videoStudy.delHeart(), setExpCookie('heartKngId', kngId));
      });
  var timer,
    daysold,
    hrsold,
    minsold,
    seconds,
    thisU,
    UserActionTimer = function () {
      return new UserActionTimer.fn.init();
    };
  UserActionTimer.fn = UserActionTimer.prototype = {
    Key: void 0,
    LastMouseActionTime: new Date(),
    shadowTimer: void 0,
    TotalActionTime: 0,
    ValidTimeSpan: void 0,
    MouseActionTime: void 0,
    TempTimeSpan: void 0,
    PostInterval: void 0,
    LastPostTotalActionTime: new Date(),
    init: function () {
      return (this.LastMouseActionTime = new Date()), (this.TotalActionTime = 0), this;
    },
    SetValidTimeSpan: function (a) {
      if (((thisU = this), a))
        (thisU.TempTimeSpan = thisU.ValidTimeSpan), (thisU.ValidTimeSpan = 1e4);
      else if (thisU.TempTimeSpan) {
        var b = 0;
        (thisU.MouseActionTime = new Date()),
          (b = thisU.MouseActionTime.getTime() - thisU.LastMouseActionTime.getTime()),
          b <= 1e3 * thisU.ValidTimeSpan && (thisU.TotalActionTime = thisU.TotalActionTime + b),
          (thisU.LastMouseActionTime = thisU.MouseActionTime),
          (thisU.ValidTimeSpan = thisU.TempTimeSpan),
          (thisU.TempTimeSpan = 0);
      }
    },
    Start: function (a, b) {
      if (((thisU = this), !a)) return !1;
      (this.Key = a),
        (this.ValidTimeSpan = b && '' != b ? b : 200),
        $('body').bind(
          'click',
          { actionType: 'click', thisUserActionTimer: this },
          this.mouseActionHandler
        ),
        $('body').bind(
          'mousewheel',
          { actionType: 'mousewheel', thisUserActionTimer: this },
          this.mouseActionHandler
        ),
        $('body').bind(
          'mousemove',
          { actionType: 'mousemove', thisUserActionTimer: this },
          this.mouseActionHandler
        ),
        $('body').bind(
          'keydown',
          { actionType: 'keydown', thisUserActionTimer: this },
          this.mouseActionHandler
        );
      (thisU.MouseActionTime = new Date()),
        thisU.MouseActionTime.getTime(),
        thisU.LastMouseActionTime.getTime();
    },
    mouseActionHandler: function (a) {
      var b = $('#bodyShadow');
      b &&
        (b.hide(),
        this.shadowTimer && clearTimeout(this.shadowTimer),
        (this.shadowTimer = setTimeout(function () {
          b.show();
        }, 15e3))),
        (thisU = a.data.thisUserActionTimer);
      var c = 0;
      (thisU.MouseActionTime = new Date()),
        (c = thisU.MouseActionTime.getTime() - thisU.LastMouseActionTime.getTime()),
        c <= 1e3 * thisU.ValidTimeSpan && (thisU.TotalActionTime = thisU.TotalActionTime + c),
        (thisU.LastMouseActionTime = thisU.MouseActionTime),
        clearInterval(timecheck),
        (timecheck = setInterval(CheckIsMove, 1e3 * validtimeSpan));
    },
    version: '1.0.0',
  };
  var commonHelper = {
      source: 501,
      heartData: {},
      checkHeart: function (a) {
        var b = this,
          c = lecaiAPiUrl + '/kng/knowledges/' + kngId + '/heart';
        $.ajax({
          type: 'GET',
          url: c,
          headers: { Source: this.source, Token: token },
          contentType: 'application/json',
          dataType: 'json',
          success: function (c) {
            (b.heartData = c),
              c.checkResult
                ? 'function' == typeof a && a(c)
                : b.showHeartTip(
                    heartTipText
                      .replace('{title1}', c.knowledgeName)
                      .replace('{title2}', c.knowledgeName)
                  );
          },
          error: function () {
            'function' == typeof a && a();
          },
        });
      },
      showHeartTip: function (a) {
        var b = document.getElementById('iframeScorm');
        null != b && (b.style.display = 'none');
        var c =
          "<div id='dvHeartTip' class='playgoon'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>" +
          a +
          "</div><input type='button' style='width: 150px; margin-left: 95px;' onclick='closeWebPage();' value='" +
          closekng +
          "' class='btnok' /><input type='button' style='width: 150px; margin-left: 20px;' onclick='commonHelper.learnKng();' value='" +
          continuestudy +
          "' class='btnok' /></div>";
        'DocumentKnowledge' == knowledgeType
          ? $('#docplayercontainer').append(c)
          : ($('#playervideocontainer').append(c),
            $('#playeraudiocontainer').append(c),
            $('#playercontainer').append(c)),
          'VideoKnowledge' == knowledgeType && videoStudy.stopTimer(),
          CreateSubmitLog('多知识心跳提示', '{}');
      },
      delHeart: function () {
        var a = lecaiAPiUrl + '/kng/knowledges/' + kngId + '/heart';
        $.ajax({
          type: 'POST',
          url: a,
          headers: { Source: this.source, Token: token },
          data: JSON.stringify({}),
          contentType: 'application/json',
          dataType: 'json',
          complete: function (a) {},
        });
      },
      learnKng: function () {
        var a = this,
          b = {
            oldKnowledgeId: a.heartData.knowledgeId,
            oldSourceId: a.heartData.source,
            newKnowledgeId: kngId,
          },
          c = lecaiAPiUrl + '/kng/knowledges/learn';
        $.ajax({
          type: 'POST',
          url: c,
          headers: { Source: this.source, Token: token },
          data: JSON.stringify(b),
          contentType: 'application/json',
          dataType: 'json',
          complete: function (b) {
            $('#dvHeartTip').remove(), a.startTimer();
          },
        });
      },
      log: function (a, b) {
        console.log(a), CreateSubmitLog(a, b);
      },
      getEncryptBody: function (encryptRquest, callback) {
        encryptRquest = JSON.stringify(encryptRquest);
        var arr = '{"body":' + encryptRquest + '}';
        jQuery.ajax({
          type: 'POST',
          contentType: 'text/json',
          url: '/kng/services/KngComService.svc/GetEncryptRequest',
          data: arr,
          dataType: 'json',
          cache: !1,
          async: !1,
          success: function (result) {
            (result = eval('(' + result + ')')),
              'OK' == result.Status && 'function' == typeof callback && callback(result.Data);
          },
          error: function (a) {
            console.log('EncryptBody error' + arr);
          },
        });
      },
      showleavTime: function (a) {
        if (!(a <= 0)) {
          var b = '';
          (daysold = Math.floor(a / 86400)), daysold > 0 && (b += daysold + daytime);
          var c = a - 86400 * daysold;
          (hrsold = Math.floor(c / 3600)), hrsold > 0 && (b += hrsold + hourtime);
          var d = c - 3600 * hrsold;
          (minsold = Math.floor(d / 60)),
            minsold > 0 && (b += minsold + minutetime),
            (seconds = d - 60 * minsold),
            seconds > 0 && (b += seconds + secondtime),
            $('#spanLeavTimes').html(b),
            'True' == openRewardTip &&
              a <= 60 &&
              !isCompleted &&
              ('function' == typeof showRewardTip && showRewardTip(), (openRewardTip = 'False'));
        }
      },
      showProgress: function (a) {
        if (a) {
          $('#ScheduleText').html(a + '%');
          var b = parseInt(1.13 * a) + 'px';
          $('#divScheduleWidth').css('width', b), 100 === a && commonHelper.completeDivShow();
        }
      },
      completeDivShow: function () {
        $('#divCheat').hide(),
          $('#divProcessArea').show(),
          $('#ScheduleText').show(),
          $('#divNotStartArea').hide(),
          $('#divCompletedArea').show(),
          $('#divStartArea').hide(),
          0 == initiativeCreditMode &&
            0 == getCreditMode &&
            standardStudyScore > 0 &&
            ($('#spanFinishScore').show(),
            $('#spanActCmpScore').text(standardStudyScore),
            $('#spanTalCmpScore').text(standardStudyScore)),
          $('#icon' + kngId) && $('#icon' + kngId).prop('class', 'pic2'),
          'True' != openRewardTip ||
            isCompleted ||
            ('function' == typeof showRewardTip && showRewardTip(), (openRewardTip = 'False')),
          (isCompleted = !0);
      },
      AppendWarningHtml: function () {
        var a = this;
        if ($('#dvWarningView').length <= 0) {
          var b =
            "<div class='playgoon' id='dvWarningView'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>" +
            $('#hfTip').val() +
            "</div><input id='reStartStudy' type='button' class='btnok' value='" +
            iheretitle +
            "' /></div>";
          'DocumentKnowledge' == knowledgeType
            ? $('#docplayercontainer').append(b)
            : ($('#playervideocontainer').append(b),
              $('#playeraudiocontainer').append(b),
              $('#playercontainer').append(b)),
            (document.getElementById('reStartStudy').onmousedown = function () {
              myMousedown = !0;
            }),
            (document.getElementById('reStartStudy').onclick = function () {
              myMousedown && ((myMousedown = !1), $('#dvWarningView').remove(), a.startTimer());
            }),
            this.log('防作弊日志记录', '{}');
        }
      },
      startTimer: function () {
        'VideoKnowledge' == knowledgeType &&
          void 0 !== myPlayer &&
          'paused' == myPlayer.getState() &&
          myPlayer.play();
      },
      updateprogress: function (callback) {
        var masterTypeStr = masterType,
          apiUrl = 'study/updateprogress',
          arr = '',
          self = this,
          taskId = getQueryString('taskId') || masterID;
        taskId && taskId.indexOf(',') && (taskId = taskId.split(',')[0]),
          taskId.indexOf(':st=') > -1 && (taskId = taskId.replace(':st=', '')),
          (arr =
            '{"knowledgeId":"' +
            kngId +
            '","packageId":"' +
            packageID +
            '","masterId":"' +
            taskId +
            '","masterType":"' +
            masterTypeStr +
            '"}'),
          AjaxCallApiMethodSubmitStudy({
            type: 'POST',
            url: apiUrl,
            data: arr,
            cache: !1,
            async: !1,
            success: function (result) {
              (result = eval('(' + result + ')')),
                'function' == typeof callback &&
                  callback({
                    studySchedule: result.studyschedule,
                    standardStudyHours: result.standardstudyhours,
                    actualStudyHours: result.actualstudyhours,
                    viewSchedule: result.viewSchedule,
                  });
            },
            error: function (a) {
              'function' == typeof callback &&
                callback({
                  studySchedule: actualStudyHours / standardStudyHours,
                  standardStudyHours: standardStudyHours / 60,
                  actualStudyHours: actualStudyHours / 0,
                  viewSchedule: 0,
                }),
                self.log('同步进度失败', '{}');
            },
          });
      },
      showMsgCheat: function () {
        void 0 !== myPlayer && 'playing' == myPlayer.getState() && myPlayer.pause(),
          ShowIFrameDialog(
            smsCheatTitle,
            320,
            300,
            '/kng/Dialog/MessageCheatDaialog.aspx?kngId=' +
              kngId +
              '&first=&mobile=' +
              cheatMobile +
              '&area=' +
              cheatArea +
              '&pid=' +
              masterID +
              '&masterType=' +
              masterType
          ),
          setTimeout(function () {
            $('.edialogclose').hide();
          }, 10),
          setTimeout(function () {
            $('.edialogclose').hide();
          }, 100),
          setTimeout(function () {
            $('.edialogclose').hide();
          }, 1e3),
          this.log('短信防作弊  弹出短信验证码', '{}');
      },
      startInterval: function (a) {
        try {
          if ('undefined' != typeof Worker)
            return (
              void 0 === this.timer && (this.timer = new Worker('/kng/kng_workers.js')),
              void (this.timer.onmessage = function (b) {
                'function' == typeof a && a();
              })
            );
        } catch (b) {}
        this.timer = setInterval(function () {
          'function' == typeof a && a();
        }, 1e3);
      },
      stopInterval: function () {
        'undefined' != typeof Worker
          ? this.timer && this.timer.terminate()
          : this.timer && clearInterval(this.timer),
          (this.timer = void 0);
      },
    },
    videoStudy = {
      speed: 1,
      hookCheat: !1,
      phaseTrackIntervalTime: 300,
      phaseTrackNum: 0,
      startTrackPreventCheat: !1,
      heartbeatTime: 0,
      heartNum: 0,
      needNum: 30,
      hourNum: 0,
      remainingTime: 0,
      countDownTime: 0,
      commitTime: 0,
      timer: null,
      end: !1,
      initStudy: function () {
        if (
          (deleteCookieHeart(),
          (this.hookCheat = '1' == antionhook),
          (this.phaseTrackIntervalTime = phaseTrackIntervalTime),
          (this.startTrackPreventCheat = '1' == isSingle),
          (this.needNum = parseFloat(submitProTimes) || 30),
          (this.videoLength = videoLength),
          'OJTStudy' == masterType ||
            'Plan' == masterType ||
            'PlanStudy' == masterType ||
            'Position' == masterType ||
            'PositionStudy' == masterType ||
            'O2OStudy' == masterType)
        )
          (this.masterId = masterID), (this.masterType = masterType);
        else if ('PostStudy' === masterType) {
          var a = getQueryString('taskId') || masterID;
          a && a.indexOf(',') && (a = a.split(',')[0]),
            a.indexOf(':st=') > -1 && (a = a.replace(':st=', '')),
            (this.masterId = a),
            (this.masterType = masterType);
        } else (this.masterId = ''), (this.masterType = '');
        this.initCountDown(),
          this.updateprogress(),
          standardStudyHours <= 0 &&
            !isCompleted &&
            (this.commitTrack(), 'function' == typeof showRewardTip && showRewardTip());
      },
      initCountDown: function () {
        this.videoLength >= this.needNum &&
          !isCompleted &&
          ($('#divProcessArea').show(), $('#ScheduleText').show(), $('#divStartArea').show());
      },
      updateprogress: function () {
        if (!isCompleted) {
          var a = this;
          commonHelper.updateprogress(function (b) {
            commonHelper.showProgress(b.studySchedule),
              (a.countDownTime = a.remainingTime =
                60 * (b.standardStudyHours - b.actualStudyHours)),
              b.standardStudyHours < 2 && (a.countDownTime = a.needNum),
              a.videoLength <= 30 && (a.remainingTime = 30),
              commonHelper.showleavTime(parseInt(a.countDownTime)),
              100 === b.studySchedule
                ? (a.delHeart(), (a.end = !0))
                : b.viewSchedule &&
                  (b.viewSchedule + a.needNum > a.videoLength || b.viewSchedule < 3
                    ? (a.previousTime = 0)
                    : (a.previousTime = b.viewSchedule));
          });
        }
      },
      playEnd: function () {
        (this.videoLength < this.needNum || this.remainingTime < this.needNum) &&
          !isCompleted &&
          this.commitTrack(),
          this.delHeart(),
          this.stopTimer();
      },
      commitTrack: function (end) {
        var self = this,
          viewschedule = 0;
        $('#hidViewSchedule').length > 0 && (viewschedule = $('#hidViewSchedule').val());
        var studyTime = parseInt(this.commitTime);
        (studyTime = studyTime || 1) > 60 && (studyTime = 60);
        var param = {
            knowledgeId: kngId,
            masterId: this.masterId,
            masterType: this.masterType,
            packageId: packageID || '',
            pageSize: pageSize || 0,
            studySize: pageSize || 0,
            studyTime: studyTime,
            type: type || 0,
            offLine: !1,
            end: !!end,
            care: !0,
            deviceId: '',
            studyChapterIds: stuChpIDs || '',
            viewSchedule: parseFloat(viewschedule) || 0,
          },
          studyUrl = 'study/submitpro',
          encryptRquest = JSON.stringify(param);
        commonHelper.log(studyUrl, JSON.stringify(encryptRquest)),
          commonHelper.getEncryptBody(encryptRquest, function (encryptBody) {
            (param.encryption = encryptBody),
              (param.multiple = self.speed),
              (param.realHour = self.needNum),
              AjaxCallApiMethodSubmitStudy({
                type: 'POST',
                url: studyUrl,
                data: JSON.stringify(param),
                success: function (result) {
                  commonHelper.log(studyUrl + 'success', JSON.stringify(encryptRquest)),
                    result &&
                      ((result = eval('(' + result + ')')),
                      commonHelper.showProgress(result.studySchedule),
                      100 === result.studySchedule && self.delHeart());
                },
                error: function (a) {
                  commonHelper.log(
                    studyUrl + 'error' + a.responseText,
                    JSON.stringify(encryptRquest)
                  );
                },
              });
          }),
          (this.hourNum = 0),
          (this.commitTime = 0);
      },
      startTimer: function () {
        if (!(this.videoLength < this.needNum && isCompleted) && 'paused' != myPlayer.getState()) {
          if (
            !this.isCheat &&
            msgCheatTimes &&
            (msgCheatTimes.indexOf(parseInt(myPlayer.getPosition().toFixed())) > -1 || !cheatMobile)
          )
            return (
              console.log(myPlayer.getPosition()),
              commonHelper.showMsgCheat(),
              void this.stopTimer()
            );
          this.isCheat = !1;
          var a = this;
          commonHelper.stopInterval(),
            commonHelper.startInterval(function () {
              a.handleTimer();
            });
        }
      },
      stopTimer: function () {
        'paused' != myPlayer.getState() && myPlayer.pause(), commonHelper.stopInterval();
      },
      handleTimer: function () {
        if ('paused' == myPlayer.getState()) return void console.log('暂停是未关闭定时');
        var a = this;
        $('#hidSpeed').val()
          ? ((this.speed = $('#hidSpeed').val()),
            (this.speed = parseFloat(this.speed)),
            (this.speed = this.speed > 2 ? 1 : this.speed))
          : (this.speed = 1),
          timerCount++,
          this.heartNum++,
          this.hourNum++,
          (this.remainingTime = this.remainingTime - this.speed),
          60 == standardStudyHours
            ? (this.countDownTime = this.countDownTime - 1)
            : (this.countDownTime = this.countDownTime - this.speed),
          (this.commitTime = this.commitTime + this.speed),
          this.phaseTrackNum++,
          this.checkHeart(function () {
            return msgCheatTimes &&
              msgCheatTimes.indexOf(parseInt(myPlayer.getPosition().toFixed())) > -1
              ? (console.log(myPlayer.getPosition()),
                commonHelper.showMsgCheat(),
                void a.stopTimer())
              : a.hookCheat && a.phaseTrackNum >= a.phaseTrackIntervalTime
              ? ((a.phaseTrackNum = 0), a.stopTimer(), void commonHelper.AppendWarningHtml())
              : void (a.hourNum >= a.needNum && a.commitTrack());
          }),
          commonHelper.showleavTime(parseInt(a.countDownTime));
      },
      checkHeart: function (a) {
        var b = this;
        this.startTrackPreventCheat && this.heartNum >= this.heartbeatTime
          ? ((this.heartNum = 0),
            commonHelper.checkHeart(function (c) {
              c &&
                ((b.heartbeatTime = c.heartbeatTime),
                c.checkResult && 'function' == typeof a && a());
            }))
          : 'function' == typeof a && a();
      },
      delHeart: function () {
        this.startTrackPreventCheat && commonHelper.delHeart();
      },
    };
}
