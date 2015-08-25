/*
 *  Document   : main.css
 *  Author     : Omar El Gabry <omar.elgabry.93@gmail.com>
 *  Description: Main Javascript file for the plugin.
 *               It handles all Ajax calls, and DOM Manipulations
 *
 */

(function ( $ ) {

    $.fn.hashtegny = function( _options ) {

        // default configurations
        // note: tokens are inside the initialization function of each social network
        var defaults = {
            twitter:{
                enable: true,
                hashtag: "twitter",
                count: 5
            },
            google:{
                enable: true,
                hashtag: "google",
                count: 5
            },
            instagram:{
                enable: true,
                hashtag: "insta",
                count: 5
            },
            vk:{
                enable: true,
                hashtag: "зима",
                count: 5
            },
            textLength: 300,
            animate: 8,
            updateTime: 60,
            background: "background.jpg",
            showError: false
        };

        // options passed to plugin
        var options   = $.extend(defaults, _options);

        // change the background if passed
        if(options.background !== "background.jpg"){
            $("body").css("backgroundImage" , "url(img/" + options.background +")");
        }

        // target element in which the plugin will run
        var targetEle = this;

        // array of time intervals
        var intervals = [];

        // social network object
        function SocialNetwork(name, url){
            this.name = name;
            this.url = url;
        }

        // all available social networks
        SocialNetwork.networks  = ['twitter', 'google', 'instagram', 'vk'];

        // number of loaded networks from ajax calls
        SocialNetwork.loadedNetworks = 0;

        // number of networks that hasn't been loaded from ajax calls
        SocialNetwork.networksToLoad = SocialNetwork.networks.length;

        // number of posts fetched & rendered by all social networks
        SocialNetwork.posts = 0;

        // render post(append it to targetEle & increment number of posts)
        SocialNetwork.render =  function(post){

            post.msg = Utility.truncate(post.msg);

            var postDiv = $("<div>").attr({class:"mainPost " + post.network + " " + post.imgView, date: Utility.unixTime(post.time)}).css("display", "none");

            var mainImg = $("<img>").attr({src: post.mainImg, class: "mainImg", width: post.mainImgWidth, height: post.mainImgHeight});
            var imgDiv  = $("<div>").attr({class: "mainImgDiv"}).append(mainImg);

            var userImg     = $("<img>").attr({src: post.userImg, class: "userImg"});
            var header      = $("<h4>").attr({class: "userName"}).text(post.userName);
            var networkImg  = $("<img>").attr({src: "img/" + post.network + ".png", class: "snImage"});
            var message     = $("<div>").attr({class: "postText", onclick: "window.open('" + post.url + "');"})
                .append($("<span>").text("\""))
                .append($("<p>").attr({dir: "auto"}).text(Utility.stripHTML(post.msg)));

            var postTime    = $("<p>").attr({class: "postTime"}).append($("<i>").attr({class: "fa fa-clock-o"})).append($("<span>").text(" " + Utility.timeElapsed(post.time)));

            var userDiv = $("<div>").attr({class: "userInfo"})
                .append(userImg)
                .append(header)
                .append(networkImg)
                .append(message)
                .append(postTime);

            // insert new post in the right place so that posts will be sorted,
            // based on post time(time where the post was created)
            var inserted = false;
            targetEle.children("div").each(function(){

                if(parseInt($(this).attr("date")) > parseInt(postDiv.attr("date"))){
                    $(this).before(postDiv.append(imgDiv).append(userDiv));
                    inserted = true;
                    return false;
                }
            });

            if(!inserted){
                targetEle.append(postDiv.append(imgDiv).append(userDiv));
            }

            SocialNetwork.posts++;

        };

        SocialNetwork.prototype = {

            // ajax function for all social media objects
            ajax: function(callback, data){

                var network = this;
                var methodType = "POST";

                //googleplus accepts only GET request
                if(network.name === "google"){
                    methodType = "GET";
                }

                $.ajax({
                    url: network.url,
                    type: methodType,
                    data: data,
                    dataType: "json"
                })
                    .done(function(data) {
                        callback(data);
                    })
                    .fail(function() {
                        if(options.showError){
                            var error = $("<div>").attr({class: "error"})
                                .append($("<span>").append($("<strong>").html("Oops! There was a problem<br>")).append(network.name + " failed to load"));
                            $("body").append(error.hide().fadeIn());
                        }
                    })
                    .always(function() {
                        SocialNetwork.loadedNetworks++;
                        if(SocialNetwork.loadedNetworks === SocialNetwork.networksToLoad){
                            plugin.complete();
                        }
                    })
            }
        };

        var Utility = {

            // get unixtime
            // this is needed because some social networks don't send appropriate unixtime,
            // or they just send a string(not a number of seconds since 01 Jan 1970)
            unixTime: function(sec){
                if(/^[0-9]+$/.test(sec) && sec.toString().length < 13){
                    return (parseInt(sec) * 1000);
                } else if(/^[0-9]+$/.test(sec)){
                    return parseInt(sec);
                }else{
                    return Date.parse(sec);
                }
            },

            // get time elapsed since post was created
            timeElapsed: function(secs){

                var date = new Date(Date.now() - this.unixTime(secs));

                if(date.getUTCFullYear() < 1970)
                    return  "a few seconds ago";
                else if(date.getUTCFullYear() > 1970){ // Year
                    return (date.getUTCFullYear() - 1970)+" Years ago";

                }else if(date.getUTCMonth() > 0){ // Month
                    return  date.getUTCMonth()+ " Month ago";

                }else if(date.getUTCDate() > 1 ){ // Day
                    return  ((date.getUTCDate())-1)+ " Days ago";

                }else if(date.getUTCHours() > 0 ){ // Hours
                    return   date.getUTCHours()+ " Hours ago";

                }else if(date.getUTCMinutes() > 0){ // Min
                    return   date.getUTCMinutes()+ " Minutes ago";
                }else {
                    return  "Less than one minute";
                }

            },

            // cuts the string if exceeded max length
            truncate: function(str) {

                var str = $.trim(str);

                if (str.length > options.textLength) {
                    return str.substring(0, options.textLength) + "...";
                }
                return str;
            },

            // strip html tags
            // Ex: vk sends <br> and some other tags that need to be stripped
            stripHTML: function(string) {
                return string.replace(/(<([^>]+)>)|nbsp;|\s{2,}|/ig, "");
            },
            urlencode: function(str){
                return encodeURIComponent(str);
            },
            empty: function(foo){
                return (foo === null || typeof(foo) === "undefined");
            }
        };

        var plugin = {

            //initialization for the plugin
            init: function(){

                // trigger search for hashtag 
                // Events.search();

                // trigger toggle header event
                Events.toggleHeader();

                // add spinner to page
                var spinner = $("<div>").attr({class: "spinner"}).append($("<i>").attr({class: "fa fa-refresh fa-spin fa-5x"}));
                targetEle.html(spinner);

                // run initialization method for each network if enabled
                SocialNetwork.networks.forEach(function(network){
                    if(!Utility.empty(options[network])){
                        if(options[network].enable === true){
                            plugin[network].init();
                        }
                    }
                });
            },

            // runs when all social networks have been loaded from ajax calls
            complete: function () {
                $(".spinner").remove();
                Events.init();
            },
            twitter:{
                init: function(){

                    var api = "twitterAPI/getTwitterData.php";
                    var hashtag = options.twitter.hashtag;
                    var consumer_key = "6hVQNYTS2y1q6ChKqbYYVTaNY";
                    var consumer_secret = "FiZ7NfWAvqO2lOIajXaDOkv7a8eWqKorQHaw9LuVaibvkuyYtw";
                    var count = options.twitter.count;

                    var twitter = new SocialNetwork("twitter", api);
                    twitter.ajax(this.success, {hashtag: hashtag, count: count, consumer_key: consumer_key, consumer_secret: consumer_secret});

                },
                success: function(data){

                    var post = data.statuses;
                    var len  = post.length;

                    for(var i=0; i < len; i++ ){

                        var postData = { network: "twitter" };
                        postData.userName = post[i].user.name;
                        postData.userImg = (post[i].user.profile_image_url).replace("_normal","");
                        postData.time = post[i].created_at;
                        postData.msg = !Utility.empty(post[i].text)? post[i].text: "";
                        postData.url = 'http://twitter.com/' + post[i].user.screen_name + '/status/' + post[i].id_str;

                        try{

                            postData.mainImg = post[i].entities.media[0].media_url_https;
                            postData.mainImgWidth = post[i].entities.media[0].sizes.medium.w;
                            postData.mainImgHeight = post[i].entities.media[0].sizes.medium.h;
                            postData.imgView = "vertical";

                        }catch (e){

                            postData.mainImg = "#";
                            postData.mainImgWidth = 0;
                            postData.mainImgHeight = 0;
                            postData.imgView = "horizontal";

                        }

                        SocialNetwork.render(postData);
                    }
                }
            },
            google:{
              init: function(){

                  var api = "https://www.googleapis.com/plus/v1/activities?query=%23";
                  var hashtag = Utility.urlencode(options.google.hashtag);
                  var key = "AIzaSyAJHQ62h5MXIpppVfbtDm_7RN9_AsHis5c";
                  var count = options.google.count;

                  var google = new SocialNetwork("google", api + hashtag+"&key="+ key + "&maxResults="+ count);
                  google.ajax(this.success);
              },
              success: function(data) {

                  var post = data.items;
                  var len = post.length;

                  for(var i=0; i < len; i++ ){

                      var postData = { network: "google" };
                      postData.userName = post[i].actor.displayName;
                      postData.userImg = post[i].actor.image.url;
                      postData.userImg = postData.userImg.toString().slice(0, postData.userImg.length-2)+"300";
                      postData.time = post[i].published;
                      postData.msg = !Utility.empty(post[i].title)? post[i].title: "";
                      postData.url = post[i].url;

                      try{

                          postData.mainImg = post[i].object.attachments[0].thumbnails[0].image.url;
                          postData.mainImgWidth = post[i].object.attachments[0].thumbnails[0].image.width;
                          postData.mainImgHeight = post[i].object.attachments[0].thumbnails[0].image.height;
                          postData.imgView = "vertical";

                      }catch(e){

                          postData.mainImg = "#";
                          postData.mainImgWidth = 0;
                          postData.mainImgHeight = 0;
                          postData.imgView = "horizontal";
                      }

                      SocialNetwork.render(postData);
                    }
                }
            },
            instagram: {
                init: function(){

                    var api = "https://api.instagram.com/v1/tags/";
                    var hashtag = Utility.urlencode(options.instagram.hashtag);
                    var client_id = "394b5154ec8747419546a64b686df10c";
                    var count = options.instagram.count;

                    var instagram = new SocialNetwork("instagram", api + hashtag+"/media/recent/?client_id="+ client_id + "&count="+ count +"&callback=?");
                    instagram.ajax(this.success);

                },
                success: function(data){

                    var post = data.data;
                    var len = post.length;

                    for(var i=0; i < len ; i++ ){

                        var postData = { network: "instagram" };
                        postData.userName = post[i].user.username;
                        postData.userImg = post[i].user.profile_picture;
                        postData.time = post[i].created_time;
                        postData.msg = !Utility.empty(post[i].caption.text)? post[i].caption.text: "";
                        postData.url = post[i].link;

                        try{

                            postData.mainImg = post[i].images.standard_resolution.url;
                            postData.mainImgWidth = post[i].images.standard_resolution.width;
                            postData.mainImgHeight = post[i].images.standard_resolution.height;
                            postData.imgView = "vertical";

                        }catch (e){
                            postData.mainImg = "#";
                            postData.mainImgWidth = 0;
                            postData.mainImgHeight = 0;
                            postData.imgView = "horizontal";
                        }

                        SocialNetwork.render(postData);
                    }
                }
            },
            vk: {
                init: function (){

                    var api = "https://api.vk.com/method/newsfeed.search?q=%23";
                    var hashtag = Utility.urlencode(options.vk.hashtag);
                    var count = options.vk.count;

                    var vk = new SocialNetwork("vk", api + hashtag+"&extended=1&count="+ count +"&callback=?");
                    vk.ajax(this.success);
                },
                success: function(data){

                    var post = data.response;
                    var len = post.length;

                    for(var i=1; i < len; i++ ){

                        var postData = { network: "vk" };
                        if(!Utility.empty(post[i].user)){

                            postData.userName = post[i].user.first_name +" "+post[i].user.last_name;
                            postData.userImg = post[i].user.photo_medium_rec;
                            postData.url = 'http://vk.com/' + post[i].user.screen_name + '?w=wall-' + post[i].from_id  + '_' + post[i].id;

                        }else if(!Utility.empty(post[i].group)){

                            postData.userName = post[i].group.name;
                            postData.userImg = post[i].group.photo_big;
                            postData.url = 'http://vk.com/' + post[i].group.screen_name + '?w=wall-' + post[i].group.gid + '_' + post[i].id;

                        }else{
                            continue;
                        }

                        if(post[i].text == ""){
                            continue;
                        }

                        postData.time = post[i].date;
                        postData.msg  = post[i].text;

                        try{

                            if (post[i].attachment.type === 'link'){
                                postData.mainImg = post[i].attachment.link.image_src;
                                postData.mainImgWidth = postData.mainImgHeight = 640;
                            }
                            if (post[i].attachment.type === 'video'){
                                postData.mainImg = post[i].attachment.video.image_big;
                                postData.mainImgWidth = postData.mainImgHeight = 640;
                            }
                            if (post[i].attachment.type === 'photo'){
                                if(post[i].attachment.photo.src_xxxbig)     postData.mainImg = post[i].attachment.photo.src_xxxbig;
                                else if(post[i].attachment.photo.src_xxbig) postData.mainImg = post[i].attachment.photo.src_xxbig;
                                else if(post[i].attachment.photo.src_xbig)  postData.mainImg = post[i].attachment.photo.src_xbig;
                                else if(post[i].attachment.photo.src_big)   postData.mainImg = post[i].attachment.photo.src_big;
                                else                                        postData.mainImg = post[i].attachment.photo.src;

                                postData.mainImgWidth = postData.mainImgHeight = post[i].attachment.photo.width;
                            }

                            postData.imgView = "vertical";

                        }catch (e){
                            postData.mainImg = "#";
                            postData.mainImgWidth = 0;
                            postData.mainImgHeight = 0;
                            postData.imgView = "horizontal";
                        }

                        SocialNetwork.render(postData);
                    }
                }
            }
        };

        var Events = {
            init: function(){
                this.animate();
                this.updateTime();
                this.search();
            },
            animate: function() {

                var index = 0;
                var len   = SocialNetwork.posts;

                // buffer is needed to allow animateOut() to run without any interruption
                var buffer = 2000;

                var animate_In  = ["fade-in","flip-in-x","zoom-in","fade-in-up","fade-in-left","flip-in-y","fade-in-up-right","bounce-in-down","flip-in-bottom-back","zoom-in-right-big"];
                var animate_Out = ["fade-out","flip-out-x","zoom-out","fade-out-down","fade-out-right","flip-out-y","fade-out-down-left","bounce-out-up","flip-out-bottom-back","zoom-out-left-big"];

                doAnimation();
                intervals.push(setInterval(doAnimation, (options.animate  * 1000) + buffer));

                function doAnimation(){

                    if(index - 1 >= 0){
                        var prevPost = targetEle.children("div:eq("+(index - 1)+")");
                        animateOut(prevPost, animate_Out[(index - 1)%10]);
                    }

                    setTimeout(function(){

                        if(index - 1 >= 0){
                            var prevPost = targetEle.children("div:eq("+(index - 1)+")");

                            // end animation after animateOut()
                            animateEnd(prevPost);

                            // animate-out sometimes needs to be explicitly removed
                            prevPost.removeClass("animate-out");
                            prevPost.hide();
                        }

                        // reset index
                        if(index >= len){
                            index = 0;
                        }

                        var curPost = targetEle.children("div:eq("+(index)+")");
                        curPost.show();
                        animate(curPost, animate_In[index%10]);
                        index++;

                    }, buffer);
                }
            },

            // update post time
            updateTime: function(){

                intervals.push(setInterval(doUpdateTime, options.updateTime * 1000));

                function doUpdateTime(){
                    targetEle.children("div").each(function(){
                        var str = Utility.timeElapsed($(this).attr("date"));
                        $(this).find(".userInfo .postTime span").text(" " + str);
                    });
                }
            },

            // search for hashtag
            // if left empty, this will trigger default values
            search: function(){
                $(".header button.search").off('click').on('click',function(e) {
                    e.preventDefault();

                    // clear existing time intervals
                    intervals.forEach(function(interval){
                        clearInterval(interval);
                    });

                    // clear all data
                    intervals = [];
                    SocialNetwork.loadedNetworks = 0;
                    SocialNetwork.networksToLoad = SocialNetwork.networks.length;
                    SocialNetwork.posts = 0;

                    var hashtag = $.trim($(".hashtag").val());
                        hashtag = hashtag.replace(/#/g, "");
                    
                    if(hashtag.length > 0){
                        SocialNetwork.networks.forEach(function(network){
                            options[network].hashtag = hashtag;
                        });
                    }

                    // hide header
                    $(".container .toggle-header").addClass("hidden");
                    $(".header").hide();
                    $(".container .toggle-header").html("<i class='fa fa-angle-down fa-2x'></i>");

                    // start the plugin
                    plugin.init();

                });
            },

            //toggle header up/down
            toggleHeader: function(){
                $(".container .toggle-header").off('click').on('click',function(e) {
                    e.preventDefault();

                    var link = this;
                    $(link).toggleClass("hidden");

                    if($(link).hasClass("hidden")){
                        $(".header").hide();
                        $(link).html("<i class='fa fa-angle-down fa-2x'></i>");
                    }else{
                        $(".header").hide().fadeIn();
                        $(link).html("<i class='fa fa-angle-up fa-5x'></i>");
                    }
                });
            }
        };

        // start the plugin
        plugin.init();

    };

}( jQuery ));
