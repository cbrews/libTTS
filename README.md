libTTS
======

libTTS is portable and simple text-to-speech library powered by Google Translate's Text-To-Speech service.

[Google Translate](http://translate.google.com/) already provides a full-fledged text-to-speech service for dynamically creating short text-to-speech files.  However, due to restrictions of the service, it is not possible to play these files on external websites; a request to the text-to-speech API will give you a 404.  More information on these restrictions can be found [here](http://stackoverflow.com/questions/12883330/request-to-google-text-to-speech-api).

This library encapsulates an `<iframe>` that loads the Google Translate Text-To-Speech url directly.

Examples
--------

Please see sample.html for examples

Docs
----

libTTS creates a global variable `TTS`.  Please check you namespaces!

### TTS.say()

`say(text)` - pass a string to the text-to-speech engine.

````javascript
TTS.say("Hello, World!");
// [TTS] Said: "Hello, World!"
````

Successfully spoken phrases will be printed to the console.  Calling `TTS.say()` while another phrase is being spoken will abort the previous audio playback.  There is a currently a *100-character limit* on the text string (imposed by Google).  Text strings that exceed this limit will print a warning in the console.

### TTS.maxLength

integer - the allowed max length of a string passed to `TTS.say()`

````javascript
TTS.maxLength;
// 100
````

Please use `TTS.maxLength` for validation checks against string lengths before passing them to `TTS.say()`

### TTS.el

jQuery element - the iframe element that plays the audio.

````javascript
TTS.el;
// jQuery <iframe> element
````


Dependencies
------------

libTTS currently requires [jQuery](http://jquery.com/).