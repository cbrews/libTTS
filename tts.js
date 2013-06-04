/**
 * Google Text-To-Speach Library
 * @version 0.0.1
 * @author Chris Brousseau
 * Utilizes the google text to speach (tts) "api" on any page using an iframe
 * Google logic prohibits loading the externally generated MP3 files via normal Audio() object.
 */

;
// setup global singleton TTS namespace
var TTS;
(function($){

	TTS = {
		/**
		 * @var el
		 * jQuery element for iframe that we will load google in
		 */
		el: null,
		
		/**
		 * @var urlTpl string
		 * the url of the google translate, with a %s for input tts string
		 */
		urlTpl: "http://translate.google.com/translate_tts?tl=en&q=%s",
		
		/**
		 * @var maxLength int
		 * Google's max character length of the input tts string
		 */
		maxLength: 100, // google TTS limit
		
		/**
		 * init()
		 * sets up the iframe we'll load the google TTS into
		 */
		init: function(){
			this.el = $(document.createElement('iframe'));
			this.el.attr({
				src: 'about:blank',
				rel: 'noreferrer'
			}).css({
				display: 'none'
			});
			$("body").append(this.el);
		},
		
		/**
		 * createUrl()
		 * @param text string
		 * creates a url using the urlTpl and the text string
		 */
		createUrl: function(text){
			return this.urlTpl.replace("%s",encodeURIComponent(text));
		},
		
		/**
		 * standardizeText()
		 * @param text string
		 * There are certain optimizations we can do to maximize the amount of text we can send to google
		 */
		standardizeText: function(text){
			return text.trim()
			.replace(/\s\s+/, ' '); // replace multiple spaces with only one
		},
		
		/**
		 * say()
		 * @param text string
		 * public method for providing a text string to send to google TTS
		 */
		say: function(text){
			text = this.standardizeText(text);
			if(text.length > this.maxLength){
				console.warn("[TTS] string too long to be read: \"" + text + "\"");
				/**
				 * @TODO split up strings and read one-by-one?
				 * is there any way to monitor the playback in the iframe to know when it's complete?
				 * (It doesn't look likely)
				 */
			} else {
				this._say(text);
			}
		},
		/**
		 * _say()
		 * @param text string
		 * internal method for sending text string to google, in case we find a way to batch long strings
		 */
		_say: function(text){
			if(text){
				console.log("[TTS] Said: \"" + text + "\"");
				this.el.attr({
					src: this.createUrl(text)
				});
			}
		}
	};

	// setup iframe on document ready
	$(document).ready(function(){
		TTS.init();
	});

})(jQuery);