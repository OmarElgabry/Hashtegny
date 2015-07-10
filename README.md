![Screenshot](https://raw.githubusercontent.com/OmarElGabry/Hashtegny/master/img/hashtegny.png)

# Hashtegny

jQuery Plugin aggregates hashtags from different social media networks. Posts are displayed in a unique, attractive, and animated layout.

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

**NOTE**  Twitter won't work in the previous demo link because Twitter API requires PHP, and GitHub Pages doesn't execute PHP. But, it works well on your local server or webserver.

## Features
+ Aggregates hashtags from different social media networks.
+ Displays the posts in a unique, attractive, and animated layouts.
+ Works on different screen sizes.
+ It automatically updates the time stamp of each post.
+ Posts are sorted according to the time they were created at.
+ Posts are clickable.
+ Ready to be used anywhere; conference, event, at a Store.
+ You can use it on your websites, mobile, TV, Using projectors on wall.
+ Build based on latest version of jQuery(CDN)
+ Easy to be maintained and customized.

## Getting Started

Add CSS Files:
```html
 <link rel="stylesheet" href="css/animations.min.css" type="text/css" />
 <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
 <link rel="stylesheet" href="css/main.css" type="text/css" />
```

Add JS Files:
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="js/animations.min.js"></script>
<script type="text/javascript" src="js/appear.min.js"></script>
<script type="text/javascript" src="js/hashtegny.js"></script>
```

Finally, Run the plugin:
```html
<!-- Inside your <body> tag -->
<div id="myPlugin"></div>
```
```js
<script>
	$(document).ready(function(){
	
	    // start the plugin & pass your options
	    $('#myPlugin').hashtegny({
	        twitter:{
	            enable: true,
	            hashtag: "twitter",
	            count: 5 // number of posts to be displayed
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
	        textLength: 300, // max length of post content
	        animate: 8,		 // time of animation for each post in seconds
	        updateTime: 60,  // update post time every 60 second(1 min)
			background: "background.jpg", // background image
	        showError: false // show error alert box if any error encountered
	    });
	});      
</script>
```
#### Want to change the image background?
Add your image in _img_ directory, then assign ```background``` to ```imagefilename.extension```. 

Default is set to ```background.jpg```.

## Support
I've written this script in my free time during my studies. This is for free, unpaid. If you find it useful, please support the project by spreading the word.

## Contribute <a name="contribute"></a>

Contribute by creating new issues, sending pull requests on Github or you can send an email at: omar_elgabry_93@gmail.com

## Dependencies
+ [Animations](https://github.com/joemottershaw/animations)
+ [Twitter API](https://github.com/J7mbo/twitter-api-php )

## License
Built under [MIT](http://www.opensource.org/licenses/mit-license.php) license.