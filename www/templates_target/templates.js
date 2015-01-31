this["JST"] = this["JST"] || {};

this["JST"]["templates_src/landing.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="landing">\r\n        <header><p class="heading heading1">JobAnalitics</p></header>\r\n        \r\n       <section class="dark">\r\n           <div><button class="topcoat-button--large--cta results" disabled >Results</button></div>\r\n        </section>\r\n        \r\n        <section class="dark">\r\n            <div><button class="topcoat-button--large--cta profile" >Profile</button></div>\r\n        </section>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates_src/profile.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="profile">\r\n        <h2 class="heading heading2">Profile view</h2>\r\n        \r\n        <!--swiper-->\r\n            <div class="swiper-container">\r\n              <div class="swiper-wrapper">\r\n                  <!--First Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the first slide goes here -->\r\n                      TEst 1\r\n                  </div>\r\n\r\n                  <!--Second Slide-->\r\n                  <div class="swiper-slide">\r\n                    <!-- Any HTML content of the second slide goes here -->\r\n                      Test 2\r\n                  </div>\r\n\r\n                  <!--Third Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the third slide goes here -->\r\n                  </div>\r\n                  <!--Etc..-->\r\n              </div>\r\n</div>\r\n        \r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates_src/src1.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


    var length = userList.length;
    for (var index = 0; index < length; index++) {
        var user = userList[index];
;
__p += '\r\n        <tr>\r\n            <td>' +
((__t = ( index )) == null ? '' : __t) +
'</td>\r\n            <td>' +
((__t = ( user.firstName )) == null ? '' : __t) +
'</td>\r\n            <td>' +
((__t = ( user.lastName )) == null ? '' : __t) +
'</td>\r\n            <td>' +
((__t = ( user.email )) == null ? '' : __t) +
'</td>\r\n        </tr>\r\n';
 } ;


}
return __p
};