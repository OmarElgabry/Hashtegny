![Hashtegny](https://raw.githubusercontent.com/OmarElGabry/Hashtegny/master/img/hashtegny.PNG)

# Hashtegny

jQuery Plugin aggregates hashtags from different social media networks. Posts are displayed in a unique, & attractive grid, and animated layout.

You can use it for personal purpose, during any conference or event, for an organization, or even at a Store. So, you can engage the audiences anywhere and increase your interaction and impact.

_How to do that?_ Simply you can use it on your website, mobile, TV displays, or using projectors on a wall.

### Social Networks Supported
+ Twitter
+ Instagram
+ Google+
+ VK
+ ~~Facebook(Deprecated)~~

## Demo

Check [Demo](http://omarelgabry.github.io/Hashtegny/)

## Features
+ Aggregates hashtags from different social media networks.
+ Displays the posts in a grid and animated layout.
+ Works on different screen sizes.
+ It automatically updates the time stamp of each post.
+ It automatically adds recent posts if any.
+ Posts are sorted according to the time they were created at.
+ Posts are clickable.
+ Ready to be used anywhere; conference, event, at a Store.
+ You can use it on your websites, mobile, TV, Using projectors on wall.
+ Build based on latest version of jQuery(CDN)
+ Easy to be maintained and customized.

## Install
You can install with npm

``` 
npm install hashtegny 
```

## Getting Started

Add CSS Files:
```html
 <!-- Animation -->
 <link rel="stylesheet" href="css/animations.min.css" type="text/css" />
 <!-- Font Awesome -->
 <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
 <!-- Main CSS File(Animation Layout) - Default -->
 <link id="style" rel="stylesheet" href="css/main.animation.css" type="text/css" />
```

Add JS Files:
```html
 <!-- jQuery -->
 <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
 <!-- Animation -->
 <script type="text/javascript" src="js/animations.min.js"></script>
 <script type="text/javascript" src="js/appear.min.js"></script>
 <!-- Grid Layout -->
 <script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.2/masonry.pkgd.min.js"></script>
 <!-- Twitter JS library -->
 <script type="text/javascript" src="js/codebird.js"></script>
 <!-- Hashtegny -->
 <script type="text/javascript" src="js/hashtegny.js"></script>
```

Finally, Run the plugin:
```html
<!-- Inside your <body> tag -->
<div id="hashtegny-container"></div>
```
```js
 <script>
        $(document).ready(function(){

            // start the plugin & pass your options
            $('#hashtegny-container').hashtegny({
                twitter:{
                    enable: true,
                    hashtag: "twitter",
                    count: 5        // number of posts to be displayed
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
                textLength: 300,    // max length of post content
                animate: 8,         // time of animation for each post in seconds
                refresh: 60,        // add recent posts if any every 60 seconds 
                updateTime: 60,     // update post time every 60 second(1 min)
                background: false,  // add background image
                showError: false    // show error alert box if any error encountered
            });
        });
 </script>
```
#### Want to add image background?
Add your image in _img_ directory, then assign ```background``` to ```imagefilename.extension```. 

## Support
I've written this script in my free time during my studies. This is for free, unpaid. If you find it useful, please support the project by spreading the word.

## Contribute <a name="contribute"></a>

Contribute by creating new issues, sending pull requests on Github or you can send an email at: omar.elgabry.93@gmail.com

## Dependencies
+ [Twitter JS Library](https://github.com/jublonet/codebird-js)
+ [Animations](https://github.com/joemottershaw/animations)
+ [Grid Layout](https://github.com/desandro/masonry)
+ [Font Awesome](https://github.com/FortAwesome/Font-Awesome)

## License
Built under [MIT](http://www.opensource.org/licenses/mit-license.php) license.
