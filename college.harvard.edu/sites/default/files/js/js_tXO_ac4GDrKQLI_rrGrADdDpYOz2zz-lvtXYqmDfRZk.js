Drupal.behaviors.googleAnalyticsET = {
  attach : function (context) {
    // make sure that the google analytics event tracking object exists
    // if not then exit and don't track
    if(!_gaq){
      return;
    }

    var settings = Drupal.settings.googleAnalyticsETSettings;

    var s = new Array();
    for(var i = 0; i < settings.selectors.length; i++) {
      s[i] = settings.selectors[i].selector;
    }

    jQuery.each(s,
      function(i, val) {
        jQuery(settings.selectors[i].selector).bind(settings.selectors[i].event,
          function(event) {
            trackEvent(jQuery(this), settings.selectors[i].category, settings.selectors[i].action, settings.selectors[i].label, settings.selectors[i].value, settings.selectors[i].noninteraction)
          }
        );
      }

    );
  }

}

/**
 * trackEvent does the actual call to _gaq.push with the _trackEvent type.
 *
 * trackEvent calls the push method from the _gaq object. It also preforms
 * any token replacements on the category, action, and opt_label parameters.
 *
 * @param $obj
 *   The jQuery object that the click event was called on.
 * @param category
 *   The name you supply for the group of objects you want to track.
 * @param action
 *   A string that is uniquely paired with each category, and commonly used
 *   to define the type of user interaction for the web object.
 * @param opt_label
 *   An optional string to provide additional dimensions to the event data.
 * @param opt_value
 *   An integer that you can use to provide numerical data about the user
 *   event.
 * @param opt_oninteraction
 *   A boolean that when set to true, indicates that the event hit will not
 *   be used in bounce-rate calculation.
 */
function trackEvent($obj, category, action, opt_label, opt_value, opt_noninteraction) {
  var href = $obj.attr('href') == undefined ? false : String($obj.attr('href'));

  category = category == '!text' ? String($obj.text()) : (category == '!href' ? href : (category == '!currentPage' ? String(window.location.href) : String(category)));
  action = action == '!text' ? String($obj.text()) : (action == '!href' ? href : (action == '!currentPage' ? String(window.location.href) : String(action)));
  opt_label = opt_label == '!text' ? String($obj.text()) : (opt_label == '!href' ? href : (opt_label == '!currentPage' ? String(window.location.href) : String(opt_label)));

  if (!category || !action) {
    return;
  }

  if (opt_label == '!test') {
    debugEvent($obj, category, action, opt_label, opt_value, opt_noninteraction);
  }
  else {
    _gaq.push(['_trackEvent', String(category), String(action), String(opt_label), Number(opt_value), Boolean(opt_noninteraction)]);
  }
}

/**
 * A simple debug function that matches the trackEvent function.
 */
function debugEvent($obj, category, action, opt_label, opt_value, opt_noninteraction) {
  alert(category + ' ' + action  + ' ' + opt_label + ' ' + opt_value);
}
;
