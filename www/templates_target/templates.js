this["JST"] = this["JST"] || {};

this["JST"]["templates_src/landing.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="landing">\r\n        <header><p class="heading heading1">JobAnalitics</p></header>\r\n        \r\n       <section>\r\n           <div><button class="topcoat-button--large--cta results" disabled >Results</button></div>\r\n        </section>\r\n        \r\n        <section>\r\n            <div><button class="topcoat-button--large--cta profile" >Profile</button></div>\r\n        </section>\r\n<!--        <section class="results clickable heading2 heading"><p class="left">Results<span class="icon-next"></span></p></section>\r\n        <section class="profile clickable heading2 heading"><p class="left"><span class="icon-user"></span>Profile</p></section>-->\r\n    </div>\r\n</div>';

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