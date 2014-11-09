# Hashtegny

A plugin that aggregates "hashtags" from different social media networks like twitter, instagram, googleplus. It displays the posts in a unique, attractive, and animated layout. You can use it for personal purpose, during any conference or event, for an Organization, or even at a Store. So, you can engage the audiences anywhere and increase your interaction and impact. 

How to do that? Simply you can display it on your websites, mobile, TV displays, or using projectors on a wall.

Unfortunately it doesn't support Facebook since the fact that The public post search was deprecated with Graph API v2.0. 
But I will try instead to add Facebook as soon as i find any way.

Desktop & Mobile Screenshots
![Screenshot](https://raw.githubusercontent.com/OmarElGabry/Hashtegny/master/_images/Screenshot.jpg)

## Demo

[Click here to watch a Demo](http://omarelgabry.github.io/Hashtegny/). Sorry, There is a problem with Twitter. Since GitHub doesn't deal with PHP. **However** it works well if you take it on your local server or webserver

## Features

*   Aggregates different hashtags from different social media networks.
*   Displays the posts in a unique, attractive, and animated layouts.
*   It automatically update the Time stamp of each post.
*   You can Update the posts without refresh the page, meaning you can get the latest posts and add them to the current posts.
*   Posts are sorted according to the time they were created at.
*   Posts will be displayed in a loop, one after another in animated effects.
*   It Supports Arabic letters.
*   You can restart the plugin without need to refresh the page.
*   You can use it anywhere; conference, event, at a Store.
*   You can use it on your websites, mobile, TV, Using projectors on wall.
*   Build based on latest version of jQuery(CDN)
*   Easy to be maintained and customized.

## Getting started

Add CSS Files:
```html
<!-- Loading(spinners) Animation -->
<link  rel="stylesheet" href="http://css-spinners.com/css/spinner/three-quarters.css" type="text/css">
<!-- Animation for Posts -->
<link  rel="stylesheet" href="_css/animations.min.css" type="text/css" />
<!-- Main CSS File -->
<link  rel="stylesheet" href="_css/main.css" type="text/css" />
```

Add JS Files:
```html
<!-- jQuery -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<!-- Animation for Posts -->
<script type="text/javascript" src="_scripts/animations.min.js"></script>
<script type="text/javascript" src="_scripts/appear.min.js"></script> 
<!-- Main JS -->
<script type="text/javascript" src="_scripts/main.js"></script>
```

Add UI to get the hashtag you want to search for:
```html
<div id="userInput" class="userInput">
    <div class='wrongInput'>Please make sure to use valid characters, don't use '#' and use at least one alphabet letter</div>
    <form autocomplete="on" method="post" >
            <label for="instagram" class="instagramLabel">Instagram:#</label>
            <input type="text" name="instagram" id="instagram" value="aiesec"  maxlength="15" />
            <br />
            <label for="googleplus" class="googleplusLabel">GooglePlus:#</label>
            <input type="text" name="googleplus" id="googleplus" value="gsamena"   maxlength="15"/>
            <br />
            <label for="twitter" class="twitterLabel">Twitter:#</label>
            <input type="text" name="twitter" id="twitter" value="تويتر"  maxlength="15"/> 
            <br />
            <input type="submit" name="submit" id="submit" value="#Hashtegny" title="Press Me!" /> 
    </form>
</div>
```

Finally, Add this line to initialize the Plugin:
```html
<div id="Hashtegny" class="Hashtegny"></div>
```
**IMPORTANT:** When you use the Plugin, make sure that you are on a local host Or on your webserver.

## Dependencies

*  Spinners for loading animation: http://css-spinners.com/#/spinners/
*  Posts Animation: https://github.com/joemottershaw/animations
*  Twitter API: https://github.com/J7mbo/twitter-api-php 

## License
The Plugin built under MIT license.

## Issues
If you found any bug or you want to add any feature, Please report it here: https://github.com/omarelgabry/Hashtegny/issues. Or you can email me at: omar_elgabry_93@gmail.com. Your feedback will be really appreciated.
